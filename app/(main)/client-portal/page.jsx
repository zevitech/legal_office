import ClientPortalDashboard from "@/components/portal/ClientPortalDashboard";
import { redirect } from "next/navigation";
import { getPortalUser } from "@/lib/portalAuth";
import { portalDemoClients } from "@/lib/portalDemoClients";
import { freshDemoFromPreviewKey } from "@/lib/portalFreshDemo";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { serializePortalDoc } from "@/lib/portalData";

export const metadata = {
  title: "Client Portal | Legal Trademark Office",
  description: "Track trademark applications, documents, appointments and services.",
};

export const dynamic = "force-dynamic";

export default async function ClientPortalPage({ searchParams }) {
  const previewKey = process.env.NODE_ENV !== "production" ? searchParams?.preview : null;
  const demo = previewKey ? portalDemoClients[previewKey] || freshDemoFromPreviewKey(previewKey) || portalDemoClients.northstar : null;
  const user = demo?.user || await getPortalUser();
  if (!user) redirect("/portal-login");
  if (!demo && user.role !== "client") redirect("/portal-admin");
  let clientCase = demo?.case;
  let initialCases = demo?.case ? [demo.case] : [];
  let initialUpdates = [];
  if (!demo) {
    const db = getAdminFirestore();
    if (db) {
      const clientRef = db.collection("portalClients").doc(user.uid);
      const [clientSnapshot, activitySnapshot, casesSnapshot] = await Promise.all([clientRef.get(), clientRef.collection("activity").orderBy("createdAt", "desc").limit(50).get(), clientRef.collection("cases").orderBy("createdAt", "desc").get()]);
      const data = clientSnapshot.data() || {};
      initialCases = casesSnapshot.docs.map((doc)=>{const item=serializePortalDoc(doc);return{...item,markName:item.markName||"Trademark application",company:item.owner||data.company||user.name,markType:item.markType||"Trademark",stage:item.currentStage||item.status||"Application received",progress:Number(item.progress||12),packageName:item.packageName||"Service",orderTotal:Number(item.orderTotal||0),serialNumber:item.serialNumber||null};});
      clientCase = initialCases[0] || { id: data.caseId || "Pending", markName: data.markName || "Trademark application", company: data.company || user.name, markType: data.markType || "Trademark", stage: data.currentStage || "Application received", progress: Number(data.progress || 12), packageName: data.packageName || "Service", orderTotal: Number(data.orderTotal || 0), openTasks: Number(data.openTasks || 0), appointment: data.appointment || "To be scheduled", appointmentTime: data.appointmentTime || "" };
      initialUpdates = activitySnapshot.docs.map((doc) => { const item = serializePortalDoc(doc); return { ...item, createdAt: item.createdAt || null }; });
    }
  }
  return <ClientPortalDashboard user={user} clientCase={clientCase} initialCases={initialCases} demoKey={demo ? previewKey : null} initialUpdates={initialUpdates} />;
}
