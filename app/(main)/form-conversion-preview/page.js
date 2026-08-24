import FunnelShell from "@/components/form/FunnelShell";
import SystemStepProgressTracker from "@/components/form/form2.0/system-step-progress-tracker";
import StepOne from "@/components/form/steps/StepOne";
import GlobalProvider from "../trademark-register/GlobalProvider";

export const metadata = {
  title: "Application Form Preview | Legal Trademark Office",
  description: "Private preview of the optimized trademark application form.",
  robots: { index: false, follow: false },
};

export default function FormConversionPreviewPage() {
  return (
    <GlobalProvider>
      <FunnelShell>
        <div data-customizer-form="notice" className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-semibold text-amber-950">
          Private form preview · the current live application remains available
        </div>
        <div data-customizer-form="progress"><SystemStepProgressTracker p_value={25} /></div>
        <StepOne />
      </FunnelShell>
    </GlobalProvider>
  );
}
