import { NextResponse, NextRequest } from "next/server";
import { getSessionCookie } from "better-auth";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/jobs/:path*", "/admin/:path*"],
};
