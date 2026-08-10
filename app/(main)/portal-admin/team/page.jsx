import { redirect } from "next/navigation";
import PortalTeamManager from "@/components/portal/PortalTeamManager";
import { getPortalUser } from "@/lib/portalAuth";
export const metadata={title:"Attorney Team | Legal Trademark Office",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";
export default async function TeamPage({searchParams}){const preview=process.env.NODE_ENV!=="production"&&searchParams?.preview==="1";const user=preview?{uid:"preview-admin",name:"Preview Administrator",email:"preview@legaltrademarkoffice.example",role:"admin"}:await getPortalUser();if(!user)redirect("/portal-admin/login");if(!["admin","attorney"].includes(user.role))redirect("/client-portal");return <PortalTeamManager preview={preview} currentUser={{uid:user.uid,name:user.name,email:user.email,role:user.role}}/>}
