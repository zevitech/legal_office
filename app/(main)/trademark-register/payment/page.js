import FormHero from "@/components/form/FormHero";
import Payment from "@/components/form/steps/Payment";
import FooterSection from "@/components/sections/FooterSection";
import Header from "@/components/ui/Header";

export const metadata = {
  title: "Payment - Register Trademark | Legal Trademark Office",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <main>
      <Header />
      <Payment />
      <FooterSection />
    </main>
  );
};

export default page;
