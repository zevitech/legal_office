import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { testEmail } = await request.json();

    if (!testEmail) {
      return NextResponse.json({ error: "Test email is required" }, { status: 400 });
    }

    console.log("Testing receipt copy functionality...");

    // Mock data for testing
    const mockData = {
      nestedLeadData: {
        stepOne: {
          firstName: "John",
          lastName: "Doe",
          emailAddress: testEmail
        }
      },
      totalPrice: "299.00",
      packageName: "Basic Package"
    };

    // Create the same transporters as in send-receipt
    const billingTransporter = nodemailer.createTransport({
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

    const businessGmailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,
      },
    });

    // Simple test receipt HTML
    const testReceiptHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px;">
            <h2 style="color: #333;">Test Receipt</h2>
            <p><strong>Customer:</strong> ${mockData.nestedLeadData.stepOne.firstName} ${mockData.nestedLeadData.stepOne.lastName}</p>
            <p><strong>Email:</strong> ${mockData.nestedLeadData.stepOne.emailAddress}</p>
            <p><strong>Package:</strong> ${mockData.packageName}</p>
            <p><strong>Total:</strong> $${mockData.totalPrice}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">This is a test receipt to verify the business copy functionality.</p>
          </div>
        </body>
      </html>
    `;

    // Customer receipt
    const customerMailOptions = {
      from: process.env.BILLING_EMAIL,
      to: testEmail,
      subject: "Test Receipt | Legal Trademark Office",
      html: testReceiptHtml,
    };

    // Business copy
    const businessCopyMailOptions = {
      from: process.env.MAILER_EMAIL,
      to: process.env.MAILER_EMAIL,
      subject: `[BUSINESS COPY] Test Receipt - ${mockData.nestedLeadData.stepOne.firstName} ${mockData.nestedLeadData.stepOne.lastName}`,
      html: testReceiptHtml,
    };

    console.log("Sending test receipt to customer:", testEmail);
    const customerResult = await billingTransporter.sendMail(customerMailOptions);
    console.log("Customer receipt sent:", customerResult.messageId);

    console.log("Sending business copy to:", process.env.MAILER_EMAIL);
    const businessResult = await businessGmailTransporter.sendMail(businessCopyMailOptions);
    console.log("Business copy sent:", businessResult.messageId);

    return NextResponse.json({
      success: true,
      message: "Test receipt and business copy sent successfully",
      customerMessageId: customerResult.messageId,
      businessCopyMessageId: businessResult.messageId,
      businessEmail: process.env.MAILER_EMAIL
    }, { status: 200 });

  } catch (error) {
    console.error("Error testing receipt copy:", error);
    return NextResponse.json({
      error: "Failed to send test receipt",
      details: error.message
    }, { status: 500 });
  }
}