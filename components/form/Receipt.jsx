"use client";

import axios from "axios";
import React, { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FaRegCopyright } from "react-icons/fa6";

const Receipt = () => {
  const nestedLeadData = useSelector((state) => state.form);
  const emailSentRef = useRef(false);
  
  const {
    isRushProcessing,
    // isGovermentFeesProcessing,
    rushAmount,
    // govermentFeesAmount,
  } = nestedLeadData.stepFour;
  const basePrice = nestedLeadData.stepThree.price;

  // const totalPrice =
  //   basePrice +
  //   (isRushProcessing ? rushAmount : 0) +
  //   (isGovermentFeesProcessing ? govermentFeesAmount : 0);

  const totalPrice = basePrice + (isRushProcessing ? rushAmount : 0);

  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Memoize receiptData to prevent unnecessary re-renders and API calls
  const receiptData = useMemo(() => ({
    nestedLeadData,
    totalPrice,
    today,
  }), [nestedLeadData, totalPrice, today]);

  // send receipt to user and admin mail - only once per receipt ID
  useEffect(() => {
    // Check if we have valid receipt data
    if (!nestedLeadData?.stepFour?.receipt_ID || !nestedLeadData?.stepOne?.emailAddress) {
      console.log("Missing required receipt data, skipping email send");
      return;
    }

    const receiptId = nestedLeadData.stepFour.receipt_ID;
    const emailSentKey = `email_sent_${receiptId}`;
    
    // Check if email was already sent for this receipt ID (using localStorage)
    const emailAlreadySent = localStorage.getItem(emailSentKey);
    if (emailAlreadySent || emailSentRef.current) {
      console.log("Receipt email already sent for receipt ID:", receiptId);
      return;
    }

    const endPoint = "/api/send-receipt";
    
    console.log("Sending receipt email for receipt ID:", receiptId);
    
    axios.post(endPoint, receiptData)
      .then((response) => {
        console.log("Receipt email sent successfully:", response.data);
        emailSentRef.current = true; // Mark as sent in current session
        localStorage.setItem(emailSentKey, "true"); // Mark as sent in localStorage
      })
      .catch((err) => {
        console.log("Failed to send receipt in mail:", err);
        // Don't mark as sent if there was an error
      });
  }, [receiptData, nestedLeadData?.stepFour?.receipt_ID, nestedLeadData?.stepOne?.emailAddress]);

  return (
    <main className="border-dashed border-2 border-slate-500 p-5 max-w-[600px] max-md:w-[96%] m-auto font-mono ">
      <section className="flex-between border-dashed border-b-2 border-slate-500 pb-4">
        <h1 className="text-[#005ea2] font-bold text-lg">Legal Trademark</h1>

        <div className="flex flex-col gap-2 items-end">
          <h1 className="text-slate-700 font-bold text-lg max-md:text-lg uppercase">
            receipt #{nestedLeadData.stepFour.receipt_ID}
          </h1>
          <p className="text-sm"> {today}</p>
          <p className="text-sm">
            {nestedLeadData?.stepOne?.firstName +
              " " +
              nestedLeadData?.stepOne?.lastName}
          </p>
        </div>
      </section>
      <section className="mt-4">
        <div className="flex-between">
          <h1 className="text-slate-900 font-semibold text-lg ">Item</h1>
          <h1 className="text-slate-900 font-semibold text-lg ">Price</h1>
        </div>
        <div className="text-sm">
          <div className="flex flex-1 items-center gap-3 py-1">
            <p className="text-slate-500 font-thin flex-none text-sm">
              Trademark registration
            </p>
            <p className="w-full bg-slate-400 h-[1px]"></p>
            <p className="text-slate-800 font-normal">
              ${nestedLeadData.stepThree.price}
            </p>
          </div>
          <div className="flex flex-1 items-center gap-3 py-1">
            <p className="text-slate-500 font-thin flex-none text-sm">
              Comprehensive Trademark Search
            </p>
            <p className="w-full bg-slate-400 h-[1px]"></p>
            <p className="text-slate-800 font-normal">$0.00</p>
          </div>
          <div className="flex flex-1 items-center gap-3 py-1">
            <p className="text-slate-500 font-thin flex-none text-sm">
              Trademark monitoring
            </p>
            <p className="w-full bg-slate-400 h-[1px]"></p>
            <p className="text-slate-700 font-normal">$0.00</p>
          </div>
          <div className="flex flex-1 items-center gap-3 py-1">
            <p className="text-slate-500 font-thin flex-none text-sm">
              Office Action Response
            </p>
            <p className="w-full bg-slate-400 h-[1px]"></p>
            <p className="text-slate-700 font-normal">$0.00</p>
          </div>
          {nestedLeadData.stepFour.isRushProcessing === true && (
            <div className="flex flex-1 items-center gap-3 py-1">
              <p className="text-slate-500 font-thin flex-none text-sm">
                Rush processing
              </p>
              <p className="w-full bg-slate-400 h-[1px]"></p>
              <p className="text-slate-700 font-normal">
                ${nestedLeadData.stepFour.rushAmount}
              </p>
            </div>
          )}

          {/* {nestedLeadData.stepFour.govermentFeesAmount > 0 && (
            <div className="flex flex-1 items-center gap-3 py-1">
              <p className="text-slate-500 font-thin flex-none text-sm">
                Goverment Fees
              </p>
              <p className="w-full bg-slate-400 h-[1px]"></p>
              <p className="text-slate-700 font-normal">
                ${nestedLeadData.stepFour.govermentFeesAmount}
              </p>
            </div>
          )} */}

          <div className="flex flex-1 text-slate-700 items-center gap-3 border-t-2 border-dotted border-slate-600 py-1 mt-4 pt-3">
            <b className="flex-none text-sm">Sub Total</b>
            <p className="w-full bg-slate-400 h-[1px]"></p>
            <p className="text-sm font-semibold">${totalPrice}</p>
          </div>
          <div className="flex flex-1 text-slate-700 items-center gap-3 py-1">
            <b className="flex-none text-sm">Tax</b>
            <p className="w-full bg-slate-400 h-[1px]"></p>
            <p className="text-sm font-semibold">$0.00</p>
          </div>
          <div className="flex flex-1 text-slate-700 items-center gap-3 py-1">
            <b className="flex-none text-sm">Total Amount</b>
            <p className="w-full bg-slate-400 h-[1px]"></p>
            {/* <p className="text-sm font-semibold">
              ${totalPrice + govermentFeesAmount}
            </p> */}
            <p className="text-sm font-semibold">
              ${totalPrice}
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-col items-center justify-center gap-2 text-slate-600 text-xs">
          <p className="flex-center gap-1">
            {`Statement Descriptor "Xtarlabs LLC"`}
          </p>
          <p className="w-28 h-[1px] bg-slate-300" />
          <p className="flex-center gap-1">
            <FaRegCopyright /> Copyright and all Rights reserved by{" "}
            <Link href={process.env.NEXT_PUBLIC_APP_URL}>
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Receipt;
