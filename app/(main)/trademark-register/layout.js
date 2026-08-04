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

// NESTED layout — must NOT render <html> or <body>. Only the root layout
// (app/layout.js) may do that; a second <html> here is discarded by the browser
// along with everything inside it, which is why Tag Assistant reported
// "GTM-KJGHNHGM not found" on the registration pages.
//
// GTM, gtag (both Ads accounts), LiveChat and Clarity all come from the root
// layout and already apply to every page — they must NOT be repeated here, or
// the container and Ads tags would load twice and double-count conversions.
export default function TrademarkRegisterLayout({ children }) {
  return (
    <div className={inter.className}>
      {/* MouseFlow — specific to the registration funnel */}
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

      <div className={`bg-form-bod`}></div>
      <GlobalProvider>{children}</GlobalProvider>
    </div>
  );
}
