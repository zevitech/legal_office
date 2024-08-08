import Head from "next/head";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Register Trademark - Legal Trademark Office",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        id="clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "nfkffgj87k");`,
        }}
      />
      <Head>
        <meta
          name="keywords"
          content="where to register business name, trademark my name, trademark brand name, apply for trademark online, trade mark a company name, file my trademark, brand name trademark registration, best trademark registration service, trademark filing company, cheap trademark registration, trade mark registration, get a trademark, register my business, register my company name, trademark my logo, trademark my business name, apply for trademark, file trademark for business name, trademark registration, register my business name, register business name, trademark a name, file a trademark, get my brand trademarked, trademark and brand registration"
        />
        <meta name="author" content="Legal Trademark Office" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
