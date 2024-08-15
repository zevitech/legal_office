"use client";

import axios from "axios";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FaRegCopyright } from "react-icons/fa6";

const Receipt = () => {
  const nestedLeadData = useSelector((state) => state.form);
  const totalPrice =
    nestedLeadData.stepFour.isRushProcessing === true
      ? nestedLeadData.stepThree.price + nestedLeadData.stepFour.rushAmount
      : nestedLeadData.stepThree.price;

  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const receiptData = {
    nestedLeadData,
    totalPrice,
    today,
  };

  // send receipt to user and admin mail
  useEffect(() => {
    const endPoint = process.env.NEXT_PUBLIC_API_URL + "/send-receipt";
    axios.post(endPoint, receiptData).catch((err) => {
      console.log("Failed to send receipt in mail:", err);
    });
  }, []);

  return (
    <main className="border-dashed border-2 border-slate-500 p-5 max-w-[600px] max-md:w-[96%] m-auto font-mono mt-8">
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
            <p className="text-sm font-semibold">${totalPrice}</p>
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
