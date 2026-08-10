import { NextResponse } from "next/server";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { provisionPortalClient } from "@/lib/portalProvisioning";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const staff = await getPortalUser();
  if (!staff || !["admin", "attorney"].includes(staff.role)) return NextResponse.json({ error: "A signed-in attorney is required." }, { status: 401 });

  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim().slice(0, 100);
    if (!emailPattern.test(email) || !name) return NextResponse.json({ error: "Enter a valid client name and email." }, { status: 400 });

    const trademarks = Array.isArray(body.trademarks) ? body.trademarks.slice(0, 25).map(item=>({ markName:String(item.markName||"").trim().slice(0,160), markType:String(item.markType||"Word mark").slice(0,80), packageName:String(item.packageName||"").slice(0,80) })).filter(item=>item.markName) : [];
    if (!trademarks.length) return NextResponse.json({ error: "Add at least one trademark matter." }, { status: 400 });
    await provisionPortalClient({ name, email, company: String(body.company || "").trim(), trademarks, source: "manual" });

    return NextResponse.json({ success: true, message: `Secure setup instructions were sent to ${email}.` });
  } catch (error) {
    console.error("Portal invitation error:", error?.code || error?.message);
    return NextResponse.json({ error: "The invitation could not be sent. Check the portal configuration and try again." }, { status: 500 });
  }
}
