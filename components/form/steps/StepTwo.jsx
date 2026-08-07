"use client";

import React, { useMemo, useState } from "react";
import axios from "axios";
import { Button, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { saveStepTwo } from "@/features/formSlice";
import { IoMdLock } from "react-icons/io";
import {
  HiOutlineCheck,
  HiOutlineInformationCircle,
  HiOutlineSearch,
  HiOutlineX,
} from "react-icons/hi";
import {
  TbShirt,
  TbToolsKitchen2,
  TbSparkles,
  TbDeviceLaptop,
  TbShoppingBag,
  TbSpeakerphone,
  TbBriefcase,
  TbHome,
  TbStethoscope,
  TbMovie,
  TbBarbell,
  TbTruck,
  TbDots,
} from "react-icons/tb";
import { trackClassificationComplete } from "@/utils/tracking";
import FormLoader from "@/components/form/FormLoader";

const INDUSTRIES = [
  {
    name: "Clothing & fashion",
    Icon: TbShirt,
    activities: [
      { label: "Clothing, footwear or headwear", classNo: 25 },
      { label: "Retail or online clothing store", classNo: 35 },
      { label: "Bags, wallets or luggage", classNo: 18 },
      { label: "Jewelry and watches", classNo: 14 },
      { label: "Custom printing or embroidery", classNo: 40 },
      { label: "Fashion design services", classNo: 42 },
    ],
  },
  {
    name: "Food & beverage",
    Icon: TbToolsKitchen2,
    activities: [
      { label: "Restaurant, café or catering", classNo: 43 },
      { label: "Packaged foods or snacks", classNo: 30 },
      { label: "Beer, wine or spirits", classNo: 33 },
      { label: "Non-alcoholic drinks", classNo: 32 },
      { label: "Meat, dairy or prepared foods", classNo: 29 },
      { label: "Food delivery services", classNo: 39 },
    ],
  },
  {
    name: "Beauty & wellness",
    Icon: TbSparkles,
    activities: [
      { label: "Cosmetics or skincare products", classNo: 3 },
      { label: "Salon, spa or beauty services", classNo: 44 },
      { label: "Nutritional supplements", classNo: 5 },
      { label: "Beauty tools and applicators", classNo: 21 },
      { label: "Online beauty retail store", classNo: 35 },
      { label: "Wellness coaching or instruction", classNo: 41 },
    ],
  },
  {
    name: "Technology & software",
    Icon: TbDeviceLaptop,
    activities: [
      { label: "Downloadable software or mobile app", classNo: 9 },
      { label: "SaaS or hosted software", classNo: 42 },
      { label: "Technology consulting", classNo: 42 },
      { label: "Computer hardware or devices", classNo: 9 },
      { label: "Telecommunications services", classNo: 38 },
      { label: "Online marketplace platform", classNo: 35 },
    ],
  },
  {
    name: "Retail & e-commerce",
    Icon: TbShoppingBag,
    activities: [
      { label: "Online or retail store services", classNo: 35 },
      { label: "Marketplace platform", classNo: 35 },
      { label: "Wholesale distribution", classNo: 35 },
      { label: "Subscription-box retail services", classNo: 35 },
      { label: "Product packaging", classNo: 16 },
      { label: "Delivery and fulfillment", classNo: 39 },
    ],
  },
  {
    name: "Marketing & creative",
    Icon: TbSpeakerphone,
    activities: [
      { label: "Advertising or marketing services", classNo: 35 },
      { label: "Brand strategy or public relations", classNo: 35 },
      { label: "Graphic or packaging design", classNo: 42 },
      { label: "Photography or video production", classNo: 41 },
      { label: "Printed promotional materials", classNo: 16 },
      { label: "Website design or development", classNo: 42 },
    ],
  },
  {
    name: "Professional services",
    Icon: TbBriefcase,
    activities: [
      { label: "Business consulting", classNo: 35 },
      { label: "Legal services", classNo: 45 },
      { label: "Accounting or financial services", classNo: 36 },
      { label: "Education or training", classNo: 41 },
      { label: "Recruiting or staffing services", classNo: 35 },
      { label: "Research or technical consulting", classNo: 42 },
    ],
  },
  {
    name: "Home & construction",
    Icon: TbHome,
    activities: [
      { label: "Construction or repair services", classNo: 37 },
      { label: "Furniture", classNo: 20 },
      { label: "Cleaning services", classNo: 37 },
      { label: "Real estate services", classNo: 36 },
      { label: "Home décor products", classNo: 20 },
      { label: "Landscaping services", classNo: 44 },
    ],
  },
  {
    name: "Health & medical",
    Icon: TbStethoscope,
    activities: [
      { label: "Medical or dental services", classNo: 44 },
      { label: "Medical devices", classNo: 10 },
      { label: "Pharmaceutical products", classNo: 5 },
      { label: "Telehealth services", classNo: 44 },
      { label: "Health education", classNo: 41 },
      { label: "Medical research", classNo: 42 },
    ],
  },
  {
    name: "Entertainment & media",
    Icon: TbMovie,
    activities: [
      { label: "Entertainment or live events", classNo: 41 },
      { label: "Publishing or downloadable media", classNo: 9 },
      { label: "Streaming entertainment", classNo: 41 },
      { label: "Podcasts or recorded media", classNo: 9 },
      { label: "Music production or performances", classNo: 41 },
      { label: "Printed books or publications", classNo: 16 },
    ],
  },  
  {
    name: "Fitness & sports",
    Icon: TbBarbell,
    activities: [
      { label: "Fitness instruction or gym services", classNo: 41 },
      { label: "Sporting goods", classNo: 28 },
      { label: "Athletic clothing", classNo: 25 },
      { label: "Fitness equipment", classNo: 28 },
      { label: "Sports events or competitions", classNo: 41 },
      { label: "Nutrition or wellness coaching", classNo: 44 },
    ],
  },
  {
    name: "Transportation",
    Icon: TbTruck,
    activities: [
      { label: "Delivery, transport or logistics", classNo: 39 },
      { label: "Vehicles", classNo: 12 },
      { label: "Travel booking services", classNo: 39 },
      { label: "Vehicle repair or maintenance", classNo: 37 },
      { label: "Moving or storage services", classNo: 39 },
      { label: "Transportation software", classNo: 42 },
    ],
  },
  {
    name: "Other business",
    Icon: TbDots,
    activities: [{ label: "I need help identifying my class", classNo: null }],
  },
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

  const query = search.trim().toLowerCase();

  // When searching, surface matching activities from EVERY industry so the user
  // never has to guess which category their business sits in.
  const searchResults = useMemo(() => {
    if (!query) return [];
    return INDUSTRIES.flatMap((item) =>
      item.activities
        .filter((activity) => activity.label.toLowerCase().includes(query))
        .map((activity) => ({
          ...activity,
          industry: item.name,
          Icon: item.Icon,
        })),
    ).slice(0, 12);
  }, [query]);

  const industry =
    INDUSTRIES.find((item) => item.name === activeIndustry) || INDUSTRIES[0];

  const estimatedClasses = Math.max(
    [...new Set(selectedActivities.map((item) => item.classNo).filter(Boolean))]
      .length,
    customActivity ? 1 : 0,
  );
  const classificationSummary = useMemo(
    () =>
      [...selectedActivities.map((item) => item.label), customActivity]
        .filter(Boolean)
        .join(", "),
    [selectedActivities, customActivity],
  );

  if (
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
              label: activity.label,
              classNo: activity.classNo,
              industry: sourceIndustry || activity.industry || activeIndustry,
            },
          ],
    );
    setValidation(false);
  };

  const isSelected = (label) =>
    selectedActivities.some((item) => item.label === label);

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
      estimatedClassCount: estimatedClasses,
      reviewPreference,
    };
    dispatch(saveStepTwo(payload));

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
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-theme">
          Goods and services
        </p>
        <h1 className="mt-1 font-inria text-2xl font-bold text-heading-color sm:text-3xl">
          What does your business offer?
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-600">
          Pick everything you sell now or plan to sell. This decides which USPTO
          classes your mark is filed under.
        </p>
      </div>

      <div className="relative">
        <HiOutlineSearch className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-slate-400" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search what you sell — e.g. coffee shop, t-shirts, mobile app"
          className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-11 pr-10 text-[15px] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <HiOutlineX className="text-lg" />
          </button>
        )}
      </div>

      {/* Running summary of what has been picked so far */}
      {selectedActivities.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-blue-200 bg-blue-50/60 p-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            Selected
          </span>
          {selectedActivities.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => toggleActivity(item)}
              className="group inline-flex items-center gap-1.5 rounded-full border border-blue-300 bg-white py-1 pl-3 pr-2 text-xs font-medium text-slate-800 transition hover:border-red-300 hover:bg-red-50"
            >
              {item.label}
              <HiOutlineX className="text-sm text-slate-400 transition group-hover:text-red-500" />
            </button>
          ))}
        </div>
      )}

      {query ? (
        /* SEARCH RESULTS — matches from every industry, not just the active one */
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-sm font-semibold text-slate-900">
            {searchResults.length
              ? `${searchResults.length} match${searchResults.length === 1 ? "" : "es"} for “${search.trim()}”`
              : `No matches for “${search.trim()}”`}
          </h2>

          {searchResults.length > 0 ? (
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {searchResults.map((activity) => {
                const selected = isSelected(activity.label);
                const RowIcon = activity.Icon;
                return (
                  <button
                    key={`${activity.industry}-${activity.label}`}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleActivity(activity, activity.industry)}
                    className={`flex items-center justify-between gap-3 rounded-xl border p-3 text-left transition ${selected ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"}`}
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <RowIcon className="shrink-0 text-lg text-slate-400" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-slate-900">
                          {activity.label}
                        </span>
                        <span className="block truncate text-xs text-slate-500">
                          {activity.industry}
                        </span>
                      </span>
                    </span>
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${selected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"}`}
                    >
                      {selected && <HiOutlineCheck className="text-xs" />}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-600">
              Try a different word, or describe it in the box below — our filing
              specialist will identify the right class for you.
            </p>
          )}
        </section>
      ) : (
        /* BROWSE BY INDUSTRY */
        <section className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {INDUSTRIES.map((item) => {
              const active = activeIndustry === item.name;
              const count = selectedActivities.filter(
                (selectedItem) => selectedItem.industry === item.name,
              ).length;
              const TabIcon = item.Icon;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveIndustry(item.name)}
                  className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-[13px] font-medium transition ${active ? "border-blue-600 bg-blue-50 text-blue-900" : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50"}`}
                >
                  <TabIcon
                    className={`shrink-0 text-lg ${active ? "text-blue-600" : "text-slate-400"}`}
                  />
                  <span className="min-w-0 flex-1 truncate">{item.name}</span>
                  {count > 0 && (
                    <span className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-blue-600 px-1 text-[11px] font-bold text-white">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <industry.Icon className="text-xl text-blue-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {industry?.name}
                </h2>
                <p className="text-xs text-slate-500">Select all that apply.</p>
              </div>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {industry?.activities.map((activity) => {
                const selected = isSelected(activity.label);
                return (
                  <button
                    key={activity.label}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleActivity(activity, industry.name)}
                    className={`flex items-center justify-between gap-3 rounded-xl border p-3 text-left transition ${selected ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"}`}
                  >
                    <span className="min-w-0 text-sm font-medium text-slate-900">
                      {activity.label}
                    </span>
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${selected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"}`}
                    >
                      {selected && <HiOutlineCheck className="text-xs" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

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

      <section className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              Potential trademark coverage
            </p>
            <p className="mt-0.5 text-xl font-bold text-slate-900">
              {estimatedClasses} potential USPTO{" "}
              {estimatedClasses === 1 ? "class" : "classes"}
            </p>
            <p className="mt-0.5 text-xs text-slate-600">
              Based on the activities selected above.
            </p>
          </div>
          <div className="rounded-xl bg-white px-4 py-2.5 text-left shadow-sm sm:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Government filing fee
            </p>
            <p className="text-lg font-bold text-slate-900">$350 per class</p>
            <p className="text-[11px] text-slate-500">
              Paid separately before filing
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-start gap-2 border-t border-blue-200 pt-3 text-xs leading-5 text-blue-950">
          <HiOutlineInformationCircle className="mt-0.5 shrink-0 text-base" />
          <p>
            Your attorney confirms the final classes and filing strategy with you
            before the application is submitted.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          How would you like your classes finalized?
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            {
              value: "attorney_call",
              title: "Attorney review call",
              copy: "Discuss business activities and finalize the class strategy during a scheduled consultation.",
            },
            {
              value: "application_review",
              title: "Review my application details",
              copy: "Have the filing team review the selections and contact me only if clarification is needed.",
            },
          ].map((option) => {
            const selected = reviewPreference === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() => setReviewPreference(option.value)}
                className={`rounded-xl border-2 p-4 text-left transition ${selected ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300"}`}
              >
                <span className="flex items-center justify-between font-bold text-slate-900">
                  {option.title}
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full border-2 text-xs ${selected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"}`}
                  >
                    {selected && "✓"}
                  </span>
                </span>
                <span className="mt-1 block text-sm leading-5 text-slate-600">
                  {option.copy}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="sticky bottom-3 z-20 grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_12px_35px_rgba(15,23,42,0.16)] backdrop-blur sm:static sm:grid-cols-[auto_1fr_auto] sm:items-center sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
        <Button
          onClick={() => router.back()}
          className="h-14 w-full border-2 border-primary-theme bg-white px-7 text-base font-bold text-primary-theme sm:w-auto"
        >
          Previous
        </Button>
        <div className="hidden items-center justify-center gap-2 text-sm text-slate-600 sm:flex">
          <IoMdLock /> Your selections are securely saved
        </div>
        <Button
          onClick={handleFormSubmit}
          className="h-14 w-full bg-primary-theme px-7 text-base font-bold text-white sm:w-auto"
          isLoading={isLoading}
          isDisabled={!classificationSummary}
        >
          Continue to packages
        </Button>
      </div>
    </main>
  );
};

export default StepTwo;
