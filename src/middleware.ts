import { NextRequest, NextResponse } from "next/server";

const unauthorizedRoutes = ["/auth/login", "/auth/signup", "/"];
const authorizedRoutes = ["/auth/login", "/auth/signup"];

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("Authentication");
  const isAuthenticated = !!authCookie?.value;
  
  if (!isAuthenticated && !unauthorizedRoutes.some(route =>request.nextUrl.pathname === route)) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && authorizedRoutes.some(route =>request.nextUrl.pathname === route)) {
    const aboutUrl = new URL("/", request.url);
    return NextResponse.redirect(aboutUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
