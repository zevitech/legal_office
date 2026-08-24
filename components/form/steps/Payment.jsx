"use client";

import axios from "axios";
import FormLoader from "@/components/form/FormLoader";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NmiPayment from "@/components/form/NmiPayment";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { trackAddonChange, trackBeginCheckout, getClickIds } from "@/utils/tracking";
import { ADD_ON_PRICES } from "@/constant/pricing";

const CHECKOUT_ADDONS = [
  { key: "rush", title: "Rush preparation", price: ADD_ON_PRICES.rush, description: "Next-business-day preparation. This does not expedite USPTO examination." },
  { key: "monitoring", title: "12-month trademark monitoring", price: ADD_ON_PRICES.monitoring, description: "Automated monitoring alerts for potentially similar new trademark filings." },
  { key: "specimenReview", title: "Specimen readiness review", price: ADD_ON_PRICES.specimenReview, description: "Review of one proof-of-use specimen for common formatting and presentation issues." },
];

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY); -- STRIPE

const Payment = () => {
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const isRushProcessing = selectedAddons.includes("rush");
  const governmentFee = 350;

  // const [clientSecret, setClientSecret] = useState(""); -- STRIPE

  const nestedLeadData = useSelector((state) => state.form);
  const stepFourData = nestedLeadData.stepFour;
  const isLocalPreview = process.env.NODE_ENV !== "production";
  const selectedPackageName = nestedLeadData.stepThree.packageName || "Premium";
  const selectedPackagePrice = nestedLeadData.stepThree.price || 649;

  // Check if payment bypass mode is enabled
  const isBypassMode = process.env.NEXT_PUBLIC_PAYMENT_BYPASS_MODE === "true";

  // If bypass mode is enabled, redirect to Thank You immediately
  useEffect(() => {
    if (isBypassMode) {
      window.location.href = "/trademark-register/thank-you";
    }
  }, [isBypassMode, router]);

  // from the nested object, merge them into one object
  const leadData = useMemo(
    () => Object.assign({}, ...Object.values(nestedLeadData)),
    [nestedLeadData],
  );

  // Filter out properties that are empty or undefined
  const leadDataWithValues = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(leadData).filter(([_, value]) => value !== ""),
      ),
    [leadData],
  );

  // adjust the order items details
  const orderDetails = useMemo(() => {
    const baseDetails = [
      {
        title: `${selectedPackageName} service package`,
        amount: selectedPackagePrice,
      },
    ];

    selectedAddons.forEach((key) => {
      const addon = CHECKOUT_ADDONS.find((item) => item.key === key);
      if (addon) baseDetails.push({ title: addon.title, amount: addon.price });
    });

    // if (stepFourData.govermentFeesAmount !== 0) {
    //   baseDetails.push({
    //     title: "Goverment Fee",
    //     amount: stepFourData.govermentFeesAmount,
    //   });
    // }

    return baseDetails;
  }, [selectedAddons, selectedPackageName, selectedPackagePrice]);

  //count the total and add to total amount into data object
  const totalAmount = orderDetails.reduce(
    (accumulator, current) => accumulator + current.amount,
    0,
  );
  leadDataWithValues.totalAmount = totalAmount;
  leadDataWithValues.zoho_step = 2;

  // 4. Checkout started — the payment form is live with a real total.
  useEffect(() => {
    if (isBypassMode || !totalAmount) return;
    trackBeginCheckout({
      value: totalAmount,
      packageName: selectedPackageName,
      classCount: nestedLeadData.stepTwo.estimatedClassCount,
      addonCount: selectedAddons.length,
    });
  }, [isBypassMode, nestedLeadData.stepTwo.estimatedClassCount, selectedAddons.length, selectedPackageName, totalAmount]);

  // -------------------CHANGES--------------------------------

  // Collect.js returns a one-time payment token; the server charges it and
  // recalculates the amount from the selected package (never trusts the client).
  const handleToken = async (paymentToken, billing) => {
    setIsProcessing(true);
    setPaymentError("");

    try {
      const description = `Trademark order for ${billing.firstName} ${billing.lastName}. Receipt ID: ${stepFourData?.receipt_ID || "N/A"}`;

      const { data: charge } = await axios.post("/api/nmi/charge", {
        paymentToken,
        packageName: selectedPackageName,
        isRushProcessing,
        addons: selectedAddons,
        firstName: billing.firstName,
        lastName: billing.lastName,
        email: billing.email || leadDataWithValues.emailAddress,
        zip: billing.zip,
        description,
        company: leadDataWithValues.organizationName || leadDataWithValues.companyName || "",
        markName: leadDataWithValues.name || leadDataWithValues.slogan || "Trademark application",
        markType: Array.isArray(leadDataWithValues.protectionTypes) ? leadDataWithValues.protectionTypes.join(", ") : (leadDataWithValues.wantToProtect || "Word mark"),
        applicationDetails: {
          protectionTypes: leadDataWithValues.protectionTypes,
          slogan: leadDataWithValues.slogan,
          logoColors: leadDataWithValues.logoColors,
          logoProtectionDescription: leadDataWithValues.logoProtectionDescription,
          soundDescription: leadDataWithValues.soundDescription,
          soundFileName: leadDataWithValues.soundFileName,
          trademarkCurrentlyBeingUsed: leadDataWithValues.trademarkCurrentlyBeingUsed,
          firstAnywhereDate: leadDataWithValues.firstAnywhereDate,
          firstCommenceDate: leadDataWithValues.firstCommenceDate,
          ownerType: leadDataWithValues.selectedOwnerType,
          organizationType: leadDataWithValues.organizationType || leadDataWithValues.selectedFormationType,
          stateFormation: leadDataWithValues.stateFormation,
          countryFormation: leadDataWithValues.countryFormation,
          organizationPosition: leadDataWithValues.organizationPosition,
          selectedActivities: leadDataWithValues.selectedActivities,
          trademarkClassification: leadDataWithValues.trademarkClassification,
          estimatedClassCount: nestedLeadData.stepTwo.estimatedClassCount,
          reviewPreference: leadDataWithValues.reviewPreference,
        },
        billingProfile: {
          name: `${billing.firstName || leadDataWithValues.firstName || ""} ${billing.lastName || leadDataWithValues.lastName || ""}`.trim(),
          email: billing.email || leadDataWithValues.emailAddress || "",
          phone: leadDataWithValues.phoneNumber || "",
          address1: leadDataWithValues.address || "",
          city: leadDataWithValues.city || "",
          state: leadDataWithValues.state || "",
          zip: billing.zip || leadDataWithValues.zipCode || "",
          country: "United States",
        },
        acceptedTerms: billing.acceptedTerms,
        savePaymentMethod: billing.savePaymentMethod,
        attorneyChargeConsent: billing.attorneyChargeConsent,
      });

      if (!charge?.success) {
        setPaymentError(charge?.message || "Payment declined, please try again.");
        setIsProcessing(false);
        return;
      }

      // Hand the confirmed transaction to the thank-you page so it can fire
      // lto_purchase with the real, permanent transaction id.
      try {
        sessionStorage.setItem(
          "lto_completed_order",
          JSON.stringify({
            transactionId: charge.transactionId,
            value: charge.amount ?? totalAmount,
            packageName: selectedPackageName,
            addons: selectedAddons,
            classCount: nestedLeadData.stepTwo.estimatedClassCount || 0,
            portalProvisioned: Boolean(charge.portalProvisioned),
            portalNewlyCreated: Boolean(charge.portalNewlyCreated),
            portalEmail: billing.email || leadDataWithValues.emailAddress || "",
          }),
        );
      } catch {
        // Non-fatal: storage unavailable just means no purchase event.
      }

      // Payment captured — now persist the lead to mail/CRM.
      const paidLeadData = {
        ...leadDataWithValues,
        is_paid: true,
        zoho_step: 4,
        payment_method: "NMI",
        transaction_id: charge.transactionId,
        isRushProcessing,
        rushAmount: isRushProcessing ? ADD_ON_PRICES.rush : 0,
        addons: selectedAddons,
        ...getClickIds(), // gclid / wbraid / gbraid for attribution
      };

      try {
        const res = await axios.post(endPoint, paidLeadData);
        if (res.data.success) {
          window.location.href = "/trademark-register/thank-you";
          return;
        }
        throw new Error("save-data returned an unsuccessful response");
      } catch (err) {
        console.log("Error sending data to save-data endpoint: ", err);
        // The card was charged — never make the user pay again.
        alert(
          "Payment Successful. But something went wrong saving your details, please contact support.",
        );
        window.location.href = "/trademark-register/thank-you";
      }
    } catch (err) {
      console.log("Error processing NMI payment:", err);
      setPaymentError(
        err?.response?.data?.message || "Checkout failed, please try again.",
      );
      setIsProcessing(false);
    }
  };

  // --------------------------------------------------------

  // send the data to mail and zoho
  const endPoint = "/api/save-data";
  // Removed problematic useEffect that was sending data before payment completion
  // Data is now only sent after successful payment in onApprove function

  // initialize the payment
  // useEffect(() => {
  //   setIsLoading(true);
  //   const description = `Payment from ${nestedLeadData?.stepOne?.firstName} ${nestedLeadData?.stepOne?.lastName}. And receipt ID is ${nestedLeadData?.stepFour?.receipt_ID}`;

  //   if (totalAmount > 1) {
  //     axios
  //       .post("/api/stripe", { amount: totalAmount, description })
  //       .then((res) => {
  //         setClientSecret(res?.data?.paymentIntent?.client_secret);
  //       })
  //       .catch((err) => {
  //         console.log("Error processing stripe: ", err);
  //         setPaymentError(err.message);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   }
  // }, [totalAmount, nestedLeadData]);  -- STRIPE

  // page authorization | redirect if previous step has no data
  if (!isLocalPreview && Object.keys(stepFourData).length === 0) {
    window.location.href =
      process.env.NEXT_PUBLIC_APP_URL + "/trademark-register";
  }

  // If bypass mode is enabled, component will redirect; render nothing here
  if (isBypassMode) {
    return null;
  }

  return (
    <section className="system-page-standard-layout flex flex-col gap-4" aria-labelledby="checkout-heading">
      <FormLoader
        isVisible={isProcessing}
        message="Processing your payment..."
        subMessage="Do not close or refresh this page. This can take a few seconds."
      />
      <div className="mb-8 w-full">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary-theme">Secure checkout</p>
        <h1 id="checkout-heading" className="mt-2 w-full font-inria text-3xl font-bold text-heading-color sm:text-4xl">
          Review and complete your order
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          Confirm your services and payment details. Only the service total shown below is charged today.
        </p>
      </div>

      <section className="grid h-full w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        {/* PAYMENT GATEWAY INTEGRATION WILL COME HERE */}

        {/* STRIPE */}
        {/* <div className="bg-white p-8 max-md:px-5 max-md:py-7 border-t-2 border-t-indigo-700 flex flex-col gap-3 mb-6">
          {clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              {isLoading ? (
                <div className="w-full h-20 flex-center">
                  <FaSpinner className=" animate-spin font-bold text-5xl text-slate-900" />
                </div>
              ) : (
                <StripePayment loading={isLoading} em={paymentError} />
              )}
            </Elements>
          ) : (
            <div className="w-full h-20 flex-center">
              <FaSpinner className=" animate-spin font-bold text-5xl text-slate-900" />
            </div>
          )}
        </div> */}

        {/* NMI — CARD PAYMENT */}
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 border-t-4 border-t-indigo-700 bg-white p-4 shadow-sm sm:p-8">
          {isLocalPreview && (
            <div className="mb-4 rounded-2xl border border-violet-200 bg-violet-50 p-4 text-sm text-violet-950">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="font-bold">Local checkout testing</p><p className="mt-1 text-xs leading-5">Test Visa: <strong>4111 1111 1111 1111</strong> · Exp: <strong>12/30</strong> · CVV: <strong>123</strong> · ZIP: <strong>10001</strong>. Submission works only when the secure payment account is in test mode.</p></div>
                <button type="button" onClick={() => { sessionStorage.setItem("lto_demo_order", JSON.stringify({ transactionId: "DEMO-649-2026", value: totalAmount, packageName: selectedPackageName, addons: selectedAddons, classCount: nestedLeadData.stepTwo.estimatedClassCount || 0 })); window.location.href = "/trademark-register/thank-you"; }} className="shrink-0 rounded-xl bg-violet-700 px-4 py-3 text-xs font-bold text-white">Preview successful order</button>
              </div>
            </div>
          )}
          <NmiPayment
            onToken={handleToken}
            totalAmount={totalAmount}
            isProcessing={isProcessing}
            errorMessage={paymentError}
            allowSavePaymentMethod
            initialBilling={{
              firstName: nestedLeadData.stepOne.firstName || "",
              lastName: nestedLeadData.stepOne.lastName || "",
              email: nestedLeadData.stepOne.emailAddress || "",
              zip: nestedLeadData.stepOne.zipCode || "",
            }}
          />
        </div>

        <div className="w-full flex items-start justify-center">
          <Card className="w-full max-w-[480px] rounded-2xl border border-slate-200 py-4 shadow-sm lg:sticky lg:top-24">
            <CardHeader className="w-full flex items-center justify-center">
              <h1 className="md:text-[24px] text-[20px] font-inria font-bold text-heading-color">
                My Order Details
              </h1>
            </CardHeader>
            <Divider />
            <CardBody className="w-full flex flex-col gap-6 p-8">
              <div>
                <div className="mb-3 flex items-center justify-between"><h2 className="font-bold text-slate-900">Optional services</h2><span className="text-xs text-slate-500">Add or remove</span></div>
                <div className="flex flex-col gap-3">
                  {CHECKOUT_ADDONS.map((addon) => {
                    const selected = selectedAddons.includes(addon.key);
                    return <label key={addon.key} className={`cursor-pointer rounded-xl border-2 p-4 transition ${selected ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white hover:border-blue-300"}`}>
                      <div className="flex items-start gap-3"><input type="checkbox" checked={selected} onChange={() => { trackAddonChange({ addonKey: addon.key, addonValue: addon.price, selected: !selected }); setSelectedAddons((current) => selected ? current.filter((key) => key !== addon.key) : [...current, addon.key]); }} className="mt-1 h-4 w-4" /><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><span className="font-semibold text-slate-900">{addon.title}</span><span className="whitespace-nowrap font-bold text-slate-900">+${addon.price}</span></div><p className="mt-1 text-xs leading-5 text-slate-600">{addon.description}</p></div></div>
                    </label>;
                  })}
                </div>
              </div>
              {orderDetails.map(({ title, amount }, index) => (
                <React.Fragment key={`${title}-${index}`}>
                  <div className="w-full flex items-center justify-between md:text-[16px] text-[14px]">
                    <p className="text-heading-color">{title}:</p>
                    <p>${amount}</p>
                  </div>
                  <Divider />
                </React.Fragment>
              ))}

              <div className="w-full flex items-center justify-between md:text-[20px] text-[16px]">
                <p className="font-bold text-heading-color">Charged today:</p>
                <p className="font-bold">${totalAmount}.00</p>
              </div>
              <Divider />
              <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-950">
                <div className="flex justify-between font-semibold">
                  <span>USPTO government fee</span>
                  <span>${governmentFee} per class</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed">
                  Separate from all service plans and not charged today. Your attorney will confirm the appropriate classes and obtain authorization before filing.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </section>
  );
};

export default Payment;
