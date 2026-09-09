import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";
import { testimonials } from "@/constant/testimonial";

export default function TestimonialCarousel() {
  const swiperRef = useRef(null);

  return (
    <div className="relative z-10 flex justify-end bg-slate-50 shadow-sm py-7 px-16 max-md:px-0 rounded-md pb-9">
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous review"
        className="absolute left-6 max-md:left-3 top-1/2 transform -translate-y-1/2 z-30"
      >
        <FaRegArrowAltCircleLeft className="text-slate-500 text-2xl max-md:text-4xl" />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next review"
        className="absolute right-7 max-md:right-3 top-1/2 transform -translate-y-1/2 z-30 "
      >
        <FaRegArrowAltCircleRight className="text-slate-500 text-2xl  max-md:text-4xl" />
      </button>
      <Swiper
        slidesPerView={1}
        spaceBetween={1}
        grabCursor={true}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        pagination={true}
        modules={[Pagination]}
        className="mySwiper max-w-[700px] max-md:w-full m-0  z-10 !pb-10"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <ReviewCard
              title={testimonial.title}
              description={testimonial.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
