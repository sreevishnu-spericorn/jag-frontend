// app/advertisers/clients/loading.tsx

import { FiHome } from "react-icons/fi";

// --- Utility Skeleton Components ---

// Creates a pulsating gray block for placeholder text/elements
const SkeletonText = ({ width = "w-3/4", height = "h-4", className = "" }) => (
   <div
      className={`bg-gray-200 animate-pulse rounded-md ${width} ${height} ${className}`}
   />
);

// Creates a skeleton cell block (replaces logo, status, or buttons)
const SkeletonBlock = ({
   width = "w-10",
   height = "h-10",
   rounded = "rounded-md",
   className = "",
}) => (
   <div
      className={`bg-gray-200 animate-pulse ${width} ${height} ${rounded} ${className}`}
   />
);

// Creates a skeleton table row
const SkeletonClientRow = () => (
   <tr className="bg-white rounded-xl shadow-sm border border-gray-200 text-sm text-gray-800 h-16">
      {/* 1. Logo Column */}
      <td className="p-4 rounded-l-xl border-l border-y border-gray-200 w-[60px]">
         <SkeletonBlock width="w-10" height="h-10" rounded="rounded-[15px]" />
      </td>

      {/* 2. Account Name */}
      <td className="p-4 border-y border-gray-200 pl-10">
         <SkeletonText width="w-2/3" />
      </td>

      {/* 3. Contact Name */}
      <td className="p-4 border-y border-gray-200">
         <SkeletonText width="w-full" />
      </td>

      {/* 4. Email */}
      <td className="p-4 border-y border-gray-200">
         <SkeletonText width="w-4/5" />
      </td>

      {/* 5. Phone */}
      <td className="p-4 border-y border-gray-200">
         <SkeletonText width="w-3/4" />
      </td>

      {/* 6. Created At */}
      <td className="p-4 border-y border-gray-200">
         <SkeletonText width="w-full" />
      </td>

      {/* 7. Status */}
      <td className="p-4 border-y border-gray-200">
         <SkeletonBlock width="w-16" height="h-6" rounded="rounded-full" />
      </td>

      {/* 8. Actions */}
      <td className="p-4 flex items-center gap-2">
         <SkeletonBlock width="w-8" height="h-8" className="rounded-lg" />
         <SkeletonBlock width="w-8" height="h-8" className="rounded-lg" />
         <SkeletonBlock width="w-8" height="h-8" className="rounded-lg" />
      </td>
   </tr>
);

// --- Main Loading Component ---

export default function Loading() {
   return (
      <div className="w-full h-full px-10 py-3">
         <div className="min-h-screen w-full p-8">
            {/* Header / Breadcrumb Placeholder */}
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
               <FiHome className="h-4 w-4 text-gray-400" />
               <SkeletonText width="w-20" height="h-4" />
               <span className="text-gray-300">/</span>
               <SkeletonText width="w-16" height="h-4" />
            </div>

            {/* Main Content Container Placeholder */}
            <div className="bg-white rounded-[20px] p-6 shadow-xl shadow-gray-100 border border-gray-100">
               {/* ClientsHeader Placeholder (Search/Filter/Add Button) */}
               <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                     <SkeletonText width="w-40" height="h-10" />
                     <SkeletonText width="w-40" height="h-10" />
                  </div>
                  <SkeletonText
                     width="w-32"
                     height="h-10"
                     className="rounded-lg"
                  />
               </div>

               {/* ClientsTable Placeholder */}
               <div className="flex flex-col w-full h-full">
                  <div className="flex-1 overflow-auto max-h-[calc(100vh-320px)] custom-scroll pr-3">
                     <table
                        className="w-full border-separate table-fixed"
                        style={{ borderSpacing: "0 10px" }}
                     >
                        <thead className="sticky top-0 bg-[#F8FAFC] z-10">
                           <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                              <th className="p-3 w-8">
                                 <SkeletonText width="w-4" height="h-3" />
                              </th>
                              <th className="p-3">
                                 <SkeletonText width="w-24" height="h-3" />
                              </th>
                              <th className="p-3">
                                 <SkeletonText width="w-16" height="h-3" />
                              </th>
                              <th className="p-3">
                                 <SkeletonText width="w-12" height="h-3" />
                              </th>
                              <th className="p-3">
                                 <SkeletonText width="w-12" height="h-3" />
                              </th>
                              <th className="p-3">
                                 <SkeletonText width="w-16" height="h-3" />
                              </th>
                              <th className="p-3">
                                 <SkeletonText width="w-12" height="h-3" />
                              </th>
                              <th className="p-3">
                                 <SkeletonText width="w-16" height="h-3" />
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           {/* Render 5 skeleton rows */}
                           {[...Array(5)].map((_, i) => (
                              <SkeletonClientRow key={i} />
                           ))}
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
