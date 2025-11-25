import { cookies, headers } from "next/headers";

async function exchangeRefreshTokenForAccessToken(
   cookieHeader: string | null
): Promise<string | null> {
   try {
      const fetchHeaders: Record<string, string> = {
         "Content-Type": "application/json",
      };

      if (cookieHeader) {
         fetchHeaders["Cookie"] = cookieHeader;
      }

      const response = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
         {
            method: "POST",
            headers: fetchHeaders,
         }
      );

      if (!response.ok) {
         const errorBody = await response.text();
         console.error(
            `[Server Auth Error] Status: ${response.status}. Message: ${response.statusText}. Body: ${errorBody}`
         );
         return null;
      }

      const data = await response.json();
      return data.token.accessToken as string;
   } catch (error) {
      console.error("Error during server-side refresh process:", error);
      return null;
   }
}

export async function getServerAccessToken(): Promise<string | null> {
   const incomingHeaders = await headers();
   const cookieHeader = incomingHeaders.get("cookie");

   if (!cookieHeader || !cookieHeader.includes("refreshToken")) {
      console.log("No refresh token cookie found in request headers.");
      return null;
   }

   const accessToken = await exchangeRefreshTokenForAccessToken(cookieHeader);

   return accessToken;
}
