"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import PrimaryButton from "./PrimaryButton";
import { mobileNavItems, navItems } from "@/constant";
import Link from "next/link";
import { HiOutlineX } from "react-icons/hi";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";

const Header = () => {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleMouseEnter = (id) => {
    setHoveredItemId(id);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  // Handle scroll direction for showing/hiding header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos < prevScrollPos) {
        setShowHeader(true);
      } else if (currentScrollPos > 100) {
        setShowHeader(false);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className="h-[70px] max-md:h-[40px]">
      <header
        className={`bg-white shadow-lg  transition-transform duration-300 ease-in-out ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        } fixed top-0 left-0 w-full z-[9999]`}
      >
        <div className="flex justify-between items-center px-24 max-md:px-12 max-sm:px-8 py-2">
          <Link href={"/"}>
            <Image
              src={"/images/legal-trademark-office.png"}
              alt="Legal Trademark Office logo"
              width={100}
              height={80}
              className="object-contain max-md:w-[90px]"
            />
          </Link>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="text-4xl text-[#2b5fae]"
            >
              {isMobileNavOpen ? <HiOutlineX /> : <HiOutlineBars3BottomRight />}
            </button>
          </div>

          {/* Mobile Navigation Bar */}
          <div
            className={`00 absolute top-[65px] left-0 w-full bg-white transition-all duration-500 ease-in-out rounded-br-2xl rounded-bl-2xl shadow-lg ${
              isMobileNavOpen
                ? `h-[490px] overflow-auto`
                : "h-0 overflow-hidden"
            }`}
            style={{
              visibility: isMobileNavOpen ? "visible" : "hidden",
            }}
          >
            <nav>
              <ul className="flex flex-col items-start px-6 py-4 space-y-4 pt-7">
                {mobileNavItems.map((item) => {
                  const isActive =
                    (pathname.includes(item.route) && item.route.length > 1) ||
                    pathname === item.route;

                  return (
                    <li key={item.id}>
                      <Link
                        href={`${item.route}`}
                        className={`relative text-[#2b5fae] text-xl py-4 group-hover:text-blue-600 ${
                          isActive ? "active" : ""
                        }`}
                      >
                        {item.text}
                        <span
                          className={`absolute left-0 bottom-2 h-[1.5px] bg-[#2b5fae] transition-all duration-300 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        ></span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Desktop Navigation Bar */}
          <nav className="relative max-md:hidden">
            <ul className="flex space-x-6">
              {navItems.map((item) => {
                const isActive =
                  (pathname.includes(item.route) && item.route.length > 1) ||
                  pathname === item.route;

                return (
                  <li
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={`${item.route}`}
                      className={`relative text-[#2b5fae] font-semibold text-sm py-4 px-2 group-hover:text-blue-600 ${
                        isActive ? "active" : ""
                      }`}
                    >
                      {item.text}
                      <span
                        className={`absolute left-0 bottom-0 h-0.5 bg-[#2b5fae] transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </Link>
                    {item.subItems && (
                      <ul
                        className={`absolute -left-1 mt-3 p-4 bg-white border border-gray-200 shadow-lg rounded-md transform transition-all duration-300 ease-in-out w-max ${
                          hoveredItemId === item.id ? "block" : "hidden"
                        } group-hover:block`}
                      >
                        {item.subItems.map((subItem) => (
                          <li
                            key={subItem.id}
                            className="py-2 rounded-md px-3 hover:bg-gray-200 "
                          >
                            <Link
                              href={`${subItem.route}`}
                              className="text-[#16335f]"
                            >
                              {subItem.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="max-md:hidden flex items-center gap-4">
            <PrimaryButton text="Trademark Now" animate={true} size="sm" />

            <Link
              href={"/trademark-register/thank-you"}
              className="text-lg font-bold"
            >
              redirect me 
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
