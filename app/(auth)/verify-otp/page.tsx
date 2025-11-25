import OtpForm from "@/components/auth/OtpForm";
import { KeyRound } from "lucide-react";

export default function VerifyOtpPage() {
   return (
      <div className="flex items-center justify-center min-h-screen w-full px-4">
         {/* White Card - Larger */}
         <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-12">
            {/* Icon + Title */}
            <div className="flex flex-col items-center mb-12 space-y-5">
               <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <KeyRound className="text-white w-9 h-9" strokeWidth={1.5} />
               </div>

               <h2 className="text-3xl font-extrabold text-gray-900 tracking-wide">
                  Verify OTP
               </h2>
               <p className="text-sm text-gray-500 text-center max-w-xs">
                  Enter the 6-digit code sent to your email.
               </p>
            </div>

            <OtpForm />
         </div>
      </div>
   );
}
