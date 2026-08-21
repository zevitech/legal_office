"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineLightBulb,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];
const clean = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

export default function PortalServiceFunnel({
  mode,
  clientCase,
  preview,
  previewKey,
}) {
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [llc, setLlc] = useState({
    state: "California",
    name: "",
    management: "member",
    owners: "1",
    ein: true,
    agreement: true,
    agent: false,
  });
  const [query, setQuery] = useState("");
  const [domains, setDomains] = useState([]);
  const [selected, setSelected] = useState(null);
  const [years, setYears] = useState(1);
  const [protection, setProtection] = useState(true);
  const fallbackIdeas = useMemo(() => {
    const base = clean(clientCase?.markName || clientCase?.company || "brand");
    return [
      `${base}.com`,
      `${base}hq.com`,
      `get${base}.com`,
      `${base}office.com`,
    ];
  }, [clientCase]);
  const [ideas, setIdeas] = useState(fallbackIdeas);
  const back = preview
    ? `/client-portal?preview=${encodeURIComponent(previewKey || "northstar")}`
    : "/client-portal";

  useEffect(() => {
    let active = true;
    setIdeas(fallbackIdeas);
    if (preview)
      return () => {
        active = false;
      };
    fetch("/api/portal/ai-suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: clientCase?.company,
        mark: clientCase?.markName,
        markType: clientCase?.markType,
      }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (active && data?.domainIdeas?.length) setIdeas(data.domainIdeas);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [fallbackIdeas, preview, clientCase]);

  const llcService =
    299 + (llc.ein ? 79 : 0) + (llc.agreement ? 99 : 0) + (llc.agent ? 149 : 0);

  async function search(event) {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    setSelected(null);
    const term = clean(query);
    if (!term) {
      setNotice("Enter a business or domain name.");
      setBusy(false);
      return;
    }
    if (preview) {
      setDomains(
        [".com", ".co", ".net", ".us"].map((tld, index) => ({
          domain: `${term}${tld}`,
          available: index !== 2,
          price: [18.99, 29.99, 16.99, 14.99][index],
          currency: "USD",
          preview: true,
        })),
      );
      setBusy(false);
      return;
    }
    try {
      const response = await fetch(
        `/api/portal/domains/search?q=${encodeURIComponent(term)}`,
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setDomains(data.results || []);
    } catch (error) {
      setNotice(error.message || "Domain search is temporarily unavailable.");
    } finally {
      setBusy(false);
    }
  }

  async function submitLlc() {
    setBusy(true);
    setNotice("");
    try {
      if (!preview) {
        const response = await fetch("/api/portal/service-requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "llc",
            caseId: clientCase?.id,
            details: llc,
            serviceTotal: llcService,
          }),
        });
        const payload = await response.json();
        if (!response.ok)
          throw new Error(payload.error || "Unable to save LLC request");
      }
      setStep(4);
    } catch (error) {
      setNotice(error.message || "Unable to save LLC request.");
    } finally {
      setBusy(false);
    }
  }

  async function submitDomain() {
    if (!selected) return;
    setBusy(true);
    setNotice("");
    try {
      const total = Number(selected.price || 0) * years + (protection ? 49 : 0);
      if (!preview) {
        const response = await fetch("/api/portal/service-requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "domain",
            caseId: clientCase?.id,
            details: {
              domain: selected.domain,
              years,
              protection,
              quotedPrice: selected.price,
            },
            serviceTotal: total,
          }),
        });
        const payload = await response.json();
        if (!response.ok)
          throw new Error(payload.error || "Unable to submit domain request");
      }
      setNotice(
        "Domain registration request sent. A specialist will confirm availability, ownership details, and final registrar pricing before purchase.",
      );
    } catch (error) {
      setNotice(error.message || "Unable to submit domain request.");
    } finally {
      setBusy(false);
    }
  }

  if (mode === "llc")
    return (
      <Shell title="Form a new LLC" back={back}>
        <Progress
          step={step}
          labels={["Company", "Owners", "Review", "Complete"]}
        />
        {step === 1 && (
          <Card>
            <h2 className="text-2xl font-extrabold">Company basics</h2>
            <Field label="Formation state">
              <select
                value={llc.state}
                onChange={(event) =>
                  setLlc({ ...llc, state: event.target.value })
                }
                className="input"
              >
                {states.map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
            </Field>
            <Field label="Preferred LLC name">
              <input
                value={llc.name}
                onChange={(event) =>
                  setLlc({ ...llc, name: event.target.value })
                }
                className="input"
                placeholder={`${clientCase?.markName || "Your Brand"} LLC`}
              />
            </Field>
            <IdeaBox>
              Consider “{clientCase?.markName || "Your Brand"} LLC” or “
              {clientCase?.markName || "Your Brand"} Holdings LLC.” Availability
              and trademark clearance require separate checks.
            </IdeaBox>
            <Next
              onClick={() =>
                llc.name.trim()
                  ? setStep(2)
                  : setNotice("Enter a preferred LLC name.")
              }
            />
          </Card>
        )}
        {step === 2 && (
          <Card>
            <h2 className="text-2xl font-extrabold">Ownership and support</h2>
            <Field label="Management">
              <select
                value={llc.management}
                onChange={(event) =>
                  setLlc({ ...llc, management: event.target.value })
                }
                className="input"
              >
                <option value="member">Member-managed</option>
                <option value="manager">Manager-managed</option>
              </select>
            </Field>
            <Field label="Number of owners">
              <input
                type="number"
                min="1"
                max="20"
                value={llc.owners}
                onChange={(event) =>
                  setLlc({ ...llc, owners: event.target.value })
                }
                className="input"
              />
            </Field>
            {[
              ["ein", "EIN application support", 79],
              ["agreement", "Operating agreement preparation support", 99],
              ["agent", "Registered agent service — first year", 149],
            ].map(([key, label, price]) => (
              <label
                key={key}
                className="mt-3 flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4"
              >
                <span>
                  <b className="block">{label}</b>
                  <small className="text-slate-500">${price}</small>
                </span>
                <input
                  type="checkbox"
                  checked={llc[key]}
                  onChange={(event) =>
                    setLlc({ ...llc, [key]: event.target.checked })
                  }
                />
              </label>
            ))}
            <Next onClick={() => setStep(3)} />
          </Card>
        )}
        {step === 3 && (
          <Card>
            <h2 className="text-2xl font-extrabold">Review request</h2>
            <Summary
              rows={[
                ["Formation service", 299],
                ["EIN support", llc.ein ? 79 : 0],
                ["Operating agreement", llc.agreement ? 99 : 0],
                ["Registered agent", llc.agent ? 149 : 0],
              ]}
            />
            <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              <b>State filing fee is separate.</b> The exact government fee,
              recurring obligations, and processing time will be confirmed for{" "}
              {llc.state} before payment or submission.
            </div>
            <Next
              label={busy ? "Submitting…" : "Submit for specialist review"}
              disabled={busy}
              onClick={submitLlc}
            />
          </Card>
        )}
        {step === 4 && (
          <Success
            title="LLC request received"
            text="A formation specialist will review the details and confirm state fees, scope, and payment before any filing is submitted."
          />
        )}
        {notice && (
          <Notice tone={step === 4 ? "success" : "error"}>{notice}</Notice>
        )}
      </Shell>
    );

  return (
    <Shell title="Find and register a domain" back={back}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <Card>
            <h2 className="text-2xl font-extrabold">
              Search live domain availability
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Availability and registration prices are verified with the
              configured registrar.
            </p>
            <form onSubmit={search} className="mt-5 flex gap-2">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="input mt-0 min-w-0"
                aria-label="Domain search"
                placeholder="yourbusiness"
              />
              <button
                disabled={busy}
                aria-label="Search domains"
                className="rounded-xl bg-[#006fbd] px-5 font-extrabold text-white disabled:opacity-60"
              >
                <HiOutlineMagnifyingGlass />
              </button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {ideas.map((idea) => (
                <button
                  key={idea}
                  onClick={() => setQuery(idea.split(".")[0])}
                  className="rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-[#027dd6]"
                >
                  {idea}
                </button>
              ))}
            </div>
            {domains.length > 0 && (
              <div className="mt-6 space-y-3">
                {domains.map((item) => (
                  <div
                    key={item.domain}
                    className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center"
                  >
                    <div>
                      <b className="break-all">{item.domain}</b>
                      <p
                        className={`text-xs font-bold ${item.available ? "text-emerald-700" : "text-slate-400"}`}
                      >
                        {item.available ? "Available" : "Unavailable"}
                        {item.preview ? " · Preview result" : ""}
                      </p>
                    </div>
                    {item.available && (
                      <button
                        onClick={() => setSelected(item)}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white"
                      >
                        Select · ${Number(item.price).toFixed(2)}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
          {notice && (
            <Notice
              tone={
                notice.startsWith("Domain registration request sent")
                  ? "success"
                  : "error"
              }
            >
              {notice}
            </Notice>
          )}
        </div>
        <Card>
          <h2 className="text-xl font-extrabold">Domain request</h2>
          {selected ? (
            <>
              <p className="mt-4 break-all rounded-xl bg-blue-50 p-4 font-extrabold">
                {selected.domain}
              </p>
              <Field label="Registration term">
                <select
                  value={years}
                  onChange={(event) => setYears(Number(event.target.value))}
                  className="input"
                >
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                </select>
              </Field>
              <label className="mt-4 flex gap-3 rounded-xl border border-slate-200 p-4">
                <input
                  type="checkbox"
                  checked={protection}
                  onChange={(event) => setProtection(event.target.checked)}
                />
                <span>
                  <b className="block">Domain protection</b>
                  <small className="text-slate-500">
                    Renewal monitoring, lock and account-security review
                  </small>
                </span>
              </label>
              <Summary
                rows={[
                  [
                    `${years}-year registration`,
                    Number(selected.price) * years,
                  ],
                  ["Protection setup", protection ? 49 : 0],
                ]}
              />
              <Link
                href={`/trademark-register?source=domain&suggestedMark=${encodeURIComponent(selected.domain.split(".")[0])}`}
                className="mt-4 block rounded-xl border border-blue-300 bg-blue-50 p-3 text-center text-sm font-extrabold text-[#027dd6]"
              >
                Trademark this domain name
              </Link>
              <button
                onClick={submitDomain}
                disabled={busy}
                className="mt-3 w-full rounded-xl bg-[#006fbd] px-5 py-3.5 text-sm font-extrabold text-white disabled:cursor-wait disabled:opacity-60"
              >
                {busy ? "Submitting…" : "Request secure registration"}
              </button>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                No domain is purchased until a specialist reconfirms
                availability, final registrar pricing, and the owner-controlled
                account details.
              </p>
            </>
          ) : (
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Select an available domain to review registration and protection
              options.
            </p>
          )}
        </Card>
      </div>
    </Shell>
  );
}

function Shell({ title, back, children }) {
  return (
    <main className="min-h-screen bg-[#f4f7fa] px-4 py-8 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <Link
          href={back}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#027dd6]"
        >
          <HiOutlineArrowLeft /> Back to client portal
        </Link>
        <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">{title}</h1>
        <div className="mt-7">{children}</div>
      </div>
    </main>
  );
}
function Card({ children }) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      {children}
    </section>
  );
}
function Field({ label, children }) {
  return (
    <label className="mt-5 block">
      <span className="text-sm font-bold">{label}</span>
      {children}
    </label>
  );
}
function Next({ onClick, label = "Save and continue", disabled = false }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="mt-6 w-full rounded-xl bg-[#006fbd] px-5 py-3.5 text-sm font-extrabold text-white disabled:opacity-60"
    >
      {label}
    </button>
  );
}
function Progress({ step, labels }) {
  return (
    <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {labels.map((label, index) => (
        <div
          key={label}
          className={`rounded-lg px-3 py-2 text-center text-xs font-bold ${step >= index + 1 ? "bg-blue-100 text-[#027dd6]" : "bg-white text-slate-400"}`}
        >
          {index + 1}. {label}
        </div>
      ))}
    </div>
  );
}
function IdeaBox({ children }) {
  return (
    <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-slate-800">
      <span className="flex items-center gap-2 font-extrabold text-[#027dd6]">
        <HiOutlineLightBulb /> Business name idea
      </span>
      <p className="mt-2">{children}</p>
    </div>
  );
}
function Summary({ rows }) {
  return (
    <div className="mt-5 space-y-2">
      {rows
        .filter(([, price]) => price > 0)
        .map(([label, price]) => (
          <div
            key={label}
            className="flex justify-between gap-4 border-b border-slate-100 py-2 text-sm"
          >
            <span>{label}</span>
            <b>${Number(price).toFixed(2)}</b>
          </div>
        ))}
      <div className="flex justify-between gap-4 pt-2 text-lg">
        <b>Service subtotal</b>
        <b>
          ${rows.reduce((sum, [, price]) => sum + Number(price), 0).toFixed(2)}
        </b>
      </div>
    </div>
  );
}
function Notice({ children, tone = "error" }) {
  return (
    <p
      role="status"
      className={`mt-4 rounded-xl p-4 text-sm font-bold ${tone === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}
    >
      {children}
    </p>
  );
}
function Success({ title, text }) {
  return (
    <Card>
      <HiOutlineCheckCircle className="text-5xl text-emerald-600" />
      <h2 className="mt-4 text-2xl font-extrabold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </Card>
  );
}
