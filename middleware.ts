import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerAccessToken } from "./lib/data/serverAuth";

const ADMIN_ROUTES = [
   "/dashboard",
   "/clients",
   "/products",
   "/publishers",
   "/proposals",
   "/advertisers",
];

const CLIENT_ROUTES = ["/campaign", "/profile", "/proposals"];

function decodeJwt(token: string) {
   try {
      const base64 = token.split(".")[1];
      const decoded = JSON.parse(Buffer.from(base64, "base64").toString());
      return decoded;
   } catch {
      return null;
   }
}

export async function middleware(req: NextRequest) {
   const cookieHeader = req.headers.get("cookie");

   const pathname = req.nextUrl.pathname;

   const isProtected = [...ADMIN_ROUTES, ...CLIENT_ROUTES].some((route) =>
      pathname.startsWith(route)
   );

   if (!isProtected) return NextResponse.next();

   if (!cookieHeader || !cookieHeader.includes("refreshToken")) {
      return NextResponse.redirect(new URL("/not-authorized", req.url));
   }

   const accessToken = await getServerAccessToken();

   if (!accessToken) {
      return NextResponse.redirect(new URL("/not-authorized", req.url));
   }

   const decoded = decodeJwt(accessToken);

   console.log(decoded);

   if (!decoded?.roleId) {
      return NextResponse.redirect(new URL("/not-authorized", req.url));
   }

   const roleId = decoded.roleId;

   if (roleId === "UserAdmin") {
      return NextResponse.next();
   }

   if (roleId === "Client") {
      if (!CLIENT_ROUTES.some((route) => pathname.startsWith(route))) {
         return NextResponse.redirect(new URL("/not-authorized", req.url));
      }
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      "/dashboard/:path*",
      "/clients/:path*",
      "/products/:path*",
      "/publishers/:path*",
      "/proposals/:path*",
      "/advertisers/:path*",
      "/campaign/:path*",
      "/profile/:path*",
   ],
};
