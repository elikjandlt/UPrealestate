"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

type Message = { role: "bot" | "user"; text: string };

function getReply(input: string, t: (key: string) => string) {
  const text = input.toLowerCase();
  if (/үнэ|үнэлгээ|хэд/.test(text)) return t("priceReply");
  if (/зарах|борлуулах|зар/.test(text)) return t("sellReply");
  if (/худалдаж авах|авах|орон сууц|байр/.test(text)) return t("buyReply");
  if (/түрээс|түрээслэх/.test(text)) return t("rentReply");
  if (/агент|зууч|агентууд/.test(text)) return t("agentReply");
  if (/шимтгэл|комисс/.test(text)) return t("commissionReply");
  if (/холбоо барих|утас|имэйл|хаяг/.test(text)) return t("contactReply");
  if (/сайн уу|сайн|hello|hi/.test(text)) return t("greeting");
  return t("fallback");
}

export function Chatbot() {
  const t = useTranslations("chatbot");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: t("greeting") },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getReply(text, t) }]);
    }, 600);
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("close") : t("open")}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[420px] w-[340px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">{t("title")}</p>
              <p className="text-xs text-primary-foreground/80">{t("subtitle")}</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    m.role === "user" ? "bg-muted" : "bg-primary/10"
                  }`}
                >
                  {m.role === "user" ? (
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder={t("placeholder")}
                className="flex-1 rounded-full border border-border bg-input px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={handleSend}
                aria-label={t("send")}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
