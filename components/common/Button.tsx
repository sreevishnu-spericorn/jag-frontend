"use client";
import React from "react";
import { ButtonLoader } from "./ButtonLoader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   isLoading?: boolean;
   children: React.ReactNode;
   className?: string;
}

export const Button = ({
   isLoading,
   children,
   className = "",
   ...props
}: ButtonProps) => {
   return (
      <button
         disabled={isLoading}
         className={`
        rounded-full
        ${className}
      `}
         {...props}
      >
         {isLoading ? <ButtonLoader /> : children}
      </button>
   );
};
