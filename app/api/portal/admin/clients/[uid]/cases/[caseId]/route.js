import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { requestEvidence } from "@/lib/paymentEvidence";
import { PORTAL_PACKAGE_OPTIONS } from "@/constant/pricing";

const text = (value, max = 180) => String(value ?? "").trim().slice(0, max);

const MARK_TYPES = ["Word mark", "Logo / design mark", "Slogan", "Sound mark"];

/**
 * Correct the details of an existing trademark matter.
 *
 * Only descriptive fields are editable. Roadmap status, progress, payment state
 * and filing records are owned by the enforced workflow routes and must not be
 * writable from a free-form edit form.
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
    const markName = text(body.markName);
    const markType = text(body.markType, 60);
    const packageName = text(body.packageName, 60);
    const owner = text(body.owner);

    if (!markName) {
      return NextResponse.json(
        { error: "Enter the trademark name." },
        { status: 400 },
      );
    }
    if (markType && !MARK_TYPES.includes(markType)) {
      return NextResponse.json(
        { error: `Choose a valid mark type: ${MARK_TYPES.join(", ")}.` },
        { status: 400 },
      );
    }
    if (packageName && !PORTAL_PACKAGE_OPTIONS.includes(packageName)) {
      return NextResponse.json(
        { error: `Choose a valid package: ${PORTAL_PACKAGE_OPTIONS.join(", ")}.` },
        { status: 400 },
      );
    }

    const clientRef = db.collection("portalClients").doc(params.uid);
    const caseRef = clientRef.collection("cases").doc(params.caseId);
    const snapshot = await caseRef.get();
    if (!snapshot.exists) {
      return NextResponse.json({ error: "Trademark matter not found." }, { status: 404 });
    }

    const previous = snapshot.data() || {};
    await caseRef.set(
      {
        markName,
        ...(markType ? { markType } : {}),
        ...(packageName ? { packageName } : {}),
        ...(owner ? { owner } : {}),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    await clientRef.collection("auditLog").add({
      event: "case_details_updated",
      caseId: params.caseId,
      changed: {
        markName: previous.markName !== markName ? { from: previous.markName || "", to: markName } : undefined,
        markType: markType && previous.markType !== markType ? { from: previous.markType || "", to: markType } : undefined,
        packageName: packageName && previous.packageName !== packageName ? { from: previous.packageName || "", to: packageName } : undefined,
      },
      performedBy: staff.uid,
      performedByName: staff.name,
      performedByRole: staff.role,
      createdAt: FieldValue.serverTimestamp(),
      ...requestEvidence(request),
    });

    return NextResponse.json({
      success: true,
      message: "Trademark matter updated.",
      case: { markName, markType, packageName, owner },
    });
  } catch (error) {
    console.error("Case update failed:", error?.code, error?.message);
    return NextResponse.json(
      { error: "Unable to save these changes. Please try again." },
      { status: 500 },
    );
  }
}

/**
 * Close or reopen a trademark matter.
 *
 * Never a hard delete: a case carries filing records, payment evidence and
 * audit history that may be needed long after the matter ends. Closing hides it
 * from the active roadmap while keeping every record intact.
 *
 * A matter with a recorded payment cannot be closed without an explicit reason,
 * so a paid case is never quietly removed from view.
 */
export async function DELETE(request, { params }) {
  if (!isTrustedPortalOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  const staff = await getPortalUser();
  if (!staff || staff.role !== "admin") {
    return NextResponse.json(
      { error: "Only an admin can close a trademark matter." },
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
    const reopen = searchParams.get("reopen") === "true";
    const reason = text(searchParams.get("reason"), 300);

    const clientRef = db.collection("portalClients").doc(params.uid);
    const caseRef = clientRef.collection("cases").doc(params.caseId);
    const snapshot = await caseRef.get();
    if (!snapshot.exists) {
      return NextResponse.json({ error: "Trademark matter not found." }, { status: 404 });
    }

    const existing = snapshot.data() || {};
    const wasPaid = Number(existing.orderTotal || 0) > 0 || Boolean(existing.transactionId);

    if (!reopen && wasPaid && !reason) {
      return NextResponse.json(
        {
          error:
            "This matter has a recorded payment. Enter a reason before closing it.",
          requiresReason: true,
        },
        { status: 400 },
      );
    }

    await caseRef.set(
      {
        archived: !reopen,
        ...(reopen
          ? { archivedAt: FieldValue.delete(), archiveReason: FieldValue.delete() }
          : { archivedAt: FieldValue.serverTimestamp(), archiveReason: reason }),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    await clientRef.collection("auditLog").add({
      event: reopen ? "case_reopened" : "case_closed",
      caseId: params.caseId,
      markName: existing.markName || "",
      hadPayment: wasPaid,
      reason,
      performedBy: staff.uid,
      performedByName: staff.name,
      performedByRole: staff.role,
      createdAt: FieldValue.serverTimestamp(),
      ...requestEvidence(request),
    });

    return NextResponse.json({
      success: true,
      archived: !reopen,
      message: reopen
        ? "Trademark matter reopened."
        : "Trademark matter closed. All filing and payment records are retained.",
    });
  } catch (error) {
    console.error("Case close failed:", error?.code, error?.message);
    return NextResponse.json(
      { error: "Unable to update this matter. Please try again." },
      { status: 500 },
    );
  }
}
