"use client";

import { Button } from "./Button";

interface DeleteConfirmModalProps {
   isOpen: boolean;
   title: string;
   description: string;
   loading?: boolean;
   onClose: () => void;
   onConfirm: () => void;
}

export default function DeleteConfirmModal({
   isOpen,
   title,
   description,
   loading,
   onClose,
   onConfirm,
}: DeleteConfirmModalProps) {
   if (!isOpen) return null;

   return (
      <div className="p-8 bg-white rounded-2xl shadow-xl w-[420px] max-w-full flex flex-col items-center text-center space-y-5">
         <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth="1.8"
               stroke="red"
               className="w-8 h-8"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 3h.01M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"
               />
            </svg>
         </div>

         <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
         <p className="text-sm text-gray-600 leading-relaxed max-w-[300px]">
            {description}
         </p>

         <div className="w-full flex items-center justify-center gap-4 mt-2 pt-2">
            <Button
               className="flex-1 py-2.5 border border-gray-300 text-gray-700"
               onClick={onClose}
            >
               Cancel
            </Button>

            <Button
               className="flex-1 py-2.5 bg-red-500 text-white"
               onClick={onConfirm}
               isLoading={loading}
            >
               Delete
            </Button>
         </div>
      </div>
   );
}
