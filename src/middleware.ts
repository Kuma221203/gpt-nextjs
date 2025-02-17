import { NextRequest, NextResponse } from "next/server";
import authenticaed from "./app/auth/authenticated";

const unauthorizedRoutes = ["/auth/login", "/auth/signup", "/about"]
export function middleware(request: NextRequest) {

  if (!authenticaed() && !unauthorizedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
}

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
