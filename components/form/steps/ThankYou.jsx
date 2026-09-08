"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { MdOutlineCall } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import {
  HiOutlineCalendar,
  HiOutlineCheck,
  HiOutlineClipboardCheck,
  HiOutlineMail,
} from "react-icons/hi";
import { LuShieldCheck } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Receipt from "@/components/form/Receipt";
import { useSelector } from "react-redux";
import { trackPurchase } from "@/utils/tracking";

const ThankYou = () => {
  const router = useRouter();
  const receiptRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [activating, setActivating] = useState(false);
  const [activationError, setActivationError] = useState("");
  const [downloadError, setDownloadError] = useState("");
  const [orderLoaded, setOrderLoaded] = useState(false);
  const isLocalPreview = process.env.NODE_ENV !== "production";
  const isRehydrated = useSelector((state) => state.form._persist?.rehydrated);
  const nestedLeadData = useSelector((state) => state.form);
  const storedStepFour = useMemo(
    () => nestedLeadData.stepFour || {},
    [nestedLeadData.stepFour],
  );
  const isBypassMode = isLocalPreview && process.env.NEXT_PUBLIC_PAYMENT_BYPASS_MODE === "true";
  const paymentBypass = storedStepFour.payment_bypass;

  useEffect(() => {
    try {
      const demo = sessionStorage.getItem("lto_demo_order");
      const paid = sessionStorage.getItem("lto_completed_order");
      setCompletedOrder(JSON.parse((isLocalPreview ? demo || paid : paid) || "null"));
    } catch {
      setCompletedOrder(null);
    } finally {
      setOrderLoaded(true);
    }
  }, [isLocalPreview]);

  const isDemo =
    isLocalPreview || !!completedOrder?.transactionId?.startsWith("DEMO-");
  const resolvedReceiptId =
    completedOrder?.transactionId || "";

  // On the live site an order we cannot identify must never be dressed up with
  // placeholder values — a customer would see a receipt number and an amount
  // that do not exist. Only the local preview may fall back to demo data.
  const isOrderUnavailable = !isLocalPreview && (!resolvedReceiptId || isDemo || !Number.isFinite(completedOrder?.value) || completedOrder.value <= 0);

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
  const customerName =
    [nestedLeadData.stepOne?.firstName, nestedLeadData.stepOne?.lastName]
      .filter(Boolean)
      .join(" ") || "Your application";
  const portalEmail =
    completedOrder?.portalEmail ||
    nestedLeadData.stepOne?.emailAddress ||
    nestedLeadData.stepOne?.email ||
    "your checkout email";
  const existingPortal =
    completedOrder?.portalProvisioned &&
    completedOrder?.portalNewlyCreated === false;
  const portalReady = isDemo || completedOrder?.portalProvisioned === true;

  useEffect(() => {
    if (
      isDemo ||
      isBypassMode ||
      paymentBypass ||
      !completedOrder?.transactionId
    )
      return;
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

  /**
   * Mints a fresh single-use setup link and sends the customer straight to the
   * password page. Doing this on click (rather than embedding a code in the
   * page) means the button still works if they come back later, and no reset
   * token is left sitting in the URL after checkout.
   */
  const handleActivatePortal = async () => {
    if (isDemo) {
      setActivationError("Demo only: no account is created. After a real payment, this button opens secure password setup.");
      return;
    }
    if (activating) return;
    setActivating(true);
    setActivationError("");
    try {
      const response = await fetch("/api/auth/activation-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionId: completedOrder?.transactionId || "",
          email: completedOrder?.portalEmail || "",
        }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.setupUrl) {
        // Surface the server's own reason — it explains what to do next.
        setActivationError(
          payload.error ||
            "We could not open your portal setup. Please use the link in your confirmation email.",
        );
        setActivating(false);
        return;
      }
      window.location.href = payload.setupUrl;
    } catch {
      setActivationError(
        "We could not reach the server. Check your connection, or use the link in your confirmation email.",
      );
      setActivating(false);
    }
  };

  const handleDownload = async () => {
    if (isLoading || !receiptRef.current) return;
    setIsLoading(true);
    setDownloadError("");
    try {
      const { downloadReceipt } = await import("../downloadReceipt");
      await downloadReceipt({ order: completedOrder, packageName, total: totalPrice, receiptId, customerName, email: portalEmail === "your checkout email" ? "" : portalEmail, demo: isDemo });
    } catch {
      setDownloadError("Receipt download failed. Please try again or contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!orderLoaded || (!isRehydrated && !isLocalPreview)) return null;

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
              We couldn’t confirm your order on this device
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              We could not display your order details on this device. This does
              not mean your payment failed. Please do not pay again until you check your confirmation email or contact us. If your payment went through, you
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
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 px-5 py-6 text-center text-white sm:px-10 sm:py-10">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-2xl text-emerald-600 shadow-lg sm:h-20 sm:w-20 sm:text-4xl">
              <HiOutlineCheck />
            </div>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-100 sm:mt-6 sm:text-sm">
              Order confirmed
            </p>
            <h1 className="mt-2 font-inria text-3xl font-bold sm:text-5xl">
              Thank you—your order is received.
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-emerald-50 sm:text-base">
              {customerName} is now in our review queue. A member of the team
              will contact you to confirm the application details and next
              steps.
            </p>
          </div>

          {isDemo && (
            <div className="border-b border-violet-200 bg-violet-50 px-5 py-3 text-center text-xs font-semibold text-violet-800">
              Demo preview only — no card was charged, no email was sent and no
              purchase conversion was recorded.
            </div>
          )}

          <section className="mx-5 mt-6 overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-5 shadow-sm sm:mx-8 sm:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#006fbd]">
                  <LuShieldCheck className="text-lg" /> Your next step
                </div>
                <h2 className="mt-4 font-inria text-2xl font-bold text-slate-950 sm:text-3xl">
                  {!portalReady ? "Your portal setup is pending" : existingPortal
                    ? "Your new trademark is now in your portal"
                    : "Activate your private client portal"}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                  {!portalReady ? <span>Your payment is complete. Portal access is still being prepared. Please contact us if you need help accessing your application.</span> : existingPortal ? (
                    <>
                      Sign in with <b>{portalEmail}</b> to view this trademark
                      alongside your current matters.
                    </>
                  ) : (
                    <>
                      Create your password now to access your application. Your
                      portal username is <b className="break-all">{portalEmail}</b>. {isDemo ? "This preview does not create an account or send an email." : "We have also emailed you a secure setup link so you can do this later."}
                    </>
                  )}
                </p>
                {!existingPortal && (
                  <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
                    For security, temporary passwords are never displayed or
                    emailed.
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                  {[
                    "Track filing progress",
                    "View attorney requests",
                    "Manage documents and appointments",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full shrink-0 lg:w-auto">
                {!portalReady ? <Link href="/portal-login" className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-[#006fbd] px-7 py-4 font-bold text-white">Go to portal login</Link> : existingPortal ? (
                  <Link
                    href="/portal-login"
                    className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-[#006fbd] px-7 py-4 text-center text-base font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-[#005fa3] focus:outline-none focus:ring-4 focus:ring-blue-200 lg:w-auto"
                  >
                    Open my client portal
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleActivatePortal}
                    disabled={activating}
                    className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-[#006fbd] px-7 py-4 text-center text-base font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-[#005fa3] focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70 lg:w-auto"
                  >
                    {activating
                      ? "Opening secure setup…"
                      : isDemo ? "Preview portal setup" : "Create my password"}
                  </button>
                )}
                {activationError ? (
                  <p
                    role="alert"
                    className="mt-2 max-w-xs text-center text-xs font-semibold leading-5 text-red-700"
                  >
                    {activationError}
                  </p>
                ) : (
                  <p className="mt-2 text-center text-xs font-medium text-slate-500">
                    Secure access to your trademark workspace
                  </p>
                )}
              </div>
            </div>
          </section>

          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                What happens next
              </h2>
              <div className="mt-5 flex flex-col gap-4">
                {[
                  {
                    icon: HiOutlineClipboardCheck,
                    title: "Application review",
                    copy: "We review your trademark, owner details, business activities and selected package.",
                  },
                  {
                    icon: HiOutlineCalendar,
                    title: "Classification consultation",
                    copy: "Your attorney or assigned filing professional confirms the appropriate classes and filing approach.",
                  },
                  {
                    icon: HiOutlineMail,
                    title: "Approval before filing",
                    copy: "You receive the final filing details and separate USPTO fees before submission.",
                  },
                ].map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.title}
                      className="flex gap-4 rounded-2xl border border-slate-200 p-4"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-xl text-blue-700">
                        <Icon />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                          Step {index + 1}
                        </p>
                        <h3 className="mt-1 font-bold text-slate-900">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-5 text-slate-600">
                          {step.copy}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:+13104244909"
                  className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-blue-600 px-5 font-bold text-blue-700"
                >
                  <MdOutlineCall /> Call (310) 424-4909
                </a>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <LuShieldCheck className="text-xl" /> Secure order summary
              </div>
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Order reference</span>
                  <strong className="text-right text-slate-900">
                    {receiptId}
                  </strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Service package</span>
                  <strong className="text-right text-slate-900">
                    {packageName}
                  </strong>
                </div>
                <div className="flex justify-between gap-4 border-t border-slate-200 pt-4">
                  <span className="font-semibold text-slate-700">
                    Paid today
                  </span>
                  <strong className="text-lg text-slate-950">
                    ${Number(totalPrice).toFixed(2)}
                  </strong>
                </div>
              </div>
              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-950">
                <strong>USPTO fees are separate.</strong> The government filing
                fee is $350 per class. Final classes and authorization are
                confirmed before filing.
              </div>
              <Button
                onClick={handleDownload}
                isLoading={isLoading}
                startContent={<FaDownload />}
                variant="bordered"
                className="mt-4 h-11 w-full rounded-xl border-slate-300 bg-white font-bold text-slate-700"
              >
                Download receipt PDF
              </Button>
              {downloadError && <p role="alert" className="mt-2 text-sm text-red-700">{downloadError}</p>}
            </aside>
          </div>
        </div>

        <div
          ref={receiptRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-[-10000px] top-0 w-[720px]"
        >
          <Receipt completedOrder={completedOrder} />
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          <Link href="/" className="font-semibold text-blue-700">
            Return to Legal Trademark Office
          </Link>
        </p>
      </section>
    </main>
  );
};

export default ThankYou;
