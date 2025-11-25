"use client";
import { FiPlus, FiFilter } from "react-icons/fi";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { useState } from "react";
import { DateRangeFilterModal } from "../common/DateRangeFilterModal";

interface PublishersHeaderProps {
   setIsModalOpen: (value: boolean) => void;
   onSearch: (value: string) => void;
   onFilter: (fromDate: Date | null, toDate: Date | null) => void;
}

export function PublishersHeader({
   setIsModalOpen,
   onSearch,
   onFilter,
}: PublishersHeaderProps) {
   const [isFilterOpen, setIsFilterOpen] = useState(false);
   return (
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
         <h2 className="text-2xl font-bold text-[#1A1D1F] whitespace-nowrap">
            Publishers
         </h2>
         <div className="flex-1 w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <div className="relative flex-1 sm:max-w-xs md:max-w-md rounded-full">
               <Input
                  placeholder="Search"
                  containerClassName="relative"
                  onChange={(e: any) => onSearch(e.target.value)}
                  inputClassName="pl-12 pr-4 py-3 border border-gray-200 focus:border-blue-500 rounded-full w-full text-sm outline-none transition"
               />
            </div>
            <div className="flex items-center gap-3">
               <Button
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-3 border border-gray-200 rounded-full"
               >
                  <FiFilter className="h-4 w-4" /> Filter
               </Button>
               <Button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-full text-white text-sm font-medium hover:bg-[#0E6E70] transition cursor-pointer"
                  style={{ backgroundColor: "#11979C" }}
               >
                  <FiPlus className="h-5 w-5" /> Add New Publisher
               </Button>
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