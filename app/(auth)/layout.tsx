import { ReactNode } from "react";
import Image from "next/image";
import BgLogo from "@/public/assets/Group 1000007604 (1).png"

interface AuthLayoutProps {
   children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
   return (
      <div className="min-h-screen w-full relative overflow-hidden">
         <div
            className="absolute inset-0 z-0"
            style={{
               background:
                  "linear-gradient(88.93deg, #0A224A 6.35%, rgba(10, 34, 74, 0.7) 99.09%)",
            }}
         />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] z-0 pointer-events-none" />
         <div className="absolute -bottom-40 -right-5">
            <Image
               src={BgLogo}
               alt="Yeshiva World News Logo"
               width={734}
               height={734}
               className="object-contain"
               priority
            />
         </div>

         <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
            {children}
         </div>
      </div>
   );
};

export default AuthLayout;
