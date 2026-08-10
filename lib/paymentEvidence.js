import { FieldValue } from "firebase-admin/firestore";

export const PAYMENT_AGREEMENT_VERSION = "2026-08-07";
export const STATEMENT_DESCRIPTOR = "XTARLABS LLC";

export const PAYMENT_AGREEMENT_TEXT =
  "I authorize the amount shown for the selected services. I understand service fees become non-refundable after the application is submitted to the USPTO, subject to applicable law, and USPTO fees are generally non-refundable. I understand the statement descriptor is XTARLABS LLC.";

export const STORED_METHOD_CONSENT_TEXT =
  "I choose to save this payment method securely with the payment provider for faster future payments. Saving a payment method does not authorize a new charge. I must separately approve each future fee.";

export const ATTORNEY_CHARGE_CONSENT_TEXT =
  "I authorize Legal Trademark Office, using the XTARLABS LLC statement descriptor, to charge this saved method for later attorney-issued fees tied to my trademark matter, including class fees, office-action work, amendments, declarations, publication, and other filing requirements, after written notice and up to $2,000 per charge. I may revoke this authorization for future charges at any time.";

export function requestEvidence(request) {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  return {
    ipAddress: forwarded.split(",")[0].trim().slice(0, 80),
    userAgent: String(request.headers.get("user-agent") || "").slice(0, 500),
    origin: String(request.headers.get("origin") || "").slice(0, 300),
  };
}

export async function savePaymentEvidence({
  clientRef,
  request,
  transactionId,
  amount,
  caseId = "",
  invoiceId = "",
  acceptedTerms,
  savePaymentMethod,
  customerVaultId = "",
  cardLastFour = "",
  cardBrand = "",
  attorneyChargeConsent = false,
  source,
  email = "",
}) {
  if (!clientRef || !transactionId) return;
  const evidence = requestEvidence(request);
  const base = {
    type: "payment_authorization",
    agreementVersion: PAYMENT_AGREEMENT_VERSION,
    agreementText: PAYMENT_AGREEMENT_TEXT,
    acceptedTerms: Boolean(acceptedTerms),
    acceptedAt: FieldValue.serverTimestamp(),
    amount: Number(amount || 0),
    currency: "USD",
    transactionId,
    caseId,
    invoiceId,
    source,
    email,
    statementDescriptor: STATEMENT_DESCRIPTOR,
    termsUrl: "/legal/terms",
    refundPolicyUrl: "/legal/refund-policy",
    ...evidence,
  };
  await Promise.all([
    clientRef.collection("agreements").doc(transactionId).set({
      ...base,
      savedPaymentMethodConsent: Boolean(savePaymentMethod),
      savedPaymentMethodConsentText: savePaymentMethod ? STORED_METHOD_CONSENT_TEXT : "",
      attorneyChargeConsent: Boolean(attorneyChargeConsent),
      attorneyChargeConsentText: attorneyChargeConsent ? ATTORNEY_CHARGE_CONSENT_TEXT : "",
    }),
    clientRef.collection("auditLog").add({
      ...base,
      event: "payment_approved",
      customerVaultCreated: Boolean(customerVaultId),
    }),
  ]);
  if (savePaymentMethod && customerVaultId) {
    await clientRef.collection("billingMethods").doc(customerVaultId).set({
      provider: "NMI",
      gatewayPartner: "XtarLabs LLC",
      customerVaultId,
      lastFour: String(cardLastFour || "").replace(/\D/g, "").slice(-4),
      cardBrand: String(cardBrand || "Card").replace(/[^A-Za-z0-9 -]/g, "").slice(0, 40),
      originalTransactionId: transactionId,
      statementDescriptor: STATEMENT_DESCRIPTOR,
      status: "active",
      consentVersion: PAYMENT_AGREEMENT_VERSION,
      consentText: STORED_METHOD_CONSENT_TEXT,
      consentAt: FieldValue.serverTimestamp(),
      separateApprovalRequiredForFutureCharges: true,
      attorneyInitiatedChargesAuthorized: Boolean(attorneyChargeConsent),
      attorneyChargeConsentText: attorneyChargeConsent ? ATTORNEY_CHARGE_CONSENT_TEXT : "",
      attorneyChargeMaximum: attorneyChargeConsent ? 2000 : 0,
      attorneyChargeCategories: attorneyChargeConsent ? ["classification_fees", "office_action", "amendment", "declaration", "publication", "filing_requirement"] : [],
      createdAt: FieldValue.serverTimestamp(),
      ...evidence,
    }, { merge: true });
  }
}
