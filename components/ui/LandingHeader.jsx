"use client";

import { Button, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdCall } from "react-icons/io";
import { useRouter } from "next/navigation";
import { HiOutlineMail } from "react-icons/hi";

import Link from "next/link";

const LandingHeader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegisterClick = () => {
    setIsLoading(true);
    router.push("/trademark-register");
  };

  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-5 sm:px-8 lg:px-10">
      <Image
        src={`/images/legal-trademark-office.png`}
        alt="Legal Trademark"
        width={150}
        height={120}
        className="max-md:w-28 max-md:h-auto"
      />
      <ul className="flex shrink-0 gap-2 sm:gap-4">
        <li>
          <Link href="tel:+13104244909">
            <Tooltip content="+1 (310) 424 4909">
              <Button
                isIconOnly
                color="primary"
                variant="shadow"
                aria-label="Call Legal Trademark Office"
              >
                <IoMdCall />
              </Button>
            </Tooltip>
          </Link>
        </li>
        <li>
          <Link href="mailto:support@legaltrademarkoffice.com">
            <Tooltip content="support@legaltrademarkoffice.com">
              <Button
                isIconOnly
                color="primary"
                variant="shadow"
                aria-label="Email Legal Trademark Office"
              >
                <HiOutlineMail />
              </Button>
            </Tooltip>
          </Link>
        </li>
        <li className="max-md:hidden">
          <Button
            color="primary"
            variant="shadow"
            radius="sm"
            onClick={handleRegisterClick}
            isLoading={isLoading}
            className="bg-primary-theme text-white hover:bg-primary-hovered"
          >
            Trademark Now
          </Button>
        </li>
      </ul>
    </header>
  );
};

export default LandingHeader;
