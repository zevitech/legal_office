"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { MdOutlineCall } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Receipt from "@/components/form/Receipt";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import { BiHome } from "react-icons/bi";
import CalendlyWidget from "@/components/ui/CalendlyWidget";

const ThankYou = () => {
  const router = useRouter();
  const receiptRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [homeIsLoading, setHomeIsLoading] = useState(false);
  const stepFourData = useSelector((state) => state.form.stepFour);

  // FOR PIXEL TAG
  const nestedLeadData = useSelector((state) => state.form);
  const totalPrice =
    nestedLeadData.stepFour.isRushProcessing === true
      ? nestedLeadData.stepThree.price + nestedLeadData.stepFour.rushAmount
      : nestedLeadData.stepThree.price;

  // FOR PIXEL TAG
  useEffect(() => {
    const transactionValue = totalPrice;

    if (window.fbq) {
      window.fbq("track", "Purchase", {
        value: transactionValue,
        currency: "USD",
      });
    }
  }, []);

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

  const redirectToHome = () => {
    setHomeIsLoading(true);
    return router.push(process.env.NEXT_PUBLIC_APP_URL);
  };

  return (
    <section>
      <div className="flex-center py-8 ">
        <div className="max-md:px-6">
          <div className="w-[600px] max-md:w-full m-auto text-center">
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
          </div>
          <br />
          <div className="flex justify-center gap-20 mt-14 max-md:flex-col">
            <div ref={receiptRef}>
              <Receipt />
            </div>
            <div>
              <CalendlyWidget />
            </div>
          </div>
          <div className="flex-center gap-10  mt-7 mb-11 max-md:w-full">
            {/* <Button
              color="primary"
              variant="shadow"
              startContent={<BiHome />}
              isLoading={homeIsLoading}
              onClick={redirectToHome}
            >
              Home
            </Button> */}
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
    </section>
  );
};

export default ThankYou;
