import { getTranslations } from "next-intl/server";
import { Phone, Mail } from "lucide-react";
import Image from "next/image";
import { getAgents } from "@/lib/mock";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { AgentRequestSection } from "@/components/sections/AgentRequestSection";

export default async function AgentsPage() {
  const t = await getTranslations("agents");
  const profile = await getTranslations("agentProfile");
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
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <StaggerItem key={agent._id}>
              <Link
                href={`/agents/${agent.slug}` as "/agents/:path*"}
                className="block rounded-2xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
                    {agent.image ? (
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <Phone className="h-7 w-7 text-muted-foreground/40" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-card-foreground">{agent.name}</h2>
                    <p className="text-sm text-primary">{agent.specialization}</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-lg font-bold">{agent.sold}</p>
                    <p className="text-xs text-muted-foreground">{t("sold")}</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-lg font-bold">{agent.avgDays}</p>
                    <p className="text-xs text-muted-foreground">{t("days")}</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-lg font-bold">{agent.experience}</p>
                    <p className="text-xs text-muted-foreground">{profile("experience")}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{agent.email}</span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AgentRequestSection agents={agents.map((a) => ({ _id: a._id, name: a.name, slug: a.slug }))} />
      </div>
    </div>
  );
}
