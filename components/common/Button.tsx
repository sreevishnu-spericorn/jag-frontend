"use client";
import React, { forwardRef } from "react";
import { ButtonLoader } from "./ButtonLoader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   isLoading?: boolean;
   className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
   ({ isLoading, children, className = "", ...props }, ref) => {
      return (
         <button
            ref={ref}
            disabled={isLoading || props.disabled}
            className={`${className}`}
            {...props}
         >
            {isLoading ? <ButtonLoader /> : children}
         </button>
      );
   }
);

Button.displayName = "Button";
