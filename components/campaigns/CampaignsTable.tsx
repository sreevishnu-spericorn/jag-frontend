// components/campaigns/CampaignsTable.tsx

"use client";

import { Button } from "../common/Button";
import { CampaignListItemDTO } from "@/types/campaigns"; // Import new type
import { FiEdit3, FiEye } from "react-icons/fi"; // Removed FiTrash2
// import Image from "next/image"; // Not needed as we don't show client logo/info here

type CampaignsTableProps = {
   campaigns: CampaignListItemDTO[];
   loading: boolean;
   role: String | undefined;
   onEdit: (id: string) => void;
   // onDelete: (id: string) => void; // Removed Delete
   onPreview: (id: string) => void; // View Only
};

const formatDate = (dateString: string) => {
   return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
   });
};

// Simplified status rendering: a green dot for 'Active'
const StatusDot = ({ status }: { status: string }) => {
   return (
      <div className="flex items-center gap-2">
         <span
            className="w-3 h-3 rounded-full bg-green-500 block"
            aria-label={status}
         />
         <span className="text-sm font-medium text-gray-800">{status}</span>
      </div>
   );
};


export default function CampaignsTable({
   campaigns,
   onEdit,
   onPreview,
}: CampaignsTableProps) {
   return (
      <div className="flex flex-col w-full h-full">
         <div className="flex-1 overflow-x-auto max-h-[calc(100vh-320px)] custom-scroll pr-3">
            <table
               className="w-full border-separate min-w-max"
               style={{ borderSpacing: "0 10px" }}
            >
               <thead className="sticky top-0 bg-[#F8FAFC] z-10">
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                     <th className="p-3 min-w-[250px]">Publisher Name</th>
                     <th className="p-3 min-w-[200px]">Product Name</th>
                     <th className="p-3 min-w-[120px]">Credit Balance</th>
                     <th className="p-3 min-w-[100px]">Status</th>
                     <th className="p-3 min-w-[120px]">Created On</th>
                     <th className="p-3 min-w-[120px]">Last Updated</th>
                     <th className="p-3 min-w-[120px]">Actions</th>
                  </tr>
               </thead>

               <tbody>
                  {campaigns.map((row) => (
                     <tr
                        key={row.id}
                        className="relative bg-white hover:bg-gray-50 transition rounded-xl shadow-sm border border-gray-200 text-sm text-gray-800"
                     >
                        {/* Publisher Name */}
                        <td className="p-4 rounded-l-xl border-l border-y border-gray-200 font-medium max-w-none min-w-[250px] truncate">
                           <div className="flex items-center gap-3">
                              <div className="flex flex-col min-w-0">
                                 <span className="font-semibold text-gray-900 truncate">
                                    {row.publisher.publisherName}
                                 </span>
                                 <span className="text-xs text-gray-500 truncate">
                                    ID: {row.publisher.id.substring(0, 8)}...
                                 </span>
                              </div>
                           </div>
                        </td>

                        {/* Product Name */}
                        <td className="p-4 text-sm text-gray-800 border-y border-gray-200 min-w-[200px] truncate">
                           {row.product?.productName}
                        </td>

                        {/* Credit Balance (Quantity) */}
                        <td className="p-4 border-y border-gray-200 font-bold text-gray-900 min-w-[120px]">
                           {row.quantity}
                        </td>

                        {/* Status (Green Dot) - Assuming all are 'Active' for paid proposals */}
                        <td className="p-4 border-y border-gray-200 min-w-[100px]">
                           <StatusDot status={row.proposal.proposalStatus} />
                        </td>

                        {/* Dates */}
                        <td className="p-4 text-sm text-gray-500 border-y border-gray-200 min-w-[120px]">
                           {formatDate(row.createdAt)}
                        </td>
                        <td className="p-4 text-sm text-gray-500 border-y border-gray-200 min-w-[120px]">
                           {formatDate(row.updatedAt)}
                        </td>

                        {/* Actions (Edit and View Only) */}
                        <td className="p-4 flex items-center gap-2 rounded-r-xl border-r border-y border-gray-200 min-w-[120px]">
                           {/* View Only Button */}
                           <Button
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:border-[#12ABAA] hover:bg-[#12ABAA]/10 transition cursor-pointer"
                              onClick={() => onPreview(row.id)}
                           >
                              <FiEye
                                 className="text-gray-600 hover:text-[#12ABAA]"
                                 size={16}
                              />
                           </Button>

                           {/* Edit Button */}
                           <Button
                              onClick={() => onEdit(row.id)}
                              // Edit should be enabled since this is a paid campaign
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                           >
                              <FiEdit3
                                 className="text-gray-600 hover:text-blue-600"
                                 size={16}
                              />
                           </Button>

                           {/* Pay/Delete buttons removed */}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
