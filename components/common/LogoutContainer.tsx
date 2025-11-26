"use client";

import { useState } from "react";
import Modal from "../common/Modal";
import { Button } from "../common/Button";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LogoutContainer() {
   const [isOpen, setIsOpen] = useState(true);
   const [loading, setLoading] = useState(false);

   const { accessToken } = useAuth();

   const handleLogout = async () => {
      setLoading(true);

      try {
         const res = await fetch(`${API_URL}/admin/profileManagement/logout`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            method: "POST",
            credentials: "include",
         });

         router.push("/login");

         if (res.ok) {
            // Later we add redirect to login
            console.log("Logged out");
         }
      } catch (error) {
         console.error("Logout failed", error);
      } finally {
         setLoading(false);
      }
   };

   const router = useRouter();

   return (
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
         <div className="p-8 bg-white w-full text-center">
            <div className="flex justify-center mb-4">
               <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                  <FiLogOut className="text-red-500" size={32} />
               </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
               Log out?
            </h2>

            <p className="text-gray-600 text-sm mb-6">
               Are you sure you want to log out? You will need to sign in again
               to continue.
            </p>

            <div className="flex items-center justify-center gap-4">
               {/* Cancel Button */}
               <button
                  onClick={() => {
                     setIsOpen(false);
                     router.push("/");
                  }}
                  className="px-5 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition"
               >
                  Cancel
               </button>

               {/* Logout Button */}
               <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="px-6 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:opacity-50"
               >
                  {loading ? "Logging out..." : "Logout"}
               </button>
            </div>
         </div>
      </Modal>
   );
}
