import { NextResponse } from "next/server";
import { getPortalUser } from "@/lib/portalAuth";
import { getAdminStorage } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  const user = await getPortalUser();
  if (!user || (user.uid !== params.uid && !["admin", "attorney"].includes(user.role))) return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  const storage = getAdminStorage();
  if (!storage) return NextResponse.json({ error: "Secure document storage is not configured." }, { status: 503 });
  try {
    const caseId = String(new URL(request.url).searchParams.get("caseId") || "primary").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 120) || "primary";
    const [buffer] = await storage.bucket().file(`portal-clients/${params.uid}/certificates/${caseId}/registration-certificate.pdf`).download();
    return new NextResponse(buffer, { headers: { "Content-Type": "application/pdf", "Content-Disposition": "attachment; filename=USPTO-registration-certificate.pdf", "Cache-Control": "private, no-store" } });
  } catch { return NextResponse.json({ error: "Registration certificate not found." }, { status: 404 }); }
}
