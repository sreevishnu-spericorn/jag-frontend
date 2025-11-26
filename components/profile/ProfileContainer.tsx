"use client";

import React, { useState } from "react";
import { FiHome, FiEdit3 } from "react-icons/fi";
import Modal from "../common/Modal";
import EditProfileForm from "./EditProfileForm";
import { AdminProfileDTO } from "@/types/profile";
import { Button } from "../common/Button";

interface ProfileContainerProps {
   initialProfile: AdminProfileDTO;
   accessToken: string;
}

const DetailItem: React.FC<{ label: string; value: string | undefined }> = ({
   label,
   value,
}) => (
   <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800 mt-1 truncate">
         {value || "N/A"}
      </p>
   </div>
);

export default function ProfileContainer({
   initialProfile,
   accessToken,
}: ProfileContainerProps) {
   const [profile, setProfile] = useState<AdminProfileDTO>(initialProfile);
   const [isEditOpen, setIsEditOpen] = useState(false);

   const handleEditSave = (updatedProfile: AdminProfileDTO) => {
      console.log(updatedProfile);
      setProfile((prev) => ({ ...prev, ...updatedProfile }));
      setIsEditOpen(false);
   };

   return (
      <div className="w-full min-h-screen px-10 py-3">
         <div className="w-full h-full px-10 py-3">
            <div className="min-h-screen w-full p-8">
               <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
                  <FiHome className="h-4 w-4 text-gray-400" />
                  <span>My Accounts</span>
                  <span className="text-gray-300">/</span>
                  <span className="text-gray-900 font-medium">Profile</span>
               </div>

               <div className="bg-white rounded-[20px] p-8 md:p-12 border border-gray-100 shadow-xl">
                  <h1 className="text-3xl font-extrabold text-gray-800 mb-10">
                     User Profile
                  </h1>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-16">
                     <div className="col-span-1 flex flex-col items-center justify-start">
                        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-teal-500 shadow-lg bg-gray-200"></div>
                        <p className="text-lg font-semibold text-gray-700 mt-4">
                           {profile?.firstName} {profile?.lastName}
                        </p>
                     </div>

                     <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <DetailItem
                           label="First Name"
                           value={profile?.firstName}
                        />
                        <DetailItem
                           label="Last Name"
                           value={profile?.lastName}
                        />
                        <DetailItem
                           label="Email Address"
                           value={profile?.email}
                        />
                        <DetailItem
                           label="Phone Number"
                           value={profile?.phoneNumber}
                        />
                        <DetailItem label="User ID" value={profile?.id} />
                        <DetailItem label="Role" value={profile?.roleId} />
                     </div>
                  </div>

                  <div className="flex justify-end mt-12 pt-8 border-t border-gray-100">
                     <Button
                        onClick={() => setIsEditOpen(true)}
                        className="px-8 py-3 bg-teal-500 text-white font-semibold rounded-full shadow-lg hover:bg-teal-600 transition-colors flex items-center gap-2"
                     >
                        <FiEdit3 size={18} />
                        Edit Profile
                     </Button>
                  </div>
               </div>

               <Modal
                  isOpen={isEditOpen}
                  onClose={() => setIsEditOpen(false)}
                  size="md"
               >
                  <EditProfileForm
                     profile={profile}
                     accessToken={accessToken}
                     onSave={handleEditSave}
                  />
               </Modal>
            </div>
         </div>
      </div>
   );
}