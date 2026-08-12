"use client";

import { useState } from "react";
import { HiOutlinePencilSquare, HiOutlineArchiveBox, HiOutlineUserMinus } from "react-icons/hi2";
import ConfirmDialog from "@/components/portal/ConfirmDialog";
import { PORTAL_PACKAGE_OPTIONS } from "@/constant/pricing";

const MARK_TYPES = ["Word mark", "Logo / design mark", "Slogan", "Sound mark"];

/**
 * Edit and deactivate controls for a client and their trademark matter.
 *
 * Every action reports its outcome explicitly: a saving state on the button, a
 * success banner naming what changed, or the exact error the server returned.
 * Destructive actions route through ConfirmDialog first.
 */
export default function CaseManagementPanel({ client, preview, onUpdated }) {
  const [editingCase, setEditingCase] = useState(false);
  const [editingClient, setEditingClient] = useState(false);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState(null); // { ok, text }
  const [confirm, setConfirm] = useState(null); // { kind }
  const [confirmError, setConfirmError] = useState("");

  const clientInactive = client.clientStatus === "inactive";

  const announce = (ok, text) => setFeedback({ ok, text });

  // Shared request helper so every call surfaces the server's own message
  // rather than a generic failure string.
  async function send(url, options) {
    const response = await fetch(url, options);
    let payload = {};
    try {
      payload = await response.json();
    } catch {
      // Non-JSON response (proxy error, timeout) — fall through to status text.
    }
    if (!response.ok || payload.error) {
      throw new Error(
        payload.error ||
          `The server rejected this request (${response.status}). Please try again.`,
      );
    }
    return payload;
  }

  async function saveCase(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    if (preview) {
      announce(true, "Preview mode: changes are not saved.");
      setEditingCase(false);
      return;
    }
    setBusy(true);
    setFeedback(null);
    try {
      const payload = await send(
        `/api/portal/admin/clients/${client.uid}/cases/${encodeURIComponent(client.caseId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            markName: form.get("markName"),
            markType: form.get("markType"),
            packageName: form.get("packageName"),
            owner: form.get("owner"),
          }),
        },
      );
      announce(true, payload.message || "Trademark matter updated.");
      setEditingCase(false);
      onUpdated?.();
    } catch (error) {
      announce(false, error.message);
    } finally {
      setBusy(false);
    }
  }

  async function saveClient(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    if (preview) {
      announce(true, "Preview mode: changes are not saved.");
      setEditingClient(false);
      return;
    }
    setBusy(true);
    setFeedback(null);
    try {
      const payload = await send(`/api/portal/admin/clients/${client.uid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          company: form.get("company"),
          phone: form.get("phone"),
        }),
      });
      announce(true, payload.message || "Client details updated.");
      setEditingClient(false);
      onUpdated?.();
    } catch (error) {
      announce(false, error.message);
    } finally {
      setBusy(false);
    }
  }

  async function runConfirmedAction({ reason }) {
    if (preview) {
      announce(true, "Preview mode: nothing was changed.");
      setConfirm(null);
      return;
    }
    setBusy(true);
    setConfirmError("");
    try {
      const query = new URLSearchParams();
      if (reason) query.set("reason", reason);

      let url;
      if (confirm.kind === "close-case") {
        url = `/api/portal/admin/clients/${client.uid}/cases/${encodeURIComponent(client.caseId)}?${query}`;
      } else if (confirm.kind === "reopen-case") {
        query.set("reopen", "true");
        url = `/api/portal/admin/clients/${client.uid}/cases/${encodeURIComponent(client.caseId)}?${query}`;
      } else if (confirm.kind === "deactivate-client") {
        url = `/api/portal/admin/clients/${client.uid}?${query}`;
      } else {
        query.set("reactivate", "true");
        url = `/api/portal/admin/clients/${client.uid}?${query}`;
      }

      const payload = await send(url, { method: "DELETE" });
      announce(true, payload.message || "Done.");
      setConfirm(null);
      onUpdated?.();
    } catch (error) {
      setConfirmError(error.message);
    } finally {
      setBusy(false);
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#027dd6] focus:ring-4 focus:ring-blue-50";
  const labelClass = "text-xs font-bold text-slate-700";

  const confirmCopy = {
    "close-case": {
      title: "Close this trademark matter?",
      description:
        "It will be removed from the active workload. Filing records, invoices and audit history are kept and it can be reopened at any time.",
      confirmLabel: "Close matter",
      requireReason: true,
    },
    "reopen-case": {
      title: "Reopen this trademark matter?",
      description: "It will return to the active workload for this client.",
      confirmLabel: "Reopen matter",
      tone: "primary",
    },
    "deactivate-client": {
      title: "Deactivate this client?",
      description:
        "They will no longer be able to sign in to the portal. No case data, documents or payment records are deleted, and access can be restored later.",
      confirmLabel: "Deactivate client",
      requireReason: true,
      requireTyped: client.name,
    },
    "reactivate-client": {
      title: "Reactivate this client?",
      description: "They will be able to sign in to the portal again.",
      confirmLabel: "Reactivate client",
      tone: "primary",
    },
  }[confirm?.kind] || {};

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#027dd6]">
            Manage record
          </p>
          <h3 className="mt-1 text-lg font-extrabold">Corrections and access</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Fix details captured at checkout, or withdraw portal access without
            deleting any legal record.
          </p>
        </div>
        {clientInactive && (
          <span className="rounded-full bg-slate-200 px-3 py-1.5 text-[10px] font-extrabold uppercase text-slate-700">
            Client deactivated
          </span>
        )}
      </div>

      {feedback && (
        <p
          role="status"
          className={`mt-4 rounded-xl border p-3 text-sm font-semibold ${
            feedback.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {feedback.text}
        </p>
      )}

      {/* ── Trademark matter ── */}
      <div className="mt-5 rounded-xl border border-slate-200 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-extrabold text-slate-900">Trademark matter</p>
          {!editingCase && (
            <button
              type="button"
              onClick={() => { setEditingCase(true); setFeedback(null); }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 px-3 py-2 text-xs font-extrabold text-[#027dd6]"
            >
              <HiOutlinePencilSquare /> Edit details
            </button>
          )}
        </div>

        {editingCase ? (
          <form onSubmit={saveCase} className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Trademark name</span>
              <input name="markName" defaultValue={client.mark || ""} required className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Mark type</span>
              <select name="markType" defaultValue={client.markType || MARK_TYPES[0]} className={inputClass}>
                {MARK_TYPES.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label className="block">
              <span className={labelClass}>Owner</span>
              <input name="owner" defaultValue={client.owner || client.company || ""} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Package</span>
              <select name="packageName" defaultValue={client.packageName || ""} className={inputClass}>
                <option value="">Not assigned</option>
                {PORTAL_PACKAGE_OPTIONS.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <div className="flex gap-2 sm:col-span-2">
              <button
                type="submit"
                disabled={busy}
                className="rounded-xl bg-[#006fbd] px-4 py-2.5 text-xs font-extrabold text-white disabled:opacity-60"
              >
                {busy ? "Saving…" : "Save changes"}
              </button>
              <button
                type="button"
                onClick={() => setEditingCase(false)}
                disabled={busy}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              ["Trademark", client.mark],
              ["Type", client.markType],
              ["Owner", client.owner || client.company],
              ["Package", client.packageName || "Not assigned"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-slate-50 p-3">
                <dt className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">{label}</dt>
                <dd className="mt-0.5 text-sm font-bold text-slate-900">{value || "—"}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-4 border-t border-slate-100 pt-3">
          {client.archived ? (
            <button
              type="button"
              onClick={() => { setConfirm({ kind: "reopen-case" }); setConfirmError(""); }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 px-3 py-2 text-xs font-extrabold text-[#027dd6]"
            >
              <HiOutlineArchiveBox /> Reopen matter
            </button>
          ) : (
            <button
              type="button"
              onClick={() => { setConfirm({ kind: "close-case" }); setConfirmError(""); }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-extrabold text-red-700"
            >
              <HiOutlineArchiveBox /> Close matter
            </button>
          )}
        </div>
      </div>

      {/* ── Client record ── */}
      <div className="mt-4 rounded-xl border border-slate-200 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-extrabold text-slate-900">Client contact</p>
          {!editingClient && (
            <button
              type="button"
              onClick={() => { setEditingClient(true); setFeedback(null); }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 px-3 py-2 text-xs font-extrabold text-[#027dd6]"
            >
              <HiOutlinePencilSquare /> Edit contact
            </button>
          )}
        </div>

        {editingClient ? (
          <form onSubmit={saveClient} className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Full name</span>
              <input name="name" defaultValue={client.name || ""} required className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Company</span>
              <input name="company" defaultValue={client.company || ""} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Phone</span>
              <input name="phone" defaultValue={client.phone || ""} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Login email</span>
              <input
                value={client.email || ""}
                readOnly
                disabled
                className={`${inputClass} cursor-not-allowed bg-slate-100 text-slate-500`}
              />
              <span className="mt-1 block text-[10px] text-slate-500">
                The login email is the account identity and cannot be changed here.
              </span>
            </label>
            <div className="flex gap-2 sm:col-span-2">
              <button
                type="submit"
                disabled={busy}
                className="rounded-xl bg-[#006fbd] px-4 py-2.5 text-xs font-extrabold text-white disabled:opacity-60"
              >
                {busy ? "Saving…" : "Save changes"}
              </button>
              <button
                type="button"
                onClick={() => setEditingClient(false)}
                disabled={busy}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              ["Name", client.name],
              ["Company", client.company],
              ["Phone", client.phone],
              ["Login email", client.email],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-slate-50 p-3">
                <dt className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">{label}</dt>
                <dd className="mt-0.5 break-all text-sm font-bold text-slate-900">{value || "—"}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-4 border-t border-slate-100 pt-3">
          {clientInactive ? (
            <button
              type="button"
              onClick={() => { setConfirm({ kind: "reactivate-client" }); setConfirmError(""); }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 px-3 py-2 text-xs font-extrabold text-[#027dd6]"
            >
              <HiOutlineUserMinus /> Reactivate client
            </button>
          ) : (
            <button
              type="button"
              onClick={() => { setConfirm({ kind: "deactivate-client" }); setConfirmError(""); }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-extrabold text-red-700"
            >
              <HiOutlineUserMinus /> Deactivate client
            </button>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(confirm)}
        busy={busy}
        error={confirmError}
        onCancel={() => { setConfirm(null); setConfirmError(""); }}
        onConfirm={runConfirmedAction}
        tone={confirmCopy.tone || "danger"}
        title={confirmCopy.title || ""}
        description={confirmCopy.description || ""}
        confirmLabel={confirmCopy.confirmLabel || "Confirm"}
        requireReason={Boolean(confirmCopy.requireReason)}
        requireTyped={confirmCopy.requireTyped || ""}
      />
    </section>
  );
}
