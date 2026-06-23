import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Calendar,
  Phone,
  Flame,
  Car,
  Home,
  Building,
  CheckCircle2,
  Mail,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { getPropertyBySlug, getAgentBySlug, getProperties } from "@/lib/mock";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/FadeIn";
import { PropertyCard } from "@/components/PropertyCard";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  const t = await getTranslations("property");

  if (!property) notFound();

  const agent = property.agentId ? getAgentBySlug(property.agentId) : null;
  const formatPrice = (price: number) => "₮" + price.toLocaleString("mn-MN");
  const pricePerSqm = Math.round(property.price / property.area);
  const related = getProperties()
    .filter((p) => p._id !== property._id && p.district === property.district)
    .slice(0, 4);

  return (
    <div className="bg-background py-6 lg:py-10">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <FadeIn>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {property.badges.map((badge) => (
              <span
                key={badge}
                className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                  badge === "Зарах"
                    ? "bg-primary text-primary-foreground"
                    : badge === "Түрээс"
                    ? "bg-destructive text-white"
                    : badge === "Verified"
                    ? "bg-success text-white"
                    : "bg-foreground text-background"
                }`}
              >
                {badge}
              </span>
            ))}
            <span className="text-sm text-muted-foreground">{t("published")}: 3 {t("daysAgo")}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">{property.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{property.location}</span>
            </div>
          </div>
        </FadeIn>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FadeIn delay={0.05} className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl lg:min-h-[420px]">
              <Image
                src={property.gallery?.[0] || property.image || ""}
                alt={property.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </FadeIn>
          {property.gallery?.slice(1, 4).map((img, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.05}>
              <div className="relative hidden min-h-[140px] overflow-hidden rounded-2xl md:block lg:min-h-[200px]">
                <Image src={img} alt={`${property.title} ${i + 2}`} fill className="object-cover" sizes="25vw" />
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <FadeIn delay={0.2}>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <h2 className="text-xl font-bold text-card-foreground">{t("generalInfo")}</h2>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <InfoItem icon={BedDouble} label={t("rooms")} value={String(property.rooms || "-")} />
                  <InfoItem icon={Bath} label={t("bathrooms")} value={String(property.bathrooms || "-")} />
                  <InfoItem icon={Maximize} label={t("area")} value={`${property.area} м²`} />
                  <InfoItem icon={Building} label={t("floor")} value={property.floor} />
                  <InfoItem icon={Calendar} label={t("yearBuilt")} value={property.yearBuilt?.toString() || "-"} />
                  <InfoItem icon={Car} label={t("garage")} value={property.garage || "-"} />
                  <InfoItem icon={CheckCircle2} label={t("condition")} value={property.condition || "-"} />
                  <InfoItem icon={Home} label={t("type")} value={property.type === "sell" ? "Зарах" : "Түрээслэх"} />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <h2 className="text-xl font-bold text-card-foreground">{t("descriptionTitle")}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{property.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {property.amenities.map((a) => (
                    <span key={a} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">{a}</span>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <h2 className="text-xl font-bold text-card-foreground">{t("map")}</h2>
                <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2689!2d${property.coordinates?.lng || 106.9}!3d${property.coordinates?.lat || 47.91}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smn!4v1`}
                  />
                </div>
              </div>
            </FadeIn>

            {related.length > 0 && (
              <FadeIn delay={0.35}>
                <div className="rounded-2xl bg-card p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-card-foreground">{t("similar")}</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {related.map((p) => (
                      <PropertyCard key={p._id} property={p} />
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}
          </div>

          <div className="space-y-6">
            <FadeIn delay={0.25}>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">{property.type === "sell" ? "Үнэ" : "Түрээсийн үнэ /сар"}</p>
                <p className="mt-1 text-3xl font-bold text-primary">{formatPrice(property.price)}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t("pricePerSqm")}: {formatPrice(pricePerSqm)}</p>
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <Flame className="h-4 w-4" />
                  <span>{t("demand")}: {property.demand}</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">{t("agent")}</p>
                {agent ? (
                  <div className="mt-3">
                    <Link href={`/agents/${agent.slug}`} className="flex items-center gap-3">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full bg-muted">
                        {agent.image ? (
                          <Image src={agent.image} alt={agent.name} fill className="object-cover" sizes="56px" />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center text-sm font-bold text-muted-foreground">
                            {agent.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-card-foreground">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">{agent.phone}</p>
                      </div>
                    </Link>
                    <a
                      href={`tel:${agent.phone}`}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <Phone className="h-4 w-4" />
                      {t("callNow")}
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
                    >
                      <Mail className="h-4 w-4" />
                      {t("bookViewing")}
                    </a>
                  </div>
                ) : (
                  <Link
                    href="/agents"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Phone className="h-4 w-4" />
                    {t("callNow")}
                  </Link>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">{t("agentCompany")}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">RE/MAX UP Properties</p>
                    <p className="text-sm text-muted-foreground">Улаанбаатар, Сүхбаатар</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-muted p-4">
      <Icon className="mt-0.5 h-5 w-5 text-primary" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-semibold text-card-foreground">{value}</p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return getProperties().map((p) => ({ slug: p.slug }));
}
