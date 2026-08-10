"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineCursorArrowRays, HiOutlinePause, HiOutlinePlay, HiOutlineQuestionMarkCircle, HiOutlineXMark } from "react-icons/hi2";

export default function PortalGuidedTour({ steps = [], audience = "portal", onStepChange }) {
  const [open,setOpen]=useState(false);
  const [index,setIndex]=useState(0);
  const [rect,setRect]=useState(null);
  const [playing,setPlaying]=useState(true);
  const changeRef=useRef(onStepChange);
  const dialogRef=useRef(null);
  const triggerRef=useRef(null);
  const step=steps[index];
  const finish=useCallback(()=>{setOpen(false);setPlaying(true);setIndex(0);try{localStorage.setItem(`lto_${audience}_tour_completed`,new Date().toISOString())}catch{}window.setTimeout(()=>triggerRef.current?.focus(),0)},[audience]);

  useEffect(()=>{changeRef.current=onStepChange},[onStepChange]);

  useEffect(()=>{
    if(!open||!step)return;
    changeRef.current?.(step,index);
    if(step.portalEvent)window.dispatchEvent(new CustomEvent("lto-portal-tour",{detail:step.portalEvent}));
    const activateTimer=window.setTimeout(()=>{
      if(!step.activateTarget)return;
      document.querySelector(`[data-tour="${step.target}"]`)?.click();
    },100);
    const locate=()=>{
      const target=document.querySelector(`[data-tour="${step.target}"]`);
      if(!target){setRect(null);return}
      target.scrollIntoView({behavior:"smooth",block:"center",inline:"nearest"});
      const box=target.getBoundingClientRect();
      if(box.width<1||box.height<1){setRect(null);return}
      setRect({top:Math.max(8,box.top-8),left:Math.max(8,box.left-8),width:Math.min(window.innerWidth-16,box.width+16),height:Math.min(window.innerHeight-16,box.height+16)});
    };
    const timer=window.setTimeout(locate,180);const settleTimer=window.setTimeout(locate,620);
    window.addEventListener("resize",locate);window.addEventListener("scroll",locate,{passive:true});
    return()=>{window.clearTimeout(activateTimer);window.clearTimeout(timer);window.clearTimeout(settleTimer);window.removeEventListener("resize",locate);window.removeEventListener("scroll",locate)};
  },[open,step,index]);

  useEffect(()=>{if(!open||!playing||steps.length<2)return;const timer=window.setTimeout(()=>{if(index<steps.length-1)setIndex(value=>value+1);else setPlaying(false)},5500);return()=>window.clearTimeout(timer)},[open,playing,index,steps.length]);
  useEffect(()=>{if(!open)return;const previous=document.activeElement;const focusTimer=window.setTimeout(()=>dialogRef.current?.querySelector("button")?.focus(),50);const close=(event)=>{if(event.key==="Escape"){event.preventDefault();finish();return}if(event.key!=="Tab"||!dialogRef.current)return;const focusable=[...dialogRef.current.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')];if(!focusable.length)return;const first=focusable[0];const last=focusable[focusable.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}};window.addEventListener("keydown",close);return()=>{window.clearTimeout(focusTimer);window.removeEventListener("keydown",close);if(previous instanceof HTMLElement)previous.focus()}},[finish,open]);
  useEffect(()=>{
    if(!open)return;
    const widgets=[document.getElementById("chat-widget"),document.getElementById("chat-widget-minimized")].filter(Boolean);
    const previous=widgets.map((widget)=>widget.style.visibility);
    widgets.forEach((widget)=>{widget.style.visibility="hidden"});
    return()=>widgets.forEach((widget,index)=>{widget.style.visibility=previous[index]||""});
  },[open]);
  useEffect(()=>{
    if(!open)return;
    const hover=(event)=>{
      const hoveredIndex=steps.findIndex((item)=>item.target===event.detail||item.hoverTarget===event.detail);
      if(hoveredIndex>=0&&hoveredIndex!==index){setPlaying(false);setIndex(hoveredIndex)}
    };
    window.addEventListener("lto-portal-tour-hover",hover);
    return()=>window.removeEventListener("lto-portal-tour-hover",hover);
  },[open,index,steps]);

  if(!steps.length)return null;
  return <>
    {!open&&<button ref={triggerRef} type="button" onClick={()=>{setIndex(0);setPlaying(true);setOpen(true)}} className="fixed bottom-5 right-5 z-30 inline-flex min-h-11 items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-3 text-xs font-extrabold text-[#027dd6] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-100"><HiOutlineQuestionMarkCircle className="text-lg"/><span className="hidden sm:inline">How to use this portal</span><span className="sm:hidden">Portal guide</span></button>}
    {open&&<div className="pointer-events-none fixed inset-0 z-[120]">
      <div className="pointer-events-none absolute inset-0 bg-slate-950/20"/>
      {rect&&<><div className="pointer-events-none fixed rounded-2xl border-2 border-white shadow-[0_0_0_9999px_rgba(15,23,42,0.62)] transition-all duration-700 ease-out" style={rect}/><span className="pointer-events-none fixed z-[122] grid h-10 w-10 place-items-center rounded-full bg-orange-500 text-xl text-white shadow-xl ring-4 ring-white transition-all duration-700 ease-out" style={{left:Math.min(window.innerWidth-52,rect.left+Math.min(rect.width-28,72)),top:Math.min(window.innerHeight-52,rect.top+Math.min(rect.height-28,72))}}><HiOutlineCursorArrowRays/></span></>}
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="portal-tour-title" aria-describedby="portal-tour-description" className="pointer-events-auto fixed bottom-4 left-4 right-4 z-[123] mx-auto max-w-md rounded-[22px] bg-white p-5 shadow-2xl sm:bottom-6 sm:left-6 sm:right-auto sm:mx-0 sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-extrabold uppercase tracking-[.16em] text-[#027dd6]">Guided portal tour · {index+1} of {steps.length}</p><h2 id="portal-tour-title" className="mt-2 text-xl font-extrabold text-slate-950">{step?.title}</h2></div><button type="button" onClick={finish} aria-label="Close guided tour" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-lg"><HiOutlineXMark/></button></div><p id="portal-tour-description" className="mt-3 text-sm leading-6 text-slate-600">{step?.description}</p><div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#027dd6] transition-all" style={{width:`${((index+1)/steps.length)*100}%`}}/></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3"><button type="button" onClick={()=>setPlaying(value=>!value)} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-extrabold text-slate-600">{playing?<><HiOutlinePause/>Pause</>:<><HiOutlinePlay/>Play</>}</button><div className="flex gap-2"><button type="button" disabled={index===0} onClick={()=>setIndex(value=>Math.max(0,value-1))} className="min-h-10 rounded-xl border border-slate-200 px-4 py-2 text-xs font-extrabold text-slate-700 disabled:opacity-40">Back</button>{index===steps.length-1?<button type="button" onClick={finish} className="min-h-10 rounded-xl bg-[#006fbd] px-4 py-2 text-xs font-extrabold text-white">Finish tour</button>:<button type="button" onClick={()=>setIndex(value=>Math.min(steps.length-1,value+1))} className="min-h-10 rounded-xl bg-[#006fbd] px-4 py-2 text-xs font-extrabold text-white">Next</button>}</div></div></section>
    </div>}
  </>;
}
