"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";
import { recentlyTrademarked } from "@/constant";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "@/components/styles/carousel-custom.css";

export default function BrandCarousel() {
  return (
    <>
      <h1 className="text-3xl text-slate-700 text-center mb-12 max-md:text-2xl max-md:px-3">
        <span className="font-bold text-color-primary">80,000+</span>{" "}
        <span className="font-normal">trademarks registered by us</span>
      </h1>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        freeMode={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="brandCarousel"
      >
        {recentlyTrademarked.map((item, index) => (
          <SwiperSlide key={index} className="flex items-center">
            <div>
              <Image
                src={`/images/${item}`}
                alt="Brand Name"
                width={150}
                height={110}
                className="object-contain rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
