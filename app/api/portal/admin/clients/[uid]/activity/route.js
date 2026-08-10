import { NextResponse } from "next/server";
import { getPortalUser } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

export async function GET(request,{params}){
  const staff=await getPortalUser();if(!staff||!["admin","attorney"].includes(staff.role))return NextResponse.json({error:"Attorney access required."},{status:401});
  const db=getAdminFirestore();if(!db)return NextResponse.json({error:"Portal database is not configured."},{status:503});
  try{const caseId=new URL(request.url).searchParams.get("caseId")||"";const snapshot=await db.collection("portalClients").doc(params.uid).collection("activity").orderBy("createdAt","desc").limit(100).get();const activity=snapshot.docs.map(doc=>{const item=doc.data();return{id:doc.id,...item,createdAt:item.createdAt?.toDate?.().toISOString()||null}}).filter(item=>!caseId||!item.caseId||item.caseId===caseId).slice(0,50);return NextResponse.json({activity})}catch{return NextResponse.json({error:"Unable to load case activity."},{status:500})}
}
