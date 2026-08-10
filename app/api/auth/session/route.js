import { NextResponse } from "next/server";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebaseAdmin";
import { isTrustedPortalOrigin, PORTAL_SESSION_COOKIE, PORTAL_SESSION_MAX_AGE } from "@/lib/portalAuth";
import { requestEvidence } from "@/lib/paymentEvidence";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(request) {
  if (!isTrustedPortalOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const adminAuth = getAdminAuth();
  if (!adminAuth) {
    return NextResponse.json({ error: "Portal authentication is not configured." }, { status: 503 });
  }

  try {
    const { idToken } = await request.json();
    if (!idToken || typeof idToken !== "string") throw new Error("Missing token");

    const decoded = await adminAuth.verifyIdToken(idToken, true);
    if (!["client", "admin", "attorney"].includes(decoded.role)) {
      return NextResponse.json({ error: "This account has not been invited to the client portal." }, { status: 403 });
    }

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: PORTAL_SESSION_MAX_AGE * 1000,
    });
    try {
      const db = getAdminFirestore();
      if (db) await db.collection("portalClients").doc(decoded.uid).collection("auditLog").add({ event:"portal_login", actorUid:decoded.uid, actorRole:decoded.role, createdAt:FieldValue.serverTimestamp(), ...requestEvidence(request) });
    } catch (auditError) {
      console.error("Session created; login audit failed:", auditError?.message);
    }
    const response = NextResponse.json({ success: true, role: decoded.role });
    response.cookies.set(PORTAL_SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: PORTAL_SESSION_MAX_AGE,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to create a secure session." }, { status: 401 });
  }
}

export async function DELETE(request) {
  if (!isTrustedPortalOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  const response = NextResponse.json({ success: true });
  response.cookies.set(PORTAL_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
