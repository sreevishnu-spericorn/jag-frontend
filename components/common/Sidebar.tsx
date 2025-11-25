"use client";

import Image from "next/image";
import {
   HiOutlineHome,
   HiOutlineCalendarDays,
   HiOutlineUsers,
   HiOutlineCheckCircle,
   HiOutlineLightBulb,
   HiOutlineNewspaper,
   HiOutlineDocumentText,
   HiOutlineArrowDownTray,
   HiOutlineShoppingBag,
   HiOutlineUserCircle,
   HiOutlineCog8Tooth,
} from "react-icons/hi2";

import NavItem from "../dashboard/NavItem";
import Logo from "@/public/assets/YWNlogo1line-oiv7vqivezmdh8xdg5tr0d7qbtsw15fg66fjaesmd6 2.png";

const Sidebar = () => {
   return (
      <aside
         className="
        w-[292px]
        flex
        flex-col
        h-screen
        py-15
        overflow-y-auto
        backdrop-blur-xl
        scrollbar-hide
      "
      >
         <div className="px-6 mb-10 flex items-center gap-3">
            <Image
               src={Logo}
               alt="Yeshiva World News Logo"
               width={232}
               height={33}
               className="object-contain"
            />
         </div>

         {/* Navigation */}
         <nav className="flex-1 flex flex-col items-center">
            <div className="space-y-1 w-full px-4 flex flex-col">
               <NavItem
                  icon={HiOutlineHome}
                  label="Dashboard"
                  href="/dashboard"
               />
               <NavItem
                  icon={HiOutlineCalendarDays}
                  label="Calendar"
                  href="/calendar"
               />
               <NavItem
                  icon={HiOutlineUsers}
                  label="Advertisers/Clients"
                  href="/advertisers"
               />
               <NavItem
                  icon={HiOutlineCheckCircle}
                  label="Approvals"
                  href="/approvals"
                  count={3}
               />
               <NavItem icon={HiOutlineLightBulb} label="Leads" href="/leads" />
               <NavItem
                  icon={HiOutlineDocumentText}
                  label="Proposals"
                  href="/proposals"
               />
               <NavItem icon={HiOutlineNewspaper} label="Publishers" href="/publishers" />
               <NavItem
                  icon={HiOutlineShoppingBag}
                  label="Products"
                  href="/products"
               />
               <NavItem
                  icon={HiOutlineUserCircle}
                  label="My Accounts"
                  href="/accounts"
               />
               <NavItem icon={HiOutlineCog8Tooth} label="Admin" href="/admin" />
            </div>
         </nav>
      </aside>
   );
};

export default Sidebar;
