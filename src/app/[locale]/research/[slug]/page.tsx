import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
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
      <div className="border-b border-border bg-background py-10 lg:py-14">
        <div className="mx-auto max-w-[900px] px-4 text-center lg:px-8">
          <FadeIn>
            <Link
              href="/research"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("back")}
            </Link>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{item.category}</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {item.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readTime} {t("readTime")}
              </span>
            </div>
            <h1 className="mt-5 text-2xl font-bold text-foreground md:text-4xl">{item.title}</h1>
          </FadeIn>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 pt-8 lg:px-8">
        <FadeIn>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes="900px"
              priority
            />
          </div>
        </FadeIn>

        <div className="mt-10">
          <FadeIn>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-10">
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
                      <div key={idx} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
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

              <div className="mt-10 border-t border-border pt-6">
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
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <FadeIn>
              <h2 className="text-xl font-bold">{t("related")}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((n) => (
                  <Link
                    key={n._id}
                    href={`/research/${n.slug}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                      <Image
                        src={n.image}
                        alt={n.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-foreground">{n.category}</span>
                        <span>{n.date}</span>
                      </div>
                      <h3 className="mt-3 line-clamp-2 min-h-[3.5rem] text-base font-bold leading-snug text-card-foreground transition-colors group-hover:text-primary">{n.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return getNews().map((item) => ({ slug: item.slug }));
}
