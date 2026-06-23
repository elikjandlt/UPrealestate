"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";

const partners = [
  { name: "Khan Bank", initial: "KB" },
  { name: "Golomt Bank", initial: "GB" },
  { name: "XacBank", initial: "XB" },
  { name: "TDB", initial: "TD" },
  { name: "M Bank", initial: "MB" },
  { name: "Chinggis Khaan Bank", initial: "CK" },
  { name: "Capitron Bank", initial: "CB" },
  { name: "Ard Credit", initial: "AC" },
];

export function PartnersSection() {
  const t = useTranslations("partners");
  const duplicated = [...partners, ...partners, ...partners];

  return (
    <section className="overflow-hidden border-y border-border bg-muted py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">{t("title")}</h2>
        </FadeIn>
      </div>

      <div className="relative mt-10 w-full overflow-hidden">
        <div className="animate-scroll flex w-max gap-8 hover:[animation-play-state:paused]">
          {duplicated.map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="flex h-20 w-64 shrink-0 items-center gap-4 rounded-2xl bg-card px-6 shadow-sm"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {partner.initial}
              </div>
              <span className="truncate text-base font-semibold text-card-foreground">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
