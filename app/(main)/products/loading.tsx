// app/products/loading.tsx

import { FiHome } from "react-icons/fi";

// --- Utility Skeleton Components ---

// Creates a pulsating gray block for placeholder text
const SkeletonText = ({ width = "w-3/4", height = "h-4", className = "" }) => (
   <div
      className={`bg-gray-200 animate-pulse rounded-md ${width} ${height} ${className}`}
   />
);

// Creates a skeleton table row
const SkeletonRow = () => (
   <tr className="bg-white rounded-xl shadow-sm border border-gray-200 text-sm text-gray-800 h-16">
      <td className="p-4">
         <SkeletonText width="w-2/3" />
      </td>
      <td className="p-4">
         <SkeletonText width="w-full" />
      </td>
      <td className="p-4">
         <SkeletonText width="w-full" />
      </td>
      <td className="p-4 flex items-center gap-2">
         <SkeletonText width="w-8" height="h-8" className="rounded-lg" />
         <SkeletonText width="w-8" height="h-8" className="rounded-lg" />
         <SkeletonText width="w-8" height="h-8" className="rounded-lg" />
      </td>
   </tr>
);

// --- Main Loading Component ---

export default function Loading() {
   // Mimics the structure of your page component
   return (
      <div className="w-full h-full px-10 py-3">
         <div className="min-h-screen w-full p-8">
            {/* Header / Breadcrumb Placeholder */}
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
               <FiHome className="h-4 w-4 text-gray-400" />
               <SkeletonText width="w-16" height="h-4" />
               <span className="text-gray-300">/</span>
               <SkeletonText width="w-12" height="h-4" />
            </div>

            {/* Main Content Container Placeholder */}
            <div className="bg-white rounded-[20px] p-6 shadow-xl shadow-gray-100 border border-gray-100">
               {/* ProductsHeader Placeholder (Search/Add Button) */}
               <div className="flex justify-between items-center mb-6">
                  <SkeletonText width="w-64" height="h-10" />
                  <div className="flex gap-2">
                     <SkeletonText width="w-24" height="h-10" />
                     <SkeletonText width="w-32" height="h-10" />
                  </div>
               </div>

               {/* ProductsTable Placeholder */}
               <div className="flex flex-col w-full h-full">
                  <div className="flex-1 overflow-auto max-h-[calc(100vh-320px)] custom-scroll pr-3">
                     <table
                        className="w-full border-separate table-fixed"
                        style={{ borderSpacing: "0 10px" }}
                     >
                        <thead className="sticky top-0 bg-[#F8FAFC] z-10">
                           <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                              <th className="p-3">
                                 <SkeletonText width="w-16" height="h-3" />
                              </th>
                              <th className="p-3">
                                 <SkeletonText width="w-16" height="h-3" />
                              </th>
                              <th className="p-3">
                                 <SkeletonText width="w-16" height="h-3" />
                              </th>
                              <th className="p-3">
                                 <SkeletonText width="w-16" height="h-3" />
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           {/* Render several skeleton rows */}
                           <SkeletonRow />
                           <SkeletonRow />
                           <SkeletonRow />
                           <SkeletonRow />
                           <SkeletonRow />
                           <SkeletonRow />
                           <SkeletonRow />
                           <SkeletonRow />
                        </tbody>
                     </table>
                  </div>

                  {/* Pagination Placeholder */}
                  <div className="mt-4 flex justify-end">
                     <SkeletonText width="w-48" height="h-8" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
