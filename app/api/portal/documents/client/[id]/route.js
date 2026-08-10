import { NextResponse } from "next/server";
import { getPortalUser } from "@/lib/portalAuth";
import { getAdminFirestore, getAdminStorage } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  const user = await getPortalUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const requestedUid = new URL(request.url).searchParams.get("clientUid") || user.uid;
  if (user.uid !== requestedUid && !["admin", "attorney"].includes(user.role)) return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  const db = getAdminFirestore();
  const storage = getAdminStorage();
  if (!db || !storage) return NextResponse.json({ error: "Secure document storage is not configured." }, { status: 503 });
  try {
    const snapshot = await db.collection("portalClients").doc(requestedUid).collection("documents").doc(params.id).get();
    if (!snapshot.exists) return NextResponse.json({ error: "Document not found." }, { status: 404 });
    const document = snapshot.data();
    const [buffer] = await storage.bucket().file(document.storagePath).download();
    const safeName = String(document.fileName || "client-document").replace(/["\r\n]/g, "_");
    return new NextResponse(buffer, { headers: { "Content-Type": document.contentType || "application/octet-stream", "Content-Disposition": `attachment; filename="${safeName}"`, "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Document not found." }, { status: 404 });
  }
}
