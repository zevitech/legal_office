import { mobileNavItems } from "@/constant";
import ScrollToTop from "@/utils/scroll-to-top";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsHouse, BsHouseAdd, BsMap } from "react-icons/bs";
import { IoCallSharp } from "react-icons/io5";

const FooterSection = () => {
  return (
    <footer className="">
      <div className="footer-bg max-md:px-6 pt-24 max-md:pt-20 pb-10 max-md:pb-10 flex justify-center gap-28 max-md:gap-10 max-md:flex-col">
        <div className="col-flex gap-4 max-md:gap-3 max-w-[380px]">
          <Image
            width={150}
            height={130}
            alt="Legal Trademark White Logo"
            src={`/images/Legal-Trademark-White-Logo 2.png`}
            className="object-contain"
          />
          <p className="text-slate-100 max-md:text-xs">
            Legal Trademark Office helps brands protect their identity and image
            through a simple steps trademark registration process.
          </p>
        </div>
        <div className="text-slate-100">
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="grid grid-cols-2 gap-4">
            {mobileNavItems.map((item) => {
              return (
                <li key={item.id} className="group relative">
                  <Link
                    href={`${item.route}`}
                    className={`text-slate-100 md:text-base text-[12px] py-1 block`}
                  >
                    {item.text}
                    <span
                      className={`max-md:hidden absolute left-0 bottom-0 h-[1.5px] bg-[#c0d3ee] transition-all duration-300 w-0 group-hover:w-full`}
                    ></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="text-slate-100 flex flex-col gap-4">
          <h4 className="text-xl font-normal mb-7">
            Call Now for a Free Consultation:
          </h4>
          <div className="flex items-center gap-2">
            <div className="flex-center md:flex-col gap-4 -m-5">
              <Link
                href="tel:+1(209)8135108"
                className="flex-center gap-2 max-md:w-[90%] max-md:mx-auto md:translate-x-4"
              >
                <IoCallSharp className="text-[20px]" />
                <h4 className="text-lg font-bold max-md:text-[16px]">
                  +1 (209) 813 5108
                </h4>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-[2rem]">
            <div className="flex-center md:flex-col gap-4 -m-5">
              <Link
                href="tel:+1(209)8135108"
                className="flex-center !items-start gap-3 max-md:w-[90%] max-md:mx-auto md:translate-x-4"
              >
                <BsMap className="text-[20px] translate-y-1" />
                <h4 className="text-sm font-bold w-[90%]">
                  2121 Crystal Dr, Arlington, VA 22202, USA
                </h4>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-[2rem]">
            <div className="flex-center md:flex-col gap-4 -m-5">
              <Link
                href="tel:+1(209)8135108"
                className="flex-center !items-start gap-3 max-md:w-[90%] max-md:mx-auto md:translate-x-4"
              >
                <BsMap className="text-[20px] translate-y-1" />
                <h4 className="text-sm font-bold w-[90%]">
                  1060 Lincoln Ave, Suite 20 #1071, San Jose, CA 95125, USA
                </h4>
              </Link>
            </div>
          </div>
        </div>

        <ScrollToTop />
      </div>
      <div className="bg-slate-800 text-slate-200 max-md:text-center flex-center py-6 px-4 max-md:text-sm">
        <p>
          © Copyright & all rights reserved by{" "}
          <Link className="text-blue-500 hover:underline" href={`#`}>
            Legal Trademark Office
          </Link>{" "}
          2024
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
