import LegalPage from "@/components/legal/LegalPage";

export const metadata = {
  title: "Privacy Policy | Legal Trademark Office",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <section><h2 className="text-xl font-semibold text-slate-900">Who controls the information</h2><p>Legal Trademark Office LLC, a Virginia limited liability company, operates this website and is responsible for the personal information described in this policy.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Information we collect</h2><p>We collect contact, owner, trademark, application, transaction and technical information needed to save applications, provide services, prevent fraud and measure advertising performance.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">How information is used</h2><p>Information is used to communicate with you, prepare requested services, process payments, maintain records, improve the website and attribute advertising conversions.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Service providers</h2><p>We share only the information reasonably needed to operate and deliver the requested service. This may include Google Ads for advertising attribution, Zoho CRM for lead and customer relationship management, and PCI Express for secure payment processing. Necessary information may also be handled by our hosting, database, email, customer-support, analytics, security and professional-service vendors. We do not sell payment-card information.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Public trademark records</h2><p>Information submitted in a trademark application—including certain owner names and addresses—may become publicly available through government records. We will explain filing information before submission.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Cookies and advertising</h2><p>We use cookies and similar technology for essential functionality, Google Ads conversion measurement, analytics, session replay and customer support. Where required, consent controls are presented before non-essential tracking begins. Advertising and analytics settings may be limited through browser or device controls.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Payments, security and retention</h2><p>Card details are tokenized by the PCI Express payment gateway and are not stored by this website. If you choose to save a payment method, the payment provider retains the card credentials in its secure vault and we retain only the vault reference, original transaction identifier and your consent record. We also retain relevant agreement versions, timestamps, IP address, browser information, case activity and service-delivery records for security, accounting, legal compliance and payment-dispute review. Records are kept only as long as reasonably necessary for these purposes.</p></section>
      <section><h2 className="text-xl font-semibold text-slate-900">Your choices</h2><p>You may request access, correction or deletion where applicable, opt out of marketing, or ask questions through our contact page. Some application and transaction records may need to be retained by law.</p></section>
    </LegalPage>
  );
}
