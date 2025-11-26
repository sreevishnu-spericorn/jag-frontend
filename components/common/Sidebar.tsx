"use client";

import Image from "next/image";
import { useState } from "react";
import {
   HiOutlineHome,
   HiOutlineUsers,
   HiOutlineCheckCircle,
   HiOutlineNewspaper,
   HiOutlineDocumentText,
   HiOutlineShoppingBag,
   HiOutlineUserCircle,
} from "react-icons/hi2";

import NavItem from "../dashboard/NavItem";
import Logo from "@/public/assets/YWNlogo1line-oiv7vqivezmdh8xdg5tr0d7qbtsw15fg66fjaesmd6 2.png";

const Sidebar = () => {
   const [isAccountOpen, setIsAccountOpen] = useState(false);

   return (
      <aside className="w-[292px] flex flex-col h-screen py-15 overflow-y-auto backdrop-blur-xl scrollbar-hide">
         <div className="px-6 mb-10 flex items-center gap-3">
            <Image
               src={Logo}
               alt="Yeshiva World News Logo"
               width={232}
               height={33}
               className="object-contain"
            />
         </div>

         <nav className="flex-1 flex flex-col items-center">
            <div className="space-y-1 w-full px-4 flex flex-col">
               <NavItem
                  icon={HiOutlineHome}
                  label="Dashboard"
                  href="/dashboard"
               />
               <NavItem
                  icon={HiOutlineUsers}
                  label="Advertisers/Clients"
                  href="/advertisers"
               />
               <NavItem
                  icon={HiOutlineDocumentText}
                  label="Proposals"
                  href="/proposals"
               />
               <NavItem
                  icon={HiOutlineNewspaper}
                  label="Publishers"
                  href="/publishers"
               />
               <NavItem
                  icon={HiOutlineShoppingBag}
                  label="Products"
                  href="/products"
               />

               <div>
                  <div
                     onClick={() => setIsAccountOpen(!isAccountOpen)}
                     className="flex items-center justify-between px-4 py-3 mb-1 cursor-pointer transition-all duration-200 group text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg"
                  >
                     <div className="flex items-center gap-3">
                        <HiOutlineUserCircle className="w-5 h-5 text-slate-400 group-hover:text-slate-200" />
                        <span className="text-sm font-medium tracking-wide">
                           My Accounts
                        </span>
                     </div>
                     <span
                        className={`transition-transform ${
                           isAccountOpen ? "rotate-180" : ""
                        }`}
                     >
                        ▼
                     </span>
                  </div>

                  {isAccountOpen && (
                     <ul className="ml-8 flex flex-col gap-1 mb-2">
                        <li>
                           <NavItem
                              label="Profile"
                              href="/profile"
                              icon={() => null}
                           />
                        </li>
                        <li>
                           <NavItem
                              label="Change Password"
                              href="/changePassword"
                              icon={() => null}
                           />
                        </li>
                        <li>
                           <NavItem
                              label="Logout"
                              href="/logout"
                              icon={() => null}
                           />
                        </li>
                     </ul>
                  )}
               </div>
            </div>
         </nav>
      </aside>
   );
};

export default Sidebar;