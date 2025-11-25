// components/proposals/ProductRow.tsx
// (Code remains the same as provided in your prompt)

import React from "react";

interface ProductRowProps {
   productName: string;
   budget: string;
   quantity: number;
   totalAmount: string;
}

const ProductRow: React.FC<ProductRowProps> = ({
   productName,
   budget,
   quantity,
   totalAmount,
}) => {
   return (
      <tr className="border-b border-gray-100">
         <td className="py-3 px-6 text-sm font-medium text-gray-700">
            {productName}
         </td>
         <td className="py-3 px-6 text-sm text-gray-700">${budget}</td>
         <td className="py-3 px-6 text-sm">
            <div className="flex items-center space-x-2">
               <button
                  className="h-8 w-8 bg-gray-100 text-gray-500 rounded-md flex items-center justify-center hover:bg-gray-200 transition duration-150"
                  aria-label="Decrease quantity"
               >
                  -
               </button>
               <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-16 h-8 text-center text-sm border border-gray-300 rounded-md focus:outline-none bg-white"
               />
               <button
                  className="h-8 w-8 bg-gray-100 text-gray-500 rounded-md flex items-center justify-center hover:bg-gray-200 transition duration-150"
                  aria-label="Increase quantity"
               >
                  +
               </button>
            </div>
         </td>
         <td className="py-3 px-6 text-sm text-gray-700">${totalAmount}</td>
         <td className="py-3 px-6 text-sm">
            <button className="bg-red-500 text-white text-sm font-semibold py-1 px-3 rounded-md shadow-sm hover:bg-red-600 transition duration-150">
               Remove
            </button>
         </td>
      </tr>
   );
};

export default ProductRow;
