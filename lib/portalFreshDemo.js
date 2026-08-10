const DEMO_PROFILES = [
  { firstName: "Olivia", lastName: "Bennett", company: "Summit Roasters LLC", markName: "Summit Roasters", state: "Colorado", activities: ["Coffee roasting", "Online retail coffee store", "Café services"] },
  { firstName: "Ethan", lastName: "Brooks", company: "Cedar Trail Outfitters LLC", markName: "Cedar Trail", state: "Washington", activities: ["Outdoor apparel", "Online retail store services", "Travel bags and equipment"] },
  { firstName: "Sophia", lastName: "Martinez", company: "Lumen House Studio LLC", markName: "Lumen House", state: "Texas", activities: ["Interior design services", "Home décor retail", "Design consulting"] },
  { firstName: "Noah", lastName: "Carter", company: "Brightline Analytics Inc.", markName: "Brightline Analytics", state: "New York", activities: ["Business analytics software", "Data consulting", "Software as a service"] },
  { firstName: "Ava", lastName: "Collins", company: "Wild Bloom Skincare LLC", markName: "Wild Bloom", state: "Florida", activities: ["Cosmetics and skincare", "Online retail store services", "Beauty consultation"] },
];

function seedNumber(seed) {
  return Array.from(String(seed || "demo")).reduce((total, character) => ((total * 31) + character.charCodeAt(0)) >>> 0, 7);
}

export function createFreshDemoClient(seed) {
  const safeSeed = String(seed || Date.now().toString(36)).toLowerCase().replace(/[^a-z0-9]/g, "").slice(-14) || "demo";
  const profile = DEMO_PROFILES[seedNumber(safeSeed) % DEMO_PROFILES.length];
  const suffix = safeSeed.slice(-6).padStart(6, "0");
  const caseSuffix = String(seedNumber(safeSeed)).slice(-6).padStart(6, "0");
  const email = `demo+${safeSeed}@legaltrademarkoffice.example`;
  const password = `Fresh-${suffix}!A9`;
  const name = `${profile.firstName} ${profile.lastName}`;
  const caseId = `LTO-DEMO-${caseSuffix}`;
  return {
    key: `fresh-${safeSeed}`,
    password,
    user: { uid: `preview-${safeSeed}`, name, email, role: "client" },
    case: {
      id: caseId,
      markName: profile.markName,
      company: profile.company,
      markType: "Word mark",
      stage: "Application received",
      progress: 12,
      packageName: "Advanced",
      orderTotal: 249,
      openTasks: 0,
      appointment: "To be scheduled",
      appointmentTime: "",
      consultationStatus: "pending",
      clearanceReportStatus: "pending",
      classificationPaymentStatus: "not_requested",
      selectedClasses: [],
      assignedAttorney: { uid: "attorney-danish", name: "Danish Khan", title: "Trademark attorney", email: "danish@legaltrademarkoffice.com" },
      applicationDetails: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        emailAddress: email,
        phoneNumber: "+1 (555) 014-2026",
        address: "125 Market Street",
        city: "Springfield",
        state: profile.state,
        zipCode: "10001",
        ownerType: "Limited liability company",
        organizationType: "LLC",
        organizationName: profile.company,
        stateFormation: profile.state,
        countryFormation: "United States",
        organizationPosition: "Managing member",
        trademarkCurrentlyBeingUsed: "Yes",
        firstAnywhereDate: "2026-01-10",
        firstCommenceDate: "2026-02-01",
        protectionTypes: ["Name"],
        selectedActivities: profile.activities,
        estimatedClassCount: 0,
        reviewPreference: "Attorney to finalize classes",
      },
    },
  };
}

export function freshDemoFromPreviewKey(previewKey) {
  if (!String(previewKey || "").startsWith("fresh-")) return null;
  return createFreshDemoClient(String(previewKey).slice(6));
}

export function freshDemoSeedFromEmail(email) {
  const match = String(email || "").toLowerCase().match(/^demo\+([a-z0-9]+)@legaltrademarkoffice\.example$/);
  return match?.[1] || "";
}
