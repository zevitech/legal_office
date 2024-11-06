"use client";

import React, { useEffect, useState } from "react";
import FooterSection from "@/components/sections/FooterSection";
import Header from "@/components/ui/Header";

import BlogHeroImg from "../../../public/images/blog-hero.svg";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import SearchbarBlog from "@/components/pages/blogs/search-bar";
import BlogCard from "@/components/pages/blogs/blog-card";
import blogData from "@/constant/blog-data";

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogData.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Header />
      <div className="w-[90%] mx-auto py-[4rem] flex flex-col gap-8">
        {/* HERO SECTION */}
        <div
          className="py-8 rounded-md background-gradient-blog w-full my-8 flex lg:flex-row flex-col items-center gap-8 lg:px-16 sm:px-8 px-4"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
        >
          <Image
            src={BlogHeroImg}
            alt="Welcome to Our Blog Page"
            className="max-lg:w-full h-auto"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-white lg:text-[32px] sm:text-[24.73px] text-[18px] font-[600] lg:leading-[34px] sm:leading-[28.09px] leading-[20px]">
              Lorem Ipsum is simply dummy text of the printing
            </h1>
            <p className="text-white/70 sm:text-[15px] text-[12px] sm:leading-[22.5px] font-normal mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy text
              ever since the 1500s,
            </p>
            <Button className="lg:w-[252px] w-full h-[58px] rounded-[5px] bg-white text-black font-normal">
              Register Now
            </Button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <SearchbarBlog onSearch={handleSearch} />

        {/* BLOG SECTION */}
        <div
          className={`w-full  gap-4 ${
            filteredBlogs.length > 0
              ? "grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1"
              : "flex items-center justify-center"
          }`}
        >
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <BlogCard
                key={index}
                img={blog.img}
                title={blog.title}
                desc={blog.desc}
                searchTerm={searchTerm}
              />
            ))
          ) : (
            <p className="text-center w-full text-gray-500 text-lg">
              No results found for &quot;{searchTerm}&quot;. Try searching for another
              topic.
            </p>
          )}
        </div>
      </div>
      <FooterSection />
    </>
  );
};

export default page;
