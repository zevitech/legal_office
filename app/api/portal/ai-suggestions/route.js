import crypto from "crypto";
import { NextResponse } from "next/server";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

const DAY_MS = 24 * 60 * 60 * 1000;

function ageInMs(value) {
  const milliseconds = typeof value?.toMillis === "function" ? value.toMillis() : new Date(value || 0).getTime();
  return Date.now() - milliseconds;
}

export async function POST(request) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const user = await getPortalUser();
  if (!user || user.role !== "client") return NextResponse.json({ error: "Client access required." }, { status: 401 });
  const key = process.env.OPENAI_API_KEY;
  const enabled = process.env.OPENAI_PORTAL_AI_ENABLED === "true";
  const db = getAdminFirestore();
  if (!key || !enabled || !db) return NextResponse.json({ error: "Personalized suggestions are disabled." }, { status: 503 });
  try {
    const body = await request.json();
    const context = { company: String(body.company || "").slice(0, 120), mark: String(body.mark || "").slice(0, 120), markType: String(body.markType || "").slice(0, 80) };
    const contextHash = crypto.createHash("sha256").update(JSON.stringify(context)).digest("hex");
    const cacheRef = db.collection("portalClients").doc(user.uid).collection("recommendationCache").doc("domain-ideas");
    const usageRef = db.collection("portalClients").doc(user.uid).collection("aiUsage").doc("domain-suggestions");
    const cached = (await cacheRef.get()).data();
    if (cached?.contextHash === contextHash && Array.isArray(cached.domainIdeas) && ageInMs(cached.updatedAt) < 30 * DAY_MS) return NextResponse.json({ domainIdeas: cached.domainIdeas, source: "cache" });
    const permitted = await db.runTransaction(async (transaction) => { const snapshot = await transaction.get(usageRef); if (snapshot.data()?.lastRequestAt && ageInMs(snapshot.data().lastRequestAt) < DAY_MS) return false; transaction.set(usageRef, { lastRequestAt: new Date() }, { merge: true }); return true; });
    if (!permitted) return NextResponse.json({ error: "Suggestion refresh limit reached." }, { status: 429 });
    const response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.OPENAI_PORTAL_MODEL || "gpt-5-nano", reasoning: { effort: "minimal" }, text: { verbosity: "low" }, max_output_tokens: 300, safety_identifier: crypto.createHash("sha256").update(`portal:${user.uid}`).digest("hex"), instructions: "Generate concise business naming suggestions. Do not claim legal clearance, domain availability, or registration rights. Return only four domain names, one per line, using common extensions.", input: `Client context: ${JSON.stringify(context)}. Suggest related but distinct domains for a new business presence.` }) });
    if (!response.ok) throw new Error("AI request failed");
    const data = await response.json();
    const text = (data.output || []).flatMap((item) => item.content || []).find((item) => item.type === "output_text")?.text || "";
    const domainIdeas = text.split(/\r?\n/).map((line) => line.replace(/^[-*\d.\s]+/, "").trim().toLowerCase()).filter((value) => /^[a-z0-9-]+\.[a-z]{2,}$/.test(value)).slice(0, 4);
    if (domainIdeas.length) await cacheRef.set({ contextHash, domainIdeas, updatedAt: new Date() }, { merge: true });
    return NextResponse.json({ domainIdeas });
  } catch {
    return NextResponse.json({ error: "Unable to generate suggestions." }, { status: 502 });
  }
}
