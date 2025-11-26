"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "../common/Button"; // your existing button
import { verifyOtp } from "@/lib/api/auth";
import { useAuth } from "@/contexts/AuthContext";

type OtpFormValues = {
   otp: string;
};

const OtpForm = () => {
   const router = useRouter();
   const { setAccessToken } = useAuth();

   const [serverError, setServerError] = useState("");
   const [tempToken, setTempToken] = useState("");
   const [otpDigits, setOtpDigits] = useState<string[]>(new Array(6).fill(""));

   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors, isSubmitting },
   } = useForm<OtpFormValues>({
      mode: "onChange",
      defaultValues: { otp: "" },
   });

   useEffect(() => {
      const token = localStorage.getItem("tempToken");
      if (!token) router.push("/login");
      setTempToken(token || "");
   }, [router]);

   useEffect(() => {
      const fullOtp = otpDigits.join("");
      setValue("otp", fullOtp, { shouldValidate: true });
   }, [otpDigits, setValue]);

   const handleOtpChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
   ) => {
      const raw = e.target.value;
      const value = raw.replace(/\D/g, "").slice(0, 1);

      const newOtp = [...otpDigits];
      newOtp[index] = value;
      setOtpDigits(newOtp);

      if (value && index < 5) {
         inputRefs.current[index + 1]?.focus();
      }
   };

   const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
   ) => {
      if (e.key === "Backspace") {
         if (!otpDigits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
         } else {
            const newOtp = [...otpDigits];
            newOtp[index] = "";
            setOtpDigits(newOtp);
         }
      }

      if (e.key === "ArrowLeft" && index > 0) {
         inputRefs.current[index - 1]?.focus();
      }
      if (e.key === "ArrowRight" && index < 5) {
         inputRefs.current[index + 1]?.focus();
      }
   };

   const onSubmit = async (data: OtpFormValues) => {
      setServerError("");
      try {
         const res = await verifyOtp({ otp: data.otp, accessToken: tempToken });
         console.log(res);

         if (res?.authToken) {
            localStorage.removeItem("tempToken"); 
            setAccessToken(res.authToken);       
            router.push("/dashboard");
         }
      } catch (err: any) {
         setServerError(err.response?.data?.message || "Invalid OTP");
      }
   };

   useEffect(() => {
      register("otp", {
         required: "OTP is required",
         pattern: {
            value: /^[0-9]{6}$/,
            message: "OTP must be 6 digits",
         },
      });
   }, [register]);

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="w-full max-w-[470px] mx-auto space-y-6 flex flex-col items-center"
      >
         {serverError && (
            <p className="text-red-500 text-sm text-center">{serverError}</p>
         )}

         <div className="w-full flex flex-col items-center gap-4 justify-center">
            <label className="text-sm font-medium text-gray-700">
               Enter OTP
            </label>

            <div className="w-full flex justify-center">
               <div className="flex justify-center gap-3">
                  {otpDigits.map((digit, index) => (
                     <input
                        key={index}
                        inputMode="numeric"
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={(e) => {
                           e.preventDefault();
                           const paste = e.clipboardData
                              .getData("text")
                              .replace(/\s/g, "");
                           const digitsOnly = paste.replace(/\D/g, "");
                           if (!digitsOnly.length) return;

                           const taken = digitsOnly.slice(0, 6).split("");
                           const padded = [...new Array(6)].map(
                              (_, i) => taken[i] ?? ""
                           );

                           setOtpDigits(padded);

                           const lastFilled = Math.min(taken.length - 1, 5);
                           inputRefs.current[lastFilled]?.focus();
                        }}
                        ref={(el) => {
                           inputRefs.current[index] = el;
                        }}
                        className={`
               w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-semibold
               bg-gray-50 text-gray-900 border shadow-sm
               rounded-lg
               focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20
               transition-all duration-150
               ${
                  errors.otp?.message && otpDigits.join("").length === 6
                     ? "border-red-500"
                     : "border-gray-200"
               }
            `}
                     />
                  ))}
               </div>
            </div>

            {errors.otp?.message && (
               <span className="text-xs text-red-500 mt-1">
                  {errors.otp?.message}
               </span>
            )}
         </div>

         <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full md:w-[420px] h-14 md:h-14 bg-[#12ABAA] hover:bg-[#0fa9a9] rounded-[50px] text-white font-semibold mx-auto block"
         >
            Verify OTP
         </Button>
      </form>
   );
};

export default OtpForm;
