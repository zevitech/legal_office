import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { sendPortalActivityEmail } from "@/lib/portalEmail";
import { requestEvidence } from "@/lib/paymentEvidence";

const allowedActions = new Set(["status", "task", "requirement", "document", "message", "promotion", "email", "payment", "appointment", "filing", "clearance_report", "registration_certificate"]);
const postFilingProgress = { "USPTO examination":78, "Office action issued":78, "Publication period":88 };

const sameClasses = (left = [], right = []) => left.length === right.length && left.every((item, index) => String(item).trim() === String(right[index]).trim());

export async function POST(request, { params }) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const staff = await getPortalUser();
  if (!staff || !["admin", "attorney"].includes(staff.role)) return NextResponse.json({ error: "Attorney access required." }, { status: 401 });
  const db = getAdminFirestore();
  if (!db) return NextResponse.json({ error: "Portal database is not configured." }, { status: 503 });
  try {
    const body = await request.json();
    const type = String(body.type || "");
    const recordAsPaid = type === "payment" && body.recordAsPaid === true;
    if (!allowedActions.has(type)) return NextResponse.json({ error: "Unsupported case action." }, { status: 400 });
    const clientRef = db.collection("portalClients").doc(params.uid);
    const clientSnapshot = await clientRef.get();
    if (!clientSnapshot.exists) return NextResponse.json({ error: "Client portal account not found." }, { status: 404 });
    const caseId = String(body.caseId || "").slice(0, 160);
    const caseRef = caseId ? clientRef.collection("cases").doc(caseId) : null;
    const caseSnapshot = caseRef ? await caseRef.get() : null;
    const caseData = caseSnapshot?.data() || {};
    if (["appointment", "clearance_report", "filing", "registration_certificate"].includes(type) && !caseSnapshot?.exists) return NextResponse.json({ error: "An existing trademark case is required for this workflow action." }, { status: 400 });

    const selectedClasses = (Array.isArray(body.selectedClasses) ? body.selectedClasses : String(body.selectedClasses || "").split("\n")).map((item) => String(item).trim().slice(0, 240)).filter(Boolean).slice(0, 25);
    const classificationFees = (Array.isArray(body.classificationFees) ? body.classificationFees : []).slice(0, 25).map((item) => ({ description: String(item?.description || "").trim().slice(0, 240), amount: Math.round(Number(item?.amount || 0) * 100) / 100 }));
    const paymentKind = String(body.paymentKind || "").slice(0, 80);
    const reportClasses = (Array.isArray(caseData.selectedClasses) ? caseData.selectedClasses : []).map((item) => String(item).trim()).filter(Boolean);
    const itemizedTotal = classificationFees.reduce((sum, item) => sum + item.amount, 0);
    const actionClasses = paymentKind === "classification_fees" ? reportClasses : selectedClasses;
    const defaultTitle = type === "filing" ? "Congratulations — your trademark application was filed" : "";
    const defaultMessage = type === "filing" ? "Congratulations! Your application has been filed with the USPTO. Your serial number and official filing receipt are now available. You may use the ™ symbol with your trademark name; use ® only after registration." : "";
    const action = {
      caseId, type, title:String(body.title || defaultTitle).slice(0, 160), message:String(body.message || defaultMessage).slice(0, 4000),
      amount:paymentKind === "classification_fees" ? Math.round(itemizedTotal * 100) / 100 : Number(body.amount || 0),
      status:String(body.status || ""), taskStatus:["task", "requirement", "document", "payment"].includes(type) ? (recordAsPaid ? "completed" : "open") : null,
      paymentStatus:type === "payment" ? (recordAsPaid ? "paid" : "due") : null, paymentKind,
      paymentMethod:recordAsPaid ? String(body.paymentMethod || "verified_external_payment").trim().slice(0, 100) : "",
      externalReference:recordAsPaid ? String(body.externalReference || "").trim().slice(0, 180) : "",
      receivedAt:recordAsPaid ? String(body.receivedAt || "").trim().slice(0, 40) : "",
      paidBy:recordAsPaid ? "attorney_confirmed" : "",
      classificationFees:paymentKind === "classification_fees" ? classificationFees : [], selectedClasses:actionClasses,
      classCount:paymentKind === "classification_fees" ? reportClasses.length : selectedClasses.length,
      requirementType:String(body.requirementType || ""), dueAt:body.dueAt || null, appointmentAt:body.appointmentAt || null,
      appointmentStatus:type === "appointment" ? "scheduled" : null, meetingType:body.meetingType === "phone" ? "phone" : "google_meet",
      meetingUrl:String(body.meetingUrl || "").slice(0, 500), phoneNumber:String(body.phoneNumber || "").slice(0, 40),
      serialNumber:String(body.serialNumber || "").replace(/\D/g, "").slice(0, 8), registrationNumber:String(body.registrationNumber || "").replace(/\D/g, "").slice(0, 12),
      registrationDate:body.registrationDate || null, filingDate:body.filingDate || null, documentUrl:String(body.documentUrl || "").slice(0, 1000),
      createdBy:staff.uid, createdByName:staff.name, createdAt:FieldValue.serverTimestamp(), read:false,
    };

    if (["task", "requirement", "document"].includes(type) && caseData.classificationPaymentStatus !== "paid") return NextResponse.json({ error:"Client tasks and document requirements cannot be sent before the exact classification fees are paid." }, { status:409 });
    if (type === "promotion" && caseData.classificationPaymentStatus !== "paid") return NextResponse.json({ error:"Client recommendations cannot be sent before the exact classification fees are paid." }, { status:409 });

    if (type === "appointment" && (!action.appointmentAt || (action.meetingType === "google_meet" && !/^https:\/\/meet\.google\.com\//i.test(action.meetingUrl)) || (action.meetingType === "phone" && action.phoneNumber.replace(/\D/g, "").length < 10))) return NextResponse.json({ error:"Valid appointment contact details are required." }, { status:400 });
    if (type === "clearance_report") {
      if (!action.documentUrl.startsWith("/api/portal/documents/report/") || !selectedClasses.length) return NextResponse.json({ error:"Upload the clearance report and add at least one proposed class." }, { status:400 });
      action.selectedClasses = selectedClasses;
      action.classCount = selectedClasses.length;
    }
    if (type === "payment" && paymentKind === "classification_fees") {
      if (!caseSnapshot?.exists || (caseData.clearanceReportStatus !== "ready" && !caseData.clearanceReportUrl) || !reportClasses.length) return NextResponse.json({ error:"Share the attorney-prepared clearance report and its exact classes before requesting class fees." }, { status:409 });
      if (!classificationFees.length || classificationFees.some((item) => !item.description || !(item.amount > 0) || item.amount > 25000) || action.amount > 100000) return NextResponse.json({ error:"Every report class needs a valid individual fee." }, { status:400 });
      if (!sameClasses(classificationFees.map((item) => item.description), reportClasses)) return NextResponse.json({ error:"The invoice classes must exactly match every class in the clearance report." }, { status:409 });
    }
    if (type === "payment" && (!(action.amount > 0) || action.amount > 100000 || !action.title)) return NextResponse.json({ error:"A valid payment description and amount are required." }, { status:400 });
    if (recordAsPaid && (!action.externalReference || !action.receivedAt)) return NextResponse.json({ error:"A payment date and verification reference are required before recording an external payment." }, { status:400 });
    if (type === "filing") {
      if (caseData.classificationPaymentStatus !== "paid") return NextResponse.json({ error:"The exact class fees must be paid or marked paid before recording the USPTO filing." }, { status:409 });
      if (!/^\d{8}$/.test(action.serialNumber) || !action.filingDate || !action.documentUrl.startsWith("/api/portal/documents/filing/")) return NextResponse.json({ error:"Valid filing details and an uploaded USPTO PDF are required." }, { status:400 });
    }
    if (type === "status") {
      if (!caseSnapshot?.exists || (!caseData.serialNumber && caseData.status !== "filed")) return NextResponse.json({ error:"Record the official USPTO filing before sending post-filing status updates." }, { status:409 });
      if (!postFilingProgress[action.status]) return NextResponse.json({ error:"Only post-filing USPTO examination, office-action, and publication updates are supported here." }, { status:400 });
      if (action.status === "Office action issued" && !/^\d{4}-\d{2}-\d{2}$/.test(String(action.dueAt || ""))) return NextResponse.json({ error:"Enter the exact USPTO response deadline shown on the office action before notifying the client." }, { status:400 });
      if (action.status === "Publication period" && !["USPTO examination", "Office action issued", "Publication period"].includes(caseData.currentStage)) return NextResponse.json({ error:"Record the USPTO examination stage before publication." }, { status:409 });
    }
    if (type === "registration_certificate") {
      if (!["USPTO examination", "Office action issued", "Publication period"].includes(caseData.currentStage)) return NextResponse.json({ error:"A post-filing USPTO stage is required before registration can be recorded." }, { status:409 });
      if (!action.documentUrl.startsWith("/api/portal/documents/certificate/") || !action.registrationNumber || !action.registrationDate) return NextResponse.json({ error:"Registration number, date, and the official USPTO certificate are required." }, { status:400 });
    }

    let invoiceRef = null;
    if (type === "payment") { invoiceRef = clientRef.collection("invoices").doc(); action.invoiceId = invoiceRef.id; }
    const activityDocument = await clientRef.collection("activity").add(action);
    if (["task", "requirement", "document"].includes(type)) await clientRef.collection("tasks").add({ caseId, activityId:activityDocument.id, title:action.title, description:action.message, requirementType:action.requirementType, type, status:"open", dueAt:action.dueAt, createdAt:FieldValue.serverTimestamp() });
    if (type === "message" || type === "email") await clientRef.collection("messages").add({ sender:staff.name, body:action.message, read:false, createdAt:FieldValue.serverTimestamp() });
    if (type === "appointment") { await clientRef.collection("appointments").add({ caseId, activityId:activityDocument.id, title:action.title || "Mandatory attorney consultation", startsAt:action.appointmentAt, meetingType:action.meetingType, meetingUrl:action.meetingUrl, phoneNumber:action.phoneNumber, status:"scheduled", createdBy:staff.uid, createdAt:FieldValue.serverTimestamp() }); await caseRef.set({consultationStatus:"scheduled",currentStage:"Mandatory attorney consultation scheduled",progress:25,updatedAt:FieldValue.serverTimestamp()},{merge:true}); }
    if (type === "clearance_report") { await caseRef.set({ consultationStatus:"completed", consultationCompletedAt:FieldValue.serverTimestamp(), clearanceReportUrl:action.documentUrl, clearanceReportStatus:"ready", selectedClasses:action.selectedClasses, classCount:action.selectedClasses.length, currentStage:"Clearance report ready — class fees pending", progress:44, updatedAt:FieldValue.serverTimestamp() }, { merge:true }); const appointmentActivity=await clientRef.collection("activity").where("type","==","appointment").limit(20).get(); await Promise.all(appointmentActivity.docs.filter(doc=>doc.data()?.caseId===caseId&&doc.data()?.appointmentStatus!=="cancelled").map(doc=>doc.ref.set({appointmentStatus:"completed",completedAt:FieldValue.serverTimestamp(),updatedAt:FieldValue.serverTimestamp()},{merge:true}))); const appointments=await clientRef.collection("appointments").where("caseId","==",caseId).limit(20).get(); await Promise.all(appointments.docs.filter(doc=>doc.data()?.status!=="cancelled").map(doc=>doc.ref.set({status:"completed",completedAt:FieldValue.serverTimestamp(),updatedAt:FieldValue.serverTimestamp()},{merge:true}))); }
    if (type === "payment") {
      await invoiceRef.set({ caseId, activityId:activityDocument.id, title:action.title || "Payment request", amount:action.amount, currency:"USD", status:recordAsPaid?"paid":"due", paymentStatus:recordAsPaid?"paid":"due", paymentKind:action.paymentKind, paymentMethod:action.paymentMethod, externalReference:action.externalReference, receivedAt:action.receivedAt, markedPaidBy:recordAsPaid?staff.uid:"", paidAt:recordAsPaid?FieldValue.serverTimestamp():null, classificationFees:action.classificationFees, selectedClasses:action.selectedClasses, classCount:action.classCount, dueAt:action.dueAt, createdAt:FieldValue.serverTimestamp() });
      if (caseRef && paymentKind === "classification_fees") await caseRef.set(recordAsPaid?{ classificationPaymentStatus:"paid", currentStage:"USPTO filing fees paid — preparing submission", progress:58, updatedAt:FieldValue.serverTimestamp() }:{ classificationPaymentStatus:"due", currentStage:"Classes confirmed — USPTO filing fees due", progress:48, updatedAt:FieldValue.serverTimestamp() }, { merge:true });
    }
    if (type === "filing") await caseRef.set({ currentStage:"Filed with USPTO", status:"filed", progress:65, serialNumber:action.serialNumber, filingDate:action.filingDate, filingDocumentUrl:action.documentUrl, updatedAt:FieldValue.serverTimestamp() }, { merge:true });
    if (type === "status") { await caseRef.set({ currentStage:action.status, progress:postFilingProgress[action.status], officeActionResponseDeadline:action.status==="Office action issued"?action.dueAt:null, updatedAt:FieldValue.serverTimestamp() }, { merge:true }); if(action.status==="Office action issued"){const deadlineText=`The response deadline shown on the USPTO notice is ${action.dueAt}.`;await clientRef.collection("activity").add({type:"appointment_request",title:"Attorney call required for USPTO office action",message:`Please arrange a call with your attorney to review the USPTO office action. ${deadlineText} Your attorney will explain the issues, available response options, and any fee before response work begins.`,dueAt:action.dueAt,caseId,createdBy:staff.uid,createdByName:staff.name,read:false,createdAt:FieldValue.serverTimestamp()});action.message=`${action.message ? `${action.message}\n\n` : ""}${deadlineText} A call with your attorney is required before the response plan is finalized. Open your portal to arrange the consultation.`}}
    if (type === "registration_certificate") await caseRef.set({ registrationNumber:action.registrationNumber, registrationDate:action.registrationDate, registrationCertificateUrl:action.documentUrl, currentStage:"Registered", status:"registered", progress:100, updatedAt:FieldValue.serverTimestamp() }, { merge:true });

    await clientRef.collection("auditLog").add({ event:recordAsPaid?"payment_recorded_received_by_attorney":"attorney_case_action", activityId:activityDocument.id, invoiceId:invoiceRef?.id||"", caseId, actionType:type, title:action.title, amount:action.amount, paymentMethod:action.paymentMethod, externalReference:action.externalReference, receivedAt:action.receivedAt, status:action.status, documentUrl:action.documentUrl, performedBy:staff.uid, performedByName:staff.name, performedByRole:staff.role, createdAt:FieldValue.serverTimestamp(), ...requestEvidence(request) });
    const clientData = clientSnapshot.data() || {};
    try { await sendPortalActivityEmail({ clientName:clientData.name, clientEmail:clientData.email, attorneyName:staff.name, ...action, type:recordAsPaid?"payment_receipt":action.type, title:recordAsPaid?`Receipt — ${action.title}`:action.title, message:recordAsPaid?`Your attorney confirmed receipt of $${Number(action.amount).toFixed(2)}. No further payment action is required for this invoice.`:action.message }); }
    catch (emailError) { console.error("Portal update saved; email delivery failed:", emailError?.message); }
    return NextResponse.json({ success:true, emailQueued:true, activityId:activityDocument.id, invoiceId:invoiceRef?.id || null });
  } catch { return NextResponse.json({ error:"Unable to save the case action." }, { status:500 }); }
}
