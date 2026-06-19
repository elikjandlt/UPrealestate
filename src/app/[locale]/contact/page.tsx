"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
import { getContactInfo } from "@/lib/mock";
import { FadeIn } from "@/components/motion/FadeIn";
import { FaqSection } from "@/components/sections/FaqSection";

export default function ContactPage() {
  const t = useTranslations("contact");
  const info = getContactInfo();
  const [sent, setSent] = useState(false);

  return (
    <>
      <div className="bg-primary py-16 text-primary-foreground lg:py-20">
        <div className="mx-auto max-w-[1440px] px-4 text-center lg:px-8 xl:px-[120px]">
          <FadeIn>
            <h1 className="text-3xl font-bold md:text-4xl">{t("title")}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-primary-foreground/90">{t("subtitle")}</p>
          </FadeIn>
        </div>
      </div>

      <div className="bg-background py-10 lg:py-14">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
          <div className="grid gap-10 lg:grid-cols-3">
            <FadeIn className="space-y-6 lg:col-span-1">
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold">{t("title")}</h2>
                <div className="mt-5 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div className="text-muted-foreground">
                      {info.address.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-primary" />
                    <div className="text-muted-foreground">
                      {info.phones.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-primary" />
                    <div className="text-muted-foreground">
                      {info.emails.map((e) => (
                        <p key={e}>{e}</p>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div className="text-muted-foreground">
                      {info.hours.map((h) => (
                        <p key={h}>{h}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-2">
              <div className="rounded-2xl bg-card p-6 shadow-sm md:p-8">
                <h2 className="text-xl font-semibold">{t("formTitle")}</h2>

                {sent ? (
                  <div className="mt-8 flex flex-col items-center py-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                      <Check className="h-8 w-8 text-success" />
                    </div>
                    <p className="mt-4 font-medium">Мессеж илгээгдлээ</p>
                    <p className="text-sm text-muted-foreground">Бид тантай удахгүй холбогдох болно.</p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="mt-6 grid gap-5 md:grid-cols-2"
                  >
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">{t("name")}</label>
                      <input
                        type="text"
                        required
                        placeholder={t("namePlaceholder")}
                        className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">{t("phone")}</label>
                      <input
                        type="tel"
                        required
                        placeholder={t("phonePlaceholder")}
                        className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium">{t("email")}</label>
                      <input
                        type="email"
                        required
                        placeholder={t("emailPlaceholder")}
                        className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium">{t("subject")}</label>
                      <input
                        type="text"
                        required
                        placeholder={t("subjectPlaceholder")}
                        className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium">{t("message")}</label>
                      <textarea
                        required
                        rows={5}
                        placeholder={t("messagePlaceholder")}
                        className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        <Send className="h-4 w-4" />
                        {t("submit")}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      <FaqSection />
    </>
  );
}
