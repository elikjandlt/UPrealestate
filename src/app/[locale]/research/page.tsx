import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getNews } from "@/lib/mock";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

export default async function ResearchPage() {
  const t = await getTranslations("news");
  const items = getNews();

  return (
    <div className="bg-muted min-h-screen py-10 lg:py-14">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <FadeIn>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">{t("title")}</h1>
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>
        </FadeIn>

        <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <StaggerItem key={item._id}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md">
                <div className="h-52 bg-gradient-to-br from-primary/80 to-accent" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      {item.category}
                    </span>
                    <span>{item.date}</span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold leading-snug text-card-foreground">{item.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
                  <Link
                    href={`/research/${item.slug}`}
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
    </div>
  );
}
