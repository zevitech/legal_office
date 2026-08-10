"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary. Without this, any uncaught server exception
 * renders Next's bare "Application error … Digest" screen, which gives the
 * user nothing to act on and gives us nothing to debug.
 */
export default function MainError({ error, reset }) {
  useEffect(() => {
    // Surfaces in the Vercel runtime logs alongside the digest shown on screen.
    console.error("Route error:", error?.digest, error?.message);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <h1 className="text-xl font-bold text-heading-color">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          We hit an unexpected problem loading this page. Your data has not been
          affected. Please try again, or contact us if it keeps happening.
        </p>

        {error?.digest && (
          <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 font-mono text-xs text-slate-500">
            Reference: {error.digest}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-primary-theme px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-primary-theme hover:text-primary-theme"
          >
            Return home
          </Link>
        </div>

        <p className="mt-5 text-xs text-slate-500">
          Need help now? Call{" "}
          <a
            href="tel:+13104244909"
            className="font-semibold text-primary-theme"
          >
            +1 (310) 424-4909
          </a>
        </p>
      </div>
    </main>
  );
}
