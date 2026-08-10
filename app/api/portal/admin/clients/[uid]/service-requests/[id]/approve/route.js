import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getPortalUser,isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

export async function POST(request,{params}){
  if(!isTrustedPortalOrigin(request))return NextResponse.json({error:"Invalid request origin."},{status:403});
  const staff=await getPortalUser();if(!staff||!["admin","attorney"].includes(staff.role))return NextResponse.json({error:"Staff access required."},{status:401});
  const db=getAdminFirestore();if(!db)return NextResponse.json({error:"Portal database is not configured."},{status:503});
  const clientRef=db.collection("portalClients").doc(params.uid);const requestRef=clientRef.collection("serviceRequests").doc(params.id);const snapshot=await requestRef.get();if(!snapshot.exists)return NextResponse.json({error:"Request not found."},{status:404});
  const item=snapshot.data();if(item.type!=="existing_trademark"||item.status!=="attorney_review")return NextResponse.json({error:"This request is not awaiting review."},{status:409});
  const markName=String(item.details?.markName||"").trim();const serialNumber=String(item.details?.serialNumber||"");if(!markName||!/^\d{8}$/.test(serialNumber))return NextResponse.json({error:"The request has invalid trademark details."},{status:400});
  const caseId=`USPTO-${serialNumber}`;await clientRef.collection("cases").doc(caseId).set({markName,markType:"Existing USPTO trademark",serialNumber,status:"attorney_review",currentStage:"Record accepted for attorney review",progress:20,source:"existing_trademark_request",createdAt:FieldValue.serverTimestamp(),updatedAt:FieldValue.serverTimestamp()},{merge:true});
  await requestRef.set({status:"approved",approvedBy:staff.uid,approvedByName:staff.name,approvedAt:FieldValue.serverTimestamp()},{merge:true});
  await clientRef.collection("activity").add({type:"status",title:`${markName} added to your portfolio`,message:`Your attorney verified USPTO serial number ${serialNumber} and added this matter to your client portal.`,status:"Attorney review",read:false,createdAt:FieldValue.serverTimestamp()});
  return NextResponse.json({success:true,caseId});
}
