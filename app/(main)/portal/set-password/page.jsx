import { Suspense } from "react";
import PortalAuthShell from "@/components/portal/PortalAuthShell";
import PasswordActionForm from "@/components/portal/PasswordActionForm";
export const metadata = { title: "Create Portal Password | Legal Trademark Office", robots: { index: false, follow: false } };
export default function SetPasswordPage() { return <PortalAuthShell eyebrow="Secure account setup" title="Create your private password" description="This password protects your trademark records, documents and communication." footer="Your setup link works once. If it expires, request a new secure link from the login page."><Suspense fallback={<div className="text-sm text-slate-500">Preparing secure setup…</div>}><PasswordActionForm mode="setup" /></Suspense></PortalAuthShell>; }

