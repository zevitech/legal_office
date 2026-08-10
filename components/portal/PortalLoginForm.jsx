"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/firebase";
import { createFreshDemoClient, freshDemoSeedFromEmail } from "@/lib/portalFreshDemo";

export default function PortalLoginForm({ audience = "client" }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [freshDemo, setFreshDemo] = useState(null);

  function createFreshDemo(form) {
    const seed = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    const demo = createFreshDemoClient(seed);
    setFreshDemo(demo);
    form.email.value = demo.user.email;
    form.password.value = demo.password;
    try {
      const keys = JSON.parse(localStorage.getItem("lto_fresh_demo_keys") || "[]");
      localStorage.setItem("lto_fresh_demo_keys", JSON.stringify([demo.key, ...keys.filter((key) => key !== demo.key)].slice(0, 25)));
      const notifications = JSON.parse(localStorage.getItem("lto_demo_attorney_notifications") || "[]");
      const onboardingNotice = { id:`demo-onboarding-${demo.key}`, clientUid:demo.key, clientName:demo.user.name, clientEmail:demo.user.email, caseId:demo.case.id, type:"client_onboarded", title:`New client onboarded: ${demo.user.name}`, message:`A fresh portal account was created for ${demo.case.markName}. Open the case and schedule the mandatory trademark consultation.`, read:false, createdAt:new Date().toISOString() };
      localStorage.setItem("lto_demo_attorney_notifications", JSON.stringify([onboardingNotice, ...notifications.filter((item) => item.id !== onboardingNotice.id)]));
    } catch {}
  }

  async function submit(event) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email")).trim().toLowerCase();
    const password = String(form.get("password"));
    try {
      if (process.env.NODE_ENV !== "production" && audience === "client") {
        const demos = { "alex@northstarstudio.example": ["Northstar2026!", "northstar"], "maya@asteriawellness.example": ["Asteria2026!", "asteria"], "jordan@harborpine.example": ["Journey2026!", "journey"] };
        if (demos[email]?.[0] === password) { router.replace(`/client-portal?preview=${demos[email][1]}`); return; }
        const freshSeed = freshDemoSeedFromEmail(email);
        if (freshSeed) {
          const demo = createFreshDemoClient(freshSeed);
          if (demo.password !== password) throw new Error("The fresh demo password does not match. Create another demo or use the displayed password.");
          router.replace(`/client-portal?preview=${encodeURIComponent(demo.key)}`);
          return;
        }
      }
      const result = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
      const idToken = await result.user.getIdToken(true);
      const response = await fetch("/api/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error);
      const isStaff = ["admin", "attorney"].includes(payload.role);
      if ((audience === "staff" && !isStaff) || (audience === "client" && isStaff)) {
        await signOut(getFirebaseAuth());
        await fetch("/api/auth/session", { method: "DELETE" });
        throw new Error(audience === "staff" ? "This account does not have attorney portal access." : "Staff accounts must use the attorney portal sign-in.");
      }
      router.replace(isStaff ? "/portal-admin" : "/client-portal"); router.refresh();
    } catch (error) {
      setError(error?.message || "We couldn’t sign you in. Check your email and password, or reset your password.");
    } finally { setBusy(false); }
  }

  return <form onSubmit={submit} className="space-y-5">
    {process.env.NODE_ENV !== "production" && audience === "client" && <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4"><p className="text-xs font-extrabold uppercase tracking-wider text-[#027dd6]">Client journey testing</p><p className="mt-1 text-xs leading-5 text-slate-600">Create a brand-new fictional client at “Application received,” or open an existing journey.</p><button type="button" onClick={(event)=>createFreshDemo(event.currentTarget.form)} className="mt-3 w-full rounded-xl bg-[#006fbd] px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#005f9f]">＋ Create fresh demo client</button>{freshDemo&&<div className="mt-3 rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-xs text-emerald-950"><b className="block text-sm">Fresh account created: {freshDemo.user.name}</b><span className="mt-1 block">Trademark: {freshDemo.case.markName}</span><span className="mt-2 block break-all"><b>Email:</b> {freshDemo.user.email}</span><span className="mt-1 block break-all"><b>Temporary password:</b> {freshDemo.password}</span><span className="mt-2 block font-bold">The login fields are filled. Press “Sign in to client portal.”</span></div>}<div className="mt-3 grid gap-2 text-xs text-slate-700"><button type="button" onClick={(event)=>{const form=event.currentTarget.form;form.email.value='jordan@harborpine.example';form.password.value='Journey2026!';}} className="rounded-xl border border-emerald-300 bg-white p-3 text-left transition hover:border-emerald-400"><b className="block text-emerald-900">Existing fresh journey · Harbor &amp; Pine</b><span className="mt-1 block break-all">jordan@harborpine.example · Journey2026!</span></button><button type="button" onClick={(event)=>{const form=event.currentTarget.form;form.email.value='alex@northstarstudio.example';form.password.value='Northstar2026!';}} className="rounded-xl border border-blue-200 bg-white p-3 text-left"><b className="block text-slate-950">Progressed journey · Northstar Studio</b><span className="break-all">alex@northstarstudio.example · Northstar2026!</span></button><button type="button" onClick={(event)=>{const form=event.currentTarget.form;form.email.value='maya@asteriawellness.example';form.password.value='Asteria2026!';}} className="rounded-xl border border-blue-200 bg-white p-3 text-left"><b className="block text-slate-950">Scheduled-call journey · Asteria Wellness</b><span className="break-all">maya@asteriawellness.example · Asteria2026!</span></button></div></div>}
    {process.env.NODE_ENV !== "production" && audience === "staff" && <Link href="/portal-admin?preview=1" className="block rounded-2xl border border-cyan-200 bg-cyan-50 p-4 text-center text-sm font-extrabold text-cyan-800">Open attorney portal demo →</Link>}
    {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
    <label className="block"><span className="text-sm font-bold text-slate-900">Email address</span><input name="email" type="email" autoComplete="email" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5 text-sm text-slate-950 placeholder:text-slate-500 outline-none transition focus:border-[#027dd6] focus:ring-4 focus:ring-blue-50" placeholder="you@company.com" /></label>
    <label className="block"><span className="flex items-center justify-between gap-4 text-sm font-bold text-slate-800"><span>Password</span><Link href="/portal/forgot-password" className="font-semibold text-[#027dd6]">Forgot password?</Link></span><div className="relative mt-2"><input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required className="w-full rounded-xl border border-slate-300 px-4 py-3.5 pr-20 text-sm outline-none transition focus:border-[#027dd6] focus:ring-4 focus:ring-blue-50" /><button type="button" onClick={()=>setShowPassword(value=>!value)} className="absolute inset-y-0 right-3 text-xs font-bold text-slate-500">{showPassword ? "Hide" : "Show"}</button></div></label>
    <button disabled={busy} className="w-full rounded-xl bg-[#006fbd] px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-[#005f9f] disabled:cursor-wait disabled:opacity-60">{busy ? "Signing in securely…" : audience === "staff" ? "Sign in to attorney portal" : "Sign in to client portal"}</button>
    <p className="text-center text-xs font-medium leading-5 text-slate-600">Protected by encrypted authentication and secure session cookies. Never share your password or verification links.</p>
  </form>;
}
