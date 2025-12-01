"use client";

import { useState } from "react";
import { FiHome, FiEdit3, FiCheck, FiX } from "react-icons/fi";
import { AdminProfileDTO, UpdateProfileDTO } from "@/types/profile";
import { updateProfile } from "@/lib/api/profile/profile";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

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

   // Local temp state for editing
   const [formData, setFormData] = useState<UpdateProfileDTO>({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
   });

   // update local form
   const handleChange = (field: keyof UpdateProfileDTO, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
   };

   // Save handler
   const handleSave = async () => {
      const updated = await updateProfile(formData, accessToken);

      setProfile((prev) => ({ ...prev, ...updated }));
      setIsEditing(false);
   };

   // Cancel editing
   const handleCancel = () => {
      setFormData({
         firstName: profile.firstName,
         lastName: profile.lastName,
         email: profile.email,
         phoneNumber: profile.phoneNumber,
      });
      setIsEditing(false);
   };

   return (
      <div className="min-h-screen w-full p-8">
         <div>
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
               <FiHome className="h-4 w-4 text-gray-400" />
               <span>My Accounts</span>
               <span className="text-gray-300">/</span>
               <span className="text-gray-900 font-medium">Profile</span>
            </div>

            {/* CARD */}
            <div className="bg-white rounded-[20px] p-6 shadow-xl shadow-gray-100 border border-gray-100">
               <h1 className="text-3xl font-semibold text-gray-800 mb-12">
                  Profile
               </h1>

               {/* Profile Image */}
               <div className="flex gap-16">
                  <div className="flex flex-col items-center">
                     <div className="relative w-[134px] h-[134px] rounded-full overflow-hidden bg-gray-200 shadow-md border" />
                  </div>
               </div>

               {/* FORM GRID */}
               <div className="grid grid-cols-2 gap-10 w-full pt-10">
                  {/* First Name */}
                  <div>
                     <p className="text-sm text-gray-500">First Name</p>
                     <Input
                        value={
                           isEditing ? formData.firstName : profile.firstName
                        }
                        readOnly={!isEditing}
                        onChange={(e) =>
                           handleChange("firstName", e.target.value)
                        }
                        className={`mt-2 w-full rounded-full px-6 py-3 border ${
                           isEditing
                              ? "bg-white border-teal-500"
                              : "bg-[#F7F9FC] border-gray-200"
                        }`}
                     />
                  </div>

                  {/* Last Name */}
                  <div>
                     <p className="text-sm text-gray-500">Last Name</p>
                     <Input
                        value={isEditing ? formData.lastName : profile.lastName}
                        readOnly={!isEditing}
                        onChange={(e) =>
                           handleChange("lastName", e.target.value)
                        }
                        className={`mt-2 w-full rounded-full px-6 py-3 border ${
                           isEditing
                              ? "bg-white border-teal-500"
                              : "bg-[#F7F9FC] border-gray-200"
                        }`}
                     />
                  </div>

                  {/* Phone */}
                  <div>
                     <p className="text-sm text-gray-500">Phone number</p>
                     <Input
                        value={
                           isEditing
                              ? formData.phoneNumber
                              : profile.phoneNumber
                        }
                        readOnly={!isEditing}
                        onChange={(e) =>
                           handleChange("phoneNumber", e.target.value)
                        }
                        className={`mt-2 w-full rounded-full px-6 py-3 border ${
                           isEditing
                              ? "bg-white border-teal-500"
                              : "bg-[#F7F9FC] border-gray-200"
                        }`}
                     />
                  </div>

                  {/* Email */}
                  <div>
                     <p className="text-sm text-gray-500">Email address</p>
                     <Input
                        type="email"
                        value={isEditing ? formData.email : profile.email}
                        readOnly={!isEditing}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={`mt-2 w-full rounded-full px-6 py-3 border ${
                           isEditing
                              ? "bg-white border-teal-500"
                              : "bg-[#F7F9FC] border-gray-200"
                        }`}
                     />
                  </div>
               </div>

               {/* ACTION BUTTONS */}
               <div className="flex gap-4 mt-10">
                  {!isEditing ? (
                     <Button
                        onClick={() => setIsEditing(true)}
                        className="
                           flex items-center gap-2 
                           bg-teal-600 text-white px-8 py-3 
                           rounded-full shadow hover:bg-teal-700 transition
                        "
                     >
                        <FiEdit3 size={18} />
                        Edit Profile
                     </Button>
                  ) : (
                     <>
                        <Button
                           onClick={handleSave}
                           className="
                              flex items-center gap-2 
                              bg-teal-600 text-white px-8 py-3 
                              rounded-full shadow hover:bg-teal-700 transition
                           "
                        >
                           <FiCheck size={18} />
                           Save
                        </Button>

                        <Button
                           onClick={handleCancel}
                           className="
                              flex items-center gap-2 
                              bg-gray-200 text-gray-700 px-8 py-3 
                              rounded-full shadow hover:bg-gray-300 transition
                           "
                        >
                           <FiX size={18} />
                           Cancel
                        </Button>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
