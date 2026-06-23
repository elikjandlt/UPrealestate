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

export function AgentRequestSection({ agents }: { agents: Agent[] }) {
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
      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-[600px] px-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <Check className="h-8 w-8 text-success" />
          </div>
          <h2 className="mt-4 text-2xl font-bold">{t("sentTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{t("sentDesc")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-[900px] px-4 lg:px-8">
        <FadeIn>
          <div className="rounded-2xl bg-card p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold">{t("title")}</h2>
            <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
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

              <div className="md:col-span-2">
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

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  <Send className="h-4 w-4" />
                  {t("submit")}
                </button>
              </div>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
