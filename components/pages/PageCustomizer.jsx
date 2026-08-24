"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  HiArrowDown,
  HiArrowUp,
  HiCheck,
  HiClipboardCopy,
  HiDesktopComputer,
  HiExternalLink,
  HiOutlineDeviceMobile,
  HiOutlineRefresh,
  HiOutlineSave,
  HiViewGrid,
} from "react-icons/hi";

const LANDING_SECTIONS = [
  { id: "hero", label: "Hero", fixed: true },
  { id: "benefits", label: "Benefit strip" },
  { id: "mark-selector", label: "Mark selector" },
  { id: "process", label: "Three-step process" },
  { id: "pricing", label: "Packages and pricing" },
  { id: "account", label: "Customer account" },
  { id: "faq", label: "Frequently asked questions" },
  { id: "final-cta", label: "Final call to action" },
];

const CURRENT_SECTIONS = [
  { id: "hero", label: "Current hero", replacement: "New hero" },
  { id: "brand-examples", label: "Brand examples", replacement: "Benefit strip" },
  { id: "mark-selector", label: "Mark-type selector", replacement: "New mark selector" },
  { id: "process", label: "Three-step process", replacement: "New process" },
  { id: "filing-readiness", label: "Filing readiness", replacement: "No direct replacement" },
  { id: "customer-account", label: "Customer account preview", replacement: "New account section" },
  { id: "pricing", label: "Current packages", replacement: "New package cards" },
  { id: "after-checkout", label: "After-checkout timeline", replacement: "New account section" },
  { id: "benefits", label: "Why choose us", replacement: "New benefit strip" },
  { id: "contact", label: "Call and live chat", replacement: "No direct replacement" },
  { id: "faq", label: "Current FAQs", replacement: "New concise FAQs" },
  { id: "proof", label: "Statistics and proof", replacement: "No direct replacement" },
  { id: "testimonials", label: "Customer reviews", replacement: "No direct replacement" },
  { id: "footer", label: "Current full footer", replacement: "New compact footer" },
];

const REPLACEMENT_SECTION_MAP = {
  hero: "hero",
  "brand-examples": "benefits",
  "mark-selector": "mark-selector",
  process: "process",
  "customer-account": "account",
  pricing: "pricing",
  "after-checkout": "account",
  benefits: "benefits",
  faq: "faq",
  footer: "footer",
};

const DEFAULT_CONFIG = {
  landing: {
    order: LANDING_SECTIONS.map(({ id }) => id),
    visible: Object.fromEntries(LANDING_SECTIONS.map(({ id }) => [id, true])),
    header: true,
    footer: true,
    mobileCta: true,
    heroTitle: "Trademark Registration for Your Business Name, Logo or Slogan",
    heroCopy: "Complete a guided questionnaire and our filing team will prepare your application for review. Approve the details, then follow documents and updates from your secure customer account.",
  },
  currentLanding: {
    order: CURRENT_SECTIONS.map(({ id }) => id),
    visible: Object.fromEntries(CURRENT_SECTIONS.map(({ id }) => [id, true])),
    decision: Object.fromEntries(CURRENT_SECTIONS.map(({ id }) => [id, "current"])),
    heroTitle: "Trademark Registration for Your Business Name, Logo or Slogan",
    heroCopy: "Complete our guided questionnaire and our filing team will prepare your trademark application. Review and approve the details, then track documents and updates in your secure account.",
  },
  form: { header: true, progress: true, footer: true, notice: true },
};

const VIEWPORTS = {
  mobile: { label: "Mobile", width: 390, icon: HiOutlineDeviceMobile },
  tablet: { label: "Tablet", width: 768, icon: HiViewGrid },
  desktop: { label: "Desktop", width: 1440, icon: HiDesktopComputer },
};

const STORAGE_KEY = "lto_page_customizer_v1";

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 ${checked ? "bg-[#087fd3]" : "bg-slate-300"}`}
    >
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 motion-reduce:transition-none ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

export default function PageCustomizer() {
  const iframeRef = useRef(null);
  const replacementIframeRef = useRef(null);
  const [mode, setMode] = useState("landing");
  const [landingVersion, setLandingVersion] = useState("current");
  const [formScreen, setFormScreen] = useState("application");
  const [viewport, setViewport] = useState("desktop");
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setConfig((current) => ({ ...current, ...JSON.parse(stored) }));
    } catch {}
  }, []);

  const previewUrl = useMemo(() => {
    if (mode === "landing") return landingVersion === "current" ? "/legacy-landing-preview?customizer=1" : "/conversion-preview?customizer=1";
    return formScreen === "goods" ? "/goods-services-preview?customizer=1" : "/form-conversion-preview?customizer=1";
  }, [formScreen, landingVersion, mode]);

  const applyConfiguration = useCallback(() => {
    const document = iframeRef.current?.contentDocument;
    if (!document) return;

    if (mode === "landing" && landingVersion === "replacement") {
      const { landing } = config;
      document.querySelector('[data-customizer-section="preview-notice"]')?.style.setProperty("display", "none");
      document.querySelector('[data-customizer-section="header"]')?.style.setProperty("display", landing.header ? "" : "none");
      document.querySelector('[data-customizer-section="footer"]')?.style.setProperty("display", landing.footer ? "" : "none");
      document.querySelector('[data-customizer-section="mobile-cta"]')?.style.setProperty("display", landing.mobileCta ? "" : "none");
      landing.order.forEach((id) => {
        const element = document.querySelector(`[data-customizer-section="${id}"]`);
        const footer = document.querySelector('[data-customizer-section="footer"]');
        if (element && footer) footer.parentNode.insertBefore(element, footer);
        if (element) element.style.display = landing.visible[id] ? "" : "none";
      });
      const title = document.querySelector('[data-customizer-text="hero-title"]');
      const copy = document.querySelector('[data-customizer-text="hero-copy"]');
      if (title) title.textContent = landing.heroTitle;
      if (copy) copy.textContent = landing.heroCopy;
    } else if (mode === "landing") {
      const { currentLanding } = config;
      document.querySelectorAll("[data-customizer-injected]").forEach((element) => element.remove());
      const replacementDocument = replacementIframeRef.current?.contentDocument;
      currentLanding.order.forEach((id) => {
        const element = document.querySelector(`[data-customizer-old-section="${id}"]`);
        const footer = document.querySelector('[data-customizer-old-section="footer"]');
        if (element && footer && id !== "footer") footer.parentNode.insertBefore(element, footer);
        const decision = currentLanding.decision?.[id] || "current";
        if (element) element.style.display = decision === "current" ? "" : "none";
        if (decision === "replacement" && element && replacementDocument) {
          const replacementId = REPLACEMENT_SECTION_MAP[id];
          const source = replacementDocument.querySelector(`[data-customizer-section="${replacementId}"]`);
          if (source) {
            const clone = document.importNode(source, true);
            clone.setAttribute("data-customizer-injected", id);
            clone.querySelectorAll("button").forEach((button) => {
              button.setAttribute("type", "button");
              button.setAttribute("data-customizer-preview-control", "true");
            });
            element.parentNode.insertBefore(clone, element);
          }
        }
      });
      const title = document.querySelector('[data-customizer-old-text="hero-title"]');
      const copy = document.querySelector('[data-customizer-old-text="hero-copy"]');
      if (title) title.textContent = currentLanding.heroTitle;
      if (copy) copy.textContent = currentLanding.heroCopy;
    } else {
      Object.entries(config.form).forEach(([id, visible]) => {
        document.querySelectorAll(`[data-customizer-form="${id}"]`).forEach((element) => {
          element.style.display = visible ? "" : "none";
        });
      });
    }
  }, [config, landingVersion, mode]);

  useEffect(() => {
    applyConfiguration();
  }, [applyConfiguration, previewUrl]);

  const updateLanding = (patch) => {
    setSaved(false);
    setConfig((current) => ({ ...current, landing: { ...current.landing, ...patch } }));
  };

  const updateForm = (patch) => {
    setSaved(false);
    setConfig((current) => ({ ...current, form: { ...current.form, ...patch } }));
  };

  const updateCurrentLanding = (patch) => {
    setSaved(false);
    setConfig((current) => ({ ...current, currentLanding: { ...current.currentLanding, ...patch } }));
  };

  const moveSection = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= config.landing.order.length) return;
    const order = [...config.landing.order];
    [order[index], order[nextIndex]] = [order[nextIndex], order[index]];
    updateLanding({ order });
  };

  const moveCurrentSection = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= config.currentLanding.order.length) return;
    const order = [...config.currentLanding.order];
    [order[index], order[nextIndex]] = [order[nextIndex], order[index]];
    updateCurrentLanding({ order });
  };

  const saveConfiguration = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    setSaved(true);
  };

  const copyConfiguration = async () => {
    const sectionLines = config.landing.order.map((id, index) => {
      const section = LANDING_SECTIONS.find((item) => item.id === id);
      return `${index + 1}. ${section?.label}: ${config.landing.visible[id] ? "KEEP" : "REMOVE"}`;
    });
    const formLines = Object.entries(config.form).map(([id, visible]) => `- ${id}: ${visible ? "SHOW" : "HIDE"}`);
    const summary = [
      "LANDING PAGE CONFIGURATION",
      ...sectionLines,
      `Hero title: ${config.landing.heroTitle}`,
      `Hero copy: ${config.landing.heroCopy}`,
      `Header: ${config.landing.header ? "SHOW" : "HIDE"}`,
      `Footer: ${config.landing.footer ? "SHOW" : "HIDE"}`,
      `Mobile CTA: ${config.landing.mobileCta ? "SHOW" : "HIDE"}`,
      "",
      "CURRENT LANDING PAGE SECTIONS",
      ...config.currentLanding.order.map((id, index) => {
        const section = CURRENT_SECTIONS.find((item) => item.id === id);
        return `${index + 1}. ${section?.label}: ${(config.currentLanding.decision?.[id] || "current").toUpperCase()} | Replacement: ${section?.replacement}`;
      }),
      `Current hero title: ${config.currentLanding.heroTitle}`,
      `Current hero copy: ${config.currentLanding.heroCopy}`,
      "",
      "FORM CONFIGURATION",
      ...formLines,
    ].join("\n");
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const resetConfiguration = () => {
    setConfig(DEFAULT_CONFIG);
    setSaved(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[.15em] text-[#087fd3]">Private workspace</p>
            <h1 className="text-xl font-black sm:text-2xl">Landing Page + Form Customizer</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={resetConfiguration} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"><HiOutlineRefresh aria-hidden="true" />Reset</button>
            <button type="button" onClick={copyConfiguration} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"><HiClipboardCopy aria-hidden="true" />{copied ? "Copied" : "Copy choices"}</button>
            <button type="button" onClick={saveConfiguration} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-[#087fd3] px-4 text-sm font-bold text-white shadow-sm hover:bg-[#026bb5] focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"><HiOutlineSave aria-hidden="true" />{saved ? "Saved locally" : "Save choices"}</button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1800px] gap-4 p-4 lg:grid-cols-[360px_minmax(0,1fr)] lg:p-6">
        <aside className="self-start rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-[94px] lg:max-h-[calc(100vh-118px)] lg:overflow-y-auto">
          <div className="border-b border-slate-200 p-4">
            <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Customizer area">
              {[['landing','Landing page'],['form','Form']].map(([id, label]) => <button key={id} type="button" role="tab" aria-selected={mode === id} onClick={() => setMode(id)} className={`min-h-11 cursor-pointer rounded-lg px-3 text-sm font-bold transition ${mode === id ? "bg-white text-[#026daf] shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>{label}</button>)}
            </div>
          </div>

          {mode === "landing" ? (
            <div className="space-y-5 p-4">
              <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1" aria-label="Landing page version">
                {[['current','Current LP'],['replacement','Replacement']].map(([id,label]) => <button key={id} type="button" onClick={() => setLandingVersion(id)} aria-pressed={landingVersion === id} className={`min-h-11 cursor-pointer rounded-lg px-3 text-sm font-bold transition ${landingVersion === id ? "bg-white text-[#026daf] shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>{label}</button>)}
              </div>
              <div>
                <h2 className="font-black">Sections</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">{landingVersion === "current" ? "Review every section already on your LP and compare its suggested replacement." : "Review, hide and reorder the proposed replacement sections."}</p>
              </div>
              <div className="space-y-2">
                {landingVersion === "replacement" ? config.landing.order.map((id, index) => {
                  const section = LANDING_SECTIONS.find((item) => item.id === id);
                  return <div key={id} className="flex min-h-14 items-center gap-2 rounded-xl border border-slate-200 p-2.5"><Toggle checked={config.landing.visible[id]} onChange={(checked) => updateLanding({ visible: { ...config.landing.visible, [id]: checked } })} label={`${config.landing.visible[id] ? "Hide" : "Show"} ${section?.label}`} /><span className="min-w-0 flex-1 text-sm font-bold">{section?.label}</span><button type="button" aria-label={`Move ${section?.label} up`} disabled={index === 0} onClick={() => moveSection(index, -1)} className="grid h-11 w-11 cursor-pointer place-items-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"><HiArrowUp aria-hidden="true" /></button><button type="button" aria-label={`Move ${section?.label} down`} disabled={index === config.landing.order.length - 1} onClick={() => moveSection(index, 1)} className="grid h-11 w-11 cursor-pointer place-items-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"><HiArrowDown aria-hidden="true" /></button></div>;
                }) : config.currentLanding.order.map((id, index) => {
                  const section = CURRENT_SECTIONS.find((item) => item.id === id);
                  const decision = config.currentLanding.decision?.[id] || "current";
                  const hasReplacement = section?.replacement !== "No direct replacement";
                  const chooseDecision = (nextDecision) => updateCurrentLanding({ decision: { ...config.currentLanding.decision, [id]: nextDecision } });
                  return <div key={id} className={`rounded-xl border p-2.5 ${decision === "current" ? "border-sky-300 bg-sky-50/50" : "border-slate-200"}`}><div className="flex min-h-11 items-center gap-2"><span className="min-w-0 flex-1 text-sm font-bold">{section?.label}</span><button type="button" aria-label={`Move ${section?.label} up`} disabled={index === 0} onClick={() => moveCurrentSection(index, -1)} className="grid h-11 w-11 cursor-pointer place-items-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"><HiArrowUp aria-hidden="true" /></button><button type="button" aria-label={`Move ${section?.label} down`} disabled={index === config.currentLanding.order.length - 1} onClick={() => moveCurrentSection(index, 1)} className="grid h-11 w-11 cursor-pointer place-items-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"><HiArrowDown aria-hidden="true" /></button></div><p className="mb-2 text-xs leading-5 text-slate-500">Suggested: {section?.replacement}</p><div className="grid grid-cols-3 rounded-lg bg-slate-100 p-1 text-xs font-bold"><button type="button" onClick={() => chooseDecision("current")} className={`min-h-9 cursor-pointer rounded-md px-2 ${decision === "current" ? "bg-white text-[#026daf] shadow-sm" : "text-slate-600"}`}>Keep</button><button type="button" disabled={!hasReplacement} onClick={() => chooseDecision("replacement")} className={`min-h-9 cursor-pointer rounded-md px-2 disabled:cursor-not-allowed disabled:opacity-35 ${decision === "replacement" ? "bg-white text-[#026daf] shadow-sm" : "text-slate-600"}`}>Replace</button><button type="button" onClick={() => chooseDecision("remove")} className={`min-h-9 cursor-pointer rounded-md px-2 ${decision === "remove" ? "bg-white text-red-700 shadow-sm" : "text-slate-600"}`}>Remove</button></div></div>;
                })}
              </div>
              <div className="space-y-3 border-t border-slate-200 pt-5">
                <label className="block text-sm font-bold" htmlFor="hero-title">Hero heading</label>
                <textarea id="hero-title" rows={3} value={landingVersion === "current" ? config.currentLanding.heroTitle : config.landing.heroTitle} onChange={(event) => landingVersion === "current" ? updateCurrentLanding({ heroTitle: event.target.value }) : updateLanding({ heroTitle: event.target.value })} className="w-full resize-y rounded-xl border border-slate-300 px-3 py-3 text-sm leading-6 outline-none focus:border-[#087fd3] focus:ring-4 focus:ring-sky-100" />
                <label className="block text-sm font-bold" htmlFor="hero-copy">Hero supporting text</label>
                <textarea id="hero-copy" rows={5} value={landingVersion === "current" ? config.currentLanding.heroCopy : config.landing.heroCopy} onChange={(event) => landingVersion === "current" ? updateCurrentLanding({ heroCopy: event.target.value }) : updateLanding({ heroCopy: event.target.value })} className="w-full resize-y rounded-xl border border-slate-300 px-3 py-3 text-sm leading-6 outline-none focus:border-[#087fd3] focus:ring-4 focus:ring-sky-100" />
              </div>
              {landingVersion === "replacement" && <div className="space-y-3 border-t border-slate-200 pt-5">
                {[['header','Header'],['footer','Policy footer'],['mobileCta','Mobile sticky CTA']].map(([id,label]) => <div key={id} className="flex min-h-11 items-center justify-between gap-3"><span className="text-sm font-bold">{label}</span><Toggle checked={config.landing[id]} onChange={(checked) => updateLanding({ [id]: checked })} label={`${config.landing[id] ? "Hide" : "Show"} ${label}`} /></div>)}
              </div>}
            </div>
          ) : (
            <div className="space-y-5 p-4">
              <div>
                <h2 className="font-black">Form screens</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">Test the approved real preview flow without submitting customer data.</p>
              </div>
              <div className="grid gap-2">
                {[['application','Application details'],['goods','Goods and services']].map(([id,label]) => <button key={id} type="button" onClick={() => setFormScreen(id)} className={`min-h-12 cursor-pointer rounded-xl border px-4 text-left text-sm font-bold transition ${formScreen === id ? "border-[#087fd3] bg-sky-50 text-[#026daf]" : "border-slate-200 hover:border-sky-300"}`}>{label}</button>)}
              </div>
              <div className="space-y-3 border-t border-slate-200 pt-5">
                {[['header','Brand and phone header'],['progress','Progress tracker'],['footer','Policy footer'],['notice','Private preview notice']].map(([id,label]) => <div key={id} className="flex min-h-11 items-center justify-between gap-3"><span className="text-sm font-bold">{label}</span><Toggle checked={config.form[id]} onChange={(checked) => updateForm({ [id]: checked })} label={`${config.form[id] ? "Hide" : "Show"} ${label}`} /></div>)}
              </div>
              <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm leading-6 text-slate-700"><strong className="block text-slate-900">Functional preview</strong>You can select options, enter sample information and test scrolling. Preview routes do not replace the live funnel.</div>
            </div>
          )}
        </aside>

        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-black">Responsive preview</h2>
              <p className="text-sm text-slate-600">Changes appear instantly and stay private.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-xl bg-slate-100 p-1" aria-label="Preview size">
                {Object.entries(VIEWPORTS).map(([id,{ label, icon: Icon }]) => <button key={id} type="button" onClick={() => setViewport(id)} aria-pressed={viewport === id} className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm font-bold ${viewport === id ? "bg-white text-[#026daf] shadow-sm" : "text-slate-600"}`}><Icon aria-hidden="true" /><span className="hidden sm:inline">{label}</span></button>)}
              </div>
              <a href={previewUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-bold hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200">Open full preview <HiExternalLink aria-hidden="true" /></a>
            </div>
          </div>

          <div className="overflow-auto rounded-xl bg-slate-200 p-2 sm:p-4">
            <div className="mx-auto overflow-hidden rounded-xl bg-white shadow-xl transition-[max-width] duration-300 motion-reduce:transition-none" style={{ maxWidth: `${VIEWPORTS[viewport].width}px` }}>
              <div className="flex h-9 items-center gap-2 border-b border-slate-200 bg-slate-50 px-3" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /><span className="ml-2 truncate text-xs text-slate-500">{previewUrl}</span></div>
              <iframe ref={iframeRef} key={previewUrl} src={previewUrl} title={`${mode === "landing" ? "Landing page" : "Application form"} customized preview`} onLoad={applyConfiguration} className="block h-[calc(100vh-210px)] min-h-[620px] w-full border-0 bg-white" />
            </div>
          </div>
          {mode === "landing" && landingVersion === "current" && <iframe ref={replacementIframeRef} src="/conversion-preview?customizer-source=1" title="Replacement section source" onLoad={applyConfiguration} className="hidden" tabIndex={-1} aria-hidden="true" />}
          <div className="mt-4 flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-950"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-600 text-white"><HiCheck aria-hidden="true" /></span><p><strong>Your live website is untouched.</strong> Save or copy your choices when ready; implementation and production deployment remain separate approval steps.</p></div>
        </section>
      </div>
    </main>
  );
}
