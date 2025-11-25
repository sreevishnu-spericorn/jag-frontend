import Image from "next/image";
import { LoginForm } from "@/components/auth/LoginForm";
import Logo from "@/public/assets/YWNlogo1line-oiv7vqivezmdh8xdg5tr0d7qbtsw15fg66fjaesmd6 2.png";

const Page = () => {
   return (
      <div
         className="
       rounded-3xl shadow-2xl backdrop-blur-sm border border-white/5 
       bg-[#0D2755] 
       w-full max-w-[689px] 
       h-auto md:h-[783px]
       p-8 md:p-12
       flex flex-col justify-center items-center
    "
      >
         <div className="mb-12">
            <Image
               src={Logo}
               alt="Yeshiva World News Logo"
               width={316}
               height={45}
               className="object-contain"
               priority
            />
         </div>

         <div
            className="
               w-full max-w-[470px] 
               h-auto md:h-[363px]
               flex justify-center
            "
         >
            <LoginForm />
         </div>
      </div>
   );
};

export default Page;
