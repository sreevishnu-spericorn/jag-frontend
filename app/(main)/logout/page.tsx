"use client";

import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { Button } from "@/components/common/Button";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LogoutContainer() {
   const [loading, setLoading] = useState(false);
   const { accessToken } = useAuth();
   const router = useRouter();

   const handleLogout = async () => {
      setLoading(true);

      try {
         const res = await fetch(`${API_URL}/admin/profileManagement/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
               Authorization: `Bearer ${accessToken}`,
            },
         });

         if (!res.ok) throw new Error("Logout failed");

         toast.success("Logged Out");
         router.push("/");
      } catch (error) {
         console.error(error);
         toast.error("Logout Error");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="w-full min-h-screen flex items-center justify-center px-4">
         <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-10 max-w-md w-full text-center animate-fadeIn">
            <div className="flex justify-center mb-6">
               <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center shadow-inner">
                  <FiLogOut className="text-red-600" size={40} />
               </div>
            </div>

            <h2 className="text-3xl font-semibold text-gray-900 mb-3">
               Log Out
            </h2>

            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
               Are you sure you want to log out? You will need to sign in again
               to continue.
            </p>

            <div className="flex items-center justify-center gap-4">
               <Button
                  onClick={handleLogout}
                  disabled={loading}
                  className="px-6 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition shadow disabled:opacity-50"
               >
                  {loading ? "Logging out..." : "Logout"}
               </Button>
            </div>
         </div>
      </div>
   );
}
