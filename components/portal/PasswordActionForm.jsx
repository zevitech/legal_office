"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  confirmPasswordReset,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
} from "firebase/auth";
import { getFirebaseAuth } from "@/firebase";

// Passwords are set through Firebase's client SDK, so this is the only place a
// rule can be applied. Firebase itself rejects anything under 8 characters
// (auth/weak-password); we match that exactly rather than advertising a longer
// rule the system cannot actually enforce.
const MIN_PASSWORD_LENGTH = 8;

// Turns Firebase's error codes into something a customer can act on. Anything
// unmapped falls through to a neutral message instead of leaking SDK text.
function describeAuthError(err) {
  switch (err?.code) {
    case "auth/weak-password":
      return `Choose a longer password — at least ${MIN_PASSWORD_LENGTH} characters.`;
    case "auth/expired-action-code":
      return "This secure link has expired. Request a new one below.";
    case "auth/invalid-action-code":
      return "This secure link is invalid or has already been used. Request a new one.";
    case "auth/user-disabled":
      return "This account is disabled. Please contact support.";
    case "auth/user-not-found":
      return "We could not find a portal account for that link.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a few minutes and try again.";
    case "auth/network-request-failed":
      return "We could not reach the server. Check your connection and try again.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    default:
      return err?.message && !err.message.startsWith("Firebase")
        ? err.message
        : "Something went wrong. Please try again, or contact support if it continues.";
  }
}

export default function PasswordActionForm({ mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    // React clears currentTarget once this handler awaits, so read the form now.
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      if (mode === "forgot") {
        const email = String(form.get("email")).trim();
        if (!email)
          throw new Error("Enter the email address for your portal account.");
        await sendPasswordResetEmail(getFirebaseAuth(), email, {
          url: `${window.location.origin}/portal-login`,
        });
        setMessage(
          "If that email belongs to a portal account, secure reset instructions are on the way.",
        );
      } else {
        const password = String(form.get("password"));
        const confirmation = String(form.get("confirmation"));
        const code = params.get("oobCode");

        if (!code)
          throw new Error(
            "This page is missing its secure link. Open the link from your email again.",
          );
        if (password.length < MIN_PASSWORD_LENGTH)
          throw new Error(
            `Your password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
          );
        if (password !== confirmation)
          throw new Error("The two passwords do not match.");

        const auth = getFirebaseAuth();
        await verifyPasswordResetCode(auth, code);
        await confirmPasswordReset(auth, code, password);
        setMessage("Your password is ready. Redirecting you to secure login…");
        setTimeout(() => router.replace("/portal-login"), 1200);
      }
    } catch (err) {
      setError(describeAuthError(err));
    } finally {
      setBusy(false);
    }
  }

  // The password inputs deliberately carry no minLength attribute: the browser's
  // native popup would block submit before our handler runs, so the form could
  // never show its own message. Length is checked in submit() instead.
  return (
    <form onSubmit={submit} className="space-y-5">
      {message && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          {message}
        </div>
      )}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"
        >
          {error}
        </div>
      )}
      {mode === "forgot" ? (
        <label className="block">
          <span className="text-sm font-bold text-slate-800">
            Portal email address
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-[#027dd6] focus:ring-4 focus:ring-blue-50"
          />
        </label>
      ) : (
        <>
          <label className="block">
            <span className="text-sm font-bold text-slate-800">
              Create password
            </span>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              required
              aria-describedby="password-hint"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-[#027dd6] focus:ring-4 focus:ring-blue-50"
            />
            <span
              id="password-hint"
              className="mt-2 block text-xs text-slate-500"
            >
              Use at least {MIN_PASSWORD_LENGTH} characters. A passphrase is
              easier to remember and harder to guess.
            </span>
          </label>
          <label className="block">
            <span className="text-sm font-bold text-slate-800">
              Confirm password
            </span>
            <input
              name="confirmation"
              type="password"
              autoComplete="new-password"
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-[#027dd6] focus:ring-4 focus:ring-blue-50"
            />
          </label>
        </>
      )}
      <button
        disabled={busy}
        className="w-full rounded-xl bg-[#006fbd] px-5 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#005f9f] disabled:opacity-60"
      >
        {busy
          ? "Securing your account…"
          : mode === "forgot"
            ? "Send secure reset link"
            : "Create password and continue"}
      </button>
    </form>
  );
}
