"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { getNews } from "@/lib/mock";

export function NewsResearchSection() {
  const t = useTranslations("news");
  const items = getNews();

  return (
    <section className="bg-muted py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <FadeIn>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t("title")}</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <Link
              href="#"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              {t("viewAll")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>

        <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <StaggerItem key={item._id}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md">
                <div className="h-44 bg-gradient-to-br from-primary/80 to-accent" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      {item.category}
                    </span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-card-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/news/${item.slug}`}
                    className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    {t("readMore")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
