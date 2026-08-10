import { NextResponse } from "next/server";
import { getPortalUser } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

const serialize = (doc) => {
  const item=doc.data();
  return {id:doc.id,...Object.fromEntries(Object.entries(item).map(([key,value])=>[key,value?.toDate?value.toDate().toISOString():value]))};
};

export async function GET(){
  const user=await getPortalUser();
  if(!user||user.role!=="client")return NextResponse.json({error:"Client access required."},{status:401});
  const db=getAdminFirestore();
  if(!db)return NextResponse.json({error:"Portal database is not configured."},{status:503});
  try{
    const clientRef=db.collection("portalClients").doc(user.uid);
    const [clientSnapshot,casesSnapshot,activitySnapshot]=await Promise.all([
      clientRef.get(),
      clientRef.collection("cases").orderBy("createdAt","desc").limit(100).get(),
      clientRef.collection("activity").orderBy("createdAt","desc").limit(100).get(),
    ]);
    if(!clientSnapshot.exists)return NextResponse.json({error:"Client portal account not found."},{status:404});
    const client=clientSnapshot.data()||{};
    const cases=casesSnapshot.docs.map((doc)=>{const item=serialize(doc);return{...item,markName:item.markName||"Trademark application",company:item.owner||client.company||user.name,markType:item.markType||"Trademark",stage:item.currentStage||item.status||"Application received",progress:Number(item.progress||12),packageName:item.packageName||"Service",orderTotal:Number(item.orderTotal||0),serialNumber:item.serialNumber||null}});
    return NextResponse.json({cases,activity:activitySnapshot.docs.map(serialize)});
  }catch{return NextResponse.json({error:"Unable to refresh the portal dashboard."},{status:500})}
}
