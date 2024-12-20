import React from "react";
import Image from "next/image";

import Header from "../../../components/ui/Header";
import FooterSection from "../../../components/sections/FooterSection";

import LicenseImg from "../../../public/images/license.jpg";

const page = () => {
  return (
    <>
      <Header />
      <main className="w-full h-screen flex flex-col items-center justify-center gap-8">
        <h1 className="text-[54px] leading-[60px] font-bold text-heading-color">
          License
        </h1>
        <Image src={LicenseImg} alt="License" className="w-[700px] h-[500px]" />
      </main>
      <FooterSection />
    </>
  );
};

export default page;
