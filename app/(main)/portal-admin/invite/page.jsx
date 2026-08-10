import PortalAuthShell from "@/components/portal/PortalAuthShell";
import PortalInviteForm from "@/components/portal/PortalInviteForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getPortalUser } from "@/lib/portalAuth";

export const metadata = { title: "Invite Client | Legal Trademark Office", robots: { index: false, follow: false } };

export const dynamic = "force-dynamic";

export default async function InviteClientPage({ searchParams }) {
  const demoMode = process.env.NODE_ENV !== "production" && searchParams?.preview === "1";
  const deliveryConfigured = Boolean(process.env.FIREBASE_ADMIN_PROJECT_ID && process.env.FIREBASE_ADMIN_CLIENT_EMAIL && process.env.FIREBASE_ADMIN_PRIVATE_KEY && (process.env.SUPPORT_EMAIL || process.env.MAILER_EMAIL) && (process.env.SUPPORT_EMAIL_PASSWORD || process.env.MAILER_PASSWORD));
  const staff = demoMode ? { role: "admin" } : await getPortalUser();
  if (!staff) redirect("/portal-admin/login");
  if (!["admin", "attorney"].includes(staff.role)) redirect("/client-portal");
  return <PortalAuthShell wide eyebrow="Staff tool" title="Create a client portal account" description="Enter the client and trademark details. The system creates their account, case record and a branded single-use password setup email." footer="Only authenticated staff administrators can access this page."><div className="mb-5"><Link href={demoMode?"/portal-admin?preview=1":"/portal-admin"} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-extrabold text-[#006fbd] transition hover:border-blue-300 hover:bg-blue-100">← Back to attorney dashboard</Link></div><PortalInviteForm demoMode={demoMode} deliveryConfigured={deliveryConfigured} /></PortalAuthShell>;
}
