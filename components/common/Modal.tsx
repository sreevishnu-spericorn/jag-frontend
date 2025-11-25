"use client";

import React, { useEffect } from "react";

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   children: React.ReactNode;
   size?: "sm" | "lg" | "md";
}

export default function Modal({
   isOpen,
   onClose,
   children,
   size = "lg",
}: ModalProps) {
   useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
         if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
   }, [onClose]);

   if (!isOpen) return null;

   const modalSizeClasses = {
      lg: "max-w-[1345px] w-full max-h-[90vh] p-0",
      sm: "w-[420px] p-0",
      md: "max-w-[960px] w-full max-h-[90vh] p-2 py-12",
   };
   
   return (
      <div
         className="
        fixed inset-0 z-50 flex items-center justify-center cursor-pointer
        bg-[#001531]/80 backdrop-blur-md
        px-4 h-full
      "
         onClick={onClose}
      >
         <div
            className={`
               relative bg-white rounded-[20px] shadow-2xl overflow-hidden animate-[fadeIn_.25s_ease]
               ${modalSizeClasses[size]}
            `}
            onClick={(e) => e.stopPropagation()}
         >
            {/* Close button (Moved inside children container for consistent styling) */}

            {children}
         </div>
      </div>
   );
}
