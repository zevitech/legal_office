"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  HiOutlineBell,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineCog6Tooth,
  HiOutlineDocumentText,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineShieldCheck,
  HiOutlineUsers,
} from "react-icons/hi2";
import PortalCaseWorkspace from "@/components/portal/PortalCaseWorkspace";
import PortalGuidedTour from "@/components/portal/PortalGuidedTour";
import PortalLogoutButton from "@/components/portal/PortalLogoutButton";
import PortalSessionGuard from "@/components/portal/PortalSessionGuard";
import { getPortalDemoActivity } from "@/lib/portalDemoActivity";
import { freshDemoFromPreviewKey } from "@/lib/portalFreshDemo";

const previewClients = [
  { key: "northstar", uid: "preview-northstar", name: "Alex North", company: "Northstar Studio LLC", email: "alex@northstarstudio.example", caseId: "LTO-2026-08147", mark: "Northstar Studio", stage: "Classes and USPTO filing fees", task: "0 open tasks", assignedAttorney: { uid: "attorney-danish", name: "Danish Khan", title: "Trademark attorney", email: "danish@legaltrademarkoffice.com" } },
  { key: "asteria", uid: "preview-asteria", name: "Maya Rivera", company: "Asteria Wellness Co.", email: "maya@asteriawellness.example", caseId: "LTO-2026-08132", mark: "Asteria Wellness", stage: "Mandatory attorney consultation", task: "0 open tasks", assignedAttorney: { uid: "attorney-maya", name: "Maya Patel", title: "Senior trademark attorney", email: "maya@legaltrademarkoffice.com" } },
  { key: "journey", uid: "preview-journey", name: "Jordan Lee", company: "Harbor & Pine Goods LLC", owner: "Harbor & Pine Goods LLC", email: "jordan@harborpine.example", caseId: "LTO-DEMO-10001", mark: "Harbor & Pine", markType: "Word mark", stage: "Application received", progress: 12, packageName: "Advanced", orderTotal: 249, openTasks: 0, task: "0 open tasks", consultationStatus: "pending", clearanceReportStatus: "pending", classificationPaymentStatus: "not_requested", applicationDetails: { ownerType: "Limited liability company", organizationType: "LLC", stateFormation: "Oregon", trademarkCurrentlyBeingUsed: "Yes", firstAnywhereDate: "2025-11-10", firstCommenceDate: "2026-01-15", selectedActivities: ["Home décor retail services", "Online retail store services", "Candles and home fragrance products"], estimatedClassCount: 0, reviewPreference: "Attorney to finalize classes" }, selectedClasses: [], assignedAttorney: { uid: "attorney-danish", name: "Danish Khan", title: "Trademark attorney", email: "danish@legaltrademarkoffice.com" } },
];

const adminTourSteps = [
  { target:"admin-overview", title:"Your attorney operations center", description:"This dashboard summarizes clients, open matters, pending client tasks and scheduled calls without loading every client record at once." },
  { target:"admin-stats", title:"Filter work by priority", description:"Open a summary card to focus the dashboard on active clients, cases, tasks or calls." },
  { target:"admin-clients", title:"Open the correct client matter", description:"Search by client, company, email, trademark or case number. Open Case launches one focused workspace for that trademark." },
  { target:"admin-invite", title:"Invite or add a client", description:"Create portal access for a new or previous client and associate one or multiple trademark matters with the same account." },
  { target:"admin-notifications", title:"Two-way client inbox", description:"Uploads, task responses, client messages, service requests and payment activity create attorney notifications here and by email." },
  { target:"admin-team", title:"Manage attorney access", description:"Maintain attorney profiles, invite additional attorneys and assign the correct attorney to each matter." },
  { target:"admin-case-action", openCase:true, activateTarget:true, title:"Control the client roadmap", description:"Use the same seven-stage roadmap the client sees. Review completed evidence, open the current required action, and keep future stages locked until their prerequisites are satisfied." },
  { target:"admin-case-case", openCase:true, activateTarget:true, title:"Review case and attorney details", description:"Confirm the owner, mark, package, business activities, attorney-selected classes, USPTO serial number and assigned attorney before taking action." },
  { target:"admin-case-activity", openCase:true, activateTarget:true, title:"Manage tasks, files and appointments", description:"Open pending client requirements, review uploads and amendment requests, edit appointments, respond to the client, or remove an obsolete requirement from the client dashboard." },
  { target:"admin-case-billing", openCase:true, activateTarget:true, title:"Request or record exact payments", description:"Create itemized classification fees only after the attorney clearance report, issue other disclosed fees, mark an exact invoice paid, or charge a saved method only within valid client authorization." },
  { target:"admin-case-records", openCase:true, activateTarget:true, title:"Keep invoices, consent and evidence", description:"Review receipts, payment consent, uploaded proof and audit events, then download a case evidence bundle for internal records or a processor dispute response." },
];

function StatCard({ icon: Icon, value, label, view, current, onClick }) {
  return <button onClick={()=>onClick(view)} className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md ${current===view?"border-blue-400 ring-2 ring-blue-100":"border-slate-200"}`}><span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-xl text-[#027dd6]"><Icon /></span><p className="mt-5 text-3xl font-extrabold">{value}</p><p className="mt-1 text-sm font-bold text-slate-600">{label}</p><span className="mt-3 inline-block text-xs font-extrabold text-[#027dd6]">View {label.toLowerCase()} →</span></button>;
}

export default function PortalAdminDashboard({ staff, preview = false, initialClients = [] }) {
  const [generatedPreviewClients, setGeneratedPreviewClients] = useState([]);
  const [liveClients, setLiveClients] = useState(initialClients);
  const clients = useMemo(() => preview ? [...generatedPreviewClients, ...previewClients] : liveClients, [generatedPreviewClients, liveClients, preview]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedPanel, setSelectedPanel] = useState("action");
  const [dashboardView, setDashboardView] = useState("clients");
  const [clientActivity, setClientActivity] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleClients = useMemo(() => normalizedQuery ? clients.filter((client) => [client.name, client.company, client.email, client.mark, client.caseId].some((value) => String(value || "").toLowerCase().includes(normalizedQuery))) : clients, [clients, normalizedQuery]);
  const totalPages = Math.max(1, Math.ceil(visibleClients.length / pageSize));
  const pageClients = useMemo(() => visibleClients.slice((page - 1) * pageSize, page * pageSize), [page, visibleClients]);
  const activityClients = useMemo(() => {
    if (!selectedClient) return pageClients;
    return pageClients.some((client) => client.key === selectedClient.key) ? pageClients : [...pageClients, selectedClient];
  }, [pageClients, selectedClient]);

  useEffect(() => {
    if (!preview) return;
    function loadGeneratedClients() {
      try {
        const keys = JSON.parse(localStorage.getItem("lto_fresh_demo_keys") || "[]");
        const generated = keys.map((key) => freshDemoFromPreviewKey(key)).filter(Boolean).map((demo) => ({
          key: demo.key,
          uid: demo.user.uid,
          name: demo.user.name,
          company: demo.case.company,
          owner: demo.case.company,
          email: demo.user.email,
          caseId: demo.case.id,
          mark: demo.case.markName,
          task: "0 open tasks",
          ...demo.case,
        }));
        setGeneratedPreviewClients(generated);
      } catch { setGeneratedPreviewClients([]); }
    }
    loadGeneratedClients();
    window.addEventListener("storage", loadGeneratedClients);
    return () => window.removeEventListener("storage", loadGeneratedClients);
  }, [preview]);

  useEffect(() => { setPage(1); }, [searchQuery, dashboardView]);
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

  useEffect(() => {
    if (preview) return;
    let active = true;
    async function refreshClients() {
      try {
        const response = await fetch("/api/portal/admin/clients", { cache:"no-store" });
        if (response.ok && active) setLiveClients((await response.json()).clients || []);
      } catch {}
    }
    refreshClients();
    const timer = window.setInterval(refreshClients, 15000);
    return () => { active = false; window.clearInterval(timer); };
  }, [preview]);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        if (preview) {
          if (active) setNotifications(JSON.parse(localStorage.getItem("lto_demo_attorney_notifications") || "[]"));
          return;
        }
        const response = await fetch("/api/portal/admin/notifications");
        if (response.ok && active) setNotifications((await response.json()).notifications || []);
      } catch {
        if (active) setNotifications([]);
      }
    }
    load();
    if (preview) window.addEventListener("storage", load);
    const timer = setInterval(load, 30000);
    return () => { active = false; clearInterval(timer); if (preview) window.removeEventListener("storage", load); };
  }, [preview]);

  useEffect(() => {
    let active = true;
    async function loadActivity() {
      const entries = await Promise.all(activityClients.map(async (client) => {
        try {
          if (preview) { const key=`lto_demo_portal_updates_${client.key}`;const seededKey=`${key}_seeded_v2`;let items=JSON.parse(localStorage.getItem(key)||"[]");if(!localStorage.getItem(seededKey)){const seeds=getPortalDemoActivity(client.key);const seedIds=new Set(seeds.map(item=>item.id));items=[...seeds,...items.filter(item=>!seedIds.has(item.id))];localStorage.setItem(key,JSON.stringify(items));localStorage.setItem(seededKey,"1")}return [client.key,items]; }
          const response = await fetch(`/api/portal/admin/clients/${client.uid}/activity?caseId=${encodeURIComponent(client.caseId)}`);
          return [client.key, response.ok ? (await response.json()).activity || [] : []];
        } catch { return [client.key, []]; }
      }));
      if (active) setClientActivity((current) => ({ ...current, ...Object.fromEntries(entries) }));
    }
    loadActivity();
    return () => { active = false; };
  }, [activityClients, preview]);

  const pendingTasks = useMemo(() => clients.flatMap((client) => (clientActivity[client.key] || []).filter((item) => ["requirement", "document", "payment"].includes(item.type) && item.taskStatus !== "completed").map((item) => ({ client, item }))), [clients, clientActivity]);
  const scheduledCalls = useMemo(() => clients.flatMap((client) => (clientActivity[client.key] || []).filter((item) => item.type === "appointment" && item.appointmentStatus !== "cancelled").map((item) => ({ client, item }))), [clients, clientActivity]);
  const activeClientCount = new Set(clients.map((client) => client.uid)).size;
  const pendingTaskCount = Math.max(pendingTasks.length, clients.reduce((sum, client) => sum + Number(client.openTaskCount || 0), 0));
  const scheduledCallCount = Math.max(scheduledCalls.length, clients.reduce((sum, client) => sum + Number(client.scheduledCallCount || 0), 0));

  function openCase(client, panel = "action") { setSelectedPanel(panel); setSelectedClient(client); }

  async function openNotification(item) {
    let availableClients = clients;
    let client = availableClients.find((entry) => (entry.uid === item.clientUid || entry.key === item.clientUid) && (!item.caseId || entry.caseId === item.caseId)) || availableClients.find((entry) => entry.uid === item.clientUid || entry.key === item.clientUid);
    if (!client && !preview) {
      try {
        const response = await fetch("/api/portal/admin/clients", { cache:"no-store" });
        if (response.ok) { availableClients = (await response.json()).clients || []; setLiveClients(availableClients); client = availableClients.find((entry) => (entry.uid === item.clientUid || entry.key === item.clientUid) && (!item.caseId || entry.caseId === item.caseId)) || availableClients.find((entry) => entry.uid === item.clientUid || entry.key === item.clientUid); }
      } catch {}
    }
    if (client) openCase(client, ["client_message","secure_message"].includes(item.type) ? "messages" : "action");
    setNotificationOpen(false);
    setNotifications((items) => items.filter((note) => note.id !== item.id));
    if (preview) { const remaining=JSON.parse(localStorage.getItem("lto_demo_attorney_notifications")||"[]").filter((note)=>note.id!==item.id);localStorage.setItem("lto_demo_attorney_notifications",JSON.stringify(remaining)); }
    else fetch(`/api/portal/admin/notifications?id=${encodeURIComponent(item.id)}`, { method: "PATCH" }).catch(()=>{});
  }

  return <main className="min-h-screen bg-[#f4f7fa] text-slate-950">
    <PortalSessionGuard disabled={preview} audience="attorney" />
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex min-h-20 w-full max-w-[1800px] flex-wrap items-center justify-between gap-3 px-5 py-3 lg:px-8"><Link href="/" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#027dd6] font-black text-white">L</span><span><b className="block text-sm">Legal Trademark</b><span className="block text-[11px] font-bold tracking-wider text-[#027dd6]">ATTORNEY PORTAL</span></span></Link><div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3"><Link data-tour="admin-team" href={preview?"/portal-admin/team?preview=1":"/portal-admin/team"} className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-extrabold text-[#027dd6] sm:px-4">Team &amp; profile</Link><button data-tour="admin-notifications" onClick={()=>setNotificationOpen(true)} aria-label={`Attorney notifications (${notifications.filter((item)=>!item.read).length} unread)`} className="relative grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600"><HiOutlineBell />{notifications.some((item)=>!item.read)&&<span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-[10px] font-extrabold text-white">{notifications.filter((item)=>!item.read).length}</span>}</button><div className="rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-[#027dd6]">{staff?.name || "Portal attorney"}</div><PortalLogoutButton variant="header" preview={preview} redirectTo="/portal-admin/login" /></div></div></header>
    <div className="mx-auto w-full max-w-[1800px] space-y-7 px-5 py-8 pb-24 lg:px-8">
      <section data-tour="admin-overview" className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#027dd6]">Operations center</p><h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Client and case management</h1><p className="mt-2 text-sm font-medium text-slate-600">Manage portal access, legal workflow, client requests and upcoming deadlines.</p></div><Link data-tour="admin-invite" href={preview?"/portal-admin/invite?preview=1":"/portal-admin/invite"} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#006fbd] px-5 py-3.5 text-sm font-extrabold text-white"><HiOutlinePlus /> Invite a client</Link></section>
      <section data-tour="admin-stats" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard icon={HiOutlineUsers} value={activeClientCount} label="Active clients" view="clients" current={dashboardView} onClick={setDashboardView}/><StatCard icon={HiOutlineBriefcase} value={clients.length} label="Open cases" view="cases" current={dashboardView} onClick={setDashboardView}/><StatCard icon={HiOutlineDocumentText} value={pendingTaskCount} label="Open tasks" view="tasks" current={dashboardView} onClick={setDashboardView}/><StatCard icon={HiOutlineCalendarDays} value={scheduledCallCount} label="Scheduled calls" view="calls" current={dashboardView} onClick={setDashboardView}/></section>
      <div data-tour="admin-clients">
      {dashboardView === "tasks" ? <ListPanel title="Pending customer tasks" description="Requirements waiting for a response, upload, or payment from the client" empty="No pending customer tasks on this page.">{pendingTasks.map(({client,item})=><article key={`${client.key}-${item.id}`} className="grid gap-3 border-b border-slate-100 p-5 last:border-0 sm:grid-cols-[1fr_1.5fr_auto] sm:items-center"><div><p className="font-extrabold">{client.name}</p><p className="text-xs text-slate-500">{client.mark}™ · {client.caseId}</p></div><div><p className="text-sm font-bold">{item.title || item.requirementType || "Client requirement"}</p><p className="mt-1 text-xs text-orange-700">Pending{item.dueAt?` · due ${item.dueAt}`:""}</p></div><button onClick={()=>openCase(client,"activity")} className="rounded-xl bg-[#006fbd] px-4 py-2.5 text-sm font-extrabold text-white">Review task</button></article>)}</ListPanel> : dashboardView === "calls" ? <ListPanel title="Scheduled client calls" description="Google Meet and phone appointments across active cases" empty="No calls currently scheduled on this page.">{scheduledCalls.map(({client,item})=><article key={`${client.key}-${item.id}`} className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 last:border-0 sm:flex-row sm:items-center"><div><p className="font-extrabold">{item.title || "Client call"}</p><p className="mt-1 text-xs text-slate-500">{client.name} · {item.appointmentAt?new Date(item.appointmentAt).toLocaleString():"Time not set"}</p></div><button onClick={()=>openCase(client,"activity")} className="rounded-xl border border-blue-200 px-4 py-2 text-sm font-bold text-[#027dd6]">Open case</button></article>)}</ListPanel> : <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm"><div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-extrabold">{dashboardView === "cases" ? "Open trademark cases" : "Active portal clients"}</h2><p className="mt-1 text-sm text-slate-600">{dashboardView === "cases" ? "Review filing progress, tasks, deadlines, and client communications." : "Manage client accounts and open their associated trademark matters."}</p></div><label className="relative"><HiOutlineMagnifyingGlass className="absolute left-4 top-3.5 text-slate-400"/><input value={searchQuery} onChange={(event)=>setSearchQuery(event.target.value)} aria-label="Search clients or cases" className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#027dd6] sm:w-72" placeholder="Search clients or cases"/></label></div><div className="divide-y divide-slate-100">{pageClients.length ? pageClients.map((client)=><article key={client.key} className="grid gap-4 p-5 transition hover:bg-blue-50/40 lg:grid-cols-[1.3fr_1fr_1fr_auto] lg:items-center"><div className="flex items-center gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#027dd6] text-xs font-extrabold text-white">{client.name.split(" ").map((value)=>value[0]).join("")}</span><div><p className="font-extrabold">{client.name}{client.clientStatus==="inactive"&&<span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 align-middle text-[10px] font-extrabold uppercase text-slate-600">Deactivated</span>}</p><p className="break-all text-xs text-slate-500">{client.company}{client.company&&client.email?" · ":""}{client.email}</p></div></div><div><p className="text-sm font-bold">{client.mark}™</p><p className="text-xs text-slate-500">{client.caseId}</p></div><div><span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#027dd6]">{client.stage}</span><p className="mt-2 flex items-center gap-1 text-xs text-slate-500"><HiOutlineClock/>{client.task}</p></div><div className="flex flex-wrap gap-2"><button onClick={()=>openCase(client)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-[#027dd6]">Open case</button><button onClick={()=>openCase(client,"case")} title="Edit details or deactivate" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-[#027dd6]"><HiOutlineCog6Tooth/> Manage</button></div></article>) : <p className="p-8 text-center text-sm text-slate-500">{clients.length?"No clients or cases match your search.":"No client portal accounts have been created yet."}</p>}</div></section>}
      </div>
      {totalPages>1&&<nav aria-label="Client list pages" className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row"><p className="text-xs font-bold text-slate-500">Showing {(page-1)*pageSize+1}–{Math.min(page*pageSize,visibleClients.length)} of {visibleClients.length}</p><div className="flex items-center gap-2"><button type="button" disabled={page===1} onClick={()=>setPage(value=>Math.max(1,value-1))} className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-extrabold text-slate-700 disabled:opacity-40">Previous</button><span className="px-2 text-xs font-extrabold text-slate-600">Page {page} of {totalPages}</span><button type="button" disabled={page===totalPages} onClick={()=>setPage(value=>Math.min(totalPages,value+1))} className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-extrabold text-slate-700 disabled:opacity-40">Next</button></div></nav>}
      <section className="grid gap-6 lg:grid-cols-2"><article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-xs font-extrabold uppercase tracking-wider text-[#027dd6]">Today</p><h2 className="mt-1 text-xl font-extrabold">Priority workflow</h2></div><HiOutlineShieldCheck className="text-3xl text-[#027dd6]"/></div><div className="mt-5 space-y-3">{clients.slice(0,3).map((client,index)=><button key={client.key} onClick={()=>openCase(client)} className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"><span className="grid h-7 w-7 place-items-center rounded-full bg-blue-50 text-xs font-black text-[#027dd6]">{index+1}</span><span className="flex-1 text-sm font-bold">Review {client.mark} case</span><span className="text-xs font-extrabold text-[#027dd6]">Open →</span></button>)}{!clients.length&&<p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">Invite a client to begin case management.</p>}</div></article><article className="rounded-[24px] bg-[#087dcc] p-6 text-white shadow-sm"><p className="text-xs font-extrabold uppercase tracking-wider">Portal operations</p><h2 className="mt-2 text-2xl font-extrabold">Two-way client workflow</h2><p className="mt-3 text-sm font-medium leading-6 text-blue-50">Client uploads, task responses, messages, appointments and service requests create attorney inbox notifications and email alerts.</p><div className="mt-6 h-2 overflow-hidden rounded-full bg-white/25"><div className="h-full w-full rounded-full bg-white"/></div><p className="mt-3 text-xs font-bold">Client and attorney activity connected</p></article></section>
    </div>
    <PortalGuidedTour audience="attorney" steps={adminTourSteps} onStepChange={(step)=>{if(step.openCase&&clients[0])setSelectedClient(clients[0]);else if(!step.openCase)setSelectedClient(null)}}/>
    {selectedClient&&<PortalCaseWorkspace client={selectedClient} preview={preview} initialPanel={selectedPanel} onClose={()=>setSelectedClient(null)}/>} 
    {notificationOpen&&<div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/40 p-4"><button className="absolute inset-0" onClick={()=>setNotificationOpen(false)} aria-label="Close attorney notifications"/><section role="dialog" aria-modal="true" className="relative w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl"><div className="flex items-center justify-between"><div><p className="text-xs font-extrabold uppercase text-[#027dd6]">Attorney inbox</p><h2 className="mt-1 text-xl font-extrabold">Unread client notifications</h2></div><button onClick={()=>setNotificationOpen(false)} aria-label="Close notifications" className="text-xl">×</button></div><div className="mt-5 max-h-[60vh] space-y-3 overflow-y-auto">{notifications.some(item=>!item.read)?notifications.filter(item=>!item.read).map((item)=><button key={item.id} onClick={()=>openNotification(item)} className="w-full rounded-xl border border-blue-200 bg-blue-50 p-4 text-left"><div className="flex justify-between gap-3"><div><p className="font-extrabold">{item.title}</p><p className="mt-1 text-xs font-bold text-[#027dd6]">{item.clientName} · {item.type}</p></div><span className="h-2.5 w-2.5 rounded-full bg-orange-500"/></div><p className="mt-2 text-sm leading-6 text-slate-600">{item.message}</p><span className="mt-3 inline-block text-xs font-extrabold text-[#027dd6]">{["client_message","secure_message"].includes(item.type)?"Open conversation →":"Open client case →"}</span></button>):<p className="rounded-xl bg-emerald-50 p-5 text-center text-sm font-bold text-emerald-700">You’re all caught up.</p>}</div></section></div>}
  </main>;
}

function ListPanel({ title, description, empty, children }) {
  const hasItems = Array.isArray(children) ? children.length > 0 : Boolean(children);
  return <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-200 p-5"><h2 className="text-xl font-extrabold">{title}</h2><p className="mt-1 text-sm text-slate-600">{description}.</p></div>{hasItems?children:<p className="p-8 text-center text-sm text-slate-500">{empty}</p>}</section>;
}
