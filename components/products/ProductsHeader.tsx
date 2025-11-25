"use client";

import { FiSearch, FiFilter, FiPlus } from "react-icons/fi";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { useState } from "react";
import { DateRangeFilterModal } from "../common/DateRangeFilterModal";

interface ProductsHeaderProps {
   setIsModalOpen: (v: boolean) => void;
   onSearch: (value: string) => void;
   onFilter: (fromDate: Date | null, toDate: Date | null) => void;
}
export function ProductsHeader({
   setIsModalOpen,
   onSearch,
   onFilter,
}: ProductsHeaderProps) {
   const [isFilterOpen, setIsFilterOpen] = useState(false);

   return (
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
         <h2 className="text-2xl font-bold text-[#1A1D1F] whitespace-nowrap">
            Products
         </h2>

         <div className="flex-1 w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <div className="relative flex-1 sm:max-w-xs md:max-w-md">
               <Input
                  placeholder="Search"
                  containerClassName="relative"
                  onChange={(e: any) => onSearch(e.target.value)}
                  inputClassName="pl-12 pr-4 py-3 border border-gray-200 focus:border-blue-500 rounded-xl w-full text-sm outline-none transition"
               />
               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiSearch className="h-5 w-5" />
               </div>
            </div>

            <div className="flex items-center gap-3">
               <Button
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
               >
                  <FiFilter className="h-4 w-4" /> Filter
               </Button>

               <Button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-white text-sm font-medium hover:bg-[#0E6E70] transition cursor-pointer"
                  style={{ backgroundColor: "#11979C" }}
               >
                  <FiPlus className="h-5 w-5" /> Add Product
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
