import { NextResponse } from "next/server";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebaseAdmin";
import { isTrustedPortalOrigin, PORTAL_SESSION_COOKIE, PORTAL_SESSION_MAX_AGE } from "@/lib/portalAuth";
import { requestEvidence } from "@/lib/paymentEvidence";
import { sendAttorneyActivityEmail } from "@/lib/portalEmail";
import { FieldValue } from "firebase-admin/firestore";

// Sign-in itself is fast, but a first-time activation also sends a staff email
// (~10s over SMTP). Allow headroom so that send is not cut off mid-flight.
export const maxDuration = 30;

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
      if (db) {
        const clientRef = db.collection("portalClients").doc(decoded.uid);
        await clientRef.collection("auditLog").add({ event:"portal_login", actorUid:decoded.uid, actorRole:decoded.role, createdAt:FieldValue.serverTimestamp(), ...requestEvidence(request) });

        // Notify staff the FIRST time a client actually gets in. Account
        // creation at checkout already sends its own email; this is the
        // separate signal that they set a password and reached the portal.
        // A transaction makes the flag atomic so two tabs cannot both notify.
        if (decoded.role === "client") {
          const snapshot = await clientRef.get();
          const client = snapshot.data() || {};

          if (snapshot.exists && !client.activatedAt) {
            const claimed = await db.runTransaction(async (transaction) => {
              const fresh = await transaction.get(clientRef);
              if (fresh.data()?.activatedAt) return false;
              transaction.set(
                clientRef,
                { activatedAt: FieldValue.serverTimestamp(), status: fresh.data()?.status === "invited" ? "active" : fresh.data()?.status || "active" },
                { merge: true },
              );
              return true;
            });

            if (claimed) {
              const activation = {
                type: "client_activated",
                title: `Client activated their portal: ${client.name || decoded.email || "Client"}`,
                message: `${client.name || "The client"} set their password and signed in to the client portal for the first time. They can now see their case, upload documents and message the filing team.`,
                clientName: client.name || decoded.name || "Client",
                clientEmail: client.email || decoded.email || "",
                read: false,
                createdAt: FieldValue.serverTimestamp(),
              };
              // The in-portal notice is a fast Firestore write, so await it.
              await clientRef.collection("activity").add(activation).catch((error) =>
                console.error("Activation notice not stored:", error?.message),
              );
              // The email is NOT awaited: SMTP takes ~10s, which would risk the
              // serverless timeout and leave the customer unable to sign in.
              // The notice above is already persisted either way.
              sendAttorneyActivityEmail(activation).catch((error) =>
                console.error("Activation email failed:", error?.message),
              );
            }
          }
        }
      }
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
