import { NextResponse } from "next/server";
import { getPortalUser } from "@/lib/portalAuth";

export async function GET(request){
  const user=await getPortalUser(); if(!user||user.role!=="client")return NextResponse.json({error:"Client access required."},{status:401});
  const query=new URL(request.url).searchParams.get("q")?.toLowerCase().replace(/[^a-z0-9-]/g,"").slice(0,60);
  if(!query)return NextResponse.json({error:"Enter a valid domain name."},{status:400});
  const key=process.env.GODADDY_API_KEY, secret=process.env.GODADDY_API_SECRET;
  if(!key||!secret)return NextResponse.json({error:"Live registrar search is awaiting GoDaddy API credentials."},{status:503});
  try{
    const names=[`${query}.com`,`${query}.co`,`${query}.net`,`${query}.us`];
    const results=await Promise.all(names.map(async domain=>{const response=await fetch(`https://api.godaddy.com/v1/domains/available?domain=${encodeURIComponent(domain)}&checkType=FAST&forTransfer=false`,{headers:{Authorization:`sso-key ${key}:${secret}`,Accept:"application/json"},cache:"no-store"});if(!response.ok)return {domain,available:false,error:true};const data=await response.json();return {domain,available:Boolean(data.available),price:Number(data.price||0)/100,currency:data.currency||"USD"}}));
    return NextResponse.json({results});
  }catch{return NextResponse.json({error:"Registrar search is temporarily unavailable."},{status:502})}
}
