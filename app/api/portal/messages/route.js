import { NextResponse } from "next/server";
import { getPortalUser } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

export async function GET(request) {
  const user = await getPortalUser();
  if (!user || user.role !== "client") return NextResponse.json({ error: "Client access required." }, { status: 401 });
  const db = getAdminFirestore();
  if (!db) return NextResponse.json({ messages: [] });
  const caseId = String(new URL(request.url).searchParams.get("caseId") || "").slice(0, 120);
  try {
    const snapshot = await db.collection("portalClients").doc(user.uid).collection("messages").orderBy("createdAt", "asc").limit(200).get();
    const messages = snapshot.docs.map((doc) => { const item=doc.data();return{id:doc.id,...item,createdAt:item.createdAt?.toDate?.().toISOString()||null}; }).filter((item)=>!caseId||!item.caseId||item.caseId===caseId);
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: "Unable to load secure messages." }, { status: 500 });
  }
}
