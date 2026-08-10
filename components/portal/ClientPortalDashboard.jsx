"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import PortalLogoutButton from "@/components/portal/PortalLogoutButton";
import NmiPayment from "@/components/form/NmiPayment";
import BillingProfileManager from "@/components/portal/BillingProfileManager";
import PortalGuidedTour from "@/components/portal/PortalGuidedTour";
import PortalSessionGuard from "@/components/portal/PortalSessionGuard";
import { getPortalDemoActivity } from "@/lib/portalDemoActivity";
import {
  HiOutlineArrowRight,
  HiOutlineBell,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineChevronRight,
  HiOutlineClock,
  HiOutlineCreditCard,
  HiOutlineDocumentArrowUp,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineLockClosed,
  HiOutlineMagnifyingGlass,
  HiOutlineMapPin,
  HiOutlineMegaphone,
  HiOutlineRocketLaunch,
  HiOutlineShieldCheck,
  HiOutlineSquares2X2,
  HiOutlineUserCircle,
  HiOutlineWrenchScrewdriver,
  HiOutlineXMark,
} from "react-icons/hi2";

const navigation = [
  { id: "overview", label: "Overview", icon: HiOutlineSquares2X2 },
  { id: "trademarks", label: "My trademarks", icon: HiOutlineShieldCheck },
  { id: "tasks", label: "Tasks & documents", icon: HiOutlineDocumentText, badge: 2 },
  { id: "appointments", label: "Appointments", icon: HiOutlineCalendarDays },
  { id: "billing", label: "Billing", icon: HiOutlineCreditCard },
  { id: "services", label: "Business services", icon: HiOutlineRocketLaunch },
];

const clientTourSteps = [
  { target:"client-header", view:"overview", title:"Your secure client portal", description:"Use this portal to follow every trademark matter under one login. Your account menu, legal team and notifications remain available throughout the portal." },
  { target:"client-notifications", view:"overview", title:"Updates and urgent requests", description:"Attorney messages, document requests, deadlines, appointments, invoices and receipts appear here. Important updates are also sent to your email." },
  { target:"client-overview-content", hoverTarget:"client-overview", view:"overview", title:"Application status and roadmap", description:"The overview shows the current attorney-updated stage, filing progress, trademark details and the next expected step." },
  { target:"client-tasks-content", hoverTarget:"client-tasks", view:"tasks", title:"Tasks and secure documents", description:"Only requirements your attorney sends appear here. Upload requested files or ask for help; your attorney reviews the response and closes the requirement." },
  { target:"client-appointments-content", hoverTarget:"client-appointments", view:"appointments", title:"Calls and secure messages", description:"Review Google Meet or phone appointments, request a different time and send a secure message to the assigned legal team." },
  { target:"client-billing-content", hoverTarget:"client-billing", view:"billing", title:"Invoices, receipts and saved card", description:"Review itemized fees, approve a specific payment, download receipts, update billing details and manage the default card saved securely from checkout." },
  { target:"client-services-content", hoverTarget:"client-services", view:"services", portalEvent:"All services", title:"Additional business services", description:"Browse every available service in one marketplace. Nothing is purchased until you open the service details, review what is included and approve the next step." },
  { target:"client-services-content", hoverTarget:"client-services", view:"services", portalEvent:"Brand protection", title:"Trademark and brand protection", description:"Start another name, logo, slogan or sound trademark, submit an existing USPTO application, prepare a specimen, create a professional logo, monitor a mark, or protect your domains." },
  { target:"client-services-content", hoverTarget:"client-services", view:"services", portalEvent:"Business growth", title:"Business presence and marketing", description:"Request a responsive website, Google Business Profile and directory listings, Google Ads, SEO, social media strategy, post creation and ongoing campaign management." },
  { target:"client-services-content", hoverTarget:"client-services", view:"services", portalEvent:"Technology", title:"Technology and automation", description:"Meet the technical team for CRM systems, client portals, workflow automation, API connections, secure dashboards, custom web applications and ongoing support." },
  { target:"client-services-content", hoverTarget:"client-services", view:"services", portalEvent:"Operations", title:"LLC and business operations", description:"Request LLC formation, accounting and bookkeeping coordination, tax preparation support, financing readiness, payroll or other organized business-support services." },
];

function caseWorkflow(clientCase, updates = []) {
  const appointments = updates.filter((item) => item.type === "appointment" && item.appointmentStatus !== "cancelled");
  const appointment = appointments[0] || null;
  const consultationComplete = clientCase?.consultationStatus === "completed" || appointments.some((item) => item.appointmentStatus === "completed");
  const report = updates.find((item) => item.type === "clearance_report") || null;
  const reportReady = Boolean(report || clientCase?.clearanceReportStatus === "ready" || clientCase?.clearanceReportUrl);
  const proposedClasses = (report?.selectedClasses?.length ? report.selectedClasses : clientCase?.selectedClasses || []).filter(Boolean);
  const classPayments = updates.filter((item) => item.type === "payment" && item.paymentKind === "classification_fees");
  const payment = classPayments[0] || null;
  const feesPaid = clientCase?.classificationPaymentStatus === "paid" || classPayments.some((item) => item.paymentStatus === "paid" || item.taskStatus === "completed");
  const filing = updates.find((item) => item.type === "filing") || (clientCase?.serialNumber ? { serialNumber: clientCase.serialNumber, filingDate: clientCase.filingDate, documentUrl: clientCase.filingDocumentUrl } : null);
  const filingRecorded = Boolean(filing?.serialNumber);
  const postFilingStatus = filingRecorded ? updates.find((item) => item.type === "status" && ["USPTO examination", "Office action issued", "Publication period"].includes(item.status))?.status : null;
  const certificate = updates.find((item) => item.type === "registration_certificate") || (clientCase?.registrationNumber ? { registrationNumber: clientCase.registrationNumber, registrationDate: clientCase.registrationDate, documentUrl: clientCase.registrationCertificateUrl } : null);
  let stage = "Mandatory trademark consultation";
  let progress = appointment ? 25 : 18;
  if (consultationComplete) { stage = "Search & clearance report"; progress = 32; }
  if (reportReady) { stage = "Classes and USPTO filing fees"; progress = payment ? 48 : 44; }
  if (feesPaid) { stage = "Preparing USPTO filing"; progress = 58; }
  if (filingRecorded) { stage = postFilingStatus || "Filed with USPTO"; progress = postFilingStatus === "Publication period" ? 88 : postFilingStatus ? 78 : 65; }
  if (certificate) { stage = "Registered"; progress = 100; }
  return { appointment, consultationComplete, report, reportReady, proposedClasses, payment, feesPaid, filing, filingRecorded, postFilingStatus, certificate, stage, progress };
}

const services = [
  { icon: HiOutlineShieldCheck, title: "Protect your logo", text: "Add separate protection for the visual identity customers recognize.", category: "Recommended protection", action: "Start a logo trademark", directHref: "/trademark-register?source=client-portal&newMatter=1&suggestedMarkType=logo", directOnCard: true, bestFor: "Owners who currently protect a business name but also use a distinctive logo or design.", team: "Trademark professionals collect the logo application while an attorney reviews the mark and filing strategy.", includes: ["Separate logo or design-mark application", "Logo file and ownership intake", "Goods and services collection", "Attorney review and filing coordination", "New matter added to the existing portal"], process: "Open the complete application with logo protection selected, then submit the new matter under your existing portal account." },
  { icon: HiOutlineWrenchScrewdriver, title: "Professional logo design", text: "Create a distinctive, filing-ready visual identity with our design team.", category: "Brand development", action: "Meet the logo team", bestFor: "Businesses using a name mark that do not yet have a polished, distinctive logo.", team: "Experienced graphic and identity designers create professional logo directions based on the business, audience and intended use.", includes: ["Brand and audience discovery", "Professional logo concepts", "Revision and refinement rounds", "Web and print-ready files", "Trademark application handoff after approval"], process: "A designer reviews your business and creative direction, prepares concepts, and delivers approved files before the separate logo trademark application begins." },
  { icon: HiOutlineMagnifyingGlass, title: "Trademark monitoring", text: "Watch for confusingly similar filings and protect your brand.", category: "Brand protection", action: "Explore monitoring", bestFor: "Owners who want ongoing visibility after filing or registration.", team: "Trademark professionals review relevant matches and help route potential conflicts for legal evaluation.", includes: ["Monitoring of potentially confusing trademark applications", "Regular watch reports with relevant matches", "Attorney escalation options for concerning activity", "Portfolio and renewal reminder support"], process: "We confirm the marks and classes to monitor, activate the watch scope, and deliver findings through your portal." },
  { icon: HiOutlineDocumentArrowUp, title: "Specimen preparation", text: "Get help preparing acceptable proof of use for the USPTO.", category: "Recommended next", action: "Prepare a specimen", bestFor: "Applicants who need stronger proof showing the mark used in commerce.", team: "Trademark, design and web specialists collaborate while your attorney makes the final legal determination.", includes: ["Attorney-guided specimen readiness review", "Website, packaging, label or sales-material assessment", "Design and development assistance when evidence is missing", "Organized files prepared for attorney approval"], process: "A specialist reviews your current business use, identifies gaps, and prepares practical evidence for attorney review." },
  { icon: HiOutlineHome, title: "Business presence", text: "Website, Google Business Profile and trusted directory listings.", category: "Build credibility", action: "Improve my presence", bestFor: "Businesses that need a credible public presence and stronger proof of operation.", team: "Skilled designers and developers create responsive, secure and conversion-focused digital experiences.", includes: ["Custom website or landing-page design and development", "Mobile responsiveness, speed and conversion optimization", "Google Business Profile setup or improvement", "Yelp and relevant trusted directory listings", "Brand-consistent copy, contact and business information", "Maintenance and technical support options"], process: "We audit your presence, prioritize the highest-impact channels, then design, build and improve the approved assets." },
  { icon: HiOutlineMegaphone, title: "Marketing growth", text: "Google Ads, SEO and complete social media management.", category: "Grow your business", action: "Meet the growth team", bestFor: "Businesses ready to generate qualified leads, improve visibility and grow a consistent audience.", team: "Experienced Google Ads, SEO and social media specialists manage strategy, creative production and performance optimization.", includes: ["Google Ads strategy, setup and ongoing management", "Search, display and remarketing campaign support", "SEO audits, local SEO and content planning", "Social media account and calendar management", "Post concepts, copywriting, graphic creation and publishing", "Community engagement and inbox-handling options", "Monthly analytics, lead tracking and optimization"], process: "The marketing team reviews your goals, audience, offer and budget, then proposes channels, content cadence and measurable targets." },
  { icon: HiOutlineWrenchScrewdriver, title: "Apps & automation", text: "CRM systems, client portals, workflow automation and custom apps.", category: "Technology", action: "Discuss a project", bestFor: "Teams losing time to manual work or disconnected systems.", team: "Skilled software developers, UI/UX designers and automation specialists build around your actual workflow.", includes: ["Custom CRM and client portal development", "Lead, sales and service workflow automation", "Secure business dashboards and reporting", "Web and mobile application development", "Third-party API and payment integrations", "Testing, deployment and ongoing technical support"], process: "A technical consultant maps your workflow, defines a phased scope, and provides a delivery estimate before development." },
  { icon: HiOutlineBriefcase, title: "Business support", text: "Accounting, tax preparation and financing-readiness services.", category: "Operations", action: "View support options", bestFor: "Owners who need organized financial and operational support.", team: "Business-support specialists coordinate the appropriate accounting, tax, finance or operations resource for your needs.", includes: ["Bookkeeping and accounting coordination", "Business and owner tax-preparation support", "Financial records and financing-readiness review", "Business documentation and process organization", "Payroll and reporting support options", "Specialist consultation and referral coordination"], process: "We identify the support required and connect you with the appropriate accounting, tax or finance specialist." },
  { icon: HiOutlineBriefcase, title: "Form a new LLC", text: "Get guided help organizing and submitting a new LLC formation.", category: "Operations", action: "Start an LLC request", directHref: "/client-portal/llc?preview=northstar", bestFor: "Entrepreneurs creating a new business entity or separating a new venture from an existing company.", team: "Business-formation specialists help collect the required information and coordinate state-specific filing support.", includes: ["Business-name and state intake", "Articles of organization preparation support", "Registered-agent preference collection", "EIN and operating-agreement support options", "State fee and recurring-obligation explanation", "Formation-document delivery through the portal"], process: "Choose the formation state, provide the proposed company and owner details, and receive a scoped filing plan. State fees and approval times vary and are confirmed before submission." },
  { icon: HiOutlineHome, title: "Register a domain", text: "Find and secure a domain that matches your business and brand.", category: "Build credibility", action: "Find my domain", directHref: "/client-portal/domains?preview=northstar", bestFor: "Businesses launching a website, professional email or a new branded online presence.", team: "Domain and web specialists help evaluate practical names, extensions and setup requirements.", includes: ["Domain-name availability review", "Relevant extension recommendations", "Registration and renewal setup support", "DNS and professional email connection", "Website or landing-page connection", "Ownership and account-access handoff"], process: "Share your preferred names and extensions. We check current availability, confirm third-party registration pricing, and secure the selected domain in an approved owner-controlled account." },
  { icon: HiOutlineDocumentText, title: "File another trademark", text: "Start the full application now for another name, logo, slogan or sound.", category: "Brand protection", action: "File a new trademark", directHref: "/trademark-register?source=client-portal&newMatter=1", directOnCard: true, bestFor: "Clients expanding a portfolio with another brand, product, logo, slogan or sound mark.", team: "Trademark professionals guide the intake while the assigned attorney reviews filing strategy and application details.", includes: ["New trademark intake and ownership details", "Name, logo, slogan or sound-mark options", "Goods and services activity collection", "Package and class-fee explanation", "Attorney review and filing coordination", "New case tracking inside the same client portal"], process: "Start the complete application immediately. After checkout, the new matter is added to this portal instead of creating another account." },
  { icon: HiOutlineShieldCheck, title: "Add an existing trademark", text: "Give us an already-filed USPTO application for review and continued handling.", category: "Brand protection", action: "Submit a serial number", directHref: "/client-portal/existing-trademark", directOnCard: true, bestFor: "Owners who already filed a trademark and want our attorney team to review, monitor, or handle its next steps.", team: "A trademark attorney verifies the USPTO record and ownership details before adding the matter to your portal.", includes: ["USPTO serial-number intake", "Attorney record and status review", "Ownership and representation checks", "Deadline and requirement assessment", "Secure addition to your trademark portfolio after approval"], process: "Submit the trademark name and 8-digit USPTO serial number. It stays pending until an attorney reviews and approves the association." },
  { icon: HiOutlineShieldCheck, title: "Domain protection", text: "Reduce domain misuse, impersonation and avoidable renewal risks.", category: "Brand protection", action: "Protect my domains", bestFor: "Brands concerned about lookalike domains, missed renewals, impersonation or unauthorized account access.", team: "Brand-protection and technical specialists review domain exposure and coordinate practical safeguards.", includes: ["Domain portfolio and ownership audit", "Lookalike and typo-domain monitoring options", "Registrar lock, MFA and access-hardening review", "Renewal and expiration monitoring", "DNS and email-security configuration review", "Escalation plan for suspicious domain activity"], process: "We inventory your domains and registrar access, identify preventable risks, and recommend a protection and monitoring plan. Recovery or enforcement work is scoped separately." },
];

function localRecommendations(clientCase,updates){
  const markType=String(clientCase?.markType||"").toLowerCase();const stage=String(clientCase?.stage||"").toLowerCase();const hasSpecimen=updates.some(item=>item.requirementType==="specimen"||/specimen|proof of use/i.test(`${item.title||""} ${item.message||""}`));const titles=[];
  if(/word|name/.test(markType)){titles.push("Protect your logo","Professional logo design")}
  if(hasSpecimen)titles.push("Specimen preparation");
  if(/filed|registered|publication|examination/.test(stage))titles.push("Trademark monitoring");
  titles.push("Business presence","Register a domain","Marketing growth");
  return [...new Set(titles)].map(title=>services.find(service=>service.title===title)).filter(Boolean).slice(0,3);
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Legal Trademark Office home">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#027dd6] text-xl font-black text-white shadow-sm">L</span>
      <span className="leading-tight">
        <span className="block text-sm font-extrabold text-slate-950">Legal Trademark</span>
        <span className="block text-xs font-semibold tracking-wide text-[#027dd6]">OFFICE®</span>
      </span>
    </Link>
  );
}

function StatusPill({ children, tone = "blue" }) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    amber: "bg-amber-50 text-amber-800 ring-amber-100",
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
  };
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${tones[tone]}`}>{children}</span>;
}

function SectionTitle({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#027dd6]">{eyebrow}</p>}
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function TrademarkTimeline({ clientCase, updates = [] }) {
  const workflow = caseWorkflow(clientCase, updates);
  const { appointment, consultationComplete, report, reportReady, proposedClasses, payment, feesPaid, filing, filingRecorded, postFilingStatus, certificate } = workflow;
  const dynamicTimeline = [
    { label: "Application received", date: "Completed", state: "done", note: "Your application information and initial service payment were received." },
    { label: "Mandatory trademark consultation", date: consultationComplete ? "Completed" : appointment ? `Scheduled ${new Date(appointment.appointmentAt).toLocaleString()}` : "Waiting to be scheduled", state: consultationComplete ? "done" : "active", note: consultationComplete ? "Your attorney completed the required trademark application review call." : "This is the required trademark call. Your attorney may review the application, share the search and clearance report, confirm classes, and collect the USPTO filing fees during this same consultation." },
    { label: "Search & clearance report", date: reportReady ? "Ready to review" : "Locked until consultation", state: reportReady ? "done" : consultationComplete ? "active" : "locked", note: reportReady ? "Your attorney manually prepared the report and recorded the proposed classes." : consultationComplete ? "Your attorney is manually preparing the report." : "This stage opens after the mandatory attorney consultation is completed." },
    { label: "Classes & USPTO filing fees", date: feesPaid ? "Paid" : payment ? "Payment requested" : reportReady ? "Awaiting attorney fee request" : "Locked", state: feesPaid ? "done" : reportReady ? "active" : "locked", note: proposedClasses.length ? `${proposedClasses.length} proposed class${proposedClasses.length === 1 ? "" : "es"} recorded in the attorney's report.${feesPaid ? " The related filing fees are paid." : " Each class and fee will be itemized before payment."}` : "The exact classes come directly from the attorney's clearance report." },
    { label: "Filed with USPTO", date: filingRecorded ? `Serial ${filing.serialNumber}` : feesPaid ? "Ready for attorney filing" : "Locked until fees are paid", state: filingRecorded ? "done" : feesPaid ? "active" : "locked", note: filingRecorded ? `Your attorney recorded the official filing${filing.filingDate ? ` dated ${filing.filingDate}` : ""}.` : "Once the attorney records the official filing, the USPTO serial number will appear here automatically." },
    { label: "USPTO examination", date: postFilingStatus || (filingRecorded ? "Monitoring after filing" : "Locked"), state: certificate ? "done" : postFilingStatus ? "active" : filingRecorded ? "active" : "locked", note: filingRecorded ? "Your attorney will post examination, office-action, and publication updates as they occur." : "This stage opens only after the official USPTO filing is recorded." },
    { label: "Registration certificate", date: certificate ? "Available to download" : "Locked until registration", state: certificate ? "done" : "locked", note: certificate ? `USPTO registration ${certificate.registrationNumber} is complete. Your official certificate is available in this portal.` : "If the USPTO registers the mark, your attorney will add the official certificate here." },
  ];
  return (
    <div className="mt-6 space-y-0">
      {dynamicTimeline.map((item, index) => (
        <div key={item.label} className="relative grid grid-cols-[32px_1fr] gap-3 pb-6 last:pb-0">
          {index < dynamicTimeline.length - 1 && <span className={`absolute left-[15px] top-8 h-[calc(100%-20px)] w-px ${item.state === "done" ? "bg-emerald-300" : "bg-slate-200"}`} />}
          <span className={`relative z-10 mt-0.5 grid h-8 w-8 place-items-center rounded-full border-4 border-white ${item.state === "done" ? "bg-emerald-500 text-white" : item.state === "active" ? "bg-[#027dd6] text-white ring-4 ring-blue-100" : "bg-slate-200 text-slate-500"}`}>
            {item.state === "done" ? <HiOutlineCheckCircle /> : item.state === "active" ? <HiOutlineClock /> : <HiOutlineLockClosed />}
          </span>
          <div className={`rounded-2xl border p-4 ${item.state === "active" ? "border-blue-200 bg-blue-50/60" : "border-transparent"}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold text-slate-900">{item.label}</p>
              <span className="text-xs font-semibold text-slate-500">{item.date}</span>
            </div>
            <p className="mt-1 text-sm leading-6 text-slate-600">{item.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SpecimenSupportCard({ setActive }) {
  const [helpOpen, setHelpOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState("");
  const [scheduled, setScheduled] = useState(false);
  const options = [
    { id: "website", icon: HiOutlineHome, title: "Website or landing page", text: "Create a professional public page showing your mark with your services or products." },
    { id: "design", icon: HiOutlineDocumentText, title: "Packaging, label or business material", text: "Design a label, package, menu, invoice or marketing material that properly displays your mark." },
    { id: "presence", icon: HiOutlineMegaphone, title: "Online business presence", text: "Improve your store, marketplace listing or business profile so your mark appears in real commerce." },
    { id: "review", icon: HiOutlineShieldCheck, title: "Specimen readiness review", text: "Let our team review what you already have and recommend the fastest compliant path." },
  ];
  return <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-5 sm:p-6"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-400 text-xl text-amber-950"><HiOutlineDocumentArrowUp /></span><div className="min-w-0 flex-1"><StatusPill tone="amber">Action recommended</StatusPill><h3 className="mt-3 text-lg font-extrabold text-slate-950">Prepare proof that customers see your brand</h3><p className="mt-2 text-sm leading-6 text-slate-700">A website, product page, label, packaging or sales material may help support proof-of-use requirements. Your attorney makes the final determination.</p><div className="mt-4 flex flex-wrap gap-3"><button onClick={()=>setActive("tasks")} className="rounded-xl bg-[#006fbd] px-4 py-2.5 text-sm font-extrabold text-white">I have a specimen</button><button onClick={()=>setHelpOpen(value=>!value)} className="rounded-xl border border-amber-300 bg-white px-4 py-2.5 text-sm font-extrabold text-amber-950">I need help creating one</button></div></div></div>{helpOpen&&<div className="mt-6 border-t border-amber-200 pt-6"><p className="text-xs font-extrabold uppercase tracking-wider text-amber-900">Choose what your business needs</p><div className="mt-3 grid gap-3 sm:grid-cols-2">{options.map(option=>{const Icon=option.icon;const selected=selectedNeed===option.id;return <button key={option.id} onClick={()=>{setSelectedNeed(option.id);setScheduled(false)}} className={`rounded-2xl border p-4 text-left transition ${selected?"border-blue-400 bg-blue-50 ring-2 ring-blue-100":"border-amber-200 bg-white hover:border-blue-300"}`}><Icon className={`text-2xl ${selected?"text-[#027dd6]":"text-amber-700"}`}/><p className="mt-3 text-sm font-extrabold text-slate-950">{option.title}</p><p className="mt-1 text-xs leading-5 text-slate-600">{option.text}</p></button>})}</div>{selectedNeed&&!scheduled&&<div className="mt-4 rounded-2xl border border-blue-200 bg-white p-4"><p className="font-extrabold text-slate-950">Talk with our design and development team</p><p className="mt-1 text-sm leading-6 text-slate-600">A specialist will review your business, recommend practical specimen options and explain scope and pricing before any work begins.</p><button onClick={()=>setScheduled(true)} className="mt-4 w-full rounded-xl bg-[#006fbd] px-4 py-3 text-sm font-extrabold text-white">Schedule a free discovery call</button></div>}{scheduled&&<div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4"><p className="font-extrabold text-emerald-900">Call request received</p><p className="mt-1 text-sm leading-6 text-emerald-800">Our design and development team will contact you to select a convenient time and review your specimen options.</p></div>}</div>}</div>;
}

function Overview({ setActive, user, clientCase, updates = [], recommendations = [], demoKey = "" }) {
  const workflow = caseWorkflow(clientCase, updates);
  const { filing, certificate, stage: latestStatus, progress } = workflow;
  const pushedRequirements = updates.filter((item) => ["requirement", "document"].includes(item.type));
  const openRequirements = pushedRequirements.filter((item) => item.taskStatus !== "completed");
  const hasSpecimenRequirement = pushedRequirements.some((item) => item.requirementType === "specimen");
  const urgentCount = updates.filter((item) => ["requirement", "document", "payment"].includes(item.type) && item.taskStatus !== "completed").length;
  const newUpdateCount = updates.filter((item) => !item.read).length;
  const applicationDetails = clientCase.applicationDetails || {};
  return (
    <div className="space-y-7">
      <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#027dd6] via-[#0789df] to-[#35a8ee] p-6 text-white shadow-xl shadow-blue-100 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-center">
          <div>
            <StatusPill tone="green">Application active</StatusPill>
            <h1 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">Good afternoon, {user.name.split(" ")[0]}. {certificate ? "Your trademark registration is complete." : filing ? "Your trademark application has been filed." : "Your trademark is moving forward."}</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">{certificate ? `Registration ${certificate.registrationNumber} has been recorded. Your official certificate is available in this portal.` : filing ? `The USPTO filing is recorded under serial number ${filing.serialNumber}. We will monitor the application and notify you of the next update.` : "Your attorney is reviewing the application details and class strategy. We will notify you when the final application is ready."}</p>
            <button onClick={() => setActive("trademarks")} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#027dd6] transition hover:bg-blue-50">
              View application status <HiOutlineArrowRight />
            </button>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Current stage</p>
                <p className="mt-1 text-xl font-bold">{latestStatus}</p>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-2xl"><HiOutlineShieldCheck /></span>
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-white" style={{width:`${progress}%`}} /></div>
            <div className="mt-3 flex justify-between text-xs font-semibold text-white"><span>Application received</span><span>{progress}% complete</span></div>
          </div>
        </div>
      </section>

      {filing && <section className="rounded-[24px] border border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-5 shadow-sm sm:p-7"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2 text-sm font-extrabold text-emerald-800"><HiOutlineCheckCircle className="text-xl" /> Congratulations — your application has been filed</div><h2 className="mt-3 text-2xl font-extrabold text-slate-950">USPTO serial number: {filing.serialNumber}</h2><p className="mt-2 text-sm leading-6 text-slate-700">Your attorney recorded the official filing{filing.filingDate?` on ${filing.filingDate}`:""}. You may use the ™ symbol with your trademark name now. Use the ® symbol only after the USPTO officially registers the mark.</p><p className="mt-2 text-xs font-semibold text-slate-500">Keep the serial number and filing receipt for your records and future USPTO correspondence.</p></div>{filing.documentUrl&&<a href={filing.documentUrl} target="_blank" rel="noreferrer" download className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3.5 text-sm font-extrabold text-white"><HiOutlineDocumentText /> Download filing receipt</a>}</div></section>}

      {certificate && <section className="rounded-[24px] border border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm sm:p-7"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2 text-sm font-extrabold text-emerald-800"><HiOutlineShieldCheck className="text-xl" /> Trademark registered</div><h2 className="mt-3 text-2xl font-extrabold text-slate-950">Registration number {certificate.registrationNumber}</h2><p className="mt-2 text-sm text-slate-700">Registered {certificate.registrationDate}. Download and retain the official USPTO certificate with your business records.</p></div><a href={certificate.documentUrl} target="_blank" rel="noreferrer" download className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3.5 text-sm font-extrabold text-white"><HiOutlineDocumentText /> Download registration certificate</a></div></section>}

      <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><p className="text-xs font-extrabold uppercase tracking-wider text-[#027dd6]">Trademark details</p><h2 className="mt-1 text-xl font-extrabold text-slate-950">{clientCase.markName}™</h2><p className="mt-1 text-sm text-slate-500">Information submitted with this application and updated by your attorney.</p></div><div className="flex flex-wrap gap-2"><button onClick={()=>setActive("trademarks")} className="rounded-xl border border-blue-200 px-4 py-2.5 text-sm font-extrabold text-[#027dd6]">Open full roadmap</button><Link href={`/client-portal/amendment${demoKey?`?preview=${demoKey}`:""}`} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-extrabold text-white">Request an amendment</Link></div></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[["Mark type",clientCase.markType],["Owner",clientCase.company],["Owner type",applicationDetails.ownerType||applicationDetails.organizationType||"Not provided"],["Use status",applicationDetails.trademarkCurrentlyBeingUsed||"Not provided"]].map(([label,value])=><div key={label} className="rounded-xl bg-slate-50 p-4"><p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-1 text-sm font-extrabold text-slate-900">{value}</p></div>)}</div>
        {applicationDetails.selectedActivities?.length>0&&<div className="mt-4 rounded-xl border border-slate-200 p-4"><p className="text-xs font-extrabold text-slate-700">Business activities submitted</p><ul className="mt-2 grid gap-1 text-sm leading-6 text-slate-600 sm:grid-cols-2">{applicationDetails.selectedActivities.map(item=><li key={item}>• {item}</li>)}</ul></div>}
        {clientCase.selectedClasses?.length>0&&<div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4"><p className="text-xs font-extrabold text-[#027dd6]">Attorney-selected classes</p><ul className="mt-2 space-y-1 text-sm font-semibold leading-6 text-slate-700">{clientCase.selectedClasses.map(item=><li key={item}>• {item}</li>)}</ul></div>}
      </section>

      {updates.length > 0 && <section className={`rounded-[24px] border p-5 shadow-sm sm:p-7 ${newUpdateCount?"border-orange-300 bg-gradient-to-br from-orange-50 via-white to-blue-50 ring-4 ring-orange-100":"border-blue-200 bg-white"}`}><div className="flex items-center justify-between gap-4"><div><p className={`text-xs font-extrabold uppercase tracking-wider ${newUpdateCount?"text-orange-700":"text-[#027dd6]"}`}>{newUpdateCount?"New action from your legal team":"From your legal team"}</p><h2 className="mt-1 text-xl font-extrabold">Latest requests and updates</h2><p className="mt-1 text-xs font-semibold text-slate-500">Review new items before continuing with your application.</p></div>{newUpdateCount>0&&<span className="inline-flex min-w-8 items-center justify-center rounded-full bg-orange-500 px-3 py-1.5 text-xs font-extrabold text-white shadow-sm">{newUpdateCount} new</span>}</div><div className="mt-5 space-y-3">{updates.slice(0,4).map((item)=><article key={item.id} className={`rounded-xl border p-4 ${!item.read?"border-orange-300 bg-white shadow-sm ring-2 ring-orange-100":"border-slate-200 bg-slate-50"}`}><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-extrabold text-slate-950">{item.type === "status" ? `Status updated: ${item.status}` : item.type === "filing" ? "Trademark application filed" : item.title}</p><div className="flex items-center gap-2">{!item.read&&<span className="rounded-full bg-orange-500 px-2 py-1 text-[10px] font-extrabold uppercase text-white">New</span>}<span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase text-[#027dd6]">{item.type}</span></div></div>{item.message&&<p className="mt-2 text-sm leading-6 text-slate-700">{item.message}</p>}{item.serialNumber&&<p className="mt-2 text-sm font-extrabold">USPTO serial number: {item.serialNumber}</p>}{Number(item.amount)>0&&<p className="mt-2 text-sm font-extrabold">Amount requested: ${Number(item.amount).toFixed(2)}</p>}{item.dueAt&&<p className="mt-2 text-xs font-bold text-slate-500">Due {item.dueAt}</p>}{item.appointmentAt&&<p className="mt-3 rounded-lg bg-white px-3 py-2 text-sm font-extrabold text-slate-800">Scheduled for {new Date(item.appointmentAt).toLocaleString()}</p>}{item.meetingType!=="phone"&&item.meetingUrl&&<a href={item.meetingUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex rounded-lg bg-[#006fbd] px-4 py-2 text-xs font-extrabold text-white">Join Google Meet</a>}{item.meetingType==="phone"&&item.phoneNumber&&<a href={`tel:${item.phoneNumber}`} className="mt-3 inline-flex rounded-lg bg-[#006fbd] px-4 py-2 text-xs font-extrabold text-white">Call {item.phoneNumber}</a>}{item.documentUrl&&<a href={item.documentUrl} target="_blank" rel="noreferrer" download className="mt-3 inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-xs font-extrabold text-white">Download document</a>}</article>)}</div></section>}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          [HiOutlineShieldCheck, "1", "Active trademark", latestStatus],
          [HiOutlineDocumentText, String(openRequirements.length), "Open requirements", openRequirements.length ? "Attorney action requested" : "No action required"],
          [HiOutlineCalendarDays, clientCase.appointment?.replace?.(", 2026", "") || "Not scheduled", "Next appointment", clientCase.appointmentTime || "Your attorney will notify you"],
          [HiOutlineBell, String(urgentCount), "Urgent notices", urgentCount ? "Review the notification center" : "You are all caught up"],
        ].map(([Icon, value, label, detail]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-xl text-[#027dd6]"><Icon /></span><HiOutlineChevronRight className="text-slate-300" /></div>
            <p className="mt-5 text-2xl font-extrabold text-slate-950">{value}</p>
            <p className="mt-1 text-sm font-bold text-slate-800">{label}</p>
            <p className="mt-1 text-xs text-slate-500">{detail}</p>
          </div>
        ))}
      </section>

      <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,.85fr)]">
        <div className="min-w-0 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <SectionTitle eyebrow="Your application" title={`${clientCase.markName}™`} description={`${clientCase.markType} · Owner: ${clientCase.company}`} action={<StatusPill tone="blue">{clientCase.stage}</StatusPill>} />
          <TrademarkTimeline clientCase={clientCase} updates={updates} />
        </div>
        <div className="space-y-6 xl:sticky xl:top-24">
          {hasSpecimenRequirement && <SpecimenSupportCard setActive={setActive} />}
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#027dd6]">Your legal team</p>
            <div className="mt-4 flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-full bg-[#027dd6] text-lg font-bold text-white">{clientCase.assignedAttorney?.name ? clientCase.assignedAttorney.name.split(/\s+/).map(part=>part[0]).join("").slice(0,2).toUpperCase() : "LT"}</span><div><p className="font-extrabold text-slate-950">{clientCase.assignedAttorney?.name || "Trademark Legal Team"}</p><p className="text-sm text-slate-500">{clientCase.assignedAttorney?.title || "Attorney-led case support"}</p></div></div>
            <button onClick={() => setActive("appointments")} className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:bg-blue-50">Message or schedule a call</button>
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <SectionTitle eyebrow="Built around your next step" title="Recommended for your business" description="Relevant support based on your application stage—no generic sales catalogue." action={<button onClick={() => setActive("services")} className="text-sm font-bold text-[#027dd6]">View all services</button>} />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {(recommendations.length?recommendations:localRecommendations(clientCase,updates)).map((service) => <ServiceCard key={service.title} service={service} />)}
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <article data-service-title={service.title} role="button" tabIndex={0} aria-label={`Open ${service.title} service details`} onKeyDown={(event)=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.currentTarget.click()}}} className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100">
      <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-xl text-[#027dd6]"><Icon /></span><HiOutlineArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#027dd6]" /></div>
      <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#027dd6]">{service.category}</p>
      <h3 className="mt-2 text-lg font-extrabold text-slate-950">{service.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{service.text}</p>
      <button className="mt-5 text-sm font-bold text-slate-900">{service.action}</button>
    </article>
  );
}

function Trademarks({ clientCase, cases = [], onSelect, updates = [] }) {
  const filing = updates.find((item) => item.type === "filing");
  const serialNumber = filing?.serialNumber || clientCase.serialNumber;
  const portfolio=cases.length?cases:[clientCase];
  if(portfolio.length>1)return <div className="space-y-6"><SectionTitle eyebrow="Portfolio" title="My trademarks" description="Every new application is kept inside this same client portal."/><div className="grid gap-4 md:grid-cols-2">{portfolio.map(item=><button key={item.id} onClick={()=>onSelect?.(item.id)} className={`rounded-[24px] border bg-white p-6 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md ${item.id===clientCase.id?"border-blue-400 ring-2 ring-blue-100":"border-slate-200"}`}><div className="flex items-start justify-between gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-xl text-[#027dd6]"><HiOutlineShieldCheck/></span><StatusPill tone={item.serialNumber?"green":"blue"}>{item.serialNumber?"USPTO record":"Active matter"}</StatusPill></div><h3 className="mt-5 text-xl font-extrabold">{item.markName}™</h3><p className="mt-2 text-sm text-slate-500">{item.markType} · {item.id}</p><p className={`mt-4 text-sm font-bold ${item.serialNumber?"text-emerald-700":"text-[#027dd6]"}`}>{item.serialNumber?`USPTO serial number ${item.serialNumber}`:item.stage}</p><span className="mt-5 inline-flex text-sm font-extrabold text-slate-900">Open this trademark →</span></button>)}</div></div>;
  const report=updates.find(item=>item.type==="clearance_report");
  return <div className="space-y-6"><SectionTitle eyebrow="Portfolio" title="My trademarks" description="Track every application, attorney report, classification payment, filing and deadline in one place." />{report&&!serialNumber&&<div className="rounded-[24px] border border-violet-200 bg-violet-50 p-5 sm:p-6"><p className="text-xs font-extrabold uppercase tracking-wider text-violet-700">Attorney-prepared report</p><h3 className="mt-2 text-xl font-extrabold">Search and clearance report is ready</h3><p className="mt-2 text-sm leading-6 text-slate-700">Your attorney manually prepared and reviewed this report. Review the proposed classes below before the next filing step.</p>{report.selectedClasses?.length>0&&<ul className="mt-4 space-y-2 rounded-xl bg-white p-4 text-sm text-slate-700">{report.selectedClasses.map(item=><li key={item}>• {item}</li>)}</ul>}{report.documentUrl&&<a href={report.documentUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-xl bg-violet-700 px-5 py-3 text-sm font-extrabold text-white">Download clearance report</a>}</div>}<div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8"><div className="flex flex-col gap-5 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex flex-wrap items-center gap-3"><h3 className="text-2xl font-extrabold text-slate-950">{clientCase.markName}™</h3><StatusPill tone={serialNumber?"green":"blue"}>{serialNumber ? "Filed with USPTO" : clientCase.stage}</StatusPill></div><p className="mt-2 text-sm text-slate-500">{clientCase.markType} · Internal case #{clientCase.id}</p>{serialNumber&&<div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Official USPTO record</p><p className="mt-1 text-lg font-extrabold text-slate-950">Serial number {serialNumber}</p>{filing?.filingDate&&<p className="mt-1 text-xs text-slate-600">Filed {filing.filingDate}</p>}</div>}</div><div className="flex flex-wrap gap-3"><button className="rounded-xl bg-[#027dd6] px-5 py-3 text-sm font-bold text-white">View case details</button>{filing?.documentUrl&&<a href={filing.documentUrl} target="_blank" rel="noreferrer" download className="rounded-xl border border-emerald-300 bg-white px-5 py-3 text-sm font-bold text-emerald-800">Download filing document</a>}</div></div><TrademarkTimeline clientCase={clientCase} updates={updates}/></div></div>;
}

function Tasks({ updates = [], setActive, onRequestCall }) {
  const tasks = updates.filter((item) => ["requirement", "document"].includes(item.type));
  const [guidedTask,setGuidedTask]=useState(null);
  const firstOpenTask = tasks.find((task)=>task.taskStatus!=="completed");
  return <div className="space-y-6">
    <SectionTitle eyebrow="Action center" title="Requirements & documents" description="Send files or request help. Your attorney reviews every response and is the only person who can close a legal requirement." action={firstOpenTask ? <button type="button" data-upload-activity-id={firstOpenTask.id} className="rounded-xl bg-[#027dd6] px-5 py-3 text-sm font-bold text-white">Upload requested files</button> : null} />
    {tasks.length === 0 ? <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-8 text-center"><HiOutlineCheckCircle className="mx-auto text-4xl text-emerald-600"/><h3 className="mt-4 text-xl font-extrabold text-slate-950">No requirements right now</h3><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">Your attorney has not requested any documents or legal actions. You will receive a portal and email notification when something is needed.</p></div> : <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="space-y-4">{tasks.map((task)=>{const specimen=task.requirementType==="specimen"||/specimen|proof of use/i.test(`${task.title||""} ${task.message||""}`);const complete=task.taskStatus==="completed";return <article key={task.id} className={`rounded-2xl border bg-white p-5 shadow-sm ${complete?"border-emerald-200":"border-slate-200"}`}><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-xl text-[#027dd6]"><HiOutlineDocumentArrowUp /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-extrabold text-slate-950">{task.title}</h3><StatusPill tone={complete?"green":"amber"}>{complete?"Attorney approved":task.dueAt?`Due ${task.dueAt}`:"Attorney review required"}</StatusPill></div><p className="mt-2 text-sm leading-6 text-slate-600">{task.message}</p>{!complete&&<><div className="mt-4 flex flex-wrap gap-3"><button type="button" data-upload-activity-id={task.id} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white">{specimen?"Upload specimen":"Upload requested files"}</button><button type="button" onClick={()=>{onRequestCall?.(task);setActive("appointments")}} className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-bold text-[#027dd6]">Request a call about this</button>{specimen&&<button type="button" onClick={()=>setActive("services")} className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-bold text-violet-700">I don’t have a specimen</button>}{specimen&&<button type="button" aria-expanded={guidedTask===task.id} onClick={()=>setGuidedTask(guidedTask===task.id?null:task.id)} className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-700">Submission guide</button>}</div>{guidedTask===task.id&&<div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4"><p className="text-sm font-extrabold text-emerald-900">Specimen submission checklist</p><ul className="mt-2 space-y-1 text-xs leading-5 text-slate-700"><li>• Use a current customer-facing example such as a product page, packaging, label, or service webpage.</li><li>• Make sure the trademark and the relevant goods or services are visible together.</li><li>• Avoid mockups created only for filing.</li><li>• Add a date or URL where available.</li></ul><p className="mt-3 text-[11px] font-semibold leading-5 text-emerald-900">This guide organizes your submission; it does not decide legal sufficiency. Your attorney reviews the file before the requirement is closed.</p><button type="button" data-upload-activity-id={task.id} className="mt-3 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-extrabold text-white">Choose specimen files</button></div>}</>}</div></div></article>})}</div>
      <div className="rounded-2xl border border-dashed border-blue-300 bg-blue-50/60 p-6 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl text-[#027dd6] shadow-sm"><HiOutlineDocumentArrowUp /></span><h3 className="mt-4 font-extrabold text-slate-950">Secure document vault</h3><p className="mt-2 text-sm leading-6 text-slate-600">Upload up to 10 PDF or image files at once. Files stay pending until attorney review.</p><button type="button" data-upload-activity-id="" className="mt-5 rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-bold text-[#027dd6]">Choose files</button></div>
    </div>}
  </div>;
}

function Appointments({ updates = [], user, clientCase, demoKey, onSend }) {
  const appointments = updates.filter((item) => item.type === "appointment" && item.appointmentStatus !== "cancelled");
  const [messages,setMessages]=useState([]);const [draft,setDraft]=useState("");const [sending,setSending]=useState(false);
  useEffect(()=>{let active=true;async function load(){try{if(demoKey){const items=JSON.parse(localStorage.getItem(`lto_demo_portal_messages_${demoKey}`)||"[]");if(active)setMessages(items.filter(item=>!item.caseId||item.caseId===clientCase.id))}else{const response=await fetch(`/api/portal/messages?caseId=${encodeURIComponent(clientCase.id)}`,{cache:"no-store"});if(response.ok&&active)setMessages((await response.json()).messages||[])}}catch{if(active)setMessages([])}}load();return()=>{active=false}},[demoKey,clientCase.id]);
  async function send(event){event.preventDefault();const body=draft.trim();if(!body)return;setSending(true);try{await onSend(body);setMessages(items=>[...items,{id:crypto.randomUUID(),caseId:clientCase.id,body,senderName:user.name||"You",direction:"client_to_staff",createdAt:new Date().toISOString()}]);setDraft("")}finally{setSending(false)}}
  const requiredCall=updates.find(item=>item.type==="appointment_request");
  return <div className="space-y-6"><SectionTitle eyebrow="Legal team" title="Appointments & messages" description="Calls scheduled by your attorney appear here and are also sent by email." />{requiredCall&&<div className="rounded-[24px] border border-orange-300 bg-orange-50 p-6"><StatusPill tone="amber">Call required</StatusPill><h3 className="mt-4 text-xl font-extrabold">{requiredCall.title}</h3><p className="mt-2 text-sm leading-6 text-slate-700">{requiredCall.message}</p><button type="button" onClick={()=>onSend("I need to schedule the required attorney call to review the USPTO office action and response options.")} className="mt-4 rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white">Request office action call</button></div>}<div className="grid gap-6 lg:grid-cols-2"><div className="space-y-4">{appointments.length===0?<div className="rounded-[24px] border border-slate-200 bg-white p-7 text-center"><HiOutlineCalendarDays className="mx-auto text-4xl text-slate-400"/><h3 className="mt-4 text-xl font-extrabold">No call scheduled</h3><p className="mt-2 text-sm text-slate-600">Your attorney will notify you when a consultation is scheduled.</p></div>:appointments.map(item=><div key={item.id} className="rounded-[24px] border border-blue-200 bg-blue-50 p-6"><StatusPill tone="blue">Upcoming</StatusPill><p className="mt-5 text-2xl font-extrabold text-slate-950">{item.title}</p><p className="mt-3 text-sm leading-6 text-slate-600">{item.message}</p><p className="mt-5 flex items-center gap-3 text-sm font-semibold text-slate-700"><HiOutlineCalendarDays className="text-xl text-[#027dd6]"/> {new Date(item.appointmentAt).toLocaleString()}</p><div className="mt-6 flex flex-wrap gap-3">{item.meetingType!=="phone"&&item.meetingUrl&&<a href={item.meetingUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-[#027dd6] px-5 py-3 text-sm font-bold text-white">Join Google Meet</a>}{item.meetingType==="phone"&&item.phoneNumber&&<a href={`tel:${item.phoneNumber}`} className="rounded-xl bg-[#027dd6] px-5 py-3 text-sm font-bold text-white">Call {item.phoneNumber}</a>}<button type="button" onClick={()=>onSend(`Please contact me to reschedule ${item.title || "my appointment"} currently set for ${new Date(item.appointmentAt).toLocaleString()}.`)} className="rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-slate-700">Request a new time</button></div></div>)}</div><div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 p-6"><h3 className="text-xl font-extrabold text-slate-950">Message your legal team</h3><p className="mt-2 text-sm leading-6 text-slate-600">Use this secure support channel for quick questions. Email only alerts you to new replies.</p></div><div aria-live="polite" className="max-h-64 space-y-3 overflow-y-auto bg-slate-50 p-5">{messages.length?messages.map(item=><div key={item.id} className={`flex ${item.direction==="client_to_staff"?"justify-end":"justify-start"}`}><div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${item.direction==="client_to_staff"?"rounded-br-md bg-[#027dd6] text-white":"rounded-bl-md border border-slate-200 bg-white text-slate-800"}`}><p>{item.body}</p><p className="mt-1 text-[10px] opacity-65">{item.senderName|| (item.direction==="client_to_staff"?"You":"Legal team")}</p></div></div>):<p className="py-6 text-center text-sm text-slate-500">No secure messages yet.</p>}</div><form onSubmit={send} className="p-5"><label htmlFor="client-secure-message" className="sr-only">Message to your legal team</label><textarea id="client-secure-message" value={draft} onChange={event=>setDraft(event.target.value)} className="min-h-28 w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50" placeholder="Write a message…" /><button disabled={sending||!draft.trim()} className="mt-3 min-h-11 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{sending?"Sending…":"Send securely"}</button></form></div></div></div>;
}

function Billing({ clientCase, updates = [], user, demoKey, onPaymentCompleted }) {
  const [paying,setPaying]=useState(null);const [processing,setProcessing]=useState(false);const [error,setError]=useState("");
  const paymentRequests=updates.filter(item=>item.type==="payment");
  async function payInvoice(paymentToken,billing){setProcessing(true);setError("");try{if(demoKey){await new Promise(resolve=>setTimeout(resolve,500));onPaymentCompleted?.(paying.id,{transactionId:"DEMO-PAID",amount:Number(paying.amount||0)});setPaying(null);return}if(!paying.invoiceId)throw new Error("This payment request must be reissued by your attorney before online payment.");const response=await fetch("/api/portal/payments/charge",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({invoiceId:paying.invoiceId,paymentToken,...billing})});const payload=await response.json();if(!response.ok)throw new Error(payload.error||"Payment declined.");onPaymentCompleted?.(paying.id,payload);setPaying(null)}catch(paymentError){setError(paymentError.message||"Unable to process payment.")}finally{setProcessing(false)}}
  return <div className="space-y-6"><SectionTitle eyebrow="Payments" title="Billing & invoices" description="Review service purchases, attorney-issued classification fees and professional PDF invoices." />{paymentRequests.length>0&&<div className="space-y-4">{paymentRequests.map(item=>{const paid=item.paymentStatus==="paid"||item.taskStatus==="completed";return <article key={item.id} className={`rounded-[24px] border p-5 shadow-sm sm:p-6 ${paid?"border-emerald-200 bg-emerald-50":"border-orange-200 bg-white"}`}><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div className="min-w-0 flex-1"><StatusPill tone={paid?"green":"amber"}>{paid?"Paid":"Payment requested"}</StatusPill><h3 className="mt-3 text-xl font-extrabold">{item.title||"Classification fee"}</h3><p className="mt-1 text-sm text-slate-600">Attorney-issued for {clientCase.markName}{item.paymentKind==="classification_fees"?` · ${item.classCount||item.classificationFees?.length||item.selectedClasses?.length||0} class(es)`:""}</p>{item.classificationFees?.length>0?<div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">{item.classificationFees.map((fee,index)=><div key={`${fee.description}-${index}`} className="flex items-start justify-between gap-4 border-b border-slate-100 px-4 py-3 last:border-0"><span className="text-xs font-semibold leading-5 text-slate-700">{fee.description}</span><span className="shrink-0 text-xs font-extrabold text-slate-950">${Number(fee.amount||0).toFixed(2)}</span></div>)}</div>:item.selectedClasses?.length>0&&<ul className="mt-3 space-y-1 text-xs leading-5 text-slate-600">{item.selectedClasses.map(value=><li key={value}>• {value}</li>)}</ul>}</div><div className="sm:text-right"><p className="text-3xl font-extrabold">${Number(item.amount||0).toFixed(2)}</p>{!paid&&<button onClick={()=>{setPaying(item);setError("")}} className="mt-3 rounded-xl bg-[#006fbd] px-5 py-3 text-sm font-extrabold text-white">Pay securely</button>}</div></div></article>})}</div>}<div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm"><div className="grid gap-4 border-b border-slate-100 p-6 md:grid-cols-3"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Service order</p><p className="mt-2 text-3xl font-extrabold text-slate-950">${Number(clientCase.orderTotal || 0).toFixed(2)}</p></div><div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Service payment</p><div className="mt-3"><StatusPill tone="green">Paid</StatusPill></div></div><div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Government and class fees</p><p className="mt-2 font-bold text-slate-900">Requested separately when applicable</p></div></div><div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-bold text-slate-950">{clientCase.packageName} trademark package</p><p className="mt-1 text-sm text-slate-500">Order {clientCase.id}</p></div><button className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-800">Download invoice</button></div></div>{paying&&<div className="fixed inset-0 z-[95] grid place-items-center overflow-y-auto bg-slate-950/55 p-4"><button onClick={()=>!processing&&setPaying(null)} className="absolute inset-0" aria-label="Close payment form"/><section role="dialog" aria-modal="true" className="relative my-6 w-full max-w-xl rounded-[24px] bg-white p-5 shadow-2xl sm:p-7"><div className="mb-5 flex items-start justify-between gap-4"><div><p className="text-xs font-extrabold uppercase text-[#027dd6]">Secure portal payment</p><h2 className="mt-1 text-xl font-extrabold">{paying.title}</h2><p className="mt-1 text-sm text-slate-600">Amount authorized: ${Number(paying.amount||0).toFixed(2)} USD</p></div><button disabled={processing} onClick={()=>setPaying(null)} aria-label="Close secure payment" className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100"><HiOutlineXMark/></button></div><NmiPayment onToken={payInvoice} totalAmount={Number(paying.amount||0)} isProcessing={processing} errorMessage={error} initialBilling={{email:user?.email||""}}/></section></div>}</div>;
}

const serviceFilters = ["All services", "Brand protection", "Business growth", "Technology", "Operations"];

function Services() {
  const [filter, setFilter] = useState("All services");
  const visible = useMemo(() => services.filter(service => filter === "All services" || (filter === "Brand protection" ? ["Brand protection", "Recommended next"].includes(service.category) : filter === "Business growth" ? ["Build credibility", "Grow your business"].includes(service.category) : filter === service.category)), [filter]);
  useEffect(()=>{const change=(event)=>{if(serviceFilters.includes(event.detail))setFilter(event.detail)};window.addEventListener("lto-portal-tour",change);return()=>window.removeEventListener("lto-portal-tour",change)},[]);
  return <div className="space-y-6"><SectionTitle eyebrow="Service marketplace" title="Build and protect your business" description="Services appear when they are relevant to your company—not as distracting upsells during filing." /><div className="flex gap-2 overflow-x-auto pb-2">{serviceFilters.map(item=><button key={item} onClick={()=>setFilter(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${filter===item ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600"}`}>{item}</button>)}</div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map(service=><ServiceCard key={service.title} service={service} />)}</div></div>;
}

function PortalDialog({ dialog, clientCase, updates = [], onClose, onSuccess, onNotification }) {
  if (!dialog) return null;
  const titles = { case: "Trademark case details", notifications: "Notifications", urgent: "Action required", join: "Secure consultation", reschedule: "Reschedule appointment", service: "Request a specialist consultation" };
  return <div className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-slate-950/45 p-4"><button className="absolute inset-0" onClick={onClose} aria-label="Close dialog"/><section role="dialog" aria-modal="true" className="relative my-6 w-full max-w-2xl overflow-hidden rounded-[24px] bg-white shadow-2xl"><header className="flex items-center justify-between border-b border-slate-200 p-5 sm:p-6"><div><p className="text-xs font-extrabold uppercase tracking-wider text-[#027dd6]">Client portal</p><h2 className="mt-1 text-xl font-extrabold text-slate-950">{dialog.type==="service"?dialog.service?.title:titles[dialog.type]}</h2></div><button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-xl"><HiOutlineXMark/></button></header><div className="p-5 sm:p-6">{dialog.type==="case"&&<div className="grid gap-3 sm:grid-cols-2">{[["Trademark",`${clientCase.markName}™`],["Application",clientCase.id],["Mark type",clientCase.markType],["Owner",clientCase.company],["Current stage",clientCase.stage],["Package",clientCase.packageName]].map(([label,value])=><div key={label} className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase text-slate-500">{label}</p><p className="mt-1 font-extrabold text-slate-950">{value}</p></div>)}</div>}{dialog.type==="notifications"&&<div className="space-y-3"><div className="rounded-xl border border-blue-200 bg-blue-50 p-4"><p className="font-extrabold">Your legal team is reviewing your application</p><p className="mt-1 text-sm text-slate-600">We will notify you when the next action is required.</p></div><div className="rounded-xl border border-slate-200 p-4"><p className="font-extrabold">Portal account secured</p><p className="mt-1 text-sm text-slate-600">Your login and case access are protected.</p></div></div>}{dialog.type==="join"&&<div><div className="rounded-2xl bg-blue-50 p-5 text-center"><HiOutlineCalendarDays className="mx-auto text-4xl text-[#027dd6]"/><p className="mt-3 font-extrabold">Attorney strategy call</p><p className="mt-1 text-sm text-slate-600">The secure meeting link becomes active 10 minutes before your appointment.</p></div><button onClick={()=>onSuccess("We’ll notify you when the meeting room is available.")} className="mt-4 w-full rounded-xl bg-[#006fbd] px-5 py-3.5 text-sm font-extrabold text-white">Notify me when ready</button></div>}{dialog.type==="reschedule"&&<form onSubmit={(event)=>{event.preventDefault();onSuccess("Your reschedule request was sent to the legal team.")}} className="space-y-4"><label className="block"><span className="text-sm font-bold">Preferred date</span><input type="date" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5"/></label><label className="block"><span className="text-sm font-bold">Preferred time</span><select required className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5"><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label><button className="w-full rounded-xl bg-[#006fbd] px-5 py-3.5 text-sm font-extrabold text-white">Send reschedule request</button></form>}{dialog.type==="service"&&<form onSubmit={(event)=>{event.preventDefault();onSuccess("Your consultation request was sent to the specialist team.")}} className="space-y-5"><div className="rounded-xl bg-blue-50 p-4"><p className="text-xs font-bold uppercase text-[#027dd6]">Best for</p><p className="mt-1 text-sm font-semibold leading-6 text-slate-700">{dialog.service?.bestFor}</p></div><div className="rounded-xl border border-blue-100 p-4"><p className="text-xs font-bold uppercase text-[#027dd6]">Specialist team</p><p className="mt-2 text-sm leading-6 text-slate-700">{dialog.service?.team}</p></div><div><p className="text-sm font-extrabold text-slate-950">What’s included</p><ul className="mt-3 grid gap-2 sm:grid-cols-2">{dialog.service?.includes?.map(item=><li key={item} className="flex gap-2 rounded-xl border border-slate-200 p-3 text-sm leading-5 text-slate-700"><HiOutlineCheckCircle className="mt-0.5 shrink-0 text-lg text-emerald-600"/>{item}</li>)}</ul></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase text-slate-500">How it works</p><p className="mt-2 text-sm leading-6 text-slate-700">{dialog.service?.process}</p></div><label className="block"><span className="text-sm font-bold">What would you like help with?</span><textarea required className="mt-2 min-h-24 w-full rounded-xl border border-slate-300 p-4" placeholder="Briefly describe your goal…"/></label>{dialog.service?.directHref&&<Link href={dialog.service.directHref} className="block w-full rounded-xl border border-blue-300 bg-blue-50 px-5 py-3.5 text-center text-sm font-extrabold text-[#006fbd]">Start the application now</Link>}<button className="w-full rounded-xl bg-[#006fbd] px-5 py-3.5 text-sm font-extrabold text-white">Request a specialist consultation</button></form>}</div></section></div>;
}

async function downloadInvoice(clientCase, user, updates = []) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit:"pt", format:"letter", compress:true });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;
  const clean = (value) => String(value || "").replace(/[–—]/g, "-").replace(/™/g, "TM");
  const money = (value) => `$${Number(value || 0).toFixed(2)}`;
  const paidPayments = updates.filter((item) => item.type === "payment" && (item.paymentStatus === "paid" || item.taskStatus === "completed"));
  const lineItems = [{ description:`${clientCase.packageName || "Trademark"} trademark service package`, amount:Number(clientCase.orderTotal || 0) }];
  paidPayments.forEach((payment) => {
    if (payment.classificationFees?.length) payment.classificationFees.forEach((fee) => lineItems.push({ description:fee.description, amount:Number(fee.amount || 0) }));
    else lineItems.push({ description:payment.title || "Additional trademark service", amount:Number(payment.amount || 0) });
  });
  const totalPaid = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const invoiceNumber = `INV-${clean(clientCase.id).replace(/[^A-Za-z0-9-]/g, "")}`;
  const generatedDate = new Intl.DateTimeFormat("en-US", { year:"numeric", month:"long", day:"numeric" }).format(new Date());

  doc.setFillColor(2, 125, 214); doc.rect(0, 0, pageWidth, 112, "F");
  doc.setTextColor(255,255,255); doc.setFont("helvetica","bold"); doc.setFontSize(21); doc.text("LEGAL TRADEMARK OFFICE", margin, 48);
  doc.setFont("helvetica","normal"); doc.setFontSize(10); doc.text("Trademark application and client services", margin, 67);
  doc.setFont("helvetica","bold"); doc.setFontSize(24); doc.text("PAID INVOICE", pageWidth-margin, 49, {align:"right"});
  doc.setFontSize(10); doc.text(invoiceNumber, pageWidth-margin, 69, {align:"right"});
  doc.setFillColor(220,252,231); doc.roundedRect(pageWidth-margin-78, 79, 78, 22, 11, 11, "F"); doc.setTextColor(21,128,61); doc.setFontSize(9); doc.text("PAYMENT PAID", pageWidth-margin-39, 93, {align:"center"});

  let y = 150;
  doc.setTextColor(15,23,42); doc.setFontSize(9); doc.setFont("helvetica","bold"); doc.text("BILL TO", margin, y);
  doc.text("INVOICE DETAILS", 342, y);
  doc.setFont("helvetica","normal"); doc.setFontSize(11); doc.text(clean(user?.name || "Client"), margin, y+20); doc.text(clean(user?.email), margin, y+36);
  if (clientCase.company) doc.text(clean(clientCase.company), margin, y+52);
  doc.setFontSize(10); doc.text(`Invoice: ${invoiceNumber}`, 342, y+20); doc.text(`Generated: ${generatedDate}`, 342, y+36); doc.text(`Currency: USD`, 342, y+52);

  y += 92;
  doc.setFillColor(241,245,249); doc.roundedRect(margin, y, contentWidth, 64, 8, 8, "F");
  doc.setFont("helvetica","bold"); doc.setFontSize(9); doc.setTextColor(71,85,105); doc.text("TRADEMARK MATTER", margin+16, y+19); doc.text("CASE / ORDER", 342, y+19);
  doc.setFontSize(12); doc.setTextColor(15,23,42); doc.text(clean(clientCase.markName || "Trademark application"), margin+16, y+42); doc.text(clean(clientCase.id), 342, y+42);
  y += 88;

  doc.setFillColor(15,23,42); doc.rect(margin, y, contentWidth, 30, "F"); doc.setTextColor(255,255,255); doc.setFont("helvetica","bold"); doc.setFontSize(9); doc.text("DESCRIPTION", margin+14, y+19); doc.text("AMOUNT", pageWidth-margin-14, y+19, {align:"right"}); y += 30;
  for (const item of lineItems) {
    const lines = doc.splitTextToSize(clean(item.description), contentWidth-120);
    const rowHeight = Math.max(38, 18 + lines.length*12);
    if (y + rowHeight > pageHeight - 100) { doc.addPage(); y=54; }
    doc.setDrawColor(226,232,240); doc.setFillColor(255,255,255); doc.rect(margin, y, contentWidth, rowHeight, "FD");
    doc.setTextColor(30,41,59); doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.text(lines, margin+14, y+20);
    doc.setFont("helvetica","bold"); doc.text(money(item.amount), pageWidth-margin-14, y+20, {align:"right"});
    y += rowHeight;
  }
  y += 14;
  if (y + 80 > pageHeight - 70) { doc.addPage(); y=54; }
  doc.setDrawColor(203,213,225); doc.line(342, y, pageWidth-margin, y); y += 22;
  doc.setFont("helvetica","bold"); doc.setFontSize(11); doc.setTextColor(15,23,42); doc.text("Total paid", 342, y); doc.setFontSize(15); doc.text(money(totalPaid), pageWidth-margin, y, {align:"right"});
  y += 38;
  const references = [clientCase.transactionId, ...paidPayments.map((item)=>item.transactionId)].filter(Boolean);
  if (references.length) { doc.setFont("helvetica","normal"); doc.setFontSize(8); doc.setTextColor(71,85,105); doc.text(doc.splitTextToSize(`Payment reference${references.length>1?"s":""}: ${references.map(clean).join(", ")}`, contentWidth), margin, y); y += 28; }
  doc.setFillColor(240,249,255); doc.roundedRect(margin, y, contentWidth, 54, 8, 8, "F"); doc.setTextColor(3,105,161); doc.setFont("helvetica","bold"); doc.setFontSize(9); doc.text("Payment confirmed", margin+14, y+20); doc.setFont("helvetica","normal"); doc.setFontSize(8); doc.text("This invoice confirms the paid services listed above. Government and future USPTO fees are separate unless itemized here.", margin+14, y+37);

  doc.setTextColor(100,116,139); doc.setFontSize(8); doc.text("Legal Trademark Office | legaltrademarkoffice.com | Secure client billing record", pageWidth/2, pageHeight-34, {align:"center"});
  doc.save(`${clean(clientCase.id).replace(/[^A-Za-z0-9-]/g, "-")}-paid-invoice.pdf`);
}

function NotificationCenter({ mode, updates, onOpen, onClose }) {
  if (!mode) return null;
  const urgent = mode === "urgent" ? updates.find(item=>["requirement","document","payment"].includes(item.type)&&!item.read) : null;
  return <div className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-slate-950/45 p-4"><button onClick={onClose} className="absolute inset-0" aria-label="Close notifications"/><section role="dialog" aria-modal="true" aria-labelledby="client-notification-title" className="relative my-6 w-full max-w-xl rounded-[24px] bg-white shadow-2xl"><header className="flex items-center justify-between border-b border-slate-200 p-5"><div><p className="text-xs font-extrabold uppercase tracking-wider text-[#027dd6]">Client portal</p><h2 id="client-notification-title" className="mt-1 text-xl font-extrabold">{urgent?"Action required":"Notifications"}</h2></div><button onClick={onClose} aria-label="Close notification center" className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-xl"><HiOutlineXMark/></button></header><div className="max-h-[70vh] overflow-y-auto p-5">{urgent?<div><div className="rounded-2xl border border-orange-200 bg-orange-50 p-5"><div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-orange-700"><HiOutlineBell/> Urgent attorney request</div><h3 className="mt-3 text-xl font-extrabold">{urgent.title}</h3><p className="mt-2 text-sm leading-6 text-slate-700">{urgent.message}</p>{urgent.dueAt&&<p className="mt-4 rounded-lg bg-white px-3 py-2 text-sm font-extrabold text-orange-800">Due {urgent.dueAt}</p>}</div><button onClick={()=>onOpen(urgent)} className="mt-4 w-full rounded-xl bg-[#006fbd] px-5 py-3.5 text-sm font-extrabold text-white">Review request</button><button onClick={onClose} className="mt-2 w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600">Remind me later</button></div>:updates.length?<div className="space-y-3">{updates.map(item=><button key={item.id} onClick={()=>onOpen(item)} className={`w-full rounded-xl border p-4 text-left ${item.read?"border-slate-200":"border-blue-200 bg-blue-50"}`}><div className="flex items-start justify-between gap-3"><div><p className="font-extrabold">{item.type==="status"?`Status updated: ${item.status}`:item.type==="filing"?"Trademark application filed":item.title||"Attorney update"}</p>{item.message&&<p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">{item.message}</p>}{item.dueAt&&<p className="mt-2 text-xs font-bold text-orange-700">Due {item.dueAt}</p>}</div>{!item.read&&<span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500"/>}</div><span className="mt-3 inline-block text-xs font-extrabold text-[#027dd6]">Open update →</span></button>)}</div>:<div className="rounded-xl bg-emerald-50 p-6 text-center"><HiOutlineCheckCircle className="mx-auto text-3xl text-emerald-600"/><p className="mt-3 font-extrabold">You’re all caught up</p><p className="mt-1 text-sm text-slate-600">New attorney updates will appear here.</p></div>}</div></section></div>;
}

export default function ClientPortalDashboard({ user, clientCase, initialCases = [], demoKey, initialUpdates = [] }) {
  const [active, setActive] = useState("overview");
  const [selectedCaseId,setSelectedCaseId]=useState(clientCase?.id||initialCases[0]?.id||"");
  const [liveCases,setLiveCases]=useState(initialCases.length?initialCases:(clientCase?[clientCase]:[]));
  const [mobileMenu, setMobileMenu] = useState(false);
  const [demoUpdates, setDemoUpdates] = useState(initialUpdates);
  const [dialog, setDialog] = useState(null);
  const [toast, setToast] = useState("");
  // Toasts confirm an action that already completed, so they dismiss on their
  // own. Upload progress messages are replaced by the next call before this
  // fires, so the timer never cuts a running sequence short.
  useEffect(()=>{if(!toast)return;const timer=window.setTimeout(()=>setToast(""),5000);return()=>window.clearTimeout(timer)},[toast]);
  const [notificationMode, setNotificationMode] = useState(null);
  const [recommendations,setRecommendations]=useState([]);
  const [uploading,setUploading]=useState(false);
  const uploadRef = useRef(null);
  const uploadActivityIdRef = useRef("");
  useEffect(() => {
    if (!demoKey) return;
    const load = () => {
      try {
        const key = `lto_demo_portal_updates_${demoKey}`;
        const seededKey = `${key}_seeded_v4`;
        let updates = JSON.parse(localStorage.getItem(key) || "[]").filter((item) => !["demo-specimen-request","demo-owner-document","demo-approval-request"].includes(item.id) && !String(item.documentUrl || "").includes("w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"));
        if (!localStorage.getItem(seededKey)) { const seeds=getPortalDemoActivity(demoKey);const seedIds=new Set(seeds.map(item=>item.id));updates=[...seeds,...updates.filter(item=>!seedIds.has(item.id))];localStorage.setItem(seededKey, "1"); }
        localStorage.setItem(key, JSON.stringify(updates));
        setDemoUpdates(updates);
      }
      catch { setDemoUpdates([]); }
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, [demoKey]);
  useEffect(()=>{
    if(demoKey)return;
    let activeRequest=true;
    const refresh=async()=>{try{const response=await fetch("/api/portal/dashboard",{cache:"no-store"});if(!response.ok)return;const payload=await response.json();if(activeRequest){setLiveCases(payload.cases||[]);setDemoUpdates(payload.activity||[])}}catch{}};
    refresh();
    const timer=window.setInterval(refresh,30000);
    return()=>{activeRequest=false;window.clearInterval(timer)};
  },[demoKey]);
  useEffect(() => {
    const urgent = demoUpdates.find(item=>["requirement","document","payment"].includes(item.type)&&!item.read);
    if (!urgent) return;
    const key = `lto_urgent_popup_shown_${user.uid || demoKey || "client"}`;
    if (!sessionStorage.getItem(key)) { sessionStorage.setItem(key,"1"); setNotificationMode("urgent"); }
  }, [demoUpdates, user.uid, demoKey]);
  const clientName = user?.name || "Client";
  const initials = clientName.split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase();
  const portalCases=useMemo(()=>liveCases.length?liveCases:(clientCase?[clientCase]:[]),[liveCases,clientCase]);
  const activeCase=useMemo(()=>portalCases.find(item=>item.id===selectedCaseId)||clientCase||{ id: "Pending", markName: "Trademark application", company: user?.name || "Owner", markType: "Trademark", stage: "Application received", progress: 12, packageName: "Service", orderTotal: 0, openTasks: 0, appointment: "To be scheduled", appointmentTime: "" },[portalCases,selectedCaseId,clientCase,user?.name]);
  const caseUpdates=useMemo(()=>demoUpdates.filter(item=>!item.caseId||item.caseId===activeCase.id),[demoUpdates,activeCase.id]);
  useEffect(()=>{let activeRequest=true;const fallback=localRecommendations(activeCase,caseUpdates);setRecommendations(fallback);if(demoKey)return()=>{activeRequest=false};fetch("/api/portal/recommendations",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({caseId:activeCase.id,markType:activeCase.markType,stage:activeCase.stage,hasSpecimenRequirement:caseUpdates.some(item=>item.requirementType==="specimen"||/specimen|proof of use/i.test(`${item.title||""} ${item.message||""}`))})}).then(response=>response.ok?response.json():null).then(data=>{if(!activeRequest||!data?.recommendations?.length)return;const personalized=data.recommendations.map(item=>{const service=services.find(entry=>entry.title===item.title);return service?{...service,text:item.reason||service.text}:null}).filter(Boolean);if(personalized.length)setRecommendations(personalized)}).catch(()=>{});return()=>{activeRequest=false}},[activeCase,demoKey,caseUpdates]);
  function paymentCompleted(activityId,payload){setDemoUpdates(items=>items.map(item=>item.id===activityId?{...item,paymentStatus:"paid",taskStatus:"completed",transactionId:payload.transactionId}:item));if(demoKey){const key=`lto_demo_portal_updates_${demoKey}`;const items=JSON.parse(localStorage.getItem(key)||"[]").map(item=>item.id===activityId?{...item,paymentStatus:"paid",taskStatus:"completed",transactionId:payload.transactionId}:item);localStorage.setItem(key,JSON.stringify(items))}setToast("Payment confirmed. Your attorney and case roadmap were updated.")}
  const hasSpecimenRequest=caseUpdates.some(item=>item.requirementType==="specimen"&&item.taskStatus!=="completed");
  const views = { overview: <Overview setActive={setActive} user={user} clientCase={activeCase} updates={caseUpdates} recommendations={recommendations} demoKey={demoKey}/>, trademarks: <div className="space-y-5"><div className="flex flex-wrap gap-3"><button onClick={()=>setActive("overview")} className="rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-extrabold text-[#027dd6]">← Back to overview</button><button onClick={()=>setActive("services")} className="rounded-xl bg-[#006fbd] px-4 py-2.5 text-sm font-extrabold text-white">Explore other services</button></div><Trademarks clientCase={activeCase} cases={portalCases} onSelect={setSelectedCaseId} updates={caseUpdates} /></div>, tasks: <div className="space-y-6"><Tasks updates={caseUpdates} setActive={setActive} onRequestCall={async(task)=>{await notifyAttorney("appointment_request","Client requested help with a requirement",`Please contact me about: ${task.title}. ${task.message||""}`,task.id);setToast("Your attorney was notified. Use secure messages to add preferred times or questions.")}}/>{hasSpecimenRequest&&<SpecimenSupportCard setActive={setActive}/>}</div>, appointments: <Appointments updates={caseUpdates} user={user} clientCase={activeCase} demoKey={demoKey} onSend={async(message)=>{await notifyAttorney("client_message","New secure client message",message);setToast("Your secure message was sent to the legal team.")}} />, billing: <div className="space-y-6"><BillingProfileManager user={user} demoKey={demoKey}/><Billing clientCase={activeCase} updates={caseUpdates} user={user} demoKey={demoKey} onPaymentCompleted={paymentCompleted}/></div>, services: <Services /> };
  const unreadCount = demoUpdates.filter(item=>!item.read).length;

  async function openNotification(item) {
    setDemoUpdates(items=>items.map(update=>update.id===item.id?{...update,read:true}:update));
    if (demoKey) {
      const key = `lto_demo_portal_updates_${demoKey}`;
      const items = JSON.parse(localStorage.getItem(key) || "[]").map(update=>update.id===item.id?{...update,read:true}:update);
      localStorage.setItem(key,JSON.stringify(items));
    } else await fetch(`/api/portal/activity/${item.id}/read`,{method:"PATCH"});
    const destination = ["requirement","document"].includes(item.type)?"tasks":["appointment","appointment_request"].includes(item.type)?"appointments":item.type==="payment"?"billing":["status","filing"].includes(item.type)?"trademarks":"overview";
    setActive(destination); setNotificationMode(null);
  }

  async function notifyAttorney(type,title,message,activityId=""){
    const event={id:crypto.randomUUID(),clientUid:user.uid||demoKey,clientName:user.name,clientEmail:user.email,type,title,message,activityId,caseId:activeCase.id,read:false,createdAt:new Date().toISOString()};
    if(demoKey){const key="lto_demo_attorney_notifications";const current=JSON.parse(localStorage.getItem(key)||"[]");localStorage.setItem(key,JSON.stringify([event,...current]));if(["client_message","secure_message"].includes(type)){const messageKey=`lto_demo_portal_messages_${demoKey}`;const messages=JSON.parse(localStorage.getItem(messageKey)||"[]");localStorage.setItem(messageKey,JSON.stringify([...messages,{id:event.id,caseId:activeCase.id,body:message,senderId:user.uid||demoKey,senderName:user.name||"Client",senderRole:"client",direction:"client_to_staff",createdAt:event.createdAt}]))}return}
    await fetch('/api/portal/client-events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(event)});
  }

  async function uploadClientDocuments(fileList, activityId=""){
    const files=Array.from(fileList||[]).slice(0,10);
    if(!files.length)return;
    setUploading(true);
    try{
      if(demoKey){await notifyAttorney("document_upload","Client uploaded documents",`${files.map(file=>file.name).join(", ")} ${files.length===1?"was":"were"} uploaded and are awaiting attorney review.`,activityId);setToast(`${files.length} file${files.length===1?"":"s"} uploaded securely.`);return}
      const completed=[];
      for(let index=0;index<files.length;index+=1){
        const file=files[index];setToast(`Uploading ${index+1} of ${files.length}: ${file.name}`);
        const form=new FormData();form.append("document",file);form.append("caseId",activeCase.id);if(activityId)form.append("activityId",activityId);
        const response=await fetch("/api/portal/documents/upload",{method:"POST",body:form});
        const payload=await response.json();if(!response.ok)throw new Error(`${file.name}: ${payload.error||"Upload failed"}`);completed.push(payload.fileName||file.name);
      }
      setToast(`${completed.length} file${completed.length===1?"":"s"} uploaded securely. Your attorney was notified.`);
    }catch(error){setToast(error.message||"Unable to upload this document.")}finally{setUploading(false)}
  }

  function handlePortalAction(event) {
    const uploadButton = event.target.closest("[data-upload-activity-id]");
    if (uploadButton) { event.preventDefault(); uploadActivityIdRef.current=uploadButton.dataset.uploadActivityId||""; uploadRef.current?.click(); return; }
    const serviceCard = event.target.closest("[data-service-title]");
    if (serviceCard) {
      const service = services.find((item)=>item.title===serviceCard.dataset.serviceTitle);
      if (service?.directOnCard && service.directHref) { event.preventDefault(); window.location.assign(`${service.directHref}${service.directHref.includes("?")?"&":"?"}${demoKey?`preview=${encodeURIComponent(demoKey)}`:"portal=1"}`); return; }
      if (service) { event.preventDefault(); setDialog({ type: "service", service }); return; }
    }
    const button = event.target.closest("button"); if (!button) return;
    const label = button.textContent.trim();
    if (button.getAttribute("aria-label")?.startsWith("Notifications")) { event.preventDefault(); setNotificationMode("list"); return; }
    if (label === "View case details") { event.preventDefault(); setDialog({ type: "case" }); }
    else if (["Upload a document","Choose files","Upload specimen","Choose specimen file"].includes(label)) { event.preventDefault(); uploadActivityIdRef.current=""; uploadRef.current?.click(); }
    else if (label === "Ask a question") { event.preventDefault(); setActive("appointments"); setToast("Write your question in the secure message box."); }
    else if (label === "Request office action call") { event.preventDefault(); setActive("appointments"); notifyAttorney("client_message","Office action call requested","I need to schedule the required attorney call to review the USPTO office action and response options."); setToast("Your attorney was notified that you need to schedule the office action call."); }
    else if (label === "Join when ready") { event.preventDefault(); setDialog({ type: "join" }); }
    else if (label === "Reschedule") { event.preventDefault(); setDialog({ type: "reschedule" }); }
    else if (label === "Download invoice") { event.preventDefault(); downloadInvoice(activeCase, user, caseUpdates).then(()=>setToast("Professional PDF invoice downloaded.")).catch(()=>setToast("Unable to create the invoice. Please try again.")); }
    else if (services.some((service)=>service.action===label)) { event.preventDefault(); setDialog({ type: "service", service: services.find((service)=>service.action===label) }); }
  }

  return (
    <div onClickCapture={handlePortalAction} className="min-h-screen bg-[#f4f7fa] text-slate-900">
      <PortalSessionGuard disabled={Boolean(demoKey)} audience="client" />
      <input ref={uploadRef} disabled={uploading} type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.webp" className="hidden" onChange={(event)=>{uploadClientDocuments(event.target.files,uploadActivityIdRef.current);event.target.value=""}} />
      {toast&&<div role="status" aria-live="polite" className="fixed right-4 top-24 z-[80] max-w-sm rounded-xl bg-slate-950 px-5 py-4 text-sm font-bold text-white shadow-xl"><button type="button" aria-label="Dismiss notification" onClick={()=>setToast("")} className="mr-3 text-blue-300">×</button>{toast}</div>}
      <PortalDialog dialog={dialog} clientCase={activeCase} demoKey={demoKey} onClose={()=>setDialog(null)} onSuccess={(message)=>{notifyAttorney(dialog?.type==='service'?'service_request':'client_request',dialog?.type==='service'?`${dialog.service?.title} consultation requested`:'Client portal request',message);setDialog(null);setToast("Your request was sent to the legal team.")}} />
      <NotificationCenter mode={notificationMode} updates={demoUpdates} onOpen={openNotification} onClose={()=>setNotificationMode(null)}/>
      <PortalGuidedTour audience="client" steps={clientTourSteps} onStepChange={(step)=>{if(step.view){setActive(step.view);setMobileMenu(false)}}}/>
      <header data-tour="client-header" className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4"><button onClick={()=>setMobileMenu(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-xl lg:hidden" aria-label="Open portal menu"><HiOutlineSquares2X2 /></button><Logo /></div>
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <button data-tour="client-notifications" type="button" title="Open notifications" aria-haspopup="dialog" aria-expanded={Boolean(notificationMode)} aria-label={`Notifications${unreadCount?` (${unreadCount} unread)`:""}`} className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border text-lg transition sm:h-11 sm:w-11 sm:rounded-full focus:outline-none focus:ring-4 focus:ring-blue-100 ${notificationMode?"border-blue-400 bg-blue-50 text-[#027dd6]":"border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-[#027dd6]"}`}><HiOutlineBell aria-hidden="true" />{unreadCount>0&&<span aria-hidden="true" className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-[10px] font-extrabold leading-none text-white ring-2 ring-white">{unreadCount>9?"9+":unreadCount}</span>}</button>
            <div className="flex min-w-0 items-center gap-3 rounded-full border border-slate-200 py-1.5 pl-1.5 pr-2 sm:pr-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-900 text-xs font-bold text-white">{initials}</span><span className="hidden min-w-0 text-left sm:block"><span className="block truncate text-xs font-bold text-slate-900">{clientName}</span><span className="block max-w-44 truncate text-[10px] text-slate-500">{user?.email}</span></span></div>
          </div>
        </div>
      </header>

      <div className="grid w-full lg:grid-cols-[264px_minmax(0,1fr)] 2xl:grid-cols-[288px_minmax(0,1fr)]">
        <aside className={`${mobileMenu ? "fixed inset-0 z-50 flex" : "hidden"} border-r border-slate-200 bg-white lg:sticky lg:top-20 lg:flex lg:h-[calc(100vh-80px)] lg:flex-col`}>
          {mobileMenu && <button className="absolute inset-0 bg-slate-950/40 lg:hidden" onClick={()=>setMobileMenu(false)} aria-label="Close portal menu overlay" />}
          <div className="relative z-10 flex h-full w-[280px] flex-col bg-white p-4 lg:w-full">
            <div className="mb-4 flex items-center justify-between px-2 lg:hidden"><p className="font-extrabold">Client portal</p><button onClick={()=>setMobileMenu(false)} aria-label="Close portal menu" className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100"><HiOutlineXMark /></button></div>
            <nav className="space-y-1">{navigation.map(item=>{const Icon=item.icon; const selected=active===item.id; const badge=item.id==="tasks"?demoUpdates.filter(update=>["requirement","document"].includes(update.type)).length:null; return <button data-tour={`client-${item.id}`} key={item.id} onClick={()=>{setActive(item.id);setMobileMenu(false)}} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${selected ? "bg-blue-50 text-[#027dd6]" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}><Icon className="text-xl" /><span className="flex-1">{item.label}</span>{badge>0 && <span className="grid h-6 min-w-6 place-items-center rounded-full bg-orange-100 px-1 text-[11px] text-orange-700">{badge}</span>}</button>})}</nav>
            <div className="mt-auto rounded-2xl bg-gradient-to-br from-[#027dd6] to-[#1599e5] p-4 text-white"><HiOutlineUserCircle className="text-2xl text-blue-50" /><p className="mt-3 text-sm font-bold">Need help?</p><p className="mt-1 text-xs leading-5 text-blue-50">Your client care team is available Monday–Friday.</p><a href="tel:+13104244909" className="mt-3 block text-xs font-bold text-white">+1 (310) 424-4909</a><PortalLogoutButton /></div>
          </div>
        </aside>
        <main data-tour={`client-${active}-content`} onMouseEnter={()=>window.dispatchEvent(new CustomEvent("lto-portal-tour-hover",{detail:`client-${active}-content`}))} className="mx-auto w-full min-w-0 max-w-[1720px] p-4 pb-24 sm:p-6 lg:p-8 xl:p-10">{views[active]}</main>
      </div>
    </div>
  );
}
