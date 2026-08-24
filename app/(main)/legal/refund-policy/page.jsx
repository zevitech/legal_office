import LegalPage from "@/components/legal/LegalPage";

export const metadata = {
  title: "Refund Policy | Legal Trademark Office",
  alternates: { canonical: "/legal/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund and Cancellation Policy">
      <section><h2 className="text-xl font-semibold text-slate-900">Before work begins</h2><p>You may request cancellation before substantive search, preparation or review work begins. Approved refunds are returned to the original payment method, less any non-refundable processing or third-party charge permitted by law.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">After work begins or an application is submitted</h2><p>Once substantive work has started, the earned portion of the service fee is non-refundable. After an application is submitted to the USPTO, the service fee for preparing and submitting that application is earned and non-refundable, except where required by applicable law or where a promised service was not delivered. If a service concern can be corrected, we will first make a reasonable effort to complete or correct the purchased work.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Government and third-party fees</h2><p>USPTO fees are generally not refunded after payment or submission, although the USPTO identifies limited circumstances in which a refund may be available. Completed third-party costs are non-refundable to the extent permitted by law. Review the <a className="underline" href="https://www.uspto.gov/learning-and-resources/fees-and-payment/refund-information" target="_blank" rel="noreferrer">USPTO refund information</a> for the government&apos;s current rules.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Statement descriptor and payment disputes</h2><p>Card payments for Legal Trademark Office services appear on the cardholder statement as <strong>XTARLABS LLC</strong>. Before opening a dispute, contact us with the order email and transaction details so we can identify the charge and review the service record. We retain transaction authorizations, accepted agreement versions, case activity and delivery records to respond accurately to payment inquiries and disputes.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">No outcome-based refund</h2><p>A refusal, opposition, abandonment or failure to obtain registration does not automatically qualify for a refund. Trademark outcomes are controlled by the USPTO, the accuracy of customer information and possible third-party rights.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Requesting a review</h2><p>Contact us promptly with the order email, receipt number and reason for the request. We will acknowledge the request and provide a written decision after reviewing the work already performed.</p></section>
      <p className="rounded-lg bg-amber-50 p-4 text-sm"><strong>Pre-deployment review:</strong> Counsel must set the exact cancellation window, processing-fee treatment, response deadline and statutory consumer rights for the company’s operating jurisdictions.</p>
    </LegalPage>
  );
}
