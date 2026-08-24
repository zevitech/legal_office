import LegalPage from "@/components/legal/LegalPage";

export const metadata = {
  title: "Terms of Service | Legal Trademark Office",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <section><h2 className="text-xl font-semibold text-slate-900">Independent filing support</h2><p>Legal Trademark Office is an independent trademark filing support service and is not the USPTO or another government agency. Purchasing a service does not guarantee that an application will be accepted or that a trademark will register.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Scope of service</h2><p>Your package includes only the services shown in the package description and order summary. Government filings, additional classes, statements of use, extensions, office-action responses and other later work are excluded unless the order expressly says otherwise.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Customer information and approval</h2><p>You are responsible for providing complete and accurate owner, trademark and usage information. We may request clarification before preparing or submitting an application. You will have an opportunity to review material filing information before submission.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Fees, authorization and statement descriptor</h2><p>The checkout total is the service charge authorized and collected today. The USPTO filing fee is displayed separately and charged per class. We will confirm the number of classes and request authorization before collecting government fees. Card charges appear on your statement as <strong>XTARLABS LLC</strong>. Service fees are earned as work is performed and are non-refundable after USPTO submission, subject to applicable law and the Refund Policy. USPTO fees are generally non-refundable, with limited exceptions controlled by the USPTO.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Optional saved payment method</h2><p>If you affirmatively select the saved-payment option, our secure payment provider stores the payment credentials in its protected customer vault and we retain only the vault reference and related transaction identifiers. Saving a payment method does not authorize an additional charge. You must separately approve each future fee before it is charged.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Electronic records and payment evidence</h2><p>You agree that electronic acceptance, transaction records, IP address, browser information, timestamps, portal messages, uploaded documents and service-delivery activity may be retained as business records. We may provide relevant records to XTARLABS LLC, our payment provider, card networks, banks or other payment participants to investigate a payment inquiry or dispute, subject to our Privacy Policy and applicable law.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Timing</h2><p>Processing estimates refer to our preparation time after receiving complete information. They do not expedite or predict USPTO examination, which is controlled by the government.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">No legal guarantee</h2><p>Trademark searches cannot identify every possible conflict. The USPTO or third parties may object to an application. Any attorney-client relationship, if offered, must be separately confirmed in writing after appropriate review.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Electronic communications</h2><p>You consent to receiving transactional calls, texts and emails about your application. Marketing communications may be declined using the instructions provided in the message.</p></section>
      <p className="rounded-lg bg-amber-50 p-4 text-sm"><strong>Pre-deployment review:</strong> This draft must be reviewed with the company’s legal counsel and updated with the legal entity name, jurisdiction, dispute procedure and official notice address.</p>
    </LegalPage>
  );
}
