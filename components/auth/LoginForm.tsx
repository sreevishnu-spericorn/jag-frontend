"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { loginWithOtp } from "@/lib/api/auth";
import { toast } from "react-toastify";

type LoginFormValues = {
   email: string;
   password: string;
};

export const LoginForm = () => {
   const router = useRouter();

   const [showPassword, setShowPassword] = useState(false);
   const [serverError, setServerError] = useState("");

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<LoginFormValues>({
      mode: "onChange",
   });

   const onSubmit = async (data: LoginFormValues) => {
      setServerError("");
      try {
         const res = await loginWithOtp(data);
         const tempToken = res?.tempToken;

         if (tempToken) {
            toast.info("OTP verification required");
            localStorage.setItem("tempToken", tempToken);
            router.push("/verify-otp");
         }
      } catch (err: any) {
         setServerError(err.message || "Login failed");
         toast.error(err.message || "Login failed");
      }
   };

   const handleForgotPassword = () => {
      router.push("/verify-email");
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="w-full max-w-[470px] mx-auto space-y-10"
      >
         {serverError && (
            <div className="text-red-500 text-sm text-center">
               {serverError}
            </div>
         )}
         <div className="relative">
            <Mail
               className="absolute left-4 top-15 -translate-y-1/2 text-gray-400"
               size={18}
            />

            <Input
               label="Email"
               placeholder="Enter Your Email"
               containerClassName="w-full max-w-[470px]"
               inputClassName="
   bg-white text-gray-900 placeholder-gray-400 
   h-[56px]
   pl-11 pr-5 
   border border-transparent 
   focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20
   rounded-[30px]
"
               {...register("email", {
                  required: "Email is required",
                  pattern: {
                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                     message: "Enter a valid email",
                  },
               })}
               error={errors.email?.message}
               labelClassName="text-white text-[17px]"
            />
         </div>
         <div className="relative">
            <Lock
               className="absolute left-4 top-15 -translate-y-1/2 text-gray-400"
               size={18}
            />

            <Input
               label="Password"
               type={showPassword ? "text" : "password"}
               placeholder="•••••••••"
               containerClassName="w-full max-w-[470px]"
               inputClassName="
   bg-white text-gray-900 placeholder-gray-400 
   h-[56px]
   pl-11 pr-5 
   border border-transparent 
   focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20
   rounded-[30px]
"
               {...register("password", {
                  required: "Password is required",
                  minLength: {
                     value: 6,
                     message: "Password must be at least 6 characters",
                  },
                  pattern: {
                     value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                     message:
                        "Password must include 1 uppercase letter, 1 number, and 1 special character",
                  },
               })}
               error={errors.password?.message}
               labelClassName="text-white text-[17px]"
            />
            <Button
               type="button"
               onClick={() => setShowPassword((p) => !p)}
               className="absolute right-4 top-15 -translate-y-1/2 bg-transparent text-gray-400 p-0 rounded-none shadow-none"
            >
               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
         </div>

         <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-[470px] h-[60px] rounded-[50px] bg-teal-500 hover:bg-teal-600 cursor-pointer text-white text-[20px]"
         >
            Login
         </Button>

         <div className="text-center">
            <Button
               type="button"
               className="text-base text-gray-400 hover:text-white transition-colors cursor-pointer"
               onClick={handleForgotPassword}
            >
               Forgot password?
            </Button>
         </div>
      </form>
   );
};
