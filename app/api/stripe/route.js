import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { amount, description } = await req.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
  });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description,
    });

    return NextResponse.json({ paymentIntent }, { status: 200 });
  } catch (error) {
    console.error("Error creating payment intent: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
