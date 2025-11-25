import React from "react";

interface ProductRowProps {
   id: string;
   productName: string;
   budget: number;
   quantity: number;
   total: number;
   onIncrease: (id: string) => void;
   onDecrease: (id: string) => void;
   onRemove: (id: string) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({
   id,
   productName,
   budget,
   quantity,
   total,
   onIncrease,
   onDecrease,
   onRemove,
}) => {
   return (
      <tr className="border-b border-gray-100">
         <td className="py-3 px-6 text-sm font-medium text-gray-700">
            {productName}
         </td>

         <td className="py-3 px-6 text-sm text-gray-700">₹{budget}</td>

         <td className="py-3 px-6 text-sm">
            <div className="flex items-center space-x-2">
               <button
                  onClick={() => onDecrease(id)}
                  className="h-8 w-8 bg-gray-100 text-gray-500 rounded-md flex items-center justify-center hover:bg-gray-200 transition"
               >
                  -
               </button>

               <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-16 h-8 text-center text-sm border border-gray-300 rounded-md bg-white"
               />

               <button
                  onClick={() => onIncrease(id)}
                  className="h-8 w-8 bg-gray-100 text-gray-500 rounded-md flex items-center justify-center hover:bg-gray-200 transition"
               >
                  +
               </button>
            </div>
         </td>

         <td className="py-3 px-6 text-sm text-gray-700">₹{total}</td>

         <td className="py-3 px-6 text-sm">
            <button
               onClick={() => onRemove(id)}
               className="bg-red-500 text-white text-sm font-semibold py-1 px-3 rounded-md shadow-sm hover:bg-red-600 transition"
            >
               Remove
            </button>
         </td>
      </tr>
   );
};

export default ProductRow;
