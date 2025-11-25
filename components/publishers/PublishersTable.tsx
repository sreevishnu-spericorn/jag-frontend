"use client";
import { Button } from "../common/Button";
import { PublisherDTO } from "@/types/publishers";
import Pagination from "../common/Pagination";
import { FiEdit3, FiEye, FiTrash2 } from "react-icons/fi";

type PublishersTableProps = {
   publishers: PublisherDTO[];
   loading: boolean;
   onEdit: (id: string) => void;
   onDelete: (id: string) => void;
   onPreview: (id: string) => void;
};

export default function PublishersTable({
   publishers,
   loading,
   onEdit,
   onDelete,
   onPreview,
}: PublishersTableProps) {
   return (
      <div className="flex flex-col w-full h-full">
         <div className="flex-1 overflow-auto max-h-[calc(100vh-320px)] custom-scroll pr-3">
            <table
               className="w-full border-separate table-fixed"
               style={{ borderSpacing: "0 10px" }}
            >
               <thead className="sticky top-0 bg-[#F8FAFC] z-10">
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                     <th className="p-3">Publisher</th>
                     <th className="p-3">Email</th>
                     <th className="p-3">Phone</th>
                     <th className="p-3">Whatsapp</th>
                     <th className="p-3">Actions</th>
                  </tr>
               </thead>

               <tbody>
                  {publishers?.map((row) => (
                     <tr
                        key={row.id}
                        className="relative bg-white hover:bg-gray-50 transition rounded-xl shadow-sm border border-gray-200 text-sm text-gray-800"
                     >
                        <td className="p-4 border-y border-gray-200 font-medium">
                           {row.publisherName}
                        </td>
                        <td className="p-4 text-xs text-gray-500 border-y border-gray-200">
                           {row.email}
                        </td>
                        <td className="p-4 text-xs text-gray-500 border-y border-gray-200">
                           {row.phoneNo || "--"}
                        </td>
                        <td className="p-4 text-xs text-gray-500 border-y border-gray-200">
                           {row.whatsappNo || "--"}
                        </td>
                        <td className="p-4 flex items-center gap-2">
                           <Button
                              onClick={() => onPreview(row.id)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:border-[#12ABAA] hover:bg-[#12ABAA]/10 transition cursor-pointer"
                           >
                              <FiEye size={16} />
                           </Button>
                           <Button
                              onClick={() => onEdit(row.id)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                           >
                              <FiEdit3 size={16} />
                           </Button>
                           <Button
                              onClick={() => onDelete(row.id)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:border-red-500 hover:bg-red-50 transition cursor-pointer"
                           >
                              <FiTrash2 size={16} />
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