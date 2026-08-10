import { redirect } from "next/navigation";
import PortalAuthShell from "@/components/portal/PortalAuthShell";
import PortalLoginForm from "@/components/portal/PortalLoginForm";
import { getPortalUser } from "@/lib/portalAuth";

export const metadata = { title: "Attorney Portal Login | Legal Trademark Office", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AttorneyPortalLoginPage() {
  const user = await getPortalUser();
  if (user && ["admin", "attorney"].includes(user.role)) redirect("/portal-admin");
  if (user?.role === "client") redirect("/client-portal");

  return (
    <PortalAuthShell
      eyebrow="Authorized staff"
      title="Sign in to the attorney portal"
      description="Access assigned matters, client requirements, payments, documents and case operations."
      footer={<>Client access? <a className="font-bold text-[#027dd6]" href="/portal-login">Open the client portal</a></>}
    >
      <PortalLoginForm audience="staff" />
    </PortalAuthShell>
  );
}
