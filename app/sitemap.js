const baseUrl = "https://www.legaltrademarkoffice.com";

const publicRoutes = [
  "",
  "/about-us",
  "/blogs",
  "/contact-us",
  "/faq",
  "/legal/privacy",
  "/legal/refund-policy",
  "/legal/terms",
  "/services",
  "/services/trademark-renewal",
  "/services/trademark-revival",
  "/trademark-registration",
];

export default function sitemap() {
  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route || "/"}`,
  }));
}
