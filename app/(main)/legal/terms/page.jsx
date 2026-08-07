import LegalPage from "@/components/legal/LegalPage";

export const metadata = { title: "Terms of Service | Legal Trademark Office" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <section><h2 className="text-xl font-semibold text-slate-900">Independent filing support</h2><p>Legal Trademark Office is an independent trademark filing support service and is not the USPTO or another government agency. Purchasing a service does not guarantee that an application will be accepted or that a trademark will register.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Scope of service</h2><p>Your package includes only the services shown in the package description and order summary. Government filings, additional classes, statements of use, extensions, office-action responses and other later work are excluded unless the order expressly says otherwise.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Customer information and approval</h2><p>You are responsible for providing complete and accurate owner, trademark and usage information. We may request clarification before preparing or submitting an application. You will have an opportunity to review material filing information before submission.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Fees and authorization</h2><p>The checkout total is the service charge collected today. The USPTO filing fee is currently displayed separately on checkout and is charged per class. We will confirm the number of classes and request authorization before collecting government fees. Government fees and completed third-party charges are generally non-refundable.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Timing</h2><p>Processing estimates refer to our preparation time after receiving complete information. They do not expedite or predict USPTO examination, which is controlled by the government.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">No legal guarantee</h2><p>Trademark searches cannot identify every possible conflict. The USPTO or third parties may object to an application. Any attorney-client relationship, if offered, must be separately confirmed in writing after appropriate review.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Electronic communications</h2><p>You consent to receiving transactional calls, texts and emails about your application. Marketing communications may be declined using the instructions provided in the message.</p></section>
      <p className="rounded-lg bg-amber-50 p-4 text-sm"><strong>Pre-deployment review:</strong> This draft must be reviewed with the company’s legal counsel and updated with the legal entity name, jurisdiction, dispute procedure and official notice address.</p>
    </LegalPage>
  );
}
