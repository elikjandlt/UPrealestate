"use client";

import { useTranslations } from "next-intl";
import { Globe, Plane, Landmark, ArrowRight } from "lucide-react";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

const icons = {
  globe: Globe,
  plane: Plane,
  landmark: Landmark,
};

const images = {
  globe: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&q=80",
  plane: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
  landmark: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
};

export function InternationalSection() {
  const t = useTranslations("international");

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <FadeIn>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <span className="rounded-full bg-destructive/10 px-4 py-1 text-sm font-semibold text-destructive">
              Global
            </span>
            <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">{t("title")}</h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-muted-foreground">{t("subtitle")}</p>
        </FadeIn>

        <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3">
          {(["globe", "plane", "landmark"] as const).map((key) => {
            const Icon = icons[key];
            return (
              <StaggerItem key={key}>
                <div className="group overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={images[key]}
                      alt={t(`${key}.title`)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-card-foreground">{t(`${key}.title`)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${key}.desc`)}</p>
                    <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-destructive transition-colors hover:text-destructive/80">
                      {t("learnMore") || "Дэлгэрэнгүй"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
