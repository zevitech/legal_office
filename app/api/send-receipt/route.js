import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  const data = await req.json();
  const admin_email = "legaltrademarkoffice@gmail.com";
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
                                <td style="color: #0f172a; font-weight: 500; font-size: 14px;" align="right">$${
                                  data?.nestedLeadData?.stepThree.price
                                }</td>
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

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: admin_email,
    cc: data?.nestedLeadData?.stepOne?.email,
    subject: "Your Order Receipt | Legal Trademark Office",
    html: receiptHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("Error while sending receipt: " + error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
