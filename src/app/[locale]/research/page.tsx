import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { getNews } from "@/lib/mock";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

export default async function ResearchPage() {
  const t = await getTranslations("news");
  const items = getNews();
  const [featured, ...rest] = items;
  const categories = Array.from(new Set(items.map((i) => i.category)));

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-24">
      <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden md:min-h-[380px]">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
          alt="News hero"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto max-w-[1440px] px-4 text-center text-white lg:px-8 xl:px-[120px]">
          <FadeIn>
            <span className="text-sm font-semibold uppercase tracking-wider text-white/80">{featured?.category}</span>
            <h1 className="mx-auto mt-3 max-w-3xl text-3xl font-bold md:text-5xl">{t("title")}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-base opacity-90 md:text-lg">{t("subtitle")}</p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 pt-10 lg:px-8 lg:pt-14 xl:px-[120px]">
        {featured && (
          <FadeIn>
            <Link
              href={`/research/${featured.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted lg:aspect-auto">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center p-6 lg:p-10">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {featured.date}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-card-foreground md:text-3xl">{featured.title}</h2>
                <p className="mt-3 line-clamp-3 text-base leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {t("readMore")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </FadeIn>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground cursor-default">
            Бүгд
          </span>
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary cursor-pointer"
            >
              {cat}
            </span>
          ))}
        </div>

        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <StaggerItem key={item._id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md">
                <Link href={`/research/${item.slug}`} className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-muted px-2.5 py-0.5 font-medium text-foreground">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </span>
                  </div>
                  <Link href={`/research/${item.slug}`}>
                    <h3 className="mt-3 line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-snug text-card-foreground transition-colors group-hover:text-primary">{item.title}</h3>
                  </Link>
                  <p className="mt-2 line-clamp-3 min-h-[3.75rem] flex-1 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
                  <Link
                    href={`/research/${item.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    {t("readMore")}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
