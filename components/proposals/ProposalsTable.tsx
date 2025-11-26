"use client";

import { Button } from "../common/Button";
import { ProposalListItemDTO } from "@/types/proposals";
import { FiEdit3, FiEye, FiTrash2 } from "react-icons/fi";
import Image from "next/image";

type ProposalTableProps = {
   proposals: ProposalListItemDTO[];
   loading: boolean;
   onEdit: (id: string) => void;
   onDelete: (id: string) => void;
   onPreview: (id: string) => void;
};

const getStatusClasses = (status: ProposalListItemDTO["proposalStatus"]) => {
   switch (status) {
      case "Pending":
         return "bg-yellow-100 text-yellow-700";
      case "Approved":
      case "Paid":
         return "bg-green-100 text-green-700";
      case "Sent":
         return "bg-blue-100 text-blue-700";
      case "Rejected":
         return "bg-red-100 text-red-700";
      default:
         return "bg-gray-100 text-gray-700";
   }
};

const getPaymentStatusClasses = (
   status: ProposalListItemDTO["paymentStatus"]
) => {
   switch (status) {
      case "Paid":
         return "bg-green-100 text-green-700";
      case "Unpaid":
         return "bg-yellow-100 text-yellow-700";
      case "Canceled":
         return "bg-red-100 text-red-700";
      default:
         return "bg-gray-100 text-gray-700";
   }
};

const formatDate = (dateString: string) => {
   return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
   });
};

export default function ProposalsTable({
   proposals,
   loading,
   onEdit,
   onDelete,
   onPreview,
}: ProposalTableProps) {
   return (
      <div className="flex flex-col w-full h-full">
         <div className="flex-1 overflow-x-auto max-h-[calc(100vh-320px)] custom-scroll pr-3">
            <table
               className="w-full border-separate min-w-max"
               style={{ borderSpacing: "0 10px" }}
            >
               <thead className="sticky top-0 bg-[#F8FAFC] z-10">
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                     <th className="p-3 min-w-[250px]">Proposal Name & ID</th>
                     <th className="p-3 min-w-[200px]">Client Email</th>
                     <th className="p-3 min-w-[120px]">Phone</th>
                     <th className="p-3 min-w-[100px]">Total</th>
                     <th className="p-3 min-w-[120px]">Payment Status</th>
                     <th className="p-3 min-w-[100px]">Status</th>
                     <th className="p-3 min-w-[120px]">Created On</th>
                     <th className="p-3 min-w-[120px]">Last Updated</th>
                     <th className="p-3 min-w-[120px]">Actions</th>
                  </tr>
               </thead>

               <tbody>
                  {proposals.map((row) => (
                     <tr
                        key={row.id}
                        className="relative bg-white hover:bg-gray-50 transition rounded-xl shadow-sm border border-gray-200 text-sm text-gray-800"
                     >
                        {/* Proposal Name, Logo, and ID */}
                        <td className="p-4 rounded-l-xl border-l border-y border-gray-200 font-medium max-w-none min-w-[250px] truncate">
                           <div className="flex items-center gap-3">
                              {/* Correct Logo size to 40x40px */}
                              <div className="w-10 h-10 rounded-[15px] overflow-hidden flex items-center justify-center border border-gray-100 bg-white shrink-0">
                                 {row.client.logo ? (
                                    <div className="w-full h-full flex items-center justify-center">
                                       <img
                                          src={`http://localhost:3457/${row.client.logo}`}
                                          alt="Client Logo"
                                          className="w-10 h-10 object-contain"
                                       />
                                    </div>
                                 ) : (
                                    <div className="w-10 h-10 bg-gray-200 text-gray-500 flex items-center justify-center text-base font-semibold">
                                       {row.client.accountName[0]}
                                    </div>
                                 )}
                              </div>
                              <div className="flex flex-col min-w-0">
                                 <span className="font-semibold text-gray-900 truncate">
                                    {row.proposalName}
                                 </span>
                                 <span className="text-xs text-gray-500 truncate">
                                    ID: {row.id.substring(0, 8)}...
                                 </span>
                              </div>
                           </div>
                        </td>

                        <td className="p-4 text-xs text-gray-500 border-y border-gray-200 min-w-[200px] truncate">
                           {row.client.email}
                        </td>

                        <td className="p-4 text-xs text-gray-500 border-y border-gray-200 min-w-[120px] truncate">
                           {row.client.phone || "--"}
                        </td>

                        {/* Total Amount (using server-calculated totalAmount) */}
                        <td className="p-4 border-y border-gray-200 font-bold text-gray-900 min-w-[100px]">
                           {/* Safe toFixed call */}$
                           {(row.totalAmount ?? 0).toFixed(2)}
                        </td>

                        {/* Status */}
                        <td className="p-4 border-y border-gray-200 min-w-[120px]">
                           <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusClasses(
                                 row.paymentStatus
                              )}`}
                           >
                              {row.paymentStatus}
                           </span>
                        </td>
                        <td className="p-4 border-y border-gray-200 min-w-[100px]">
                           <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(
                                 row.proposalStatus
                              )}`}
                           >
                              {row.proposalStatus === "Paid"
                                 ? "Active"
                                 : "Pending"}
                           </span>
                        </td>

                        {/* Dates */}
                        <td className="p-4 text-sm text-gray-500 border-y border-gray-200 min-w-[120px]">
                           {formatDate(row.createdAt)}
                        </td>
                        <td className="p-4 text-sm text-gray-500 border-y border-gray-200 min-w-[120px]">
                           {formatDate(row.updatedAt)}
                        </td>

                        {/* Actions */}
                        <td className="p-4 flex items-center gap-2 rounded-r-xl border-r border-y border-gray-200 min-w-[120px]">
                           <Button
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:border-[#12ABAA] hover:bg-[#12ABAA]/10 transition cursor-pointer"
                              onClick={() => onPreview(row.id)}
                           >
                              <FiEye
                                 className="text-gray-600 hover:text-[#12ABAA]"
                                 size={16}
                              />
                           </Button>

                           <Button
                              onClick={() => onEdit(row.id)}
                              disabled={row.proposalStatus === "Paid"} // ❌ Disable if Paid
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer ${
                                 row.proposalStatus === "Paid"
                                    ? "opacity-50 cursor-not-allowed hover:border-gray-300 hover:bg-white"
                                    : ""
                              }`}
                           >
                              <FiEdit3
                                 className="text-gray-600 hover:text-blue-600"
                                 size={16}
                              />
                           </Button>

                           <Button
                              onClick={() => onDelete(row.id)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:border-red-500 hover:bg-red-50 transition cursor-pointer"
                           >
                              <FiTrash2
                                 className="text-red-500 hover:text-red-600"
                                 size={16}
                              />
                           </Button>

                           <Button
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer ${
                                 row.proposalStatus === "Paid"
                                    ? "opacity-50 cursor-not-allowed hover:border-gray-300 hover:bg-white"
                                    : ""
                              }`}
                              onClick={() => onPreview(row.id)}
                           >
                              Pay
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
