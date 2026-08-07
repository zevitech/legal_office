import ThankYou from "@/components/form/steps/ThankYou";
import FunnelShell from "@/components/form/FunnelShell";

export const metadata = {
  title: "Thank You - Register Trademark | Legal Trademark Office",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <FunnelShell>
      <ThankYou />
    </FunnelShell>
  );
};

export default page;
