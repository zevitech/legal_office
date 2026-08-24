"use client";

import { FaRegMessage } from "react-icons/fa6";

const DIRECT_CHAT_URL = "https://direct.lc.chat/19098393/";

export default function LiveChatButton({ className = "", label = "Live Chat" }) {
  const openChat = (event) => {
    try {
      const widget = window.LiveChatWidget;
      if (!widget?.call || !widget?.get) return;

      // `get` throws while LiveChat is only queued but not ready. In that case,
      // allow the normal direct-chat link below to open instead.
      widget.get("state");
      event.preventDefault();
      widget.call("maximize");
    } catch {
      // The direct chat URL is the reliable fallback when the widget is delayed
      // or blocked by a browser extension.
    }
  };

  return (
    <a
      href={DIRECT_CHAT_URL}
      target="_blank"
      rel="noopener nofollow"
      onClick={openChat}
      className={className}
      aria-label="Open customer support live chat"
    >
      <FaRegMessage aria-hidden="true" /> {label}
    </a>
  );
}
