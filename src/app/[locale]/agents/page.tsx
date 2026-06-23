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
    <div className="bg-muted min-h-screen py-10 lg:py-14">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <FadeIn>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">{t("title")}</h1>
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>
        </FadeIn>

        <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
