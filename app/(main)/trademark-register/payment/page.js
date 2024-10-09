import FormHero from "@/components/form/FormHero";
import Payment from "@/components/form/steps/Payment";

export const metadata = {
  title: "Payment - Register Trademark | Legal Trademark Office",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <main>
      <FormHero />
      <Payment />
    </main>
  );
};

export default page;
