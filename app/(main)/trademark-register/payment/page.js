import FormHero from "@/components/form/FormHero";
import Payment from "@/components/form/steps/Payment";

import Script from "next/script";

export const metadata = {
  title: "Payment - Register Trademark | Legal Trademark Office",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

// Pixel Tag
<Script
  id="Pixel"
  type="text/javascript"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
    !function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
 fbq('init', '1778222035980026'); 
fbq('track', 'PageView');
   `,
  }}
/>;

const page = () => {
  return (
    <main>
      <FormHero />
      <Payment />
    </main>
  );
};

export default page;
