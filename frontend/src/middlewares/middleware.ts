import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of routes where login is not allowed for authenticated users
const noAuthRoutes = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  const { pathname } = request.nextUrl;

  // If the user is already logged in and trying to access noAuthRoutes, redirect to homepage
  if (token && noAuthRoutes.includes(pathname)) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  // If the user is not logged in and trying to access protected routes
  if (!token && pathname.startsWith("/")) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  // Allow the request to continue
  return NextResponse.next();
}
