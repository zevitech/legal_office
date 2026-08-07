export const metadata = {
  title: "Compliance Terms",
  robots: { index: false, follow: false },
};

import { redirect } from "next/navigation";

export default function CompliancePage() {
  redirect("/legal/terms");
}
