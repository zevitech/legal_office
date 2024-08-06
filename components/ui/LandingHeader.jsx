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
    <header className="flex-between gap-4 px-6 py-5">
      <Image
        src={`/images/legal-trademark-logo.webp`}
        alt="Legal Trademark"
        width={130}
        height={100}
      />
      <ul className="flex gap-4">
        <li>
          <Link href="tel:+14083893630">
            <Tooltip content="+1 (408) 389-3630">
              <Button isIconOnly color="danger" aria-label="Like">
                <IoMdCall />
              </Button>
            </Tooltip>
          </Link>
        </li>
        <li>
          <Link href="mailto:support@legaltrademarkoffice.com">
            <Tooltip content="support@legaltrademarkoffice.com">
              <Button isIconOnly color="danger" aria-label="Like">
                <HiOutlineMail />
              </Button>
            </Tooltip>
          </Link>
        </li>
        <li className="max-md:hidden">
          <Button
            color="secondary"
            variant="shadow"
            radius="sm"
            onClick={handleRegisterClick}
            isLoading={isLoading}
          >
            Trademark Now
          </Button>
        </li>
      </ul>
    </header>
  );
};

export default LandingHeader;
