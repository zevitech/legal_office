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
  {
    name: "Clothing & fashion",
    icon: "👕",
    activities: [
      { label: "Clothing, footwear or headwear", classNo: 25 },
      { label: "Retail or online clothing store", classNo: 35 },
      { label: "Bags, wallets or luggage", classNo: 18 },
      { label: "Jewelry and watches", classNo: 14 },
      { label: "Custom printing or embroidery", classNo: 40 },
      { label: "Fashion design services", classNo: 42 },
      { label: "Sunglasses and eyewear", classNo: 9 },
      { label: "Belts, scarves or accessories", classNo: 25 },
      { label: "Textiles and fabrics", classNo: 24 },
      { label: "Uniforms or workwear", classNo: 25 },
    ],
  },
  {
    name: "Food & beverage",
    icon: "🍽️",
    activities: [
      { label: "Restaurant, cafe or catering", classNo: 43 },
      { label: "Packaged foods or snacks", classNo: 30 },
      { label: "Beer, wine or spirits", classNo: 33 },
      { label: "Non-alcoholic drinks", classNo: 32 },
      { label: "Meat, dairy or prepared foods", classNo: 29 },
      { label: "Food delivery services", classNo: 39 },
      { label: "Bakery or confectionery", classNo: 30 },
      { label: "Coffee, tea or cocoa", classNo: 30 },
      { label: "Fresh produce or agricultural goods", classNo: 31 },
      { label: "Food truck or mobile catering", classNo: 43 },
      { label: "Bar, pub or nightclub", classNo: 43 },
      { label: "Sauces, spices or condiments", classNo: 30 },
    ],
  },
  {
    name: "Beauty & wellness",
    icon: "✨",
    activities: [
      { label: "Cosmetics or skincare products", classNo: 3 },
      { label: "Salon, spa or beauty services", classNo: 44 },
      { label: "Nutritional supplements", classNo: 5 },
      { label: "Beauty tools and applicators", classNo: 21 },
      { label: "Online beauty retail store", classNo: 35 },
      { label: "Wellness coaching or instruction", classNo: 41 },
      { label: "Hair care products", classNo: 3 },
      { label: "Perfume or fragrance", classNo: 3 },
      { label: "Nail salon services", classNo: 44 },
      { label: "Massage or therapy services", classNo: 44 },
      { label: "Tattoo or piercing services", classNo: 44 },
    ],
  },
  {
    name: "Technology & software",
    icon: "💻",
    activities: [
      { label: "Downloadable software or mobile app", classNo: 9 },
      { label: "SaaS or hosted software", classNo: 42 },
      { label: "Technology consulting", classNo: 42 },
      { label: "Computer hardware or devices", classNo: 9 },
      { label: "Telecommunications services", classNo: 38 },
      { label: "Online marketplace platform", classNo: 35 },
      { label: "Data hosting or cloud storage", classNo: 42 },
      { label: "Cybersecurity services", classNo: 42 },
      { label: "IT support and maintenance", classNo: 37 },
      { label: "Artificial intelligence software", classNo: 42 },
      { label: "Video game software", classNo: 9 },
      { label: "Web hosting services", classNo: 42 },
    ],
  },
  {
    name: "Retail & e-commerce",
    icon: "🛍️",
    activities: [
      { label: "Online or retail store services", classNo: 35 },
      { label: "Marketplace platform", classNo: 35 },
      { label: "Wholesale distribution", classNo: 35 },
      { label: "Subscription-box retail services", classNo: 35 },
      { label: "Product packaging", classNo: 16 },
      { label: "Delivery and fulfillment", classNo: 39 },
      { label: "Dropshipping services", classNo: 35 },
      { label: "Import and export agency", classNo: 35 },
      { label: "Vending machine services", classNo: 35 },
    ],
  },
  {
    name: "Marketing & creative",
    icon: "📣",
    activities: [
      { label: "Advertising or marketing services", classNo: 35 },
      { label: "Brand strategy or public relations", classNo: 35 },
      { label: "Graphic or packaging design", classNo: 42 },
      { label: "Photography or video production", classNo: 41 },
      { label: "Printed promotional materials", classNo: 16 },
      { label: "Website design or development", classNo: 42 },
      { label: "Social media management", classNo: 35 },
      { label: "Market research services", classNo: 35 },
      { label: "Copywriting or content creation", classNo: 41 },
      { label: "Event planning or promotion", classNo: 35 },
    ],
  },
  {
    name: "Professional services",
    icon: "💼",
    activities: [
      { label: "Business consulting", classNo: 35 },
      { label: "Legal services", classNo: 45 },
      { label: "Accounting or financial services", classNo: 36 },
      { label: "Education or training", classNo: 41 },
      { label: "Recruiting or staffing services", classNo: 35 },
      { label: "Research or technical consulting", classNo: 42 },
      { label: "Translation or interpretation", classNo: 41 },
      { label: "Notary or document services", classNo: 45 },
      { label: "Human resources consulting", classNo: 35 },
      { label: "Project management services", classNo: 35 },
      { label: "Security or investigation services", classNo: 45 },
    ],
  },
  {
    name: "Home & construction",
    icon: "🏠",
    activities: [
      { label: "Construction or repair services", classNo: 37 },
      { label: "Furniture", classNo: 20 },
      { label: "Cleaning services", classNo: 37 },
      { label: "Real estate services", classNo: 36 },
      { label: "Home decor products", classNo: 20 },
      { label: "Landscaping or gardening services", classNo: 44 },
      { label: "Plumbing services", classNo: 37 },
      { label: "Electrical contracting", classNo: 37 },
      { label: "HVAC installation or repair", classNo: 37 },
      { label: "Painting or decorating", classNo: 37 },
      { label: "Roofing services", classNo: 37 },
      { label: "Interior design services", classNo: 42 },
      { label: "Building materials", classNo: 19 },
      { label: "Tools and hardware", classNo: 8 },
      { label: "Kitchenware and housewares", classNo: 21 },
      { label: "Pest control services", classNo: 37 },
      { label: "Moving or storage services", classNo: 39 },
    ],
  },
  {
    name: "Health & medical",
    icon: "🩺",
    activities: [
      { label: "Medical or dental services", classNo: 44 },
      { label: "Medical devices", classNo: 10 },
      { label: "Pharmaceutical products", classNo: 5 },
      { label: "Telehealth services", classNo: 44 },
      { label: "Health education", classNo: 41 },
      { label: "Medical research", classNo: 42 },
      { label: "Mental health or counseling", classNo: 44 },
      { label: "Physical therapy or rehabilitation", classNo: 44 },
      { label: "Medical laboratory services", classNo: 44 },
      { label: "Home healthcare services", classNo: 44 },
      { label: "Optical or vision care", classNo: 44 },
    ],
  },
  {
    name: "Pets & animals",
    icon: "🐾",
    activities: [
      { label: "Pet grooming services", classNo: 44 },
      { label: "Pet food and treats", classNo: 31 },
      { label: "Veterinary services", classNo: 44 },
      { label: "Pet toys and accessories", classNo: 28 },
      { label: "Pet boarding or daycare", classNo: 43 },
      { label: "Dog training services", classNo: 41 },
      { label: "Pet clothing and collars", classNo: 18 },
      { label: "Animal breeding services", classNo: 44 },
      { label: "Livestock or farm animals", classNo: 31 },
      { label: "Pet retail store", classNo: 35 },
    ],
  },
  {
    name: "Entertainment & media",
    icon: "🎬",
    activities: [
      { label: "Entertainment or live events", classNo: 41 },
      { label: "Publishing or downloadable media", classNo: 9 },
      { label: "Streaming entertainment", classNo: 41 },
      { label: "Podcasts or recorded media", classNo: 9 },
      { label: "Music production or performances", classNo: 41 },
      { label: "Printed books or publications", classNo: 16 },
      { label: "Film or television production", classNo: 41 },
      { label: "Talent or artist management", classNo: 35 },
      { label: "Gaming or esports events", classNo: 41 },
      { label: "News or magazine publishing", classNo: 16 },
    ],
  },
  {
    name: "Fitness & sports",
    icon: "🏋️",
    activities: [
      { label: "Fitness instruction or gym services", classNo: 41 },
      { label: "Sporting goods", classNo: 28 },
      { label: "Athletic clothing", classNo: 25 },
      { label: "Fitness equipment", classNo: 28 },
      { label: "Sports events or competitions", classNo: 41 },
      { label: "Nutrition or wellness coaching", classNo: 44 },
      { label: "Personal training services", classNo: 41 },
      { label: "Sports team or club", classNo: 41 },
      { label: "Yoga or pilates studio", classNo: 41 },
      { label: "Outdoor or camping gear", classNo: 28 },
    ],
  },
  {
    name: "Transportation & automotive",
    icon: "🚚",
    activities: [
      { label: "Delivery, transport or logistics", classNo: 39 },
      { label: "Vehicles", classNo: 12 },
      { label: "Travel booking services", classNo: 39 },
      { label: "Vehicle repair or maintenance", classNo: 37 },
      { label: "Transportation software", classNo: 42 },
      { label: "Auto parts and accessories", classNo: 12 },
      { label: "Car wash or detailing", classNo: 37 },
      { label: "Vehicle rental or leasing", classNo: 39 },
      { label: "Trucking or freight services", classNo: 39 },
      { label: "Taxi or rideshare services", classNo: 39 },
      { label: "Fuel and lubricants", classNo: 4 },
    ],
  },
  {
    name: "Finance & insurance",
    icon: "🏦",
    activities: [
      { label: "Financial or investment services", classNo: 36 },
      { label: "Insurance services", classNo: 36 },
      { label: "Banking services", classNo: 36 },
      { label: "Payment processing", classNo: 36 },
      { label: "Mortgage or lending services", classNo: 36 },
      { label: "Cryptocurrency or blockchain services", classNo: 36 },
      { label: "Tax preparation services", classNo: 35 },
      { label: "Financial software", classNo: 9 },
      { label: "Credit or debt counseling", classNo: 36 },
      { label: "Real estate investment", classNo: 36 },
    ],
  },
  {
    name: "Education & training",
    icon: "🎓",
    activities: [
      { label: "School or academy services", classNo: 41 },
      { label: "Online courses or e-learning", classNo: 41 },
      { label: "Tutoring services", classNo: 41 },
      { label: "Corporate training", classNo: 41 },
      { label: "Educational publications", classNo: 16 },
      { label: "Childcare or daycare services", classNo: 43 },
      { label: "Vocational or trade training", classNo: 41 },
      { label: "Language instruction", classNo: 41 },
      { label: "Test preparation services", classNo: 41 },
      { label: "Educational software", classNo: 9 },
    ],
  },
  {
    name: "Manufacturing & industrial",
    icon: "🏭",
    activities: [
      { label: "Custom manufacturing services", classNo: 40 },
      { label: "Industrial machinery", classNo: 7 },
      { label: "Metal goods and materials", classNo: 6 },
      { label: "Chemicals for industry", classNo: 1 },
      { label: "Plastics and raw materials", classNo: 17 },
      { label: "Packaging and containers", classNo: 20 },
      { label: "3D printing services", classNo: 40 },
      { label: "Electrical components", classNo: 9 },
      { label: "Paper and paper goods", classNo: 16 },
      { label: "Rubber or insulation products", classNo: 17 },
      { label: "Welding services", classNo: 40 },
      { label: "Machine parts and tools", classNo: 7 },
    ],
  },
  {
    name: "Agriculture & environment",
    icon: "🌱",
    activities: [
      { label: "Farming or crop production", classNo: 31 },
      { label: "Seeds, plants and flowers", classNo: 31 },
      { label: "Fertilizers and soil products", classNo: 1 },
      { label: "Agricultural machinery", classNo: 7 },
      { label: "Waste management or recycling", classNo: 40 },
      { label: "Renewable energy services", classNo: 40 },
      { label: "Water treatment services", classNo: 40 },
      { label: "Environmental consulting", classNo: 42 },
      { label: "Nursery or garden center", classNo: 35 },
      { label: "Forestry services", classNo: 44 },
    ],
  },
  {
    name: "Other business",
    icon: "➕",
    activities: [
      { label: "I need help identifying my class", classNo: null },
    ],
  },
];

const StepTwo = ({ previewMode = false }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const stepOneData = useSelector((state) => state.form.stepOne);
  const [activeIndustry, setActiveIndustry] = useState(INDUSTRIES[0].name);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [customActivity, setCustomActivity] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [previewComplete, setPreviewComplete] = useState(false);
  const reviewPreference = "application_review";

  const filteredIndustries = INDUSTRIES.filter((industry) =>
    `${industry.name} ${industry.activities.map((item) => item.label).join(" ")}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const industry =
    filteredIndustries.find((item) => item.name === activeIndustry) ||
    filteredIndustries[0];
  const uniqueClasses = [
    ...new Set(selectedActivities.map((item) => item.classNo).filter(Boolean)),
  ];
  const classificationSummary = useMemo(
    () =>
      [...selectedActivities.map((item) => item.label), customActivity]
        .filter(Boolean)
        .join(", "),
    [selectedActivities, customActivity],
  );

  if (
    !previewMode &&
    process.env.NODE_ENV === "production" &&
    Object.keys(stepOneData).length === 0
  ) {
    return router.push(process.env.NEXT_PUBLIC_APP_URL + "/trademark-register");
  }

  const toggleActivity = (activity, sourceIndustry) => {
    setSelectedActivities((current) =>
      current.some((item) => item.label === activity.label)
        ? current.filter((item) => item.label !== activity.label)
        : [
            ...current,
            {
              ...activity,
              industry: sourceIndustry || activity.industry || activeIndustry,
            },
          ],
    );
    setValidation(false);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    const normalized = value.toLowerCase();
    const firstMatch = INDUSTRIES.find((item) =>
      `${item.name} ${item.activities.map((activity) => activity.label).join(" ")}`
        .toLowerCase()
        .includes(normalized),
    );
    if (firstMatch) setActiveIndustry(firstMatch.name);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!classificationSummary || (industry?.name === "Other business" && !customActivity.trim())) {
      setValidation(true);
      return;
    }
    setIsLoading(true);
    const payload = {
      trademarkClassification: classificationSummary,
      selectedActivities,
      estimatedClassCount: Math.max(
        uniqueClasses.length,
        customActivity ? 1 : 0,
      ),
      reviewPreference,
    };
    dispatch(saveStepTwo(payload));

    if (previewMode) {
      setIsLoading(false);
      setPreviewComplete(true);
      return;
    }

    try {
      if (process.env.NODE_ENV !== "production")
        return router.push("/trademark-register/step-3");
      await axios.post("/api/save-data", {
        ...stepOneData,
        ...payload,
        zoho_step: 2,
      });
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
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary-theme">
          Goods and services
        </p>
        <h1 className="mt-2 font-inria text-3xl font-bold text-heading-color sm:text-4xl">
          What does your business offer?
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          Select everything your business currently offers or plans to offer.
          Our filing team will use this information to prepare the classification
          review.
        </p>
      </div>

      <div className="relative">
        <HiOutlineSearch className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-xl text-slate-400" />
        <input
          value={search}
          onChange={handleSearchChange}
          placeholder="Search industries or activities"
          className="min-h-14 w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>


      <section className="grid gap-5 lg:h-[680px] lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="max-h-[360px] overflow-y-scroll rounded-2xl border border-slate-200 bg-slate-50 shadow-inner [scrollbar-color:#60a5fa_#e2e8f0] [scrollbar-width:thin] lg:h-full lg:max-h-none">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-slate-50/95 px-3 py-3 text-xs font-bold uppercase tracking-wide text-slate-600 backdrop-blur">
            <span>Business categories</span>
            <span className="text-blue-700">Scroll to explore ↓</span>
          </div>
          <div className="grid grid-cols-2 gap-2 p-2 pr-1 sm:grid-cols-3 lg:grid-cols-1">
            {filteredIndustries.map((item) => {
              const selected = activeIndustry === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setActiveIndustry(item.name);
                    setValidation(false);
                  }}
                  className={`flex min-h-16 items-center gap-3 rounded-xl border-2 p-3 text-left text-sm font-semibold transition ${selected ? "border-blue-600 bg-blue-50 text-blue-900" : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"}`}
                >
                  <span className="text-xl" aria-hidden="true">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:h-full lg:overflow-y-auto lg:[scrollbar-color:#cbd5e1_transparent] lg:[scrollbar-width:thin]">
          <h2 className="text-xl font-bold text-slate-900">
            <span aria-hidden="true">{industry?.icon}</span> {industry?.name}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {industry?.name === "Other business" ? "Describe what customers buy from you." : "Select all that apply."}
          </p>
          {industry?.name === "Other business" ? (
            <div className="mt-5">
              <Textarea
                label="Describe your business"
                description="Use everyday language. Include the main products you sell or services you provide."
                variant="bordered"
                labelPlacement="outside"
                placeholder="Example: I provide mobile car detailing and sell vehicle cleaning products online"
                radius="lg"
                minRows={6}
                value={customActivity}
                onChange={(event) => {
                  setCustomActivity(event.target.value);
                  setValidation(false);
                }}
                isRequired
                isInvalid={validation}
                errorMessage="Describe what your business offers."
              />
            </div>
          ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {industry?.activities.map((activity) => {
              const selected = selectedActivities.some(
                (item) => item.label === activity.label,
              );
              return (
                <button
                  key={activity.label}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleActivity(activity, industry?.name)}
                  className={`flex min-h-20 items-start justify-between gap-3 rounded-xl border-2 p-4 text-left transition ${selected ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300"}`}
                >
                  <span>
                    <span className="block font-semibold text-slate-900">{activity.label}</span>
                    <span className="mt-1 block text-xs text-slate-500">Business activity</span>
                  </span>
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${selected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"}`}
                  >
                    {selected && <HiOutlineCheck />}
                  </span>
                </button>
              );
            })}
          </div>
          )}
        </div>
      </section>

      {industry?.name !== "Other business" && (
      <Textarea
        label="Anything else customers buy from you?"
        description="Use everyday language. Our filing specialist will confirm the final wording and classes."
        variant="bordered"
        labelPlacement="outside"
        placeholder="Example: custom printed packaging and an online store selling stationery"
        radius="lg"
        minRows={3}
        value={customActivity}
        onChange={(event) => {
          setCustomActivity(event.target.value);
          setValidation(false);
        }}
        isInvalid={validation}
        errorMessage="Select an activity or describe what your business offers."
      />
      )}

      <div className="sticky bottom-3 z-20 grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_12px_35px_rgba(15,23,42,0.16)] backdrop-blur sm:grid-cols-[auto_1fr_auto] sm:items-center">
        <Button
          onClick={() => router.back()}
          className="h-14 w-full border-2 border-primary-theme bg-white px-7 text-base font-bold text-primary-theme sm:w-auto"
        >
          Previous
        </Button>
        <div className={`hidden items-center justify-center gap-2 text-sm sm:flex ${previewComplete ? "font-semibold text-emerald-700" : "text-slate-600"}`} role={previewComplete ? "status" : undefined}>
          {previewComplete ? <HiOutlineCheck /> : <IoMdLock />} {previewComplete ? "Preview selections are ready" : "Your selections are securely saved"}
        </div>
        <Button
          onClick={handleFormSubmit}
          className="h-14 w-full bg-primary-theme px-7 text-base font-bold text-white sm:w-auto"
          isLoading={isLoading}
          isDisabled={industry?.name === "Other business" ? !customActivity.trim() : !classificationSummary}
        >
          Continue to packages
        </Button>
      </div>
    </main>
  );
};

export default StepTwo;
