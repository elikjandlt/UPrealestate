import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin, Award, TrendingUp } from "lucide-react";
import Image from "next/image";
import { getAgentBySlug, getProperties } from "@/lib/mock";
import { FadeIn } from "@/components/motion/FadeIn";
import { PropertyCard } from "@/components/PropertyCard";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function AgentDetailPage({ params }: Props) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  const t = await getTranslations("agentProfile");
  const agentsT = await getTranslations("agents");

  if (!agent) notFound();

  const listings = getProperties().slice(0, 2);

  return (
    <div className="bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <FadeIn>
          <div className="rounded-2xl bg-card p-6 shadow-sm md:p-8 lg:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
                {agent.image ? (
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : (
                  <Phone className="h-10 w-10 text-muted-foreground/40" />
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-card-foreground">{agent.name}</h1>
                <p className="mt-1 text-lg text-primary">{agent.specialization}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {agent.locations.map((loc) => (
                    <span
                      key={loc}
                      className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                    >
                      <MapPin className="h-3 w-3" />
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={`tel:${agent.phone}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                >
                  <Phone className="h-4 w-4" />
                  {t("phone")}
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  <Mail className="h-4 w-4" />
                  {t("email")}
                </a>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-muted p-5">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">{agentsT("sold")}</span>
                </div>
                <p className="mt-1 text-2xl font-bold">{agent.sold}</p>
              </div>
              <div className="rounded-xl bg-muted p-5">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-4 w-4" />
                  <span className="text-sm">{agentsT("days")}</span>
                </div>
                <p className="mt-1 text-2xl font-bold">{agent.avgDays}</p>
              </div>
              <div className="rounded-xl bg-muted p-5">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-4 w-4" />
                  <span className="text-sm">{t("experience")}</span>
                </div>
                <p className="mt-1 text-2xl font-bold">{agent.experience} жил</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold">{t("about")}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{agent.bio}</p>
            </div>
          </div>
        </FadeIn>

        {listings.length > 0 && (
          <div className="mt-12">
            <FadeIn>
              <h2 className="text-2xl font-bold">Агентын листингүүд</h2>
            </FadeIn>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {listings.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
