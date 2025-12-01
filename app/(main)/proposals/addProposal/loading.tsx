// app/proposals/addProposal/loading.tsx

import { FiHome, FiSearch, FiPlus } from "react-icons/fi";
import { Plus } from "lucide-react";

export default function Loading() {
   // Outer Wrapper (Matches Page.tsx: w-full h-full px-10 py-3)
   return (
      <div className="w-full h-full px-10 py-3">
         {/* Inner Content (Matches AddProposalContainer: min-h-screen w-full p-8) */}
         <form className="min-h-screen w-full p-8 animate-pulse">
            <div className="max-w-full mx-auto">
               {/* Breadcrumb Skeleton */}
               <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
                  <FiHome className="h-4 w-4 text-gray-400" />
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  <span className="text-gray-300">/</span>
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
               </div>

               <div className="flex flex-col space-y-8">
                  {/* --- Top Section Skeleton (Input & Client Info) --- */}
                  <div className="bg-white p-6 rounded-[20px] shadow-xl shadow-gray-100 border border-gray-100">
                     <div className="p-6 rounded-[20px]">
                        {/* Title */}
                        <div className="h-6 w-48 bg-gray-300 rounded mb-6"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                           {/* Client Dropdown Skeleton */}
                           <div className="h-12 w-full bg-gray-200 rounded-lg"></div>

                           {/* Proposal Name Input Skeleton */}
                           <div className="h-12 w-full bg-gray-200 rounded-lg"></div>

                           {/* Email Display Skeleton (Matches custom wrapper style) */}
                           <div className="flex items-center">
                              <div className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-2 w-full shadow-sm h-12">
                                 <div className="h-3 w-12 bg-gray-300 rounded mb-1"></div>
                                 <div className="h-4 w-24 bg-gray-300 rounded"></div>
                              </div>
                           </div>
                        </div>

                        {/* CC & Add Product Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           {/* CC Input Skeleton */}
                           <div className="md:col-span-2">
                              <div className="h-12 w-full bg-gray-200 rounded-full"></div>
                           </div>

                           {/* Add Product Button Skeleton */}
                           <div className="flex justify-end items-center">
                              <div className="h-12 w-full md:w-40 bg-gray-400 rounded-lg flex items-center justify-center">
                                 <Plus className="h-4 w-4 mr-1 stroke-2 text-white" />
                                 <span className="text-sm text-white">...</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* --- Added Products Section Skeleton (Table) --- */}
                  <div className="bg-white p-6 rounded-[20px] shadow-xl shadow-gray-100 border border-gray-100 flex flex-col">
                     {/* Title */}
                     <div className="h-6 w-48 bg-gray-300 rounded mb-6"></div>

                     {/* Table Container (Matches max-height) */}
                     <div className="overflow-x-auto max-h-[calc(100vh-320px)] custom-scroll pr-3">
                        <table
                           className="w-full border-separate min-w-max"
                           style={{ borderSpacing: "0 10px" }}
                        >
                           {/* Table Header */}
                           <thead className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                              <tr>
                                 <th className="py-3 px-6 w-[35%]">
                                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                                 </th>
                                 <th className="py-3 px-6 w-[15%]">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                 </th>
                                 <th className="py-3 px-6 w-[20%]">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                 </th>
                                 <th className="py-3 px-6 w-[15%]">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                 </th>
                                 <th className="py-3 px-6 w-[15%]">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                 </th>
                              </tr>
                           </thead>

                           {/* 3 Dummy Product Rows */}
                           <tbody className="bg-white divide-y divide-gray-100">
                              {[...Array(1)].map((_, index) => (
                                 <tr
                                    key={index}
                                    className="h-16 border-b border-gray-100"
                                 >
                                    {/* Product Name */}
                                    <td className="py-3 px-6 text-sm">
                                       <div className="h-4 w-40 bg-gray-200 rounded"></div>
                                    </td>
                                    {/* Budget */}
                                    <td className="py-3 px-6 text-sm">
                                       <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                    </td>
                                    {/* Quantity Controls */}
                                    <td className="py-3 px-6 text-sm">
                                       <div className="flex items-center space-x-2">
                                          <div className="h-8 w-8 bg-gray-100 rounded-md"></div>
                                          <div className="w-16 h-8 bg-gray-200 rounded-md"></div>
                                          <div className="h-8 w-8 bg-gray-100 rounded-md"></div>
                                       </div>
                                    </td>
                                    {/* Total Amount */}
                                    <td className="py-3 px-6 text-sm">
                                       <div className="h-4 w-20 bg-gray-300 rounded"></div>
                                    </td>
                                    {/* Actions (Remove Button) */}
                                    <td className="py-3 px-6 text-sm">
                                       <div className="h-7 w-20 bg-red-400 rounded-md"></div>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>

                     {/* Total & Buttons */}
                     <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                        <div className="flex flex-col items-end">
                           {/* Total Display */}
                           <div className="flex items-center space-x-12 mb-6">
                              <div className="h-5 w-12 bg-gray-300 rounded"></div>
                              <div className="h-7 w-20 bg-gray-400 rounded ml-4"></div>
                           </div>

                           {/* Buttons */}
                           <div className="flex space-x-3">
                              <div className="h-10 w-20 bg-teal-500 rounded-lg"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
}
