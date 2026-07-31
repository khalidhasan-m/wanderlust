import { betterAuth } from "better-auth";
import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Changed function name from 'middleware' to 'proxy'
export async function proxy(request) {
  const sessionCookie = getSessionCookie(request);

  // Define protected routes that require a user session
  const protectedRoutes = ["/my-bookings", "/add-destination", "/profile"];
  const currentPath = request.nextUrl.pathname;

  // If the user is trying to access a protected route without a session cookie
  if (protectedRoutes.some((route) => currentPath.startsWith(route))) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If already logged in, prevent visiting login/signup pages again
  const authRoutes = ["/login", "/signup"];
  if (authRoutes.includes(currentPath)) {
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes the proxy should run on
export const config = {
  matcher: [
    "/my-bookings/:path*",
    "/add-destination/:path*",
    "/profile/:path*",
    "/login",
    "/signup",
  ],
};
