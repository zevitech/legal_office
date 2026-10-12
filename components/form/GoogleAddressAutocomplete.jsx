"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RiHome5Fill } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";

/**
 * Address autocomplete backed by the Places API (New).
 *
 * This previously used google.maps.places.Autocomplete from the Maps JS SDK.
 * Google has retired that legacy service for newly created projects — it now
 * answers "You're calling a legacy API, which is not enabled for your project",
 * which surfaced to customers as the "This page can't load Google Maps
 * correctly" dialog.
 *
 * The REST endpoints below are the supported replacement. Calling them directly
 * also means no Maps JS bundle is loaded at all, which keeps this page lighter.
 */
const AUTOCOMPLETE_URL = "https://places.googleapis.com/v1/places:autocomplete";
const DETAILS_URL = "https://places.googleapis.com/v1/places";

const GoogleAddressAutocomplete = ({
  value,
  onChange,
  onAddressSelect,
  errorMessage,
  inputRef,
}) => {
  const localRef = useRef(null);
  const containerRef = useRef(null);
  const sessionTokenRef = useRef(null);
  const skipNextLookupRef = useRef(false);

  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loadError, setLoadError] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const setRefs = (node) => {
    localRef.current = node;
    if (typeof inputRef === "function") inputRef(node);
    else if (inputRef) inputRef.current = node;
  };

  // A session token groups the keystrokes of one lookup with the final details
  // call, so Google bills the pair once instead of per request.
  const newSessionToken = () =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `lto-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  // Close the dropdown when focus moves elsewhere on the page.
  useEffect(() => {
    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  // Debounced lookup: fires after typing pauses, not on every keystroke.
  useEffect(() => {
    const query = String(value || "").trim();
    if (!apiKey) {
      setLoadError(true);
      return undefined;
    }
    if (skipNextLookupRef.current) {
      // The value changed because a suggestion was chosen, not typed.
      skipNextLookupRef.current = false;
      return undefined;
    }
    if (query.length < 3) {
      setSuggestions([]);
      setOpen(false);
      return undefined;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        if (!sessionTokenRef.current) sessionTokenRef.current = newSessionToken();
        const response = await fetch(AUTOCOMPLETE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
          },
          body: JSON.stringify({
            input: query,
            includedRegionCodes: ["us"],
            includedPrimaryTypes: ["street_address", "premise", "subpremise"],
            sessionToken: sessionTokenRef.current,
          }),
        });

        if (!response.ok) throw new Error(`Autocomplete ${response.status}`);
        const payload = await response.json();
        if (cancelled) return;

        const items = (payload.suggestions || [])
          .filter((item) => item.placePrediction)
          .map((item) => ({
            placeId: item.placePrediction.placeId,
            label: item.placePrediction.text?.text || "",
          }))
          .filter((item) => item.placeId && item.label)
          .slice(0, 6);

        setSuggestions(items);
        setOpen(items.length > 0);
        setActiveIndex(-1);
        setLoadError(false);
      } catch (error) {
        if (cancelled) return;
        // Manual entry still works, so this degrades rather than blocking.
        console.error("Address lookup unavailable:", error?.message);
        setSuggestions([]);
        setOpen(false);
        setLoadError(true);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [value, apiKey]);

  const choose = useCallback(
    async (suggestion) => {
      setOpen(false);
      setSuggestions([]);
      skipNextLookupRef.current = true;

      try {
        const response = await fetch(
          `${DETAILS_URL}/${encodeURIComponent(suggestion.placeId)}?sessionToken=${encodeURIComponent(sessionTokenRef.current || "")}`,
          {
            headers: {
              "X-Goog-Api-Key": apiKey,
              "X-Goog-FieldMask": "addressComponents,formattedAddress",
            },
          },
        );
        if (!response.ok) throw new Error(`Place details ${response.status}`);
        const place = await response.json();

        // Index components by type, matching the shape the old SDK returned.
        const parts = Object.fromEntries(
          (place.addressComponents || []).flatMap((part) =>
            (part.types || []).map((type) => [type, part]),
          ),
        );
        const streetNumber = parts.street_number?.longText || "";
        const route = parts.route?.longText || "";
        const street = `${streetNumber} ${route}`.trim();

        onAddressSelect?.({
          address: street || place.formattedAddress || suggestion.label,
          city:
            parts.locality?.longText ||
            parts.sublocality_level_1?.longText ||
            parts.postal_town?.longText ||
            "",
          state: parts.administrative_area_level_1?.shortText || "",
          zipCode: parts.postal_code?.longText || "",
        });
      } catch (error) {
        console.error("Address details unavailable:", error?.message);
        // Keep what the customer picked even if the detail lookup failed.
        onAddressSelect?.({ address: suggestion.label, city: "", state: "", zipCode: "" });
      } finally {
        // One session ends with its details call; the next lookup starts a new one.
        sessionTokenRef.current = null;
      }
    },
    [apiKey, onAddressSelect],
  );

  const onKeyDown = (event) => {
    if (!open || suggestions.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? suggestions.length - 1 : index - 1));
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      choose(suggestions[activeIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="w-full" ref={containerRef}>
      <label htmlFor="street-address" className="mb-2 block text-sm font-semibold text-slate-800">
        Street address
      </label>
      <div className="relative">
        <div className={`flex min-h-14 items-center gap-3 rounded-xl border bg-white px-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 ${errorMessage ? "border-rose-500" : "border-slate-300"}`}>
          <RiHome5Fill className="shrink-0 text-xl text-slate-400" />
          <input
            ref={setRefs}
            id="street-address"
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            placeholder="Start typing your address"
            autoComplete="street-address"
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            aria-controls="address-suggestions"
            className="min-w-0 flex-1 bg-transparent py-4 text-base text-slate-900 outline-none placeholder:text-slate-400"
          />
          {!loadError && (
            <span className="hidden items-center gap-1 whitespace-nowrap text-[11px] text-slate-400 sm:flex">
              <HiOutlineLocationMarker /> Google suggestions
            </span>
          )}
        </div>

        {open && suggestions.length > 0 && (
          <ul
            id="address-suggestions"
            role="listbox"
            className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
          >
            {suggestions.map((item, index) => (
              <li key={item.placeId} role="option" aria-selected={index === activeIndex}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => choose(item)}
                  className={`block w-full px-4 py-3 text-left text-sm transition ${index === activeIndex ? "bg-blue-50 text-blue-900" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {errorMessage ? (
        <p className="mt-1 text-xs text-rose-600">{errorMessage}</p>
      ) : (
        <p className={`mt-1.5 text-xs ${loadError ? "text-amber-700" : "text-slate-500"}`}>
          {loadError
            ? "Address suggestions are unavailable. You can still enter the address manually."
            : "Choose a suggestion to fill city, state and ZIP automatically."}
        </p>
      )}
    </div>
  );
};

export default GoogleAddressAutocomplete;
