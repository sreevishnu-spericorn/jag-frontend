export async function refreshAccessToken() {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
         {
            method: "POST",
            credentials: "include",
         }
      );

      const data = await res.json();

      if (!res.ok) {
         console.warn(
            "Refresh token missing/expired. Returning null instead of error."
         );
         return null; 
      }

      return data.token.accessToken;
   } catch (err) {
      console.error("Refresh token fetch failed:", err);
      return null;
   }
}
