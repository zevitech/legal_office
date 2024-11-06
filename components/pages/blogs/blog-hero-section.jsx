import React from "react";
import Image from "next/image";

import { Button } from "@nextui-org/react";

import BlogHeroImg from "../../../public/images/blog-hero.svg";

const BlogHeroSection = () => {
  return (
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
  );
};

export default BlogHeroSection;
