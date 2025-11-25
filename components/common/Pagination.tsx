"use client";

import { Button } from "./Button";

interface PaginationProps {
   page: number;
   totalPages: number;
   onChangePage: (page: number) => void;
}

const Pagination = ({ page, totalPages, onChangePage }: PaginationProps) => {
   const getPageNumbers = () => {
      const pages: (number | "...")[] = [];
      if (totalPages <= 7) {
         // show all pages if total <= 7
         for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
         // always show first page
         pages.push(1);

         // show ellipsis if current page is far from start
         if (page > 4) pages.push("...");

         // show pages around current page
         const start = Math.max(2, page - 1);
         const end = Math.min(totalPages - 1, page + 1);
         for (let i = start; i <= end; i++) pages.push(i);

         // show ellipsis if current page is far from end
         if (page < totalPages - 3) pages.push("...");

         // always show last page
         pages.push(totalPages);
      }
      return pages;
   };

   const pages = getPageNumbers();

   return (
      <div className="flex justify-between items-center w-full mt-5 p-3 border-t border-gray-100 rounded-full bg-white">
         <span className="text-sm text-gray-500">
            Showing page {page} out of {totalPages}
         </span>

         <div className="flex items-center gap-1">
            {/* Previous */}
            <Button
               className="w-8 h-8 bg-[#C9E0E0] flex items-center justify-center rounded-full border border-gray-200 text-gray hover:bg-[#11979C] transition"
               onClick={() => page > 1 && onChangePage(page - 1)}
               disabled={page === 1}
            >
               &lt;
            </Button>

            {/* Page Numbers */}
            {pages.map((p, idx) => (
               <Button
                  key={idx}
                  disabled={p === "..."}
                  onClick={() => typeof p === "number" && onChangePage(p)}
                  className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg transition ${
                     p === page
                        ? "bg-[#11979C] text-white shadow-md shadow-blue-200"
                        : "text-gray-700 hover:bg-gray-100"
                  }`}
               >
                  {p}
               </Button>
            ))}

            {/* Next */}
            <Button
               className="w-8 h-8 bg-[#C9E0E0] flex items-center justify-center rounded-full border border-gray-200 text-gray hover:bg-[#11979C] transition"
               onClick={() => page < totalPages && onChangePage(page + 1)}
               disabled={page === totalPages}
            >
               &gt;
            </Button>
         </div>
      </div>
   );
};

export default Pagination;
