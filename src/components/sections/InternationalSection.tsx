"use client";

import { useTranslations } from "next-intl";
import { Globe, Plane, Landmark } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

const icons = {
  globe: Globe,
  plane: Plane,
  landmark: Landmark,
};

export function InternationalSection() {
  const t = useTranslations("international");

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">{t("title")}</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-muted-foreground">{t("subtitle")}</p>
        </FadeIn>

        <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3">
          {(["globe", "plane", "landmark"] as const).map((key) => {
            const Icon = icons[key];
            return (
              <StaggerItem key={key}>
                <div className="rounded-2xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-card-foreground">{t(`${key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${key}.desc`)}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
