// NavItem.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
   icon: React.ElementType;
   label: string;
   href: string; // <-- NEW
   count?: number;
}

const NavItem: React.FC<NavItemProps> = ({
   icon: Icon,
   label,
   href,
   count,
}) => {
   const pathname = usePathname();
   const isActive = pathname === href;

   return (
      <Link href={href} className="block">
         <div
            className={`flex items-center justify-between px-4 py-3 mb-1 cursor-pointer transition-all duration-200 group ${
               isActive
                  ? "bg-teal-600 text-white rounded-full shadow-md shadow-teal-900/20 w-[200px] h-11"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg"
            }`}
         >
            <div className="flex items-center gap-3">
               <Icon
                  className={`w-5 h-5 ${
                     isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-slate-200"
                  }`}
               />
               <span className="text-sm font-medium tracking-wide">
                  {label}
               </span>
            </div>
            {count !== undefined && (
               <span className="text-xs bg-teal-500 text-white px-1.5 py-0.5 rounded-md">
                  {count}
               </span>
            )}
         </div>
      </Link>
   );
};

export default NavItem;
