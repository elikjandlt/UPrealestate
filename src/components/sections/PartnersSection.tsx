"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";

const partners = [
  { name: "ЗБ Сервис", initial: "ZB", color: "#16a34a" },
  { name: "Эко Кластер", initial: "ЭК", color: "#84cc16" },
  { name: "HUNVU", initial: "HU", color: "#ea580c" },
  { name: "ICEMARK", initial: "IC", color: "#0ea5e9" },
  { name: "Милко", initial: "МК", color: "#dc2626" },
  { name: "Taste Gate", initial: "TG", color: "#d97706" },
  { name: "UB Coffee", initial: "UB", color: "#374151" },
];

export function PartnersSection() {
  const t = useTranslations("partners");
  const duplicated = [...partners, ...partners, ...partners];

  return (
    <section className="overflow-hidden bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <FadeIn>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t("title")}</h2>
        </FadeIn>
      </div>

      <div className="relative mt-10 w-full overflow-hidden rounded-full bg-[#f0f0f2] py-10">
        <div className="animate-scroll flex w-max items-center gap-16 hover:[animation-play-state:paused]">
          {duplicated.map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="flex shrink-0 items-center gap-4"
            >
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white shadow-sm"
                style={{ backgroundColor: partner.color }}
              >
                {partner.initial}
              </div>
              <span className="whitespace-nowrap text-xl font-bold text-foreground">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
