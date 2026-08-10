const demoActivity = {
  northstar: [
    { id: "demo-strategy-call", caseId: "LTO-2026-08147", type: "appointment", title: "Mandatory trademark consultation", message: "The required trademark application review call was completed. Your attorney may now prepare and share the search and clearance report.", appointmentAt: "2026-08-10T18:30:00.000Z", appointmentStatus: "completed", meetingType: "google_meet", meetingUrl: "https://meet.google.com/", read: true, createdAt: "2026-08-07T17:00:00.000Z" },
    { id: "demo-clearance-report", caseId: "LTO-2026-08147", type: "clearance_report", title: "Attorney search and clearance report", message: "Your attorney completed the manual search and clearance review. Four proposed classifications are ready for review.", selectedClasses: ["Class 9 — Downloadable business software", "Class 35 — Advertising and business consulting", "Class 41 — Business training and educational workshops", "Class 42 — Website and software design"], classCount: 4, read: true, createdAt: "2026-08-07T16:55:00.000Z" },
    { id: "demo-class-payment", invoiceId: "demo-class-invoice", caseId: "LTO-2026-08147", type: "payment", paymentKind: "classification_fees", title: "Approved USPTO classification fees", message: "These four itemized classifications match the attorney's search and clearance report. Review each amount before paying.", amount: 1475, classCount: 4, classificationFees: [{ description: "Class 9 — Downloadable business software", amount: 350 }, { description: "Class 35 — Advertising and business consulting", amount: 350 }, { description: "Class 41 — Business training and educational workshops", amount: 350 }, { description: "Class 42 — Website and software design", amount: 425 }], selectedClasses: ["Class 9 — Downloadable business software", "Class 35 — Advertising and business consulting", "Class 41 — Business training and educational workshops", "Class 42 — Website and software design"], dueAt: "2026-08-16", taskStatus: "pending", paymentStatus: "due", read: false, createdAt: "2026-08-07T16:50:00.000Z" },
  ],
  asteria: [
    { id: "demo-asteria-call", caseId: "LTO-2026-08132", type: "appointment", title: "Final approval call", message: "Review the application before filing.", appointmentAt: "2026-08-12T21:00:00.000Z", appointmentStatus: "scheduled", meetingType: "phone", phoneNumber: "+1 (310) 424-4909", read: true, createdAt: "2026-08-07T17:00:00.000Z" },
  ],
  journey: [],
};

export function getPortalDemoActivity(key) {
  return (demoActivity[key] || (String(key || "").startsWith("fresh-") ? [] : demoActivity.northstar)).map((item) => ({ ...item }));
}
