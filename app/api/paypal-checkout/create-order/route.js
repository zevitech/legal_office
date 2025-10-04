import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";

export async function POST(req) {
  const body = await req.json();
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  // const credentialEnvConfig = new paypal.core.LiveEnvironment(
  //   clientId,
  //   clientSecret
  // );

  const credentialEnvConfig = new paypal.core.SandboxEnvironment(
    clientId,
    clientSecret
  );

  const client = new paypal.core.PayPalHttpClient(credentialEnvConfig);

  // console.log("credentialEnvConfig===============", credentialEnvConfig);
  // console.log("client============", client);

  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: body.totalAmount,
            // value: 5,
          },
        },
      ],
    });
    const response = await client.execute(request);
    console.log("Orders created response: ", response);

    return NextResponse.json({ order: response.result }, { status: 200 });
  } catch (error) {
    console.log("Error executing paypal client:---", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
