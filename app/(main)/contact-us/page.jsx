import PremiumServicePage from "@/components/sections/PremiumServicePage";

export const metadata = { title: "Trademark Filing Support Contact | Legal Trademark Office", description: "Start a U.S. trademark application online or reach Legal Trademark Office LLC customer support about an existing filing-support order.", alternates: { canonical: "/contact-us" } };

export default function ContactPage() {
  return <PremiumServicePage
    eyebrow="Customer support"
    title="Choose the Fastest Way to Move Your Trademark Filing Forward"
    description="New customers can begin online in minutes. Existing customers can call support with their receipt or order information ready."
    primaryLabel="Start Trademark Registration"
    primaryHref="/trademark-registration"
    secondaryLabel="Call +1 (310) 424-4909"
    secondaryHref="tel:+13104244909"
    visualTitle="Your support path"
    visualItems={["Choose the right destination", "Provide order or mark details", "Receive a clear next step"]}
    trustItems={[["New applications","Compare plans and begin through the dedicated registration page."],["Existing orders","Have the order email or receipt information ready when calling."],["Automatic follow-up","After purchase, confirmation and service updates go to the provided contact details."]]}
    sectionEyebrow="Get to the right team"
    sectionTitle="Support designed around where you are in the process"
    sectionDescription="You should not have to submit a form that goes nowhere. Choose the working action that matches your situation."
    benefits={[["Ready to register","Go directly to the registration page to compare service plans and begin."],["Already purchased","Call customer support with the order email or receipt details for faster identification."],["Comparing services","Explore registration, renewal and revival support before choosing the next step."]]}
    process={[["Select your path","Start a new registration or contact support about an existing order."],["Share the relevant details","Provide the mark information or order identifier needed for the request."],["Receive the next action","Our team follows up with confirmation or the applicable support step."]]}
    highlightTitle="Clear support without a broken contact form"
    highlightDescription="Every prominent action on this page now leads to a real destination: registration plans, service information or the published customer-support number."
    highlightItems={["Working phone link on mobile", "Direct registration-plan link", "No unnecessary data collection", "Service and policy links in the footer"]}
    closingTitle="New trademark application or existing order?"
    closingDescription="Begin online for a new registration, or call support when you already have an order."
  />;
}
