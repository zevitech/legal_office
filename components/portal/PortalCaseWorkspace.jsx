"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCheckCircle,
  HiOutlineClipboardDocumentCheck,
  HiOutlineDocumentArrowUp,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineScale,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineXMark,
} from "react-icons/hi2";
import { getPortalDemoActivity } from "@/lib/portalDemoActivity";
import AdminSecureMessages from "@/components/portal/AdminSecureMessages";
import CaseManagementPanel from "@/components/portal/CaseManagementPanel";
import { useRouter } from "next/navigation";

const actions = [
  { id: "status", label: "Status", icon: HiOutlineClipboardDocumentCheck },
  { id: "requirement", label: "Requirement", icon: HiOutlineScale },
  { id: "document", label: "Document", icon: HiOutlineDocumentArrowUp },
  {
    id: "message",
    label: "Portal message",
    icon: HiOutlineChatBubbleLeftRight,
  },
  { id: "promotion", label: "Client recommendation", icon: HiOutlineSparkles },
  { id: "email", label: "Personal email", icon: HiOutlineEnvelope },
  {
    id: "appointment",
    label: "Schedule mandatory trademark call",
    icon: HiOutlineCalendarDays,
  },
  {
    id: "clearance_report",
    label: "Clearance report",
    icon: HiOutlineDocumentArrowUp,
  },
  { id: "filing", label: "Record filing", icon: HiOutlineShieldCheck },
  {
    id: "registration_certificate",
    label: "Registration certificate",
    icon: HiOutlineShieldCheck,
  },
  { id: "payment", label: "Payment", icon: HiOutlineBanknotes },
];

const requirementLabels = {
  declaration: "Declaration filing",
  attestation: "Attestation",
  publication: "Publication requirement",
  section_8: "Section 8 declaration",
  section_9: "Section 9 renewal",
  section_15: "Section 15 incontestability",
  office_action: "Office action response",
  specimen: "Specimen or proof of use",
};

const quickTemplates = {
  requirement: [
    {
      name: "Specimen request",
      requirementType: "specimen",
      message:
        "Please upload a clear example showing how customers currently see your trademark in connection with your goods or services.",
    },
    {
      name: "Office action issued",
      requirementType: "office_action",
      title: "USPTO office action requires review",
      message:
        "The USPTO issued an office action for your application. Your attorney is reviewing the issues and will explain the response options, deadline, scope, and any legal fee before work begins.",
    },
    {
      name: "Declaration",
      requirementType: "declaration",
      message:
        "Please review and complete the requested declaration. Confirm that the information is accurate before signing and returning it.",
    },
    {
      name: "Attestation",
      requirementType: "attestation",
      message:
        "Please complete the attestation and provide any supporting information requested by your attorney.",
    },
    {
      name: "Publication",
      requirementType: "publication",
      message:
        "Your application has reached a publication-related step. Please review this request and respond by the stated deadline.",
    },
    {
      name: "Section 8",
      requirementType: "section_8",
      message:
        "Please provide the information and current proof of use needed for your Section 8 declaration review.",
    },
  ],
  document: [
    {
      name: "Proof of use",
      title: "Upload proof of trademark use",
      message:
        "Please upload a dated website screenshot, product image, packaging, label, invoice, or other evidence showing the mark used in commerce.",
    },
    {
      name: "Signed document",
      title: "Upload signed document",
      message:
        "Please download, sign, and upload the requested document through your secure portal.",
    },
  ],
  message: [
    {
      name: "Case update",
      title: "Update from your attorney",
      message:
        "Your trademark matter is progressing. Please review the latest status in your portal and reply if you have any questions.",
    },
    {
      name: "Response needed",
      title: "Your response is needed",
      message:
        "We need your response before we can continue with the next step. Please review the request in your portal.",
    },
  ],
  promotion: [
    {
      name: "Specimen website support",
      title: "Need help preparing a strong specimen?",
      message:
        "If you do not yet have an acceptable specimen, our web and design team can help prepare a professional website, product page, packaging presentation, or other business material for attorney review. Ask us for a consultation before ordering.",
    },
    {
      name: "Brand identity review",
      title: "Strengthen your brand identity",
      message:
        "Our brand team can review your logo, visual consistency, website presentation, and customer-facing materials, then recommend practical improvements for a clearer and more professional market presence.",
    },
    {
      name: "Business growth planning",
      title: "Plan your next stage of business growth",
      message:
        "Schedule a consultation with our business growth team to review your website, marketing, local listings, social media, lead generation, and sales systems. Recommendations are tailored to your goals and budget; results are not guaranteed.",
    },
  ],
  email: [
    {
      name: "Attorney follow-up",
      title: "Follow-up regarding your trademark",
      message:
        "I am following up regarding your trademark matter. Please review the latest portal update and contact me with any questions.",
    },
  ],
  appointment: [
    {
      name: "Mandatory trademark call",
      title: "Mandatory trademark consultation",
      message:
        "I scheduled the required trademark application review call. During this consultation, we will review the application, discuss the attorney-prepared search and clearance report, confirm the recommended classes, and address the USPTO filing fees.",
    },
    {
      name: "Requirement review",
      title: "Requirement review call",
      message:
        "I scheduled a call to review the outstanding requirement and answer your questions.",
    },
  ],
  payment: [
    {
      name: "USPTO fee",
      title: "USPTO filing fee",
      message:
        "Please review and submit the requested government filing fee through your secure portal.",
    },
  ],
};

function CallConsentPanel({ client, preview }) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setResult("");
    const formElement = event.currentTarget;
    try {
      if (preview) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        setResult(
          "Demo verified: the signed/recorded consent, attorney attestation, exact scope, cap, timestamp, and client confirmation will be saved in production.",
        );
        return;
      }
      const form = new FormData(event.currentTarget);
      form.set("caseId", client.caseId);
      form.set(
        "lawfulRecordingAttestation",
        form.get("lawfulRecordingAttestation") ? "true" : "false",
      );
      form.set(
        "cardDataExcludedAttestation",
        form.get("cardDataExcludedAttestation") ? "true" : "false",
      );
      const response = await fetch(
        `/api/portal/admin/clients/${client.uid}/billing-consent`,
        { method: "POST", body: form },
      );
      const payload = await response.json();
      if (!response.ok)
        throw new Error(payload.error || "Unable to save consent evidence.");
      setResult(
        "Standing authorization evidence saved. The client was emailed a confirmation and may revoke future authorization.",
      );
      formElement.reset();
    } catch (error) {
      setResult(error.message || "Unable to save consent evidence.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
      <p className="text-xs font-extrabold uppercase tracking-wider text-indigo-700">
        Phone or written payment consent
      </p>
      <h3 className="mt-1 text-lg font-extrabold">
        Record a client standing authorization
      </h3>
      <p className="mt-2 text-xs leading-5 text-slate-700">
        Use only after the client has a saved NMI method. Tell the client the
        call is being recorded and obtain every consent required by the
        applicable jurisdictions before recording. Never ask the client to speak
        or record a full card number, security code, PIN, or bank credentials.
        Upload the unedited recording or signed consent.
      </p>
      <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-bold text-slate-700">
          Consent date
          <input
            name="consentDate"
            type="datetime-local"
            required
            className="mt-2 w-full rounded-xl border border-indigo-200 bg-white px-3 py-3"
          />
        </label>
        <label className="text-xs font-bold text-slate-700">
          Client-authorized ceiling per future charge (USD)
          <input
            name="maximum"
            type="number"
            min="1"
            max="25000"
            step="0.01"
            placeholder="Enter the exact limit approved by the client"
            required
            className="mt-2 w-full rounded-xl border border-indigo-200 bg-white px-3 py-3"
          />
          <span className="mt-2 block font-medium leading-5 text-slate-500">
            This is only a safety limit. It is not a fee and does not authorize
            a charge by itself.
          </span>
        </label>
        <div className="sm:col-span-2">
          <p className="text-xs font-bold text-slate-700">
            Authorized fee categories
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {[
              ["classification_fees", "Classes and classification fees"],
              ["office_action", "Office-action work"],
              ["amendment", "Amendments"],
              ["declaration", "Declarations and attestations"],
              ["publication", "Publication requirements"],
              ["filing_requirement", "Other disclosed filing requirements"],
            ].map(([value, label]) => (
              <label
                key={value}
                className="flex items-center gap-2 rounded-lg bg-white p-3 text-xs font-semibold"
              >
                <input type="checkbox" name="categories" value={value} />
                {label}
              </label>
            ))}
          </div>
        </div>
        <label className="sm:col-span-2 text-xs font-bold text-slate-700">
          Call recording or signed consent
          <input
            name="evidenceFile"
            type="file"
            accept="application/pdf,audio/mpeg,audio/mp4,audio/x-m4a,audio/wav,.pdf,.mp3,.m4a,.wav"
            required
            className="mt-2 block w-full rounded-xl border border-dashed border-indigo-300 bg-white p-4 text-xs"
          />
        </label>
        <label className="sm:col-span-2 text-xs font-bold text-slate-700">
          Attorney notes
          <textarea
            name="notes"
            className="mt-2 min-h-24 w-full rounded-xl border border-indigo-200 bg-white p-3"
            placeholder="Client identity verification, disclosure read on call, scope discussed, and revocation instructions…"
          />
        </label>
        <label className="sm:col-span-2 flex items-start gap-3 rounded-xl border border-red-200 bg-white p-4 text-xs leading-5 text-slate-700">
          <input
            name="lawfulRecordingAttestation"
            type="checkbox"
            required
            className="mt-1"
          />
          <span>
            I attest that the client was informed of the recording before it
            began and that all legally required recording consents were
            obtained. I also confirmed the covered fee categories, maximum per
            charge, XTARLABS LLC descriptor, advance notice, and revocation
            right.
          </span>
        </label>
        <label className="sm:col-span-2 flex items-start gap-3 rounded-xl border border-red-200 bg-white p-4 text-xs leading-5 text-slate-700">
          <input
            name="cardDataExcludedAttestation"
            type="checkbox"
            required
            className="mt-1"
          />
          <span>
            I attest that the uploaded evidence contains no full payment-card
            number, CVV/security code, PIN, online banking credentials, or other
            prohibited authentication data.
          </span>
        </label>
        {result && (
          <p className="sm:col-span-2 rounded-xl bg-white p-3 text-xs font-bold text-indigo-800">
            {result}
          </p>
        )}
        <button
          disabled={busy}
          className="sm:col-span-2 rounded-xl bg-indigo-700 px-4 py-3 text-xs font-extrabold text-white disabled:opacity-50"
        >
          {busy
            ? "Saving consent evidence…"
            : "Save consent evidence and notify client"}
        </button>
      </form>
    </section>
  );
}

function AttorneyAssignmentPanel({ client, preview }) {
  const [attorneys, setAttorneys] = useState([]);
  const [selected, setSelected] = useState(client.assignedAttorney?.uid || "");
  const [assigned, setAssigned] = useState(client.assignedAttorney || null);
  const [editing, setEditing] = useState(!client.assignedAttorney);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    let active = true;
    if (preview) {
      setAttorneys([
        {
          id: "attorney-danish",
          name: "Danish Khan",
          email: "danish@legaltrademarkoffice.com",
          title: "Trademark attorney",
        },
        {
          id: "attorney-maya",
          name: "Maya Patel",
          email: "maya@legaltrademarkoffice.com",
          title: "Senior trademark attorney",
        },
      ]);
      return () => {
        active = false;
      };
    }
    fetch("/api/portal/admin/attorneys", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : { attorneys: [] }))
      .then((data) => {
        if (active) setAttorneys(data.attorneys || []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [preview]);

  async function assign() {
    if (!selected) {
      setResult("Select an attorney first.");
      return;
    }
    setBusy(true);
    setResult("");
    try {
      const attorney = attorneys.find(
        (item) => (item.id || item.uid) === selected,
      );
      if (preview) {
        await new Promise((resolve) => setTimeout(resolve, 350));
        setAssigned({ uid: selected, ...attorney });
      } else {
        const response = await fetch(
          `/api/portal/admin/clients/${client.uid}/cases/${client.caseId}/attorney`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ attorneyUid: selected }),
          },
        );
        const payload = await response.json();
        if (!response.ok)
          throw new Error(payload.error || "Unable to assign attorney.");
        setAssigned(payload.assignedAttorney);
      }
      setEditing(false);
    } catch (error) {
      setResult(error.message || "Unable to assign attorney.");
    } finally {
      setBusy(false);
    }
  }

  if (assigned && !editing) {
    const initials = String(assigned.name || "Legal team")
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return (
      <section className="flex flex-col justify-between gap-4 rounded-2xl border border-cyan-200 bg-cyan-50 p-4 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cyan-700 text-xs font-extrabold text-white">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-800">
              Assigned attorney
            </p>
            <p className="truncate text-sm font-extrabold text-slate-950">
              {assigned.name}
            </p>
            <p className="truncate text-xs text-slate-600">
              {assigned.title || "Trademark attorney"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditing(true);
            setResult("");
          }}
          className="shrink-0 rounded-xl border border-cyan-300 bg-white px-4 py-2.5 text-xs font-extrabold text-cyan-800"
        >
          Change attorney
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-cyan-800">
            Case ownership
          </p>
          <h3 className="mt-1 text-lg font-extrabold">
            {assigned ? "Change assigned attorney" : "Assign an attorney"}
          </h3>
        </div>
        {assigned && (
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setSelected(assigned.uid || "");
              setResult("");
            }}
            className="rounded-lg bg-white px-3 py-2 text-xs font-extrabold text-slate-600"
          >
            Cancel
          </button>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <select
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-cyan-200 bg-white px-4 py-3 text-sm"
        >
          <option value="">Select an active attorney</option>
          {attorneys.map((attorney) => (
            <option
              key={attorney.id || attorney.uid}
              value={attorney.id || attorney.uid}
            >
              {attorney.name} — {attorney.title || "Trademark attorney"}
            </option>
          ))}
        </select>
        <button
          type="button"
          disabled={busy || !selected}
          onClick={assign}
          className="rounded-xl bg-cyan-700 px-5 py-3 text-sm font-extrabold text-white disabled:opacity-50"
        >
          {busy ? "Saving…" : assigned ? "Save change" : "Assign to this case"}
        </button>
      </div>
      {result && (
        <p className="mt-3 rounded-lg bg-white p-3 text-xs font-bold text-red-700">
          {result}
        </p>
      )}
    </section>
  );
}

function ClassificationFeeEditor({ rows, setRows, reportReady }) {
  const total = rows.reduce((sum, row) => sum + (Number(row.amount) || 0), 0);
  function update(index, value) {
    setRows((current) =>
      current.map((row, rowIndex) =>
        rowIndex === index ? { ...row, amount: value } : row,
      ),
    );
  }
  if (!reportReady)
    return (
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
        <p className="text-sm font-extrabold text-amber-900">
          Search and clearance report required first
        </p>
        <p className="mt-1 text-xs leading-5 text-amber-800">
          Upload the attorney-prepared report and proposed classes before
          requesting classification payment.
        </p>
      </div>
    );
  return (
    <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-extrabold text-slate-950">
            Report classes and individual fees
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            The class list is locked to the attorney&apos;s clearance report.
            Enter only the fee for each exact class.
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-[#027dd6]">
          {rows.length} class{rows.length === 1 ? "" : "es"} · $
          {total.toFixed(2)}
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {rows.map((row, index) => (
          <div
            key={row.description || index}
            className="grid gap-3 rounded-xl border border-blue-100 bg-white p-3 sm:grid-cols-[1fr_150px]"
          >
            <div>
              <p className="text-xs font-bold text-slate-700">
                Class from clearance report
              </p>
              <p className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-800">
                {row.description}
              </p>
            </div>
            <label className="text-xs font-bold text-slate-700">
              Fee (USD)
              <input
                value={row.amount}
                onChange={(event) => update(index, event.target.value)}
                type="number"
                min="1"
                max="25000"
                step="0.01"
                required
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
                placeholder="350"
              />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickPaymentPanel({
  client,
  preview,
  onSaved,
  reportReady,
  proposedClasses = [],
}) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");
  const [kind, setKind] = useState(
    reportReady ? "classification_fees" : "office_action",
  );
  const [classFees, setClassFees] = useState(
    proposedClasses.length
      ? proposedClasses.map((description) => ({ description, amount: "" }))
      : [{ description: "", amount: "" }],
  );
  useEffect(() => {
    if (proposedClasses.length)
      setClassFees((current) => {
        const amounts = new Map(
          current.map((row) => [row.description, row.amount]),
        );
        return proposedClasses.map((description) => ({
          description,
          amount: amounts.get(description) || "",
        }));
      });
  }, [proposedClasses]);
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setResult("");
    const form = new FormData(event.currentTarget);
    const mode = event.nativeEvent.submitter?.value || "request";
    const payload = {
      caseId: client.caseId,
      type: "payment",
      title: String(form.get("title") || ""),
      message: String(
        form.get("message") ||
          "Please review this disclosed case fee in your secure portal.",
      ),
      amount: Number(form.get("amount") || 0),
      paymentKind: kind,
      dueAt: String(form.get("dueAt") || ""),
    };
    try {
      if (kind === "classification_fees") {
        if (!reportReady)
          throw new Error(
            "Upload the search and clearance report before requesting class fees",
          );
        const fees = classFees.map((row) => ({
          description: String(row.description || "").trim(),
          amount: Number(row.amount || 0),
        }));
        if (
          fees.length !== proposedClasses.length ||
          fees.some(
            (row, index) =>
              row.description !== proposedClasses[index] || !(row.amount > 0),
          )
        )
          throw new Error(
            "Enter a valid fee for every exact class in the clearance report",
          );
        payload.classificationFees = fees;
        payload.selectedClasses = [...proposedClasses];
        payload.classCount = proposedClasses.length;
        payload.amount = fees.reduce((sum, row) => sum + row.amount, 0);
      }
      if (preview) {
        const saved = {
          ...payload,
          id: crypto.randomUUID(),
          invoiceId: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          read: false,
          taskStatus: mode === "charge" ? "completed" : "open",
          paymentStatus: mode === "charge" ? "paid" : "due",
        };
        onSaved(saved);
        setResult(
          mode === "charge"
            ? "Demo charge completed. Production first verifies saved-method consent and then emails the receipt."
            : "Payment request added to the client portal and email queue.",
        );
        event.currentTarget.reset();
        return;
      }
      const response = await fetch(
        `/api/portal/admin/clients/${client.uid}/actions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const created = await response.json();
      if (!response.ok)
        throw new Error(created.error || "Unable to create the invoice.");
      const saved = {
        ...payload,
        id: created.activityId,
        invoiceId: created.invoiceId,
        createdAt: new Date().toISOString(),
        read: false,
        taskStatus: "open",
        paymentStatus: "due",
      };
      onSaved(saved);
      if (mode === "charge") {
        const charge = await fetch(
          `/api/portal/admin/clients/${client.uid}/invoices/${created.invoiceId}/charge-saved`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ confirmCharge: true }),
          },
        );
        const charged = await charge.json();
        if (!charge.ok)
          throw new Error(
            `Invoice created, but auto-charge was not completed: ${charged.error || "client approval is required"}`,
          );
        onSaved(
          {
            ...saved,
            taskStatus: "completed",
            paymentStatus: "paid",
            transactionId: charged.transactionId,
          },
          true,
        );
        setResult(
          "Authorized charge completed. The invoice, receipt, email and audit evidence were recorded.",
        );
      } else
        setResult(
          "Payment request added to the client portal and emailed to the client.",
        );
      event.currentTarget.reset();
    } catch (error) {
      setResult(error.message || "Unable to process this payment action.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="rounded-2xl border border-blue-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-wider text-[#027dd6]">
        Quick payment action
      </p>
      <h3 className="mt-1 text-lg font-extrabold">
        Request payment or use an authorized saved method
      </h3>
      <p className="mt-2 text-xs leading-5 text-slate-600">
        An invoice is always created first. Auto-charge works only when the
        client’s saved-method consent covers the exact category and amount.
      </p>
      <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-bold text-slate-700 sm:col-span-2">
          Service or fee description
          <input
            name="title"
            required
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
            placeholder="Approved classification fees"
          />
        </label>
        <label className="text-xs font-bold text-slate-700 sm:col-span-2">
          Fee category
          <select
            name="paymentKind"
            value={kind}
            onChange={(event) => setKind(event.target.value)}
            required
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            <option value="classification_fees" disabled={!reportReady}>
              Classes and classification fees
              {!reportReady ? " — clearance report required" : ""}
            </option>
            <option value="office_action">Office-action attorney work</option>
            <option value="amendment">Trademark amendment</option>
            <option value="declaration">Declaration or attestation</option>
            <option value="publication">Publication requirement</option>
            <option value="filing_requirement">
              Other disclosed case service
            </option>
          </select>
        </label>
        {kind === "classification_fees" ? (
          <div className="sm:col-span-2">
            <ClassificationFeeEditor
              rows={classFees}
              setRows={setClassFees}
              reportReady={reportReady}
            />
          </div>
        ) : (
          <label className="text-xs font-bold text-slate-700 sm:col-span-2">
            Exact amount (USD)
            <input
              name="amount"
              type="number"
              min="1"
              max="100000"
              step="0.01"
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
              placeholder="425.00"
            />
          </label>
        )}
        <label className="text-xs font-bold text-slate-700">
          Due date
          <input
            name="dueAt"
            type="date"
            required
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </label>
        <label className="text-xs font-bold text-slate-700 sm:col-span-2">
          Client-facing explanation
          <textarea
            name="message"
            required
            className="mt-2 min-h-24 w-full rounded-xl border border-slate-300 p-4"
            placeholder="Explain the work, scope and why this fee is being requested."
          />
        </label>
        {result && (
          <p className="rounded-xl bg-blue-50 p-3 text-xs font-bold leading-5 text-[#027dd6] sm:col-span-2">
            {result}
          </p>
        )}
        <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2">
          <button
            name="mode"
            value="request"
            disabled={busy}
            className="rounded-xl border border-blue-300 bg-blue-50 px-4 py-3 text-sm font-extrabold text-[#027dd6] disabled:opacity-50"
          >
            {busy ? "Processing…" : "Send payment request"}
          </button>
          <button
            name="mode"
            value="charge"
            disabled={busy}
            className="rounded-xl bg-amber-600 px-4 py-3 text-sm font-extrabold text-white disabled:opacity-50"
          >
            {busy ? "Processing…" : "Charge authorized saved method"}
          </button>
        </div>
      </form>
    </section>
  );
}

function ExternalPaymentPanel({
  client,
  preview,
  onSaved,
  reportReady,
  proposedClasses = [],
}) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");
  const [kind, setKind] = useState(
    reportReady ? "classification_fees" : "office_action",
  );
  const [classFees, setClassFees] = useState(
    proposedClasses.map((description) => ({ description, amount: "" })),
  );
  useEffect(() => {
    setClassFees((current) => {
      const amounts = new Map(
        current.map((row) => [row.description, row.amount]),
      );
      return proposedClasses.map((description) => ({
        description,
        amount: amounts.get(description) || "",
      }));
    });
  }, [proposedClasses]);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setResult("");
    const form = new FormData(event.currentTarget);
    const payload = {
      caseId: client.caseId,
      type: "payment",
      recordAsPaid: true,
      title: String(form.get("title") || ""),
      message: String(
        form.get("message") ||
          "Payment received and confirmed by your attorney.",
      ),
      amount: Number(form.get("amount") || 0),
      paymentKind: kind,
      paymentMethod: String(
        form.get("paymentMethod") || "verified_external_payment",
      ),
      externalReference: String(form.get("externalReference") || ""),
      receivedAt: String(form.get("receivedAt") || ""),
    };
    try {
      if (kind === "classification_fees") {
        if (!reportReady)
          throw new Error(
            "Upload the search and clearance report before recording classification fees.",
          );
        const fees = classFees.map((row) => ({
          description: String(row.description || "").trim(),
          amount: Number(row.amount || 0),
        }));
        if (
          fees.length !== proposedClasses.length ||
          fees.some(
            (row, index) =>
              row.description !== proposedClasses[index] || !(row.amount > 0),
          )
        )
          throw new Error(
            "Record one valid paid amount for every exact class in the clearance report.",
          );
        payload.classificationFees = fees;
        payload.selectedClasses = [...proposedClasses];
        payload.classCount = proposedClasses.length;
        payload.amount = fees.reduce((sum, row) => sum + row.amount, 0);
      }
      if (!(payload.amount > 0))
        throw new Error("Enter the exact amount received.");
      if (!payload.externalReference.trim())
        throw new Error(
          "Enter a receipt, processor, bank, or call-payment reference for the records.",
        );
      if (!payload.receivedAt)
        throw new Error("Enter the date the payment was received.");
      if (preview) {
        const saved = {
          ...payload,
          id: crypto.randomUUID(),
          invoiceId: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          read: false,
          taskStatus: "completed",
          paymentStatus: "paid",
          paidBy: "attorney_confirmed",
        };
        onSaved(saved);
        setResult(
          "Payment received was recorded. The client receipt is available and the filing step is unlocked when these are the required class fees.",
        );
        event.currentTarget.reset();
        return;
      }
      const response = await fetch(
        `/api/portal/admin/clients/${client.uid}/actions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const created = await response.json();
      if (!response.ok)
        throw new Error(created.error || "Unable to record this payment.");
      onSaved({
        ...payload,
        id: created.activityId,
        invoiceId: created.invoiceId,
        createdAt: new Date().toISOString(),
        read: false,
        taskStatus: "completed",
        paymentStatus: "paid",
        paidBy: "attorney_confirmed",
      });
      setResult(
        "Payment received was recorded. The client was emailed a receipt and the roadmap was updated.",
      );
      event.currentTarget.reset();
    } catch (error) {
      setResult(error.message || "Unable to record this payment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50 p-5 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
        Payment received elsewhere
      </p>
      <h3 className="mt-1 text-lg font-extrabold text-slate-950">
        Record an on-call or external payment
      </h3>
      <p className="mt-2 text-xs leading-5 text-slate-700">
        Use this only after verifying that the exact payment was received. The
        portal creates a paid invoice and receipt, emails the client, preserves
        the reference in the audit log, and advances the roadmap when the
        required classification fees are fully paid.
      </p>
      <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-bold text-slate-700 sm:col-span-2">
          Payment description
          <input
            name="title"
            required
            className="mt-2 w-full rounded-xl border border-emerald-200 bg-white px-4 py-3"
            placeholder="Paid USPTO classification fees"
          />
        </label>
        <label className="text-xs font-bold text-slate-700 sm:col-span-2">
          Fee category
          <select
            value={kind}
            onChange={(event) => setKind(event.target.value)}
            className="mt-2 w-full rounded-xl border border-emerald-200 bg-white px-4 py-3"
          >
            <option value="classification_fees" disabled={!reportReady}>
              Classes and classification fees
              {!reportReady ? " — clearance report required" : ""}
            </option>
            <option value="office_action">Office-action attorney work</option>
            <option value="amendment">Trademark amendment</option>
            <option value="declaration">Declaration or attestation</option>
            <option value="publication">Publication requirement</option>
            <option value="filing_requirement">
              Other disclosed case service
            </option>
          </select>
        </label>
        {kind === "classification_fees" ? (
          <div className="sm:col-span-2">
            <ClassificationFeeEditor
              rows={classFees}
              setRows={setClassFees}
              reportReady={reportReady}
            />
          </div>
        ) : (
          <label className="text-xs font-bold text-slate-700 sm:col-span-2">
            Exact amount received (USD)
            <input
              name="amount"
              type="number"
              min="1"
              max="100000"
              step="0.01"
              required
              className="mt-2 w-full rounded-xl border border-emerald-200 bg-white px-4 py-3"
              placeholder="425.00"
            />
          </label>
        )}
        <label className="text-xs font-bold text-slate-700">
          How payment was received
          <select
            name="paymentMethod"
            required
            className="mt-2 w-full rounded-xl border border-emerald-200 bg-white px-4 py-3"
          >
            <option value="phone_payment">
              Payment processed during attorney call
            </option>
            <option value="external_processor">
              External payment processor
            </option>
            <option value="bank_transfer">Bank transfer</option>
            <option value="verified_other">Other verified payment</option>
          </select>
        </label>
        <label className="text-xs font-bold text-slate-700">
          Date received
          <input
            name="receivedAt"
            type="date"
            required
            className="mt-2 w-full rounded-xl border border-emerald-200 bg-white px-4 py-3"
          />
        </label>
        <label className="text-xs font-bold text-slate-700 sm:col-span-2">
          Verification reference
          <input
            name="externalReference"
            required
            className="mt-2 w-full rounded-xl border border-emerald-200 bg-white px-4 py-3"
            placeholder="Processor transaction, bank reference, receipt, or call-payment reference"
          />
        </label>
        <label className="text-xs font-bold text-slate-700 sm:col-span-2">
          Receipt note to client
          <textarea
            name="message"
            required
            className="mt-2 min-h-24 w-full rounded-xl border border-emerald-200 bg-white p-4"
            placeholder="We confirmed receipt of your payment. No further payment action is required for this invoice."
          />
        </label>
        <label className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-white p-4 text-xs leading-5 text-slate-700 sm:col-span-2">
          <input type="checkbox" required className="mt-1" />
          <span>
            I verified that the exact amount was received and that the reference
            above matches the client and trademark matter.
          </span>
        </label>
        {result && (
          <p className="rounded-xl bg-white p-3 text-xs font-bold leading-5 text-emerald-800 sm:col-span-2">
            {result}
          </p>
        )}
        <button
          disabled={busy}
          className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-extrabold text-white disabled:opacity-50 sm:col-span-2"
        >
          {busy
            ? "Recording payment…"
            : "Record payment received and send receipt"}
        </button>
      </form>
    </section>
  );
}

export default function PortalCaseWorkspace({
  client,
  preview,
  onClose,
  initialPanel = "action",
}) {
  const router = useRouter();
  const [type, setType] = useState("appointment");
  const [workspacePanel, setWorkspacePanel] = useState(initialPanel);
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);
  const [activity, setActivity] = useState([]);
  const [existingTrademarkRequests, setExistingTrademarkRequests] = useState(
    [],
  );
  const [clientDocuments, setClientDocuments] = useState([]);
  const [records, setRecords] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [paymentKind, setPaymentKind] = useState("classification_fees");
  const [statusValue, setStatusValue] = useState("USPTO examination");
  const [classificationFees, setClassificationFees] = useState([
    { description: "", amount: "" },
  ]);
  const formRef = useRef(null);

  useEffect(() => {
    setWorkspacePanel(initialPanel);
  }, [initialPanel, client.uid, client.caseId]);

  const clearanceReport = activity.find(
    (item) => item.type === "clearance_report" && item.caseId === client.caseId,
  );
  const reportReady = Boolean(
    clearanceReport ||
    client.clearanceReportUrl ||
    client.clearanceReportStatus === "ready",
  );
  const proposedClasses = useMemo(
    () =>
      (clearanceReport?.selectedClasses?.length
        ? clearanceReport.selectedClasses
        : client.selectedClasses || []
      ).filter(Boolean),
    [clearanceReport?.selectedClasses, client.selectedClasses],
  );
  const consultationScheduled = activity.some(
    (item) =>
      item.type === "appointment" && item.appointmentStatus !== "cancelled",
  );
  const consultationCompleted =
    client.consultationStatus === "completed" ||
    activity.some(
      (item) =>
        item.type === "appointment" && item.appointmentStatus === "completed",
    );
  const classFeesPaid =
    client.classificationPaymentStatus === "paid" ||
    activity.some(
      (item) =>
        item.type === "payment" &&
        item.paymentKind === "classification_fees" &&
        (item.paymentStatus === "paid" || item.taskStatus === "completed"),
    );
  const filingRecorded = Boolean(
    client.serialNumber ||
    activity.some((item) => item.type === "filing" && item.serialNumber),
  );
  const postFilingUpdate = activity.some(
    (item) =>
      item.type === "status" &&
      [
        "USPTO examination",
        "Office action issued",
        "Publication period",
      ].includes(item.status),
  );
  const activeAppointment = activity.find(
    (item) =>
      item.type === "appointment" && item.appointmentStatus !== "cancelled",
  );
  const classFeePayment = activity.find(
    (item) =>
      item.type === "payment" && item.paymentKind === "classification_fees",
  );
  const filingActivity = activity.find(
    (item) => item.type === "filing" && item.serialNumber,
  );
  const latestPostFilingUpdate = activity.find(
    (item) =>
      item.type === "status" &&
      [
        "USPTO examination",
        "Office action issued",
        "Publication period",
      ].includes(item.status),
  );
  const registrationCertificate = activity.find(
    (item) => item.type === "registration_certificate",
  );
  const registrationRecorded = Boolean(
    client.registrationNumber || registrationCertificate?.registrationNumber,
  );

  const attorneyRoadmap = [
    {
      id: "application",
      number: 1,
      title: "Application received",
      state: "done",
      summary: `${client.packageName || "Trademark"} service order and owner intake are on file.`,
      actionLabel: "View intake",
    },
    {
      id: "appointment",
      number: 2,
      title: "Mandatory trademark consultation",
      state: consultationCompleted || reportReady ? "done" : "current",
      summary:
        consultationCompleted || reportReady
          ? "Mandatory trademark call completed; the legal review can continue."
          : activeAppointment?.appointmentAt
            ? `Scheduled ${new Date(activeAppointment.appointmentAt).toLocaleString()}. The attorney can share the report and confirm classes during this same call.`
            : "Schedule the call in the portal, or upload the completed-call report after an unscheduled phone consultation.",
      actionLabel:
        consultationCompleted || reportReady
          ? "View call"
          : activeAppointment
            ? "Manage call"
            : "Schedule mandatory call",
    },
    {
      id: "clearance_report",
      number: 3,
      title: "Search and clearance report",
      state: reportReady
        ? "done"
        : consultationScheduled
          ? "current"
          : "available",
      summary: reportReady
        ? `${proposedClasses.length} proposed class${proposedClasses.length === 1 ? "" : "es"} recorded from the attorney-prepared report.`
        : consultationScheduled
          ? "Upload the attorney-prepared PDF and enter one exact class per line."
          : "If the consultation happened by phone without a portal appointment, upload the report here; sharing it records the consultation stage as satisfied.",
      actionLabel: reportReady ? "View report" : "Upload completed-call report",
    },
    {
      id: "classification_fees",
      number: 4,
      title: "Classes and USPTO fees",
      state: classFeesPaid ? "done" : reportReady ? "current" : "locked",
      summary: classFeesPaid
        ? `${classFeePayment?.classCount || proposedClasses.length} class fee item${(classFeePayment?.classCount || proposedClasses.length) === 1 ? "" : "s"} paid and recorded.`
        : classFeePayment
          ? `Exact invoice for $${Number(classFeePayment.amount || 0).toFixed(2)} is awaiting payment or an on-call paid record.`
          : reportReady
            ? "Issue one exact fee item for every class in the clearance report."
            : "Unlocks after the clearance report is shared.",
      actionLabel: classFeesPaid
        ? "View payment"
        : classFeePayment
          ? "Open invoice"
          : "Request class fees",
    },
    {
      id: "filing",
      number: 5,
      title: "Filed with the USPTO",
      state: filingRecorded ? "done" : classFeesPaid ? "current" : "locked",
      summary: filingRecorded
        ? `Official filing recorded with serial ${filingActivity?.serialNumber || client.serialNumber}.`
        : classFeesPaid
          ? "Upload the official USPTO filing PDF, filing date and eight-digit serial number."
          : "Unlocks only after the exact classification fees are paid.",
      actionLabel: filingRecorded ? "View filing" : "Record filing",
    },
    {
      id: "examination",
      number: 6,
      title: "USPTO examination and publication",
      state: postFilingUpdate ? "done" : filingRecorded ? "current" : "locked",
      summary: postFilingUpdate
        ? `Latest client-visible stage: ${latestPostFilingUpdate?.status}.`
        : filingRecorded
          ? "Send examination, office-action or publication updates as they occur."
          : "Unlocks after the official filing and serial number are recorded.",
      actionLabel: postFilingUpdate ? "View USPTO update" : "Send USPTO update",
    },
    {
      id: "registration",
      number: 7,
      title: "Registration certificate",
      state: registrationRecorded
        ? "done"
        : postFilingUpdate
          ? "current"
          : "locked",
      summary: registrationRecorded
        ? `Registration ${registrationCertificate?.registrationNumber || client.registrationNumber} and certificate are on file.`
        : postFilingUpdate
          ? "Upload the official registration certificate only after USPTO registration."
          : "Unlocks after a post-filing USPTO update.",
      actionLabel: registrationRecorded
        ? "View certificate"
        : "Add certificate",
    },
  ];
  const currentRoadmapStep = attorneyRoadmap.find(
    (step) => step.state === "current",
  );

  function actionGate(actionId) {
    if (["requirement", "document"].includes(actionId) && !classFeesPaid)
      return {
        enabled: false,
        reason:
          "Client tasks and document requirements unlock only after the exact classification fees are paid.",
      };
    if (actionId === "promotion" && !classFeesPaid)
      return {
        enabled: false,
        reason:
          "Client service recommendations unlock only after the exact classification fees are paid.",
      };
    if (actionId === "payment" && !reportReady)
      return {
        enabled: false,
        reason:
          "Share the search and clearance report with its exact classes before requesting USPTO class fees.",
      };
    if (actionId === "filing" && !classFeesPaid)
      return {
        enabled: false,
        reason:
          "The exact class fees must be paid or marked paid before recording the USPTO filing.",
      };
    if (actionId === "status" && !filingRecorded)
      return {
        enabled: false,
        reason:
          "Record the official USPTO filing and serial number before sending examination updates.",
      };
    if (
      actionId === "registration_certificate" &&
      (!filingRecorded || !postFilingUpdate)
    )
      return {
        enabled: false,
        reason:
          "The case must be filed and have a post-filing USPTO update before adding the registration certificate.",
      };
    return { enabled: true, reason: "" };
  }

  function openRoadmapStep(step) {
    setResult("");
    if (step.state === "locked") return;
    if (step.id === "application") {
      setWorkspacePanel("case");
      return;
    }
    if (step.id === "appointment") {
      if (activeAppointment) {
        setWorkspacePanel("activity");
        setViewingTask(activeAppointment);
      } else {
        setWorkspacePanel("action");
        setType("appointment");
        setEditingAppointment(null);
      }
      return;
    }
    if (step.id === "clearance_report") {
      if (reportReady && clearanceReport) {
        setWorkspacePanel("activity");
        setViewingTask(clearanceReport);
      } else {
        setWorkspacePanel("action");
        setType("clearance_report");
      }
      return;
    }
    if (step.id === "classification_fees") {
      if (classFeePayment) setWorkspacePanel("billing");
      else {
        setWorkspacePanel("action");
        setType("payment");
        setPaymentKind("classification_fees");
      }
      return;
    }
    if (step.id === "filing") {
      if (filingRecorded && filingActivity) {
        setWorkspacePanel("activity");
        setViewingTask(filingActivity);
      } else {
        setWorkspacePanel("action");
        setType("filing");
      }
      return;
    }
    if (step.id === "examination") {
      if (postFilingUpdate && latestPostFilingUpdate) {
        setWorkspacePanel("activity");
        setViewingTask(latestPostFilingUpdate);
      } else {
        setWorkspacePanel("action");
        setType("status");
      }
      return;
    }
    if (step.id === "registration") {
      if (registrationRecorded && registrationCertificate) {
        setWorkspacePanel("activity");
        setViewingTask(registrationCertificate);
      } else {
        setWorkspacePanel("action");
        setType("registration_certificate");
      }
    }
  }

  useEffect(() => {
    if (!proposedClasses.length) return;
    setClassificationFees((current) => {
      const amounts = new Map(
        current.map((row) => [row.description, row.amount]),
      );
      return proposedClasses.map((description) => ({
        description,
        amount: amounts.get(description) || "",
      }));
    });
  }, [proposedClasses]);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        if (preview) {
          const key = `lto_demo_portal_updates_${client.key}`;
          const seededKey = `${key}_seeded_v4`;
          let items = JSON.parse(localStorage.getItem(key) || "[]").filter(
            (item) =>
              ![
                "demo-specimen-request",
                "demo-owner-document",
                "demo-approval-request",
              ].includes(item.id),
          );
          if (!localStorage.getItem(seededKey)) {
            const seeds = getPortalDemoActivity(client.key);
            const seedIds = new Set(seeds.map((item) => item.id));
            items = [
              ...seeds,
              ...items.filter((item) => !seedIds.has(item.id)),
            ];
            localStorage.setItem(key, JSON.stringify(items));
            localStorage.setItem(seededKey, "1");
          }
          if (active) setActivity(items);
        } else {
          const response = await fetch(
            `/api/portal/admin/clients/${client.uid}/activity?caseId=${encodeURIComponent(client.caseId)}`,
          );
          if (response.ok && active)
            setActivity((await response.json()).activity || []);
        }
      } catch {
        if (active) setActivity([]);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [client, preview]);
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        if (preview) {
          const items = JSON.parse(
            localStorage.getItem(
              `lto_demo_existing_trademark_requests_${client.key}`,
            ) || "[]",
          );
          if (active) setExistingTrademarkRequests(items);
        } else {
          const response = await fetch(
            `/api/portal/admin/clients/${client.uid}/service-requests`,
          );
          if (response.ok && active)
            setExistingTrademarkRequests(
              (await response.json()).requests || [],
            );
        }
      } catch {
        if (active) setExistingTrademarkRequests([]);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [client, preview]);
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        if (preview) {
          if (active) setClientDocuments([]);
          return;
        }
        const response = await fetch(
          `/api/portal/admin/clients/${client.uid}/documents?caseId=${encodeURIComponent(client.caseId)}`,
        );
        if (response.ok && active)
          setClientDocuments((await response.json()).documents || []);
      } catch {
        if (active) setClientDocuments([]);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [client, preview]);
  useEffect(() => {
    if (workspacePanel !== "records") return;
    let active = true;
    async function load() {
      if (preview) {
        if (active)
          setRecords({
            invoices: activity.filter((item) => item.type === "payment"),
            agreements: [
              {
                id: "demo-consent",
                type: "standing_payment_authorization",
                maximum: 2000,
                createdAt: "2026-08-07T16:30:00.000Z",
              },
            ],
            auditLog: activity.map((item) => ({
              id: `audit-${item.id}`,
              event: `portal_${item.type}`,
              createdAt: item.createdAt,
            })),
            documents: clientDocuments,
          });
        return;
      }
      try {
        const response = await fetch(
          `/api/portal/admin/clients/${client.uid}/evidence?caseId=${encodeURIComponent(client.caseId)}&view=1`,
          { cache: "no-store" },
        );
        if (!response.ok) throw new Error();
        if (active) setRecords(await response.json());
      } catch {
        if (active) setRecords({ error: true });
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [workspacePanel, preview, client, activity, clientDocuments]);

  function applyTemplate(template) {
    const form = formRef.current;
    if (!form) return;
    Object.entries(template).forEach(([key, value]) => {
      if (key === "name") return;
      const field = form.elements.namedItem(key);
      if (field) field.value = value;
    });
    setResult("Template applied. Review and edit it before sending.");
  }

  function handlePaymentSaved(item, replace = false) {
    setActivity((current) => {
      const next = replace
        ? current.map((existing) => (existing.id === item.id ? item : existing))
        : [item, ...current];
      if (preview)
        localStorage.setItem(
          `lto_demo_portal_updates_${client.key}`,
          JSON.stringify(next),
        );
      return next;
    });
  }

  async function removeRequirement(item) {
    if (
      !window.confirm(
        `Remove “${item.title || "this requirement"}” from the client portal?`,
      )
    )
      return;
    try {
      if (preview) {
        const key = `lto_demo_portal_updates_${client.key}`;
        const remaining = JSON.parse(localStorage.getItem(key) || "[]").filter(
          (update) => update.id !== item.id,
        );
        localStorage.setItem(key, JSON.stringify(remaining));
        setActivity(remaining);
      } else {
        const response = await fetch(
          `/api/portal/admin/clients/${client.uid}/activity/${item.id}`,
          { method: "DELETE" },
        );
        if (!response.ok) throw new Error();
        setActivity((items) => items.filter((update) => update.id !== item.id));
      }
      setViewingTask(null);
      setResult("Requirement removed from the client portal.");
    } catch {
      setResult("Unable to remove this requirement.");
    }
  }

  async function approveExistingTrademark(item) {
    setBusy(true);
    setResult("");
    try {
      if (preview) {
        const key = `lto_demo_existing_trademark_requests_${client.key}`;
        const updated = JSON.parse(localStorage.getItem(key) || "[]").map(
          (request) =>
            request.id === item.id
              ? { ...request, status: "approved" }
              : request,
        );
        localStorage.setItem(key, JSON.stringify(updated));
        setExistingTrademarkRequests(updated);
      } else {
        const response = await fetch(
          `/api/portal/admin/clients/${client.uid}/service-requests/${item.id}/approve`,
          { method: "POST" },
        );
        if (!response.ok)
          throw new Error(
            (await response.json()).error || "Unable to approve this request.",
          );
        setExistingTrademarkRequests((items) =>
          items.map((request) =>
            request.id === item.id
              ? { ...request, status: "approved" }
              : request,
          ),
        );
      }
      setResult(
        `${item.details?.markName || item.markName} was approved and added to the client portfolio.`,
      );
    } catch (error) {
      setResult(error.message || "Unable to approve this request.");
    } finally {
      setBusy(false);
    }
  }

  function beginEditAppointment(item) {
    setType("appointment");
    setWorkspacePanel("action");
    setEditingAppointment(item);
    setViewingTask(null);
    setResult("");
    setTimeout(() => {
      const form = formRef.current;
      if (!form) return;
      const values = {
        title: item.title || "",
        message: item.message || "",
        appointmentAt: String(item.appointmentAt || "").slice(0, 16),
        meetingType: item.meetingType || "google_meet",
        meetingUrl: item.meetingUrl || "",
        phoneNumber: item.phoneNumber || "",
      };
      Object.entries(values).forEach(([name, value]) => {
        const field = form.elements.namedItem(name);
        if (field) field.value = value;
      });
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  async function completeAppointment(item) {
    if (
      !window.confirm(
        `Mark “${item.title || "this attorney consultation"}” completed? This unlocks the search and clearance report stage.`,
      )
    )
      return;
    setBusy(true);
    setResult("");
    try {
      if (preview) {
        const key = `lto_demo_portal_updates_${client.key}`;
        const updated = JSON.parse(localStorage.getItem(key) || "[]").map(
          (update) =>
            update.id === item.id
              ? {
                  ...update,
                  appointmentStatus: "completed",
                  message:
                    "The mandatory attorney consultation was completed. The attorney may now prepare and share the search and clearance report.",
                  read: false,
                }
              : update,
        );
        localStorage.setItem(key, JSON.stringify(updated));
        setActivity(updated);
      } else {
        const response = await fetch(
          `/api/portal/admin/clients/${client.uid}/activity/${item.id}/appointment`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ appointmentStatus: "completed" }),
          },
        );
        if (!response.ok)
          throw new Error(
            (await response.json()).error || "Unable to complete appointment.",
          );
        setActivity((items) =>
          items.map((update) =>
            update.id === item.id
              ? { ...update, appointmentStatus: "completed", read: false }
              : update,
          ),
        );
      }
      setResult(
        "Mandatory attorney consultation completed. The clearance-report stage is now unlocked.",
      );
    } catch (error) {
      setResult(error.message || "Unable to complete appointment.");
    } finally {
      setBusy(false);
    }
  }

  async function cancelAppointment(item) {
    if (
      !window.confirm(
        `Cancel “${item.title || "this appointment"}”? The client will be notified.`,
      )
    )
      return;
    setBusy(true);
    setResult("");
    try {
      if (preview) {
        const key = `lto_demo_portal_updates_${client.key}`;
        const updated = JSON.parse(localStorage.getItem(key) || "[]").map(
          (update) =>
            update.id === item.id
              ? {
                  ...update,
                  appointmentStatus: "cancelled",
                  message:
                    "This appointment was cancelled by your legal team. A replacement time will be sent if needed.",
                  read: false,
                }
              : update,
        );
        localStorage.setItem(key, JSON.stringify(updated));
        setActivity(updated);
      } else {
        const response = await fetch(
          `/api/portal/admin/clients/${client.uid}/activity/${item.id}/appointment`,
          { method: "DELETE" },
        );
        if (!response.ok)
          throw new Error(
            (await response.json()).error || "Unable to cancel appointment.",
          );
        setActivity((items) =>
          items.map((update) =>
            update.id === item.id
              ? {
                  ...update,
                  appointmentStatus: "cancelled",
                  message:
                    "This appointment was cancelled by your legal team. A replacement time will be sent if needed.",
                  read: false,
                }
              : update,
          ),
        );
      }
      setViewingTask(null);
      setEditingAppointment(null);
      setResult("Appointment cancelled and the client was notified.");
    } catch (error) {
      setResult(error.message || "Unable to cancel appointment.");
    } finally {
      setBusy(false);
    }
  }

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setResult("");
    const wasEditing = Boolean(editingAppointment && type === "appointment");
    const form = new FormData(event.currentTarget);
    const requirementType = String(form.get("requirementType") || "");
    const payload = {
      caseId: client.caseId,
      type,
      status: form.get("status"),
      requirementType,
      title:
        form.get("title") ||
        (type === "filing"
          ? "Congratulations — your trademark application was filed"
          : type === "clearance_report"
            ? "Attorney search and clearance report"
            : type === "registration_certificate"
              ? "USPTO registration certificate"
              : requirementLabels[requirementType]) ||
        "Attorney update",
      message:
        form.get("message") ||
        (type === "filing"
          ? "Congratulations! Your application has been filed with the USPTO. Your serial number and official filing receipt are now available. You may use the ™ symbol with your trademark name; use ® only after registration."
          : ""),
      amount: form.get("amount"),
      dueAt: form.get("dueAt"),
      appointmentAt: form.get("appointmentAt"),
      meetingType: form.get("meetingType"),
      meetingUrl: form.get("meetingUrl"),
      phoneNumber: form.get("phoneNumber"),
      serialNumber: form.get("serialNumber"),
      registrationNumber: form.get("registrationNumber"),
      registrationDate: form.get("registrationDate"),
      filingDate: form.get("filingDate"),
      paymentKind: form.get("paymentKind"),
      selectedClasses: String(form.get("selectedClasses") || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      classCount: form.get("classCount"),
      documentUrl: "",
    };
    try {
      const gate = actionGate(type);
      if (!gate.enabled) throw new Error(gate.reason);
      if (type === "payment" && payload.paymentKind === "classification_fees") {
        if (!reportReady)
          throw new Error(
            "Upload the search and clearance report before requesting classification fees",
          );
        const fees = classificationFees.map((row) => ({
          description: String(row.description || "").trim(),
          amount: Number(row.amount || 0),
        }));
        if (
          fees.length !== proposedClasses.length ||
          fees.some(
            (row, index) =>
              row.description !== proposedClasses[index] || !(row.amount > 0),
          )
        )
          throw new Error(
            "Enter a valid fee for every exact class in the clearance report",
          );
        payload.classificationFees = fees;
        payload.selectedClasses = [...proposedClasses];
        payload.classCount = proposedClasses.length;
        payload.amount = fees.reduce((sum, row) => sum + row.amount, 0);
      }
      if (
        type === "appointment" &&
        payload.meetingType === "google_meet" &&
        !/^https:\/\/meet\.google\.com\//i.test(
          String(payload.meetingUrl || ""),
        )
      )
        throw new Error("A valid Google Meet link is required");
      if (
        type === "appointment" &&
        payload.meetingType === "phone" &&
        String(payload.phoneNumber || "").replace(/\D/g, "").length < 10
      )
        throw new Error("A valid phone number is required");
      if (type === "filing") {
        const document = form.get("filingDocument");
        if (!(document instanceof File) || document.type !== "application/pdf")
          throw new Error("A real USPTO PDF is required");
        if (preview) payload.documentUrl = URL.createObjectURL(document);
        else {
          const upload = new FormData();
          upload.append("document", document);
          upload.append("caseId", client.caseId);
          const uploadResponse = await fetch(
            `/api/portal/admin/clients/${client.uid}/filing-document`,
            { method: "POST", body: upload },
          );
          if (!uploadResponse.ok)
            throw new Error("Unable to upload filing PDF");
          payload.documentUrl = (await uploadResponse.json()).documentUrl;
        }
      }
      if (type === "clearance_report") {
        const document = form.get("clearanceReport");
        if (!(document instanceof File) || document.type !== "application/pdf")
          throw new Error("A PDF search and clearance report is required");
        if (!payload.selectedClasses.length)
          throw new Error("Add at least one proposed class");
        payload.classCount = payload.selectedClasses.length;
        if (preview) payload.documentUrl = URL.createObjectURL(document);
        else {
          const upload = new FormData();
          upload.append("document", document);
          upload.append("caseId", client.caseId);
          const uploadResponse = await fetch(
            `/api/portal/admin/clients/${client.uid}/clearance-report`,
            { method: "POST", body: upload },
          );
          if (!uploadResponse.ok)
            throw new Error(
              (await uploadResponse.json()).error ||
                "Unable to upload clearance report",
            );
          payload.documentUrl = (await uploadResponse.json()).documentUrl;
        }
      }
      if (type === "registration_certificate") {
        const document = form.get("registrationCertificate");
        if (!(document instanceof File) || document.type !== "application/pdf")
          throw new Error(
            "The official USPTO registration certificate PDF is required",
          );
        if (preview) payload.documentUrl = URL.createObjectURL(document);
        else {
          const upload = new FormData();
          upload.append("document", document);
          upload.append("caseId", client.caseId);
          const uploadResponse = await fetch(
            `/api/portal/admin/clients/${client.uid}/registration-certificate`,
            { method: "POST", body: upload },
          );
          if (!uploadResponse.ok)
            throw new Error(
              (await uploadResponse.json()).error ||
                "Unable to upload registration certificate",
            );
          payload.documentUrl = (await uploadResponse.json()).documentUrl;
        }
      }
      if (editingAppointment && type === "appointment") {
        if (preview) {
          const key = `lto_demo_portal_updates_${client.key}`;
          const updated = JSON.parse(localStorage.getItem(key) || "[]").map(
            (item) =>
              item.id === editingAppointment.id
                ? {
                    ...item,
                    ...payload,
                    appointmentStatus: "scheduled",
                    read: false,
                  }
                : item,
          );
          localStorage.setItem(key, JSON.stringify(updated));
          setActivity(updated);
        } else {
          const response = await fetch(
            `/api/portal/admin/clients/${client.uid}/activity/${editingAppointment.id}/appointment`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            },
          );
          if (!response.ok)
            throw new Error(
              (await response.json()).error || "Unable to update appointment.",
            );
          setActivity((items) =>
            items.map((item) =>
              item.id === editingAppointment.id
                ? {
                    ...item,
                    ...payload,
                    appointmentStatus: "scheduled",
                    read: false,
                  }
                : item,
            ),
          );
        }
        setEditingAppointment(null);
      } else if (preview) {
        const key = `lto_demo_portal_updates_${client.key}`;
        const current = JSON.parse(localStorage.getItem(key) || "[]");
        const saved = {
          ...payload,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          read: false,
          appointmentStatus: type === "appointment" ? "scheduled" : null,
          taskStatus: ["requirement", "document", "payment"].includes(type)
            ? "open"
            : null,
        };
        const existing =
          type === "clearance_report"
            ? current.map((item) =>
                item.type === "appointment" &&
                item.appointmentStatus !== "cancelled"
                  ? { ...item, appointmentStatus: "completed" }
                  : item,
              )
            : current;
        const officeActionCall =
          type === "status" && payload.status === "Office action issued"
            ? {
                id: crypto.randomUUID(),
                type: "appointment_request",
                title: "Attorney call required for USPTO office action",
                message: `Please arrange a call with your attorney to review the USPTO office action. The response deadline shown on the USPTO notice is ${payload.dueAt}. Your attorney will explain the issues, available response options, and any fee before response work begins.`,
                dueAt: payload.dueAt,
                caseId: client.caseId,
                read: false,
                createdAt: new Date().toISOString(),
              }
            : null;
        const next = officeActionCall
          ? [officeActionCall, saved, ...existing]
          : [saved, ...existing];
        localStorage.setItem(key, JSON.stringify(next));
        setActivity(next);
      } else {
        const response = await fetch(
          `/api/portal/admin/clients/${client.uid}/actions`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );
        const responsePayload = await response.json();
        if (!response.ok)
          throw new Error(
            responsePayload.error || "Unable to save this case action",
          );
      }
      setResult(
        wasEditing
          ? "Appointment updated and the client was notified."
          : type === "filing"
            ? `USPTO filing recorded. The client's roadmap now shows Filed with USPTO and serial ${payload.serialNumber}.`
            : "Saved to the client portal and email notification queued.",
      );
      event.currentTarget.reset();
      if (type === "payment" && payload.paymentKind === "classification_fees") {
        setClassificationFees(
          proposedClasses.length
            ? proposedClasses.map((description) => ({
                description,
                amount: "",
              }))
            : [{ description: "", amount: "" }],
        );
      }
    } catch (error) {
      setResult(
        error?.message || "This action could not be saved. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function markPaymentPaid(item) {
    if (
      !window.confirm("Confirm this payment was received outside the portal?")
    )
      return;
    setBusy(true);
    setResult("");
    try {
      if (preview) {
        const key = `lto_demo_portal_updates_${client.key}`;
        const updated = JSON.parse(localStorage.getItem(key) || "[]").map(
          (update) =>
            update.id === item.id
              ? {
                  ...update,
                  paymentStatus: "paid",
                  taskStatus: "completed",
                  paidBy: "attorney",
                }
              : update,
        );
        localStorage.setItem(key, JSON.stringify(updated));
        setActivity(updated);
      } else {
        if (!item.invoiceId)
          throw new Error("This legacy payment request has no invoice record.");
        const response = await fetch(
          `/api/portal/admin/clients/${client.uid}/invoices/${item.invoiceId}/paid`,
          { method: "PATCH" },
        );
        if (!response.ok)
          throw new Error(
            (await response.json()).error || "Unable to confirm payment.",
          );
        setActivity((items) =>
          items.map((update) =>
            update.id === item.id
              ? {
                  ...update,
                  paymentStatus: "paid",
                  taskStatus: "completed",
                  paidBy: "attorney",
                }
              : update,
          ),
        );
      }
      setViewingTask(null);
      setResult("Payment confirmed and the client roadmap was updated.");
    } catch (error) {
      setResult(error.message || "Unable to confirm payment.");
    } finally {
      setBusy(false);
    }
  }

  async function chargeSavedMethod(item) {
    const amount = Number(item.amount || 0).toFixed(2);
    if (
      !window.confirm(
        `Charge $${amount} to the client's saved payment method under their standing authorization? This will appear as XTARLABS LLC.`,
      )
    )
      return;
    setBusy(true);
    setResult("");
    try {
      if (preview) {
        await new Promise((resolve) => setTimeout(resolve, 450));
        const key = `lto_demo_portal_updates_${client.key}`;
        const updated = JSON.parse(localStorage.getItem(key) || "[]").map(
          (update) =>
            update.id === item.id
              ? {
                  ...update,
                  paymentStatus: "paid",
                  taskStatus: "completed",
                  paidBy: "authorized_saved_method",
                  transactionId: `DEMO-${Date.now()}`,
                }
              : update,
        );
        localStorage.setItem(key, JSON.stringify(updated));
        setActivity(updated);
        setResult(
          "Demo authorized charge completed. The class-fee stage is now paid and the filing action is unlocked.",
        );
      } else {
        if (!item.invoiceId)
          throw new Error("This payment request has no invoice record.");
        const response = await fetch(
          `/api/portal/admin/clients/${client.uid}/invoices/${item.invoiceId}/charge-saved`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ confirmCharge: true }),
          },
        );
        const payload = await response.json();
        if (!response.ok)
          throw new Error(
            payload.error || "Unable to charge the authorized saved method.",
          );
        setActivity((items) =>
          items.map((update) =>
            update.id === item.id
              ? {
                  ...update,
                  paymentStatus: "paid",
                  taskStatus: "completed",
                  paidBy: "authorized_saved_method",
                  transactionId: payload.transactionId,
                }
              : update,
          ),
        );
        setResult(
          `Authorized charge completed. Transaction ${payload.transactionId}. The client was notified.`,
        );
      }
    } catch (error) {
      setResult(
        error.message || "Unable to charge the authorized saved method.",
      );
    } finally {
      setBusy(false);
    }
  }

  const needsTitle = ![
    "status",
    "requirement",
    "filing",
    "clearance_report",
    "registration_certificate",
  ].includes(type);
  const needsMessage = ![
    "status",
    "filing",
    "registration_certificate",
  ].includes(type);
  const details = client.applicationDetails || {};
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/35">
      <button
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close case workspace"
      />
      <aside
        data-tour="admin-case-workspace"
        className="relative h-full w-full max-w-3xl overflow-y-auto bg-[#f7f9fc] shadow-2xl"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white p-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#027dd6]">
              {client.caseId}
            </p>
            <h2 className="mt-1 text-xl font-extrabold">
              {client.name} · {client.mark}™
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Every saved action also alerts {client.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!preview && (
              <a
                href={`/api/portal/admin/clients/${client.uid}/evidence?caseId=${encodeURIComponent(client.caseId)}`}
                className="rounded-xl border border-blue-200 px-3 py-2 text-xs font-extrabold text-[#027dd6]"
              >
                Download evidence log
              </a>
            )}
            <button
              onClick={onClose}
              aria-label="Close case workspace"
              className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-xl"
            >
              <HiOutlineXMark />
            </button>
          </div>
        </header>
        <div className="p-5 sm:p-7">
          <section className="mb-6">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                ["action", "Client action", "Send one focused update"],
                ["messages", "Messages", "Secure support thread"],
                ["case", "Case details", "Owner and attorney"],
                [
                  "activity",
                  "Tasks & files",
                  `${activity.filter((item) => ["requirement", "document"].includes(item.type) && item.taskStatus !== "completed").length} pending`,
                ],
                [
                  "billing",
                  "Payments",
                  `${activity.filter((item) => item.type === "payment" && item.taskStatus !== "completed" && item.paymentStatus !== "paid").length} due`,
                ],
                ["records", "Records & evidence", "Invoices, consent and logs"],
              ].map(([id, label, summary]) => (
                <button
                  data-tour={`admin-case-${id}`}
                  key={id}
                  type="button"
                  onClick={() => {
                    setWorkspacePanel(id);
                    setViewingTask(null);
                  }}
                  className={`rounded-xl border p-3 text-left transition ${workspacePanel === id ? "border-blue-400 bg-blue-50 ring-2 ring-blue-100" : "border-slate-200 bg-white hover:border-blue-300"}`}
                >
                  <span
                    className={`block text-xs font-extrabold ${workspacePanel === id ? "text-[#027dd6]" : "text-slate-800"}`}
                  >
                    {label}
                  </span>
                  <span className="mt-1 block text-[10px] font-semibold text-slate-500">
                    {summary}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Only the selected workspace is shown, keeping this case focused
              and easy to review.
            </p>
          </section>
          {workspacePanel === "messages" && (
            <AdminSecureMessages client={client} preview={preview} />
          )}
          {workspacePanel === "case" && (
            <div className="space-y-4">
              <AttorneyAssignmentPanel client={client} preview={preview} />
              <CaseManagementPanel
                client={client}
                preview={preview}
                onUpdated={() => router.refresh()}
              />
              <section className="rounded-2xl border border-blue-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-[#027dd6]">
                      Trademark record
                    </p>
                    <h3 className="mt-1 text-xl font-extrabold">
                      {client.mark}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {client.markType} · {client.stage}
                    </p>
                  </div>
                  {client.serialNumber && (
                    <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-extrabold text-emerald-800">
                      USPTO {client.serialNumber}
                    </span>
                  )}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["Owner", client.owner || client.company],
                    ["Package", client.packageName || "Not assigned"],
                    [
                      "Owner type",
                      details.ownerType ||
                        details.organizationType ||
                        "Not provided",
                    ],
                    [
                      "Use status",
                      details.trademarkCurrentlyBeingUsed || "Not provided",
                    ],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                {(client.selectedClasses?.length ||
                  details.selectedActivities?.length) && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {details.selectedActivities?.length > 0 && (
                      <div>
                        <p className="text-xs font-extrabold text-slate-700">
                          Business activities
                        </p>
                        <ul className="mt-2 space-y-1 text-xs leading-5 text-slate-600">
                          {details.selectedActivities.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {client.selectedClasses?.length > 0 && (
                      <div>
                        <p className="text-xs font-extrabold text-slate-700">
                          Attorney-selected classes
                        </p>
                        <ul className="mt-2 space-y-1 text-xs leading-5 text-slate-600">
                          {client.selectedClasses.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>
          )}
          {workspacePanel === "action" && (
            <>
              <section className="mb-5 overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
                <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white p-5">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-[#027dd6]">
                        Attorney-controlled client roadmap
                      </p>
                      <h3 className="mt-1 text-xl font-extrabold">
                        What is complete and what happens next
                      </h3>
                      <p className="mt-2 text-xs leading-5 text-slate-600">
                        These are the same milestones the client sees.
                        Completing the permitted action updates both portals
                        automatically.
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white px-3 py-2 text-xs font-extrabold text-[#027dd6] shadow-sm">
                      {currentRoadmapStep
                        ? `Current: Step ${currentRoadmapStep.number}`
                        : "All stages complete"}
                    </span>
                  </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {attorneyRoadmap.map((step) => (
                    <article
                      key={step.id}
                      className={`grid gap-3 p-4 sm:grid-cols-[44px_minmax(0,1fr)_auto] sm:items-center ${step.state === "current" ? "bg-blue-50/70" : step.state === "available" ? "bg-amber-50/50" : step.state === "locked" ? "bg-slate-50/70" : "bg-white"}`}
                    >
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-full text-sm font-extrabold ${step.state === "done" ? "bg-emerald-100 text-emerald-700" : step.state === "current" ? "bg-[#027dd6] text-white" : step.state === "available" ? "bg-amber-100 text-amber-800" : "bg-slate-200 text-slate-500"}`}
                      >
                        {step.state === "done" ? (
                          <HiOutlineCheckCircle className="text-xl" />
                        ) : step.state === "locked" ? (
                          <HiOutlineLockClosed className="text-lg" />
                        ) : (
                          step.number
                        )}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-extrabold text-slate-950">
                            Step {step.number}: {step.title}
                          </p>
                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${step.state === "done" ? "bg-emerald-100 text-emerald-700" : step.state === "current" ? "bg-blue-100 text-blue-700" : step.state === "available" ? "bg-amber-100 text-amber-800" : "bg-slate-200 text-slate-500"}`}
                          >
                            {step.state === "done"
                              ? "Completed"
                              : step.state === "current"
                                ? "Needs action"
                                : step.state === "available"
                                  ? "Available"
                                  : "Locked"}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          {step.summary}
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={step.state === "locked"}
                        onClick={() => openRoadmapStep(step)}
                        className={`w-full rounded-xl px-4 py-2.5 text-xs font-extrabold sm:w-auto ${step.state === "done" ? "border border-emerald-200 bg-white text-emerald-700" : step.state === "current" ? "bg-[#006fbd] text-white" : step.state === "available" ? "border border-amber-300 bg-white text-amber-800" : "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"}`}
                      >
                        {step.state === "locked" ? "Locked" : step.actionLabel}
                      </button>
                    </article>
                  ))}
                </div>
              </section>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold">
                    Additional client communication
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Roadmap controls above manage legal stages. Use these tools
                    for permitted supporting actions.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {actions.map((action) => {
                  const Icon = action.icon;
                  const gate = actionGate(action.id);
                  return (
                    <button
                      key={action.id}
                      onClick={() => {
                        if (!gate.enabled) {
                          setResult(gate.reason);
                          return;
                        }
                        setType(action.id);
                        if (action.id === "payment")
                          setPaymentKind("classification_fees");
                        setEditingAppointment(null);
                        setResult("");
                      }}
                      aria-disabled={!gate.enabled}
                      title={gate.reason || action.label}
                      className={`rounded-xl border p-3 text-left text-xs font-bold ${!gate.enabled ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400" : type === action.id ? "border-blue-300 bg-blue-50 text-[#027dd6]" : "border-slate-200 bg-white text-slate-600"}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <Icon className="mb-2 text-xl" />
                        {!gate.enabled && <HiOutlineLockClosed />}
                      </div>
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {workspacePanel === "activity" && (
            <>
              {existingTrademarkRequests.some(
                (item) =>
                  item.type === "existing_trademark" &&
                  item.status === "attorney_review",
              ) && (
                <section className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-5">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-violet-700">
                      Portfolio requests
                    </p>
                    <h3 className="mt-1 text-lg font-extrabold">
                      Existing trademarks awaiting attorney review
                    </h3>
                  </div>
                  <div className="mt-4 space-y-3">
                    {existingTrademarkRequests
                      .filter(
                        (item) =>
                          item.type === "existing_trademark" &&
                          item.status === "attorney_review",
                      )
                      .map((item) => {
                        const details = item.details || item;
                        return (
                          <article
                            key={item.id}
                            className="rounded-xl border border-violet-200 bg-white p-4"
                          >
                            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                              <div>
                                <p className="font-extrabold">
                                  {details.markName}
                                </p>
                                <p className="mt-1 text-sm font-bold text-violet-700">
                                  USPTO serial {details.serialNumber}
                                </p>
                                {details.notes && (
                                  <p className="mt-2 text-xs leading-5 text-slate-600">
                                    {details.notes}
                                  </p>
                                )}
                              </div>
                              <button
                                disabled={busy}
                                onClick={() => approveExistingTrademark(item)}
                                className="shrink-0 rounded-xl bg-violet-700 px-4 py-3 text-xs font-extrabold text-white disabled:opacity-60"
                              >
                                Verify and add to portfolio
                              </button>
                            </div>
                          </article>
                        );
                      })}
                  </div>
                </section>
              )}
              {existingTrademarkRequests.some(
                (item) =>
                  item.type === "amendment" &&
                  item.status === "attorney_review",
              ) && (
                <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
                    Client change requests
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold">
                    Amendments awaiting attorney review
                  </h3>
                  <div className="mt-4 space-y-3">
                    {existingTrademarkRequests
                      .filter(
                        (item) =>
                          item.type === "amendment" &&
                          item.status === "attorney_review",
                      )
                      .map((item) => (
                        <article
                          key={item.id}
                          className="rounded-xl border border-amber-200 bg-white p-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="font-extrabold">
                              {item.details?.requestType?.replaceAll(
                                "_",
                                " ",
                              ) || "Trademark amendment"}
                            </p>
                            <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-extrabold uppercase text-amber-800">
                              {item.details?.stage === "post_filing"
                                ? "After filing"
                                : "Before filing"}
                            </span>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-slate-700">
                            {item.details?.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <button
                              onClick={() => {
                                setType("message");
                                setResult(
                                  "Review the amendment, then send the client a personalized decision or clarification request.",
                                );
                              }}
                              className="rounded-lg bg-[#006fbd] px-4 py-2 text-xs font-extrabold text-white"
                            >
                              Respond to client
                            </button>
                            <button
                              onClick={() => {
                                setType("payment");
                                setResult(
                                  "If attorney work or a USPTO form is required, issue a clearly described payment request after confirming scope.",
                                );
                              }}
                              className="rounded-lg border border-amber-300 px-4 py-2 text-xs font-extrabold text-amber-800"
                            >
                              Create fee request
                            </button>
                          </div>
                        </article>
                      ))}
                  </div>
                </section>
              )}
              {activity.some((item) => item.type === "appointment") && (
                <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-[#027dd6]">
                      Calendar management
                    </p>
                    <h3 className="mt-1 text-lg font-extrabold">
                      Current client appointments
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Edit or reschedule the call, mark it completed, or cancel
                      it. The clearance report may be shared during the
                      scheduled call and will automatically complete this stage.
                    </p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {activity
                      .filter((item) => item.type === "appointment")
                      .map((item) => {
                        const completed =
                          item.appointmentStatus === "completed";
                        const cancelled =
                          item.appointmentStatus === "cancelled";
                        return (
                          <article
                            key={item.id}
                            className={`rounded-xl border p-4 ${cancelled ? "border-slate-200 bg-slate-50 opacity-70" : completed ? "border-emerald-200 bg-emerald-50" : "border-blue-200 bg-blue-50"}`}
                          >
                            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="font-extrabold">
                                    {item.title || "Attorney appointment"}
                                  </p>
                                  <span
                                    className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${cancelled ? "bg-slate-200 text-slate-600" : completed ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}
                                  >
                                    {cancelled
                                      ? "Cancelled"
                                      : completed
                                        ? "Completed"
                                        : "Scheduled"}
                                  </span>
                                </div>
                                <p className="mt-2 text-sm font-bold text-slate-700">
                                  {item.appointmentAt
                                    ? new Date(
                                        item.appointmentAt,
                                      ).toLocaleString()
                                    : "Date not set"}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                  {item.meetingType === "phone"
                                    ? `Phone · ${item.phoneNumber}`
                                    : "Google Meet"}
                                </p>
                              </div>
                              {!cancelled && !completed && (
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    onClick={() => beginEditAppointment(item)}
                                    className="rounded-lg bg-[#006fbd] px-4 py-2.5 text-xs font-extrabold text-white"
                                  >
                                    Edit / reschedule
                                  </button>
                                  <button
                                    disabled={busy}
                                    onClick={() => completeAppointment(item)}
                                    className="rounded-lg bg-emerald-700 px-4 py-2.5 text-xs font-extrabold text-white disabled:opacity-50"
                                  >
                                    Mark call completed
                                  </button>
                                  <button
                                    onClick={() => cancelAppointment(item)}
                                    className="rounded-lg border border-red-200 bg-white px-4 py-2.5 text-xs font-extrabold text-red-700"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              )}
                            </div>
                          </article>
                        );
                      })}
                  </div>
                </section>
              )}
              <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold">
                      Open client tasks and updates
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Open any card to review exactly what the client received.
                    </p>
                  </div>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-extrabold text-orange-700">
                    {
                      activity.filter(
                        (item) =>
                          ["requirement", "document", "payment"].includes(
                            item.type,
                          ) && item.taskStatus !== "completed",
                      ).length
                    }{" "}
                    pending
                  </span>
                </div>
                {activity.length ? (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {activity.slice(0, 8).map((item) => {
                      const isTask = [
                        "requirement",
                        "document",
                        "payment",
                      ].includes(item.type);
                      return (
                        <button
                          key={item.id}
                          onClick={() => setViewingTask(item)}
                          className={`rounded-xl border p-4 text-left transition hover:border-blue-300 hover:bg-blue-50 ${item.taskStatus === "completed" ? "border-emerald-200" : "border-slate-200"}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-extrabold uppercase text-[#027dd6]">
                              {item.type}
                            </span>
                            <span
                              className={`text-[10px] font-extrabold ${item.taskStatus === "completed" ? "text-emerald-700" : isTask ? "text-orange-700" : "text-slate-500"}`}
                            >
                              {isTask
                                ? item.taskStatus === "completed"
                                  ? "Completed"
                                  : item.dueAt
                                    ? `Pending · ${item.dueAt}`
                                    : "Pending"
                                : "Update"}
                            </span>
                          </div>
                          <p className="mt-2 text-sm font-extrabold">
                            {item.type === "status"
                              ? item.status
                              : item.title || "Attorney update"}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                            {item.message}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                    No case activity has been sent yet.
                  </p>
                )}
              </section>
              {viewingTask && (
                <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-extrabold uppercase text-[#027dd6]">
                        {viewingTask.type} details
                      </p>
                      <h3 className="mt-2 text-xl font-extrabold">
                        {viewingTask.type === "status"
                          ? viewingTask.status
                          : viewingTask.title || "Attorney update"}
                      </h3>
                      {["requirement", "document", "payment"].includes(
                        viewingTask.type,
                      ) && (
                        <span
                          className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-extrabold ${viewingTask.taskStatus === "completed" ? "bg-emerald-100 text-emerald-800" : "bg-orange-100 text-orange-800"}`}
                        >
                          {viewingTask.taskStatus === "completed"
                            ? viewingTask.type === "payment"
                              ? "Payment completed"
                              : "Closed by attorney"
                            : "Pending client response"}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setViewingTask(null)}
                      aria-label="Close task details"
                      className="text-xl"
                    >
                      ×
                    </button>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {viewingTask.message || "No additional message."}
                  </p>
                  {viewingTask.dueAt && (
                    <p className="mt-3 text-sm font-extrabold text-orange-800">
                      Due {viewingTask.dueAt}
                    </p>
                  )}
                  {viewingTask.appointmentAt && (
                    <p className="mt-3 text-sm font-bold">
                      Scheduled{" "}
                      {new Date(viewingTask.appointmentAt).toLocaleString()}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setType("message");
                        setWorkspacePanel("action");
                        setViewingTask(null);
                      }}
                      className="rounded-lg bg-[#006fbd] px-4 py-2 text-xs font-extrabold text-white"
                    >
                      Message client
                    </button>
                    <button
                      onClick={() => {
                        setType("appointment");
                        setWorkspacePanel("action");
                        setViewingTask(null);
                      }}
                      className="rounded-lg border border-blue-300 bg-white px-4 py-2 text-xs font-extrabold text-[#027dd6]"
                    >
                      Schedule follow-up
                    </button>
                    {["requirement", "document"].includes(viewingTask.type) &&
                      viewingTask.taskStatus !== "completed" && (
                        <button
                          onClick={() => removeRequirement(viewingTask)}
                          className="rounded-lg border border-red-200 bg-white px-4 py-2 text-xs font-extrabold text-red-700"
                        >
                          Remove from client dashboard
                        </button>
                      )}
                  </div>
                </div>
              )}
              {clientDocuments.length > 0 && (
                <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                    Secure uploads
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold">
                    Documents received from the client
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {clientDocuments.map((document) => (
                      <a
                        key={document.id}
                        href={document.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-emerald-200 bg-white p-4 transition hover:border-emerald-400"
                      >
                        <p className="break-all text-sm font-extrabold text-slate-900">
                          {document.fileName}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {document.createdAt
                            ? new Date(document.createdAt).toLocaleString()
                            : "Client upload"}{" "}
                          ·{" "}
                          {(Number(document.size || 0) / 1024 / 1024).toFixed(
                            2,
                          )}{" "}
                          MB
                        </p>
                        <span className="mt-3 inline-block text-xs font-extrabold text-emerald-700">
                          Download securely →
                        </span>
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
          {workspacePanel === "billing" && (
            <>
              <QuickPaymentPanel
                client={client}
                preview={preview}
                onSaved={handlePaymentSaved}
                reportReady={reportReady}
                proposedClasses={proposedClasses}
              />
              <ExternalPaymentPanel
                client={client}
                preview={preview}
                onSaved={handlePaymentSaved}
                reportReady={reportReady}
                proposedClasses={proposedClasses}
              />
              {activity.some((item) => item.type === "payment") && (
                <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                    Case payments
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold">
                    Payment requests for this case
                  </h3>
                  <div className="mt-4 space-y-3">
                    {activity
                      .filter((item) => item.type === "payment")
                      .map((item) => {
                        const paid =
                          item.taskStatus === "completed" ||
                          item.paymentStatus === "paid";
                        const legacyClassFee =
                          item.paymentKind === "classification_fees" &&
                          !item.classificationFees?.length;
                        return (
                          <article
                            key={item.id}
                            className="rounded-xl border border-emerald-200 bg-white p-4"
                          >
                            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                              <div className="min-w-0 flex-1">
                                <p className="font-extrabold">
                                  {item.title || "Client fee"}
                                </p>
                                <p className="mt-1 text-sm text-slate-600">
                                  ${Number(item.amount || 0).toFixed(2)} ·{" "}
                                  {paid ? "Paid" : "Payment due"}
                                </p>
                                {item.classificationFees?.length > 0 && (
                                  <div className="mt-3 rounded-lg bg-slate-50 p-3">
                                    {item.classificationFees.map(
                                      (fee, index) => (
                                        <div
                                          key={`${fee.description}-${index}`}
                                          className="flex justify-between gap-3 py-1 text-xs"
                                        >
                                          <span>{fee.description}</span>
                                          <b>
                                            $
                                            {Number(fee.amount || 0).toFixed(2)}
                                          </b>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                )}
                                {legacyClassFee && (
                                  <p className="mt-3 rounded-lg bg-red-50 p-3 text-xs font-bold leading-5 text-red-700">
                                    Legacy unitemized class fee. Confirm and
                                    reissue the exact classes and amounts before
                                    recording payment.
                                  </p>
                                )}
                              </div>
                              {!paid && !legacyClassFee && (
                                <button
                                  disabled={busy}
                                  onClick={() => markPaymentPaid(item)}
                                  className="shrink-0 rounded-xl border border-emerald-300 px-4 py-2.5 text-xs font-extrabold text-emerald-700"
                                >
                                  Mark exact invoice paid
                                </button>
                              )}
                            </div>
                          </article>
                        );
                      })}
                  </div>
                </section>
              )}
              <CallConsentPanel client={client} preview={preview} />
              {!activity.some(
                (item) =>
                  item.type === "payment" &&
                  item.taskStatus !== "completed" &&
                  item.paymentStatus !== "paid",
              ) && (
                <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Authorized saved payment
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold">
                    No eligible unpaid fee
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    Auto-charge is intentionally unavailable until a specific
                    fee request exists and the client has a saved NMI method
                    with valid standing authorization covering that fee.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setWorkspacePanel("action");
                      setType("payment");
                      setResult("");
                    }}
                    className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs font-extrabold text-[#027dd6]"
                  >
                    Create a disclosed fee request
                  </button>
                </section>
              )}
              {activity.some(
                (item) =>
                  item.type === "payment" &&
                  item.taskStatus !== "completed" &&
                  item.paymentStatus !== "paid",
              ) && (
                <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                    Authorized saved payment
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold">
                    Charge a specific issued fee
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-amber-900">
                    Production allows this only when the client separately
                    granted standing authorization, the fee category is covered,
                    the amount is within the exact client-approved ceiling, and
                    the invoice is still unpaid. Every attempt is logged and a
                    receipt is emailed.
                  </p>
                  <div className="mt-4 space-y-3">
                    {activity
                      .filter(
                        (item) =>
                          item.type === "payment" &&
                          item.taskStatus !== "completed" &&
                          item.paymentStatus !== "paid",
                      )
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col justify-between gap-3 rounded-xl bg-white p-4 sm:flex-row sm:items-center"
                        >
                          <div>
                            <p className="text-sm font-extrabold">
                              {item.title}
                            </p>
                            <p className="mt-1 text-xs text-slate-600">
                              ${Number(item.amount || 0).toFixed(2)} ·{" "}
                              {item.paymentKind || "specific case fee"}
                            </p>
                          </div>
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => chargeSavedMethod(item)}
                            className="rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-extrabold text-white disabled:opacity-50"
                          >
                            Charge authorized saved method
                          </button>
                        </div>
                      ))}
                  </div>
                </section>
              )}
            </>
          )}
          {workspacePanel === "records" && (
            <div className="space-y-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-[#027dd6]">
                      Client business record
                    </p>
                    <h3 className="mt-1 text-xl font-extrabold">
                      Invoices, consent and dispute evidence
                    </h3>
                    <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-600">
                      Use this record to review service delivery and prepare
                      evidence for XTARLABS, NMI or a processor dispute. It does
                      not guarantee a chargeback outcome. Full card numbers and
                      CVV are never stored.
                    </p>
                  </div>
                  {!preview && (
                    <a
                      href={`/api/portal/admin/clients/${client.uid}/evidence?caseId=${encodeURIComponent(client.caseId)}`}
                      className="shrink-0 rounded-xl bg-slate-900 px-4 py-3 text-xs font-extrabold text-white"
                    >
                      Download evidence bundle
                    </a>
                  )}
                </div>
                {records ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      ["Invoices", records.invoices?.length || 0],
                      ["Consent records", records.agreements?.length || 0],
                      ["Audit events", records.auditLog?.length || 0],
                      ["Client files", records.documents?.length || 0],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-xl bg-slate-50 p-4">
                        <p className="text-2xl font-extrabold text-slate-950">
                          {value}
                        </p>
                        <p className="mt-1 text-xs font-bold text-slate-500">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm font-bold text-slate-500">
                    Loading secure records…
                  </p>
                )}
              </section>
              {records?.error && (
                <p className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700">
                  Records could not be loaded. Check the portal database and
                  staff permissions.
                </p>
              )}
              {records?.invoices?.length > 0 && (
                <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                  <h3 className="font-extrabold">
                    Invoice and receipt history
                  </h3>
                  <div className="mt-4 space-y-3">
                    {records.invoices.map((invoice) => {
                      const invoiceStatus =
                        invoice.status || invoice.paymentStatus || "due";
                      const invoiceStatusLabel =
                        invoiceStatus === "payment_review_required"
                          ? "Review required"
                          : invoiceStatus === "processing"
                            ? "Processing"
                            : invoiceStatus.replaceAll("_", " ");
                      return (
                        <article
                          key={invoice.id}
                          className="rounded-xl border border-blue-100 bg-white p-4"
                        >
                          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                            <div>
                              <p className="text-sm font-extrabold">
                                {invoice.title || "Client invoice"}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                Invoice {invoice.id} ·{" "}
                                {invoice.paymentKind?.replaceAll("_", " ") ||
                                  "service payment"}
                              </p>
                              {invoice.transactionId && (
                                <p className="mt-1 break-all text-xs font-bold text-slate-600">
                                  Transaction {invoice.transactionId}
                                </p>
                              )}
                              {invoiceStatus === "payment_review_required" && (
                                <p className="mt-2 max-w-xl rounded-lg bg-amber-50 p-3 text-xs font-bold leading-5 text-amber-800">
                                  The gateway response was uncertain. Reconcile
                                  this attempt with the payment provider before
                                  trying another charge.
                                </p>
                              )}
                            </div>
                            <div className="sm:text-right">
                              <p className="text-lg font-extrabold">
                                ${Number(invoice.amount || 0).toFixed(2)}
                              </p>
                              <span
                                className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${invoiceStatus === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"}`}
                              >
                                {invoiceStatusLabel}
                              </span>
                            </div>
                          </div>
                          {invoice.classificationFees?.length > 0 && (
                            <div className="mt-3 rounded-lg bg-slate-50 p-3">
                              {invoice.classificationFees.map((fee, index) => (
                                <div
                                  key={`${fee.description}-${index}`}
                                  className="flex justify-between gap-3 py-1 text-xs"
                                >
                                  <span>{fee.description}</span>
                                  <b>${Number(fee.amount || 0).toFixed(2)}</b>
                                </div>
                              ))}
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </section>
              )}
              {records?.agreements?.length > 0 && (
                <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
                  <h3 className="font-extrabold">Payment consent records</h3>
                  <div className="mt-4 space-y-3">
                    {records.agreements.map((agreement) => (
                      <article
                        key={agreement.id}
                        className="rounded-xl bg-white p-4"
                      >
                        <p className="text-sm font-extrabold">
                          {agreement.type?.replaceAll("_", " ") ||
                            "Client agreement"}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          Authorized ceiling:{" "}
                          {agreement.maximum
                            ? `$${Number(agreement.maximum).toFixed(2)} per charge`
                            : "See signed record"}{" "}
                          ·{" "}
                          {agreement.createdAt
                            ? new Date(agreement.createdAt).toLocaleString()
                            : "Stored securely"}
                        </p>
                        {agreement.evidenceUrl && !preview && (
                          <a
                            href={agreement.evidenceUrl}
                            className="mt-3 inline-flex text-xs font-extrabold text-indigo-700"
                          >
                            Open consent evidence →
                          </a>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              )}
              {records?.auditLog?.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-extrabold">Recent audit trail</h3>
                  <div className="mt-4 divide-y divide-slate-100">
                    {records.auditLog
                      .slice(-12)
                      .reverse()
                      .map((entry) => (
                        <div
                          key={entry.id}
                          className="flex flex-col justify-between gap-1 py-3 sm:flex-row"
                        >
                          <p className="text-xs font-bold text-slate-800">
                            {String(entry.event || "portal_record").replaceAll(
                              "_",
                              " ",
                            )}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {entry.createdAt
                              ? new Date(entry.createdAt).toLocaleString()
                              : "Timestamp stored"}
                          </p>
                        </div>
                      ))}
                  </div>
                </section>
              )}
            </div>
          )}
          {workspacePanel === "action" && (
            <form
              ref={formRef}
              onSubmit={submit}
              className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div>
                <h3 className="text-lg font-extrabold">
                  {editingAppointment && type === "appointment"
                    ? "Edit appointment"
                    : actions.find((item) => item.id === type).label}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  The client receives this inside the portal and by email.
                </p>
              </div>
              {quickTemplates[type]?.length > 0 && (
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-extrabold text-slate-900">
                      Quick templates
                    </p>
                    <span className="text-[11px] font-bold text-slate-500">
                      Always editable
                    </span>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {quickTemplates[type].map((template) => (
                      <button
                        key={template.name}
                        type="button"
                        onClick={() => applyTemplate(template)}
                        className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-left text-xs font-extrabold text-[#027dd6] transition hover:border-blue-400 hover:bg-blue-100"
                      >
                        {template.name}
                        <span className="mt-1 block font-medium text-slate-500">
                          Use and edit →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {type === "status" && (
                <>
                  <label className="block">
                    <span className="text-sm font-bold">
                      Post-filing USPTO stage
                    </span>
                    <select
                      name="status"
                      value={statusValue}
                      onChange={(event) => setStatusValue(event.target.value)}
                      required
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5"
                    >
                      <option>USPTO examination</option>
                      <option>Office action issued</option>
                      <option>Publication period</option>
                    </select>
                    <span className="mt-2 block text-xs leading-5 text-slate-500">
                      Pre-filing stages advance automatically from the completed
                      attorney call, clearance report, paid class fees, and
                      recorded USPTO filing.
                    </span>
                  </label>
                  {statusValue === "Office action issued" && (
                    <label className="block">
                      <span className="text-sm font-bold">
                        USPTO response deadline shown on the office action
                      </span>
                      <input
                        name="dueAt"
                        type="date"
                        required
                        className="mt-2 w-full rounded-xl border border-amber-300 bg-amber-50 px-4 py-3.5"
                      />
                      <span className="mt-2 block text-xs leading-5 text-amber-800">
                        Enter the exact deadline printed on the official notice.
                        The client will see it with the required attorney-call
                        alert.
                      </span>
                    </label>
                  )}
                </>
              )}
              {type === "requirement" && (
                <label className="block">
                  <span className="text-sm font-bold">Legal requirement</span>
                  <select
                    name="requirementType"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5"
                  >
                    {Object.entries(requirementLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {needsTitle && (
                <label className="block">
                  <span className="text-sm font-bold">
                    {type === "payment"
                      ? "Payment description"
                      : type === "appointment"
                        ? "Call subject"
                        : type === "email"
                          ? "Email subject"
                          : "Title"}
                  </span>
                  <input
                    name="title"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5"
                    placeholder={
                      type === "document"
                        ? "Upload signed declaration"
                        : type === "payment"
                          ? "USPTO filing fee"
                          : "Personalized client update"
                    }
                  />
                </label>
              )}
              {type === "clearance_report" && (
                <>
                  <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm leading-6 text-slate-700">
                    <b>Attorney-prepared report only.</b> Upload the finished,
                    attorney-reviewed search and clearance PDF. The exact class
                    count is calculated automatically from the class list and
                    becomes the locked source for the fee request.
                  </div>
                  <label className="block">
                    <span className="text-sm font-bold">
                      Search and clearance report (PDF)
                    </span>
                    <input
                      name="clearanceReport"
                      type="file"
                      accept="application/pdf,.pdf"
                      required
                      className="mt-2 block w-full rounded-xl border border-dashed border-violet-300 bg-violet-50 p-4 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-violet-700 file:px-4 file:py-2 file:font-bold file:text-white"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold">
                      Proposed classes (one exact class per line)
                    </span>
                    <textarea
                      name="selectedClasses"
                      required
                      className="mt-2 min-h-36 w-full rounded-xl border border-slate-300 p-4"
                      placeholder={
                        "Class 9 — Downloadable software\nClass 35 — Advertising and business consulting\nClass 41 — Training and education\nClass 42 — Website and software design"
                      }
                    />
                    <span className="mt-2 block text-xs leading-5 text-slate-500">
                      Do not enter a separate class count. Four non-empty lines
                      will always display as four classes on the client roadmap
                      and invoice.
                    </span>
                  </label>
                </>
              )}
              {type === "payment" && (
                <>
                  <label className="block">
                    <span className="text-sm font-bold">Fee category</span>
                    <select
                      name="paymentKind"
                      value={paymentKind}
                      onChange={(event) => setPaymentKind(event.target.value)}
                      required
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5"
                    >
                      <option
                        value="classification_fees"
                        disabled={!reportReady}
                      >
                        Classes and classification fees
                        {!reportReady ? " — clearance report required" : ""}
                      </option>
                      <option value="office_action">
                        Office-action attorney work
                      </option>
                      <option value="amendment">Trademark amendment</option>
                      <option value="declaration">
                        Declaration or attestation
                      </option>
                      <option value="publication">
                        Publication requirement
                      </option>
                      <option value="filing_requirement">
                        Other filing requirement
                      </option>
                    </select>
                  </label>
                  {paymentKind === "classification_fees" ? (
                    <ClassificationFeeEditor
                      rows={classificationFees}
                      setRows={setClassificationFees}
                      reportReady={reportReady}
                    />
                  ) : (
                    <label className="block">
                      <span className="text-sm font-bold">Amount (USD)</span>
                      <input
                        name="amount"
                        type="number"
                        min="1"
                        max="50000"
                        step="0.01"
                        required
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5"
                        placeholder="Enter the disclosed fee"
                      />
                    </label>
                  )}
                </>
              )}
              {type === "appointment" && (
                <>
                  <label className="block">
                    <span className="text-sm font-bold">Date and time</span>
                    <input
                      name="appointmentAt"
                      type="datetime-local"
                      required
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold">Meeting method</span>
                    <select
                      name="meetingType"
                      required
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5"
                    >
                      <option value="google_meet">
                        Google Meet video call
                      </option>
                      <option value="phone">Direct phone call</option>
                    </select>
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-bold">
                        Google Meet link
                      </span>
                      <input
                        name="meetingUrl"
                        type="url"
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5"
                        placeholder="https://meet.google.com/…"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold">
                        Call phone number
                      </span>
                      <input
                        name="phoneNumber"
                        type="tel"
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5"
                        placeholder="+1 (310) 424-4909"
                      />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-slate-500">
                    Provide the detail that matches the selected method. For a
                    phone appointment, tell the client whether the attorney will
                    call them or they should call this number.
                  </p>
                </>
              )}
              {type === "filing" && (
                <>
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-slate-700">
                    Enter the official USPTO serial number only after filing and
                    upload the actual PDF received from the USPTO. Demo or
                    placeholder files are not accepted in production.
                  </div>
                  <label className="block">
                    <span className="text-sm font-bold">
                      USPTO serial number
                    </span>
                    <input
                      name="serialNumber"
                      required
                      inputMode="numeric"
                      pattern="[0-9]{8}"
                      maxLength="8"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5"
                      placeholder="98765432"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold">
                      Official filing date
                    </span>
                    <input
                      name="filingDate"
                      type="date"
                      required
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold">
                      Actual USPTO filing PDF
                    </span>
                    <input
                      name="filingDocument"
                      type="file"
                      accept="application/pdf,.pdf"
                      required
                      className="mt-2 block w-full rounded-xl border border-dashed border-blue-300 bg-blue-50 p-4 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-[#006fbd] file:px-4 file:py-2 file:font-bold file:text-white"
                    />
                    <span className="mt-2 block text-xs text-slate-500">
                      PDF only · maximum 15 MB · stored privately
                    </span>
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold">Client note</span>
                    <textarea
                      name="message"
                      className="mt-2 min-h-24 w-full rounded-xl border border-slate-300 p-4"
                      placeholder="Your application has been filed successfully. Download the official receipt below."
                    />
                  </label>
                </>
              )}
              {type === "registration_certificate" && (
                <>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-slate-700">
                    Use this only after registration. Upload the official USPTO
                    certificate so the client can download it from the completed
                    roadmap.
                  </div>
                  <label className="block">
                    <span className="text-sm font-bold">
                      USPTO registration number
                    </span>
                    <input
                      name="registrationNumber"
                      required
                      inputMode="numeric"
                      pattern="[0-9]+"
                      maxLength="12"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5"
                      placeholder="7654321"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold">Registration date</span>
                    <input
                      name="registrationDate"
                      type="date"
                      required
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold">
                      Official USPTO registration certificate
                    </span>
                    <input
                      name="registrationCertificate"
                      type="file"
                      accept="application/pdf,.pdf"
                      required
                      className="mt-2 block w-full rounded-xl border border-dashed border-emerald-300 bg-emerald-50 p-4 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-700 file:px-4 file:py-2 file:font-bold file:text-white"
                    />
                    <span className="mt-2 block text-xs text-slate-500">
                      Official PDF only · maximum 15 MB · stored privately
                    </span>
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold">Client note</span>
                    <textarea
                      name="message"
                      className="mt-2 min-h-24 w-full rounded-xl border border-slate-300 p-4"
                      placeholder="Your trademark is registered. Your official certificate is ready to download."
                    />
                  </label>
                </>
              )}
              {needsMessage && (
                <label className="block">
                  <span className="text-sm font-bold">
                    Personalized message to client
                  </span>
                  <textarea
                    name="message"
                    required
                    className="mt-2 min-h-32 w-full rounded-xl border border-slate-300 p-4"
                    placeholder="Explain the requirement or update clearly and professionally…"
                  />
                </label>
              )}
              {["requirement", "document", "payment"].includes(type) && (
                <label className="block">
                  <span className="text-sm font-bold">Due date</span>
                  <input
                    name="dueAt"
                    type="date"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5"
                  />
                </label>
              )}
              {result && (
                <p
                  className={`rounded-xl p-3 text-sm font-bold ${result.startsWith("Saved") ? "bg-emerald-50 text-emerald-700" : result.startsWith("Template") ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-700"}`}
                >
                  {result}
                </p>
              )}
              <button
                disabled={busy}
                className="w-full rounded-xl bg-[#006fbd] px-5 py-3.5 text-sm font-extrabold text-white disabled:opacity-60"
              >
                {busy
                  ? "Saving and notifying…"
                  : editingAppointment && type === "appointment"
                    ? "Update appointment and notify client"
                    : "Save and notify client"}
              </button>
            </form>
          )}
        </div>
      </aside>
    </div>
  );
}
