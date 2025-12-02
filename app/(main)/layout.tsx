import React from "react";
import RouterLayout from "@/components/hoc/RouterLayout";
import Sidebar from "@/components/common/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <RouterLayout>
         <div
            className="
               flex
               min-h-screen
               font-sans
               overflow-hidden
               relative
            "
            style={{
               background:
                  "linear-gradient(47.8deg, rgba(11, 34, 75, 1) 65.76%, rgba(26, 80, 177, 1) 80.92%)",
            }}
         >
            <Sidebar />

            <div className="flex-1 h-screen relative">
               <div
                  className="
                     absolute
                     top-0
                     left-0
                     h-full
                     w-full
                     bg-[#F1F5F9]
                     rounded-tl-[50px]
                     rounded-bl-[50px]
                     shadow-[-20px_0_40px_rgba(0,0,0,0.25)]
                     z-10
                  "
               >
                  {children}
               </div>
            </div>
         </div>
      </RouterLayout>
   );
};

export default MainLayout;
