import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebaseAdmin";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { sendAttorneyInvitationEmail } from "@/lib/portalEmail";

export async function GET(request) {
  const current = await getPortalUser();
  if (!current || !["admin", "attorney"].includes(current.role)) {
    return NextResponse.json({ error: "Attorney access required." }, { status: 401 });
  }
  const db = getAdminFirestore();
  if (!db) {
    return NextResponse.json({ error: "Attorney management is not configured." }, { status: 503 });
  }
  try {
    // Assignment pickers want active staff only. The team management screen
    // passes ?includeInactive=true so a deactivated member is still visible and
    // can be reactivated — otherwise they would disappear with no way back.
    const includeInactive =
      new URL(request.url).searchParams.get("includeInactive") === "true" &&
      current.role === "admin";

    const query = includeInactive
      ? db.collection("portalAttorneys").limit(100)
      : db.collection("portalAttorneys").where("status", "==", "active").limit(100);

    const snapshot = await query.get();
    return NextResponse.json({
      attorneys: snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString() || null,
        updatedAt: doc.data().updatedAt?.toDate?.().toISOString() || null,
        deactivatedAt: doc.data().deactivatedAt?.toDate?.().toISOString() || null,
      })),
    });
  } catch (error) {
    console.error("Attorney list failed:", error?.code, error?.message);
    return NextResponse.json(
      { error: "Unable to load the staff list. Please refresh and try again." },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const current = await getPortalUser();
  if (!current || current.role !== "admin") return NextResponse.json({ error: "Owner administrator access required." }, { status: 401 });
  const auth = getAdminAuth(); const db = getAdminFirestore();
  if (!auth || !db) return NextResponse.json({ error: "Attorney management is not configured." }, { status: 503 });
  try {
    const body = await request.json(); const name = String(body.name || "").trim(); const email = String(body.email || "").trim().toLowerCase();
    if (!name || !email.includes("@")) return NextResponse.json({ error: "Valid name and email are required." }, { status: 400 });

    // Adding yourself here would overwrite your own admin claim with "attorney"
    // and permanently lock you out of the admin portal.
    if (email === String(current.email || "").trim().toLowerCase()) {
      return NextResponse.json(
        { error: "This is your own account. Use Edit profile instead — adding yourself here would remove your admin access." },
        { status: 400 },
      );
    }

    // Look the account up first so role conflicts are reported before any write.
    let existing = null;
    try {
      existing = await auth.getUserByEmail(email);
    } catch (error) {
      if (error.code !== "auth/user-not-found") throw error;
    }

    // Never silently take over an account that belongs to someone else.
    const existingRole = existing?.customClaims?.role;
    if (existingRole === "admin") {
      return NextResponse.json(
        { error: "This email belongs to an administrator. Change their role from the admin account instead." },
        { status: 409 },
      );
    }
    if (existingRole === "client") {
      return NextResponse.json(
        { error: "This email already belongs to a client portal account. Use a different address for staff." },
        { status: 409 },
      );
    }

    const user = existing
      ? await auth.updateUser(existing.uid, { displayName: name, disabled: false })
      : await auth.createUser({ email, displayName: name });
    await auth.setCustomUserClaims(user.uid, { ...(user.customClaims || {}), role: "attorney" });
    await db.collection("portalAttorneys").doc(user.uid).set({ uid: user.uid, name, email, title: body.title || "Trademark attorney", phone: body.phone || "", role: "attorney", status: "active", updatedAt: FieldValue.serverTimestamp(), createdAt: FieldValue.serverTimestamp() }, { merge: true });
    const base = (process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
    const firebaseLink = await auth.generatePasswordResetLink(email, { url: `${base}/portal-login` }); const code = new URL(firebaseLink).searchParams.get("oobCode");
    await sendAttorneyInvitationEmail({ name, email, setupUrl: `${base}/portal/set-password?oobCode=${encodeURIComponent(code)}&email=${encodeURIComponent(email)}` });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Unable to add the attorney." }, { status: 500 }); }
}

export async function PATCH(request) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const current = await getPortalUser();
  if (!current || !["admin", "attorney"].includes(current.role)) return NextResponse.json({ error: "Attorney access required." }, { status: 401 });
  const auth = getAdminAuth(); const db = getAdminFirestore();
  if (!auth || !db) return NextResponse.json({ error: "Attorney management is not configured." }, { status: 503 });
  try {
    const body = await request.json();
    const requestedId = String(body.id || "");
    const uid = current.role === "admin" && requestedId ? requestedId : current.uid;
    const name = String(body.name || "").trim();
    if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
    await auth.updateUser(uid, { displayName: name });
    await db.collection("portalAttorneys").doc(uid).set({ name, title: String(body.title || "Trademark attorney"), phone: String(body.phone || ""), bio: String(body.bio || ""), updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    return NextResponse.json({ success: true, message: "Profile updated." });
  } catch { return NextResponse.json({ error: "Unable to update the attorney profile." }, { status: 500 }); }
}

/**
 * Deactivate or reactivate a staff member.
 *
 * Nothing is deleted: the record carries assignment history on client cases.
 * Sign-in is disabled and the record is flagged inactive, so a departing
 * attorney immediately loses access to every client file while the audit trail
 * of their past work stays intact.
 */
export async function DELETE(request) {
  if (!isTrustedPortalOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  const current = await getPortalUser();
  if (!current || current.role !== "admin") {
    return NextResponse.json(
      { error: "Owner administrator access required." },
      { status: 401 },
    );
  }
  const auth = getAdminAuth();
  const db = getAdminFirestore();
  if (!auth || !db) {
    return NextResponse.json(
      { error: "Attorney management is not configured." },
      { status: 503 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const uid = String(searchParams.get("id") || "").trim();
    const reactivate = searchParams.get("reactivate") === "true";

    if (!uid) {
      return NextResponse.json({ error: "Select a staff member." }, { status: 400 });
    }
    // Deactivating yourself would immediately end your own session and could
    // leave the portal with no reachable administrator.
    if (uid === current.uid) {
      return NextResponse.json(
        { error: "You cannot deactivate your own account." },
        { status: 400 },
      );
    }

    const ref = db.collection("portalAttorneys").doc(uid);
    const snapshot = await ref.get();
    if (!snapshot.exists) {
      return NextResponse.json({ error: "Staff member not found." }, { status: 404 });
    }

    try {
      await auth.updateUser(uid, { disabled: !reactivate });
    } catch (authError) {
      if (authError?.code !== "auth/user-not-found") {
        console.error("Attorney sign-in state not changed:", authError?.message);
        return NextResponse.json(
          { error: "Unable to change this staff member's sign-in access. Please try again." },
          { status: 500 },
        );
      }
    }

    await ref.set(
      {
        status: reactivate ? "active" : "inactive",
        ...(reactivate
          ? { deactivatedAt: FieldValue.delete() }
          : { deactivatedAt: FieldValue.serverTimestamp(), deactivatedBy: current.uid }),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return NextResponse.json({
      success: true,
      status: reactivate ? "active" : "inactive",
      message: reactivate
        ? "Staff member reactivated. They can sign in again."
        : "Staff member deactivated. Their case history is retained and they can no longer sign in.",
    });
  } catch (error) {
    console.error("Attorney deactivation failed:", error?.code, error?.message);
    return NextResponse.json(
      { error: "Unable to update this staff member. Please try again." },
      { status: 500 },
    );
  }
}
