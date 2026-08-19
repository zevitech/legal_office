"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineSparkles,
} from "react-icons/hi2";

const previewStorageKey = (client) => `lto_demo_portal_messages_${client.key}`;

export default function AdminSecureMessages({ client, preview }) {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  const relevantMessages = useMemo(
    () =>
      messages.filter((item) => !item.caseId || item.caseId === client.caseId),
    [messages, client.caseId],
  );

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        if (preview) {
          const items = JSON.parse(
            localStorage.getItem(previewStorageKey(client)) || "[]",
          );
          if (active) setMessages(items);
        } else {
          const response = await fetch(
            `/api/portal/admin/clients/${client.uid}/messages?caseId=${encodeURIComponent(client.caseId)}`,
            { cache: "no-store" },
          );
          if (response.ok && active)
            setMessages((await response.json()).messages || []);
        }
      } catch {
        if (active) setMessages([]);
      }
    }
    load();
    if (preview) window.addEventListener("storage", load);
    return () => {
      active = false;
      if (preview) window.removeEventListener("storage", load);
    };
  }, [client, preview]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [relevantMessages.length]);

  async function assist(action) {
    setBusy(true);
    setResult("");
    try {
      if (preview) {
        const last = [...relevantMessages]
          .reverse()
          .find((item) => item.direction === "client_to_staff");
        setReply(
          `Hi ${client.name.split(/\s+/)[0]}, thanks for your message. We received your question about “${String(last?.body || "your trademark matter").slice(0, 140)}.” I’m reviewing it and will update you here shortly.`,
        );
        setResult("Smart draft prepared. Review it before sending.");
        return;
      }
      const response = await fetch("/api/portal/admin/ai-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          clientName: client.name,
          messages: relevantMessages,
        }),
      });
      const payload = await response.json();
      if (!response.ok)
        throw new Error(payload.error || "Assistant unavailable");
      if (action === "draft_reply") setReply(payload.text);
      else setResult(payload.text);
      if (action === "draft_reply")
        setResult(
          payload.configured
            ? "AI draft prepared. Review it before sending."
            : "Safe draft prepared. Add the server OpenAI API key to enable AI drafting.",
        );
    } catch (error) {
      setResult(error.message || "Unable to prepare a draft.");
    } finally {
      setBusy(false);
    }
  }

  async function sendReply(event) {
    event.preventDefault();
    const message = reply.trim();
    if (!message) {
      setResult("Write a reply before sending.");
      return;
    }
    setBusy(true);
    setResult("");
    try {
      let saved;
      if (preview) {
        saved = {
          id: crypto.randomUUID(),
          caseId: client.caseId,
          body: message,
          senderName: "Legal team",
          senderRole: "attorney",
          direction: "staff_to_client",
          createdAt: new Date().toISOString(),
        };
        const next = [...messages, saved];
        localStorage.setItem(previewStorageKey(client), JSON.stringify(next));
        const updatesKey = `lto_demo_portal_updates_${client.key}`;
        const updates = JSON.parse(localStorage.getItem(updatesKey) || "[]");
        localStorage.setItem(
          updatesKey,
          JSON.stringify([
            {
              id: crypto.randomUUID(),
              type: "message",
              title: "New secure reply from your legal team",
              message,
              caseId: client.caseId,
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...updates,
          ]),
        );
      } else {
        const response = await fetch(
          `/api/portal/admin/clients/${client.uid}/messages`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ caseId: client.caseId, message }),
          },
        );
        const payload = await response.json();
        if (!response.ok)
          throw new Error(payload.error || "Unable to send reply");
        saved = payload.message;
      }
      setMessages((items) => [...items, saved]);
      setReply("");
      setResult("Reply sent securely. The client was also alerted by email.");
    } catch (error) {
      setResult(error.message || "Unable to send the reply.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
      <header className="border-b border-blue-100 bg-blue-50 p-5">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#027dd6] text-xl text-white">
            <HiOutlineChatBubbleLeftRight />
          </span>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#027dd6]">
              Secure support channel
            </p>
            <h3 className="mt-1 text-xl font-extrabold">
              Conversation with {client.name}
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Short, conversational replies stay in this case. Email is only a
              backup alert.
            </p>
          </div>
        </div>
      </header>
      <div className="max-h-[48vh] space-y-3 overflow-y-auto bg-slate-50 p-5">
        {relevantMessages.length ? (
          relevantMessages.map((item) => (
            <article
              key={item.id}
              className={`flex ${item.direction === "staff_to_client" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${item.direction === "staff_to_client" ? "rounded-br-md bg-[#027dd6] text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-800"}`}
              >
                <p className="text-[10px] font-extrabold uppercase tracking-wider opacity-70">
                  {item.direction === "staff_to_client"
                    ? item.senderName || "Legal team"
                    : item.senderName || client.name}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-6">
                  {item.body}
                </p>
                <p className="mt-1 text-[10px] opacity-65">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "Just now"}
                </p>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <HiOutlineChatBubbleLeftRight className="mx-auto text-3xl text-slate-400" />
            <p className="mt-3 font-extrabold">No secure messages yet</p>
            <p className="mt-1 text-sm text-slate-500">
              The client’s first portal message will appear here.
            </p>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <form onSubmit={sendReply} className="space-y-3 p-5">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => assist("draft_reply")}
            className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-xs font-extrabold text-violet-700 disabled:opacity-50"
          >
            <HiOutlineSparkles /> Draft friendly reply
          </button>
          <button
            type="button"
            disabled={busy || !relevantMessages.length}
            onClick={() => assist("summarize_thread")}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-extrabold text-slate-700 disabled:opacity-50"
          >
            Summarize thread
          </button>
        </div>
        <p className="text-[11px] leading-5 text-slate-500">
          AI assists with drafting only. It cannot send messages, give legal
          advice, change a case, schedule calls, or charge a client.
        </p>
        <textarea
          value={reply}
          onChange={(event) => setReply(event.target.value)}
          className="min-h-28 w-full rounded-xl border border-slate-300 p-4 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          placeholder="Write a quick, helpful reply…"
        />
        {result && (
          <p className="whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-xs font-bold leading-5 text-slate-700">
            {result}
          </p>
        )}
        <button
          disabled={busy || !reply.trim()}
          className="w-full rounded-xl bg-[#006fbd] px-5 py-3.5 text-sm font-extrabold text-white disabled:opacity-50"
        >
          {busy ? "Working…" : "Send secure reply"}
        </button>
      </form>
    </section>
  );
}
