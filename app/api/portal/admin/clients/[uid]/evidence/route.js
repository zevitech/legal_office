import { NextResponse } from "next/server";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

function serialize(value) {
  if (value?.toDate) return value.toDate().toISOString();
  if (Array.isArray(value)) return value.map(serialize);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, serialize(item)]));
  return value;
}

function docs(snapshot) {
  return snapshot.docs.map((doc) => ({ id: doc.id, ...serialize(doc.data()) }));
}

export async function GET(request, { params }) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const staff = await getPortalUser();
  if (!staff || !["admin", "attorney"].includes(staff.role)) return NextResponse.json({ error: "Attorney access required." }, { status: 401 });
  const db = getAdminFirestore();
  if (!db) return NextResponse.json({ error: "Portal database is not configured." }, { status: 503 });
  const caseId = new URL(request.url).searchParams.get("caseId") || "";
  const clientRef = db.collection("portalClients").doc(params.uid);
  const [client, cases, agreements, invoices, activity, audits, documents, serviceRequests] = await Promise.all([
    clientRef.get(),
    clientRef.collection("cases").get(),
    clientRef.collection("agreements").get(),
    clientRef.collection("invoices").get(),
    clientRef.collection("activity").get(),
    clientRef.collection("auditLog").get(),
    clientRef.collection("documents").get(),
    clientRef.collection("serviceRequests").get(),
  ]);
  if (!client.exists) return NextResponse.json({ error: "Client not found." }, { status: 404 });
  const forCase = (items) => caseId ? items.filter((item) => !item.caseId || item.caseId === caseId || item.id === caseId) : items;
  const evidence = {
    exportType: "Legal Trademark Office service and payment evidence",
    generatedAt: new Date().toISOString(),
    generatedBy: { uid: staff.uid, name: staff.name, role: staff.role },
    merchant: { brand: "Legal Trademark Office", statementDescriptor: "XTARLABS LLC", gatewayPartner: "XtarLabs LLC", processor: "NMI" },
    notice: "This package is an internal business record assembled from portal and payment logs. It supports review of a payment dispute but does not guarantee a chargeback outcome.",
    client: { id: client.id, ...serialize(client.data()) },
    cases: forCase(docs(cases)),
    agreements: forCase(docs(agreements)),
    invoices: forCase(docs(invoices)),
    activity: forCase(docs(activity)),
    auditLog: forCase(docs(audits)),
    documents: forCase(docs(documents)).map(({ storagePath, ...item }) => item),
    serviceRequests: forCase(docs(serviceRequests)),
  };
  const filename = `LTO-evidence-${caseId || params.uid}-${new Date().toISOString().slice(0, 10)}.json`;
  if (new URL(request.url).searchParams.get("view") === "1") return NextResponse.json(evidence, { headers: { "Cache-Control": "no-store" } });
  return new NextResponse(JSON.stringify(evidence, null, 2), { headers: { "Content-Type": "application/json; charset=utf-8", "Content-Disposition": `attachment; filename="${filename}"`, "Cache-Control": "no-store" } });
}
