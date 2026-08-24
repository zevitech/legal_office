import PremiumServicePage from "@/components/sections/PremiumServicePage";

export const metadata = { title: "Trademark Revival Filing Support | Legal Trademark Office", description: "Get organized filing support for an eligible U.S. trademark application that may require a revival request after abandonment.", alternates: { canonical: "/services/trademark-revival" } };

export default function TrademarkRevivalPage() {
  return <PremiumServicePage
    eyebrow="Trademark revival support"
    title="Move an Eligible Trademark Revival Request Forward"
    description="Turn an abandonment notice and application record into an organized next-step workflow with focused information preparation and customer review."
    primaryLabel="Request Revival Support"
    primaryHref="/contact-us"
    visualTitle="Your revival workflow"
    visualItems={["Application status reviewed", "Required details organized", "Next filing step confirmed"]}
    trustItems={[["Record-focused review","Begin with the actual application record and notice."],["Organized preparation","Collect the information relevant to the potential revival step."],["Customer control","Review and approve prepared information before submission."]]}
    sectionEyebrow="Respond with direction"
    sectionTitle="A focused path from abandonment notice to next action"
    sectionDescription="Revival requirements depend on the application record. Our process keeps the notice, requested details and next step together."
    benefits={[["Application status review","Use the record and abandonment notice to identify the preparation path."],["Revival details organized","Bring the requested information and supporting details into one workflow."],["Submission coordination","Review what has been prepared and receive updates as the selected support moves forward."]]}
    process={[["Provide the application record","Share the serial number and relevant USPTO notice."],["Complete the focused checklist","Supply the facts and materials requested for the potential revival step."],["Review the prepared information","Confirm accuracy and authorize the appropriate next step."]]}
    highlightTitle="Built for an urgent moment without visual pressure"
    highlightDescription="The experience makes the next action prominent while keeping the language measured, the workflow understandable and the customer in control."
    highlightItems={["Clear application-record starting point", "No outcome or timing guarantee", "Mobile-friendly action path", "Support updates after the order begins"]}
    closingTitle="Have an abandonment notice to review?"
    closingDescription="Bring the application record and notice together, then start a focused revival-support conversation."
  />;
}
