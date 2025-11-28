"use client";

import { useEffect, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { ProductDTO } from "@/types/products";
import Select from "../common/DisabledSelect";
import {
   createPublisher,
   CreatePublisherDTO,
   updatePublisher,
   UpdatePublisherDTO,
} from "@/lib/api/publishers";
import { PublisherDTO } from "@/types/publishers";
import { toast } from "react-toastify";

const PHONE_REGEX = /^\+?(\d[\s-]?){8,}\d$/;

const fileToBase64 = (file: File) =>
   new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
   });

const DragDropZone = ({
   label,
   format,
   icon: Icon,
   filePreview,
   ...props
}: any) => (
   <div className="flex flex-col">
      <label className="text-gray-800 text-sm font-semibold mb-2">
         {label}
      </label>
      <div
         className="relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#57C4CF] rounded-2xl bg-[#E6F8FA] h-[150px] cursor-pointer"
         onClick={() => document.getElementById(props.id)?.click()}
      >
         <Icon className="h-8 w-8 text-[#57C4CF]" />
         <p className="text-sm text-gray-500 font-medium mt-2">
            Drag and drop or browse file
         </p>
         <p className="text-xs text-gray-400 mt-1">File format {format}</p>
         <input type="file" className="hidden" {...props} />
      </div>
   </div>
);

interface ProductField {
   tempId: number;
   productName: string;
   price: number;
}

interface FormValues {
   publisherName: string;
   email: string;
   phoneNo: string;
   whatsappNo: string;
   logo: File | string;
   w9Files: (File | string)[];
   dynamicProducts: ProductField[];
   // removedW9Files: [];
}

interface AddPublisherFormProps {
   mode: "add" | "edit";
   publisher: PublisherDTO | null;
   products: ProductDTO[];
   onClose: () => void;
   onPublisherCreated: () => Promise<any>;
   accessToken: string | null;
}

export default function AddPublisherForm({
   mode,
   publisher,
   onClose,
   onPublisherCreated,
   products,
   accessToken,
}: AddPublisherFormProps) {
   const {
      register,
      handleSubmit,
      reset,
      control,
      setValue,
      watch,
      formState: { errors },
   } = useForm<FormValues>({
      defaultValues: {
         publisherName: "",
         email: "",
         phoneNo: "",
         whatsappNo: "",
         logo: "",
         w9Files: [],
         dynamicProducts: [],
      },
   });

   const { fields, append, remove } = useFieldArray({
      control,
      name: "dynamicProducts",
   });

   const [logoPreview, setLogoPreview] = useState<string | null>(null);
   const [w9FileObjects, setW9FileObjects] = useState<(File | string)[]>([]);
   const [loading, setLoading] = useState(false);
   const [lastTempId, setLastTempId] = useState(0);
   const [removedW9Files, setRemovedW9Files] = useState<string[]>([]);

   const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setValue("logo", file);
         try {
            const base64 = await fileToBase64(file);
            setLogoPreview(base64);
         } catch (error) {
            console.error("Error converting file to base64:", error);
            setLogoPreview(null);
         }
      }
      e.target.value = "";
   };

   const handleW9Upload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = e.target.files ? Array.from(e.target.files) : [];
      const combinedFiles = [...w9FileObjects, ...newFiles];

      setW9FileObjects(combinedFiles);
      setValue("w9Files", combinedFiles);
      e.target.value = "";
   };

   const handleRemoveW9File = (indexToRemove: number) => {
      const removed = w9FileObjects[indexToRemove];
      if (typeof removed === "string") {
         setRemovedW9Files((prev) => [...prev, removed]);
      }

      const newFiles = (w9FileObjects ?? []).filter(
         (_, index) => index !== indexToRemove
      );
      setW9FileObjects(newFiles);
      setValue("w9Files", newFiles);
   };

   const handleAddProduct = () => {
      const newTempId = lastTempId + 1;
      append({
         tempId: newTempId,
         productName: "Facebook",
         price: 8,
      });
      setLastTempId(newTempId);
   };

   const handleSubmitForm: SubmitHandler<FormValues> = async (data) => {
      console.log("Submitting Data:", data);
      if (!data.dynamicProducts || data.dynamicProducts.length === 0) {
         setLoading(false);
         toast.info("Please add at least one product.");
         return;
      }
      try {
         setLoading(true);
         const mappedProducts = data.dynamicProducts.map((dp) => {
            const matched = products.find(
               (p) => p.productName === dp.productName
            );
            if (!matched) throw new Error(`Invalid product: ${dp.productName}`);
            return { productId: matched.id, price: dp.price };
         });

         if (mode === "add") {
            const payload: CreatePublisherDTO = {
               publisherName: data.publisherName,
               email: data.email,
               phoneNo: data.phoneNo,
               whatsappNo: data.whatsappNo,
               logo: data.logo instanceof File ? data.logo : undefined,
               w9Files: (data.w9Files ?? []).filter(
                  (f): f is File => f instanceof File
               ),
               products: mappedProducts,
            };

            const result = await createPublisher(payload, accessToken);
            console.log("Publisher created:", result);
            toast.success("Publisher created successfully");
         }

         if (mode === "edit" && publisher) {
            console.log(data);
            const payload: UpdatePublisherDTO = {
               publisherName: data.publisherName,
               email: data.email,
               phoneNo: data.phoneNo,
               whatsappNo: data.whatsappNo,
               logo: data.logo instanceof File ? data.logo : undefined,
               w9Files: data.w9Files.filter(
                  (f): f is File => f instanceof File
               ),
               removedW9Files,
               products: mappedProducts,
            };

            const result = await updatePublisher(
               publisher.id,
               payload,
               accessToken
            );
            console.log("Publisher updated:", result);
            toast.success("Publisher updated successfully")
         }

         await onPublisherCreated();
         onClose();
      } catch (err: any) {
         console.error("Submission error:", err);
         toast.error(err.message || "Failed to save publisher.")
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (mode === "edit" && publisher) {
         reset({
            publisherName: publisher.publisherName,
            email: publisher.email,
            phoneNo: publisher.phoneNo,
            whatsappNo: publisher.whatsappNo,
         });

         if (publisher.logo) {
            const fullUrl = `http://localhost:3457${publisher.logo}`;
            setLogoPreview(fullUrl);
         }

         if (publisher.w9Files) {
            const safe = Array.isArray(publisher.w9Files)
               ? publisher.w9Files
               : [];
            setW9FileObjects(safe);
            setValue("w9Files", safe);
         }

         if (publisher.products) {
            const formatted = publisher.products.map((p, idx) => ({
               tempId: idx + 1,
               productName: p.product.productName,
               price: p.price,
            }));

            reset((prev) => ({
               ...prev,
               dynamicProducts: formatted,
            }));

            setLastTempId(formatted.length);
         }
      } else {
         setLogoPreview(null);
         setW9FileObjects([]);
         setLastTempId(0);
         reset();
      }
   }, [mode, publisher, products, reset]);

   return (
      <div
         className="relative w-full overflow-y-auto max-h-[90vh] pb-8"
         style={{
            background:
               "linear-gradient(124.94deg, #F9FBFD 11.14%, #E1EAF7 91.94%)",
         }}
      >
         <div className="flex justify-between items-center px-10 py-6 border-b border-gray-100 sticky top-0 z-20">
            <h2 className="text-2xl font-semibold text-gray-800">
               {mode === "add" ? "Add Publisher" : "Edit Publisher"}
            </h2>
            <button
               onClick={onClose}
               className="text-gray-400 hover:text-gray-600 transition duration-150"
               aria-label="Close"
            >
               <FiX className="h-6 w-6" />
            </button>
         </div>

         <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="space-y-8 px-10 pt-6"
         >
            <div className="grid grid-cols-3 gap-6">
               <div className="flex flex-col gap-6">
                  <Input
                     label="Publisher Name"
                     placeholder="Publisher Name"
                     {...register("publisherName", {
                        required: "Name is required",
                     })}
                     inputClassName="bg-white rounded-full"
                     error={errors.publisherName?.message}
                  />
                  <Input
                     label="Phone"
                     placeholder="0000 0000 00"
                     inputClassName="bg-white rounded-full"
                     {...register("phoneNo", {
                        pattern: {
                           value: PHONE_REGEX,
                           message: "Invalid phone number format",
                        },
                        required: "Phone number is required",
                     })}
                     error={errors.phoneNo?.message}
                  />
                  <Select label="Size" disabled>
                     <option>Size</option>
                  </Select>
               </div>

               <div className="flex flex-col gap-6">
                  <Input
                     label="Email"
                     placeholder="Enter Email"
                     {...register("email", {
                        required: "Email is required",
                        pattern: {
                           value: /^\S+@\S+$/i,
                           message: "Invalid email address",
                        },
                     })}
                     inputClassName="bg-white rounded-full"
                     error={errors.email?.message}
                  />
                  <Select label="Tags" disabled>
                     <option>Tags</option>
                  </Select>
                  <Input
                     label="Commission"
                     placeholder="0"
                     inputClassName="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-500 cursor-not-allowed shadow-sm"
                     disabled
                  />
               </div>

               <div className="flex flex-col gap-6">
                  <Input
                     label="WhatsApp"
                     placeholder="0000 0000 00"
                     inputClassName="bg-white rounded-full"
                     {...register("whatsappNo", {
                        pattern: {
                           value: PHONE_REGEX,
                           message: "Invalid WhatsApp number format",
                        },
                        required: "Whatsapp number is required",
                     })}
                     error={errors.whatsappNo?.message}
                  />
                  <Select label="Audience" disabled>
                     <option>Audience</option>
                  </Select>
                  <Input
                     label="Discount"
                     placeholder="0"
                     inputClassName="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-500 cursor-not-allowed shadow-sm"
                     disabled
                  />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-2">
               <div className="flex flex-col gap-4">
                  <DragDropZone
                     label="Logo"
                     format="jpg, png"
                     icon={FiUpload}
                     id="logo-upload"
                     accept=".jpg,.png"
                     onChange={handleLogoUpload}
                  />
                  {logoPreview && (
                     <div className="w-32 h-32 p-1 border border-gray-200 rounded-xl  shadow-sm">
                        <img
                           src={logoPreview}
                           alt="Logo Preview"
                           className="w-full h-full object-contain rounded-lg"
                        />
                     </div>
                  )}
               </div>

               <div className="flex flex-col gap-4">
                  <DragDropZone
                     label="W9"
                     format="PDF, Docs"
                     icon={FiUpload}
                     id="w9-upload"
                     multiple
                     accept=".pdf,.doc,.docx"
                     onChange={handleW9Upload}
                  />
                  <div className="space-y-2">
                     {w9FileObjects.map((fileOrUrl, index) => {
                        const fileName =
                           typeof fileOrUrl === "string"
                              ? fileOrUrl.split("/").pop()
                              : (fileOrUrl as File).name;

                        return (
                           <div
                              key={index}
                              className="relative p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between shadow-sm pr-10"
                           >
                              <span className="text-sm font-medium text-gray-700 truncate">
                                 {fileName}
                              </span>
                              <button
                                 type="button"
                                 onClick={() => handleRemoveW9File(index)}
                                 className="absolute top-1 right-1 p-1 text-red-400 hover:text-red-600 rounded-full transition"
                                 aria-label={`Remove ${fileName}`}
                              >
                                 <FiX className="h-4 w-4" />
                              </button>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>

            <div className="pt-2">
               <Button
                  type="button"
                  onClick={handleAddProduct}
                  className="bg-[#3D94A1] hover:bg-[#327e8a] text-white px-6 py-2 rounded-lg font-medium transition duration-200"
               >
                  Add Product
               </Button>
            </div>

            {fields.map((field, index) => (
               <div
                  key={field.id}
                  className="p-6 border bg-white border-gray-200 rounded-xl space-y-4 relative"
               >
                  <button
                     type="button"
                     onClick={() => remove(index)}
                     className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition z-10"
                     aria-label="Remove Product"
                  >
                     <FiX className="h-5 w-5" />
                  </button>

                  <div className="grid grid-cols-3 gap-6">
                     <Select label="Product Type">
                        <option>Facebook</option>
                        <option>Instagram</option>
                     </Select>
                     <div className="flex flex-col">
                        <label className="text-gray-500 text-sm font-normal mb-1">
                           Product
                        </label>
                        <select
                           className="w-full outline-0 cursor-pointer rounded-lg p-3 bg-white text-gray-500 shadow-sm"
                           {...register(
                              `dynamicProducts.${index}.productName` as const
                           )}
                        >
                           {products.map((p) => (
                              <option key={p.id} value={p.productName}>
                                 {p.productName}
                              </option>
                           ))}
                        </select>
                     </div>

                     <Input
                        label="Price per credit"
                        placeholder="8"
                        type="number"
                        {...register(
                           `dynamicProducts.${index}.price` as const,
                           { valueAsNumber: true }
                        )}
                     />
                  </div>
               </div>
            ))}

            <div className="sticky bottom-0 py-6 border-t border-gray-100 flex justify-end space-x-4 z-10">
               <Button
                  type="button"
                  onClick={onClose}
                  className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition duration-200"
                  disabled={loading}
               >
                  Cancel
               </Button>
               <Button
                  type="submit"
                  isLoading={loading}
                  disabled={loading}
                  className="bg-[#57C4CF] text-white px-6 py-2 rounded-lg font-medium transition duration-200 hover:bg-[#4ab0bb] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#57C4CF]"
               >
                  Save
               </Button>
            </div>
         </form>
      </div>
   );
}
