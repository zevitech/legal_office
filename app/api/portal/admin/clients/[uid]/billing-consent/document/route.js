import { NextResponse } from "next/server";
import { getPortalUser } from "@/lib/portalAuth";
import { getAdminStorage } from "@/lib/firebaseAdmin";

export async function GET(request,{params}){
  const staff=await getPortalUser();if(!staff||!["admin","attorney"].includes(staff.role))return NextResponse.json({error:"Attorney access required."},{status:401});
  const storage=getAdminStorage();if(!storage)return NextResponse.json({error:"Secure storage is not configured."},{status:503});
  const url=new URL(request.url);const recordId=String(url.searchParams.get("recordId")||"").replace(/[^A-Za-z0-9_-]/g,"");const fileName=String(url.searchParams.get("file")||"").replace(/[^A-Za-z0-9._-]/g,"_").slice(-120);
  if(!recordId||!fileName)return NextResponse.json({error:"Invalid consent record."},{status:400});
  try{const file=storage.bucket().file(`portal-clients/${params.uid}/billing-consent/${recordId}/${fileName}`);const [metadata]=await file.getMetadata();const [buffer]=await file.download();return new NextResponse(buffer,{headers:{"Content-Type":metadata.contentType||"application/octet-stream","Content-Disposition":`attachment; filename="${fileName}"`,"Cache-Control":"private, no-store"}})}catch{return NextResponse.json({error:"Consent evidence not found."},{status:404})}
}
