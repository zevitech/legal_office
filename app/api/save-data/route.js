import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

export async function POST(req) {
  const data = await req.json();

  console.log("Getting request.....");

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
        ? `Previous form data of ${data.email}.`
        : `Another new form submission from ${data.email}.`;

    await transporter.sendMail({
      from: data.email,
      to: process.env.MAILER_EMAIL,
      subject: subject,
      html: formBody,
    });
    // sending data to gmail account -end

    // sending data to ZOHO -start
    // sending data to ZOHO -end

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("Error while saving data: " + error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
