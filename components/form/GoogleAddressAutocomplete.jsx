"use client";

import { useEffect, useRef, useState } from "react";
import { RiHome5Fill } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";

const SCRIPT_ID = "google-places-script";

const GoogleAddressAutocomplete = ({
  value,
  onChange,
  onAddressSelect,
  errorMessage,
  inputRef,
}) => {
  const localRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const setRefs = (node) => {
    localRef.current = node;
    if (typeof inputRef === "function") inputRef(node);
    else if (inputRef) inputRef.current = node;
  };

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setLoadError(true);
      return;
    }

    const initialize = () => {
      if (!window.google?.maps?.places || !localRef.current || autocompleteRef.current) return;

      const autocomplete = new window.google.maps.places.Autocomplete(
        localRef.current,
        {
          types: ["address"],
          componentRestrictions: { country: "us" },
          fields: ["address_components", "formatted_address"],
        },
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const parts = Object.fromEntries(
          (place.address_components || []).flatMap((part) =>
            part.types.map((type) => [type, part]),
          ),
        );
        const streetNumber = parts.street_number?.long_name || "";
        const route = parts.route?.long_name || "";
        const street = `${streetNumber} ${route}`.trim();

        onAddressSelect?.({
          address: street || place.formatted_address || localRef.current.value,
          city:
            parts.locality?.long_name ||
            parts.sublocality_level_1?.long_name ||
            parts.postal_town?.long_name ||
            "",
          state: parts.administrative_area_level_1?.short_name || "",
          zipCode: parts.postal_code?.long_name || "",
        });
      });

      autocompleteRef.current = autocomplete;
      setIsReady(true);
    };

    if (window.google?.maps?.places) {
      initialize();
      return;
    }

    let script = document.getElementById(SCRIPT_ID);
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
      script.async = true;
      script.defer = true;
      script.onerror = () => setLoadError(true);
      document.head.appendChild(script);
    }
    script.addEventListener("load", initialize);
    return () => script?.removeEventListener("load", initialize);
  }, [onAddressSelect]);

  return (
    <div className="w-full">
      <label htmlFor="street-address" className="mb-2 block text-sm font-semibold text-slate-800">
        Street address
      </label>
      <div className={`flex min-h-14 items-center gap-3 rounded-xl border bg-white px-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 ${errorMessage ? "border-rose-500" : "border-slate-300"}`}>
        <RiHome5Fill className="shrink-0 text-xl text-slate-400" />
        <input
          ref={setRefs}
          id="street-address"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Start typing your address"
          autoComplete="street-address"
          className="min-w-0 flex-1 bg-transparent py-4 text-base text-slate-900 outline-none placeholder:text-slate-400"
        />
        {isReady && (
          <span className="hidden items-center gap-1 whitespace-nowrap text-[11px] text-slate-400 sm:flex">
            <HiOutlineLocationMarker /> Google suggestions
          </span>
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
