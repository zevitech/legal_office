import { NextResponse } from "next/server";
import { getPortalUser } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

export async function GET(_request,{params}){
  const staff=await getPortalUser();if(!staff||!["admin","attorney"].includes(staff.role))return NextResponse.json({error:"Staff access required."},{status:401});
  const db=getAdminFirestore();if(!db)return NextResponse.json({error:"Portal database is not configured."},{status:503});
  const snapshot=await db.collection("portalClients").doc(params.uid).collection("serviceRequests").get();
  const requests=snapshot.docs.map(doc=>{const item=doc.data();return{id:doc.id,...item,createdAt:item.createdAt?.toDate?.().toISOString()||null}}).sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
  return NextResponse.json({requests});
}
