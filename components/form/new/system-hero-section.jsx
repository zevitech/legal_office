"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SystemHeroSection = () => {
  const pathname = usePathname();

  const getBackgroundImage = () => {
    if (pathname === "/trademark-registration/step-1")
      return "/new-form/images/system/system-step-one-hero-section-image.jpg";
    if (pathname === "/trademark-registration/step-2")
      return "/new-form/images/system/system-step-two-hero-section-image.jpg";
    if (pathname === "/trademark-registration/step-3")
      return "/new-form/images/system/system-step-three-hero-section-image.jpg";
    if (pathname === "/trademark-registration/step-4")
      return "/new-form/images/system/system-step-four-hero-section-image.jpg";
    return "/new-form/images/system/system-step-one-hero-section-image.jpg";
  };

  return (
    <section
      className="w-full lg:h-[462px] md:h-[362px] h-[262px] bg-cover relative"
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#002654b3] to-[#141C2Fe6] pointer-events-none flex justify-center">
        <div className="w-[90%] max-w-[1536px] h-full flex justify-center flex-col">
          <div className="flex items-center gap-1">
            <h1 className="text-white font-inria sm:text-[16px] text-[14px] font-light leading-[auto] tracking-[0%]">
              We are here
            </h1>
            <Image
              src={"/new-form/icons/line-icon.svg"}
              alt="Line"
              width={187}
              height={7}
              className="translate-y-[2px]"
            />
          </div>

          <div className="flex flex-col lg:gap-2 gap-4">
            <h1 className="text-white font-inria font-bold md:text-[48px] sm:text-[38px] text-[28px] lg:leading-[auto] md:leading-[48px] sm:leading-[38px] leading-[28px] tracking-[0%] max-w-[900px]">
              Register <span className="text-primary-theme">Trademark</span> for
              Your Business!
            </h1>
            <p className="text-white font-light md:text-[16px] sm:text-[14px] text-[12px] leading-[auto] tracking-[0%] max-w-[900px]">
              Protect your business before it is fully established and prevent
              other companies from replicating your digital assets, such as
              logos, names, slogans, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemHeroSection;
