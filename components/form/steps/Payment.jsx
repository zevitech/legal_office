"use client";

import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa6";
import StripePayment from "../StripePayment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import NormalLabel from "@/components/form/NormalLabel";
import React, { useEffect, useMemo, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const router = useRouter();
  const [isDataSent, setIsDataSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const nestedLeadData = useSelector((state) => state.form);
  const stepFourData = nestedLeadData.stepFour;

  // from the nested object, merge them into one object
  const leadData = useMemo(
    () => Object.assign({}, ...Object.values(nestedLeadData)),
    [nestedLeadData]
  );

  // Filter out properties that are empty or undefined
  const leadDataWithValues = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(leadData).filter(([_, value]) => value !== "")
      ),
    [leadData]
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

    return baseDetails;
  }, [nestedLeadData, stepFourData]);

  //count the total and add to total amount into data object
  const totalAmount = orderDetails.reduce(
    (accumulator, current) => accumulator + current.amount,
    0
  );
  leadDataWithValues.totalAmount = totalAmount;
  leadDataWithValues.zoho_step = 2;

  // send the data to mail and zoho
  const endPoint = process.env.NEXT_PUBLIC_API_URL + "/save-data";
  useEffect(() => {
    const sendData = async () => {
      if (isDataSent) return; // Prevent multiple sends

      try {
        await axios.post(endPoint, leadDataWithValues);
        setIsDataSent(true); // Mark as sent
      } catch (err) {
        console.log("Error sending mail in payment page: ", err);
        alert("Something went wrong, Check your network or Please try again.");
      }
    };

    sendData();
  }, [isDataSent, leadDataWithValues, endPoint]);

  // initialize the payment
  useEffect(() => {
    setIsLoading(true);
    const description = `Payment from ${nestedLeadData?.stepOne?.firstName} ${nestedLeadData?.stepOne?.lastName}. And receipt ID is ${nestedLeadData?.stepFour?.receipt_ID}`;

    axios
      .post("/api/stripe", { amount: totalAmount, description })
      .then((res) => {
        setClientSecret(res?.data?.paymentIntent?.client_secret);
      })
      .catch((err) => {
        console.log("Error processing stripe: ", err);
        setPaymentError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalAmount, nestedLeadData]);

  // page authorization | redirect if previous step has no data
  if (Object.keys(stepFourData).length === 0) {
    return router.push(process.env.NEXT_PUBLIC_APP_URL + "/trademark-register");
  }

  return (
    <div className="px-16 mt-16 mb-14 max-sm:px-2 max-md:mt-12 max-md:mb-8">
      <div className="flex flex-col gap-3 mb-8 w-[800px] max-md:w-auto max-sm:px-4">
        <h1 className="text-[#03589c] font-semibold text-4xl max-md:text-3xl">
          Confirm order and pay
        </h1>
        <NormalLabel
          text={`
            Please enter your payment details below to complete your Trademark
            order. Once completed, our experts will immediately begin reviewing
            and processing your submission.`}
        />
      </div>
      <div className="flex max-md:flex-col-reverse">
        <section className=" w-3/5 px-20 max-md:px-0 max-md:w-full">
          <div className="bg-white p-8 max-md:px-5 max-md:py-7 border-t-2 border-t-indigo-700 flex flex-col gap-3 mb-6">
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
          </div>
        </section>
        <section className="w-2/5 flex-center max-md:w-full">
          <div className="bg-white border-t-3 border-t-orange-500 flex flex-col gap-3 mb-6 w-full">
            <h1 className="text-2xl font-semibold text-slate-700 text-center pt-8 py-6">
              My Order Details
            </h1>
            <hr />
            <div className="p-8 flex flex-col gap-5">
              {orderDetails.map(({ title, amount }, index) => (
                <div
                  className="flex-between font-medium text-sm text-slate-600 pb-3 border-b-1 border-slate-200"
                  key={index}
                >
                  <div>{title}</div>
                  <div>${amount}.00</div>
                </div>
              ))}
              <div className="flex-between font-semibold text-base text-slate-600">
                <div>{`Total Amount`}</div>
                <div>${totalAmount}.00</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Payment;
