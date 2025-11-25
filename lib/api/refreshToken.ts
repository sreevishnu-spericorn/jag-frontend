export async function refreshAccessToken() {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
   });

   const data = await res.json();

   if (!res.ok) throw new Error(data?.message || "Failed to refresh token");

   return data.token.accessToken; 
}
