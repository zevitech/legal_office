import LegalPage from "@/components/legal/LegalPage";

export const metadata = { title: "Refund Policy | Legal Trademark Office" };

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund and Cancellation Policy">
      <section><h2 className="text-xl font-semibold text-slate-900">Before work begins</h2><p>You may request cancellation before substantive search, preparation or review work begins. Approved refunds are returned to the original payment method, less any non-refundable processing or third-party charge permitted by law.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">After work begins</h2><p>Once substantive work has started, the earned portion of the service fee is non-refundable. If a service concern can be corrected, we will first make a reasonable effort to complete or correct the purchased work.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Government and third-party fees</h2><p>USPTO fees, government charges and completed third-party costs are non-refundable after payment or submission because they are not retained by us.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">No outcome-based refund</h2><p>A refusal, opposition, abandonment or failure to obtain registration does not automatically qualify for a refund. Trademark outcomes are controlled by the USPTO, the accuracy of customer information and possible third-party rights.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Requesting a review</h2><p>Contact us promptly with the order email, receipt number and reason for the request. We will acknowledge the request and provide a written decision after reviewing the work already performed.</p></section>
      <p className="rounded-lg bg-amber-50 p-4 text-sm"><strong>Pre-deployment review:</strong> Counsel must set the exact cancellation window, processing-fee treatment, response deadline and statutory consumer rights for the company’s operating jurisdictions.</p>
    </LegalPage>
  );
}
