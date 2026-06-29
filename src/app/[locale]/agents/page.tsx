import { getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin, Building2, TrendingUp, Clock, Award } from "lucide-react";
import Image from "next/image";
import { getAgents } from "@/lib/mock";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/FadeIn";
import { AgentRequestForm } from "@/components/AgentRequestForm";
import { SocialButtons } from "@/components/SocialButtons";

export default async function AgentsPage() {
  const t = await getTranslations("agents");
  const agents = getAgents();

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[220px] w-full overflow-hidden md:h-[260px]">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80"
          alt="Agents hero"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-primary-foreground">
          <FadeIn>
            <h1 className="text-3xl font-bold md:text-4xl">{t("title")}</h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-2 max-w-2xl text-base opacity-90 md:text-lg">{t("subtitle")}</p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 py-10 lg:px-8 lg:py-14 xl:px-[120px]">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="order-2 grid gap-6 sm:grid-cols-2 lg:order-1 lg:col-span-8">
            {agents.map((agent) => (
              <Link
                key={agent._id}
                href={`/agents/${agent.slug}` as "/agents/:path*"}
                className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-64 w-full overflow-hidden bg-muted">
                  {agent.image ? (
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  ) : (
                    <Phone className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/40" />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-xl font-bold text-primary">{agent.name}</h2>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    {agent.office}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-4 w-4" />
                      <span>{agent.mobile || agent.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="h-4 w-4" />
                      <span>{agent.email}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-start gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{agent.address}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={`tel:${agent.mobile || agent.phone}`}
                      className="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      Надтай холбогдоно уу
                    </a>
                    <SocialButtons socials={agent.socials} />
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4">
                    <Stat icon={<TrendingUp className="h-4 w-4" />} label={t("sold")} value={String(agent.sold)} />
                    <Stat icon={<Clock className="h-4 w-4" />} label={t("days")} value={`${agent.avgDays}`} />
                    <Stat icon={<Award className="h-4 w-4" />} label="Туршлага" value={`${agent.experience} жил`} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="order-1 lg:order-2 lg:col-span-4">
            <div className="sticky top-24">
              <AgentRequestForm agents={agents.map((a) => ({ _id: a._id, name: a.name, slug: a.slug }))} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-1 text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="mt-1 text-base font-bold text-foreground">{value}</p>
    </div>
  );
}
