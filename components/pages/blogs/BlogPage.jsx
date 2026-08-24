"use client";

// Client-side blog listing used by the App Router blog page.

import React, { useState } from "react";
import FooterSection from "@/components/sections/FooterSection";
import Header from "@/components/ui/Header";
import { Pagination } from "@nextui-org/react";
import SearchbarBlog from "@/components/pages/blogs/search-bar";
import BlogCard from "@/components/pages/blogs/blog-card";
import BlogHeroSection from "@/components/pages/blogs/blog-hero-section";

const BlogPage = ({ initialBlogs = [] }) => {
  const blogs = initialBlogs;
  const loadingStates = new Array(initialBlogs.length).fill(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header />
      <div className="w-[90%] mx-auto py-[4rem] flex flex-col gap-8">
        <BlogHeroSection />
        <SearchbarBlog onSearch={handleSearch} />

        <div
          className={`w-full gap-4 ${
            currentBlogs.length > 0
              ? "grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1"
              : "flex items-center justify-center"
          }`}
        >
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog, index) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                img={blog.img}
                title={blog.title}
                desc={blog.desc}
                searchTerm={searchTerm}
                isLoading={loadingStates[index]}
              />
            ))
          ) : (
            <p className="text-center w-full text-gray-500 text-lg">
              No results found for &quot;{searchTerm}&quot;. Try searching for
              another topic.
            </p>
          )}
        </div>

        {filteredBlogs.length > itemsPerPage && (
          <div className="w-full my-8 flex items-center justify-center">
            <Pagination
              total={totalPages}
              initialPage={1}
              page={currentPage}
              onChange={handlePageChange}
              variant={"bordered"}
            />
          </div>
        )}
      </div>
      <FooterSection />
    </>
  );
};

export default BlogPage;
