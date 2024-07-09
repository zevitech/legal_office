import "../../globals.css";
import { Inter } from "next/font/google";
import GlobalProvider from "./GlobalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Step 1 - Trademark Register | USPTO",
  description: "Register your trademark now. Trademark register form.",
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
