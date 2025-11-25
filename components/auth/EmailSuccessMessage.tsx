import { Link } from "lucide-react";
import { Button } from "../common/Button";

const EmailSuccessMessage = ({ email }: { email: string }) => (
   <div className="flex flex-col items-center text-center space-y-6 w-[470px] mx-auto">
      <div>
         <h2 className="text-2xl font-bold text-gray-800 mb-2">
            We've Emailed{" "}
            <span className="text-teal-600">You a Reset Link</span>
         </h2>
         <p className="text-sm text-gray-500">
            Check your email for instructions to reset your password.
         </p>
      </div>

      <div className="w-full space-y-4">
         <div className="text-left">
            <label className="block text-xs font-medium text-gray-600 mb-2">
               Email
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 h-[60px] flex items-center">
               {email}
            </div>
         </div>

         <Link href="/login" className="block w-full">
            <Button
               type="button"
               className="w-full h-[60px] rounded-[50px] bg-linear-to-r from-teal-500 to-teal-600 
                           hover:from-teal-600 hover:to-teal-700 text-white font-semibold shadow-md"
            >
               Login
            </Button>
         </Link>
      </div>
   </div>
);

export default EmailSuccessMessage;
