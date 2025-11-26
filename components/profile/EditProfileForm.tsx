"use client";

import { useForm } from "react-hook-form";
import { AdminProfileDTO, UpdateProfileDTO } from "@/types/profile";
import { updateProfile } from "@/lib/api/profile";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

interface EditProfileFormProps {
   profile: AdminProfileDTO;
   accessToken: string;
   onSave: (updated: AdminProfileDTO) => void;
}

export default function EditProfileForm({
   profile,
   accessToken,
   onSave,
}: EditProfileFormProps) {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
   } = useForm<UpdateProfileDTO>({
      defaultValues: {
         firstName: profile.firstName,
         lastName: profile.lastName,
         email: profile.email,
         phoneNumber: profile.phoneNumber,
      },
   });

   const onSubmit = async (values: UpdateProfileDTO) => {
      const updated = await updateProfile(values, accessToken);
      onSave(updated);
      reset(updated);
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="space-y-6 p-6 bg-white"
      >
         <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h2>

         {/* GRID LAYOUT */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <Input
                  className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-800 placeholder-gray-400"
                  label="First Name"
                  {...register("firstName", {
                     required: "First name is required",
                  })}
               />
               {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                     {errors.firstName.message}
                  </p>
               )}
            </div>

            <div>
               <Input
                  className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-800 placeholder-gray-400"
                  label="Last Name"
                  {...register("lastName", {
                     required: "Last name is required",
                  })}
               />
               {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                     {errors.lastName.message}
                  </p>
               )}
            </div>

            {/* Email */}
            <div>
               <Input
                  className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-800 placeholder-gray-400"
                  label="Email"
                  type="email"
                  {...register("email", {
                     required: "Email is required",
                     pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                     },
                  })}
               />
               {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                     {errors.email.message}
                  </p>
               )}
            </div>

            {/* Phone Number */}
            <div>
               <Input
                  label="Phone Number"
                  className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-800 placeholder-gray-400"
                  {...register("phoneNumber", {
                     required: "Phone number is required",
                     minLength: {
                        value: 10,
                        message: "Phone number must be at least 10 digits",
                     },
                  })}
               />
               {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                     {errors.phoneNumber.message}
                  </p>
               )}
            </div>
         </div>

         <div className="flex justify-end pt-4">
            <Button
               type="submit"
               disabled={isSubmitting}
               className="px-8 py-3 bg-teal-500 text-white rounded-xl shadow-lg hover:bg-teal-600 transition-all duration-200"
            >
               {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
         </div>
      </form>
   );
}
