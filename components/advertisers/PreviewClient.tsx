"use client";
import { ClientDTO } from "@/types/clients";
import { Button } from "../common/Button";
import { FiX, FiUser } from "react-icons/fi";

interface PreviewProps {
   client: ClientDTO | null;
   onClose: () => void;
}

export default function PreviewClient({ client, onClose }: PreviewProps) {
   if (!client) return null;

   const detailItem = (label: string, value: string | undefined | null) => (
      <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50 border border-gray-200">
         <span className="text-sm text-gray-500 font-medium">{label}</span>
         <span className="text-sm text-gray-900 font-semibold">
            {value || "--"}
         </span>
      </div>
   );

   return (
      <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden">
         {/* Header */}
         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-[#12ABAA]/10 text-[#12ABAA] rounded-xl">
                  <FiUser size={22} />
               </div>
               <h2 className="text-xl font-semibold text-gray-800">
                  Client Information
               </h2>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
               {detailItem("Account Name", client.accountName)}
               {detailItem("Contact Name", client.contactName)}
               {detailItem("Email", client.email)}
               {detailItem("Phone", client.phone)}
               {detailItem("Status", client.status)}
               {detailItem("Created On", client.createdAt)}
            </div>

            <div className="flex flex-col items-center justify-start gap-4">
               <div className="w-48 h-48 border border-gray-200 bg-white rounded-2xl shadow-md flex items-center justify-center p-2">
                  <img
                     src={`http://localhost:3457${client.logo}`}
                     alt="Client Logo"
                     className="w-full h-full object-contain"
                  />
               </div>

               <span className="text-sm text-gray-500 font-normal">
                  Company Brand Logo
               </span>
            </div>
         </div>

         <div className="flex justify-end px-8 py-5 border-t border-gray-200">
            <Button
               onClick={onClose}
               className="px-8 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition shadow-md cursor-pointer"
            >
               Close
            </Button>
         </div>
      </div>
   );
}
