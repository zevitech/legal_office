import { NextResponse } from "next/server";
import { getPortalUser } from "@/lib/portalAuth";
import { listPortalCaseRows } from "@/lib/portalData";

export async function GET() {
  const staff = await getPortalUser();
  if (!staff || !["admin", "attorney"].includes(staff.role)) return NextResponse.json({ error: "Attorney access required." }, { status: 401 });
  try {
    return NextResponse.json({ clients: await listPortalCaseRows() });
  } catch {
    return NextResponse.json({ error: "Unable to refresh the client list." }, { status: 500 });
  }
}
