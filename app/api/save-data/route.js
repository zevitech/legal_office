import { saveLead } from "@/lib/leadStore";
import { after, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req) {
  const started = performance.now();
  let captchaMs = 0;
  let persistMs = 0;
  let deliveryMode = "not-started";
  const respond = (body, status) => {
    const totalMs = performance.now() - started;
    // Durations only: never include contact details, credentials or tokens.
    console.info("Lead save timing", {
      captchaMs: Math.round(captchaMs), persistMs: Math.round(persistMs),
      responseMs: Math.round(totalMs), deliveryMode, status,
    });
    return NextResponse.json(body, {
      status,
      headers: {
        "Server-Timing": `captcha;dur=${captchaMs.toFixed(1)}, persist;dur=${persistMs.toFixed(1)}, handler;dur=${totalMs.toFixed(1)}`,
        "Cache-Control": "no-store",
      },
    });
  };

  try {
    const data = await req.json();
    const shouldVerifyCaptcha =
      process.env.NEXT_PUBLIC_DISABLE_CAPTCHA !== "true" &&
      !!process.env.RECAPTCHA_SECRET_KEY &&
      data?.zoho_step === 1;

    if (shouldVerifyCaptcha) {
      const token = data?.reChaptcha || "";
      if (!token) return respond({ error: "Missing reCAPTCHA token" }, 400);
      const captchaStarted = performance.now();
      const params = new URLSearchParams();
      params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
      params.append("response", token);
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      const verifyJson = await verifyRes.json();
      captchaMs = performance.now() - captchaStarted;
      if (!verifyJson?.success) {
        return respond({
          error: "reCAPTCHA verification failed",
          details: verifyJson?.["error-codes"],
        }, 400);
      }
    }

    const persistStarted = performance.now();
    const stored = await saveLead(data);
    persistMs = performance.now() - persistStarted;
    if (!stored.saved) console.error("Lead persistence failed:", stored.reason);

    const deliverNotifications = async () => {
      // Import SMTP/CRM code only after the durable save. This is intentionally
      // inside after(), not a detached promise that serverless may terminate.
      const { deliverLeadNotifications } = await import("@/lib/leadNotifications");
      return deliverLeadNotifications(data, stored);
    };

    if (stored.saved) {
      deliveryMode = "background";
      after(deliverNotifications);
    } else {
      // Do not acknowledge an unrecorded lead. Retain the existing fallback.
      deliveryMode = "synchronous-fallback";
      if (!(await deliverNotifications())) {
        return respond({ error: "Unable to save your details. Please try again." }, 503);
      }
    }
    return respond({ success: true }, 200);
  } catch (error) {
    console.error("Error while saving data:", error?.message);
    return respond({ error: "Unable to save your details. Please try again." }, 500);
  }
}
