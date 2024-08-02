"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegCopyright } from "react-icons/fa6";
import { useSelector } from "react-redux";

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

  return (
    <main className="border-dashed border-2 border-slate-500 p-5 max-w-[600px] max-md:w-[96%] m-auto font-mono mt-8">
      <section className="flex-between border-dashed border-b-2 border-slate-500 pb-4">
        {/* <Image
          src="/images/legal-trademark-logo.webp"
          alt="Secure Your Mark"
          width={100}
          height={40}
          className="w-24 h-auto"
        /> */}
        <h1 className="text-[#005ea2] font-extrabold text-lg">
          Legal Trademark
        </h1>

        <div className="flex flex-col gap-2 items-end">
          <h1 className="text-slate-700 font-bold text-2xl max-md:text-lg uppercase">
            receipt #{nestedLeadData.stepFour.receipt_ID}
          </h1>
          <p className="text-sm"> {today}</p>
        </div>
      </section>
      <section className="mt-4">
        <div className="flex-between">
          <h1 className="text-slate-900 font-bold text-lg ">Item</h1>
          <h1 className="text-slate-900 font-bold text-lg ">Price</h1>
        </div>
        <div>
          <div className="flex flex-1 items-center gap-3 py-1">
            <p className="text-slate-600 font-medium flex-none text-sm">
              Trademark registration
            </p>
            <p className="w-full bg-slate-400 h-[1px]"></p>
            <p className="text-slate-800 font-medium">
              ${nestedLeadData.stepThree.price}
            </p>
          </div>
          <div className="flex flex-1 items-center gap-3 py-1">
            <p className="text-slate-600 font-medium flex-none text-sm">
              Comprehensive Trademark Search
            </p>
            <p className="w-full bg-slate-400 h-[1px]"></p>
            <p className="text-slate-800 font-medium">$0</p>
          </div>
          <div className="flex flex-1 items-center gap-3 py-1">
            <p className="text-slate-600 font-medium flex-none text-sm">
              Trademark monitoring
            </p>
            <p className="w-full bg-slate-400 h-[1px]"></p>
            <p className="text-slate-800 font-medium">$0</p>
          </div>
          <div className="flex flex-1 items-center gap-3 py-1">
            <p className="text-slate-600 font-medium flex-none text-sm">
              Office Action Response
            </p>
            <p className="w-full bg-slate-400 h-[1px]"></p>
            <p className="text-slate-800 font-medium">$0</p>
          </div>
          {nestedLeadData.stepFour.isRushProcessing === true && (
            <div className="flex flex-1 items-center gap-3 py-1">
              <p className="text-slate-600 font-medium flex-none text-sm">
                Rush processing
              </p>
              <p className="w-full bg-slate-400 h-[1px]"></p>
              <p className="text-slate-800 font-medium">
                ${nestedLeadData.stepFour.rushAmount}
              </p>
            </div>
          )}

          <div className="flex flex-1 items-center gap-3 border-t-2 border-dotted border-slate-800 py-1 mt-4 pt-3">
            <b className="flex-none text-sm">Sub Total</b>
            <p className="w-full bg-slate-400 h-[1px]"></p>
            <b>${totalPrice}</b>
          </div>
          <div className="flex flex-1 items-center gap-3 py-1">
            <b className="flex-none text-sm">Tax</b>
            <p className="w-full bg-slate-400 h-[1px]"></p>
            <b>$0</b>
          </div>
          <div className="flex flex-1 items-center gap-3 py-1">
            <b className="flex-none text-sm">Total Amount</b>
            <p className="w-full bg-slate-400 h-[1px]"></p>
            <b>${totalPrice}</b>
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
