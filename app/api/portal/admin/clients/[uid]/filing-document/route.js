import { NextResponse } from "next/server";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminStorage } from "@/lib/firebaseAdmin";
import { validatePortalUpload } from "@/lib/portalFileValidation";

export const runtime = "nodejs";

export async function POST(request, { params }) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const staff = await getPortalUser();
  if (!staff || !["admin", "attorney"].includes(staff.role)) return NextResponse.json({ error: "Attorney access required." }, { status: 401 });
  const storage = getAdminStorage();
  if (!storage) return NextResponse.json({ error: "Secure document storage is not configured." }, { status: 503 });
  try {
    const form = await request.formData();
    const document = form.get("document");
    const caseId = String(form.get("caseId") || "primary").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 120) || "primary";
    const validation = await validatePortalUpload(document, { allowedTypes: new Set(["application/pdf"]), maxBytes: 15 * 1024 * 1024 });
    if (!validation.ok) return NextResponse.json({ error: validation.error || "A valid PDF filing document is required." }, { status: 400 });
    const path = `portal-clients/${params.uid}/filings/${caseId}/uspto-filing.pdf`;
    await storage.bucket().file(path).save(validation.buffer, { resumable: false, contentType: validation.contentType, metadata: { cacheControl: "private, no-store", metadata: { uploadedBy: staff.uid } } });
    return NextResponse.json({ success: true, documentUrl: `/api/portal/documents/filing/${params.uid}?caseId=${encodeURIComponent(caseId)}` });
  } catch { return NextResponse.json({ error: "Unable to securely upload the filing document." }, { status: 500 }); }
}
