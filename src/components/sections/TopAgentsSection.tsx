import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { StaggerContainer, StaggerItem, HoverCard } from "@/components/motion/FadeIn";
import { getAgents } from "@/lib/mock";

export function TopAgentsSection() {
  const t = useTranslations("agents");
  const agents = getAgents();

  return (
    <section className="bg-muted py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t("title")}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3">
          {agents.map((agent) => (
            <StaggerItem key={agent._id}>
              <HoverCard>
                <Link
                  href={`/agents/${agent.slug}`}
                  className="block rounded-2xl bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-muted">
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
                  <h3 className="mt-4 text-xl font-semibold text-card-foreground">{agent.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{agent.specialization}</p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">{agent.sold}</p>
                      <p className="text-xs text-muted-foreground">{t("sold")}</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">{agent.avgDays}</p>
                      <p className="text-xs text-muted-foreground">{t("days")}</p>
                    </div>
                  </div>
                </Link>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
