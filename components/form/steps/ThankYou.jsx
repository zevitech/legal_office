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
import { DotLottiePlayer } from "@dotlottie/react-player";
import SystemConfirmationAnimation from "@/public/new-form/animations/system-confirmation-animation.json";

const ThankYou = () => {
  const router = useRouter();
  const receiptRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [homeIsLoading, setHomeIsLoading] = useState(false);
  const stepFourData = useSelector((state) => state.form.stepFour);
  const nestedLeadData = useSelector((state) => state.form);

  // Compute totals for analytics
  const basePrice = nestedLeadData?.stepThree?.price || 0;
  const isRushProcessing = nestedLeadData?.stepFour?.isRushProcessing || false;
  const rushAmount = nestedLeadData?.stepFour?.rushAmount || 0;
  const totalPrice = basePrice + (isRushProcessing ? rushAmount : 0);

  // Check if payment bypass mode is enabled
  const isBypassMode = process.env.NEXT_PUBLIC_PAYMENT_BYPASS_MODE === "true";
  const paymentBypass = nestedLeadData.stepFour?.payment_bypass;

  // page authorization | redirect if previous step has no data
  // Move redirect into an effect to avoid conditional hook ordering
  useEffect(() => {
    try {
      if (!stepFourData || Object.keys(stepFourData).length === 0) {
        router.replace(process.env.NEXT_PUBLIC_APP_URL + "/trademark-register");
      }
    } catch (err) {
      console.log("Redirect failed:", err);
    }
  }, [router, stepFourData]);

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

  // Push purchase event to Google Tag Manager on real payment
  useEffect(() => {
    try {
      // Skip analytics when bypass mode or explicit payment bypass is enabled
      if (isBypassMode || paymentBypass) return;

      const receiptId = nestedLeadData?.stepFour?.receipt_ID;
      const email = nestedLeadData?.stepOne?.emailAddress;
      const packageName =
        nestedLeadData?.stepThree?.packageName || "Trademark registration";

      // Fire even if base price is missing (e.g., on reload or SPA hydration)
      if (!receiptId || !email) return;

      const key = `gtm_purchase_${receiptId}`;
      if (typeof window !== "undefined") {
        // Prevent duplicate pushes for the same receipt
        if (localStorage.getItem(key)) return;

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "purchase",
          transaction_id: receiptId,
          value: totalPrice || 0,
          currency: "USD",
          email,
          package_name: packageName,
          items: [
            ...(basePrice > 0
              ? [
                  {
                    item_name: packageName,
                    item_id: "trademark_registration",
                    price: basePrice,
                    quantity: 1,
                  },
                ]
              : []),
            ...(isRushProcessing
              ? [
                  {
                    item_name: "Rush processing",
                    item_id: "rush_processing",
                    price: rushAmount,
                    quantity: 1,
                  },
                ]
              : []),
          ],
        });

        // Optional: also emit gtag purchase event if available (conversion is managed via GTM)
        if (typeof window.gtag === "function") {
          window.gtag("event", "purchase", {
            transaction_id: receiptId,
            value: totalPrice,
            currency: "USD",
          });
        }

        // Direct Google Ads conversion event (requested snippet)
        const adsConversionKey = `ads_conv_${receiptId}`;
        if (
          !localStorage.getItem(adsConversionKey) &&
          typeof window.gtag === "function"
        ) {
          window.gtag("event", "conversion", {
            send_to: "AW-16565473053/RmqECOrQ97sbEJ2ehNs9",
            value: totalPrice || 0,
            currency: "USD",
            transaction_id: receiptId || "",
          });
          localStorage.setItem(adsConversionKey, "true");
        }

        // Also emit a dedicated thank_you event for containers listening to a custom event
        const thankyouKey = `gtm_thankyou_${receiptId}`;
        if (!localStorage.getItem(thankyouKey)) {
          window.dataLayer.push({
            event: "thank_you",
            transaction_id: receiptId,
            value: totalPrice || 0,
            currency: "USD",
            email,
            package_name: packageName,
            page_path: "/trademark-register/thank-you",
          });
          localStorage.setItem(thankyouKey, "true");
        }

        localStorage.setItem(key, "true");
      }
    } catch (err) {
      console.log("GTM purchase event failed:", err);
    }
  }, [
    isBypassMode,
    paymentBypass,
    nestedLeadData,
    basePrice,
    rushAmount,
    totalPrice,
    isRushProcessing,
  ]);

  const redirectToHome = () => {
    setHomeIsLoading(true);
    return router.push(process.env.NEXT_PUBLIC_APP_URL);
  };

  // Guard render when redirecting (hooks above still run consistently)
  if (!stepFourData || Object.keys(stepFourData).length === 0) {
    return null;
  }

  return (
    <main className="section-standard-layout flex flex-col items-center gap-4 py-10">
      <DotLottiePlayer
        src={SystemConfirmationAnimation}
        className="w-[300px] h-[300px] max-md:w-[200px] max-md:h-[200px]"
        autoplay
        loop
      />

      <div className="w-full flex flex-col items-center gap-1">
        <h1 className="font-inria text-heading-color md:text-[24px] text-[20px] text-center">
          {paymentBypass || isBypassMode
            ? "Thank You, Application Submitted!"
            : "Thank You, Payment Completed!"}
        </h1>
        <p className="md:text-[16px] text-[12px] md:leading-[20px] leading-[16px] md:max-w-[800px] w-full text-center">
          {paymentBypass || isBypassMode
            ? "Thank you for submitting your application. Your form has been received for review. Please schedule a call with one of our representative to discuss the next steps for trademark application."
            : "Thank you for submitting your application. Please schedule a call with one of our representative to discuss the next steps for trademark application."}
        </p>
      </div>

      <div>
        <div className="flex justify-center gap-20 mt-14 max-md:flex-col">
          <div ref={receiptRef}>
            <Receipt />
          </div>
          {/* <div>
              <CalendlyWidget />
            </div> */}
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

          {/* TAG - 1001 */}
          <Button
            startContent={<MdOutlineCall />}
            className="h-[50px] bg-white rounded-[5px] text-primary-theme border-2 border-primary-theme font-bold text-[20px] p-4"
          >
            Call Us
          </Button>
          <Button
            type="submit"
            startContent={<FaDownload />}
            onClick={handleDownload}
            isLoading={isLoading}
            className="h-[50px] bg-primary-theme rounded-[5px] text-white font-bold text-[20px] p-4"
          >
            Download Receipt
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ThankYou;
