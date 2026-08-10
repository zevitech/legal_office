import crypto from "crypto";
import { NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";

const allowed = new Set([
  "Protect your logo",
  "Professional logo design",
  "Specimen preparation",
  "Trademark monitoring",
  "Business presence",
  "Register a domain",
  "Marketing growth",
]);

const DAY_MS = 24 * 60 * 60 * 1000;
const CACHE_MS = 30 * DAY_MS;

function eligible({ markType, stage, hasSpecimenRequirement }) {
  const titles = [];
  if (/word|name/i.test(markType)) titles.push("Protect your logo", "Professional logo design");
  if (hasSpecimenRequirement) titles.push("Specimen preparation");
  if (/filed|registered|publication|examination/i.test(stage)) titles.push("Trademark monitoring");
  titles.push("Business presence", "Register a domain", "Marketing growth");
  return [...new Set(titles)].filter((title) => allowed.has(title)).slice(0, 3);
}

function ruleRecommendations(titles) {
  return titles.map((title) => ({
    title,
    reason:
      title === "Protect your logo"
        ? "Your current name mark may not separately protect the visual logo customers recognize."
        : title === "Professional logo design"
          ? "Build a distinctive visual identity before considering a separate logo application."
          : title === "Specimen preparation"
            ? "Your current case includes a proof-of-use or specimen requirement."
            : title === "Trademark monitoring"
              ? "Monitor new filings while your trademark matter progresses."
              : title === "Business presence"
                ? "Strengthen the public presence connected with your brand."
                : title === "Register a domain"
                  ? "Secure a domain aligned with the brand you are protecting."
                  : "Build qualified visibility around your protected brand.",
  }));
}

function ageInMs(value) {
  const milliseconds = typeof value?.toMillis === "function" ? value.toMillis() : new Date(value || 0).getTime();
  return Date.now() - milliseconds;
}

export async function POST(request) {
  if (!isTrustedPortalOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  const user = await getPortalUser();
  if (!user || user.role !== "client") {
    return NextResponse.json({ error: "Client access required." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const context = {
      caseId: String(body.caseId || "primary").slice(0, 120),
      markType: String(body.markType || "").slice(0, 80),
      stage: String(body.stage || "").slice(0, 100),
      hasSpecimenRequirement: Boolean(body.hasSpecimenRequirement),
    };
    const titles = eligible(context);
    const fallback = ruleRecommendations(titles);
    const key = process.env.OPENAI_API_KEY;
    const enabled = process.env.OPENAI_PORTAL_AI_ENABLED === "true";
    const db = getAdminFirestore();

    // AI is opt-in, and Firestore is required so an uncached page refresh can never spend repeatedly.
    if (!key || !enabled || !db) {
      return NextResponse.json({ recommendations: fallback, source: "rules" });
    }

    const contextHash = crypto.createHash("sha256").update(JSON.stringify(context)).digest("hex");
    const caseKey = crypto.createHash("sha256").update(context.caseId).digest("hex").slice(0, 24);
    const clientRef = db.collection("portalClients").doc(user.uid);
    const cacheRef = clientRef.collection("recommendationCache").doc(caseKey);
    const usageRef = clientRef.collection("aiUsage").doc("recommendations");
    const cacheSnapshot = await cacheRef.get();
    const cached = cacheSnapshot.data();

    if (
      cached?.contextHash === contextHash &&
      Array.isArray(cached.recommendations) &&
      ageInMs(cached.updatedAt) < CACHE_MS
    ) {
      return NextResponse.json({ recommendations: cached.recommendations, source: "cache" });
    }

    // Reserve the daily request before calling OpenAI. Concurrent refreshes cannot bypass this guard.
    const permitted = await db.runTransaction(async (transaction) => {
      const usageSnapshot = await transaction.get(usageRef);
      const lastRequestAt = usageSnapshot.data()?.lastRequestAt;
      if (lastRequestAt && ageInMs(lastRequestAt) < DAY_MS) return false;
      transaction.set(usageRef, { lastRequestAt: new Date() }, { merge: true });
      return true;
    });
    if (!permitted) {
      return NextResponse.json({ recommendations: fallback, source: "rate_limited_rules" });
    }

    const safetyId = crypto.createHash("sha256").update(`portal:${user.uid}`).digest("hex");
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_PORTAL_MODEL || "gpt-5-nano",
        // max_output_tokens includes reasoning tokens on this model family, so
        // any reasoning effort above "minimal" exhausts the budget before the
        // JSON is emitted and the route falls back to rule text every time.
        reasoning: { effort: "minimal" },
        text: { verbosity: "low" },
        max_output_tokens: 400,
        safety_identifier: safetyId,
        instructions:
          "Write concise, professional client-portal recommendation reasons. Do not mention AI. Do not provide legal advice, promise eligibility, claim registration, or invent services. Return only a JSON array of objects with title and reason. Preserve every supplied title exactly.",
        input: `Client context: ${JSON.stringify(context)}. Approved recommendation titles: ${JSON.stringify(titles)}. Each reason must be one sentence under 22 words.`,
      }),
    });
    if (!response.ok) {
      return NextResponse.json({ recommendations: fallback, source: "rules" });
    }

    const data = await response.json();
    const output = (data.output || [])
      .flatMap((item) => item.content || [])
      .find((item) => item.type === "output_text")?.text || "";
    const parsed = JSON.parse(output.replace(/^```json\s*|\s*```$/g, ""));
    const valid = Array.isArray(parsed)
      ? parsed.filter((item) => titles.includes(item.title) && typeof item.reason === "string").slice(0, 3)
      : [];
    const recommendations = valid.length === titles.length ? valid : fallback;

    await cacheRef.set({ contextHash, recommendations, updatedAt: new Date() }, { merge: true });
    return NextResponse.json({
      recommendations,
      source: valid.length === titles.length ? "personalized" : "rules",
    });
  } catch {
    return NextResponse.json({ error: "Unable to prepare recommendations." }, { status: 500 });
  }
}
