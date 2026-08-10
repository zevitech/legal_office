import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebaseAdmin";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { sendAttorneyInvitationEmail } from "@/lib/portalEmail";

export async function GET() {
  const current=await getPortalUser();if(!current||!["admin","attorney"].includes(current.role))return NextResponse.json({error:"Attorney access required."},{status:401});const db=getAdminFirestore();if(!db)return NextResponse.json({error:"Attorney management is not configured."},{status:503});const snapshot=await db.collection("portalAttorneys").where("status","==","active").limit(100).get();return NextResponse.json({attorneys:snapshot.docs.map(doc=>({id:doc.id,...doc.data(),createdAt:doc.data().createdAt?.toDate?.().toISOString()||null,updatedAt:doc.data().updatedAt?.toDate?.().toISOString()||null}))});
}

export async function POST(request) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const current = await getPortalUser();
  if (!current || current.role !== "admin") return NextResponse.json({ error: "Owner administrator access required." }, { status: 401 });
  const auth = getAdminAuth(); const db = getAdminFirestore();
  if (!auth || !db) return NextResponse.json({ error: "Attorney management is not configured." }, { status: 503 });
  try {
    const body = await request.json(); const name = String(body.name || "").trim(); const email = String(body.email || "").trim().toLowerCase();
    if (!name || !email.includes("@")) return NextResponse.json({ error: "Valid name and email are required." }, { status: 400 });
    let user;
    try { user = await auth.getUserByEmail(email); user = await auth.updateUser(user.uid, { displayName: name, disabled: false }); }
    catch (error) { if (error.code !== "auth/user-not-found") throw error; user = await auth.createUser({ email, displayName: name }); }
    await auth.setCustomUserClaims(user.uid, { role: "attorney" });
    await db.collection("portalAttorneys").doc(user.uid).set({ uid: user.uid, name, email, title: body.title || "Trademark attorney", phone: body.phone || "", role: "attorney", status: "active", updatedAt: FieldValue.serverTimestamp(), createdAt: FieldValue.serverTimestamp() }, { merge: true });
    const base = (process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
    const firebaseLink = await auth.generatePasswordResetLink(email, { url: `${base}/portal-login` }); const code = new URL(firebaseLink).searchParams.get("oobCode");
    await sendAttorneyInvitationEmail({ name, email, setupUrl: `${base}/portal/set-password?oobCode=${encodeURIComponent(code)}&email=${encodeURIComponent(email)}` });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Unable to add the attorney." }, { status: 500 }); }
}

export async function PATCH(request) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const current = await getPortalUser();
  if (!current || !["admin", "attorney"].includes(current.role)) return NextResponse.json({ error: "Attorney access required." }, { status: 401 });
  const auth = getAdminAuth(); const db = getAdminFirestore();
  if (!auth || !db) return NextResponse.json({ error: "Attorney management is not configured." }, { status: 503 });
  try {
    const body = await request.json();
    const requestedId = String(body.id || "");
    const uid = current.role === "admin" && requestedId ? requestedId : current.uid;
    const name = String(body.name || "").trim();
    if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
    await auth.updateUser(uid, { displayName: name });
    await db.collection("portalAttorneys").doc(uid).set({ name, title: String(body.title || "Trademark attorney"), phone: String(body.phone || ""), bio: String(body.bio || ""), updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Unable to update the attorney profile." }, { status: 500 }); }
}
