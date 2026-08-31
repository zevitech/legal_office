"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  HiOutlineCheck,
  HiOutlineDocumentText,
  HiOutlineLockClosed,
} from "react-icons/hi";
import { ADD_ON_PRICES } from "@/constant/pricing";

const ADDON_LABELS = {
  rush: "Rush preparation",
  monitoring: "12-month trademark monitoring",
  specimenReview: "Specimen readiness review",
};

const Receipt = ({ completedOrder }) => {
  const nestedLeadData = useSelector((state) => state.form);

  const stepFour = nestedLeadData.stepFour || {};
  const {
    isRushProcessing,
    // isGovermentFeesProcessing,
    rushAmount,
    // govermentFeesAmount,
  } = stepFour;
  const packageName =
    completedOrder?.packageName ||
    nestedLeadData.stepThree?.packageName ||
    "Premium";
  const basePrice =
    nestedLeadData.stepThree?.price ||
    (process.env.NODE_ENV !== "production" ? 649 : 0);
  const addons = completedOrder?.addons || [];
  const receiptId =
    completedOrder?.transactionId ||
    nestedLeadData.stepFour?.receipt_ID ||
    "DEMO-649-2026";

  // const totalPrice =
  //   basePrice +
  //   (isRushProcessing ? rushAmount : 0) +
  //   (isGovermentFeesProcessing ? govermentFeesAmount : 0);

  const addonTotal = addons.reduce(
    (total, key) => total + (ADD_ON_PRICES[key] || 0),
    0,
  );
  const legacyRushAmount =
    addons.length === 0 && isRushProcessing ? Number(rushAmount || 0) : 0;
  const calculatedTotal = basePrice + legacyRushAmount + addonTotal;
  const totalPrice = completedOrder?.value || calculatedTotal;
  const displayedPackagePrice = completedOrder?.value
    ? Math.max(Number(completedOrder.value) - addonTotal, 0)
    : basePrice;
  const customerName =
    [nestedLeadData.stepOne?.firstName, nestedLeadData.stepOne?.lastName]
      .filter(Boolean)
      .join(" ") || "Trademark applicant";
  const customerEmail =
    nestedLeadData.stepOne?.emailAddress ||
    "Confirmation sent to the email provided";

  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // The receipt email is sent SERVER-SIDE from /api/nmi/charge, immediately
  // after the payment is confirmed and behind the same idempotency claim that
  // prevents double charging.
  //
  // It used to be sent from here. A useEffect guarded only by localStorage
  // could run twice (re-render, reload, restored tab), so customers received
  // duplicate receipts — and because the total was recalculated in the browser
  // each time, the two copies disagreed. This component now only renders the
  // on-screen receipt.

  return (
    <main className="mx-auto max-w-[720px] overflow-hidden rounded-3xl border border-slate-200 bg-white font-sans shadow-xl shadow-slate-200/50">
      <header className="border-b border-blue-200 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 px-6 py-8 text-slate-950 sm:px-9">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xl font-extrabold tracking-tight text-blue-950">
              Legal Trademark Office<sup className="ml-0.5 text-[9px]">®</sup>
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Trademark preparation services
            </p>
          </div>
          <div className="sm:text-right">
            <span className="inline-flex min-w-[154px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold leading-5 text-emerald-700">
              <HiOutlineCheck className="shrink-0 text-sm" />{" "}
              <span>Payment confirmed</span>
            </span>
            <p className="mt-3 text-xs text-slate-500">Receipt</p>
            <p className="mt-0.5 break-all text-sm font-bold text-blue-950">
              #{receiptId}
            </p>
          </div>
        </div>
      </header>

      <section className="grid gap-5 border-b border-slate-200 bg-slate-50 px-6 py-6 sm:grid-cols-2 sm:px-9">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Prepared for
          </p>
          <p className="mt-2 font-bold text-slate-900">{customerName}</p>
          <p className="mt-1 break-all text-sm text-slate-600">
            {customerEmail}
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Order date
          </p>
          <p className="mt-2 font-bold text-slate-900">{today}</p>
          <p className="mt-1 text-sm text-slate-600">Payment method · Card</p>
        </div>
      </section>

      <section className="px-6 py-7 sm:px-9">
        <div className="mb-4 flex items-center gap-2">
          <HiOutlineDocumentText className="text-xl text-blue-700" />
          <h2 className="font-bold text-slate-900">Order summary</h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between gap-4 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
            <span>Service</span>
            <span>Amount</span>
          </div>
          <div className="flex items-start justify-between gap-4 border-t border-slate-200 px-4 py-4">
            <div>
              <p className="font-bold text-slate-900">
                {packageName} service package
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Trademark application preparation and selected plan services
              </p>
            </div>
            <p className="shrink-0 font-bold text-slate-900">
              ${displayedPackagePrice}.00
            </p>
          </div>
          {addons.map((key) => (
            <div
              key={key}
              className="flex items-center justify-between gap-4 border-t border-slate-200 px-4 py-4 text-sm"
            >
              <p className="font-medium text-slate-700">
                {ADDON_LABELS[key] || key}
              </p>
              <p className="shrink-0 font-bold text-slate-900">
                ${ADD_ON_PRICES[key] || 0}.00
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 ml-auto max-w-sm space-y-3 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>${totalPrice}.00</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Tax</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between border-t-2 border-slate-900 pt-4 text-xl font-extrabold text-slate-950">
            <span>Total paid</span>
            <span>${totalPrice}.00 USD</span>
          </div>
        </div>

        <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-950">
          <strong>USPTO filing fees are not included in this receipt.</strong>{" "}
          The government filing fee is $350 per class and will only be collected
          separately after your classes are reviewed and confirmed.
        </div>
      </section>

      <footer className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-9">
        <p className="flex items-center gap-1.5">
          <HiOutlineLockClosed className="text-base text-emerald-600" /> Secure
          payment confirmation
        </p>
        <p>
          Card statement descriptor:{" "}
          <strong className="text-slate-700">XTARLABS LLC</strong>
        </p>
        <Link
          className="font-semibold text-blue-700"
          href={process.env.NEXT_PUBLIC_APP_URL || "/"}
        >
          legaltrademarkoffice.com
        </Link>
      </footer>
    </main>
  );
};

export default Receipt;
