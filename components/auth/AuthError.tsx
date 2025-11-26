"use client";

import { motion } from "framer-motion";
import { FiRefreshCcw, FiLogIn } from "react-icons/fi";
import Link from "next/link";

export default function AuthError() {
   const refreshPage = () => {
      if (typeof window !== "undefined") {
         window.location.reload();
      }
   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full border border-slate-200 text-center"
         >
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-red-100 text-red-600 rounded-full shadow-inner">
               <FiLogIn size={40} />
            </div>

            <h1 className="text-2xl font-bold text-slate-800 mb-3">
               Authentication Required
            </h1>

            <p className="text-slate-500 mb-8">
               Your session has expired or is invalid. Please log in again to
               continue.
            </p>

            <div className="flex items-center justify-center gap-4">
               <button
                  onClick={refreshPage}
                  className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 transition-colors px-4 py-2 rounded-xl text-slate-700 font-semibold"
               >
                  <FiRefreshCcw size={18} />
                  Refresh
               </button>

               <Link
                  href="/login"
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white transition-colors px-4 py-2 rounded-xl font-semibold shadow-md"
               >
                  <FiLogIn size={18} />
                  Go to Login
               </Link>
            </div>
         </motion.div>
      </div>
   );
}
