"use client";

import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { createClient, updateClient } from "@/lib/api/clients";
import { FormClientDTO } from "@/types/clients";
import { ClientDTO, CreateClientDTO } from "@/types/clients";
import { toast } from "react-toastify";

interface FormValues {
   accountName: string;
   contactName: string;
   email: string;
   phone: string;
   welcomeEmail: boolean;
   sendWelcom?: boolean;
   logo?: string | File | undefined;
}

interface AddClientFormProps {
   onClose: () => void;
   mode: "add" | "edit";
   client?: ClientDTO | null;
   accessToken?: string | null;
   onClientCreated: () => void;
}

const AddClientForm = ({
   mode,
   client,
   accessToken,
   onClose,
   onClientCreated,
}: AddClientFormProps) => {
   const {
      register,
      reset,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<FormValues>({
      defaultValues: {
         accountName: "",
         contactName: "",
         email: "",
         phone: "",
         welcomeEmail: false,
      },
   });

   useEffect(() => {
      if (mode === "edit" && client) {
         reset({
            accountName: client.accountName,
            contactName: client.contactName,
            phone: client.phone,
            email: client.email,
            logo: client.logo,
         });
         console.log("dassadsa");
         setImagePreview(`http://localhost:3457${client.logo}`);
      } else {
         reset({
            accountName: "",
            contactName: "",
            phone: "",
            email: "",
            welcomeEmail: false,
         });
      }
   }, [client, mode, reset]);

   const [imagePreview, setImagePreview] = useState<string | null>(null);
   const [loading, setloading] = useState(false);

   const onSubmit: SubmitHandler<FormValues> = async (data) => {
      if (!accessToken) return;
      try {
         setloading(true);

         const fileInput = document.getElementById(
            "logo-upload"
         ) as HTMLInputElement;

         const selectedFile = fileInput?.files?.[0];

         const clientData: FormClientDTO = {
            ...data,
            logo: selectedFile ? selectedFile : client?.logo,
         };

         if (mode === "edit" && client?.id) {
            await updateClient(client.id, accessToken, clientData);
            console.log(clientData);
            toast.info("Client details Updated");
         } else {
            const createPayload: CreateClientDTO = {
               ...clientData,
               logo: selectedFile || undefined,
            };
            await createClient(createPayload, accessToken);
            toast.success("Client added successflly");
         }

         onClientCreated();
         onClose();
      } catch (error: any) {
         console.error("Error creating client:", error.message);
         alert(error.message);
      } finally {
         setloading(false);
      }
   };

   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => setImagePreview(reader.result as string);
         reader.readAsDataURL(file);
      }
   };

   return (
      <div className="rounded-2xl w-full max-w-[962px] mx-auto overflow-hidden">
         <div className="flex justify-between items-center px-8 py-4 border-b border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800">Add Client</h2>
         </div>

         <div className="px-8 py-6 max-h-[80vh] overflow-y-auto">
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="space-y-6 flex flex-col"
            >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-6">
                     <div className="flex gap-4 items-start">
                        <label
                           htmlFor="logo-upload"
                           className="cursor-pointer p-4 border-2 border-dashed border-gray-300 rounded-xl w-32 h-32 flex flex-col items-center justify-center text-center hover:border-cyan-400 transition duration-200"
                        >
                           <FiUpload className="h-8 w-8 text-cyan-500" />
                           <p className="text-sm text-cyan-500 font-medium mt-2">
                              Upload Logo
                           </p>
                           <input
                              id="logo-upload"
                              type="file"
                              name="logo"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                           />
                        </label>

                        {imagePreview && (
                           <img
                              src={imagePreview}
                              alt="Logo Preview"
                              className="w-32 h-32 object-cover rounded-xl border border-gray-200 shadow-sm"
                           />
                        )}
                     </div>

                     <Input
                        label="Account Name"
                        id="accountName"
                        placeholder="Account Name"
                        {...register("accountName", {
                           required: "Account Name is required",
                        })}
                        error={errors.accountName?.message}
                        inputClassName="border border-gray-300"
                     />
                     <Input
                        label="Contact Name"
                        id="contactName"
                        placeholder="Contact Name"
                        {...register("contactName", {
                           required: "Contact Name is required",
                        })}
                        error={errors.contactName?.message}
                        inputClassName="border border-gray-300"
                     />
                     <Input
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                           required: "Email is required",
                           pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Invalid email address",
                           },
                        })}
                        error={errors.email?.message}
                        inputClassName="border border-gray-300"
                     />
                  </div>

                  <div className="flex flex-col gap-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                           Tags
                        </label>
                        <input
                           type="text"
                           value="Business, Business"
                           disabled
                           className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-500 cursor-not-allowed shadow-sm"
                        />
                     </div>

                     <Input
                        label="Phone"
                        id="phone"
                        type="tel"
                        placeholder="Phone"
                        {...register("phone", {
                           required: "Phone is required",
                        })}
                        error={errors.phone?.message}
                        inputClassName="border border-gray-300"
                     />

                     <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                           Agent
                        </label>
                        <select
                           value="Agent"
                           disabled
                           className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-500 cursor-not-allowed shadow-sm"
                        >
                           <option>Agent</option>
                           <option>Agent 1</option>
                           <option>Agent 2</option>
                        </select>
                     </div>

                     <div className="flex items-center border border-gray-300 rounded-lg p-3 shadow-sm bg-white mt-2">
                        <Controller
                           name="welcomeEmail"
                           control={control}
                           render={({ field }) => {
                              const { onChange, onBlur, name, ref, value } =
                                 field;
                              return (
                                 <input
                                    type="checkbox"
                                    checked={value} // boolean
                                    onChange={(e) => onChange(e.target.checked)}
                                    onBlur={onBlur}
                                    name={name}
                                    ref={ref}
                                    className="h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                                 />
                              );
                           }}
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                           Send Welcome Email
                        </label>
                     </div>
                  </div>
               </div>

               <div className="flex justify-end pt-6 border-t border-gray-100 mt-6">
                  <Button
                     type="button"
                     onClick={onClose}
                     className="px-6 py-3 w-[171px] h-11 mr-4 text-[#12ABAA] border border-[#12ABAA] font-medium hover:bg-gray-50 transition duration-200 cursor-pointer"
                  >
                     Cancel
                  </Button>
                  <Button
                     type="submit"
                     isLoading={loading}
                     className="px-8 py-3 w-[171px] h-11 bg-[#12ABAA] text-white font-medium shadow-lg hover:bg-cyan-600 transition duration-200 cursor-pointer"
                  >
                     Save
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default AddClientForm;
