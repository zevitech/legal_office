import { NextResponse } from "next/server";

/**
 * Apply conservative browser security headers to application API responses.
 * Portal and checkout APIs are same-origin; they must never advertise wildcard
 * cross-origin access. Mutating portal routes also perform their own trusted-
 * origin and authenticated-role checks.
 */
export function middleware(request) {
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Content-Security-Policy", "frame-ancestors 'none'");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (!request.nextUrl.pathname.startsWith("/api/")) response.headers.set("Cache-Control", "private, no-store");
  if (process.env.NODE_ENV === "production") response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  return response;
}

export const config = {
  matcher: ["/api/:path*", "/client-portal/:path*", "/portal-admin/:path*", "/portal-login/:path*", "/portal/:path*"],
};
