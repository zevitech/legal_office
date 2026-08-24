import PremiumServicePage from "@/components/sections/PremiumServicePage";

export const metadata = { title: "Trademark Renewal Filing Support | Legal Trademark Office", description: "Organize the information needed for a U.S. trademark maintenance or renewal filing with clear customer review and filing support.", alternates: { canonical: "/services/trademark-renewal" } };

export default function TrademarkRenewalPage() {
  return <PremiumServicePage
    eyebrow="Trademark maintenance support"
    title="Keep Your Trademark Renewal on a Clear Path"
    description="Bring registration, ownership and use information into one organized renewal workflow with clear preparation, customer review and filing support."
    primaryLabel="Request Renewal Support"
    primaryHref="/contact-us"
    visualTitle="Your renewal workflow"
    visualItems={["Registration record organized", "Maintenance details prepared", "Customer approval confirmed"]}
    trustItems={[["Focused preparation","A workflow designed around trademark maintenance information."],["Customer review","Review the prepared details before the next filing step."],["Clear fee approval","Any applicable government fee is handled separately with authorization."]]}
    sectionEyebrow="Renew with less friction"
    sectionTitle="Everything needed to organize the next maintenance step"
    sectionDescription="Renewal filing support turns scattered registration information into a clear, customer-controlled process."
    benefits={[["Registration record review","Start with the registration number, owner details and relevant maintenance window."],["Use information organized","Bring current use and ownership details together for the selected filing support."],["Filing-step coordination","Know what is ready, what still needs attention and what happens after approval."]]}
    process={[["Share the registration details","Provide the registration record and current owner information."],["Complete the requested information","Respond to the focused checklist for the applicable maintenance filing."],["Review and authorize","Check the prepared details and approve the next step before submission."]]}
    highlightTitle="A renewal experience designed around clarity"
    highlightDescription="The page and support workflow are built to help customers move forward without searching through unrelated services or unclear package claims."
    highlightItems={["Defined maintenance-support scope", "Responsive mobile experience", "No automatic package renewal", "Status and service updates after purchase"]}
    closingTitle="Ready to organize your trademark renewal?"
    closingDescription="Start with your registration details and our support team will help identify the next preparation step."
  />;
}
