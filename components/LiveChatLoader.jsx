"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// The marketing site keeps the LiveChat bubble. The client and attorney portals
// have their own secure messaging, and a second floating widget there collides
// with the portal controls, so the script is never mounted on those routes.
const PORTAL_PREFIXES = ["/client-portal", "/portal-admin", "/portal-login", "/portal"];

const isPortalRoute = (pathname) =>
  PORTAL_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

export default function LiveChatLoader() {
  const pathname = usePathname() || "/";
  const hidden = isPortalRoute(pathname);

  // Client-side navigation from the marketing site into the portal leaves an
  // already-initialised widget behind, so hide it explicitly as well.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.LiveChatWidget?.call?.(hidden ? "hide" : "minimize");
    } catch {
      // The widget may not have finished loading; the CSS rule below still applies.
    }
  }, [hidden]);

  if (hidden) {
    return <style>{`#chat-widget-container,#chat-widget-minimized{display:none !important;}`}</style>;
  }

  return (
    <Script
      id="livechat-script"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
      window._lc = window._lc || {};
      window.__lc = window.__lc || {};
      window.__lc.license = 19098393;
      window.__lc.integration_name = "manual_onboarding";
      window.__lc.product_name = "livechat";

      (function(n, t, c) {
        function i(n) {
          return e.h ? e._h.apply(null, n) : e._q.push(n);
        }

        var e = {
          _q: [],
          _h: null,
          _v: "2.0",
          on: function() { i(["on", c.call(arguments)]) },
          once: function() { i(["once", c.call(arguments)]) },
          off: function() { i(["off", c.call(arguments)]) },
          get: function() {
            if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
            return i(["get", c.call(arguments)]);
          },
          call: function() { i(["call", c.call(arguments)]) },
          init: function() {
            var s = t.createElement("script");
            s.async = true;
            s.type = "text/javascript";
            s.src = "https://cdn.livechatinc.com/tracking.js";
            t.head.appendChild(s);
          }
        };

        if (!n._lc.asyncInit) e.init();
        n.LiveChatWidget = n.LiveChatWidget || e;
      })(window, document, [].slice);
    `,
      }}
    />
  );
}
