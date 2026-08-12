"use client";

import { useEffect, useRef, useState } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

/**
 * Confirmation gate for destructive or hard-to-reverse admin actions.
 *
 * `requireTyped` demands the operator types an exact phrase before the confirm
 * button enables — reserved for actions touching paid matters, so a mis-click
 * can never remove something with money attached.
 */
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "danger",
  requireTyped = "",
  requireReason = false,
  reasonLabel = "Reason (recorded in the audit log)",
  busy = false,
  error = "",
  onConfirm,
  onCancel,
}) {
  const [typed, setTyped] = useState("");
  const [reason, setReason] = useState("");
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setTyped("");
      setReason("");
      return;
    }
    // Move focus into the dialog so keyboard users are not left behind it.
    const timer = setTimeout(() => {
      (firstFieldRef.current || dialogRef.current)?.focus();
    }, 30);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape" && !busy) onCancel?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, busy, onCancel]);

  if (!open) return null;

  const typedOk = !requireTyped || typed.trim() === requireTyped;
  const reasonOk = !requireReason || reason.trim().length > 0;
  const canConfirm = typedOk && reasonOk && !busy;

  const confirmClass =
    tone === "danger"
      ? "bg-red-700 hover:bg-red-800"
      : "bg-[#006fbd] hover:bg-[#005f9f]";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl outline-none"
      >
        <div className="flex items-start gap-3">
          <span
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-xl ${
              tone === "danger"
                ? "bg-red-50 text-red-600"
                : "bg-blue-50 text-[#027dd6]"
            }`}
          >
            <HiOutlineExclamationTriangle />
          </span>
          <div className="min-w-0">
            <h2 id="confirm-dialog-title" className="text-lg font-extrabold text-slate-900">
              {title}
            </h2>
            {description && (
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{description}</p>
            )}
          </div>
        </div>

        {requireReason && (
          <label className="mt-4 block">
            <span className="text-xs font-bold text-slate-700">{reasonLabel}</span>
            <textarea
              ref={firstFieldRef}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={2}
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#027dd6] focus:ring-4 focus:ring-blue-50"
              placeholder="Why is this being done?"
            />
          </label>
        )}

        {requireTyped && (
          <label className="mt-4 block">
            <span className="text-xs font-bold text-slate-700">
              Type <b className="font-mono text-slate-900">{requireTyped}</b> to confirm
            </span>
            <input
              ref={requireReason ? undefined : firstFieldRef}
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#027dd6] focus:ring-4 focus:ring-blue-50"
              autoComplete="off"
            />
          </label>
        )}

        {error && (
          <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => onConfirm?.({ reason: reason.trim() })}
            disabled={!canConfirm}
            className={`rounded-xl px-4 py-2.5 text-sm font-extrabold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${confirmClass}`}
          >
            {busy ? "Working…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
