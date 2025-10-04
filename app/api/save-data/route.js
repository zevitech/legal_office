import axios from "axios";
import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

export async function POST(req) {
  const data = await req.json();

  console.log("client already paid: ", data?.is_paid_log);

  try {
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

    // Send receipt if payment is completed -start
    console.log("=== RECEIPT SENDING DEBUG ===");
    console.log("data.is_paid value:", data.is_paid);
    console.log("data.is_paid type:", typeof data.is_paid);
    console.log("data.is_paid === true:", data.is_paid === true);
    console.log("Customer email:", data.emailAddress);
    console.log("🔍 DEBUG - zoho_step:", data.zoho_step);
    console.log("🔍 DEBUG - Full data keys:", Object.keys(data));
    console.log("🔍 DEBUG - Call timestamp:", new Date().toISOString());
    console.log("🔍 DEBUG - Full data object:", JSON.stringify(data, null, 2));
    console.log("================================");

    if (data.is_paid === true) {
      try {
        console.log("✅ Payment completed, sending receipt...");

        // Create billing transporter for customer receipt
        const billingTransporter = createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT),
          secure: false,
          requireTLS: true,
          auth: {
            user: process.env.BILLING_EMAIL,
            pass: process.env.BILLING_EMAIL_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        // Create business Gmail transporter for business copy
        const businessGmailTransporter = createTransport({
          service: 'gmail',
          auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_PASSWORD,
          },
        });

        // Calculate total price
        const basePrice = data.price || 0;
        const rushAmount = data.isRushProcessing ? (data.rushAmount || 0) : 0;
        const totalPrice = basePrice + rushAmount;

        // Get current date
        const today = new Date().toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        // Receipt HTML template
        const receiptHtml = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Receipt | Legal Trademark Office</title>
          </head>
          <body style="font-family: 'Courier New', Courier, monospace; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 2px dashed #64748b; background-color: #ffffff;">
              <!-- Header Section -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 2px dashed #64748b; padding-bottom: 10px;">
                <tr>
                  <td style="color: #005ea2; font-weight: 800; font-size: 24px;">Legal Trademark</td>
                  <td align="right">
                    <h2 style="color: #334155; font-weight: 700; font-size: 20px; text-transform: uppercase; margin: 0;">Receipt #${data?.receipt_ID || 'N/A'}</h2>
                    <p style="font-size: 14px; color: #64748b; margin: 0;">${today}</p>
                    <p style="font-size: 14px; color: #64748b; margin: 0;">${data?.firstName || ''} ${data?.lastName || ''}</p>
                  </td>
                </tr>
              </table>

              <!-- Item Section -->
              <div style="margin-top: 20px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="color: #1e293b; font-weight: 700; font-size: 18px;">Item</td>
                    <td align="right" style="color: #1e293b; font-weight: 700; font-size: 18px;">Price</td>
                  </tr>
                </table>

                <div style="border-top: 1px solid #cbd5e1; padding-top: 10px; margin-top: 10px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 5px;">
                    <tr>
                      <td style="color: #475569; font-weight: 500; font-size: 14px;">Trademark registration</td>
                      <td align="right" style="color: #0f172a; font-weight: 500; font-size: 14px;">$${basePrice}</td>
                    </tr>
                  </table>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 5px;">
                    <tr>
                      <td style="color: #475569; font-weight: 500; font-size: 14px;">Comprehensive Trademark Search</td>
                      <td align="right" style="color: #0f172a; font-weight: 500; font-size: 14px;">$0.00</td>
                    </tr>
                  </table>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 5px;">
                    <tr>
                      <td style="color: #475569; font-weight: 500; font-size: 14px;">Trademark monitoring</td>
                      <td align="right" style="color: #0f172a; font-weight: 500; font-size: 14px;">$0.00</td>
                    </tr>
                  </table>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 5px;">
                    <tr>
                      <td style="color: #475569; font-weight: 500; font-size: 14px;">Office Action Response</td>
                      <td align="right" style="color: #0f172a; font-weight: 500; font-size: 14px;">$0.00</td>
                    </tr>
                  </table>
                  ${data.isRushProcessing ? `
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 5px;">
                    <tr>
                      <td style="color: #475569; font-weight: 500; font-size: 14px;">Rush processing</td>
                      <td align="right" style="color: #0f172a; font-weight: 500; font-size: 14px;">$${rushAmount}</td>
                    </tr>
                  </table>
                  ` : ''}
                </div>

                <div style="border-top: 2px dotted #0f172a; margin-top: 20px; padding-top: 10px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 5px;">
                    <tr>
                      <td style="font-weight: 700; font-size: 14px;">Sub Total</td>
                      <td align="right" style="font-weight: 700; font-size: 14px;">$${totalPrice}</td>
                    </tr>
                  </table>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 5px;">
                    <tr>
                      <td style="font-weight: 700; font-size: 14px;">Tax</td>
                      <td align="right" style="font-weight: 700; font-size: 14px;">$0.00</td>
                    </tr>
                  </table>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 5px;">
                    <tr>
                      <td style="font-weight: 700; font-size: 14px;">Total Amount</td>
                      <td align="right" style="font-weight: 700; font-size: 14px;">$${totalPrice}</td>
                    </tr>
                  </table>
                </div>
              </div>

              <!-- Footer Section -->
              <div style="margin-top: 30px; text-align: center; color: #64748b; font-size: 12px;">
                <p style="margin: 5px 0;">Statement Descriptor "Xtarlabs LLC"</p>
                <hr style="border: 0; border-top: 1px solid #cbd5e1; width: 50%; margin: 10px auto;" />
                <p style="margin: 5px 0;">© Copyright and all Rights reserved by <a href="https://legaltrademarkoffice.com" style="color: #005ea2; text-decoration: none;">Legal Trademark</a></p>
              </div>
            </div>
          </body>
          </html>
        `;

        // Customer receipt email options
        const customerMailOptions = {
          from: process.env.BILLING_EMAIL,
          to: data?.emailAddress,
          subject: `Receipt for your trademark registration - Legal Trademark Office`,
          html: receiptHtml,
        };

        // Business copy email options
        const businessCopyMailOptions = {
          from: process.env.MAILER_EMAIL,
          to: process.env.MAILER_EMAIL,
          subject: `[Business Copy] Receipt for ${data?.firstName} ${data?.lastName} - ${data?.emailAddress}`,
          html: receiptHtml,
        };

        // Send customer receipt
        const customerMessageId = await billingTransporter.sendMail(customerMailOptions);
        console.log("Customer receipt sent:", customerMessageId.messageId);

        // Send business copy
        const businessMessageId = await businessGmailTransporter.sendMail(businessCopyMailOptions);
        console.log("Business copy sent:", businessMessageId.messageId);

      } catch (receiptError) {
        console.log("❌ Error sending receipt:", receiptError);
        // Don't fail the entire request if receipt sending fails
      }
    } else {
      console.log("❌ Receipt sending skipped - payment not completed or is_paid not true");
    }
    // Send receipt if payment is completed -end

    // sending data to ZOHO -start
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
    // sending data to ZOHO -end

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("Error while saving data: " + error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
