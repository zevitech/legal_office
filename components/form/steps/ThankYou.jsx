"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { MdOutlineCall } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import { HiOutlineCalendar, HiOutlineCheck, HiOutlineClipboardCheck, HiOutlineMail } from "react-icons/hi";
import { LuShieldCheck } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Receipt from "@/components/form/Receipt";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import { trackPurchase } from "@/utils/tracking";

const ThankYou = () => {
  const router = useRouter();
  const receiptRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const isLocalPreview = process.env.NODE_ENV !== "production";
  const isRehydrated = useSelector((state) => state.form._persist?.rehydrated);
  const nestedLeadData = useSelector((state) => state.form);
  const storedStepFour = useMemo(
    () => nestedLeadData.stepFour || {},
    [nestedLeadData.stepFour],
  );
  const isBypassMode = process.env.NEXT_PUBLIC_PAYMENT_BYPASS_MODE === "true";
  const paymentBypass = storedStepFour.payment_bypass;

  useEffect(() => {
    try {
      const demo = sessionStorage.getItem("lto_demo_order");
      const paid = sessionStorage.getItem("lto_completed_order");
      setCompletedOrder(JSON.parse(demo || paid || "null"));
    } catch {
      setCompletedOrder(null);
    }
  }, []);

  const isDemo = isLocalPreview || !!completedOrder?.transactionId?.startsWith("DEMO-");

  const resolvedReceiptId =
    completedOrder?.transactionId || storedStepFour.receipt_ID || "";

  // On the live site an order we cannot identify must never be dressed up with
  // placeholder values — a customer would see a receipt number and an amount
  // that do not exist. Only the local preview may fall back to demo data.
  const isOrderUnavailable = !isLocalPreview && !resolvedReceiptId;

  const packageName =
    completedOrder?.packageName ||
    nestedLeadData.stepThree?.packageName ||
    (isLocalPreview ? "Premium" : "");
  const totalPrice =
    completedOrder?.value ||
    nestedLeadData.stepThree?.price ||
    (isLocalPreview ? 649 : 0);
  const receiptId =
    resolvedReceiptId || (isLocalPreview ? "DEMO-649-2026" : "");
  const customerName = [
    nestedLeadData.stepOne?.firstName,
    nestedLeadData.stepOne?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    if (isDemo || isBypassMode || paymentBypass || !completedOrder?.transactionId) return;
    trackPurchase({
      transactionId: completedOrder.transactionId,
      value: completedOrder.value,
      packageName: completedOrder.packageName,
      classCount: completedOrder.classCount,
      addons: completedOrder.addons,
    });
  }, [completedOrder, isBypassMode, isDemo, paymentBypass]);

  useEffect(() => {
    if (isLocalPreview || !isRehydrated) return;
    if (!storedStepFour || Object.keys(storedStepFour).length === 0) {
      router.replace(process.env.NEXT_PUBLIC_APP_URL + "/trademark-register");
    }
  }, [isLocalPreview, isRehydrated, router, storedStepFour]);

  const handleDownload = async () => {
    setIsLoading(true);
    let printableReceipt;
    try {
      // Render a stable desktop-width copy so downloads stay legible even when
      // the customer saves the receipt from a narrow phone viewport.
      printableReceipt = receiptRef.current.cloneNode(true);
      printableReceipt.style.position = "fixed";
      printableReceipt.style.left = "-10000px";
      printableReceipt.style.top = "0";
      printableReceipt.style.width = "720px";
      printableReceipt.style.maxWidth = "720px";
      printableReceipt.style.background = "#f8fafc";
      printableReceipt.style.padding = "24px";
      document.body.appendChild(printableReceipt);

      const canvas = await html2canvas(printableReceipt, {
        backgroundColor: "#f8fafc",
        scale: 2,
        width: 768,
        windowWidth: 768,
        useCORS: true,
      });
      const imageData = canvas.toDataURL("image/png");
      const blob = await fetch(imageData).then((response) => response.blob());
      saveAs(blob, `LTO-receipt-${receiptId}.png`);
    } finally {
      printableReceipt?.remove();
      setIsLoading(false);
    }
  };

  if (!isRehydrated && !isLocalPreview) return null;

  // Order details could not be recovered (e.g. storage cleared, different
  // device). Never invent a receipt — point the customer at support instead.
  if (isOrderUnavailable) {
    return (
      <main className="min-h-screen bg-slate-50 py-10 sm:py-16">
        <section className="mx-auto w-[92%] max-w-xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-3xl text-emerald-600">
              <HiOutlineCheck />
            </span>
            <h1 className="mt-5 font-inria text-2xl font-bold text-heading-color">
              Thank you — your request has been received
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              We could not display your order details on this device. This does
              not affect your application. If your payment went through, you
              will receive a confirmation email with your receipt shortly.
            </p>
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <p className="font-semibold text-slate-900">
                Need your order details now?
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href="tel:+13104244909"
                  className="flex items-center justify-center gap-2 font-semibold text-primary-theme hover:underline"
                >
                  <MdOutlineCall className="text-base" /> +1 (310) 424-4909
                </a>
                <a
                  href="mailto:support@legaltrademarkoffice.com"
                  className="flex items-center justify-center gap-2 break-all font-semibold text-primary-theme hover:underline"
                >
                  <HiOutlineMail className="shrink-0 text-base" />
                  support@legaltrademarkoffice.com
                </a>
              </div>
            </div>
            <p className="mt-6 text-sm">
              <Link href="/" className="font-semibold text-primary-theme">
                Return to Legal Trademark Office
              </Link>
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <section className="mx-auto w-[92%] max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <div className="border-b border-slate-200 bg-white px-5 py-8 sm:px-10 sm:py-10">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-emerald-50 text-3xl text-emerald-600 ring-8 ring-emerald-50/50">
                <HiOutlineCheck />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-600">
                  Payment received
                </p>
                <h1 className="mt-1 font-inria text-2xl font-bold leading-tight text-heading-color sm:text-[32px]">
                  Your trademark application is confirmed
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Thanks{customerName ? `, ${customerName}` : ""}. Your order is
                  in our review queue and a filing specialist will contact you to
                  confirm the details before anything is submitted to the USPTO.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Order reference
                </p>
                <p className="mt-0.5 font-bold text-slate-900">{receiptId}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Package
                </p>
                <p className="mt-0.5 font-bold text-slate-900">{packageName}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Paid today
                </p>
                <p className="mt-0.5 font-bold text-slate-900">
                  ${Number(totalPrice).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 sm:ml-auto sm:self-center">
                <LuShieldCheck className="text-base" /> Confirmation email sent
              </div>
            </div>
          </div>

          {isDemo && <div className="border-b border-violet-200 bg-violet-50 px-5 py-3 text-center text-xs font-semibold text-violet-800">Demo preview only — no card was charged, no email was sent and no purchase conversion was recorded.</div>}

          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                What happens next
              </h2>

              {/* Vertical timeline — communicates sequence better than cards */}
              <ol className="mt-4">
                {[
                  {
                    icon: HiOutlineClipboardCheck,
                    title: "Application review",
                    copy: "We check your mark, owner details and business activities for anything that could delay approval.",
                    when: "Within 1 business day",
                  },
                  {
                    icon: HiOutlineCalendar,
                    title: "Classification consultation",
                    copy: "Your filing specialist confirms the correct USPTO classes and the filing strategy with you.",
                    when: "1–2 business days",
                  },
                  {
                    icon: HiOutlineMail,
                    title: "Your approval, then filing",
                    copy: "You review the final application and pay the separate USPTO fee. Nothing is filed without your sign-off.",
                    when: "After your approval",
                  },
                ].map((step, index, all) => {
                  const Icon = step.icon;
                  const isLast = index === all.length - 1;
                  return (
                    <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
                      {!isLast && (
                        <span
                          aria-hidden
                          className="absolute left-[19px] top-11 h-[calc(100%-2.25rem)] w-px bg-slate-200"
                        />
                      )}
                      <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-blue-100 bg-blue-50 text-lg text-primary-theme">
                        <Icon />
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <h3 className="font-semibold text-slate-900">
                            {step.title}
                          </h3>
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                            {step.when}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-5 text-slate-600">
                          {step.copy}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={handleDownload}
                  isLoading={isLoading}
                  startContent={<FaDownload />}
                  className="h-12 flex-1 rounded-xl bg-primary-theme px-5 font-bold text-white"
                >
                  Download receipt
                </Button>
                <a
                  href="tel:+13104244909"
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 font-semibold text-slate-700 transition hover:border-primary-theme hover:text-primary-theme"
                >
                  <MdOutlineCall /> Call (310) 424-4909
                </a>
              </div>
            </div>

            <aside className="flex h-fit flex-col gap-4">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-bold text-amber-900">
                  USPTO fees are separate
                </p>
                <p className="mt-1 text-xs leading-5 text-amber-950">
                  The government filing fee is <strong>$350 per class</strong>.
                  It is not included in the amount above and is only collected
                  once your final classes are confirmed with you.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-bold text-slate-900">
                  Questions about your order?
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Our team is available Monday to Friday, 9am–6pm PT.
                </p>
                <div className="mt-4 flex flex-col gap-2.5 text-sm">
                  <a
                    href="tel:+13104244909"
                    className="flex items-center gap-2 font-semibold text-primary-theme hover:underline"
                  >
                    <MdOutlineCall className="text-base" /> +1 (310) 424-4909
                  </a>
                  <a
                    href="mailto:support@legaltrademarkoffice.com"
                    className="flex items-center gap-2 break-all font-semibold text-primary-theme hover:underline"
                  >
                    <HiOutlineMail className="text-base shrink-0" />
                    support@legaltrademarkoffice.com
                  </a>
                </div>
                <p className="mt-4 border-t border-slate-200 pt-3 text-[11px] leading-4 text-slate-500">
                  Quote your order reference <strong>{receiptId}</strong> when
                  you get in touch.
                </p>
              </div>
            </aside>
          </div>
        </div>

        <div className="mt-8" ref={receiptRef}><Receipt completedOrder={completedOrder} /></div>
        <p className="mt-6 text-center text-sm text-slate-500"><Link href="/" className="font-semibold text-blue-700">Return to Legal Trademark Office</Link></p>
      </section>
    </main>
  );
};

export default ThankYou;
