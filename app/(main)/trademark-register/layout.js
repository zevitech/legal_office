import "../../globals.css";
import { Inter } from "next/font/google";
import GlobalProvider from "./GlobalProvider";
import Script from "next/script";

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

      {/* Google Tag Manager */}
      {/* <Script
        id="gtm"
        type="text/javascript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M76V8V3F');`,
        }}
      /> */}

      {/* MouseFlow Tracking */}
      {/* <Script
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
      /> */}
      <body className={`${inter.className}`}>
        {/* Google Tag Manager (noscript) */}
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M76V8V3F"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript> */}

        <div className={`bg-form-bod`}></div>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
