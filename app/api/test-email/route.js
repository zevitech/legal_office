import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { testEmail } = await req.json();

  if (!testEmail) {
    return NextResponse.json({ error: "Test email address is required" }, { status: 400 });
  }

  // Test billing email transporter
  const billingTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    requireTLS: true,
    auth: {
      user: process.env.BILLING_EMAIL,
      pass: process.env.BILLING_EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Test support email transporter
  const supportTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    requireTLS: true,
    auth: {
      user: process.env.SUPPORT_EMAIL,
      pass: process.env.SUPPORT_EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log("Testing email configuration...");
    console.log("SMTP Host:", process.env.SMTP_HOST);
    console.log("SMTP Port:", process.env.SMTP_PORT);
    console.log("SMTP Secure:", process.env.SMTP_SECURE);
    console.log("Billing Email:", process.env.BILLING_EMAIL);
    console.log("Support Email:", process.env.SUPPORT_EMAIL);

    // Test billing email
    const billingTestResult = await billingTransporter.sendMail({
      from: process.env.BILLING_EMAIL,
      to: testEmail,
      subject: "Test Email from Billing - Legal Trademark Office",
      html: `
        <h2>Test Email from Billing System</h2>
        <p>This is a test email to verify the billing email configuration.</p>
        <p>If you receive this email, the billing email system is working correctly.</p>
        <p>Sent at: ${new Date().toISOString()}</p>
      `
    });

    // Test support email
    const supportTestResult = await supportTransporter.sendMail({
      from: process.env.SUPPORT_EMAIL,
      to: testEmail,
      subject: "Test Email from Support - Legal Trademark Office",
      html: `
        <h2>Test Email from Support System</h2>
        <p>This is a test email to verify the support email configuration.</p>
        <p>If you receive this email, the support email system is working correctly.</p>
        <p>Sent at: ${new Date().toISOString()}</p>
      `
    });

    console.log("Billing test email sent:", billingTestResult.messageId);
    console.log("Support test email sent:", supportTestResult.messageId);

    return NextResponse.json({
      success: true,
      message: "Test emails sent successfully",
      billingMessageId: billingTestResult.messageId,
      supportMessageId: supportTestResult.messageId
    }, { status: 200 });

  } catch (error) {
    console.error("Email test failed:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });

    return NextResponse.json({
      error: error.message,
      details: error.code || 'Unknown error',
      config: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE,
        billingEmail: process.env.BILLING_EMAIL,
        supportEmail: process.env.SUPPORT_EMAIL
      }
    }, { status: 500 });
  }
}