import PremiumServicePage from "@/components/sections/PremiumServicePage";

export const metadata = { title: "About Legal Trademark Office LLC | Filing Support", description: "Learn how Virginia-based Legal Trademark Office LLC helps customers prepare and submit U.S. trademark application information.", alternates: { canonical: "/about-us" } };

export default function AboutPage() {
  return <PremiumServicePage
    eyebrow="About Legal Trademark Office LLC"
    title="Trademark Filing Support Built Around a Better Customer Experience"
    description="We help customers turn brand, ownership, goods or services and filing-basis information into an organized U.S. trademark application workflow."
    primaryLabel="Start Trademark Registration"
    primaryHref="/trademark-registration"
    secondaryLabel="Explore our services"
    secondaryHref="/services"
    visualTitle="How we support your filing"
    visualItems={["Information organized", "Application details reviewed", "Next step kept clear"]}
    trustItems={[["Virginia company","Legal Trademark Office LLC is organized in Virginia."],["Independent service","We are not the USPTO or another government agency."],["Customer ownership","The applicant and owner information comes from the customer."]]}
    sectionEyebrow="Our approach"
    sectionTitle="Careful preparation without taking control away from you"
    sectionDescription="Our role is to make the preparation and submission workflow easier to follow while keeping material filing information visible to the customer."
    benefits={[["Organized application details","Bring mark, ownership, goods or services and filing-basis information into one preparation path."],["Defined service choices","Select the preparation time and support scope that fit the application."],["Post-purchase follow-up","Receive confirmation and service updates using the contact details provided with the order."]]}
    process={[["Choose a service plan","Compare the available preparation levels and included support."],["Provide the filing details","Complete the focused application questionnaire for the name, logo or slogan."],["Review the prepared information","Confirm material details and the next filing step before submission."]]}
    highlightTitle="A service experience designed to feel clear and professional"
    highlightDescription="Good filing support is not only about forms. It is also about keeping service scope, customer decisions and next actions understandable from the beginning."
    highlightItems={["One clear registration destination", "Customer review before submission", "Separate government-fee authorization", "Privacy, Terms and Refund policies linked sitewide"]}
    closingTitle="Ready to build a stronger filing starting point?"
    closingDescription="Compare the registration plans and choose the preparation support that fits your brand."
  />;
}
