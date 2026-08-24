import LandingPage from "@/components/pages/LandingPage";

export const metadata = {
  title: "Current Landing Page Preview | Legal Trademark Office",
  description: "Private preview of the current trademark registration landing page.",
  robots: { index: false, follow: false },
};

export default function LegacyLandingPreviewPage() {
  return <LandingPage />;
}
