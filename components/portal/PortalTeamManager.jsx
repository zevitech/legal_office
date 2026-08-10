"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineCheckBadge, HiOutlinePlus, HiOutlineUserCircle } from "react-icons/hi2";

// Preview mode has no session and no database, so it renders a fixed sample
// team purely to demonstrate the layout. Authenticated mode always shows the
// real portalAttorneys records.
const previewAttorneys = [
  { id: "danish", name: "Danish Khan", email: "danish@legaltrademarkoffice.example", title: "Managing attorney", phone: "+1 (310) 424-4909", bio: "Client strategy, filings and attorney operations." },
  { id: "jordan", name: "Jordan Mitchell", email: "jordan@legaltrademarkoffice.example", title: "Trademark attorney", phone: "+1 (310) 424-4909", bio: "Trademark clearance, prosecution and portfolio support." },
];

const initials = (value = "") => value.trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "?";

export default function PortalTeamManager({ preview, currentUser }) {
  const [attorneys, setAttorneys] = useState(preview ? previewAttorneys : []);
  const [loading, setLoading] = useState(!preview);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (preview) return;
    try {
      const response = await fetch("/api/portal/admin/attorneys", { cache: "no-store" });
      if (!response.ok) throw new Error();
      setAttorneys((await response.json()).attorneys || []);
      setError("");
    } catch {
      setError("The attorney list could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [preview]);

  useEffect(() => { load(); }, [load]);

  // The signed-in staff member may hold the role claim without a saved profile
  // document. Surface them anyway so they can complete it.
  const hasOwnProfile = attorneys.some((item) => item.id === currentUser?.uid);
  const rows = !preview && currentUser && !hasOwnProfile && !loading
    ? [{ id: currentUser.uid, name: currentUser.name || currentUser.email, email: currentUser.email, title: "", phone: "", bio: "", incomplete: true }, ...attorneys]
    : attorneys;

  async function saveAttorney(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const record = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      title: String(form.get("title") || "Trademark attorney"),
      phone: String(form.get("phone") || ""),
      bio: String(form.get("bio") || ""),
    };
    if (preview) {
      setAttorneys((items) => editing ? items.map((item) => item.id === editing.id ? { ...item, ...record } : item) : [...items, { ...record, id: crypto.randomUUID() }]);
    } else {
      const response = await fetch("/api/portal/admin/attorneys", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing ? { ...record, id: editing.id } : record),
      });
      if (!response.ok) {
        setError((await response.json().catch(() => ({})))?.error || "Unable to save the attorney profile.");
        return;
      }
      await load();
    }
    setError("");
    setNotice(editing ? "Attorney profile updated." : "Attorney added with full case access. A secure setup email was queued.");
    setAdding(false);
    setEditing(null);
  }

  const modalOpen = adding || editing;
  return (
    <main className="min-h-screen bg-[#f4f7fa] px-5 py-8 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <Link href={preview ? "/portal-admin?preview=1" : "/portal-admin"} className="inline-flex items-center gap-2 text-sm font-bold text-[#027dd6]"><HiOutlineArrowLeft /> Back to case management</Link>
        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-extrabold uppercase tracking-wider text-[#027dd6]">Attorney administration</p><h1 className="mt-2 text-3xl font-extrabold">Team access and profiles</h1><p className="mt-2 text-sm text-slate-600">Every active attorney can manage all clients, requirements, messages and appointments.</p></div>
          {currentUser?.role === "admin" && <button onClick={() => { setAdding(true); setNotice(""); setError(""); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#006fbd] px-5 py-3.5 text-sm font-extrabold text-white"><HiOutlinePlus /> Add attorney</button>}
        </div>
        {preview && <p className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-bold text-amber-900">Preview mode: this sample team is illustrative. No account is created and nothing is saved.</p>}
        {notice && <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm font-bold text-emerald-800">{notice}</p>}
        {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700">{error}</p>}
        {loading ? <p className="mt-7 rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm font-bold text-slate-500">Loading the attorney team…</p> : (
          <section className="mt-7 grid gap-5 md:grid-cols-2">
            {rows.map((attorney) => <article key={attorney.id} className={`rounded-2xl border bg-white p-6 shadow-sm ${attorney.incomplete ? "border-amber-300" : "border-slate-200"}`}>
              <div className="flex items-start gap-4"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#027dd6] text-xl font-extrabold text-white">{initials(attorney.name)}</span><div className="min-w-0"><div className="flex items-center gap-2"><h2 className="font-extrabold">{attorney.name}</h2>{!attorney.incomplete && <HiOutlineCheckBadge className="text-lg text-emerald-600" />}</div><p className="text-sm font-semibold text-[#027dd6]">{attorney.title || "Profile not completed"}</p><p className="mt-2 break-all text-xs text-slate-500">{attorney.email}</p>{attorney.phone && <p className="mt-1 text-xs text-slate-500">{attorney.phone}</p>}</div></div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{attorney.bio || "Add a title, phone number and practice focus so clients see who is handling their matter."}</p>
              <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-3"><span className={`text-xs font-bold ${attorney.incomplete ? "text-amber-700" : "text-emerald-700"}`}>{attorney.incomplete ? "Your account · Profile incomplete" : "Active · Full case access"}</span><button onClick={() => { setEditing(attorney); setNotice(""); setError(""); }} className="text-xs font-bold text-[#027dd6]">Edit profile</button></div>
            </article>)}
            {!rows.length && <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-bold text-slate-500 md:col-span-2">No attorney profiles yet. Use “Add attorney” to grant access.</p>}
          </section>
        )}
        {modalOpen && <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/40 p-4"><form onSubmit={saveAttorney} className="my-6 w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><div><HiOutlineUserCircle className="text-3xl text-[#027dd6]" /><h2 className="mt-2 text-xl font-extrabold">{editing ? "Edit attorney profile" : "Add another attorney"}</h2></div><button type="button" onClick={() => { setAdding(false); setEditing(null); }} className="text-xl">×</button></div>
          {[["name", "Full name", "Jordan Mitchell"], ["email", "Work email", "jordan@firm.com"], ["title", "Professional title", "Trademark attorney"], ["phone", "Phone", "+1 …"]].map(([name, label, placeholder]) => <label key={name} className="block"><span className="text-sm font-bold">{label}</span><input name={name} type={name === "email" ? "email" : "text"} required={name !== "phone"} defaultValue={editing?.[name] || ""} readOnly={Boolean(editing && name === "email")} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5 read-only:bg-slate-100" /></label>)}
          <label className="block"><span className="text-sm font-bold">Professional bio</span><textarea name="bio" rows="3" defaultValue={editing?.bio || ""} placeholder="Practice focus and client responsibilities" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3.5" /></label>
          <button className="w-full rounded-xl bg-[#006fbd] px-5 py-3.5 text-sm font-extrabold text-white">{editing ? "Save profile" : "Grant attorney access"}</button>
        </form></div>}
      </div>
    </main>
  );
}
