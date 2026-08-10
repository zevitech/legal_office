import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { sendAttorneyActivityEmail } from "@/lib/portalEmail";
import { requestEvidence } from "@/lib/paymentEvidence";

export async function POST(request) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const user = await getPortalUser();
  if (!user || user.role !== "client") return NextResponse.json({ error: "Client access required." }, { status: 401 });
  const db = getAdminFirestore();
  if (!db) return NextResponse.json({ error: "Portal database is not configured." }, { status: 503 });
  try {
    const body = await request.json();
    if (!["llc", "domain", "existing_trademark", "amendment"].includes(body.type)) return NextResponse.json({ error: "Unsupported request." }, { status: 400 });
    let details;
    if (body.type === "amendment") {
      details = { stage: body.details?.stage === "post_filing" ? "post_filing" : "pre_filing", requestType: String(body.details?.requestType || "other").slice(0, 80), description: String(body.details?.description || "").trim().slice(0, 3000), acknowledgedReview: Boolean(body.details?.acknowledgedReview) };
      if (!details.description || !details.acknowledgedReview) return NextResponse.json({ error: "Describe the requested change and acknowledge attorney review." }, { status: 400 });
    } else if (body.type === "existing_trademark") {
      details = { markName: String(body.details?.markName || "").trim().slice(0, 160), serialNumber: String(body.details?.serialNumber || "").replace(/\D/g, "").slice(0, 8), notes: String(body.details?.notes || "").trim().slice(0, 2000) };
      if (!details.markName || !/^\d{8}$/.test(details.serialNumber)) return NextResponse.json({ error: "Trademark name and a valid 8-digit USPTO serial number are required." }, { status: 400 });
    } else if (body.type === "llc") {
      details = { state: String(body.details?.state || "").slice(0, 80), name: String(body.details?.name || "").trim().slice(0, 180), management: body.details?.management === "manager" ? "manager" : "member", owners: Math.min(20, Math.max(1, Number(body.details?.owners || 1))), ein: Boolean(body.details?.ein), agreement: Boolean(body.details?.agreement), agent: Boolean(body.details?.agent) };
      if (!details.state || !details.name) return NextResponse.json({ error: "Formation state and preferred LLC name are required." }, { status: 400 });
    } else {
      details = { domain: String(body.details?.domain || "").toLowerCase().slice(0, 253), years: Math.min(3, Math.max(1, Number(body.details?.years || 1))), protection: Boolean(body.details?.protection), quotedPrice: Math.max(0, Number(body.details?.quotedPrice || 0)) };
      if (!/^[a-z0-9-]+\.[a-z]{2,}$/i.test(details.domain)) return NextResponse.json({ error: "Select a valid available domain." }, { status: 400 });
    }
    const requestData = { type: body.type, details, caseId: String(body.caseId || "").slice(0, 160), serviceTotal: Math.max(0, Number(body.serviceTotal || 0)), status: "attorney_review", createdAt: FieldValue.serverTimestamp() };
    const clientRef = db.collection("portalClients").doc(user.uid);
    const [requestDocument, clientSnapshot] = await Promise.all([clientRef.collection("serviceRequests").add(requestData), clientRef.get()]);
    await clientRef.collection("auditLog").add({ event:"client_service_request", requestId:requestDocument.id, requestType:body.type, caseId:requestData.caseId, details, actorUid:user.uid, actorRole:user.role, createdAt:FieldValue.serverTimestamp(), ...requestEvidence(request) });
    const label = body.type === "llc" ? `LLC formation request: ${details.name}` : body.type === "domain" ? `Domain registration request: ${details.domain}` : body.type === "amendment" ? `Trademark amendment requested (${details.stage === "post_filing" ? "after USPTO filing" : "before USPTO filing"})` : `Existing trademark review: ${details.markName}`;
    const message = body.type === "llc" ? `${details.state} · ${details.management}-managed · ${details.owners} owner(s)` : body.type === "domain" ? `${details.years}-year registration${details.protection ? " with protection review" : ""}` : body.type === "amendment" ? `${details.requestType}: ${details.description}` : `USPTO serial ${details.serialNumber}`;
    const notification = { clientUid: user.uid, clientName: user.name, clientEmail: user.email, caseId: requestData.caseId, requestId: requestDocument.id, type: `${body.type}_request`, title: label, message, read: false, createdAt: FieldValue.serverTimestamp() };
    await db.collection("portalAttorneyNotifications").add(notification);
    try { await sendAttorneyActivityEmail({ ...notification, clientName: clientSnapshot.data()?.name || user.name, clientEmail: clientSnapshot.data()?.email || user.email }); } catch (error) { console.error("Service request email failed:", error?.message); }
    return NextResponse.json({ success: true, requestId: requestDocument.id });
  } catch {
    return NextResponse.json({ error: "Unable to save the request." }, { status: 500 });
  }
}
