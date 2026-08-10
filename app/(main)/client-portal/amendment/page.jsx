import { redirect } from "next/navigation";
import AmendmentRequestForm from "@/components/portal/AmendmentRequestForm";
import { getPortalUser } from "@/lib/portalAuth";
import { portalDemoClients } from "@/lib/portalDemoClients";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { serializePortalDoc } from "@/lib/portalData";

export const dynamic="force-dynamic";
export default async function AmendmentPage({searchParams}){const previewKey=process.env.NODE_ENV!=="production"?searchParams?.preview:null;const demo=previewKey?(portalDemoClients[previewKey]||portalDemoClients.northstar):null;const user=demo?.user||await getPortalUser();if(!user)redirect("/portal-login");let clientCase=demo?.case;if(!demo){const db=getAdminFirestore();const cases=await db.collection("portalClients").doc(user.uid).collection("cases").orderBy("createdAt","desc").limit(1).get();const doc=cases.docs[0];if(!doc)redirect("/client-portal");clientCase=serializePortalDoc(doc)}return <AmendmentRequestForm clientCase={clientCase} previewKey={demo?previewKey:""}/>}
