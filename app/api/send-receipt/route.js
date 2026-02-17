import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();

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
                                  <h2 style="color: #334155; font-weight: 700; font-size: 20px; text-transform: uppercase; margin: 0;">Receipt #${
                                    data?.nestedLeadData?.stepFour?.receipt_ID
                                  }</h2>
                                  <p style="font-size: 14px; color: #64748b; margin: 0;">${
                                    data.today
                                  }</p>
                                  <p style="font-size: 14px; color: #64748b; margin: 0;">${
                                    data?.nestedLeadData?.stepOne?.firstName +
                                    " " +
                                    data?.nestedLeadData?.stepOne?.lastName
                                  }</p>
                                </td>
                              </tr>
                            </table>

                            <!-- Item Section -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 20px;">
                              <tr>
                                <td style="color: #1e293b; font-weight: 700; font-size: 18px;">Item</td>
                                <td style="color: #1e293b; font-weight: 700; font-size: 18px;" align="right">Price</td>
                              </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top: 1px solid #cbd5e1; padding-top: 10px; margin-top: 10px;">
                              <tr>
                                <td style="color: #475569; font-weight: 500; font-size: 14px;">Trademark registration</td>
                                <td style="color: #0f172a; font-weight: 500; font-size: 14px;" align="right">$${data?.totalPrice || data?.nestedLeadData?.stepThree?.price || 0}</td>
                              </tr>
                              <tr>
                                <td style="color: #475569; font-weight: 500; font-size: 14px;">Comprehensive Trademark Search</td>
                                <td style="color: #0f172a; font-weight: 500; font-size: 14px;" align="right">$0.00</td>
                              </tr>
                              <tr>
                                <td style="color: #475569; font-weight: 500; font-size: 14px;">Trademark monitoring</td>
                                <td style="color: #0f172a; font-weight: 500; font-size: 14px;" align="right">$0.00</td>
                              </tr>
                              <tr>
                                <td style="color: #475569; font-weight: 500; font-size: 14px;">Office Action Response</td>
                                <td style="color: #0f172a; font-weight: 500; font-size: 14px;" align="right">$0.00</td>
                              </tr>
                              ${
                                data.nestedLeadData?.stepFour
                                  ?.isRushProcessing === true &&
                                `<tr>
                                    <td style="color: #475569; font-weight: 500; font-size: 14px;">
                                      Rush processing
                                    </td>
                                    <td
                                      style="color: #0f172a; font-weight: 500; font-size: 14px;"
                                      align="right"
                                    >
                                      $${data.nestedLeadData.stepFour?.rushAmount}
                                    </td>
                                  </tr>`
                              }
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top: 2px dotted #0f172a; margin-top: 20px; padding-top: 10px;">
                              <tr>
                                <td style="font-weight: bold; font-size: 14px;">Sub Total</td>
                                <td style="font-weight: bold; font-size: 14px;" align="right">$${
                                  data?.totalPrice
                                }</td>
                              </tr>
                              <tr>
                                <td style="font-weight: bold; font-size: 14px;">Tax</td>
                                <td style="font-weight: bold; font-size: 14px;" align="right">$0.00</td>
                              </tr>
                              <tr>
                                <td style="font-weight: bold; font-size: 14px;">Total Amount</td>
                                <td style="font-weight: bold; font-size: 14px;" align="right">$${
                                  data?.totalPrice
                                }</td>
                              </tr>
                            </table>

                            <!-- Footer Section -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 30px; text-align: center;">
                              <tr>
                                <td style="color: #64748b; font-size: 12px;">Statement Descriptor "Xtarlabs LLC"</td>
                              </tr>
                              <tr>
                                <td>
                                  <hr style="border: 0; border-top: 1px solid #cbd5e1; width: 50%; margin: 10px auto;" />
                                </td>
                              </tr>
                              <tr>
                                <td style="color: #64748b; font-size: 12px;">
                                  © Copyright and all Rights reserved by Legal Trademark
                                </td>
                              </tr>
                            </table>
                          </div>
                        </body>

                        </html>
                      `;

    // Billing email transporter using GoDaddy SMTP
    const billingTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true for 465 (SSL)
      auth: {
        user: process.env.BILLING_EMAIL,
        pass: process.env.BILLING_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.BILLING_EMAIL,
      to: data?.nestedLeadData?.stepOne?.emailAddress,
      subject: "Your Order Receipt | Legal Trademark Office",
      html: receiptHtml,
    };

    // Support email transporter using GoDaddy SMTP for onboarding
    const supportTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true for 465 (SSL)
      auth: {
        user: process.env.SUPPORT_EMAIL,
        pass: process.env.SUPPORT_EMAIL_PASSWORD,
      },
    });

    // Business copy will use the same billing transporter for consistency

    // Onboarding email HTML template
    const onboardingHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Legal Trademark Office – Order Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        
        <div style="padding: 20px 0;">
          
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">
            Dear ${data?.nestedLeadData?.stepOne?.firstName} ${data?.nestedLeadData?.stepOne?.lastName},
          </p>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">
            Thank you for choosing Legal Trademark Office. We are pleased to confirm that your order has been successfully received. Our team will reach out to you at our earliest convenience to assist with the next steps.
          </p>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">
            We look forward to serving you and ensuring a smooth experience. If you have any questions in the meantime, please don't hesitate to contact us.
          </p>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">
            Welcome aboard!
          </p>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">
            Best regards,<br>
            Support Department<br>
            Legal Trademark Office
          </p>
        </div>
        
        <!-- Footer -->
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
          <p style="color: #64748b; font-size: 12px; margin: 0;">
            © ${new Date().getFullYear()} Legal Trademark Office. All rights reserved.
          </p>
          <p style="color: #64748b; font-size: 12px; margin: 5px 0 0 0;">
            This email was sent from our support team. Please do not reply to this email.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

    const onboardingMailOptions = {
      from: process.env.SUPPORT_EMAIL,
      to: data?.nestedLeadData?.stepOne?.emailAddress,
      subject: "Welcome to Legal Trademark Office - Your Journey Begins!",
      html: onboardingHtml,
    };

    // Business copy mail options (copy of receipt for business records)
    const businessCopyMailOptions = {
      from: process.env.BILLING_EMAIL,
      to: process.env.MAILER_EMAIL, // Send business copy to legaltrademarkoffice@gmail.com
      subject: `[BUSINESS COPY] Order Receipt - ${data?.nestedLeadData?.stepOne?.firstName} ${data?.nestedLeadData?.stepOne?.lastName}`,
      html: receiptHtml,
    };

    // Send receipt email to customer first
    const receiptResult = await billingTransporter.sendMail(mailOptions);

    // Send copy of receipt to business Gmail
    const businessCopyResult = await billingTransporter.sendMail(
      businessCopyMailOptions,
    );

    // Send onboarding email after receipt
    const onboardingResult = await supportTransporter.sendMail(
      onboardingMailOptions,
    );

    return NextResponse.json(
      {
        success: true,
        receiptMessageId: receiptResult.messageId,
        businessCopyMessageId: businessCopyResult.messageId,
        onboardingMessageId: onboardingResult.messageId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in send-receipt endpoint:", error.message);
    return NextResponse.json(
      {
        error: "Failed to send receipt email",
        details: "Please contact support if the issue persists",
      },
      { status: 500 },
    );
  }
}
