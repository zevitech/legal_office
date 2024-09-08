"use client";

import Image from "next/image";
import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import Container from "./Container";
import { navItems } from "@/constant";
const Header = () => {
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredItemId(id);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  return (
    <header className="bg-white">
      <div className="flex justify-between items-center px-24 max-md:px-12 max-sm:px-8 py-4">
        <div>
          <Image
            src={"/images/legal-trademark-office.png"}
            alt="Legal Trademark Office logo"
            width={100}
            height={80}
            className="object-contain"
          />
        </div>
        <nav className="relative">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li
                key={item.id}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={`${item.route}`}
                  className="text-color-primary hover:text-blue-600 py-4 px-2"
                >
                  {item.text}
                </a>
                {item.subItems && (
                  <ul
                    className={`absolute left-0 mt-3 p-2 bg-white border border-gray-200 shadow-lg rounded-md transform transition-all duration-300 ease-in-out w-max ${
                      hoveredItemId === item.id ? "block" : "hidden"
                    } group-hover:block`}
                  >
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem.id}
                        className="py-2 rounded-md px-3 hover:bg-gray-100"
                      >
                        <a href={`${subItem.route}`} className="text-gray-600">
                          {subItem.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <PrimaryButton text="Trademark Now" animate={true} size="sm" />
      </div>
    </header>
  );
};

export default Header;
