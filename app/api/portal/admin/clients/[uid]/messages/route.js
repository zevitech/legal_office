import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { sendPortalActivityEmail } from "@/lib/portalEmail";
import { requestEvidence } from "@/lib/paymentEvidence";

function serialize(doc) {
  const item = doc.data();
  return { id: doc.id, ...item, createdAt: item.createdAt?.toDate?.().toISOString() || null };
}

async function authorizeStaff() {
  const staff = await getPortalUser();
  return staff && ["admin", "attorney"].includes(staff.role) ? staff : null;
}

export async function GET(request, { params }) {
  const staff = await authorizeStaff();
  if (!staff) return NextResponse.json({ error: "Attorney access required." }, { status: 401 });
  const db = getAdminFirestore();
  if (!db) return NextResponse.json({ messages: [] });
  const caseId = String(new URL(request.url).searchParams.get("caseId") || "").slice(0, 120);
  try {
    const snapshot = await db.collection("portalClients").doc(params.uid).collection("messages").orderBy("createdAt", "asc").limit(200).get();
    const messages = snapshot.docs.map(serialize).filter((item) => !caseId || !item.caseId || item.caseId === caseId);
    const unread = snapshot.docs.filter((doc) => { const item = doc.data(); return (!caseId || !item.caseId || item.caseId === caseId) && item.direction === "client_to_staff" && !item.readByStaff; });
    await Promise.all(unread.map((doc) => doc.ref.set({ readByStaff: true, readByStaffAt: FieldValue.serverTimestamp(), readByStaffUid: staff.uid }, { merge: true })));
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: "Unable to load secure messages." }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const staff = await authorizeStaff();
  if (!staff) return NextResponse.json({ error: "Attorney access required." }, { status: 401 });
  const db = getAdminFirestore();
  if (!db) return NextResponse.json({ error: "Portal database is not configured." }, { status: 503 });
  try {
    const body = await request.json();
    const caseId = String(body.caseId || "").slice(0, 120);
    const message = String(body.message || "").trim().slice(0, 3000);
    if (!message) return NextResponse.json({ error: "Write a reply before sending." }, { status: 400 });
    const clientRef = db.collection("portalClients").doc(params.uid);
    const clientSnapshot = await clientRef.get();
    if (!clientSnapshot.exists) return NextResponse.json({ error: "Client not found." }, { status: 404 });
    const record = { caseId, body: message, senderId: staff.uid, senderName: staff.name || "Legal team", senderRole: staff.role, direction: "staff_to_client", readByStaff: true, readByClient: false, createdAt: FieldValue.serverTimestamp() };
    const messageRef = await clientRef.collection("messages").add(record);
    const activity = { type: "message", title: "New secure reply from your legal team", message, caseId, messageId: messageRef.id, createdBy: staff.uid, createdByName: staff.name, read: false, createdAt: FieldValue.serverTimestamp() };
    const activityRef = await clientRef.collection("activity").add(activity);
    await clientRef.collection("auditLog").add({ event: "secure_support_reply_sent", caseId, messageId: messageRef.id, activityId: activityRef.id, performedBy: staff.uid, performedByName: staff.name, performedByRole: staff.role, createdAt: FieldValue.serverTimestamp(), ...requestEvidence(request) });
    const client = clientSnapshot.data() || {};
    try { await sendPortalActivityEmail({ clientName: client.name, clientEmail: client.email, attorneyName: staff.name, ...activity }); } catch (error) { console.error("Secure reply saved; email delivery failed:", error?.message); }
    return NextResponse.json({ success: true, message: { id: messageRef.id, ...record, createdAt: new Date().toISOString() } });
  } catch {
    return NextResponse.json({ error: "Unable to send the secure reply." }, { status: 500 });
  }
}
