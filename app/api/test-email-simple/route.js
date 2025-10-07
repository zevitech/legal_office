import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    // Create transporter using the same configuration as send-receipt
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.BILLING_EMAIL,
        pass: process.env.BILLING_EMAIL_PASSWORD,
      },
    });

    // Send test email
    const mailOptions = {
      from: process.env.BILLING_EMAIL,
      to: email,
      subject: "Test Email - Legal Trademark Office",
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify that the email system is working properly.</p>
        <p>If you received this email, the email configuration is correct.</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Test email sent successfully:", info.messageId);

    return Response.json({
      success: true,
      messageId: info.messageId,
      message: "Test email sent successfully"
    });

  } catch (error) {
    console.error("Error sending test email:", error);
    return Response.json({
      error: "Failed to send test email",
      details: error.message
    }, { status: 500 });
  }
}