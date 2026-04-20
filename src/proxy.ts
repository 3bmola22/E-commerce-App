import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const protectedRoutes = [
    "/wishlist",
    "/cart",
    "/checkout",
    "/profile",
    "/allorders",
  ];
  const protectedAuthRoutes = ["/login", "/register"];
  const realyPath = request.nextUrl.pathname;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const myToken = token?.routToken;
  // console.log("tolehk", token);
  if (!myToken && protectedRoutes.some((path) => realyPath.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  if (
    myToken &&
    protectedAuthRoutes.some((path) => realyPath.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/register/:path*",
    "/login/:path*",
    "/allorders/:path*",
    "/profile/:path*",
    "/checkout/:path*",
    "/cart/:path*",
    "/wishlist/:path*",
  ],
};
