"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { MapPin, ArrowRight, Building2, Handshake, Plane } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

const countries = [
  {
    key: "dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    flag: "🇦🇪",
  },
  {
    key: "thailand",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
    flag: "🇹🇭",
  },
  {
    key: "philippines",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&q=80",
    flag: "🇵🇭",
  },
  {
    key: "usa",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80",
    flag: "🇺🇸",
  },
  {
    key: "canada",
    image: "https://images.unsplash.com/photo-1517090504332-eac2c7b9e9d2?w=600&q=80",
    flag: "🇨🇦",
  },
];

const features = [
  { key: "investors", icon: Handshake },
  { key: "consulting", icon: Plane },
  { key: "projects", icon: Building2 },
];

export function InternationalSection() {
  const t = useTranslations("international");

  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground lg:py-28">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-primary-foreground">
                <Plane className="h-4 w-4" />
                {t("badge")}
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-5 text-3xl font-bold md:text-4xl lg:text-5xl">{t("title")}</h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 max-w-xl text-lg text-primary-foreground/80">{t("subtitle")}</p>
            </FadeIn>

            <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-3">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <StaggerItem key={f.key}>
                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm transition-colors hover:bg-white/15">
                      <Icon className="h-8 w-8 text-destructive" />
                      <h3 className="mt-3 text-base font-semibold">{t(`${f.key}.title`)}</h3>
                      <p className="mt-1 text-sm text-primary-foreground/70">{t(`${f.key}.desc`)}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

          <FadeIn delay={0.3} direction="left">
            <div className="rounded-3xl bg-white p-6 text-foreground shadow-2xl lg:p-8">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                <MapPin className="h-5 w-5 text-destructive" />
                {t("countriesTitle")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{t("countriesSubtitle")}</p>

              <div className="mt-6 grid gap-4">
                {countries.map((c) => (
                  <div
                    key={c.key}
                    className="group flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-3 transition-shadow hover:shadow-md"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={c.image}
                        alt={t(`${c.key}.name`)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-2xl">{c.flag}</p>
                      <p className="font-semibold text-card-foreground">{t(`${c.key}.name`)}</p>
                      <p className="text-sm text-muted-foreground">{t(`${c.key}.desc`)}</p>
                    </div>
                    <ArrowRight className="mr-2 h-5 w-5 text-muted-foreground transition-colors group-hover:text-destructive" />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
