"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

const Searchbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    closeButtonRef.current?.focus();
    const handleEscape = (event) => event.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (!isSearching) return undefined;
    const timer = window.setTimeout(() => {
      setIsSearching(false);
      setIsSearchComplete(true);
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [isSearching]);

  const handleOpen = () => {
    if (!searchInput.trim()) return;
    setIsSearchComplete(false);
    setIsSearching(true);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSearching(false);
    setIsSearchComplete(false);
  };

  return (
    <>
      <div className="flex-center gap-4 max-md:flex-col">
        <div className="relative w-[650px] max-md:w-full">
          <label htmlFor="homepage-trademark-search" className="sr-only">
            Trademark name to search
          </label>
          <input
            id="homepage-trademark-search"
            className="h-[50px] w-full rounded-md px-6 pr-16 text-sm outline-blue-600"
            type="text"
            placeholder="Search Trademark Here..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && handleOpen()}
          />
          <CiSearch aria-hidden="true" className="absolute right-7 top-1/2 -translate-y-1/2 text-3xl text-slate-400" />
        </div>
        <button
          type="button"
          className="min-h-[50px] rounded-md bg-color-primary px-14 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 max-md:w-full"
          onClick={handleOpen}
          disabled={!searchInput.trim()}
        >
          Search
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-5 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => event.target === event.currentTarget && handleClose()}
        >
          <section
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="trademark-search-title"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="trademark-search-title" className="text-xl font-bold text-slate-900">
                {isSearching ? "Checking federal records..." : "Next step ready"}
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                className="grid h-11 w-11 place-items-center rounded-full text-2xl text-slate-600 hover:bg-slate-100"
                aria-label="Close search result"
              >
                ×
              </button>
            </div>

            <div className="my-5 flex items-center justify-between border-y border-slate-200 py-5">
              <p className="text-2xl text-slate-600">{searchInput || "Trademark"}</p>
              <span
                className={`grid h-14 w-14 place-items-center rounded-full text-2xl font-bold ${
                  isSearchComplete
                    ? "bg-emerald-100 text-emerald-700"
                    : "animate-pulse bg-blue-100 text-blue-700"
                }`}
                aria-hidden="true"
              >
                {isSearchComplete ? "✓" : "…"}
              </span>
            </div>

            <p className="mb-6 text-slate-600">
              {isSearchComplete ? (
                <>
                  &quot;<span className="font-semibold text-slate-900">{searchInput}</span>&quot; is ready for specialist review. Continue to compare related federal filings and prepare the right application details.
                </>
              ) : (
                "Please wait while we run a preliminary federal search..."
              )}
            </p>

            <div className="flex gap-3 max-sm:flex-col">
              <Link
                href="/trademark-register"
                className={`flex min-h-[48px] flex-1 items-center justify-center rounded-md bg-color-primary px-5 text-center font-semibold text-white ${isSearching ? "pointer-events-none opacity-50" : ""}`}
                aria-disabled={isSearching}
              >
                Continue with Specialist Review
              </Link>
              <button
                type="button"
                onClick={handleClose}
                className="min-h-[48px] rounded-md border border-slate-300 px-6 font-semibold text-slate-700"
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Searchbar;
