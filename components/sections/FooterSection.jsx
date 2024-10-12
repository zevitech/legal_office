import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiSearch } from "react-icons/ci";

const FooterSection = () => {
  return (
    <footer>
      <div className="footer-bg pt-24 pb-20 flex justify-center gap-16">
        <div className="col-flex gap-4 max-w-[380px]">
          <Image
            width={150}
            height={130}
            alt="Legal Trademark White Logo"
            src={`/images/Legal-Trademark-White-Logo 2.png`}
            className="object-contain"
          />
          <p className="text-slate-100">
            Secure Your Mark helps brands protect their identity and image
            through a simple steps trademark registration process.
          </p>
          <Image
            width={70}
            height={70}
            alt="Message_fill"
            src={`/images/Message_fill.png`}
            className="object-contain"
          />
        </div>

        <div className="text-slate-100">
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="col-flex gap-3">
            <li>
              <Link href={`#`} className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href={`#`} className="hover:underline">
                Our Services
              </Link>
            </li>
            <li>
              <Link href={`#`} className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href={`#`} className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href={`#`} className="hover:underline">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-slate-100">
          <h4 className="text-xl font-normal mb-7">
            Call Now for a Free Consultation:
          </h4>
          <div className="flex items-center gap-2">
            <div className="flex-center gap-10 -m-5">
              <Link href="tel:+1(209)8135108" className="flex-center">
                <Image
                  width={70}
                  height={70}
                  alt="call icon"
                  src={`/images/footer-call-icon.png`}
                  className="object-contain"
                />
                <h4 className="text-lg font-bold">+1 (209) 813 5108</h4>
              </Link>
              <div className="text-slate-200 text-xs">
                <p>Mon-Fri: 5 a.m.-7 p.m. PT</p>
                <p>Weekends: 7 a.m.-4 p.m. PT</p>
              </div>
            </div>
          </div>
          <div className="col-flex gap-10 mt-5">
            <p>All of our experts are based in the U.S.</p>
            <div className="flex-center gap-4">
              <div className="relative w-[400px] shadow-md rounded-lg">
                <input
                  className="p-6 rounded-lg  text-sm w-full outline-blue-600"
                  type="text"
                  placeholder="Enter your email"
                />

                <Button
                  className="py-[35px] px-14 font-semibold bg-color-primary text-white absolute top-1/2 -translate-y-1/2 right-[-3px] hover:opacity-100"
                  radius="md"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-800 text-slate-200 flex-center py-6 px-2">
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
