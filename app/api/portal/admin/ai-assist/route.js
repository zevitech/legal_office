import crypto from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function weekKey() {
  return String(Math.floor(Date.now() / WEEK_MS));
}

function fallbackReply(clientName, lastMessage) {
  const firstName = String(clientName || "there").trim().split(/\s+/)[0];
  const topic = String(lastMessage || "your message").trim().slice(0, 180);
  return `Hi ${firstName}, thanks for reaching out. We received your message about “${topic}.” I’m reviewing it now and will update you here shortly. If anything is time-sensitive, please let me know.`;
}

export async function POST(request) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const staff = await getPortalUser();
  if (!staff || !["admin", "attorney"].includes(staff.role)) return NextResponse.json({ error: "Attorney access required." }, { status: 401 });
  try {
    const body = await request.json();
    const action = ["draft_reply", "summarize_thread"].includes(body.action) ? body.action : "draft_reply";
    const clientName = String(body.clientName || "Client").slice(0, 120);
    const messages = Array.isArray(body.messages) ? body.messages.slice(-12).map((item) => ({ role: item.direction === "staff_to_client" ? "assistant" : "user", text: String(item.body || "").slice(0, 1000) })) : [];
    const key = process.env.OPENAI_API_KEY;
    const enabled = process.env.OPENAI_PORTAL_AI_ENABLED !== "false";
    if (!key || !enabled) return NextResponse.json({ text: fallbackReply(clientName, messages.at(-1)?.text), source: "safe_template", configured: false });

    const db = getAdminFirestore();
    const weeklyLimit = Math.max(10, Math.min(Number(process.env.OPENAI_PORTAL_WEEKLY_REQUEST_LIMIT || 250), 1000));
    if (db) {
      const usageRef = db.collection("portalAiUsage").doc(`${weekKey()}_${staff.uid}`);
      const permitted = await db.runTransaction(async (transaction) => {
        const snapshot = await transaction.get(usageRef);
        const requests = Number(snapshot.data()?.requests || 0);
        if (requests >= weeklyLimit) return false;
        transaction.set(usageRef, { requests: FieldValue.increment(1), week: weekKey(), staffUid: staff.uid, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
        return true;
      });
      if (!permitted) return NextResponse.json({ error: "The weekly AI request limit has been reached." }, { status: 429 });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_PORTAL_MODEL || "gpt-5-nano",
        // These are short formatting tasks with no reasoning value. On a
        // reasoning model, max_output_tokens covers reasoning too, so "low"
        // effort silently burned the whole budget and returned no text.
        reasoning: { effort: "minimal" },
        text: { verbosity: "low" },
        max_output_tokens: Math.max(120, Math.min(Number(process.env.OPENAI_PORTAL_MAX_OUTPUT_TOKENS || 400), 800)),
        safety_identifier: crypto.createHash("sha256").update(`portal-staff:${staff.uid}`).digest("hex"),
        instructions: action === "summarize_thread"
          ? "Summarize this support conversation for an attorney in no more than four concise bullets. Do not give legal advice, make promises, determine filing status, or infer facts."
          : "Draft a brief, warm, informal-but-professional secure portal reply for attorney review. Return only the message body: no subject line, no salutation block, no signature. Do not give legal advice, promise outcomes, state filing status, request card data, discuss charges, or claim an action was completed. Never send automatically.",
        input: JSON.stringify({ clientName, messages }),
      }),
    });
    if (!response.ok) throw new Error("AI request failed");
    const data = await response.json();
    const text = (data.output || []).flatMap((item) => item.content || []).find((item) => item.type === "output_text")?.text?.trim();
    if (!text) throw new Error("AI returned no text");
    return NextResponse.json({ text, source: "openai", configured: true });
  } catch {
    return NextResponse.json({ error: "The drafting assistant is temporarily unavailable." }, { status: 502 });
  }
}
