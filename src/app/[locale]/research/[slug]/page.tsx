import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Calendar, Share2, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getNews } from "@/lib/mock";
import { FadeIn } from "@/components/motion/FadeIn";

type Params = Promise<{ locale: string; slug: string }>;

export default async function ResearchDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const t = await getTranslations("news");
  const items = getNews();
  const item = items.find((n) => n.slug === slug);
  if (!item) return notFound();

  const related = items.filter((n) => n.slug !== slug).slice(0, 3);
  const readTime = Math.max(3, Math.ceil(item.content.length / 800));

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-24">
      <div className="relative h-[300px] w-full overflow-hidden md:h-[420px] lg:h-[480px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-4 pb-8 md:pb-12 lg:px-8 xl:px-[120px]">
          <FadeIn>
            <Link
              href="/research"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("back")}
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/90">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold">{item.category}</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {item.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readTime} {t("readTime")}
              </span>
            </div>
            <h1 className="mt-3 max-w-4xl text-2xl font-bold text-white md:text-4xl lg:text-5xl">{item.title}</h1>
          </FadeIn>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 pt-10 lg:px-8 lg:pt-14 xl:px-[120px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <FadeIn>
              <div className="rounded-2xl bg-card p-6 shadow-sm md:p-10">
                <p className="text-lg font-medium leading-relaxed text-card-foreground md:text-xl">{item.excerpt}</p>
                <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
                  {item.content.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {item.gallery && item.gallery.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-lg font-bold text-card-foreground">{t("gallery")}</h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {item.gallery.slice(1).map((src, idx) => (
                        <div key={idx} className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                          <Image
                            src={src}
                            alt={`${item.title} ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{t("share")}:</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white transition-transform hover:scale-110"
                        aria-label="Facebook"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </button>
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white transition-transform hover:scale-110"
                        aria-label="Instagram"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                      </button>
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition-transform hover:scale-110"
                        aria-label="Share"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <Link
                    href="/research"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {t("back")}
                  </Link>
                </div>
              </div>
            </FadeIn>
          </article>

          <aside className="space-y-8 lg:col-span-4">
            <FadeIn>
              <div className="rounded-2xl bg-card p-5 shadow-sm">
                <h3 className="text-base font-bold">{t("related")}</h3>
                <div className="mt-4 space-y-4">
                  {related.map((n) => (
                    <Link
                      key={n._id}
                      href={`/research/${n.slug}`}
                      className="group flex gap-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={n.image}
                          alt={n.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="line-clamp-2 text-sm font-semibold leading-snug text-card-foreground transition-colors group-hover:text-primary">{n.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{n.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-2xl bg-muted p-5">
                <h3 className="text-base font-bold">{t("categories")}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Array.from(new Set(items.map((i) => i.category))).map((cat) => (
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
          </aside>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return getNews().map((item) => ({ slug: item.slug }));
}
