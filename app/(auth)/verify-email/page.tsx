import EmailVerifyForm from "@/components/auth/EmailVerifyForm";
import { Mail } from "lucide-react";

export default function VerifyEmailPage() {
   return (
      <div className="flex justify-center items-center min-h-screen w-full px-4">
         <div className="bg-white rounded-[40px] shadow-2xl w-[690px] h-[742px] overflow-hidden relative">
            <div className="bg-linear-to-br from-teal-400 to-teal-600 h-40 relative">
               <div
                  className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-24 h-24 
                              bg-linear-to-br from-teal-500 to-teal-700 
                              rounded-full flex items-center justify-center shadow-xl"
               >
                  <Mail className="text-white w-10 h-10" strokeWidth={1.5} />
               </div>
            </div>

            <div className="pt-20 pb-10 px-12">
               <EmailVerifyForm />
            </div>
         </div>
      </div>
   );
}
