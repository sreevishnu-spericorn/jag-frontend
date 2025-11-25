"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label?: string;
   containerClassName?: string;
   inputClassName?: string;
   error?: string;
   labelClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
   (
      {
         label,
         labelClassName = "",
         containerClassName = "",
         inputClassName = "",
         error,
         ...props
      },
      ref
   ) => {
      return (
         <div className={`flex flex-col gap-2 ${containerClassName}`}>
            {label && (
               <label className={`text-sm font-medium ml-1 ${labelClassName}`}>
                  {label}
               </label>
            )}

            <input
               ref={ref}
               {...props}
               className={`
                  w-full py-3 px-3 text-sm outline-none transition-all duration-200
                  ${inputClassName}
               `}
            />

            {error && (
               <span className="text-xs text-red-500 ml-2">{error}</span>
            )}
         </div>
      );
   }
);
