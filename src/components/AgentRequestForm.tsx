"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, Check, User, Phone, MessageSquare } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

interface Agent {
  _id: string;
  name: string;
  slug: string;
}

export function AgentRequestForm({ agents }: { agents: Agent[] }) {
  const t = useTranslations("agentRequest");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    agentId: "",
    name: "",
    phone: "",
    message: "",
  });

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <FadeIn>
        <div className="rounded-2xl bg-card p-6 text-center shadow-sm md:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
            <Check className="h-7 w-7 text-success" />
          </div>
          <h2 className="mt-4 text-xl font-bold">{t("sentTitle")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("sentDesc")}</p>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <div className="rounded-2xl bg-card p-5 shadow-sm md:p-6">
        <h2 className="text-xl font-bold">{t("title")}</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">{t("subtitle")}</p>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">{t("selectAgent")}</label>
            <select
              value={form.agentId}
              onChange={(e) => update("agentId", e.target.value)}
              required
              className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">{t("anyAgent")}</option>
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>{agent.name}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="relative">
              <label className="mb-1.5 block text-sm font-medium">{t("name")}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                  className="w-full rounded-lg border border-border bg-input py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="relative">
              <label className="mb-1.5 block text-sm font-medium">{t("phone")}</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  required
                  className="w-full rounded-lg border border-border bg-input py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <label className="mb-1.5 block text-sm font-medium">{t("message")}</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                rows={4}
                required
                className="w-full rounded-lg border border-border bg-input py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            <Send className="h-4 w-4" />
            {t("submit")}
          </button>
        </form>
      </div>
    </FadeIn>
  );
}
