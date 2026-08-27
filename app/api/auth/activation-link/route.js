import { NextResponse } from "next/server";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebaseAdmin";
import { isTrustedPortalOrigin } from "@/lib/portalAuth";

/**
 * Mint a fresh password-setup link for a customer who has just paid.
 *
 * The thank-you page cannot link straight to /portal/set-password because that
 * page needs a single-use Firebase oobCode. Rather than passing the emailed
 * code around, this generates a new one on demand — so the button still works
 * if the customer navigates away and comes back, or the emailed link expires.
 *
 * Authorisation: the caller must present the transaction id AND the email from
 * the order they just completed. Both are checked against the stored payment
 * record, so knowing an email alone is not enough to trigger a reset.
 */
export async function POST(request) {
  if (!isTrustedPortalOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const auth = getAdminAuth();
  const db = getAdminFirestore();
  if (!auth || !db) {
    return NextResponse.json(
      { error: "Portal access is not configured. Please contact support." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const transactionId = String(body.transactionId || "").trim();
    const email = String(body.email || "").trim().toLowerCase();

    if (!transactionId || !email) {
      return NextResponse.json(
        { error: "We could not verify your order. Please use the link in your confirmation email." },
        { status: 400 },
      );
    }

    // The payment record is written by the charge route on every successful
    // sale, so it is the authority on who actually paid.
    const evidence = await db.collection("paymentEvidence").doc(transactionId).get();
    if (!evidence.exists) {
      return NextResponse.json(
        { error: "We could not find this order. Please use the link in your confirmation email, or contact support." },
        { status: 404 },
      );
    }

    const paidEmail = String(evidence.data()?.email || "").trim().toLowerCase();
    if (!paidEmail || paidEmail !== email) {
      return NextResponse.json(
        { error: "This order does not match that email address. Please use the link in your confirmation email." },
        { status: 403 },
      );
    }

    // Confirm the portal account exists before generating a link for it.
    try {
      await auth.getUserByEmail(email);
    } catch (lookupError) {
      if (lookupError?.code === "auth/user-not-found") {
        return NextResponse.json(
          { error: "Your portal account is still being created. Please try again in a moment, or contact support." },
          { status: 409 },
        );
      }
      throw lookupError;
    }

    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
    const firebaseLink = await auth.generatePasswordResetLink(email, {
      url: `${appUrl}/portal-login`,
    });
    const code = new URL(firebaseLink).searchParams.get("oobCode");
    if (!code) throw new Error("No oobCode in generated link");

    return NextResponse.json({
      success: true,
      setupUrl: `${appUrl}/portal/set-password?oobCode=${encodeURIComponent(code)}&email=${encodeURIComponent(email)}`,
    });
  } catch (error) {
    console.error("Activation link failed:", error?.code, error?.message);
    return NextResponse.json(
      { error: "We could not open your portal setup. Please use the link in your confirmation email, or contact support." },
      { status: 500 },
    );
  }
}
