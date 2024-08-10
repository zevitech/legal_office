"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import FormHero from "@/components/form/FormHero";
import { Button } from "@nextui-org/react";
import { MdOutlineCall } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Receipt from "@/components/form/Receipt";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import { BiHome } from "react-icons/bi";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const receiptRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const stepFourData = useSelector((state) => state.form.stepFour);

  // page authorization | redirect if previous step has no data
  if (Object.keys(stepFourData).length === 0) {
    return router.push(process.env.NEXT_PUBLIC_APP_URL + "/trademark-register");
  }

  // make image and the download the receipt as image
  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const receiptNode = receiptRef.current;
      const canvas = await html2canvas(receiptNode);
      const imageData = canvas.toDataURL("image/png");
      const blob = await fetch(imageData).then((res) => res.blob());
      saveAs(blob, "receipt.png");
    } catch (error) {
      console.error("Error downloading receipt:", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <main>
        <FormHero />
        <div className="flex-center py-8 ">
          <div className="w-[500px] max-md:w-full max-md:px-6">
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
              We have received your application. Please wait for a call from one
              of our specialists regarding your trademark application.
            </p>
            <br />
            <div ref={receiptRef}>
              <Receipt />
            </div>
            <div className="flex justify-between mt-10 mb-11 items-center">
              <Button
                color="primary"
                variant="shadow"
                startContent={<BiHome />}
              >
                <Link href={`/`}>Home</Link>
              </Button>
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
                startContent={<FaDownload />}
                onClick={handleDownload}
                isLoading={isLoading}
              >
                Download Receipt
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
