const baseUrl = "https://www.legaltrademarkoffice.com";

import client from "@/utils/contentful";

export const revalidate = 3600;

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

export default async function sitemap() {
  const staticUrls = publicRoutes.map((route) => ({
    url: `${baseUrl}${route || "/"}`,
  }));

  try {
    const response = await client.getEntries({
      content_type: "legalTrademarkOffice",
      order: "-sys.updatedAt",
      limit: 1000,
    });
    const articleUrls = response.items.map((item) => ({
      url: `${baseUrl}/blogs/${encodeURIComponent(item.sys.id)}`,
      lastModified: item.sys.updatedAt,
    }));

    return [...staticUrls, ...articleUrls];
  } catch {
    return staticUrls;
  }
}
