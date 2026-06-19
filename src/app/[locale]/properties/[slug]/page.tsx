import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { MapPin, BedDouble, Maximize, Calendar, Phone, Flame } from "lucide-react";
import { getPropertyBySlug } from "@/lib/mock";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/FadeIn";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  const t = await getTranslations("property");

  if (!property) notFound();

  const formatPrice = (price: number) => "₮" + price.toLocaleString("mn-MN");

  return (
    <div className="bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <FadeIn>
          <div className="mb-4 flex flex-wrap gap-2">
            {property.badges.map((badge) => (
              <span
                key={badge}
                className="rounded px-2 py-1 text-xs font-semibold bg-primary text-primary-foreground"
              >
                {badge}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">{property.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{property.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{property.floor}</span>
            </div>
          </div>
        </FadeIn>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FadeIn delay={0.1}>
              <div className="aspect-[16/10] rounded-2xl bg-muted">
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <Maximize className="h-16 w-16 opacity-20" />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-8 rounded-2xl bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-card-foreground">{t("details")}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{property.description}</p>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-xs text-muted-foreground">Өрөө</p>
                    <p className="text-lg font-semibold">{property.rooms || "-"}</p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-xs text-muted-foreground">Талбай</p>
                    <p className="text-lg font-semibold">{property.area} м²</p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-xs text-muted-foreground">Давхар</p>
                    <p className="text-lg font-semibold">{property.floor}</p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-xs text-muted-foreground">Төрөл</p>
                    <p className="text-lg font-semibold">{property.type === "sell" ? "Зарах" : "Түрээслэх"}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div className="space-y-6">
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Үнэ</p>
                <p className="mt-1 text-3xl font-bold text-primary">{formatPrice(property.price)}</p>
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm text-accent-foreground">
                  <Flame className="h-4 w-4" />
                  <span>{t("demand")}: {property.demand}</span>
                </div>
              </div>

              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Агенттай холбогдох</p>
                <Link
                  href="/agents"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Phone className="h-4 w-4" />
                  {t("callNow")}
                </Link>
                <button className="mt-3 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold transition-colors hover:bg-secondary">
                  {t("bookViewing")}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
