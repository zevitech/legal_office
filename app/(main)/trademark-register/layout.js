export const metadata = {
  title: "Register Trademark | Legal Trademark Office",
  description:
    "A guided trademark registration intake with clear service and government-fee disclosures.",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

// The root app layout already provides Redux, NextUI, analytics and the document
// shell. Keeping this nested layout structural prevents duplicate providers,
// duplicate Google tags and invalid nested <html>/<body> elements.
export default function TrademarkRegisterLayout({ children }) {
  return <GlobalProvider>{children}</GlobalProvider>;
}
import GlobalProvider from "./GlobalProvider";
