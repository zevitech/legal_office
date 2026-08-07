import Payment from "@/components/form/steps/Payment";
import FunnelShell from "@/components/form/FunnelShell";
import SystemStepProgressTracker from "@/components/form/form2.0/system-step-progress-tracker";

export const metadata = {
  title: "Payment - Register Trademark | Legal Trademark Office",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <FunnelShell>
      <SystemStepProgressTracker p_value={100} />
      <Payment />
    </FunnelShell>
  );
};

export default page;
