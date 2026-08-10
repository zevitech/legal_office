import { NextResponse } from "next/server";
import { getPortalUser } from "@/lib/portalAuth";
import { getClientPortalData } from "@/lib/portalData";

export async function GET() {
  const user = await getPortalUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await getClientPortalData(user.uid);
  return NextResponse.json({ user, data });
}

