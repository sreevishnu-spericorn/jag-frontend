// app/proposals/loading.tsx

import { FiHome, FiSearch, FiPlus } from "react-icons/fi";

export default function Loading() {
   // Outer Wrapper (From original Page.tsx)
   return (
      <div className="w-full h-full px-10 py-3">
         {/* Inner Content (From original ProposalsContainer - now includes p-8 padding) */}
         <div className="min-h-screen w-full p-8 animate-pulse">
            {/* Breadcrumb Skeleton */}
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
               <FiHome className="h-4 w-4 text-gray-400" />
               <div className="h-4 w-20 bg-gray-200 rounded"></div>
               <span className="text-gray-300">/</span>
               <div className="h-4 w-10 bg-gray-300 rounded"></div>
            </div>

            {/* Proposals Card Container Skeleton */}
            <div className="bg-white rounded-[20px] p-6 shadow-xl shadow-gray-100 border border-gray-100">
               {/* ProposalsHeader Skeleton */}
               <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                  <div className="h-8 w-40 bg-gray-300 rounded"></div>{" "}
                  {/* Title */}
                  <div className="flex-1 w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                     {/* Search Input Skeleton (Matches h-11) */}
                     <div className="relative flex-1 sm:max-w-xs md:max-w-md h-11 bg-gray-200 rounded-full">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                           <FiSearch className="h-5 w-5" />
                        </div>
                     </div>
                     {/* Create Proposal Button Skeleton (Matches h-11 and w-40) */}
                     <div className="flex items-center gap-3">
                        <div className="h-11 w-40 rounded-full bg-gray-400 flex items-center justify-center">
                           <FiPlus className="h-5 w-5 text-white" />
                           <span className="ml-1 text-white text-sm">...</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* ProposalsTable Skeleton */}
               <div className="flex flex-col w-full h-full">
                  {/* max-h-[calc(100vh-320px)] matches original */}
                  <div className="flex-1 overflow-x-auto max-h-[calc(100vh-320px)] custom-scroll pr-3">
                     <table
                        className="w-full border-separate min-w-max"
                        style={{ borderSpacing: "0 10px" }}
                     >
                        <thead className="sticky top-0 bg-[#F8FAFC] z-10">
                           <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                              <th className="p-3 min-w-[250px]">
                                 <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                              </th>
                              <th className="p-3 min-w-[200px]">
                                 <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                              </th>
                              <th className="p-3 min-w-[120px]">
                                 <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                              </th>
                              <th className="p-3 min-w-[100px]">
                                 <div className="h-4 bg-gray-200 rounded w-full"></div>
                              </th>
                              <th className="p-3 min-w-[120px]">
                                 <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                              </th>
                              <th className="p-3 min-w-[100px]">
                                 <div className="h-4 bg-gray-200 rounded w-full"></div>
                              </th>
                              <th className="p-3 min-w-[120px]">
                                 <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                              </th>
                              <th className="p-3 min-w-[120px]">
                                 <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                              </th>
                              <th className="p-3 min-w-[120px]">
                                 <div className="h-4 bg-gray-200 rounded w-full"></div>
                              </th>
                           </tr>
                        </thead>

                        <tbody>
                           {/* 5 Dummy Row Skeletons */}
                           {[...Array(7)].map((_, index) => (
                              <tr
                                 key={index}
                                 className="relative bg-white shadow-sm border border-gray-200 text-sm text-gray-800 h-16"
                              >
                                 {/* Proposal Name & ID (min-w-[250px]) */}
                                 <td className="p-4 rounded-l-xl border-l border-y border-gray-200 min-w-[250px]">
                                    <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 rounded-[15px] bg-gray-300 shrink-0"></div>
                                       <div className="flex flex-col min-w-0 gap-1">
                                          <div className="h-4 w-32 bg-gray-300 rounded"></div>
                                          <div className="h-3 w-20 bg-gray-200 rounded"></div>
                                       </div>
                                    </div>
                                 </td>
                                 {/* Client Email (min-w-[200px]) */}
                                 <td className="p-4 border-y border-gray-200 min-w-[200px]">
                                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                                 </td>
                                 {/* Phone (min-w-[120px]) */}
                                 <td className="p-4 border-y border-gray-200 min-w-[120px]">
                                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                 </td>
                                 {/* Total Amount (min-w-[100px]) */}
                                 <td className="p-4 border-y border-gray-200 min-w-[100px]">
                                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                                 </td>
                                 {/* Payment Status (min-w-[120px]) */}
                                 <td className="p-4 border-y border-gray-200 min-w-[120px]">
                                    <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                                 </td>
                                 {/* Proposal Status (min-w-[100px]) */}
                                 <td className="p-4 border-y border-gray-200 min-w-[100px]">
                                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                                 </td>
                                 {/* Created On (min-w-[120px]) */}
                                 <td className="p-4 border-y border-gray-200 min-w-[120px]">
                                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                 </td>
                                 {/* Last Updated (min-w-[120px]) */}
                                 <td className="p-4 border-y border-gray-200 min-w-[120px]">
                                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                 </td>
                                 {/* Actions (min-w-[120px]) */}
                                 <td className="p-4 flex items-center gap-2 rounded-r-xl border-r border-y border-gray-200 min-w-[120px]">
                                    <div className="w-8 h-8 rounded-lg bg-gray-200"></div>
                                    <div className="w-8 h-8 rounded-lg bg-gray-200"></div>
                                    <div className="w-8 h-8 rounded-lg bg-gray-200"></div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-between items-center w-full mt-5 p-3 border-t border-gray-100 rounded-full bg-white">
               <div className="h-5 w-40 bg-gray-200 rounded"></div>

               <div className="flex items-center gap-1">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-400 rounded-lg"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
               </div>
            </div>
         </div>
      </div>
   );
}
