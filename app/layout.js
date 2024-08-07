import Head from "next/head";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Register Trademark - Legal Trademark Office",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
