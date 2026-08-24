"use client";

import { FaRegMessage } from "react-icons/fa6";

export default function LiveChatButton({ className = "", label = "Live Chat" }) {
  const openChat = () => {
    if (window.LiveChatWidget?.call) {
      window.LiveChatWidget.call("maximize");
      return;
    }
    window.open("https://www.livechat.com/chat-with/19098393/", "_blank", "noopener,noreferrer");
  };

  return (
    <button type="button" onClick={openChat} className={className} aria-label="Open customer support live chat">
      <FaRegMessage aria-hidden="true" /> {label}
    </button>
  );
}
