import React from "react";

import client from "@/utils/contentful";
import Header from "@/components/ui/Header";
import FooterSection from "@/components/sections/FooterSection";
import Link from "next/link";
import { trademarkGuides } from "@/lib/trademarkGuides";

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

  if (blogs.length === 0) {
    const featuredGuides = trademarkGuides.slice(0, 6);
    return <><Header /><main className="bg-slate-50">
      <section className="bg-gradient-to-br from-[#e9f8ff] via-white to-[#f4fbff] px-5 py-28 text-center text-slate-900"><div className="mx-auto max-w-4xl"><p className="font-semibold uppercase tracking-[0.18em] text-[#027DD6]">Trademark resources</p><h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">Trademark Filing News and Practical Guides</h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">Use our current U.S. trademark resources to prepare for registration, understand filing costs and make a more informed next move.</p><Link href="/trademark-registration" className="mt-8 inline-flex min-h-14 items-center rounded-lg bg-[#027DD6] px-8 py-4 font-semibold text-white">Compare trademark registration plans</Link></div></section>
      <section className="px-5 py-20 md:py-28"><div className="mx-auto max-w-6xl"><div className="mx-auto max-w-3xl text-center"><h2 className="text-3xl font-bold text-[#075A96]">Featured trademark registration resources</h2><p className="mt-4 leading-7 text-slate-600">Start with the topic closest to your filing decision, then return to the registration page when you are ready.</p></div><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featuredGuides.map((guide)=><article key={guide.slug} className="flex min-h-[280px] flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><p className="text-sm font-semibold uppercase tracking-wide text-[#027DD6]">U.S. trademark guide</p><h2 className="mt-3 text-xl font-bold leading-7 text-[#075A96]">{guide.shortTitle}</h2><p className="mt-4 flex-1 leading-7 text-slate-600">{guide.description}</p><Link href={`/guides/${guide.slug}`} className="mt-6 font-semibold text-[#027DD6] hover:underline">Read this guide →</Link></article>)}</div><div className="mt-12 text-center"><Link href="/guides" className="inline-flex min-h-14 items-center rounded-lg border border-[#027DD6] px-8 py-4 font-semibold text-[#075A96]">Browse all trademark guides</Link></div></div></section>
      <FooterSection />
    </main></>;
  }

  const { default: BlogPage } = await import("@/components/pages/blogs/BlogPage");
  return <BlogPage initialBlogs={blogs} />;
}
