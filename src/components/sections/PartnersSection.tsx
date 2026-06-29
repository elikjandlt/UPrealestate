"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";

const partners = [
  { name: "ЗБ Сервис", fullName: "ZB Service Solutions", color: "#16a34a", icon: "ZB" },
  { name: "Эко Кластер", fullName: "Eco Cluster", color: "#84cc16", icon: "ЭК" },
  { name: "HUNVU", fullName: "HUNVU RMC", color: "#ea580c", icon: "HU" },
  { name: "ICEMARK", fullName: "Icemark", color: "#0ea5e9", icon: "IC" },
  { name: "Милко", fullName: "Milko", color: "#dc2626", icon: "МК" },
  { name: "Taste Gate", fullName: "Taste Gate International", color: "#d97706", icon: "TG" },
  { name: "UB Coffee", fullName: "Ulaanbaatar Coffee", color: "#374151", icon: "UB" },
];

export function PartnersSection() {
  const t = useTranslations("partners");

  return (
    <section className="overflow-hidden bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <FadeIn>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t("title")}</h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-10 rounded-full bg-[#f0f0f2] px-8 py-10">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {partners.map((partner) => (
                <div key={partner.name} className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white shadow-sm"
                    style={{ backgroundColor: partner.color }}
                  >
                    {partner.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-foreground">{partner.name}</span>
                    <span className="text-xs text-muted-foreground">{partner.fullName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
