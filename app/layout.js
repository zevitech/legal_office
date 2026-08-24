import { Poppins } from "next/font/google";
import Script from "next/script";

import GlobalProvider from "./GlobalProvider";
import ClickIdCapture from "@/components/tracking/ClickIdCapture";
import LiveChatLoader from "@/components/LiveChatLoader";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://www.legaltrademarkoffice.com"),
  title: "Register Trademark - Legal Trademark Office",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.legaltrademarkoffice.com/#organization",
      name: "Legal Trademark Office",
      url: "https://www.legaltrademarkoffice.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.legaltrademarkoffice.com/images/legal-trademark-office.png",
      },
      telephone: "+1-310-424-4909",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2121 Crystal Dr",
        addressLocality: "Arlington",
        addressRegion: "VA",
        postalCode: "22202",
        addressCountry: "US",
      },
      description:
        "Independent professional trademark filing support service that assists customers with trademark application preparation and submission.",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.legaltrademarkoffice.com/#website",
      url: "https://www.legaltrademarkoffice.com/",
      name: "Legal Trademark Office",
      publisher: { "@id": "https://www.legaltrademarkoffice.com/#organization" },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Tawk.to */}
      {/* <Script
        id="tawkTo"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/669c6bd9becc2fed69284ba7/1i39gaj7r';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
        }}
      /> */}

      {/* Live Chat — marketing pages only; the portal routes opt out. */}
      <LiveChatLoader />

      {/* Google Tag Manager */}
      <Script
        id="gtm"
        type="text/javascript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KJGHNHGM');`,
        }}
      />

      {/* Google tag (gtag.js) for Google Ads. Kept as a direct base tag so
          conversions keep recording
          even before the GTM container's triggers are fully configured. */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-16565473053"
        strategy="afterInteractive"
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16565473053');
          `,
        }}
      />

      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body className={`${poppins.className} bg-color-secondary`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KJGHNHGM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Starts Live Chat (noscript) */}
        <noscript>
          <a href="https://www.livechat.com/chat-with/19098393/" rel="nofollow">
            Chat with us
          </a>
          , powered by{" "}
          <a
            href="https://www.livechat.com/?welcome"
            rel="noopener nofollow"
            target="_blank"
          >
            LiveChat
          </a>
        </noscript>
        {/* Ends Live Chat (noscript) */}

        <ClickIdCapture />

        <GlobalProvider>
          {children}
          <Script id="clarity-script" strategy="lazyOnload">
            {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ouge10k1z4");
          `}
          </Script>
        </GlobalProvider>
      </body>
    </html>
  );
}
