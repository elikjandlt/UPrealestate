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
    <section className="overflow-hidden border-y border-border bg-muted py-10">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <FadeIn>
          <p className="mb-6 text-center text-sm font-medium text-muted-foreground">{t("title")}</p>
        </FadeIn>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="animate-scroll flex w-max gap-6 hover:[animation-play-state:paused]">
          {duplicated.map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="flex h-16 w-48 shrink-0 items-center gap-3 rounded-xl bg-card px-5 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {partner.initial}
              </div>
              <span className="truncate text-sm font-semibold text-card-foreground">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
