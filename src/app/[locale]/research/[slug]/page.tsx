import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getNews } from "@/lib/mock";
import { FadeIn } from "@/components/motion/FadeIn";

type Params = Promise<{ locale: string; slug: string }>;

export default async function ResearchDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const t = await getTranslations("news");
  const item = getNews().find((n) => n.slug === slug);
  if (!item) return notFound();

  return (
    <div className="bg-muted min-h-screen py-10 lg:py-14">
      <div className="mx-auto max-w-[900px] px-4 lg:px-8">
        <FadeIn>
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>

          <article className="mt-6 overflow-hidden rounded-2xl bg-card shadow-sm">
            <div className="h-64 bg-gradient-to-br from-primary/80 to-accent" />
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  {item.category}
                </span>
                <span>{item.date}</span>
              </div>
              <h1 className="mt-4 text-2xl font-bold md:text-4xl">{item.title}</h1>
              <p className="mt-6 text-base leading-relaxed text-card-foreground">{item.excerpt}</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {t("detailPlaceholder")}
              </p>
            </div>
          </article>
        </FadeIn>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return getNews().map((item) => ({ slug: item.slug }));
}
