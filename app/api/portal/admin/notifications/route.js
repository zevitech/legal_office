import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

export async function GET() {
  const staff = await getPortalUser();
  if (!staff || !["admin", "attorney"].includes(staff.role)) return NextResponse.json({ error: "Attorney access required." }, { status: 401 });
  const db = getAdminFirestore();
  if (!db) return NextResponse.json({ notifications: [] });
  try {
    const snapshot = await db.collection("portalAttorneyNotifications").orderBy("createdAt", "desc").limit(50).get();
    return NextResponse.json({ notifications: snapshot.docs.map((doc) => { const item = doc.data(); return { id: doc.id, ...item, createdAt: item.createdAt?.toDate?.().toISOString() || null }; }) });
  } catch {
    return NextResponse.json({ error: "Unable to load notifications." }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const staff = await getPortalUser();
  if (!staff || !["admin", "attorney"].includes(staff.role)) return NextResponse.json({ error: "Attorney access required." }, { status: 401 });
  const db = getAdminFirestore();
  if (!db) return NextResponse.json({ error: "Portal database is not configured." }, { status: 503 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id || !/^[A-Za-z0-9_-]{1,160}$/.test(id)) return NextResponse.json({ error: "Valid notification required." }, { status: 400 });
  try {
    await db.collection("portalAttorneyNotifications").doc(id).set({ read: true, readAt: FieldValue.serverTimestamp(), readBy: staff.uid }, { merge: true });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to update notification." }, { status: 500 });
  }
}
