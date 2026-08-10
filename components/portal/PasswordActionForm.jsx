"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmPasswordReset, sendPasswordResetEmail, verifyPasswordResetCode } from "firebase/auth";
import { getFirebaseAuth } from "@/firebase";

export default function PasswordActionForm({ mode }) {
  const router = useRouter(); const params = useSearchParams();
  const [busy, setBusy] = useState(false); const [message, setMessage] = useState(""); const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    const form = new FormData(event.currentTarget);
    try {
      if (mode === "forgot") {
        await sendPasswordResetEmail(getFirebaseAuth(), String(form.get("email")).trim(), { url: `${window.location.origin}/portal-login` });
        setMessage("If that email belongs to a portal account, secure reset instructions are on the way.");
      } else {
        const password = String(form.get("password")); const confirmation = String(form.get("confirmation")); const code = params.get("oobCode");
        if (password.length < 12) throw new Error("Use at least 12 characters.");
        if (password !== confirmation) throw new Error("Passwords do not match.");
        const auth = getFirebaseAuth();
        await verifyPasswordResetCode(auth, code); await confirmPasswordReset(auth, code, password);
        setMessage("Your password is ready. Redirecting you to secure login…"); setTimeout(()=>router.replace("/portal-login"), 1200);
      }
    } catch (err) { setError(err.message?.startsWith("Firebase") ? "This secure link is invalid or has expired. Request a new one." : err.message || "Please try again."); }
    finally { setBusy(false); }
  }

  return <form onSubmit={submit} className="space-y-5">
    {message && <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">{message}</div>}
    {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
    {mode === "forgot" ? <label className="block"><span className="text-sm font-bold text-slate-800">Portal email address</span><input name="email" type="email" autoComplete="email" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-[#027dd6] focus:ring-4 focus:ring-blue-50" /></label> : <><label className="block"><span className="text-sm font-bold text-slate-800">Create password</span><input name="password" type="password" autoComplete="new-password" minLength={12} required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-[#027dd6] focus:ring-4 focus:ring-blue-50" /><span className="mt-2 block text-xs text-slate-500">Use 12+ characters. A passphrase is easier to remember and harder to guess.</span></label><label className="block"><span className="text-sm font-bold text-slate-800">Confirm password</span><input name="confirmation" type="password" autoComplete="new-password" minLength={12} required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-[#027dd6] focus:ring-4 focus:ring-blue-50" /></label></>}
    <button disabled={busy} className="w-full rounded-xl bg-[#006fbd] px-5 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#005f9f] disabled:opacity-60">{busy ? "Securing your account…" : mode === "forgot" ? "Send secure reset link" : "Create password and continue"}</button>
  </form>;
}
