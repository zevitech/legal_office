import FormHero from "@/components/form/FormHero";
import ThankYou from "@/components/form/steps/ThankYou";
import FooterSection from "@/components/sections/FooterSection";
import Header from "@/components/ui/Header";

export const metadata = {
  title: "Thank You - Register Trademark | Legal Trademark Office",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <main className="mb-10">
      <Header />
      <ThankYou />
      <FooterSection />
    </main>
  );
};

export default page;
