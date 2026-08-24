import LandingPage from "@/components/pages/LandingPage";

export const metadata = {
  title: "Optimized Landing Preview | Legal Trademark Office",
  description: "Private conversion-optimized copy of the trademark registration landing page.",
  robots: { index: false, follow: false },
};

export default function OptimizedLandingPreviewPage() {
  return <LandingPage optimizedCopy />;
}
