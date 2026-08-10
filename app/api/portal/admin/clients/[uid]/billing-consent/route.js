import crypto from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminFirestore, getAdminStorage } from "@/lib/firebaseAdmin";
import { requestEvidence, STATEMENT_DESCRIPTOR } from "@/lib/paymentEvidence";
import { sendPortalActivityEmail } from "@/lib/portalEmail";
import { validatePortalUpload } from "@/lib/portalFileValidation";

export const runtime = "nodejs";
const allowedTypes = new Set(["application/pdf", "audio/mpeg", "audio/mp4", "audio/x-m4a", "audio/wav", "audio/x-wav"]);
const allowedCategories = new Set(["classification_fees", "office_action", "amendment", "declaration", "publication", "filing_requirement"]);

export async function POST(request, { params }) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error:"Invalid request origin." }, { status:403 });
  const staff = await getPortalUser();
  if (!staff || !["admin", "attorney"].includes(staff.role)) return NextResponse.json({ error:"Attorney access required." }, { status:401 });
  const db = getAdminFirestore(); const storage = getAdminStorage();
  if (!db || !storage) return NextResponse.json({ error:"Secure portal storage is not configured." }, { status:503 });
  try {
    const form = await request.formData();
    if (form.get("lawfulRecordingAttestation") !== "true") return NextResponse.json({ error:"The attorney must attest that all legally required recording consents were obtained before the recording began." }, { status:400 });
    if (form.get("cardDataExcludedAttestation") !== "true") return NextResponse.json({ error:"Confirm that the recording and uploaded evidence do not contain a full card number, CVV, PIN, or other sensitive authentication data." }, { status:400 });
    const evidenceFile = form.get("evidenceFile");
    const validation = await validatePortalUpload(evidenceFile, { allowedTypes, maxBytes: 100 * 1024 * 1024 });
    if (!validation.ok) return NextResponse.json({ error: validation.error || "Upload a valid call recording or signed written consent as PDF, MP3, M4A, or WAV." }, { status:400 });
    const consentDate = String(form.get("consentDate")||"").slice(0,30);
    const maximum = Number(form.get("maximum")||0);
    const categories = form.getAll("categories").map(String).filter(value=>allowedCategories.has(value));
    if (!consentDate || !(maximum>0&&maximum<=25000) || !categories.length) return NextResponse.json({ error:"Consent date, at least one covered fee, and the exact client-approved ceiling (up to $25,000) are required." }, { status:400 });
    const clientRef = db.collection("portalClients").doc(params.uid);
    const [clientSnapshot, methods] = await Promise.all([clientRef.get(), clientRef.collection("billingMethods").where("status","==","active").limit(5).get()]);
    if (!clientSnapshot.exists) return NextResponse.json({ error:"Client not found." }, { status:404 });
    const methodDoc = methods.docs[0];
    if (!methodDoc) return NextResponse.json({ error:"The client has no saved NMI payment method. Save a method before recording a standing authorization." }, { status:409 });
    const recordId = crypto.randomUUID();
    const safeName = evidenceFile.name.replace(/[^A-Za-z0-9._-]/g,"_").slice(-120)||"consent-evidence";
    const storagePath = `portal-clients/${params.uid}/billing-consent/${recordId}/${safeName}`;
    await storage.bucket().file(storagePath).save(validation.buffer, { resumable:false, contentType:validation.contentType, metadata:{cacheControl:"private, no-store",metadata:{uploadedBy:staff.uid}} });
    const evidenceUrl = `/api/portal/admin/clients/${params.uid}/billing-consent/document?recordId=${encodeURIComponent(recordId)}&file=${encodeURIComponent(safeName)}`;
    const consentText = `Client authorized later attorney-issued charges for ${categories.join(", ")} after written notice, up to $${maximum.toFixed(2)} per charge, appearing as ${STATEMENT_DESCRIPTOR}, with the right to revoke future authorization.`;
    await methodDoc.ref.set({ attorneyInitiatedChargesAuthorized:true, attorneyChargeMaximum:maximum, attorneyChargeCategories:categories, attorneyChargeConsentText:consentText, attorneyChargeConsentAt:FieldValue.serverTimestamp(), attorneyChargeConsentEffectiveDate:consentDate, attorneyChargeConsentSource:"recorded_call_or_written_consent", attorneyChargeConsentEvidenceUrl:evidenceUrl, attorneyChargeConsentRecordedBy:staff.uid }, { merge:true });
    const record = { type:"standing_payment_authorization", source:"recorded_call_or_written_consent", consentDate, consentText, maximum, categories, statementDescriptor:STATEMENT_DESCRIPTOR, billingMethodId:methodDoc.id, evidenceUrl, evidenceFileName:evidenceFile.name.slice(0,180), evidenceContentType:validation.contentType, lawfulRecordingAttestation:true, cardDataExcludedAttestation:true, attorneyNotes:String(form.get("notes")||"").slice(0,3000), createdBy:staff.uid, createdByName:staff.name, createdAt:FieldValue.serverTimestamp(), ...requestEvidence(request) };
    await Promise.all([clientRef.collection("agreements").doc(recordId).set(record),clientRef.collection("auditLog").add({event:"standing_payment_authorization_recorded",agreementId:recordId,...record})]);
    const client = clientSnapshot.data()||{};
    const notice={type:"message",title:"Billing preferences updated",message:"Your saved-card preferences were updated securely. Any new service or filing fee will be shown as a separate, itemized invoice in your portal.",caseId:String(form.get("caseId")||"").slice(0,160),read:false,createdAt:FieldValue.serverTimestamp(),createdBy:staff.uid,createdByName:staff.name};
    await clientRef.collection("activity").add(notice);
    try{await sendPortalActivityEmail({clientName:client.name,clientEmail:client.email,attorneyName:staff.name,...notice})}catch(error){console.error("Consent saved; client email failed:",error?.message)}
    return NextResponse.json({success:true,agreementId:recordId});
  } catch(error){console.error("Billing consent upload failed:",error?.message);return NextResponse.json({error:"Unable to save the consent evidence."},{status:500})}
}
