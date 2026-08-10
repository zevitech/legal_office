"use client";

import { useEffect, useState } from "react";
import { HiOutlineCreditCard } from "react-icons/hi2";

const blank = { name:"", email:"", phone:"", address1:"", address2:"", city:"", state:"", zip:"", country:"United States" };

export default function BillingProfileManager({ user, demoKey = "" }) {
  const [profile,setProfile]=useState({...blank,name:user?.name||"",email:user?.email||""});
  const [methods,setMethods]=useState([]);
  const [busy,setBusy]=useState(false);
  const [result,setResult]=useState("");

  useEffect(()=>{
    let active=true;
    if(demoKey){
      setProfile({name:user?.name||"Alex North",email:user?.email||"alex@example.com",phone:"+1 (310) 555-0147",address1:"128 Market Street",address2:"Suite 400",city:"Los Angeles",state:"CA",zip:"90012",country:"United States"});
      setMethods([{id:"demo-vault",cardBrand:"Visa",lastFour:"4242"}]);
      return()=>{active=false};
    }
    Promise.all([fetch("/api/portal/billing-profile",{cache:"no-store"}),fetch("/api/portal/billing-methods",{cache:"no-store"})]).then(async([profileResponse,methodResponse])=>{
      const profileData=profileResponse.ok?await profileResponse.json():{};
      const methodData=methodResponse.ok?await methodResponse.json():{};
      if(active){if(profileData.profile)setProfile(profileData.profile);setMethods(methodData.methods||[])}
    }).catch(()=>{});
    return()=>{active=false};
  },[demoKey,user]);

  function field(name){return{value:profile[name]||"",onChange:event=>setProfile(current=>({...current,[name]:event.target.value}))}}

  async function save(event){
    event.preventDefault();setBusy(true);setResult("");
    try{
      if(demoKey){await new Promise(resolve=>setTimeout(resolve,350));setResult("Billing profile updated in this demo.");return}
      const response=await fetch("/api/portal/billing-profile",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(profile)});
      const payload=await response.json();
      if(!response.ok)throw new Error(payload.error||"Unable to update billing profile.");
      setResult("Billing profile updated securely.");
    }catch(error){setResult(error.message||"Unable to update billing profile.")}finally{setBusy(false)}
  }

  async function removeMethod(method){
    if(!window.confirm("Do you want to remove this saved payment method?"))return;
    setBusy(true);setResult("");
    try{
      if(!demoKey){
        const response=await fetch(`/api/portal/billing-methods/${method.id}`,{method:"DELETE"});
        const payload=await response.json();
        if(!response.ok)throw new Error(payload.error||"Unable to update the saved method.");
      }
      setMethods(items=>items.filter(item=>item.id!==method.id));
      setResult("Saved payment method removed securely.");
    }catch(error){setResult(error.message||"Unable to update the saved method.")}finally{setBusy(false)}
  }

  return <section className="space-y-5 rounded-[24px] border border-blue-200 bg-white p-5 shadow-sm sm:p-7">
    <div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-xl text-[#027dd6]"><HiOutlineCreditCard/></span><div><p className="text-xs font-extrabold uppercase tracking-wider text-[#027dd6]">Billing profile &amp; saved card</p><h2 className="mt-1 text-xl font-extrabold">Manage your billing details</h2><p className="mt-1 text-sm leading-6 text-slate-600">Update billing contact details and manage the default card saved securely from checkout. Full card numbers and CVV never enter this portal.</p></div></div>
    <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
      <label className="text-xs font-bold text-slate-700">Billing name<input required {...field("name")} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"/></label>
      <label className="text-xs font-bold text-slate-700">Login / receipt email<input value={profile.email||""} disabled className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500"/></label>
      <label className="text-xs font-bold text-slate-700">Phone<input {...field("phone")} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"/></label>
      <label className="text-xs font-bold text-slate-700">Country<input required {...field("country")} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"/></label>
      <label className="text-xs font-bold text-slate-700 sm:col-span-2">Address<input required {...field("address1")} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"/></label>
      <label className="text-xs font-bold text-slate-700 sm:col-span-2">Address line 2<input {...field("address2")} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"/></label>
      <label className="text-xs font-bold text-slate-700">City<input required {...field("city")} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"/></label>
      <div className="grid grid-cols-2 gap-3"><label className="text-xs font-bold text-slate-700">State<input required {...field("state")} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"/></label><label className="text-xs font-bold text-slate-700">ZIP<input required {...field("zip")} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"/></label></div>
      <button disabled={busy} className="rounded-xl bg-[#006fbd] px-5 py-3 text-sm font-extrabold text-white sm:col-span-2">{busy?"Saving…":"Update billing profile"}</button>
    </form>
    <div className="border-t border-slate-100 pt-5"><h3 className="font-extrabold">Default payment method</h3>{methods.length?<div className="mt-3 space-y-3">{methods.map(method=><article key={method.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><p className="font-extrabold">{method.cardBrand||"Card"} ending {method.lastFour||"••••"}</p><p className="mt-1 text-xs text-slate-600">Saved securely from checkout for faster approved payments.</p></div><button disabled={busy} onClick={()=>removeMethod(method)} className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-extrabold text-red-700">Remove saved card</button></div></article>)}</div>:<p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">No saved card. You may securely save one during your next portal payment.</p>}</div>
    {result&&<p className="rounded-xl bg-blue-50 p-3 text-sm font-bold text-[#027dd6]">{result}</p>}
  </section>;
}
