"use client";

import { useEffect, useRef, useState } from "react";
import { HiOutlineClock, HiOutlineLockClosed } from "react-icons/hi2";

const IDLE_LIMIT_MS = 30 * 60 * 1000;
const WARNING_MS = 5 * 60 * 1000;

export default function PortalSessionGuard({ disabled = false, audience = "client" }) {
  const [remaining, setRemaining] = useState(null);
  const lastActivityRef = useRef(Date.now());
  const signingOutRef = useRef(false);

  useEffect(() => {
    if (disabled) return;
    const markActive = () => {
      if (remaining === null) lastActivityRef.current = Date.now();
    };
    const events = ["pointerdown", "keydown", "touchstart", "scroll"];
    events.forEach((name) => window.addEventListener(name, markActive, { passive: true }));
    const timer = window.setInterval(async () => {
      const idleFor = Date.now() - lastActivityRef.current;
      const timeLeft = IDLE_LIMIT_MS - idleFor;
      if (timeLeft <= 0 && !signingOutRef.current) {
        signingOutRef.current = true;
        try { await fetch("/api/auth/session", { method: "DELETE" }); } catch {}
        window.location.assign(audience === "attorney" ? "/portal-admin/login?reason=inactive" : "/portal-login?reason=inactive");
        return;
      }
      setRemaining(timeLeft <= WARNING_MS ? Math.max(0, Math.ceil(timeLeft / 1000)) : null);
    }, 1000);
    return () => {
      events.forEach((name) => window.removeEventListener(name, markActive));
      window.clearInterval(timer);
    };
  }, [audience, disabled, remaining]);

  async function continueSession() {
    try {
      const response = await fetch("/api/portal/me", { cache: "no-store" });
      if (!response.ok) throw new Error("Session expired");
      lastActivityRef.current = Date.now();
      setRemaining(null);
    } catch {
      window.location.assign(audience === "attorney" ? "/portal-admin/login?reason=expired" : "/portal-login?reason=expired");
    }
  }

  if (remaining === null) return null;
  const minutes = Math.floor(remaining / 60);
  const seconds = String(remaining % 60).padStart(2, "0");
  return <div className="fixed inset-0 z-[150] grid place-items-center bg-slate-950/65 p-4" role="presentation">
    <section role="alertdialog" aria-modal="true" aria-labelledby="portal-session-title" aria-describedby="portal-session-description" className="w-full max-w-md rounded-[24px] bg-white p-6 shadow-2xl sm:p-8">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-2xl text-orange-600"><HiOutlineLockClosed /></span>
      <h2 id="portal-session-title" className="mt-5 text-2xl font-extrabold text-slate-950">Still working in the portal?</h2>
      <p id="portal-session-description" className="mt-3 text-sm leading-6 text-slate-600">For your security, this session will sign out after 30 minutes without activity. Unsaved form entries may be lost.</p>
      <p className="mt-5 flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-3 text-sm font-extrabold text-orange-800"><HiOutlineClock className="text-xl" /> Signing out in {minutes}:{seconds}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" onClick={async()=>{await fetch("/api/auth/session",{method:"DELETE"});window.location.assign(audience==="attorney"?"/portal-admin/login":"/portal-login")}} className="min-h-11 rounded-xl border border-slate-300 px-4 py-3 text-sm font-extrabold text-slate-700">Sign out now</button><button type="button" autoFocus onClick={continueSession} className="min-h-11 rounded-xl bg-[#006fbd] px-4 py-3 text-sm font-extrabold text-white">Continue session</button></div>
    </section>
  </div>;
}
