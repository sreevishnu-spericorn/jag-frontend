import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
   "/dashboard",
   "/profile",
   "/clients",
   "/products",
   "/publishers",
   "/proposals",
];

export function middleware(req: NextRequest) {
   const refreshToken = req.cookies.get("refreshToken")?.value;

   const { pathname } = req.nextUrl;

   const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
   );

   if (!isProtected) return NextResponse.next();

   if (!refreshToken) {
      const url = new URL("/not-authorized", req.url);
      return NextResponse.redirect(url);
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      "/",
      "/dashboard/:path*",
      "/profile/:path*",
      "/clients/:path*",
      "/products/:path*",
      "/publishers/:path*",
      "/proposals/:path*",
   ],
   runtime: "nodejs",
};
