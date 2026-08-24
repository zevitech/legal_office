import { cache } from "react";
import { notFound } from "next/navigation";

import SpecificBlogPage from "@/components/pages/blogs/SpecificBlogPage";
import client from "@/utils/contentful";

const baseUrl = "https://www.legaltrademarkoffice.com";

export const revalidate = 3600;

const getBlog = cache(async (id) => {
  try {
    const entry = await client.getEntry(id);
    const imageUrl = entry.fields.blogImage?.fields?.file?.url;

    if (!entry.fields.blogTitle || !entry.fields.blogDescription || !imageUrl) {
      return null;
    }

    return {
      id: entry.sys.id,
      title: entry.fields.blogTitle,
      description: entry.fields.blogDescription,
      image: imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl,
      datePublished: entry.sys.createdAt,
      dateModified: entry.sys.updatedAt,
    };
  } catch {
    return null;
  }
});

const getCanonicalUrl = (id) => `${baseUrl}/blogs/${encodeURIComponent(id)}`;

export async function generateMetadata({ params }) {
  const blog = await getBlog(params.id);

  if (!blog) {
    return {
      title: "Blog Not Found | Legal Trademark Office",
      robots: { index: false, follow: false },
    };
  }

  const canonical = getCanonicalUrl(blog.id);
  const description = blog.description.replace(/\s+/g, " ").trim().slice(0, 160);

  return {
    title: `${blog.title} | Legal Trademark Office`,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: blog.title,
      description,
      images: [{ url: blog.image, alt: blog.title }],
      publishedTime: blog.datePublished,
      modifiedTime: blog.dateModified,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: [blog.image],
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const blog = await getBlog(params.id);

  if (!blog) notFound();

  const canonical = getCanonicalUrl(blog.id);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        headline: blog.title,
        description: blog.description,
        image: blog.image,
        datePublished: blog.datePublished,
        dateModified: blog.dateModified,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        author: { "@id": `${baseUrl}/#organization` },
        publisher: { "@id": `${baseUrl}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${baseUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blogs",
            item: `${baseUrl}/blogs`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: blog.title,
            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <SpecificBlogPage blog={blog} />
    </>
  );
}
