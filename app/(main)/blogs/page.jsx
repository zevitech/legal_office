import React from "react";

import BlogPage from "@/components/pages/blogs/BlogPage";
import client from "@/utils/contentful";

export const revalidate = 3600;

export const metadata = {
  title: "Trademark Filing News & Updates | Legal Trademark Office",
  description:
    "Read company updates and practical news about U.S. trademark applications, maintenance and filing support.",
  alternates: {
    canonical: "https://www.legaltrademarkoffice.com/blogs",
  },
};

const getBlogs = async () => {
  try {
    const response = await client.getEntries({
      content_type: "legalTrademarkOffice",
      order: "-sys.updatedAt",
      limit: 100,
    });

    return response.items
      .map((item) => {
        const imageUrl = item.fields.blogImage?.fields?.file?.url;

        if (!item.fields.blogTitle || !item.fields.blogDescription || !imageUrl) {
          return null;
        }

        return {
          id: item.sys.id,
          img: imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl,
          title: item.fields.blogTitle,
          desc: item.fields.blogDescription,
        };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return <BlogPage initialBlogs={blogs} />;
}
