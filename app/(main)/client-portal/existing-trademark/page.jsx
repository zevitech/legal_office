import { redirect } from "next/navigation";
import ExistingTrademarkRequestForm from "@/components/portal/ExistingTrademarkRequestForm";
import { getPortalUser } from "@/lib/portalAuth";
import { portalDemoClients } from "@/lib/portalDemoClients";

export const dynamic="force-dynamic";
export default async function ExistingTrademarkPage({searchParams}){
  const previewKey=process.env.NODE_ENV!=="production"?searchParams?.preview:null;
  const demo=previewKey?(portalDemoClients[previewKey]||portalDemoClients.northstar):null;
  const user=demo?.user||await getPortalUser();if(!user)redirect("/portal-login");
  return <ExistingTrademarkRequestForm user={user} previewKey={demo?previewKey:""}/>;
}
