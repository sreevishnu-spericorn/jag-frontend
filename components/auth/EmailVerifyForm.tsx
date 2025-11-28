"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { forgotPassword } from "@/lib/api/auth";
import EmailSuccessMessage from "./EmailSuccessMessage";

import Link from "next/link";
import { toast } from "react-toastify";

type FormValues = {
   email: string;
};

export const EmailVerifyForm = () => {
   const [serverError, setServerError] = useState("");
   const [isSuccess, setIsSuccess] = useState(false);
   const [submittedEmail, setSubmittedEmail] = useState("");

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<FormValues>({
      mode: "onChange",
   });

   const onSubmit = async (data: FormValues) => {
      setServerError("");
      try {
         await forgotPassword({ email: data.email });
         setSubmittedEmail(data.email);
         setIsSuccess(true);
      } catch (err: any) {
         setServerError(
            err.message || "Failed to send reset link. Please try again."
         );
         toast.error(err.message || "Failed to send reset link. Please try again.")
      }
   };

   return (
      <div className="w-full flex justify-center">
         {isSuccess ? (
            <EmailSuccessMessage email={submittedEmail} />
         ) : (
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="w-[470px] h-[363px] space-y-8 flex flex-col justify-between"
            >
               {/* Title */}
               <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                     Forgot Password?
                  </h2>
                  <p className="text-sm text-gray-500">
                     Enter your email to receive a reset link
                  </p>
               </div>

               {/* Input */}
               <div>
                  <Input
                     label="Email"
                     placeholder="Enter Your Email"
                     containerClassName="w-full"
                     inputClassName="bg-white text-gray-900 placeholder-gray-400 
                                     border border-gray-300 rounded-[50px] h-[60px] px-5
                                     focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                     {...register("email", {
                        required: "Email is required",
                        pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                           message: "Invalid email address",
                        },
                     })}
                     error={errors.email?.message}
                  />
               </div>

               {serverError && (
                  <p className="text-red-500 text-xs text-center -mt-4">
                     {serverError}
                  </p>
               )}

               {/* Button */}
               <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full h-[60px] rounded-[50px] bg-linear-to-r from-teal-500 to-teal-600 
                             hover:from-teal-600 hover:to-teal-700 text-white font-semibold shadow-md"
               >
                  Send Reset Link
               </Button>

               {/* Back Link */}
               <div className="text-center pt-1">
                  <Link
                     href="/login"
                     className="inline-flex items-center text-base text-gray-500 hover:text-teal-600 transition-colors font-medium"
                  >
                     <ArrowLeft size={14} className="mr-1" />
                     Back to Login
                  </Link>
               </div>
            </form>
         )}
      </div>
   );
};

export default EmailVerifyForm;
