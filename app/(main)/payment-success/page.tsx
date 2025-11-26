"use client";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
   const router = useRouter();
   const [progress, setProgress] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setProgress((p) => Math.min(p + 1, 100));
      }, 30);

      const timeout = setTimeout(() => {
         router.push("/dashboard");
      }, 3000);

      return () => {
         clearInterval(interval);
         clearTimeout(timeout);
      };
   }, []);

   return (
      <div className="min-h-screen bg-linear-to-br from-emerald-600 to-teal-700 flex items-center justify-center px-4">
         <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-xl text-center w-full max-w-lg border border-white/20">
            <CheckCircle className="mx-auto text-white" size={90} />
            <h1 className="text-3xl font-semibold text-white mt-6">
               Payment Successful 🎉
            </h1>
            <p className="text-white/80 mt-2 text-lg">
               Redirecting...
            </p>

            <div className="mt-6 w-full bg-white/20 h-2 rounded-full overflow-hidden">
               <div
                  className="h-full bg-white transition-all duration-75"
                  style={{ width: `${progress}%` }}
               ></div>
            </div>
         </div>
      </div>
   );
}
