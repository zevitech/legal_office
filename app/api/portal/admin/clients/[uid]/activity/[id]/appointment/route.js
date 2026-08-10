import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getPortalUser,isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { sendPortalActivityEmail } from "@/lib/portalEmail";
import { requestEvidence } from "@/lib/paymentEvidence";

async function context(request,params){
  if(!isTrustedPortalOrigin(request))return{error:NextResponse.json({error:"Invalid request origin."},{status:403})};
  const staff=await getPortalUser();if(!staff||!["admin","attorney"].includes(staff.role))return{error:NextResponse.json({error:"Attorney access required."},{status:401})};
  const db=getAdminFirestore();if(!db)return{error:NextResponse.json({error:"Portal database is not configured."},{status:503})};
  const clientRef=db.collection("portalClients").doc(params.uid);const activityRef=clientRef.collection("activity").doc(params.id);const snapshot=await activityRef.get();if(!snapshot.exists||snapshot.data()?.type!=="appointment")return{error:NextResponse.json({error:"Appointment not found."},{status:404})};
  return{staff,clientRef,activityRef,current:snapshot.data()};
}

export async function PATCH(request,{params}){
  const ctx=await context(request,params);if(ctx.error)return ctx.error;
  const body=await request.json();
  if(body.appointmentStatus==="completed"){
    const completed={appointmentStatus:"completed",message:"The mandatory attorney consultation was completed. Your attorney may now prepare and share the search and clearance report.",completedAt:FieldValue.serverTimestamp(),updatedBy:ctx.staff.uid,updatedByName:ctx.staff.name,updatedAt:FieldValue.serverTimestamp(),read:false};
    await ctx.activityRef.set(completed,{merge:true});
    const linked=await ctx.clientRef.collection("appointments").where("activityId","==",params.id).get();
    await Promise.all(linked.docs.map(doc=>doc.ref.set({status:"completed",completedAt:FieldValue.serverTimestamp(),updatedAt:FieldValue.serverTimestamp()},{merge:true})));
    if(ctx.current.caseId)await ctx.clientRef.collection("cases").doc(ctx.current.caseId).set({consultationStatus:"completed",consultationCompletedAt:FieldValue.serverTimestamp(),currentStage:"Attorney consultation completed — clearance search in progress",progress:32,updatedAt:FieldValue.serverTimestamp()},{merge:true});
    await ctx.clientRef.collection("auditLog").add({event:"mandatory_attorney_consultation_completed",activityId:params.id,caseId:ctx.current.caseId||null,performedBy:ctx.staff.uid,performedByName:ctx.staff.name,performedByRole:ctx.staff.role,createdAt:FieldValue.serverTimestamp(),...requestEvidence(request)});
    const client=await ctx.clientRef.get();const data=client.data()||{};try{await sendPortalActivityEmail({clientName:data.name,clientEmail:data.email,attorneyName:ctx.staff.name,type:"appointment",title:`Completed: ${ctx.current.title||"Attorney consultation"}`,message:completed.message,appointmentStatus:"completed"})}catch(error){console.error("Appointment completion saved; email failed:",error?.message)}
    return NextResponse.json({success:true,consultationCompleted:true});
  }
  const update={title:String(body.title||"").slice(0,160),message:String(body.message||"").slice(0,4000),appointmentAt:body.appointmentAt||null,meetingType:body.meetingType==="phone"?"phone":"google_meet",meetingUrl:String(body.meetingUrl||"").slice(0,500),phoneNumber:String(body.phoneNumber||"").slice(0,40),appointmentStatus:"scheduled",updatedBy:ctx.staff.uid,updatedByName:ctx.staff.name,updatedAt:FieldValue.serverTimestamp(),read:false};
  if(!update.appointmentAt||(update.meetingType==="google_meet"&&!/^https:\/\/meet\.google\.com\//i.test(update.meetingUrl))||(update.meetingType==="phone"&&update.phoneNumber.replace(/\D/g,"").length<10))return NextResponse.json({error:"Valid appointment details are required."},{status:400});
  await ctx.activityRef.set(update,{merge:true});const linked=await ctx.clientRef.collection("appointments").where("activityId","==",params.id).get();await Promise.all(linked.docs.map(doc=>doc.ref.set({title:update.title,startsAt:update.appointmentAt,meetingType:update.meetingType,meetingUrl:update.meetingUrl,phoneNumber:update.phoneNumber,status:"scheduled",updatedAt:FieldValue.serverTimestamp()},{merge:true})));
  const client=await ctx.clientRef.get();const data=client.data()||{};try{await sendPortalActivityEmail({clientName:data.name,clientEmail:data.email,attorneyName:ctx.staff.name,type:"appointment",title:`Updated: ${update.title||"Attorney appointment"}`,message:update.message||"Your attorney updated this appointment.",...update})}catch(error){console.error("Appointment updated; email failed:",error?.message)}
  return NextResponse.json({success:true});
}

export async function DELETE(request,{params}){
  const ctx=await context(request,params);if(ctx.error)return ctx.error;
  await ctx.activityRef.set({appointmentStatus:"cancelled",title:ctx.current.title||"Attorney appointment",message:"This appointment was cancelled by your legal team. A replacement time will be sent if needed.",updatedBy:ctx.staff.uid,updatedByName:ctx.staff.name,updatedAt:FieldValue.serverTimestamp(),read:false},{merge:true});const linked=await ctx.clientRef.collection("appointments").where("activityId","==",params.id).get();await Promise.all(linked.docs.map(doc=>doc.ref.set({status:"cancelled",updatedAt:FieldValue.serverTimestamp()},{merge:true})));
  const client=await ctx.clientRef.get();const data=client.data()||{};try{await sendPortalActivityEmail({clientName:data.name,clientEmail:data.email,attorneyName:ctx.staff.name,type:"appointment",title:`Cancelled: ${ctx.current.title||"Attorney appointment"}`,message:"This appointment was cancelled by your legal team. A replacement time will be sent if needed."})}catch(error){console.error("Appointment cancelled; email failed:",error?.message)}
  return NextResponse.json({success:true});
}
