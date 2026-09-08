"use client";
import { useState } from "react";
import styles from "./PackageComparison.module.css";

export const REVIEW_PLANS = [
  {id:1, planName:"Individual", price:49, benefit:"Basic federal search · 7 business days", description:"Essential preparation for a straightforward filing."},
  {id:3, planName:"Small Business", price:149, benefit:"Federal & state search · 3 months monitoring", description:"Broader search coverage and a paralegal completeness review."},
  {id:2, planName:"Business Plus", price:249, benefit:"Office-action response · 6 months monitoring", description:"Office-action response, 6 months of monitoring and deadline tracking."},
  {id:4, planName:"Corporate", price:649, benefit:"Broader search · Specialist · Specimen review · 12 months monitoring", description:"Adds common-law search, a dedicated specialist, specimen review and 12 months of monitoring."},
];
const rows = [
  ["Trademark search",["Basic federal screening","Federal & state similarity search","Federal & state similarity search","Federal, state & common-law search"],"Checks for existing marks that could conflict with your name, logo or slogan. Corporate adds business-name use and common online marketplace sources."],
  ["Preparation time",["7 business days","3 business days","24–48 hours","1 business day"],"Preparation starts after complete information and approvals. This is not the USPTO examination timeline."],
  ["Review & support",["Specialist preparation","Paralegal completeness review","Guided paralegal support","Dedicated filing specialist"],"Your team checks the application and explains next steps. Higher plans add guided support or a dedicated point of contact."],
  ["Class mapping",["Included","Included","Included","Included"],"Review of your business activities to identify relevant classes and goods-and-services descriptions. Government fees are separate."],
  ["Specimen review",["–","–","–","One specimen readiness review"],"Review of one proof-of-use specimen for common presentation and formatting issues before filing."],
  ["Trademark monitoring",["–","3 months","6 months","12 months"],"Alerts about potentially similar trademark filings during the included period. Enforcement work is not included."],
  ["Office-action response",["–","Guidance only","Response included","Response included"],"Business Plus and Corporate include response preparation for USPTO office actions. Small Business includes an explanation of the notice and next steps."],
  ["Deadline tracking",["–","–","Through first examination","Through first examination"],"Application status checks and reminders of USPTO response deadlines through first examination."],
];
const ribbons=["ESSENTIAL PREPARATION","BROADER SCREENING","RECOMMENDED","MOST COMPREHENSIVE"];
export default function PackageComparison({selectedId,onSelect,onContinue,onBack,loading}) {
  const [expanded,setExpanded]=useState(2);
  const selected=REVIEW_PLANS.find(plan=>plan.id===selectedId)||REVIEW_PLANS[2];
  const choose=(plan)=><button type="button" className={styles.choose} aria-pressed={selectedId===plan.id} onClick={()=>onSelect(plan.id)}>{selectedId===plan.id?"✓ Selected":`Select ${plan.planName}`}</button>;
  return <section className={`system-page-standard-layout ${styles.root}`} aria-label="Choose your service package">
    <div className={styles.included}><span>✓ Application preparation</span><span>✓ Class mapping in every plan</span><span>✓ Secure client portal</span></div>
    <div className={styles.desktop}><table className={styles.table}><caption className="sr-only">Compare all four service packages</caption><thead><tr><th scope="col">Compare your level of support</th>{REVIEW_PLANS.map((plan,i)=><th scope="col" key={plan.id} className={selectedId===plan.id?styles.selected:""}><div className={`${styles.ribbon} ${i===2?styles.recommended:""}`}>{ribbons[i]}</div><h2>{plan.planName}</h2><p>{plan.description}</p><strong className={styles.price}>${plan.price}</strong><small>One-time service fee<br/>Government fees separate</small>{choose(plan)}</th>)}</tr></thead><tbody>{rows.map(([label,values,description])=><tr key={label}><th scope="row">{label}<details><summary>Details</summary><p>{description}</p></details></th>{values.map((value,i)=><td key={i} className={selectedId===REVIEW_PLANS[i].id?styles.selected:""}><span aria-label={value==="–"?"Not included":undefined}>{value}</span></td>)}</tr>)}</tbody></table></div>
    <div className={styles.mobile}>{REVIEW_PLANS.map((plan,i)=><article key={plan.id} className={`${styles.card} ${selectedId===plan.id?styles.selectedCard:""}`}>
      {i===2&&<div className={`${styles.ribbon} ${styles.recommended}`}>Recommended · Business Plus</div>}
      <h2><button type="button" className={styles.expand} aria-expanded={expanded===plan.id} aria-controls={`package-${plan.id}`} onClick={()=>setExpanded(expanded===plan.id?null:plan.id)}><span>{plan.planName}</span><strong>${plan.price}</strong><small>{plan.benefit}</small><span aria-hidden="true">{expanded===plan.id?"−":"+"}</span>{selectedId===plan.id&&<small className={styles.selectedLabel}>✓ Your selected package</small>}</button></h2>
      <div id={`package-${plan.id}`} hidden={expanded!==plan.id} className={styles.content}><p>One-time service fee · USPTO fees separate</p><dl>{rows.map(([label,values])=><div key={label}><dt>{label}</dt><dd aria-label={values[i]==="–"?"Not included":undefined}>{values[i]}</dd></div>)}</dl><details><summary>Read full service descriptions +</summary>{rows.filter(([,values])=>values[i]!=="–").map(([label,,description])=><p key={label}><strong>{label}</strong><br/>{description}</p>)}</details>{choose(plan)}</div>
    </article>)}</div>
    <p className={styles.fees}>USPTO fees: $350 per class, charged separately.</p>
    <div className={styles.bottom}><button type="button" className={styles.back} onClick={onBack}>Previous</button><div aria-live="polite"><strong>{selected.planName} selected</strong><small>${selected.price} service fee today</small></div><button type="button" disabled={loading} className={styles.continue} onClick={()=>onContinue(selected)}>{loading?"Continuing…":<>Continue<span className={styles.desktopText}> with {selected.planName}</span> →</>}</button></div>
  </section>;
}
