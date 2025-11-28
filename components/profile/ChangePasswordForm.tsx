"use client";

import { useAuth } from "@/contexts/AuthContext";
import { changePassword } from "@/lib/api/profile";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../common/Input";
import { FiHome } from "react-icons/fi";
import { toast } from "react-toastify";

interface PasswordFormData {
   currentPassword: string;
   newPassword: string;
   confirmPassword: string;
}

export default function ChangePasswordForm() {
   const [isSubmitting, setIsSubmitting] = useState(false);

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
      reset,
   } = useForm<PasswordFormData>({
      mode: "onChange",
   });

   const newPassword = watch("newPassword");
   const { accessToken } = useAuth();

   const onSubmit = async (data: PasswordFormData) => {
      setIsSubmitting(true);
      const { confirmPassword, ...rest } = data;
      try {
         const res = await changePassword(rest, accessToken);
         console.log(res);
         toast.success(res.message);
         reset();
      } catch (err: any) {
         toast.error("Error updating password:", err.message);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="min-h-screen w-full p-8">
         <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <svg
               className="w-4 h-4 mr-2"
               fill="currentColor"
               viewBox="0 0 20 20"
            >
               <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            <span>Proposals</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">List</span>
         </div>

         <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-[20px] p-6 shadow-xl shadow-gray-100 border border-gray-100"
         >
            <div className="mb-10">
               <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Change Password
               </h1>
               <p className="text-gray-500 mt-2 text-sm">
                  Update your password to keep your account secure.
               </p>
            </div>
            <div className="mb-7">
               <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password
               </label>
               <Input
                  type="password"
                  placeholder="Enter current password"
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-all duration-150 focus:ring-2 focus:ring-teal-500 ${
                     errors.currentPassword
                        ? "border-red-500"
                        : "border-gray-300"
                  }`}
                  {...register("currentPassword", {
                     required: "Current password is required",
                     minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                     },
                  })}
               />
               {errors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1">
                     {errors.currentPassword.message}
                  </p>
               )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-7">
               <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                     New Password
                  </label>
                  <Input
                     type="password"
                     placeholder="Enter new password"
                     className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-all duration-150 focus:ring-2 focus:ring-teal-500 ${
                        errors.newPassword
                           ? "border-red-500"
                           : "border-gray-300"
                     }`}
                     {...register("newPassword", {
                        required: "New password is required",
                        minLength: {
                           value: 6,
                           message: "Minimum 6 characters",
                        },
                        validate: (value) =>
                           value !== watch("currentPassword") ||
                           "New password must be different",
                     })}
                  />
                  {errors.newPassword && (
                     <p className="text-red-500 text-sm mt-1">
                        {errors.newPassword.message}
                     </p>
                  )}
               </div>

               <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                     Confirm Password
                  </label>
                  <input
                     type="password"
                     placeholder="Re-enter new password"
                     className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-all duration-150 focus:ring-2 focus:ring-teal-500 ${
                        errors.confirmPassword
                           ? "border-red-500"
                           : "border-gray-300"
                     }`}
                     {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                           value === newPassword || "Passwords do not match",
                     })}
                  />
                  {errors.confirmPassword && (
                     <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword.message}
                     </p>
                  )}
               </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
               <button
                  type="button"
                  onClick={() => reset()}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all font-semibold"
               >
                  Cancel
               </button>

               <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-teal-600 text-white rounded-xl shadow-md hover:bg-teal-700 transition-all font-semibold disabled:opacity-50"
               >
                  {isSubmitting ? "Submitting..." : "Submit"}
               </button>
            </div>
         </form>
      </div>
   );
}
