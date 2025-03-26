import { Inter } from "next/font/google";
import Script from "next/script";

import GlobalProvider from "./GlobalProvider";

import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Step 1 - Register Trademark | Legal Trademark Office",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
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

      {/* Live Chat */}
      <Script
        id="livechat-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      window._lc = window._lc || {};
      window.__lc.license = 19098393;
      window.__lc.integration_name = "manual_onboarding";
      window.__lc.product_name = "livechat";
      (function(n,t,c){
        function i(n){return e.h?e._h.apply(null,n):e._q.push(n)}
        var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},
        once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},
        get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},
        call:function(){i(["call",c.call(arguments)])},init:function(){
          var n=t.createElement("script");
          n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)
        }};
        !n._lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e
      }(window,document,[].slice));
    `,
        }}
      />

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

      {/* MouseFlow Tracking */}
      <Script
        id="mfq"
        type="text/javascript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: ` window._mfq = window._mfq || [];
              (function() {
                var mf = document.createElement("script");
                mf.type = "text/javascript"; mf.defer = true;
                mf.src = "//cdn.mouseflow.com/projects/6d88ebfa-5138-492c-b0b1-2f54e50b2048.js";
                document.getElementsByTagName("head")[0].appendChild(mf);
              })();
            `,
        }}
      />

      <body className={`${inter.className}`}>
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

        <div className={`bg-form-bod`}></div>
        <GlobalProvider>
          {children}
          <Script id="clarity-script" strategy="afterInteractive">
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
