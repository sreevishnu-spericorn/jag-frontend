"use client";

import { useState } from "react";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { resetPassword } from "@/lib/api/auth";

type FormValues = {
   newPassword: string;
   confirmPassword: string;
};

export default function ForgotPasswordForm() {
   const router = useRouter();
   const [serverError, setServerError] = useState("");
   const [success, setSuccess] = useState(false);

   const searchParams = useSearchParams();
   const token = searchParams?.get("token");
   console.log("Token client-side:", token);

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      watch,
   } = useForm<FormValues>({
      mode: "onChange",
   });

   if (!token)
      return (
         <p className="text-center text-red-500 text-lg">
            Invalid or missing reset token.
         </p>
      );

   if (success)
      return (
         <p className="text-center text-green-600 text-lg font-semibold">
            Password reset successful! Redirecting…
         </p>
      );

   const onSubmit = async (data: FormValues) => {
      setServerError("");

      try {
         await resetPassword({
            token,
            newPassword: data.newPassword,
         });

         setSuccess(true);

         setTimeout(() => router.push("/login"), 2500);
      } catch (err: any) {
         setServerError(err.message || "Reset failed. Try again.");
      }
   };

   return (
      <div className="w-full flex justify-center">
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[470px] space-y-8 flex flex-col"
         >
            {serverError && (
               <p className="text-red-500 text-xs text-center -mt-4">
                  {serverError}
               </p>
            )}

            <div className="text-center">
               <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Reset Password
               </h2>
               <p className="text-sm text-gray-500">Enter your new password</p>
            </div>

            <Input
               type="password"
               placeholder="New Password"
               {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                     value: 8,
                     message: "Password must be at least 8 characters",
                  },
               })}
               error={errors.newPassword?.message}
               inputClassName="rounded-[50px] h-[60px] px-5"
            />

            <Input
               type="password"
               label="Confirm Password"
               placeholder="Confirm Password"
               {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (val) =>
                     val === watch("newPassword") || "Passwords do not match",
               })}
               error={errors.confirmPassword?.message}
               inputClassName="rounded-[50px] h-[60px] px-5"
               labelClassName="text-white text-[17px]"
            />

            <Button
               type="submit"
               isLoading={isSubmitting}
               className="w-full h-[60px] rounded-[50px] bg-linear-to-r 
                       from-teal-500 to-teal-600 hover:from-teal-600 
                       hover:to-teal-700 text-white font-semibold shadow-md"
            >
               Reset Password
            </Button>

            <div className="text-center pt-1">
               <Link
                  href="/login"
                  className="inline-flex items-center text-base text-gray-500 
                             hover:text-teal-600 transition-colors font-medium"
               >
                  <ArrowLeft size={14} className="mr-1" />
                  Back to Login
               </Link>
            </div>
         </form>
      </div>
   );
}