"use client";

import { ProductDTO } from "@/types/products";
import { FiEye, FiEdit3, FiTrash2 } from "react-icons/fi";
import { Button } from "../common/Button";

interface ProductsTableProps {
   products: ProductDTO[];
   loading: boolean;
   onEdit: (id: string) => void;
   onDelete: (id: string) => void;
   error?: string;
}

export default function ProductsTable({
   products,
   loading,
   onEdit,
   onDelete,
}: ProductsTableProps) {
   return (
      <div className="flex flex-col w-full h-full">
         <div className="flex-1 overflow-auto max-h-[calc(100vh-320px)] custom-scroll pr-3">
            <table
               className="w-full border-separate table-fixed"
               style={{ borderSpacing: "0 10px" }}
            >
               <thead className="sticky top-0 bg-[#F8FAFC] z-10">
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                     <th className="p-3">Product</th>
                     <th className="p-3">Created At</th>
                     {/* <th className="p-3">Approved</th> */}
                     <th className="p-3">Updated At</th>
                     <th className="p-3">Actions</th>
                  </tr>
               </thead>

               <tbody>
                  {products.map((row: ProductDTO) => (
                     <tr
                        key={row.id}
                        className="bg-white hover:bg-gray-50 transition rounded-xl shadow-sm border border-gray-200 text-sm text-gray-800"
                     >
                        <td className="p-4">{row.productName}</td>
                        <td className="p-4 text-gray-500">{row.createdAt}</td>
                        {/* <td className="p-4">
                           <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                 row.status
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                           >
                              {row.status ? "Yes" : "No"}
                           </span>
                        </td> */}
                        <td className="p-4">{row.updatedAt}</td>

                        <td className="p-4 flex items-center gap-2">
                           <Button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:border-[#12ABAA] hover:bg-[#12ABAA]/10 transition cursor-pointer">
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
