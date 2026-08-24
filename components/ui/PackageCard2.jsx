import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";

const plans = [
  { name: "Basic", price: "$49", badge: "Essential filing", timing: "7 business days", search: "Federal basic", review: "Filing specialist", monitoring: "—", specimen: "—" },
  { name: "Standard", price: "$149", badge: "Popular starter", timing: "3 business days", search: "Federal + state", review: "Paralegal review", monitoring: "—", specimen: "—" },
  { name: "Advanced", price: "$249", badge: "Faster support", timing: "24–48 hours", search: "Comprehensive", review: "Full paralegal support", monitoring: "6 months", specimen: "—" },
  { name: "Premium", price: "$649", badge: "Recommended", timing: "Priority: 1 business day", search: "Expanded + common-law", review: "Dedicated specialist", monitoring: "12 months", specimen: "Included" },
];

const rows = [
  ["Preparation", "timing"],
  ["Trademark search", "search"],
  ["Application review", "review"],
  ["Monitoring", "monitoring"],
  ["Specimen review", "specimen"],
];

const PlanButton = ({ plan }) => (
  <Link
    href="/trademark-register"
    className={`inline-flex min-h-12 w-full items-center justify-center rounded-md px-4 text-sm font-bold transition-colors ${plan.name === "Premium" ? "bg-white text-primary-theme hover:bg-blue-50" : "bg-primary-theme text-white hover:bg-primary-hovered"}`}
  >
    Choose {plan.name}
  </Link>
);

const PackageCard2 = () => (
  <div className="mx-auto w-full max-w-6xl px-4 py-10">
    <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 lg:block">
      <div className="grid grid-cols-[1.15fr_repeat(4,1fr)]">
        <div className="flex items-end bg-slate-50 p-5 text-sm font-semibold text-slate-500">Compare plans</div>
        {plans.map((plan) => (
          <div key={plan.name} className={`border-l border-slate-200 p-5 text-center ${plan.name === "Premium" ? "bg-primary-theme text-white" : "bg-white"}`}>
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${plan.name === "Premium" ? "bg-white/15 text-white" : "bg-blue-50 text-primary-theme"}`}>{plan.badge}</span>
            <h3 className="mt-3 text-lg font-bold">{plan.name}</h3>
            <p className="mt-1 text-4xl font-bold">{plan.price}</p>
            <p className={`mt-1 text-[11px] ${plan.name === "Premium" ? "text-blue-100" : "text-slate-500"}`}>service fee</p>
          </div>
        ))}
        {rows.map(([label, key]) => (
          <div key={key} className="contents">
            <div className="border-t border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700">{label}</div>
            {plans.map((plan) => <div key={`${plan.name}-${key}`} className={`border-l border-t border-slate-200 p-4 text-center text-sm ${plan.name === "Premium" ? "bg-blue-50 font-semibold text-slate-900" : "text-slate-600"}`}>{plan[key]}</div>)}
          </div>
        ))}
        <div className="border-t border-slate-200 bg-slate-50 p-4" />
        {plans.map((plan) => <div key={`${plan.name}-cta`} className={`overflow-hidden border-l border-t border-slate-200 p-4 ${plan.name === "Premium" ? "bg-primary-theme" : "bg-white"}`}><PlanButton plan={plan} /></div>)}
      </div>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
      {plans.map((plan) => (
        <article key={plan.name} className={`overflow-hidden rounded-2xl border-2 bg-white shadow-sm ${plan.name === "Premium" ? "border-primary-theme" : "border-slate-200"}`}>
          <div className={`flex items-center justify-between p-5 ${plan.name === "Premium" ? "bg-primary-theme text-white" : "bg-slate-50 text-slate-900"}`}>
            <div><span className="text-xs font-bold uppercase tracking-wide opacity-75">{plan.badge}</span><p className="mt-1 text-xl font-bold">{plan.name}</p></div>
            <div className="text-right"><p className="text-3xl font-bold">{plan.price}</p><p className="text-[10px] opacity-75">service fee</p></div>
          </div>
          <div className="space-y-3 overflow-hidden p-5">
            {rows.map(([label, key]) => (
              <div key={key} className="flex items-start gap-3 text-sm"><FaCircleCheck className="mt-0.5 shrink-0 text-emerald-500" /><div><span className="font-semibold text-slate-500">{label}: </span><span className="font-bold text-slate-800">{plan[key]}</span></div></div>
            ))}
            <div className="pt-2"><PlanButton plan={plan} /></div>
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default PackageCard2;
