import { redirect } from "next/navigation";
import PortalAuthShell from "@/components/portal/PortalAuthShell";
import PortalLoginForm from "@/components/portal/PortalLoginForm";
import { getPortalUser } from "@/lib/portalAuth";

export const metadata = { title: "Client Portal Login | Legal Trademark Office", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PortalLoginPage() {
  const user = await getPortalUser();
  if (user) redirect(["admin", "attorney"].includes(user.role) ? "/portal-admin" : "/client-portal");
  return <PortalAuthShell eyebrow="Welcome back" title="Sign in to your client portal" description="Use the email address connected to your Legal Trademark Office application." footer={<>Need access? Call <a className="font-bold text-[#027dd6]" href="tel:+13104244909">+1 (310) 424-4909</a></>}><PortalLoginForm /></PortalAuthShell>;
}
