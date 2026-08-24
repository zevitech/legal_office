const baseUrl = "https://www.legaltrademarkoffice.com";

const publicRoutes = [
  "",
  "/about-us",
  "/blogs",
  "/contact-us",
  "/faq",
  "/legal/compliance",
  "/legal/privacy",
  "/legal/refund-policy",
  "/legal/terms",
  "/services",
  "/services/trademark-registration",
  "/services/trademark-renewal",
  "/services/trademark-revival",
  "/trademark-registration",
];

export default function sitemap() {
  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route || "/"}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/services/") ? 0.9 : 0.7,
  }));
}
