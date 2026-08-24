import FunnelShell from "@/components/form/FunnelShell";
import SystemStepProgressTracker from "@/components/form/form2.0/system-step-progress-tracker";
import StepTwo from "@/components/form/steps/StepTwo";
import GlobalProvider from "../trademark-register/GlobalProvider";

export const metadata = {
  title: "Goods and Services Preview | Legal Trademark Office",
  description: "Private preview of the optimized goods and services step.",
  robots: { index: false, follow: false },
};

export default function GoodsServicesPreviewPage() {
  return (
    <GlobalProvider>
      <FunnelShell>
        <div data-customizer-form="notice" className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-semibold text-amber-950">
          Private Step 2 preview · no customer record is submitted from this page
        </div>
        <div data-customizer-form="progress"><SystemStepProgressTracker p_value={50} /></div>
        <StepTwo previewMode />
      </FunnelShell>
    </GlobalProvider>
  );
}
