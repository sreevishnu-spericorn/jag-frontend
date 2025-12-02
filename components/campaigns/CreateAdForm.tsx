"use client";

import { useForm, Controller } from "react-hook-form";
import { FiX, FiUpload, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CampaignListItemDTO } from "@/types/campaigns";
import { createAdvertisementAPI } from "@/lib/api/advertisements/advertisements";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

type PreviewItem = {
   url: string;
   type: string;
};

export default function CreateAdForm({
   initialCampaignData,
   customFields,
   onClose,
}: {
   initialCampaignData: CampaignListItemDTO;
   customFields: any[];
   onClose: () => void;
}) {
   const {
      register,
      handleSubmit,
      setValue,
      watch,
      control,
      formState: { errors },
   } = useForm();

   const [previews, setPreviews] = useState<Record<string, PreviewItem[]>>({});
   const { accessToken } = useAuth();
   const router = useRouter();

   const onSubmit = async (data: any) => {
      try {
         const formData = new FormData();

         formData.append("proposalId", initialCampaignData.proposal.id);
         formData.append("publisherId", initialCampaignData.publisher.id);
         formData.append("productId", initialCampaignData.product.id);
         formData.append("adDate", new Date(data.adDate).toISOString());
         formData.append("adTime", new Date(data.adTime).toISOString());

         for (const field of customFields) {
            const label = field.fieldLabel;
            const value = data[label];

            if (previews[label]) {
               const files: File[] = Array.isArray(value) ? value : [];

               files.forEach((file) => {
                  formData.append("files", file);
               });

               formData.append(`customDataKeys`, label);
            } else {
               formData.append(label, value ?? "");
               formData.append(`customDataKeys`, label);
            }
         }

         if (!accessToken) {
            toast.error("Authentication failed");
            return;
         }

         await createAdvertisementAPI(formData, accessToken);

         toast.success("Advertisement created successfully!");

         onClose();
         router.refresh();
      } catch (error: any) {
         console.error("CREATE AD ERROR:", error);
         toast.error(error?.message || "Failed to create advertisement");
      }
   };

   const handleFileChange = (fieldLabel: string, files: FileList) => {
      const maxCount =
         customFields.find((f) => f.fieldLabel === fieldLabel)
            ?.maxUploadCount || Infinity;

      const existingFiles: File[] = watch(fieldLabel)
         ? Array.from(watch(fieldLabel))
         : [];
      const newFilesArray = Array.from(files);

      if (existingFiles.length + newFilesArray.length > maxCount) {
         toast.error(`You can only upload up to ${maxCount} files.`);
         return;
      }

      const updatedFiles = [...existingFiles, ...newFilesArray];

      const urls = updatedFiles.map((file) => ({
         url: URL.createObjectURL(file),
         type: file.type,
      }));
      setPreviews((prev) => ({
         ...prev,
         [fieldLabel]: urls,
      }));

      setValue(fieldLabel, updatedFiles, { shouldValidate: true });
   };

   const removePreview = (fieldLabel: string, index: number) => {
      const updatedPreviews = [...(previews[fieldLabel] || [])];
      updatedPreviews.splice(index, 1);

      setPreviews((prev) => ({
         ...prev,
         [fieldLabel]: updatedPreviews,
      }));

      const currentFiles = watch(fieldLabel)
         ? Array.from(watch(fieldLabel))
         : [];
      const updatedFiles = currentFiles.filter((_, i) => i !== index);

      setValue(fieldLabel, updatedFiles, { shouldValidate: true });
   };

   return (
      <div className="p-8 max-h-[90vh] overflow-y-auto relative">
         {/* Close Button */}
         <Button
            onClick={onClose}
            className="absolute top-4 right-4 p-3 hover:bg-gray-100 rounded-full transition"
         >
            <FiX size={22} />
         </Button>

         <h2 className="text-2xl font-semibold mb-8 text-gray-800">
            Create New Ad
         </h2>

         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-h-[60vh] overflow-y-auto px-4">
               <div className="flex-1 flex flex-col gap-2">
                  <label className="font-medium text-gray-700">
                     Ad Start Date
                  </label>
                  <Controller
                     control={control}
                     name="adDate"
                     rules={{ required: "Ad Start Date is required" }}
                     render={({ field }) => (
                        <DatePicker
                           placeholderText="Select date"
                           selected={field.value}
                           onChange={(date) => field.onChange(date)}
                           dateFormat="yyyy-MM-dd"
                           className="border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition w-full"
                           minDate={new Date()}
                        />
                     )}
                  />
                  {errors.adDate && (
                     <p className="text-red-500 text-[12px]">
                        {errors.adDate?.message as string}
                     </p>
                  )}
               </div>

               <div className="flex-1 flex flex-col gap-2">
                  <label className="font-medium text-gray-700">Ad Time</label>
                  <Controller
                     control={control}
                     name="adTime"
                     rules={{ required: "Ad Time is required" }}
                     render={({ field }) => (
                        <DatePicker
                           selected={field.value}
                           onChange={(date) => field.onChange(date)}
                           showTimeSelect
                           showTimeSelectOnly
                           timeIntervals={15}
                           timeCaption="Time"
                           dateFormat="hh:mm aa"
                           className="border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition w-full"
                           disabled={!watch("adDate")}
                        />
                     )}
                  />
                  {errors.adTime && (
                     <p className="text-red-500 text-[12px]">
                        {errors.adTime?.message as string}
                     </p>
                  )}
               </div>
               {customFields.map((field, index) => {
                  const { fieldType, fieldLabel, characterLimit } = field;

                  if (fieldType === "text") {
                     const fieldValue = watch(fieldLabel) || "";
                     const remainingChars =
                        (characterLimit || 0) - fieldValue.length;

                     return (
                        <div key={index} className="flex flex-col gap-2">
                           <label className="font-medium text-gray-700">
                              {fieldLabel}
                           </label>

                           <Input
                              type="text"
                              {...register(fieldLabel, {
                                 required: `${fieldLabel} is required`,
                                 maxLength: {
                                    value: characterLimit,
                                    message: `Max ${characterLimit} characters`,
                                 },
                                 onChange: (e) => {
                                    if (
                                       e.target.value.length >
                                       (characterLimit || 0)
                                    ) {
                                       e.preventDefault();
                                    }
                                 },
                              })}
                              className="border w-full border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                              placeholder={`Enter ${fieldLabel}`}
                              error={errors[fieldLabel]?.message as string}
                           />

                           {fieldValue.length > 0 && (
                              <p
                                 className={`text-sm ${
                                    remainingChars <= 0
                                       ? "text-red-500"
                                       : "text-blue-500"
                                 }`}
                              >
                                 {remainingChars > 0
                                    ? `${remainingChars} characters remaining`
                                    : "Reached the max character limit"}
                              </p>
                           )}
                        </div>
                     );
                  }

                  if (fieldType === "upload") {
                     return (
                        <div
                           key={index}
                           className="flex flex-col gap-2 col-span-2"
                        >
                           <label className="font-medium text-gray-700">
                              {fieldLabel}
                           </label>

                           <label className="border border-dashed border-gray-400 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                              <FiUpload size={28} className="text-gray-500" />
                              <span className="text-gray-600">
                                 Click to upload (
                                 {field.allowedFormats.join(", ")})
                              </span>

                              <input
                                 type="file"
                                 multiple={field.isMultipleUpload}
                                 accept={field.allowedFormats
                                    .map((f: string) => `.${f}`)
                                    .join(",")}
                                 className="hidden"
                                 {...register(fieldLabel, {
                                    validate: (
                                       files: FileList | File[] | null
                                    ) => {
                                       if (!files || files.length === 0) {
                                          return `${fieldLabel} is required`;
                                       }
                                       const max =
                                          field.maxFileSizeMB * 1024 * 1024;
                                       for (let file of Array.from(files)) {
                                          if (file.size > max)
                                             return `Max file size is ${field.maxFileSizeMB}MB`;
                                       }

                                       const allowed = field.allowedFormats;
                                       for (let file of Array.from(files)) {
                                          const ext = file.name
                                             .split(".")
                                             .pop()
                                             ?.toLowerCase();
                                          if (!allowed.includes(ext || "")) {
                                             return `Allowed formats: ${allowed.join(
                                                ", "
                                             )}`;
                                          }
                                       }

                                       return true;
                                    },
                                 })}
                                 onChange={(e) => {
                                    if (e.target.files)
                                       handleFileChange(
                                          fieldLabel,
                                          e.target.files
                                       );
                                 }}
                              />
                           </label>

                           {/* Preview Section */}
                           {previews[fieldLabel]?.map((item, i) => {
                              const isVideo = item.type.startsWith("video");

                              return (
                                 <div
                                    key={i}
                                    className="relative group bg-gray-100 p-2 rounded-xl"
                                 >
                                    {isVideo ? (
                                       <video
                                          src={item.url}
                                          controls
                                          className="w-full h-50 object-cover rounded-xl shadow"
                                       />
                                    ) : (
                                       <img
                                          src={item.url}
                                          className="w-full h-50 object-cover rounded-xl shadow"
                                       />
                                    )}

                                    {/* Remove Button */}
                                    <Button
                                       onClick={() =>
                                          removePreview(fieldLabel, i)
                                       }
                                       className="absolute top-2 right-2 bg-white/90 p-1 rounded-full shadow hover:bg-red-100 transition"
                                    >
                                       <FiTrash2
                                          size={16}
                                          className="text-red-500"
                                       />
                                    </Button>
                                 </div>
                              );
                           })}

                           {errors[fieldLabel] && (
                              <p className="text-red-500 text-sm">
                                 {errors[fieldLabel]?.message as string}
                              </p>
                           )}
                        </div>
                     );
                  }
               })}
            </div>

            <Button
               type="submit"
               className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium shadow-lg hover:bg-blue-700 transition"
            >
               Submit Ad
            </Button>
         </form>
      </div>
   );
}
