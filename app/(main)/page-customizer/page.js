import PageCustomizer from "@/components/pages/PageCustomizer";

export const metadata = {
  title: "Private Page Customizer | Legal Trademark Office",
  description: "Private landing page and application form configuration workspace.",
  robots: { index: false, follow: false },
};

export default function PageCustomizerPage() {
  return <PageCustomizer />;
}
