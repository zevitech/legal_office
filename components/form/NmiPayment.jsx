"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa6";

const COLLECT_JS_ID = "collect-js-script";

/**
 * NMI Collect.js inline card form.
 * The card fields are iframes hosted by NMI — card data never touches this app.
 * onToken(token, billing) is called once Collect.js returns a payment token.
 */
const NmiPayment = ({ onToken, totalAmount, isProcessing, errorMessage }) => {
  const formRef = useRef(null);
  const onTokenRef = useRef(onToken);
  const [collectJsReady, setCollectJsReady] = useState(false);
  const [fieldError, setFieldError] = useState("");

  // Keep the latest callback without re-running the Collect.js setup effect.
  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    const tokenizationKey = process.env.NEXT_PUBLIC_NMI_TOKENIZATION_KEY;
    if (!tokenizationKey) {
      setFieldError("Payment form is unavailable. Please contact support.");
      return;
    }

    const initCollectJs = () => {
      if (!window.CollectJS) return;

      window.CollectJS.configure({
        variant: "inline",
        fields: {
          ccnumber: { selector: "#ccnumber", placeholder: "Card Number" },
          ccexp: { selector: "#ccexp", placeholder: "MM / YY" },
          cvv: { selector: "#cvv", placeholder: "CVV" },
        },
        styleSniffer: false,
        customCss: {
          border: "none",
          "font-size": "14px",
          color: "#111827",
          height: "20px",
          "line-height": "20px",
          width: "100%",
          background: "transparent",
          outline: "none",
        },
        invalidCss: { color: "#f31260" },
        focusCss: { color: "#111827" },
        validationCallback: (field, status, message) => {
          setFieldError(status ? "" : message || "");
        },
        callback: (response) => {
          const form = formRef.current;
          const valueOf = (name) =>
            form?.querySelector(`[name=${name}]`)?.value?.trim() || "";

          onTokenRef.current?.(response.token, {
            firstName: valueOf("first_name"),
            lastName: valueOf("last_name"),
            email: valueOf("email"),
            zip: valueOf("zip"),
          });
        },
      });

      setCollectJsReady(true);
    };

    if (document.getElementById(COLLECT_JS_ID)) {
      // Script already present (e.g. client-side nav) — just reconfigure.
      const timer = setTimeout(initCollectJs, 100);
      return () => clearTimeout(timer);
    }

    const script = document.createElement("script");
    script.id = COLLECT_JS_ID;
    script.src = "https://secure.nmi.com/token/Collect.js";
    script.setAttribute("data-tokenization-key", tokenizationKey);
    // Give React a beat to render the field containers before configuring.
    script.onload = () => setTimeout(initCollectJs, 100);
    script.onerror = () =>
      setFieldError("Could not load the payment form. Please refresh.");
    document.head.appendChild(script);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!collectJsReady || isProcessing) return;

    setFieldError("");
    if (!window.CollectJS) {
      setFieldError("Payment form not ready. Please refresh the page.");
      return;
    }

    // The gateway rejects transactions without a zip, so catch it here first.
    const form = formRef.current;
    const required = [
      ["first_name", "Please enter your first name."],
      ["last_name", "Please enter your last name."],
      ["zip", "Please enter your billing zip / postal code."],
    ];
    for (const [name, message] of required) {
      if (!form?.querySelector(`[name=${name}]`)?.value?.trim()) {
        setFieldError(message);
        return;
      }
    }

    // Triggers tokenization; the configured callback fires on success.
    window.CollectJS.startPaymentRequest();
  };

  const inputClass =
    "w-full border border-gray-200 bg-gray-50 rounded-[4px] px-3 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors";
  const fieldBoxClass =
    "w-full border border-gray-200 bg-gray-50 rounded-[4px] px-3 py-2.5 min-h-[42px]";
  const labelClass = "block text-[12px] font-medium text-gray-600 mb-1";

  const displayError = errorMessage || fieldError;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">
          Billing Details
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="John"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Doe"
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Zip / Postal Code</label>
            <input
              type="text"
              name="zip"
              placeholder="10001"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
        <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">
          Card Details
        </p>
        <div>
          <label className={labelClass}>Card Number</label>
          <div id="ccnumber" className={fieldBoxClass} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Expiry Date</label>
            <div id="ccexp" className={fieldBoxClass} />
          </div>
          <div>
            <label className={labelClass}>CVV</label>
            <div id="cvv" className={fieldBoxClass} />
          </div>
        </div>
      </div>

      {displayError && (
        <p className="text-[#f31260] text-sm text-center">{displayError}</p>
      )}

      <button
        type="submit"
        disabled={!collectJsReady || isProcessing}
        className="w-full bg-indigo-700 hover:bg-indigo-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-[4px] transition-colors text-[14px] flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <FaSpinner className="animate-spin" />
            Processing...
          </>
        ) : !collectJsReady ? (
          "Loading payment form..."
        ) : (
          `Pay $${totalAmount}.00`
        )}
      </button>

      <p className="text-[11px] text-gray-400 text-center leading-relaxed">
        Your card details are encrypted and processed securely. We never store
        your card information.
      </p>
    </form>
  );
};

export default NmiPayment;
