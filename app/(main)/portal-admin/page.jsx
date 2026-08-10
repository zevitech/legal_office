import { redirect } from "next/navigation";
import PortalAdminDashboard from "@/components/portal/PortalAdminDashboard";
import { getPortalUser } from "@/lib/portalAuth";
import { listPortalCaseRows } from "@/lib/portalData";

export const metadata = { title: "Staff Portal | Legal Trademark Office", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PortalAdminPage({ searchParams }) {
  const preview = process.env.NODE_ENV !== "production" && searchParams?.preview === "1";
  const staff = preview ? { name: "Danish Khan", role: "admin" } : await getPortalUser();
  if (!staff) redirect("/portal-admin/login");
  if (!["admin", "attorney"].includes(staff.role)) redirect("/client-portal");
  const initialClients = preview ? [] : await listPortalCaseRows();
  return <PortalAdminDashboard staff={staff} preview={preview} initialClients={initialClients} />;
}
