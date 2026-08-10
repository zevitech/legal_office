import { NextResponse } from "next/server";
import { getPortalUser } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

export async function GET() {
  const user = await getPortalUser();
  if (!user || user.role !== "client") return NextResponse.json({ methods: [] }, { status: 401 });
  const db = getAdminFirestore();
  if (!db) return NextResponse.json({ methods: [] }, { status: 503 });
  const snapshot = await db.collection("portalClients").doc(user.uid).collection("billingMethods").where("status", "==", "active").limit(5).get();
  return NextResponse.json({ methods: snapshot.docs.map((doc) => { const item = doc.data(); return { id: doc.id, cardBrand:item.cardBrand||"Card", lastFour:item.lastFour||"" }; }) });
}
