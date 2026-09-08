"use client";

import React, { useEffect, useMemo, useState } from "react";
import FormLoader from "@/components/form/FormLoader";
import axios from "axios";
import { Button, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { saveStepTwo } from "@/features/formSlice";
import { IoMdLock } from "react-icons/io";
import { HiOutlineCheck, HiOutlineSearch } from "react-icons/hi";
import { trackClassificationComplete } from "@/utils/tracking";
import { extraIndustries, matchesBusiness, suggestActivities } from "../businessDiscovery";
import { FaTshirt, FaUtensils, FaSpa, FaLaptop, FaShoppingBag, FaBullhorn, FaBriefcase, FaHome, FaHeartbeat, FaPaw, FaFilm, FaDumbbell, FaTruck, FaUniversity, FaGraduationCap, FaIndustry, FaLeaf, FaBuilding, FaSuitcase, FaCouch, FaCalendar, FaHandsHelping, FaShieldAlt, FaCamera, FaQuestionCircle } from "react-icons/fa";

const iconList = [FaTshirt, FaUtensils, FaSpa, FaLaptop, FaShoppingBag, FaBullhorn, FaBriefcase, FaHome, FaHeartbeat, FaPaw, FaFilm, FaDumbbell, FaTruck, FaUniversity, FaGraduationCap, FaIndustry, FaLeaf, FaBuilding, FaSuitcase, FaCouch, FaCalendar, FaHandsHelping, FaShieldAlt, FaCamera, FaQuestionCircle];
function IndustryIcon({name}) {
  const Icon = iconList[INDUSTRIES.findIndex(item => item.name === name)] || FaBriefcase;
  return <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-primary-theme" />;
}

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

INDUSTRIES.splice(INDUSTRIES.length - 1, 0, ...extraIndustries);

const StepTwo = ({ previewMode: requestedPreviewMode = false }) => {
  const previewMode = process.env.NODE_ENV !== "production" && requestedPreviewMode;
  const router = useRouter();
  const dispatch = useDispatch();
  const stepOneData = useSelector((state) => state.form.stepOne);
  const [activeIndustry, setActiveIndustry] = useState(INDUSTRIES[0].name);
  const savedStep = useSelector((state) => state.form.stepTwo);
  const [selectedActivities, setSelectedActivities] = useState(() => (savedStep.selectedActivities || []).filter(item => item.classNo || item.reviewRequired));
  const [customActivity, setCustomActivity] = useState(() => (savedStep.selectedActivities || []).filter(item => !item.classNo && !item.reviewRequired).map(item => item.label).join(", "));
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [previewComplete, setPreviewComplete] = useState(false);
  const [draftReady, setDraftReady] = useState(false);
  const reviewPreference = "application_review";
  const draftKey = `lto-classification-draft:${JSON.stringify(stepOneData)}`;
  useEffect(() => {
    try {
      const draft = JSON.parse(sessionStorage.getItem(draftKey) || "null");
      if (draft && Date.now() - draft.time < 86400000) {
        setSelectedActivities(draft.activities || []); setCustomActivity(draft.description || "");
        if (INDUSTRIES.some(item => item.name === draft.category)) setActiveIndustry(draft.category);
      }
    } catch {}
    setDraftReady(true);
  }, [draftKey]);
  useEffect(() => {
    if (!draftReady) return;
    try { sessionStorage.setItem(draftKey, JSON.stringify({time:Date.now(),activities:selectedActivities,description:customActivity,category:activeIndustry})); } catch {}
  }, [draftReady, draftKey, selectedActivities, customActivity, activeIndustry]);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const suggestions = suggestActivities(INDUSTRIES, customActivity);
  const visibleSuggestions = showAllSuggestions ? suggestions : suggestions.slice(0, 4);
  const countFor = name => selectedActivities.filter(item => item.industry === name).length;

  const filteredIndustries = INDUSTRIES.filter((industry) =>
    matchesBusiness(`${industry.name} ${industry.activities.map((item) => item.label).join(" ")}`, search),
  );
  const industry =
    filteredIndustries.find((item) => item.name === activeIndustry) ||
    filteredIndustries[0];
  const visibleActivities = search.trim()
    ? INDUSTRIES.flatMap(group => group.activities.filter(activity => matchesBusiness(`${group.name} ${activity.label}`, search)).map(activity => ({...activity, industry: group.name})))
    : (industry?.activities || []).map(activity => ({...activity, industry: industry.name}));
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
      matchesBusiness(`${item.name} ${item.activities.map((activity) => activity.label).join(" ")}`, normalized),
    );
    if (normalized.trim() && firstMatch) setActiveIndustry(firstMatch.name);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!classificationSummary.trim()) {
      setValidation(true);
      return;
    }
    setIsLoading(true);
    const payload = {
      trademarkClassification: classificationSummary,
      // "Other business" leaves selectedActivities empty, so the customer's own
      // description reached email and CRM only through trademarkClassification.
      selectedActivities: customActivity.trim()
        ? [...selectedActivities, { label: customActivity.trim(), classNo: null }]
        : selectedActivities,
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

    if (process.env.NODE_ENV !== "production")
      return router.push("/trademark-register/step-3");

    // Awaited: navigating in the same tick cancelled the in-flight request, so
    // the step never reached email or the CRM.
    try {
      await axios.post("/api/save-data", {
        ...stepOneData,
        ...payload,
        zoho_step: 2,
      }, { timeout: 20000 });
      trackClassificationComplete({
        activityCount: selectedActivities.length + (customActivity ? 1 : 0),
        classCount: payload.estimatedClassCount,
        reviewPreference,
      });
    } catch (error) {
      console.log("Error sending step 2 data:", error);
    }
    setIsLoading(false);
    return router.push("/trademark-register/step-3");
  };

  return (
    <section className="system-page-standard-layout flex flex-col gap-7" aria-labelledby="goods-services-heading">
      <FormLoader isVisible={isLoading} />
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary-theme">
          Goods and services
        </p>
        <h1 id="goods-services-heading" className="mt-2 font-inria text-3xl font-bold text-heading-color sm:text-4xl">
          What does your business offer?
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          Tell us what you sell or do. Our paralegal team will review your activities before filing.
        </p>
      </div>

      <div className="rounded-xl border border-sky-100 bg-sky-50 p-4">
        <label htmlFor="business-description" className="mb-2 block font-semibold">Describe your products or services</label>
        <textarea id="business-description" value={customActivity} onChange={event => {setCustomActivity(event.target.value);setValidation(false);}} placeholder="Example: We sell T-shirts and print custom designs" rows={2} className="w-full rounded-lg border border-slate-300 bg-white p-3 text-base" />
        <p className="mt-2 text-sm text-slate-600">Describe your business or select activities below.</p>
        {suggestions.length > 0 && <div className="mt-4">
          <p className="mb-2 text-sm font-semibold text-slate-800">Suggested from your description · select what applies</p>
          <div id="activity-suggestions" className="grid gap-2 sm:grid-cols-2">{visibleSuggestions.map(item => {
            const selected = selectedActivities.some(activity => activity.label === item.label);
            return <button key={`${item.industry}-${item.label}`} type="button" aria-pressed={selected} onClick={() => toggleActivity(item, item.industry)} className={`flex min-h-16 items-center gap-3 rounded-xl border p-3 text-left text-sm transition-colors hover:border-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme ${selected ? "border-primary-theme bg-sky-100" : "border-sky-200 bg-white"}`}><IndustryIcon name={item.industry} /><span className="min-w-0 flex-1"><span className="block font-semibold">{item.label}</span><span className="mt-1 block text-xs text-slate-500">{item.industry}{selected ? " · Selected" : ""}</span></span><span aria-hidden="true" className="text-lg text-primary-theme">{selected ? "✓" : "+"}</span></button>;
          })}</div>
          {suggestions.length > 4 && <button type="button" aria-expanded={showAllSuggestions} aria-controls="activity-suggestions" onClick={() => setShowAllSuggestions(value => !value)} className="mt-2 min-h-11 rounded-lg px-2 text-sm font-semibold text-primary-theme focus-visible:ring-2 focus-visible:ring-primary-theme">{showAllSuggestions ? "Show fewer suggestions" : `Show ${suggestions.length - 4} more suggestions`}</button>}
        </div>}
      </div>
      <details className="rounded-xl border border-slate-200 bg-white p-4">
      <summary className="min-h-11 cursor-pointer py-2 font-semibold text-primary-theme">Browse categories or search activities manually</summary>
      <div className="mt-3 flex flex-col gap-5">
      <div className="relative">
        <HiOutlineSearch className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-xl text-slate-400" />
        <input
          aria-label="Search industries or activities"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search industries or activities"
          className="min-h-14 w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>


      <div className="lg:hidden">
        <label htmlFor="industry-picker" className="mb-2 block text-sm font-semibold">Business category</label>
        <div className="mb-2 flex items-center gap-2 text-sm text-slate-600"><IndustryIcon name={activeIndustry} /> {activeIndustry}</div>
        <select id="industry-picker" value={activeIndustry} onChange={event => {setActiveIndustry(event.target.value);setSearch("");}} className="min-h-12 w-full rounded-xl border border-slate-300 bg-white p-3 text-base">
          {INDUSTRIES.map(item => <option key={item.name} value={item.name}>{item.name}{countFor(item.name) ? ` · ${countFor(item.name)} selected` : ""}</option>)}
        </select>
      </div>
      <section className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="hidden max-h-[520px] overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 lg:block">
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
                    setSearch("");
                    setValidation(false);
                  }}
                  className={`flex min-h-16 items-center gap-3 rounded-xl border-2 p-3 text-left text-sm font-semibold transition ${selected ? "border-blue-600 bg-blue-50 text-blue-900" : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"}`}
                >
                  <IndustryIcon name={item.name} /><span>{item.name}{countFor(item.name) > 0 && <span className="ml-2 text-xs text-primary-theme">{countFor(item.name)} selected</span>}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <IndustryIcon name={industry?.name} />
            {search.trim() ? `Matching activities (${visibleActivities.length})` : industry?.name}
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
            {search.trim() && visibleActivities.length === 0 && <p className="text-sm text-slate-600 sm:col-span-2">No matching activities. Try another word or describe your business below.</p>}
            {visibleActivities.map((activity) => {
              const selected = selectedActivities.some(
                (item) => item.label === activity.label,
              );
              return (
                <button
                  key={`${activity.industry}-${activity.label}`}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleActivity(activity, activity.industry)}
                  className={`flex min-h-14 items-center justify-between gap-3 rounded-xl border-2 p-3 text-left text-sm transition-colors ${selected ? "border-primary-theme bg-sky-50" : "border-slate-200 hover:border-primary-theme"}`}
                >
                  <span>
                    <span className="block font-semibold text-slate-900">{activity.label}</span>
                    {search.trim() && <span className="mt-1 block text-xs text-slate-500">{activity.industry}</span>}
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

      </div>
      </details>
      {selectedActivities.length > 0 && <section className="rounded-xl border border-sky-100 bg-sky-50 p-4" aria-label="Your selections">
        <h2 className="mb-3 text-sm font-bold" aria-live="polite">Your selections · {selectedActivities.length}</h2>
        <div className="flex flex-wrap gap-2">{selectedActivities.map(activity => <button key={activity.label} type="button" aria-label={`Remove ${activity.label}`} onClick={() => toggleActivity(activity, activity.industry)} className="flex min-h-11 items-center gap-3 rounded-lg border border-sky-200 bg-white px-3 py-2 text-left text-sm text-slate-700">{activity.label}<span aria-hidden="true">×</span></button>)}</div>
      </section>}

      {validation && <p role="alert" className="text-sm text-rose-700">Select an activity or describe what your business offers.</p>}

      <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-[auto_1fr_auto] sm:items-center">
        <Button
          onClick={() => router.back()}
          className="h-14 w-full border-2 border-primary-theme bg-white px-7 text-base font-bold text-primary-theme sm:w-auto"
        >
          Previous
        </Button>
        <div className={`hidden items-center justify-center gap-2 text-sm sm:flex ${previewComplete ? "font-semibold text-emerald-700" : "text-slate-600"}`} role={previewComplete ? "status" : undefined}>
          {previewComplete ? <HiOutlineCheck /> : null} {previewComplete ? "Preview selections are ready" : "Next: choose your package"}
        </div>
        <Button
          onClick={handleFormSubmit}
          className="h-14 w-full bg-primary-theme px-7 text-base font-bold text-white sm:w-auto"
          isLoading={isLoading}
          isDisabled={!classificationSummary.trim()}
        >
          Continue to packages
        </Button>
      </div>
    </section>
  );
};

export default StepTwo;
