"use client";

import React, { useMemo, useState } from "react";
import FormLoader from "@/components/form/FormLoader";
import axios from "axios";
import { Button, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { saveStepTwo } from "@/features/formSlice";
import { IoMdLock } from "react-icons/io";
import { HiOutlineCheck, HiOutlineSearch } from "react-icons/hi";
import { trackClassificationComplete } from "@/utils/tracking";

const INDUSTRIES = [
  { name: "Clothing & fashion", icon: "👕", activities: [{ label: "Clothing, footwear or headwear", classNo: 25 }, { label: "Retail or online clothing store", classNo: 35 }, { label: "Bags, wallets or luggage", classNo: 18 }, { label: "Jewelry and watches", classNo: 14 }, { label: "Custom printing or embroidery", classNo: 40 }, { label: "Fashion design services", classNo: 42 }] },
  { name: "Food & beverage", icon: "🍽️", activities: [{ label: "Restaurant, café or catering", classNo: 43 }, { label: "Packaged foods or snacks", classNo: 30 }, { label: "Beer, wine or spirits", classNo: 33 }, { label: "Non-alcoholic drinks", classNo: 32 }, { label: "Meat, dairy or prepared foods", classNo: 29 }, { label: "Food delivery services", classNo: 39 }] },
  { name: "Beauty & wellness", icon: "✨", activities: [{ label: "Cosmetics or skincare products", classNo: 3 }, { label: "Salon, spa or beauty services", classNo: 44 }, { label: "Nutritional supplements", classNo: 5 }, { label: "Beauty tools and applicators", classNo: 21 }, { label: "Online beauty retail store", classNo: 35 }, { label: "Wellness coaching or instruction", classNo: 41 }] },
  { name: "Technology & software", icon: "💻", activities: [{ label: "Downloadable software or mobile app", classNo: 9 }, { label: "SaaS or hosted software", classNo: 42 }, { label: "Technology consulting", classNo: 42 }, { label: "Computer hardware or devices", classNo: 9 }, { label: "Telecommunications services", classNo: 38 }, { label: "Online marketplace platform", classNo: 35 }] },
  { name: "Retail & e-commerce", icon: "🛍️", activities: [{ label: "Online or retail store services", classNo: 35 }, { label: "Marketplace platform", classNo: 35 }, { label: "Wholesale distribution", classNo: 35 }, { label: "Subscription-box retail services", classNo: 35 }, { label: "Product packaging", classNo: 16 }, { label: "Delivery and fulfillment", classNo: 39 }] },
  { name: "Marketing & creative", icon: "📣", activities: [{ label: "Advertising or marketing services", classNo: 35 }, { label: "Brand strategy or public relations", classNo: 35 }, { label: "Graphic or packaging design", classNo: 42 }, { label: "Photography or video production", classNo: 41 }, { label: "Printed promotional materials", classNo: 16 }, { label: "Website design or development", classNo: 42 }] },
  { name: "Professional services", icon: "💼", activities: [{ label: "Business consulting", classNo: 35 }, { label: "Legal services", classNo: 45 }, { label: "Accounting or financial services", classNo: 36 }, { label: "Education or training", classNo: 41 }, { label: "Recruiting or staffing services", classNo: 35 }, { label: "Research or technical consulting", classNo: 42 }] },
  { name: "Home & construction", icon: "🏠", activities: [{ label: "Construction or repair services", classNo: 37 }, { label: "Furniture", classNo: 20 }, { label: "Cleaning services", classNo: 37 }, { label: "Real estate services", classNo: 36 }, { label: "Home décor products", classNo: 20 }, { label: "Landscaping services", classNo: 44 }] },
  { name: "Health & medical", icon: "🩺", activities: [{ label: "Medical or dental services", classNo: 44 }, { label: "Medical devices", classNo: 10 }, { label: "Pharmaceutical products", classNo: 5 }, { label: "Telehealth services", classNo: 44 }, { label: "Health education", classNo: 41 }, { label: "Medical research", classNo: 42 }] },
  { name: "Entertainment & media", icon: "🎬", activities: [{ label: "Entertainment or live events", classNo: 41 }, { label: "Publishing or downloadable media", classNo: 9 }, { label: "Streaming entertainment", classNo: 41 }, { label: "Podcasts or recorded media", classNo: 9 }, { label: "Music production or performances", classNo: 41 }, { label: "Printed books or publications", classNo: 16 }] },
  { name: "Fitness & sports", icon: "🏋️", activities: [{ label: "Fitness instruction or gym services", classNo: 41 }, { label: "Sporting goods", classNo: 28 }, { label: "Athletic clothing", classNo: 25 }, { label: "Fitness equipment", classNo: 28 }, { label: "Sports events or competitions", classNo: 41 }, { label: "Nutrition or wellness coaching", classNo: 44 }] },
  { name: "Transportation", icon: "🚚", activities: [{ label: "Delivery, transport or logistics", classNo: 39 }, { label: "Vehicles", classNo: 12 }, { label: "Travel booking services", classNo: 39 }, { label: "Vehicle repair or maintenance", classNo: 37 }, { label: "Moving or storage services", classNo: 39 }, { label: "Transportation software", classNo: 42 }] },
  { name: "Other business", icon: "➕", activities: [{ label: "I need help identifying my class", classNo: null }] },
];

const StepTwo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const stepOneData = useSelector((state) => state.form.stepOne);
  const [activeIndustry, setActiveIndustry] = useState(INDUSTRIES[0].name);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [customActivity, setCustomActivity] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [reviewPreference, setReviewPreference] = useState("attorney_call");

  const filteredIndustries = INDUSTRIES.filter((industry) =>
    `${industry.name} ${industry.activities.map((item) => item.label).join(" ")}`.toLowerCase().includes(search.toLowerCase()),
  );
  const industry = INDUSTRIES.find((item) => item.name === activeIndustry) || filteredIndustries[0];
  const uniqueClasses = [...new Set(selectedActivities.map((item) => item.classNo).filter(Boolean))];
  const classificationSummary = useMemo(
    () => [...selectedActivities.map((item) => item.label), customActivity].filter(Boolean).join(", "),
    [selectedActivities, customActivity],
  );

  if (process.env.NODE_ENV === "production" && Object.keys(stepOneData).length === 0) {
    return router.push(process.env.NEXT_PUBLIC_APP_URL + "/trademark-register");
  }

  const toggleActivity = (activity) => {
    setSelectedActivities((current) =>
      current.some((item) => item.label === activity.label)
        ? current.filter((item) => item.label !== activity.label)
        : [...current, { ...activity, industry: activeIndustry }],
    );
    setValidation(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!classificationSummary) {
      setValidation(true);
      return;
    }
    setIsLoading(true);
    const payload = {
      trademarkClassification: classificationSummary,
      selectedActivities,
      estimatedClassCount: Math.max(uniqueClasses.length, customActivity ? 1 : 0),
      reviewPreference,
    };
    dispatch(saveStepTwo(payload));

    try {
      if (process.env.NODE_ENV !== "production") return router.push("/trademark-register/step-3");
      await axios.post("/api/save-data", { ...stepOneData, ...payload, zoho_step: 2 });
      trackClassificationComplete({
        activityCount: selectedActivities.length + (customActivity ? 1 : 0),
        classCount: payload.estimatedClassCount,
        reviewPreference,
      });
    } catch (error) {
      console.log("Error sending step 2 data:", error);
    }
    return router.push("/trademark-register/step-3");
  };

  return (
    <main className="system-page-standard-layout flex flex-col gap-7">
      <FormLoader isVisible={isLoading} />
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary-theme">Goods and services</p>
        <h1 className="mt-2 font-inria text-3xl font-bold text-heading-color sm:text-4xl">What does your business offer?</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">Select everything your business currently offers or plans to offer. Your attorney will use this information to prepare the classification review.</p>
      </div>

      <div className="relative">
        <HiOutlineSearch className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-xl text-slate-400" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search industries or activities" className="min-h-14 w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
      </div>

      <section className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {filteredIndustries.map((item) => {
            const selected = activeIndustry === item.name;
            return <button key={item.name} type="button" onClick={() => setActiveIndustry(item.name)} className={`flex min-h-16 items-center gap-3 rounded-xl border-2 p-3 text-left text-sm font-semibold transition ${selected ? "border-blue-600 bg-blue-50 text-blue-900" : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"}`}><span className="text-xl">{item.icon}</span><span>{item.name}</span></button>;
          })}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-xl font-bold text-slate-900">{industry?.icon} {industry?.name}</h2>
          <p className="mt-1 text-sm text-slate-500">Select all that apply.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {industry?.activities.map((activity) => {
              const selected = selectedActivities.some((item) => item.label === activity.label);
              return <button key={activity.label} type="button" aria-pressed={selected} onClick={() => toggleActivity(activity)} className={`flex min-h-20 items-start justify-between gap-3 rounded-xl border-2 p-4 text-left transition ${selected ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300"}`}><span><span className="block font-semibold text-slate-900">{activity.label}</span><span className="mt-1 block text-xs text-slate-500">Business activity</span></span><span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${selected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"}`}>{selected && <HiOutlineCheck />}</span></button>;
            })}
          </div>
        </div>
      </section>

      <Textarea label="Anything else customers buy from you?" description="Use everyday language. Our filing specialist will confirm the final wording and classes." variant="bordered" labelPlacement="outside" placeholder="Example: custom printed packaging and an online store selling stationery" radius="lg" minRows={3} value={customActivity} onChange={(event) => { setCustomActivity(event.target.value); setValidation(false); }} isInvalid={validation} errorMessage="Select an activity or describe what your business offers." />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">How would you like your classes finalized?</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { value: "attorney_call", title: "Attorney review call", copy: "Discuss business activities and finalize the class strategy during a scheduled consultation." },
            { value: "application_review", title: "Review my application details", copy: "Have the filing team review the selections and contact me only if clarification is needed." },
          ].map((option) => {
            const selected = reviewPreference === option.value;
            return <button key={option.value} type="button" aria-pressed={selected} onClick={() => setReviewPreference(option.value)} className={`rounded-xl border-2 p-4 text-left transition ${selected ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300"}`}><span className="flex items-center justify-between font-bold text-slate-900">{option.title}<span className={`grid h-5 w-5 place-items-center rounded-full border-2 text-xs ${selected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"}`}>{selected && "✓"}</span></span><span className="mt-1 block text-sm leading-5 text-slate-600">{option.copy}</span></button>;
          })}
        </div>
      </section>

      <div className="sticky bottom-3 z-20 grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_12px_35px_rgba(15,23,42,0.16)] backdrop-blur sm:static sm:grid-cols-[auto_1fr_auto] sm:items-center sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
        <Button onClick={() => router.back()} className="h-14 w-full border-2 border-primary-theme bg-white px-7 text-base font-bold text-primary-theme sm:w-auto">Previous</Button>
        <div className="hidden items-center justify-center gap-2 text-sm text-slate-600 sm:flex"><IoMdLock /> Your selections are securely saved</div>
        <Button onClick={handleFormSubmit} className="h-14 w-full bg-primary-theme px-7 text-base font-bold text-white sm:w-auto" isLoading={isLoading} isDisabled={!classificationSummary}>Continue to packages</Button>
      </div>
    </main>
  );
};

export default StepTwo;
