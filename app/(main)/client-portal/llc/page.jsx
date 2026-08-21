import { redirect } from "next/navigation";
import PortalServiceFunnel from "@/components/portal/PortalServiceFunnel";
import { getPortalUser } from "@/lib/portalAuth";
import { portalDemoClients } from "@/lib/portalDemoClients";
import { getClientPortalData } from "@/lib/portalData";

export const dynamic = "force-dynamic";
export default async function LlcPage({ searchParams }) {
  const previewKey =
    process.env.NODE_ENV !== "production" ? searchParams?.preview : null;
  const demo = previewKey
    ? portalDemoClients[previewKey] || portalDemoClients.northstar
    : null;
  const user = demo?.user || (await getPortalUser());
  if (!user) redirect("/portal-login");
  if (!demo && user.role !== "client") redirect("/portal-admin");
  const data = demo ? null : await getClientPortalData(user.uid);
  const clientCase = demo?.case || data?.cases?.[0] || null;
  return (
    <PortalServiceFunnel
      mode="llc"
      user={user}
      clientCase={clientCase}
      preview={Boolean(demo)}
      previewKey={previewKey}
    />
  );
}
