import React from "react";
import LandingPage from "@/components/pages/LandingPage";

export const metadata = {
  title: "Trademark Registration Filing Support | Legal Trademark Office",
  description:
    "Prepare and submit your U.S. trademark application with guided filing support, transparent service plans, and a secure customer account.",
  alternates: {
    canonical: "https://www.legaltrademarkoffice.com/trademark-registration",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.legaltrademarkoffice.com/trademark-registration/#service",
  name: "Trademark Registration Filing Support",
  url: "https://www.legaltrademarkoffice.com/trademark-registration",
  serviceType: "Trademark application preparation and filing support",
  areaServed: { "@type": "Country", name: "United States" },
  provider: { "@id": "https://www.legaltrademarkoffice.com/#organization" },
};

const page = () => {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/legal-trademark-office-hero-background.jpg"
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        <LandingPage />
      </main>
    </>
  );
};

export default page;
