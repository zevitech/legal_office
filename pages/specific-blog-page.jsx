"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FooterSection from "@/components/sections/FooterSection";
import Header from "@/components/ui/Header";
import client from "@/utils/contentful";
import Image from "next/image";

const SpecificBlogPage = () => {
  const pathname = usePathname();
  const id = pathname?.split("/blogs/")[1];
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await client.getEntry(id);
          const blogData = {
            id: response.sys.id,
            title: response.fields.blogTitle,
            img: `https:${response.fields.blogImage.fields.file.url}`,
            desc: response.fields.blogDescription,
          };
          setBlog(blogData);
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center py-16">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-xl">Blog not found</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="w-full h-full bg-white">
        <div className="w-[90%] mx-auto py-16 lg:px-4">
          <div className="flex flex-col gap-2">
            <h1 className="lg:mb-12 mt-8 lg:text-[40px] sm:text-[30px] text-[25px] font-medium">
              <span className="font-semibold text-primary">Discover:</span>{" "}
              {blog.title} In-Depth Insights and Stories
            </h1>
            <div className="flex justify-center my-12">
              <Image
                src={blog.img}
                alt={blog.title}
                width={800}
                height={400}
                className="rounded-lg !object-cover w-full"
              />
            </div> 
            <h1 className="lg:text-[34px] sm:text-[24px] text-[18px] font-medium lg:mt-12">{blog.title}</h1>
            <p className="sm:text-[14px] text-[12px] text-gray-700 leading-relaxed text-justify">
              {blog.desc}
            </p>
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
};

export default SpecificBlogPage;
