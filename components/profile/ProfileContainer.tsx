"use client";

import { useEffect, useState } from "react";
import { FiHome, FiEdit3, FiCheck, FiX } from "react-icons/fi";
import { AdminProfileDTO, UpdateProfileDTO } from "@/types/profile";
import { updateProfile } from "@/lib/api/profile/profile";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Controller, useForm } from "react-hook-form";

interface ProfileContainerProps {
   initialProfile: AdminProfileDTO;
   accessToken: string | null;
}

export default function ProfileContainer({
   initialProfile,
   accessToken,
}: ProfileContainerProps) {
   const [profile, setProfile] = useState(initialProfile);
   const [isEditing, setIsEditing] = useState(false);

   const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<UpdateProfileDTO>({
      defaultValues: {
         firstName: initialProfile.firstName,
         lastName: initialProfile.lastName,
         phoneNumber: initialProfile.phoneNumber,
      },
   });

   /** Sync form when profile updates */
   useEffect(() => {
      reset({
         firstName: profile.firstName,
         lastName: profile.lastName,
         phoneNumber: profile.phoneNumber,
      });
   }, [profile, reset]);

   const handleEdit = () => {
      reset({
         firstName: profile.firstName,
         lastName: profile.lastName,
         phoneNumber: profile.phoneNumber,
      });
      setIsEditing(true);
   };

   const handleSave = async (values: UpdateProfileDTO) => {
      const updated = await updateProfile(
         {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            // ❌ email removed — not updatable
         },
         accessToken
      );

      setProfile((prev) => ({
         ...prev,
         ...updated,
      }));

      reset({
         firstName: updated.firstName,
         lastName: updated.lastName,
         phoneNumber: updated.phoneNumber,
      });

      setIsEditing(false);
   };

   const handleCancel = () => {
      reset({
         firstName: profile.firstName,
         lastName: profile.lastName,
         phoneNumber: profile.phoneNumber,
      });
      setIsEditing(false);
   };

   return (
      <div className="min-h-screen w-full p-8">
         <div>
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
               <FiHome className="h-4 w-4 text-gray-400" />
               <span>My Accounts</span>
               <span className="text-gray-300">/</span>
               <span className="text-gray-900 font-medium">Profile</span>
            </div>

            <div className="bg-white rounded-[20px] p-6 shadow-xl shadow-gray-100 border border-gray-100">
               <h1 className="text-3xl font-semibold text-gray-800 mb-12">
                  Profile
               </h1>

               <div className="flex gap-16">
                  <div className="flex flex-col items-center">
                     <div className="relative w-[134px] h-[134px] rounded-full overflow-hidden bg-gray-200 shadow-md border" />
                  </div>
               </div>

               <form
                  onSubmit={handleSubmit(handleSave)}
                  className="grid grid-cols-2 gap-10 w-full pt-10"
               >
                  <Field
                     label="First Name"
                     name="firstName"
                     control={control}
                     errors={errors.firstName?.message}
                     disabled={!isEditing}
                  />

                  <Field
                     label="Last Name"
                     name="lastName"
                     control={control}
                     errors={errors.lastName?.message}
                     disabled={!isEditing}
                  />

                  <Field
                     label="Phone Number"
                     name="phoneNumber"
                     control={control}
                     errors={errors.phoneNumber?.message}
                     disabled={!isEditing}
                  />

                  {/* EMAIL FIELD — FULLY DISABLED, NOT REGISTERED */}
                  <div>
                     <p className="text-sm text-gray-500">Email Address</p>
                     <Input
                        value={profile.email}
                        disabled
                        className="mt-2 w-full rounded-full px-6 py-3 border bg-[#F7F9FC] border-gray-200 pointer-events-none text-gray-500"
                     />
                  </div>

                  <div className="col-span-2 flex gap-4 mt-10">
                     {!isEditing ? (
                        <Button
                           type="button"
                           onClick={(e) => {
                              e.preventDefault();
                              handleEdit();
                           }}
                           className="flex items-center gap-2 bg-teal-600 text-white px-8 py-3 rounded-full shadow hover:bg-teal-700 transition"
                        >
                           <FiEdit3 size={18} />
                           Edit Profile
                        </Button>
                     ) : (
                        <>
                           <Button
                              type="submit"
                              className="flex items-center gap-2 bg-teal-600 text-white px-8 py-3 rounded-full shadow hover:bg-teal-700 transition"
                           >
                              <FiCheck size={18} />
                              Save
                           </Button>

                           <Button
                              type="button"
                              onClick={handleCancel}
                              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-8 py-3 rounded-full shadow hover:bg-gray-300 transition"
                           >
                              <FiX size={18} />
                              Cancel
                           </Button>
                        </>
                     )}
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

function Field({ label, name, control, errors, disabled }: any) {
   return (
      <div>
         <p className="text-sm text-gray-500">{label}</p>

         <Controller
            name={name}
            control={control}
            rules={{ required: `${label} is required` }}
            render={({ field }: any) => (
               <Input
                  {...field}
                  disabled={disabled}
                  className={`mt-2 w-full rounded-full px-6 py-3 border ${
                     !disabled
                        ? "bg-white border-teal-500"
                        : "bg-[#F7F9FC] border-gray-200 pointer-events-none"
                  }`}
               />
            )}
         />

         {errors && <p className="text-red-500 text-xs mt-1">{errors}</p>}
      </div>
   );
}
