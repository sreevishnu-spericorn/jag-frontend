import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {

   return (
      <div className="flex justify-center items-center min-h-screen w-full px-4">
         <div className="bg-white rounded-[40px] shadow-2xl w-[690px] h-[742px] overflow-hidden relative">
            {/* Top Gradient Section (same height as verify email) */}
            <div className="bg-linear-to-br from-teal-400 to-teal-600 h-40 relative">
               {/* Floating Key Icon */}
               <div
                  className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-24 h-24 
                              bg-linear-to-br from-teal-500 to-teal-700 
                              rounded-full flex items-center justify-center shadow-xl border-4 border-white"
               >
                  {/* Key Icon */}
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill="currentColor"
                     className="w-10 h-10 text-cyan-300"
                  >
                     <path
                        fillRule="evenodd"
                        d="M15.75 1.5a6.75 6.75 0 0 0-6.651 
                        7.906c-1.067.322-2.02 1.01-2.529 1.975l-1.08 
                        2.055a2.25 2.25 0 0 0-.06 2.133l.635 1.275 
                        2.289-.823a.75.75 0 0 1 .78 1.25l-2.274 
                        3.116a.75.75 0 1 1-1.212-.883l.314-.431-2.116 
                        2.116a.75.75 0 0 1-1.06 0l-1.22-1.22a.75.75 0 0 
                        1 0-1.06l1.444-1.445a.75.75 0 0 1 1.06 
                        0l2.25 2.25 3.132-3.133a.75.75 0 0 1 
                        1.25.78l-.824 2.288 1.276.636a2.25 2.25 0 
                        0 0 2.133-.06l2.055-1.08a4.5 4.5 0 0 0 
                        2.013-1.952 6.75 6.75 0 1 0-.04-15.629Zm2.25 
                        8.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 
                        0 4.5Z"
                        clipRule="evenodd"
                     />
                  </svg>
               </div>
            </div>

            {/* Form Section */}
            <div className="pt-20 pb-10 px-12">
               <ForgotPasswordForm />
            </div>
         </div>
      </div>
   );
}
