import { NextResponse } from "next/server";
import { getPortalUser } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

export async function GET(request, { params }) {
  const staff = await getPortalUser();
  if (!staff || !["admin", "attorney"].includes(staff.role)) return NextResponse.json({ error: "Attorney access required." }, { status: 401 });
  const db = getAdminFirestore();
  if (!db) return NextResponse.json({ error: "Portal database is not configured." }, { status: 503 });
  try {
    const caseId = new URL(request.url).searchParams.get("caseId") || "";
    const snapshot = await db.collection("portalClients").doc(params.uid).collection("documents").orderBy("createdAt", "desc").limit(50).get();
    const documents = snapshot.docs.map((doc) => { const item = doc.data(); return { id: doc.id, fileName: item.fileName, contentType: item.contentType, size: item.size, caseId: item.caseId, documentUrl: item.documentUrl, createdAt: item.createdAt?.toDate?.().toISOString() || null }; }).filter((item) => !caseId || !item.caseId || item.caseId === caseId);
    return NextResponse.json({ documents });
  } catch {
    return NextResponse.json({ error: "Unable to load client documents." }, { status: 500 });
  }
}
