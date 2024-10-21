"use client";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import React from "react";
import HeaderText from "../ui/HeaderText";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { testimonials } from "@/constant/testimonial";

const TestimonialSection = () => {
  return (
    <div>
      <div className="flex-center">
        <HeaderText text1="Our" text2="Happy Customers" />
      </div>
      <div className="py-16 max-md:py-10">
        <Swiper
          slidesPerView={1} // Default for smallest screens
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          centeredSlides={true} // Ensures slides are centered on small screens
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="brandCarousel !pb-16"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-[370px] max-md:w-full max-md:h-auto h-[300px] bg-white p-8 border-1 border-blue-500 rounded-lg shadow-lg">
                <h1 className="text-2xl text-slate-800 font-semibold mb-6">
                  {item.title}
                </h1>
                <p className="text-lg leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialSection;
