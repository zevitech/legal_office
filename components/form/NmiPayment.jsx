"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import Link from "next/link";

const COLLECT_JS_ID = "collect-js-script";

/**
 * NMI Collect.js inline card form.
 * The card fields are iframes hosted by NMI — card data never touches this app.
 * onToken(token, billing) is called once Collect.js returns a payment token.
 */
const NmiPayment = ({
  onToken,
  totalAmount,
  isProcessing,
  errorMessage,
  initialBilling = {},
  allowSavePaymentMethod = true,
  statementDescriptor = "XTARLABS LLC",
}) => {
  // Saving a card requires the Customer Vault add-on on the NMI account. When
  // it is absent the gateway rejects the entire sale, so the option is hidden
  // unless the account is known to support it.
  const vaultEnabled = process.env.NEXT_PUBLIC_NMI_CUSTOMER_VAULT_ENABLED === "true";
  const formRef = useRef(null);
  const onTokenRef = useRef(onToken);
  const savePaymentMethodRef = useRef(false);
  const statementDescriptorRef = useRef(statementDescriptor);
  const [collectJsReady, setCollectJsReady] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [savePaymentMethod, setSavePaymentMethod] = useState(false);
  const [savedMethods, setSavedMethods] = useState([]);

  // Keep the latest callback without re-running the Collect.js setup effect.
  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    savePaymentMethodRef.current = savePaymentMethod && vaultEnabled;
  }, [savePaymentMethod, vaultEnabled]);

  useEffect(() => {
    statementDescriptorRef.current = statementDescriptor;
  }, [statementDescriptor]);

  useEffect(() => {
    if (!window.location.pathname.startsWith("/client-portal")) return;
    let active = true;
    fetch("/api/portal/billing-methods", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : { methods: [] })
      .then((data) => { if (active) setSavedMethods(data.methods || []); })
      .catch(() => { if (active) setSavedMethods([]); });
    return () => { active = false; };
  }, []);

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
            acceptedTerms: true,
            agreementVersion: "2026-08-07",
            statementDescriptor: statementDescriptorRef.current,
            savePaymentMethod: savePaymentMethodRef.current,
            attorneyChargeConsent: false,
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

    if (!acceptedTerms) {
      setFieldError("Please accept the terms and fee disclosure to continue.");
      return;
    }

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

  const payWithSavedMethod = (method) => {
    if (isProcessing) return;
    if (!acceptedTerms) {
      setFieldError("Please accept the terms and fee disclosure to continue.");
      return;
    }
    setFieldError("");
    onTokenRef.current?.("", {
      acceptedTerms: true,
      agreementVersion: "2026-08-07",
      statementDescriptor: statementDescriptorRef.current,
      billingMethodId: method.id,
      useSavedPaymentMethod: true,
      savePaymentMethod: false,
    });
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass}>First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="John"
              defaultValue={initialBilling.firstName || ""}
              autoComplete="given-name"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Doe"
              defaultValue={initialBilling.lastName || ""}
              autoComplete="family-name"
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              defaultValue={initialBilling.email || ""}
              autoComplete="email"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Zip / Postal Code</label>
            <input
              type="text"
              name="zip"
              placeholder="10001"
              defaultValue={initialBilling.zip || ""}
              autoComplete="postal-code"
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

      <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(event) => {
            setAcceptedTerms(event.target.checked);
            if (event.target.checked) setFieldError("");
          }}
          className="mt-0.5 h-4 w-4"
        />
        <span>
          I agree to the <Link className="underline" href="/legal/terms" target="_blank">Terms</Link>,{" "}
          <Link className="underline" href="/legal/privacy" target="_blank">Privacy Policy</Link> and{" "}
          <Link className="underline" href="/legal/refund-policy" target="_blank">Refund Policy</Link>. I authorize the amount shown today. I understand service fees become non-refundable after the application is submitted to the USPTO, subject to applicable law, and USPTO fees are generally non-refundable. The charge will appear as <strong>{statementDescriptor}</strong>.
        </span>
      </label>

      {allowSavePaymentMethod && vaultEnabled && <label className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-xs leading-relaxed text-slate-700">
        <input type="checkbox" checked={savePaymentMethod} onChange={(event)=>setSavePaymentMethod(event.target.checked)} className="mt-0.5 h-4 w-4" />
        <span><strong>Optional:</strong> Save this payment method securely for faster future payments. Legal Trademark Office stores only a secure vault reference—not your full card number or CVV. Saving a method does not authorize a new charge; you must separately approve each future fee.</span>
      </label>}

      {savedMethods.length > 0 && <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Saved payment method</p>
        {savedMethods.map((method) => <button key={method.id} type="button" disabled={isProcessing} onClick={()=>payWithSavedMethod(method)} className="mt-3 w-full rounded-lg bg-emerald-700 px-4 py-3 text-sm font-bold text-white disabled:opacity-50">Pay this invoice with saved card{method.lastFour ? ` ending ${method.lastFour}` : ""}</button>)}
        <p className="mt-2 text-[11px] leading-5 text-emerald-900">This button authorizes only the invoice amount shown above. It does not permit unrelated or automatic future charges.</p>
      </div>}

      <button
        type="submit"
        disabled={!collectJsReady || isProcessing || !acceptedTerms}
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
        Card details are encrypted and handled by our secure payment provider. Your statement will show <strong>{statementDescriptor}</strong>.
      </p>
    </form>
  );
};

export default NmiPayment;
