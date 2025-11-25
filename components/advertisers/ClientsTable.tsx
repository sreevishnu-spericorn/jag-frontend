"use client";

import { Button } from "../common/Button";
import { ClientDTO } from "@/types/clients";
import { FiEdit3, FiEye, FiTrash2 } from "react-icons/fi";

type ClientTableProps = {
   clients: ClientDTO[];
   loading: boolean;
   onEdit: (id: string) => void;
   onDelete: (id: string) => void;
   onPreview: (id: string) => void;
};

export default function ClientsTable({
   clients,
   loading,
   onEdit,
   onDelete,
   onPreview,
}: ClientTableProps) {
   return (
      <div className="flex flex-col w-full h-full">
         <div className="flex-1 overflow-auto max-h-[calc(100vh-320px)] custom-scroll pr-3">
            <table
               className="w-full border-separate table-fixed"
               style={{ borderSpacing: "0 10px" }}
            >
               <thead className="sticky top-0 bg-[#F8FAFC] z-10">
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                     <th className="w-8"></th>
                     <th className="">
                        <div className="flex items-center gap-1">
                           Account Name
                        </div>
                     </th>

                     <th className="p-3">Contact Name</th>
                     <th className="p-3">Email</th>
                     <th className="p-3">Phone</th>
                     <th className="p-3">Created</th>
                     <th className="p-3">Status</th>
                     <th className="p-3">Actions</th>
                  </tr>
               </thead>

               <tbody>
                  {clients.map((row) => (
                     <tr
                        key={row.id}
                        className="relative bg-white hover:bg-gray-50 transition rounded-xl shadow-sm border border-gray-200 text-sm text-gray-800"
                     >
                        <td className="p-4 rounded-l-xl border-l border-y border-gray-200 w-[60px]">
                           <div className="w-10 h-10 rounded-[15px] overflow-hidden flex items-center justify-center">
                              <div className="w-full h-full flex items-center justify-center">
                                 <img
                                    src={`http://localhost:3457/${row.logo}`}
                                    alt="Client Logo"
                                    className="w-10 h-10 object-contain"
                                 />
                              </div>
                           </div>
                        </td>

                        <td className="p-4 border-y border-gray-200 font-medium pl-10 max-w-[150px] truncate">
                           {row.accountName}
                        </td>

                        <td className="p-4 border-y border-gray-200 max-w-[150px] truncate">
                           {row.contactName}
                        </td>

                        <td className="p-4 text-xs text-gray-500 border-y border-gray-200 max-w-[200px] truncate">
                           {row.email}
                        </td>

                        <td className="p-4 text-xs text-gray-500 border-y border-gray-200 max-w-[120px] truncate">
                           {row.phone}
                        </td>
                        <td className="p-4 text-sm text-gray-500 border-y border-gray-200">
                           {row.createdAt}
                        </td>
                        <td className="p-4 border-y border-gray-200">
                           <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                 row.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                           >
                              {row.status === "Active" ? "Active" : "Inactive"}
                           </span>
                        </td>
                        <td className="p-4 flex items-center gap-2">
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
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
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
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}