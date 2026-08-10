import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebaseAdmin";

export const PORTAL_SESSION_COOKIE = "lto_portal_session";
export const PORTAL_SESSION_MAX_AGE = 60 * 60 * 24 * 5;

export async function getPortalUser() {
  const sessionCookie = cookies().get(PORTAL_SESSION_COOKIE)?.value;
  const adminAuth = getAdminAuth();
  if (!sessionCookie || !adminAuth) return null;

  try {
    const claims = await adminAuth.verifySessionCookie(sessionCookie, true);
    if (!["client", "admin", "attorney"].includes(claims.role)) return null;
    return {
      uid: claims.uid,
      email: claims.email || "",
      name: claims.name || claims.email?.split("@")[0] || "Client",
      role: claims.role,
    };
  } catch {
    return null;
  }
}

export function isTrustedPortalOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const allowed = new URL(process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || request.url).origin;
  return origin === allowed || (process.env.NODE_ENV !== "production" && origin.startsWith("http://localhost:"));
}
