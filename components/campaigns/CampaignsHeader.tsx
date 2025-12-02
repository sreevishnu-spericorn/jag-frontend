// components/campaigns/CampaignsHeader.tsx

import { FiSearch, FiFilter } from "react-icons/fi"; // Removed FiPlus
import { Input } from "../common/Input";
import { Button } from "../common/Button";
// import { useRouter } from "next/navigation"; // Not needed if no 'Create' button
import { useState } from "react";
import { DateRangeFilterModal } from "../common/DateRangeFilterModal";

interface CampaignsHeaderProps {
   onSearch: (value: string) => void;
   role: String | undefined;
   onFilter: (fromDate: Date | null, toDate: Date | null) => void;
}

export function CampaignsHeader({
   onSearch,
   // role, // Not used in this component anymore after removing 'Create' button check
   onFilter,
}: CampaignsHeaderProps) {
   const [isFilterOpen, setIsFilterOpen] = useState(false);
   // const router = useRouter(); // Not needed if no 'Create' button

   return (
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
         <h2 className="text-2xl font-bold text-[#1A1D1F] whitespace-nowrap">
            Campaigns {/* Changed title */}
         </h2>

         <div className="flex-1 w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <div className="relative flex-1 sm:max-w-xs md:max-w-md rounded-full">
               <Input
                  placeholder="Search by publisher or product" // Updated placeholder
                  containerClassName="relative"
                  onChange={(e: any) => onSearch(e.target.value)}
                  inputClassName="pl-12 pr-4 py-3 border border-gray-200 focus:border-blue-500 rounded-full w-full text-sm outline-none transition"
               />
               <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiSearch className="h-5 w-5" />
               </div>
            </div>

            <div className="flex items-center gap-3">
               <Button
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-3 border border-gray-200 rounded-full"
               >
                  <FiFilter className="h-4 w-4" /> Filter
               </Button>
               {/* Removed Create Campaign button */}
            </div>
         </div>
         <DateRangeFilterModal
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApply={(from, to) => onFilter(from, to)}
         />
      </div>
   );
}
