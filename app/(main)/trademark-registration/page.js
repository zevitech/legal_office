import React from "react";
import ConversionPreview from "@/components/pages/ConversionPreview";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
      <ConversionPreview showPreviewNotice={false} />
    </>
  );
};

export default page;
