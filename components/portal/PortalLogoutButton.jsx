"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { getFirebaseAuth } from "@/firebase";

const styles = {
  sidebar:
    "mt-3 w-full rounded-xl border border-white/15 px-3 py-2 text-xs font-bold text-white hover:bg-white/10",
  header:
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-[#027dd6] sm:px-4",
};

export default function PortalLogoutButton({ variant = "sidebar", preview = false, redirectTo = "/portal-login" }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleLogout() {
    if (busy) return;
    setBusy(true);

    try {
      if (!preview) {
        try {
          await signOut(getFirebaseAuth());
        } catch {
          // Continue clearing the server session even if Firebase is already signed out.
        }
        await fetch("/api/auth/session", { method: "DELETE" });
      }
    } finally {
      router.replace(redirectTo);
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={handleLogout}
      className={`${styles[variant] || styles.sidebar} disabled:cursor-wait disabled:opacity-60`}
      aria-label={preview ? "Exit attorney portal preview" : "Sign out of the secure portal"}
    >
      {variant === "header" && <HiOutlineArrowRightOnRectangle className="text-base" />}
      {busy ? "Signing out…" : preview ? "Exit preview" : "Sign out"}
    </button>
  );
}
