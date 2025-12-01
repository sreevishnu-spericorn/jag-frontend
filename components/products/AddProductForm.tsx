"use client";

import {
   useForm,
   SubmitHandler,
   useFieldArray,
   Controller,
} from "react-hook-form";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { createProduct, updateProduct } from "@/lib/api/products";
import { ProductDTO } from "@/types/products";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { Trash2 } from "lucide-react";
import { STANDARD_FORMATS,customSelectStyles } from "./CustomData";

interface CustomField {
   fieldType: string;
   fieldLabel: string;
   characterLimit?: number;
   allowedFormats?: string[];
   maxFileSizeMB?: number;
   widthPx?: number;
   heightPx?: number;

   isMultipleUpload?: boolean;
   maxUploadCount?: number;
}

interface FormValues {
   productName: string;
   productType: string;
   mediaApprovalRequired: boolean;
   isBannerAd: boolean;
   tags: string;
   customFields: CustomField[];
}

interface AddProductFormProps {
   mode: "add" | "edit";
   product?: ProductDTO | null;
   onClose: () => void;
   onProductCreated: () => void;
   accessToken: string | null;
}


export default function AddProductForm({
   mode,
   product,
   onClose,
   onProductCreated,
   accessToken,
}: AddProductFormProps) {
   const {
      register,
      handleSubmit,
      control,
      watch,
      setValue,
      formState: { errors },
      reset,
   } = useForm<FormValues>({
      defaultValues: {
         productName: "",
         productType: "default",
         mediaApprovalRequired: false,
         isBannerAd: false,
         tags: "",
         customFields: [
            {
               fieldType: "text",
               fieldLabel: "",
               characterLimit: 250,
               allowedFormats: [],
            },
         ],
      },
   });

   const { fields, append, remove } = useFieldArray({
      control,
      name: "customFields",
   });

   useEffect(() => {
      if (mode === "edit" && product) {
         reset({
            productName: product.productName,
            productType: "default",
            mediaApprovalRequired: false,
            isBannerAd: false,
            tags: "tag1, tag2",
            customFields:
               product.customFields?.map((f) => ({
                  ...f,
                  allowedFormats: f.allowedFormats || [],
               })) || [],
         });
      } else {
         reset({
            productName: "",
            productType: "default",
            mediaApprovalRequired: false,
            isBannerAd: false,
            tags: "",
            customFields: [
               {
                  fieldType: "text",
                  fieldLabel: "",
                  characterLimit: 250,
                  allowedFormats: [],
               },
            ],
         });
      }
   }, [product, mode, reset]);

   const onSubmit: SubmitHandler<FormValues> = async (data) => {
      if (data.customFields.length === 0)
         return toast.info("Must include at least one field");

      const payload = {
         productName: data.productName,
         customFields: data.customFields.map((f) => ({
            ...f,
            allowedFormats: f.allowedFormats || [],
            maxFileSizeMB: f.maxFileSizeMB || undefined,
            widthPx: f.widthPx || undefined,
            heightPx: f.heightPx || undefined,
         })),
      };

      console.log(payload);

      try {
         if (mode === "edit" && product?.id) {
            await updateProduct(product.id, payload, accessToken);
            toast.info("Product updated");
         } else {
            await createProduct(payload, accessToken);
            toast.success("Product created");
         }
         onProductCreated();
         onClose();
      } catch (err: any) {
         const message =
            err?.response?.data?.message || 
            err?.message || 
            "Something went wrong";

         toast.error(message);
      }
   };

   return (
      <div className="flex flex-col max-h-[85vh] overflow-y-auto p-8 space-y-8 rounded-xl">
         <h2 className="text-2xl font-semibold text-gray-800">Add Product </h2>

         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Input
                  label="Product Name"
                  id="productName"
                  placeholder="Enter product name"
                  {...register("productName", {
                     required: "Product name is required",
                  })}
                  error={errors.productName?.message}
                  inputClassName="border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-2 focus:ring-teal-200 focus:outline-none"
               />

               <Input
                  label="Category"
                  disabled
                  value="Default Category"
                  inputClassName="border border-gray-300 rounded-lg shadow-sm px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
               />

               <Input
                  label="Tags"
                  disabled
                  value="General, Example"
                  inputClassName="border border-gray-300 rounded-lg shadow-sm px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
               />

               <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                     Status
                  </label>

                  <select
                     disabled
                     className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed shadow-sm"
                  >
                     <option>Active</option>

                     <option>Inactive</option>
                  </select>
               </div>
            </div>
            <div className="w-full h-px bg-gray-200"></div>{" "}
            <div className="space-y-6">
               <Button
                  type="button"
                  onClick={() =>
                     append({
                        fieldType: "text",
                        fieldLabel: "",
                        characterLimit: 250,
                        allowedFormats: [],
                     })
                  }
                  className="px-6 py-3 bg-[#12ABAA] text-white rounded-lg shadow-md hover:bg-cyan-600 transition font-medium"
               >
                  Add Field
               </Button>

               {fields.map((field, index) => {
                  const type = watch(`customFields.${index}.fieldType`);

                  return (
                     <div
                        key={field.id}
                        className="p-4 border border-gray-200 rounded-lg space-y-4 relative"
                     >
                        <div className="flex justify-between items-center mb-4">
                           <h3 className="text-lg font-semibold text-gray-700">
                              Field {index + 1}
                           </h3>
                           <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 hover:text-red-700 transition"
                           >
                              <Trash2 size={20} />
                           </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                           <div>
                              <label className="block text-sm font-medium text-gray-500 mb-1">
                                 Field Type
                              </label>
                              <select
                                 {...register(
                                    `customFields.${index}.fieldType`,
                                    {
                                       required: true,
                                    }
                                 )}
                                 className="border border-gray-300 rounded-lg px-4 py-3 w-full shadow-sm focus:ring-2 focus:ring-teal-200 focus:outline-none"
                              >
                                 <option value="text">Text Field</option>
                                 <option value="upload">Upload Field</option>
                              </select>
                           </div>

                           <Input
                              label="Field Label"
                              {...register(`customFields.${index}.fieldLabel`, {
                                 required: "Field Label is required",
                              })}
                              inputClassName="border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-2 focus:ring-teal-200 focus:outline-none"
                              error={
                                 errors.customFields?.[index]?.fieldLabel
                                    ?.message
                              }
                           />
                        </div>

                        {type === "text" && (
                           <Input
                              label="Character Limit"
                              type="number"
                              placeholder="250"
                              {...register(
                                 `customFields.${index}.characterLimit`,
                                 { required: true, valueAsNumber: true }
                              )}
                              inputClassName="border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-2 focus:ring-teal-200 focus:outline-none"
                           />
                        )}

                        {type === "upload" && (
                           <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                 <Controller
                                    control={control}
                                    name={`customFields.${index}.allowedFormats`}
                                    rules={{
                                       required: "Allowed Formats is required",
                                    }}
                                    render={({
                                       field: controllerField,
                                       fieldState: { error },
                                    }) => (
                                       <div>
                                          <label className="block text-sm font-medium text-gray-500 mb-1">
                                             Allowed Formats
                                          </label>
                                          <Select
                                             isMulti
                                             options={STANDARD_FORMATS}
                                             value={STANDARD_FORMATS.filter(
                                                (f) =>
                                                   controllerField.value?.includes(
                                                      f.value
                                                   )
                                             )}
                                             onChange={(selected) =>
                                                controllerField.onChange(
                                                   selected.map((s) => s.value)
                                                )
                                             }
                                             styles={customSelectStyles}
                                             className="shadow-sm"
                                          />
                                          {error && (
                                             <p className="mt-1 text-sm text-red-600">
                                                {error.message}
                                             </p>
                                          )}
                                       </div>
                                    )}
                                 />

                                 <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                       Dimensions
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                       <div className="flex items-center space-x-2">
                                          <Input
                                             type="number"
                                             placeholder="1980"
                                             {...register(
                                                `customFields.${index}.widthPx`,
                                                {
                                                   required:
                                                      "Width is required",
                                                   valueAsNumber: true,
                                                }
                                             )}
                                             inputClassName="border border-gray-300 rounded-lg shadow-sm px-2 py-3 focus:ring-2 focus:ring-teal-200 focus:outline-none w-full text-center"
                                             error={
                                                errors.customFields?.[index]
                                                   ?.widthPx?.message
                                             }
                                          />
                                          <span className="text-gray-500">
                                             Pixels
                                          </span>
                                       </div>

                                       <div className="flex items-center justify-center">
                                          <span className="text-gray-500">
                                             W
                                          </span>
                                       </div>

                                       <div className="flex items-center space-x-2">
                                          <Input
                                             type="number"
                                             placeholder="1080"
                                             {...register(
                                                `customFields.${index}.heightPx`,
                                                {
                                                   required:
                                                      "Height is required",
                                                   valueAsNumber: true,
                                                }
                                             )}
                                             inputClassName="border border-gray-300 rounded-lg shadow-sm px-2 py-3 focus:ring-2 focus:ring-teal-200 focus:outline-none w-full text-center"
                                             error={
                                                errors.customFields?.[index]
                                                   ?.heightPx?.message
                                             }
                                          />
                                          <span className="text-gray-500">
                                             Pixels
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              <Input
                                 label="Maximum File Size"
                                 type="number"
                                 placeholder="MB"
                                 {...register(
                                    `customFields.${index}.maxFileSizeMB`,
                                    {
                                       required: "Max File Size is required",
                                       valueAsNumber: true,
                                    }
                                 )}
                                 inputClassName="border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-2 focus:ring-teal-200 focus:outline-none w-1/4"
                                 error={
                                    errors.customFields?.[index]?.maxFileSizeMB
                                       ?.message
                                 }
                              />

                              <div className="flex items-center space-x-4 mt-2">
                                 <label className="text-sm font-medium text-gray-600">
                                    Allow Multiple Uploads?
                                 </label>

                                 <button
                                    type="button"
                                    onClick={() =>
                                       setValue(
                                          `customFields.${index}.isMultipleUpload`,
                                          !watch(
                                             `customFields.${index}.isMultipleUpload`
                                          )
                                       )
                                    }
                                    className={`
         relative inline-flex h-6 w-11 items-center rounded-full transition
         ${
            watch(`customFields.${index}.isMultipleUpload`)
               ? "bg-teal-600"
               : "bg-gray-300"
         }
      `}
                                 >
                                    <span
                                       className={`
            inline-block h-5 w-5 transform rounded-full bg-white transition
            ${
               watch(`customFields.${index}.isMultipleUpload`)
                  ? "translate-x-5"
                  : "translate-x-1"
            }
         `}
                                    />
                                 </button>
                              </div>

                              {watch(
                                 `customFields.${index}.isMultipleUpload`
                              ) === true && (
                                 <Input
                                    label="Max Upload Count"
                                    type="number"
                                    placeholder="Enter number"
                                    {...register(
                                       `customFields.${index}.maxUploadCount`,
                                       {
                                          required:
                                             "Max Upload Count is required",
                                          valueAsNumber: true,
                                          min: {
                                             value: 1,
                                             message: "Minimum 1 required",
                                          },
                                       }
                                    )}
                                    inputClassName="border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-2 focus:ring-teal-200 focus:outline-none w-1/4"
                                    error={
                                       errors.customFields?.[index]
                                          ?.maxUploadCount?.message
                                    }
                                 />
                              )}
                           </div>
                        )}
                     </div>
                  );
               })}
            </div>
            <div className="w-full h-px bg-gray-200"></div>{" "}
            <div className="flex justify-end pt-4 space-x-4">
               <Button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-[#12ABAA] border border-[#12ABAA] font-medium rounded-lg hover:bg-gray-50 transition min-w-[120px]"
               >
                  Cancel
               </Button>
               <Button
                  type="submit"
                  className="px-8 py-3 bg-[#12ABAA] text-white font-medium shadow-lg hover:bg-cyan-600 transition rounded-lg min-w-[120px]"
               >
                  Save
               </Button>
            </div>
         </form>
      </div>
   );
}
