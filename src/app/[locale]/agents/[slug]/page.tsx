import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin, Building2, TrendingUp, Clock, Award } from "lucide-react";
import Image from "next/image";
import { getAgentBySlug, getProperties } from "@/lib/mock";
import { FadeIn } from "@/components/motion/FadeIn";
import { PropertyCard } from "@/components/PropertyCard";
import { SocialButtons } from "@/components/SocialButtons";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function AgentDetailPage({ params }: Props) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  const t = await getTranslations("agentProfile");
  const agentsT = await getTranslations("agents");

  if (!agent) notFound();

  const listings = getProperties().filter((p) => p.agentId === agent._id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <FadeIn>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-2xl bg-card p-6 shadow-sm md:p-8">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:h-48 sm:w-48">
                    {agent.image ? (
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    ) : (
                      <Phone className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/40" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-card-foreground">{agent.name}</h1>
                    <p className="mt-1 flex items-center gap-1.5 text-lg text-primary">
                      <Building2 className="h-5 w-5" />
                      {agent.office}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
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

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <a
                        href={`tel:${agent.mobile || agent.phone}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                      >
                        <Phone className="h-4 w-4" />
                        Надтай холбогдоно уу
                      </a>
                      <SocialButtons socials={agent.socials} />
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <StatCard icon={<TrendingUp className="h-4 w-4" />} label={agentsT("sold")} value={String(agent.sold)} />
                  <StatCard icon={<Clock className="h-4 w-4" />} label={agentsT("days")} value={`${agent.avgDays} өдөр`} />
                  <StatCard icon={<Award className="h-4 w-4" />} label={t("experience")} value={`${agent.experience} жил`} />
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-semibold">{t("about")}</h2>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{agent.about || agent.bio}</p>
                </div>

                {agent.timeline && agent.timeline.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold">Миний туршлага</h2>
                    <div className="mt-4 space-y-4">
                      {agent.timeline.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="h-3 w-3 rounded-full bg-primary" />
                            {idx !== agent.timeline.length - 1 && <div className="mt-1 h-full w-px bg-border" />}
                          </div>
                          <div className="pb-4">
                            <p className="text-sm font-semibold text-foreground">{item.year}</p>
                            <p className="text-sm text-muted-foreground">{item.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {listings.length > 0 && (
                <div className="mt-10">
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

            <div className="lg:col-span-4">
              <div className="sticky top-24 rounded-2xl bg-card p-6 shadow-sm">
                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full bg-muted">
                  {agent.image && (
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  )}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-lg font-bold">{agent.name}</p>
                  <p className="text-sm text-muted-foreground">{agent.office}</p>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>{agent.mobile || agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="break-all">{agent.email}</span>
                  </div>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{agent.address}</span>
                  </div>
                </div>

                <div className="mt-5 flex justify-center">
                  <SocialButtons socials={agent.socials} />
                </div>

                <a
                  href={`tel:${agent.mobile || agent.phone}`}
                  className="mt-5 block w-full rounded-lg bg-primary py-3 text-center text-sm font-semibold text-primary-foreground"
                >
                  Надтай холбогдоно уу
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
