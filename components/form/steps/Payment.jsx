"use client";

import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NmiPayment from "@/components/form/NmiPayment";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { trackBeginCheckout, getClickIds } from "@/utils/tracking";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY); -- STRIPE

const Payment = () => {
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // const [clientSecret, setClientSecret] = useState(""); -- STRIPE

  const nestedLeadData = useSelector((state) => state.form);
  const stepFourData = nestedLeadData.stepFour;

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
        title: "Trademark registration",
        amount: nestedLeadData.stepThree.price,
      },
      { title: "Comprehensive Trademark Search", amount: 0 },
      { title: "Trademark monitoring", amount: 0 },
      { title: "Office Action Response", amount: 0 },
    ];

    if (stepFourData.rushAmount !== 0) {
      baseDetails.push({
        title: "Rush processing",
        amount: stepFourData.rushAmount,
      });
    }

    // if (stepFourData.govermentFeesAmount !== 0) {
    //   baseDetails.push({
    //     title: "Goverment Fee",
    //     amount: stepFourData.govermentFeesAmount,
    //   });
    // }

    return baseDetails;
  }, [nestedLeadData, stepFourData]);

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
    trackBeginCheckout(totalAmount);
  }, [isBypassMode, totalAmount]);

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
        packageName: nestedLeadData.stepThree.packageName,
        isRushProcessing: stepFourData.rushAmount > 0,
        firstName: billing.firstName,
        lastName: billing.lastName,
        email: billing.email || leadDataWithValues.emailAddress,
        zip: billing.zip,
        description,
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
          }),
        );
      } catch {
        // Non-fatal: storage unavailable just means no purchase event.
      }

      // Payment captured — now persist the lead to mail/CRM.
      const paidLeadData = {
        ...leadDataWithValues,
        is_paid: true,
        zoho_step: 3,
        payment_method: "NMI",
        transaction_id: charge.transactionId,
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
  if (Object.keys(stepFourData).length === 0) {
    window.location.href =
      process.env.NEXT_PUBLIC_APP_URL + "/trademark-register";
  }

  // If bypass mode is enabled, component will redirect; render nothing here
  if (isBypassMode) {
    return null;
  }

  return (
    <main className="system-page-standard-layout flex flex-col gap-4">
      <div className="w-full flex flex-col gap-1 mb-10">
        <h1 className="font-inria text-heading-color md:text-[24px] text-[20px] w-full">
          CONFIRM, ORDER & PAY
        </h1>
        <p className="md:text-[16px] text-[12px] md:leading-[18px] leading-[14px]">
          Please enter your payment details below to complete your Trademark
          order. Once completed, our experts will immediately begin reviewing
          and processing your submission.
        </p>
      </div>

      <section className="w-full h-full grid md:grid-cols-2 grid-cols-1 gap-4">
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
        <div className="bg-white p-8 max-md:px-5 max-md:py-7 border-t-2 border-t-indigo-700 flex flex-col gap-3 mb-6">
          <NmiPayment
            onToken={handleToken}
            totalAmount={totalAmount}
            isProcessing={isProcessing}
            errorMessage={paymentError}
          />
        </div>

        <div className="w-full flex items-start justify-center">
          <Card className="w-[400px] py-4 rounded-[4px] max-md:shadow-none max-md:border">
            <CardHeader className="w-full flex items-center justify-center">
              <h1 className="md:text-[24px] text-[20px] font-inria font-bold text-heading-color">
                My Order Details
              </h1>
            </CardHeader>
            <Divider />
            <CardBody className="w-full flex flex-col gap-6 p-8">
              {orderDetails.map(({ title, amount }, index) => (
                <>
                  <div className="w-full flex items-center justify-between md:text-[16px] text-[14px]">
                    <h1 className="text-heading-color">{title}:</h1>
                    <p>${amount}</p>
                  </div>
                  <Divider />
                </>
              ))}

              <div className="w-full flex items-center justify-between md:text-[20px] text-[16px]">
                <h1 className="font-bold text-heading-color">Total Amount:</h1>
                <p className="font-bold">${totalAmount}.00</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Payment;
