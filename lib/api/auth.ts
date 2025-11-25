const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginWithOtp(payload: {
   email: string;
   password: string;
}) {
   const res = await fetch(`${BASE_URL}/auth/loginWithOtp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
   });

   const data = await res.json();
   console.log(data);
   if (!res.ok) throw new Error(data?.message || "Login failed");

   return data;
}

export async function verifyOtp(payload: { otp: string; accessToken: string }) {
   const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
   });

   const data = await res.json();
   if (!res.ok) throw new Error(data?.message || "OTP verification failed");

   return data;
}

export async function forgotPassword(payload: { email: string }) {
   const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
   });

   const data = await res.json();
   if (!res.ok)
      throw new Error(
         data?.message || data.error?.message || "Failed to send reset link"
      );

   return data;
}

export async function resetPassword(payload: {
   token: string;
   newPassword: string;
}) {
   const res = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
   });

   const data = await res.json();

   if (!res.ok) throw new Error(data?.message || "Reset password failed");

   return data;
}
