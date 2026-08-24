import React from "react";
import Image from "next/image";
import Link from "next/link";

import FooterSection from "@/components/sections/FooterSection";
import Header from "@/components/ui/Header";

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));

const SpecificBlogPage = ({ blog }) => (
  <>
    <Header />
    <main className="min-h-screen bg-white">
      <article className="mx-auto w-[90%] max-w-5xl py-16 lg:px-4">
        <nav aria-label="Breadcrumb" className="mt-8 text-sm text-slate-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link className="hover:text-primary hover:underline" href="/">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="hover:text-primary hover:underline" href="/blogs">
                Blogs
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-slate-900">
              {blog.title}
            </li>
          </ol>
        </nav>

        <header className="mt-8">
          <h1 className="text-[25px] font-semibold leading-tight text-slate-900 sm:text-[30px] lg:text-[40px]">
            {blog.title}
          </h1>
          <p className="mt-4 text-sm text-slate-600">
            Published {formatDate(blog.datePublished)}
            {blog.dateModified !== blog.datePublished && (
              <> · Updated {formatDate(blog.dateModified)}</>
            )}
          </p>
        </header>

        <Image
          src={blog.image}
          alt={blog.title}
          width={1200}
          height={630}
          priority
          className="my-12 aspect-[1200/630] w-full rounded-lg object-cover"
        />

        <div className="whitespace-pre-line text-base leading-8 text-slate-700">
          {blog.description}
        </div>
      </article>
    </main>
    <FooterSection />
  </>
);

export default SpecificBlogPage;
