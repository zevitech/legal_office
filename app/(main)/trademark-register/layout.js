import "../../globals.css";
import { Inter } from "next/font/google";
import GlobalProvider from "./GlobalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Step 1 - Register Trademark | Legal Trademark Office",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className={`bg-form-body`}></div>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
