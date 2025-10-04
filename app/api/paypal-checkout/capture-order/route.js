import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";

export async function POST(req) {
  const body = await req.json();

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  const credentialEnvConfig = new paypal.core.LiveEnvironment(
    clientId,
    clientSecret
  );

  // const credentialEnvConfig = new paypal.core.SandboxEnvironment(
  //   clientId,
  //   clientSecret
  // );

  const client = new paypal.core.PayPalHttpClient(credentialEnvConfig);

  try {
    const request = new paypal.orders.OrdersCaptureRequest(body.orderId);
    request.requestBody({});
    const response = await client.execute(request);

    return NextResponse.json({ result: response.result }, { status: 201 });
  } catch (error) {
    console.log("Error executing paypal client (capture): ", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
