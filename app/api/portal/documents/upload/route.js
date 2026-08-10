import crypto from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminFirestore, getAdminStorage } from "@/lib/firebaseAdmin";
import { sendAttorneyActivityEmail } from "@/lib/portalEmail";
import { requestEvidence } from "@/lib/paymentEvidence";
import { validatePortalUpload } from "@/lib/portalFileValidation";

export const runtime = "nodejs";

const allowedTypes = new Set(["application/pdf", "image/png", "image/jpeg", "image/webp"]);

export async function POST(request) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const user = await getPortalUser();
  if (!user || user.role !== "client") return NextResponse.json({ error: "Client access required." }, { status: 401 });
  const db = getAdminFirestore();
  const storage = getAdminStorage();
  if (!db || !storage) return NextResponse.json({ error: "Secure document storage is not configured." }, { status: 503 });

  try {
    const form = await request.formData();
    const file = form.get("document");
    const caseId = String(form.get("caseId") || "primary").slice(0, 160);
    const activityId = String(form.get("activityId") || "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 160);
    const validation = await validatePortalUpload(file, { allowedTypes, maxBytes: 15 * 1024 * 1024 });
    if (!validation.ok) return NextResponse.json({ error: validation.error || "Upload a valid PDF, PNG, JPG, or WebP file." }, { status: 400 });
    const id = crypto.randomUUID();
    const safeName = file.name.replace(/[^A-Za-z0-9._-]/g, "_").slice(-120) || "client-document";
    const path = `portal-clients/${user.uid}/uploads/${id}/${safeName}`;
    await storage.bucket().file(path).save(validation.buffer, { resumable: false, contentType: validation.contentType, metadata: { cacheControl: "private, no-store", metadata: { uploadedBy: user.uid, caseId, activityId } } });
    const documentUrl = `/api/portal/documents/client/${id}?clientUid=${encodeURIComponent(user.uid)}`;
    await db.collection("portalClients").doc(user.uid).collection("documents").doc(id).set({ caseId, activityId, reviewStatus:"pending", fileName: file.name.slice(0, 180), contentType: validation.contentType, size: file.size, storagePath: path, documentUrl, uploadedBy: user.uid, createdAt: FieldValue.serverTimestamp() });
    await db.collection("portalClients").doc(user.uid).collection("auditLog").add({ event:"client_document_uploaded", caseId, activityId, documentId:id, fileName:file.name.slice(0,180), contentType:validation.contentType, size:file.size, documentUrl, actorUid:user.uid, actorRole:user.role, createdAt:FieldValue.serverTimestamp(), ...requestEvidence(request) });
    const notification = { clientUid: user.uid, clientName: user.name, clientEmail: user.email, caseId, activityId, type: "document_upload", title: "Client uploaded a document", message: `${file.name.slice(0, 180)} was uploaded${activityId ? " for a requested task" : " to the secure case file"} and is awaiting attorney review.`, documentUrl, read: false, createdAt: FieldValue.serverTimestamp() };
    await db.collection("portalAttorneyNotifications").add(notification);
    try { await sendAttorneyActivityEmail(notification); } catch (error) { console.error("Attorney upload email failed:", error?.message); }
    return NextResponse.json({ success: true, documentUrl, fileName: file.name.slice(0, 180) });
  } catch {
    return NextResponse.json({ error: "Unable to securely upload this document." }, { status: 500 });
  }
}
