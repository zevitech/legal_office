"use client";

import React, { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button, Checkbox } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import TinyWarning from "./TinyWarning";

const StripePayment = ({ loading, em }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(em);
  const [isLoading, setLoading] = useState(loading);
  const [isTermsAccept, setIsTermsAccept] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);

  const handlePaymentRequest = async () => {
    setLoading(true);

    // Ensure Stripe and Elements are loaded
    if (!stripe || !elements) return;

    // Check if the terms checkbox is accepted
    if (!isTermsAccept) {
      setCheckboxError(true);
      setLoading(false);
      return;
    }

    // Proceed with payment if checkbox is checked
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/trademark-register/thank-you`,
      },
      redirect: "if_required",
    });

    // Reset checkbox error
    setCheckboxError(false);

    // Handle payment result
    if (result?.paymentIntent?.status === "succeeded") {
      router.push(
        `${process.env.NEXT_PUBLIC_APP_URL}/trademark-register/thank-you`
      );
    } else {
      setPaymentError(result.error?.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <PaymentElement />
      <div className="mt-6">
        <Checkbox
          onChange={(e) => {
            setIsTermsAccept(e.target.checked);
            if (e.target.checked) setCheckboxError(false);
          }}
          value={isTermsAccept}
          isSelected={isTermsAccept}
          size="md"
          isInvalid={checkboxError}
        >
          <TinyWarning
            text={`I acknowledge and agree to the terms and conditions outlined above.`}
          />
        </Checkbox>
        {checkboxError && (
          <p className="text-[#f31260] text-xs text-center mt-3">
            Please tick the checkbox to process.
          </p>
        )}
      </div>
      {paymentError && (
        <p className="text-[#f31260] text-sm text-center mt-6 capitalize">
          {paymentError}
        </p>
      )}
      <div className="mt-9">
        <Button
          color="primary"
          variant="shadow"
          type="submit"
          isLoading={isLoading}
          className="w-full px-6"
          radius="sm"
          onClick={handlePaymentRequest}
        >
          Confirm Payment
        </Button>
      </div>
    </div>
  );
};

export default StripePayment;
