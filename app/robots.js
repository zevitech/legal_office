export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/portal/",
        "/portal-admin/",
        "/portal-login/",
        "/client-portal/",
        "/trademark-register/payment",
        "/trademark-register/step-2",
        "/trademark-register/step-3",
        "/trademark-register/step-4",
        "/trademark-register/thank-you",
      ],
    },
    sitemap: "https://www.legaltrademarkoffice.com/sitemap.xml",
    host: "https://www.legaltrademarkoffice.com",
  };
}
