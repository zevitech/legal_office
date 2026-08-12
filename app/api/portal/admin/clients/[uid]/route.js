import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebaseAdmin";
import { requestEvidence } from "@/lib/paymentEvidence";

const text = (value, max = 180) => String(value ?? "").trim().slice(0, max);

/**
 * Edit a client's contact details.
 *
 * The login email is deliberately NOT editable here: it is the Firebase Auth
 * identity and the document key used across cases, invoices and evidence.
 * Changing it would orphan those records.
 */
export async function PATCH(request, { params }) {
  if (!isTrustedPortalOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  const staff = await getPortalUser();
  if (!staff || !["admin", "attorney"].includes(staff.role)) {
    return NextResponse.json({ error: "Attorney access required." }, { status: 401 });
  }
  const db = getAdminFirestore();
  if (!db) {
    return NextResponse.json(
      { error: "Portal database is not configured." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const name = text(body.name);
    const company = text(body.company);
    const phone = text(body.phone, 40);

    if (!name) {
      return NextResponse.json(
        { error: "Enter the client's full name." },
        { status: 400 },
      );
    }

    const clientRef = db.collection("portalClients").doc(params.uid);
    const snapshot = await clientRef.get();
    if (!snapshot.exists) {
      return NextResponse.json({ error: "Client not found." }, { status: 404 });
    }

    const previous = snapshot.data() || {};
    await clientRef.set(
      { name, company, phone, updatedAt: FieldValue.serverTimestamp() },
      { merge: true },
    );

    // Keep the Auth display name aligned so invitation and reset emails match.
    const auth = getAdminAuth();
    if (auth && previous.name !== name) {
      try {
        await auth.updateUser(params.uid, { displayName: name });
      } catch (authError) {
        console.error("Client renamed; Auth profile not updated:", authError?.message);
      }
    }

    await clientRef.collection("auditLog").add({
      event: "client_details_updated",
      changed: {
        name: previous.name !== name ? { from: previous.name || "", to: name } : undefined,
        company: previous.company !== company ? { from: previous.company || "", to: company } : undefined,
        phone: previous.phone !== phone ? { from: previous.phone || "", to: phone } : undefined,
      },
      performedBy: staff.uid,
      performedByName: staff.name,
      performedByRole: staff.role,
      createdAt: FieldValue.serverTimestamp(),
      ...requestEvidence(request),
    });

    return NextResponse.json({
      success: true,
      message: "Client details updated.",
      client: { name, company, phone },
    });
  } catch (error) {
    console.error("Client update failed:", error?.code, error?.message);
    return NextResponse.json(
      { error: "Unable to save these changes. Please try again." },
      { status: 500 },
    );
  }
}

/**
 * Deactivate or reactivate a client.
 *
 * This is a soft action by design. Client records are tied to legal matters and
 * payment evidence, so nothing is erased: the Firebase Auth user is disabled so
 * they cannot sign in, and the record is flagged inactive. Reactivating
 * restores access without any data loss.
 */
export async function DELETE(request, { params }) {
  if (!isTrustedPortalOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  const staff = await getPortalUser();
  if (!staff || staff.role !== "admin") {
    return NextResponse.json(
      { error: "Only an admin can deactivate a client." },
      { status: 401 },
    );
  }
  const db = getAdminFirestore();
  if (!db) {
    return NextResponse.json(
      { error: "Portal database is not configured." },
      { status: 503 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const reactivate = searchParams.get("reactivate") === "true";
    const reason = text(searchParams.get("reason"), 300);

    const clientRef = db.collection("portalClients").doc(params.uid);
    const snapshot = await clientRef.get();
    if (!snapshot.exists) {
      return NextResponse.json({ error: "Client not found." }, { status: 404 });
    }

    const auth = getAdminAuth();
    if (auth) {
      try {
        await auth.updateUser(params.uid, { disabled: !reactivate });
      } catch (authError) {
        // A missing Auth user should not block the record from being flagged.
        if (authError?.code !== "auth/user-not-found") {
          console.error("Client sign-in state not changed:", authError?.message);
          return NextResponse.json(
            { error: "Unable to change this client's sign-in access. Please try again." },
            { status: 500 },
          );
        }
      }
    }

    await clientRef.set(
      {
        status: reactivate ? "active" : "inactive",
        ...(reactivate
          ? { deactivatedAt: FieldValue.delete(), deactivationReason: FieldValue.delete() }
          : {
              deactivatedAt: FieldValue.serverTimestamp(),
              deactivationReason: reason,
            }),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    await clientRef.collection("auditLog").add({
      event: reactivate ? "client_reactivated" : "client_deactivated",
      reason,
      performedBy: staff.uid,
      performedByName: staff.name,
      performedByRole: staff.role,
      createdAt: FieldValue.serverTimestamp(),
      ...requestEvidence(request),
    });

    return NextResponse.json({
      success: true,
      status: reactivate ? "active" : "inactive",
      message: reactivate
        ? "Client reactivated. They can sign in again."
        : "Client deactivated. Their records are retained and they can no longer sign in.",
    });
  } catch (error) {
    console.error("Client deactivation failed:", error?.code, error?.message);
    return NextResponse.json(
      { error: "Unable to update this client. Please try again." },
      { status: 500 },
    );
  }
}
