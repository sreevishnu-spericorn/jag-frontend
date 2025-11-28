"use client";
import { Button } from "./Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";

interface Props {
   isOpen: boolean;
   onClose: () => void;
   onApply: (fromDate: Date | null, toDate: Date | null) => void;
   initialFromDate?: Date | null;
   initialToDate?: Date | null;
   positionClass?: string;
}

export function DateRangeFilterModal({
   isOpen,
   onClose,
   onApply,
   initialFromDate = null,
   initialToDate = null,
   positionClass = "top-20 right-10",
}: Props) {
   const [fromDate, setFromDate] = useState<Date | null>(initialFromDate);
   const [toDate, setToDate] = useState<Date | null>(initialToDate);

   useEffect(() => {
      setFromDate(initialFromDate);
      setToDate(initialToDate);
   }, [initialFromDate, initialToDate]);

   if (!isOpen) return null;

   return (
      <div
         className={`absolute ${positionClass} bg-white p-6 shadow-lg rounded-lg z-50`}
      >
         <h3 className="font-semibold mb-4">Filter by Date Range</h3>

         <div className="flex gap-3">
            <DatePicker
               selected={fromDate}
               onChange={(date) => setFromDate(date)}
               placeholderText="From Date"
               className="p-2 border rounded-xl"
            />
            <DatePicker
               selected={toDate}
               onChange={(date) => setToDate(date)}
               placeholderText="To Date"
               className="p-2 border rounded-xl"
            />
         </div>

         <div className="mt-4 flex gap-2 justify-end">
            <Button
               onClick={() => {
                  console.log(fromDate, toDate);
                  onApply(fromDate, toDate);
                  onClose();
               }}
               className="bg-[#0E6E70] text-white px-4 py-2 rounded-lg"
            >
               Apply
            </Button>
            <Button
               onClick={onClose}
               className="bg-gray-400 text-white px-4 py-2 rounded-lg"
            >
               Cancel
            </Button>
         </div>
      </div>
   );
}
