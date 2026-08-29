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
      ],
    },
    sitemap: "https://www.legaltrademarkoffice.com/sitemap.xml",
    host: "https://www.legaltrademarkoffice.com",
  };
}
