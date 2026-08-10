import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

export const previewPortalData = {
  client: { uid: "preview-client", name: "Alex North", email: "alex@example.com", company: "Northstar Studio LLC", phone: "+1 (310) 555-0147", status: "active" },
  cases: [{ id: "LTO-2026-08147", markName: "Northstar Studio", markType: "Word mark", status: "attorney_review", progress: 38, owner: "Northstar Studio LLC", packageName: "Premium", orderTotal: 649, serialNumber: null, nextDeadline: "2026-08-10" }],
  tasks: [{ id: "specimen", title: "Upload a specimen example", description: "Website screenshot, packaging, label or invoice showing the mark.", status: "open", priority: "recommended", dueAt: "2026-08-10" }, { id: "activities", title: "Confirm business activities", description: "Review the products and services selected for your application.", status: "open", priority: "required", dueAt: "2026-08-10" }],
  appointments: [{ id: "mandatory-trademark-call", title: "Mandatory trademark consultation", startsAt: "2026-08-10T11:30:00-07:00", duration: 30, type: "video", status: "scheduled" }],
  invoices: [{ id: "LTO-2026-08147", title: "Premium trademark package", amount: 649, currency: "USD", status: "paid", paidAt: "2026-08-07T12:00:00-07:00" }],
  messages: [{ id: "welcome", sender: "Legal Trademark Office", body: "Welcome to your secure portal. Your legal team will post case updates here.", createdAt: "2026-08-07T12:05:00-07:00", read: true }],
};

function cleanApplicationDetails(input = {}) {
  const text = (value, max = 500) => String(value || "").trim().slice(0, max);
  const list = (value) => (Array.isArray(value) ? value : []).map((item) => text(item, 180)).filter(Boolean).slice(0, 40);
  return {
    protectionTypes: list(input.protectionTypes), slogan: text(input.slogan, 180), logoColors: text(input.logoColors),
    logoProtectionDescription: text(input.logoProtectionDescription, 1200), soundDescription: text(input.soundDescription, 1200), soundFileName: text(input.soundFileName, 180),
    trademarkCurrentlyBeingUsed: text(input.trademarkCurrentlyBeingUsed, 80), firstAnywhereDate: text(input.firstAnywhereDate, 40), firstCommenceDate: text(input.firstCommenceDate, 40),
    ownerType: text(input.ownerType, 100), organizationType: text(input.organizationType, 120), stateFormation: text(input.stateFormation, 100), countryFormation: text(input.countryFormation, 100), organizationPosition: text(input.organizationPosition, 100),
    selectedActivities: list(input.selectedActivities), trademarkClassification: text(input.trademarkClassification, 1000), estimatedClassCount: Math.max(0, Math.min(50, Number(input.estimatedClassCount || 0))), reviewPreference: text(input.reviewPreference, 180),
  };
}

export async function createPortalClient({ uid, name, email, company = "", phone = "", markName = "", markType = "Word mark", packageName = "", trademarks = [], transactionId = "", orderTotal = 0, source = "manual", applicationDetails = {}, billingProfile = {} }) {
  const db = getAdminFirestore();
  if (!db) throw new Error("Firestore is not configured");
  const clientRef = db.collection("portalClients").doc(uid);
  const existingClient = await clientRef.get();
  const billingText=(value,max=180)=>String(value||"").trim().slice(0,max);
  const savedBillingProfile={name:billingText(billingProfile.name||name),email:billingText(email),phone:billingText(billingProfile.phone||phone,40),address1:billingText(billingProfile.address1),address2:billingText(billingProfile.address2),city:billingText(billingProfile.city,100),state:billingText(billingProfile.state,100),zip:billingText(billingProfile.zip,20),country:billingText(billingProfile.country||"United States",100)};
  const hasBillingInput=Object.values(billingProfile||{}).some((value)=>String(value||"").trim());
  const clientUpdate={uid,name,email,company,phone,status:existingClient.exists?(existingClient.data()?.status||"active"):"invited",source,updatedAt:FieldValue.serverTimestamp(),...(!existingClient.exists?{createdAt:FieldValue.serverTimestamp()}:{}),...(!existingClient.exists||hasBillingInput?{billingProfile:savedBillingProfile}:{})};
  await clientRef.set(clientUpdate, { merge: true });
  const caseIds = [];
  if (markName) {
    const caseId = transactionId || `LTO-${Date.now()}`;
    caseIds.push(caseId);
    await clientRef.collection("cases").doc(caseId).set({ markName, markType, owner: company || name, packageName, transactionId, orderTotal: Number(orderTotal || 0), applicationDetails: cleanApplicationDetails(applicationDetails), status: "application_received", progress: 12, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    if (transactionId) await clientRef.collection("invoices").doc(transactionId).set({ title: `${packageName || "Trademark"} service package`, amount: Number(orderTotal || 0), currency: "USD", status: "paid", transactionId, paidAt: FieldValue.serverTimestamp(), createdAt: FieldValue.serverTimestamp() }, { merge: true });
  }
  for (const [index,mark] of trademarks.entries()) {
    const caseId=`LTO-${Date.now()}-${index+1}`;
    caseIds.push(caseId);
    await clientRef.collection("cases").doc(caseId).set({ markName:mark.markName, markType:mark.markType||"Word mark", owner:company||name, packageName:mark.packageName||"", status:"application_received", progress:12, createdAt:FieldValue.serverTimestamp(), updatedAt:FieldValue.serverTimestamp() });
  }
  return { clientRef, caseIds, isNewPortalClient: !existingClient.exists };
}

// Firestore returns Timestamp class instances. Server Components may only hand
// plain values to Client Components, so every timestamp becomes an ISO string.
export function serializePortalDoc(doc) {
  return serialize(doc);
}

function serialize(doc) {
  const data = doc.data();
  return { id: doc.id, ...Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value?.toDate ? value.toDate().toISOString() : value])) };
}

export async function getClientPortalData(uid) {
  const db = getAdminFirestore();
  if (!db) return null;
  const clientRef = db.collection("portalClients").doc(uid);
  const [client, cases, tasks, appointments, invoices, messages] = await Promise.all([
    clientRef.get(),
    clientRef.collection("cases").orderBy("createdAt", "desc").get(),
    clientRef.collection("tasks").orderBy("createdAt", "desc").get(),
    clientRef.collection("appointments").orderBy("startsAt", "asc").get(),
    clientRef.collection("invoices").orderBy("createdAt", "desc").get(),
    clientRef.collection("messages").orderBy("createdAt", "desc").limit(50).get(),
  ]);
  if (!client.exists) return null;
  return { client: serialize(client), cases: cases.docs.map(serialize), tasks: tasks.docs.map(serialize), appointments: appointments.docs.map(serialize), invoices: invoices.docs.map(serialize), messages: messages.docs.map(serialize) };
}

export async function listPortalClients() {
  const db = getAdminFirestore();
  if (!db) return [];
  const snapshot = await db.collection("portalClients").orderBy("createdAt", "desc").limit(100).get();
  return snapshot.docs.map(serialize);
}

export async function listPortalCaseRows() {
  const db = getAdminFirestore();
  if (!db) return [];
  const [clientsSnapshot, casesSnapshot, tasksSnapshot, appointmentsSnapshot] = await Promise.all([
    db.collection("portalClients").orderBy("createdAt", "desc").limit(500).get(),
    db.collectionGroup("cases").limit(2500).get(),
    db.collectionGroup("tasks").limit(5000).get(),
    db.collectionGroup("appointments").limit(2500).get(),
  ]);
  const activeClientIds = new Set(clientsSnapshot.docs.map((doc) => doc.id));
  const groupByClient = (snapshot) => snapshot.docs.reduce((map, doc) => {
    const clientId = doc.ref.parent.parent?.id;
    if (!clientId || !activeClientIds.has(clientId)) return map;
    const items = map.get(clientId) || [];
    items.push(serialize(doc));
    map.set(clientId, items);
    return map;
  }, new Map());
  const casesByClient = groupByClient(casesSnapshot);
  const tasksByClient = groupByClient(tasksSnapshot);
  const appointmentsByClient = groupByClient(appointmentsSnapshot);

  const rows = clientsSnapshot.docs.map((clientDoc) => {
    const client = serialize(clientDoc);
    const cases = (casesByClient.get(clientDoc.id) || []).sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
    const tasks = tasksByClient.get(clientDoc.id) || [];
    const appointments = appointmentsByClient.get(clientDoc.id) || [];
    const matters = cases.length ? cases : [{ id: client.caseId || "Pending", markName: client.markName || "Trademark application", markType: client.markType || "Trademark", status: client.currentStage || "Application received" }];
    return matters.map((matter) => {
      const matchingTasks = tasks.filter((task) => !task.caseId || task.caseId === matter.id);
      const matchingAppointments = appointments.filter((appointment) => !appointment.caseId || appointment.caseId === matter.id);
      const openTaskCount = matchingTasks.filter((task) => task.status !== "completed").length;
      return {
        key: `${client.id}-${matter.id}`,
        uid: client.id,
        name: client.name || "Client",
        company: client.company || matter.owner || "",
        email: client.email || "",
        caseId: matter.id,
        mark: matter.markName || "Trademark application",
        markType: matter.markType || "Trademark",
        stage: matter.currentStage || matter.status || client.currentStage || "Application received",
        task: `${openTaskCount} open task${openTaskCount === 1 ? "" : "s"}`,
        openTaskCount,
        scheduledCallCount: matchingAppointments.filter((appointment) => appointment.status !== "cancelled").length,
        ...matter,
        mark: matter.markName || "Trademark application",
      };
    });
  });
  return rows.flat();
}
