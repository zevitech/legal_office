import axios from "axios";
import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

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

    // Constructing the form body as an HTML table
    const formBody = `
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr><th colspan="2" style="background-color: #f2f2f2;">Form Submission Details</th></tr>
        ${Object.entries(data)
        .map(
          ([key, value]) => `
            <tr>
              <td style="font-weight: bold;">${key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}</td>
              <td>${value}</td>
            </tr>`
        )
        .join("")}
      </table>
    `;

    const subject =
      "previous" in data
        ? `Previous form data of ${data.emailAddress}.`
        : `Another new form submission from ${data.emailAddress}.`;

    await transporter.sendMail({
      from: data.emailAddress,
      to: process.env.MAILER_EMAIL,
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



    // sending data to ZOHO - disabled via env or default off
    const disableZoho =
      process.env.DISABLE_ZOHO === "true" ||
      process.env.NEXT_PUBLIC_DISABLE_ZOHO === "true";
    if (!disableZoho) {
      try {
        const zohoEndPoint =
          "https://www.zohoapis.com/crm/v2/functions/get_lead_data_from_website/actions/execute?auth_type=apikey&zapikey=1003.eb4ba5dd90c3427d79be3ee781077455.953a892dc19d9aed59d99419e60d368b";
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
