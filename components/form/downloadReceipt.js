import { ADD_ON_PRICES } from "@/constant/pricing";

// Native PDF text stays selectable and avoids screenshot/font clipping.
export async function downloadReceipt({ order, packageName, total, receiptId, customerName, email, demo }) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const money = value => Number(value || 0).toFixed(2);
  let y = 25;
  const line = (text, size = 11, bold = false) => {
    pdf.setFont("helvetica", bold ? "bold" : "normal"); pdf.setFontSize(size);
    const wrapped = pdf.splitTextToSize(String(text), 170);
    for (const part of wrapped) {
      if (y > 270) { pdf.addPage(); y = 22; }
      pdf.text(part, 20, y); y += size * 0.48 + 2;
    }
  };
  pdf.setFillColor(0,125,213); pdf.rect(0,0,210,4,"F");
  pdf.setFillColor(239,247,255); pdf.rect(0,4,210,41,"F");
  pdf.setTextColor(15,57,95); line("Legal Trademark Office",21,true);
  line(demo ? "DEMO RECEIPT - NO PAYMENT TAKEN" : "PAYMENT RECEIPT",11,true);
  y=57; pdf.setTextColor(35,45,60);
  line(`Order reference: ${receiptId}`);
  const paidAt = order?.paidAt && new Date(order.paidAt);
  line(`Payment date: ${paidAt && !Number.isNaN(paidAt.getTime()) ? paidAt.toISOString().replace("T"," ").slice(0,19) + " UTC" : "See payment confirmation email"}`);
  line(`Customer: ${customerName}`); if(email)line(`Email: ${email}`);
  y+=8;
  pdf.setFillColor(239,247,255); pdf.rect(20,y-5,170,12,"F");
  pdf.setFont("helvetica","bold");pdf.setFontSize(9);
  pdf.text("SERVICE DESCRIPTION",24,y+3);
  pdf.text("AMOUNT (USD)",186,y+3,{align:"right"});
  y+=17;
  const labels={rush:"Rush preparation",monitoring:"12-month trademark monitoring",specimenReview:"Specimen readiness review"};
  const addons=[...new Set(order?.addons || [])].filter(key=>Object.hasOwn(ADD_ON_PRICES,key));
  const addonTotal=addons.reduce((sum,key)=>sum+ADD_ON_PRICES[key],0);
  const row = (label, amount) => {
    pdf.setFont("helvetica","normal");pdf.setFontSize(10);
    const lines=pdf.splitTextToSize(label,125);
    pdf.text(lines,24,y);
    pdf.setFont("helvetica","bold");pdf.text(`$${money(amount)}`,186,y,{align:"right"});
    y+=lines.length*5+5;
    pdf.setDrawColor(220,230,240);pdf.line(20,y-3,190,y-3);y+=5;
  };
  row(`${packageName} service package`,Number(total)-addonTotal);
  addons.forEach(key=>row(labels[key],ADD_ON_PRICES[key]));
  y+=3;
  pdf.setFillColor(239,247,255);pdf.roundedRect(105,y-4,85,23,2,2,"F");
  pdf.setFont("helvetica","bold");pdf.setFontSize(9);pdf.text(demo ? "DEMO TOTAL" : "TOTAL PAID",110,y+3);
  pdf.setFontSize(18);pdf.setTextColor(0,125,213);pdf.text(`$${money(total)}`,185,y+13,{align:"right"});
  pdf.setTextColor(35,45,60);y+=31;
  y+=8;line("USPTO filing fees are separate",11,true);
  line("Government filing fees are not included in this payment. Classes and applicable fees are confirmed before filing.",10);
  y+=8;line("Card statement descriptor: XTARLABS LLC",10,true);
  if (demo) line("Preview only. No card was charged or confirmation email sent.",10);
  line("legaltrademarkoffice.com | +1 (310) 424-4909",10);
  pdf.setDrawColor(220,230,240);pdf.line(20,275,190,275);
  pdf.setFontSize(9);pdf.text("Thank you for choosing Legal Trademark Office. Keep this receipt for your records.",20,282);
  pdf.save(`LTO-receipt-${String(receiptId).replace(/[^a-z0-9_-]/gi,"-")}.pdf`);
}
