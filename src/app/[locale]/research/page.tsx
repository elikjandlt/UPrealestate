import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, Calendar, TrendingUp, Mail, Search } from "lucide-react";
import { getNews } from "@/lib/mock";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

export default async function ResearchPage() {
  const t = await getTranslations("news");
  const items = getNews();
  const [featured, ...rest] = items;
  const categories = Array.from(new Set(items.map((i) => i.category)));
  const popular = [...items].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 4);

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-24">
      <section className="relative overflow-hidden bg-muted py-14 lg:py-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
          <FadeIn>
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <TrendingUp className="h-3.5 w-3.5" />
                {t("featured")}
              </span>
              <h1 className="mt-4 text-3xl font-bold text-foreground md:text-5xl">{t("title")}</h1>
              <p className="mt-3 text-base text-muted-foreground md:text-lg">{t("subtitle")}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 pt-10 lg:px-8 lg:pt-14 xl:px-[120px]">
        {featured && (
          <FadeIn>
            <Link
              href={`/research/${featured.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-card shadow-sm transition-shadow hover:shadow-lg lg:flex-row"
            >
              <div className="relative h-64 w-full overflow-hidden bg-muted lg:h-auto lg:w-1/2">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-1 flex-col justify-center p-6 lg:p-10">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
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

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">{t("latest")}</h2>
              <div className="relative hidden w-64 sm:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("search")}
                  className="w-full rounded-lg border border-border bg-input py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <StaggerContainer className="grid gap-6 md:grid-cols-2">
              {rest.map((item) => (
                <StaggerItem key={item._id}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md">
                    <Link href={`/research/${item.slug}`} className="relative h-48 w-full overflow-hidden bg-muted">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="rounded-full bg-accent px-2.5 py-0.5 font-medium text-accent-foreground">
                          {item.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.date}
                        </span>
                      </div>
                      <Link href={`/research/${item.slug}`}>
                        <h3 className="mt-3 text-lg font-bold leading-snug text-card-foreground transition-colors group-hover:text-primary">{item.title}</h3>
                      </Link>
                      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
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

          <aside className="space-y-8 lg:col-span-4">
            <FadeIn>
              <div className="rounded-2xl bg-card p-5 shadow-sm">
                <h3 className="text-base font-bold">{t("categories")}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <span
                      key={cat}
                      className="cursor-pointer rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-2xl bg-card p-5 shadow-sm">
                <h3 className="text-base font-bold">{t("popular")}</h3>
                <div className="mt-4 space-y-4">
                  {popular.map((item) => (
                    <Link
                      key={item._id}
                      href={`/research/${item.slug}`}
                      className="group flex gap-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="line-clamp-2 text-sm font-semibold leading-snug text-card-foreground transition-colors group-hover:text-primary">{item.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground">
                <div className="relative z-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{t("subscribeTitle")}</h3>
                  <p className="mt-2 text-sm opacity-90">{t("subscribeDesc")}</p>
                  <form className="mt-4 space-y-2">
                    <input
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      className="w-full rounded-lg bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-white/30"
                    />
                    <button
                      type="button"
                      className="w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-primary transition-transform hover:scale-[1.02]"
                    >
                      {t("subscribe")}
                    </button>
                  </form>
                </div>
                <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/10" />
              </div>
            </FadeIn>
          </aside>
        </div>
      </div>
    </div>
  );
}
