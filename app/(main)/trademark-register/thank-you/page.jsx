"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import FormHero from "@/components/form/FormHero";
import { Button } from "@nextui-org/react";
import { MdOutlineCall } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return (
    <main>
      <FormHero />
      <div className="flex-center py-8 ">
        <div className="w-[500px]">
          <Image
            src={`/images/payment-done.png`}
            alt="payment done"
            width={200}
            height={200}
            className="mb-10 m-auto"
          />
          <h1 className="text-orange-600 text-3xl font-semibold">
            Thank You, Payment Done!
          </h1>
          <p className="text-slate-600 text-base mt-5">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut neque
            nihil, temporibus voluptatum blanditiis ducimus explicabo numquam.
            Illum, aliquid dicta.
          </p>
          <div className="flex justify-between my-7 mb-11 items-center">
            <Button
              color="danger"
              variant="shadow"
              startContent={<MdOutlineCall />}
            >
              Call Us
            </Button>
            <Button
              color="secondary"
              variant="shadow"
              type="submit"
              startContent={<IoHomeOutline />}
              onClick={() => router.push("/trademark-register")}
            >
              Trademark Another
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
