import PortalAuthShell from "@/components/portal/PortalAuthShell";
import PasswordActionForm from "@/components/portal/PasswordActionForm";
export const metadata = { title: "Reset Portal Password | Legal Trademark Office", robots: { index: false, follow: false } };
export default function ForgotPasswordPage() { return <PortalAuthShell eyebrow="Account recovery" title="Reset your password" description="Enter your portal email. For privacy, we always show the same confirmation whether or not an account exists." footer={<a href="/portal-login" className="font-bold text-[#027dd6]">Return to secure login</a>}><PasswordActionForm mode="forgot" /></PortalAuthShell>; }

