import axios from "axios";
import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const labelFor = (key) =>
  key
    .replaceAll("_", " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const displayValue = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === "object"
          ? item.label || item.title || JSON.stringify(item)
          : item,
      )
      .join(", ");
  }
  if (value && typeof value === "object") return JSON.stringify(value);
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return value ?? "";
};

const EMAIL_SECTIONS = [
  { title: "Trademark", keys: ["protectionTypes", "wantToProtect", "name", "slogan", "logo", "logoColors", "logoProtectionDescription", "soundDescription", "soundFileName", "trademarkCurrentlyBeingUsed", "firstAnywhereDate", "firstCommenceDate"] },
  { title: "Owner", keys: ["selectedOwnerType", "organizationName", "organizationType", "selectedFormationType", "stateFormation", "countryFormation", "organizationPosition"] },
  { title: "Contact", keys: ["firstName", "lastName", "emailAddress", "phoneNumber", "address", "city", "state", "zipCode"] },
  { title: "Business activities & classification", keys: ["selectedActivities", "trademarkClassification", "estimatedClassCount", "reviewPreference"] },
  { title: "Package", keys: ["packageName", "price"] },
  { title: "Payment", keys: ["is_paid", "payment_method", "transaction_id", "addons", "totalAmount"] },
];

const stageDetails = (data) => {
  if (data.is_paid) return { number: 4, title: "Payment completed", color: "#047857" };
  if (data.zoho_step === 3) return { number: 3, title: "Package selected", color: "#7c3aed" };
  if (data.zoho_step === 2) return { number: 2, title: "Business activities completed", color: "#0369a1" };
  return { number: 1, title: "Trademark and contact details completed", color: "#1d4ed8" };
};

const buildProgressEmail = (data) => {
  const stage = stageDetails(data);
  const customerName = [data.firstName, data.lastName].filter(Boolean).join(" ") || "New customer";
  const sections = EMAIL_SECTIONS.map((section) => {
    const rows = section.keys
      .filter((key) => data[key] !== undefined && data[key] !== "" && data[key] !== null)
      .map((key) => `<tr><td style="padding:10px 12px;color:#64748b;font-size:13px;width:38%;border-bottom:1px solid #eef2f7;vertical-align:top">${escapeHtml(labelFor(key))}</td><td style="padding:10px 12px;color:#0f172a;font-size:13px;font-weight:600;border-bottom:1px solid #eef2f7;word-break:break-word">${escapeHtml(displayValue(data[key]))}</td></tr>`)
      .join("");
    if (!rows) return "";
    return `<div style="margin-top:22px"><h2 style="margin:0 0 8px;font-size:15px;color:#0f172a">${section.title}</h2><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;border-collapse:separate;overflow:hidden">${rows}</table></div>`;
  }).join("");

  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,sans-serif;color:#0f172a"><div style="display:none">${escapeHtml(stage.title)} for ${escapeHtml(customerName)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:28px 12px"><div style="max-width:680px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 28px rgba(15,23,42,.08)"><div style="background:#0f172a;padding:24px 28px"><div style="font-size:20px;font-weight:800;color:#fff">Legal Trademark Office</div><div style="margin-top:6px;color:#cbd5e1;font-size:13px">Application progress notification</div></div><div style="padding:26px 28px"><div style="display:inline-block;border-radius:999px;background:${stage.color};color:#fff;padding:7px 12px;font-size:12px;font-weight:700">STEP ${stage.number} OF 4</div><h1 style="margin:16px 0 6px;font-size:24px;color:#0f172a">${escapeHtml(stage.title)}</h1><p style="margin:0;color:#64748b;font-size:14px">${escapeHtml(customerName)} · ${escapeHtml(data.emailAddress || "Email pending")}</p>${sections}<div style="margin-top:24px;padding:14px 16px;border-radius:10px;background:#eff6ff;color:#1e3a8a;font-size:13px">This email reflects the customer’s latest completed funnel step. Later emails include all information collected up to that point.</div></div><div style="padding:18px 28px;background:#f8fafc;color:#64748b;font-size:12px">Received ${escapeHtml(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }))} Pacific Time</div></div></td></tr></table></body></html>`;
};

export async function POST(req) {
  const data = await req.json();

  console.log("client already paid: ", data?.is_paid_log);

  try {
    // Verify reCAPTCHA v2 token (if enabled)
    const shouldVerifyCaptcha =
      process.env.NEXT_PUBLIC_DISABLE_CAPTCHA !== "true" &&
      !!process.env.RECAPTCHA_SECRET_KEY &&
      // Only verify for Step 1 (first form)
      data?.zoho_step === 1;

    if (shouldVerifyCaptcha) {
      const token = data?.reChaptcha || "";
      if (!token) {
        return NextResponse.json(
          { error: "Missing reCAPTCHA token" },
          { status: 400 }
        );
      }

      const params = new URLSearchParams();
      params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
      params.append("response", token);

      const verifyRes = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        }
      );
      const verifyJson = await verifyRes.json();

      if (!verifyJson?.success) {
        console.log("reCAPTCHA verification failed:", verifyJson);
        return NextResponse.json(
          {
            error: "reCAPTCHA verification failed",
            details: verifyJson?.["error-codes"],
          },
          { status: 400 }
        );
      }
    }

    // sending data to gmail account -start
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,
      },
    });

    const stage = stageDetails(data);
    const formBody = buildProgressEmail(data);
    const customerName = [data.firstName, data.lastName].filter(Boolean).join(" ") || data.emailAddress || "New lead";
    const subject = `[LTO] Step ${stage.number}/4: ${stage.title} — ${customerName}`;

    await transporter.sendMail({
      from: `Legal Trademark Office <${process.env.MAILER_EMAIL}>`,
      to: process.env.MAILER_EMAIL,
      replyTo: data.emailAddress || process.env.MAILER_EMAIL,
      subject: subject,
      html: formBody,
    });
    // sending data to gmail account -end

    // Receipt emails are handled by the dedicated /send-receipt route
    // This prevents duplicate emails from being sent
    console.log("=== PAYMENT STATUS DEBUG ===");
    console.log("data.is_paid value:", data.is_paid);
    console.log("data.is_paid type:", typeof data.is_paid);
    console.log("Customer email:", data.emailAddress);
    console.log("🔍 DEBUG - zoho_step:", data.zoho_step);
    console.log("🔍 DEBUG - Call timestamp:", new Date().toISOString());
    console.log("Note: Receipt emails will be sent by /send-receipt route");
    console.log("================================");



    // sending data to ZevitechCRM leads system (server-to-server, API-key guarded)
    const crmIngestUrl = process.env.CRM_INGEST_URL;
    const crmIngestKey = process.env.CRM_INGEST_API_KEY;
    if (crmIngestUrl && crmIngestKey) {
      try {
        await axios.post(
          crmIngestUrl,
          { ...data, brand: "legal_trademark_office" },
          { headers: { "x-api-key": crmIngestKey }, timeout: 8000 }
        );
        console.log("CRM lead ingest: ok");
      } catch (err) {
        // Never block the form flow on CRM failure — email already sent.
        console.log("CRM lead ingest error:", err?.response?.data || err?.message);
      }
    }

    // sending data to ZOHO - disabled via env or default off
    const disableZoho =
      process.env.DISABLE_ZOHO === "true" ||
      process.env.NEXT_PUBLIC_DISABLE_ZOHO === "true";
    if (!disableZoho) {
      try {
        const zohoEndPoint = process.env.ZOHO_LEAD_ENDPOINT;
        if (!zohoEndPoint) throw new Error("ZOHO_LEAD_ENDPOINT is not configured");
        await axios
          .post(zohoEndPoint, data)
          .then((res) => {
            console.log("zoho response: ", res?.data?.message);
          })
          .catch((err) => {
            console.log("zoho error", err);
          });
      } catch (error) {
        console.log("Error while saving zoho lead: " + error);
      }
    } else {
      console.log("ZOHO lead forwarding disabled. Only SMTP email sent.");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("Error while saving data: " + error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
