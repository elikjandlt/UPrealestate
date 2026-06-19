import { useTranslations } from "next-intl";
import { TrendingUp, Shield, Megaphone, Zap } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

const icons = {
  valuation: TrendingUp,
  agent: Shield,
  marketing: Megaphone,
  speed: Zap,
};

export function WhyUsSection() {
  const t = useTranslations("whyUs");
  const items = [
    { key: "valuation", icon: icons.valuation },
    { key: "agent", icon: icons.agent },
    { key: "marketing", icon: icons.marketing },
    { key: "speed", icon: icons.speed },
  ] as const;

  return (
    <section className="bg-muted py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t("title")}</h2>
        </div>

        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, icon: Icon }) => (
            <StaggerItem key={key}>
              <div className="flex flex-col items-center rounded-2xl bg-card p-8 text-center shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                  <Icon className="h-7 w-7 text-accent-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                  {t(`${key}`)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`${key}Desc`)}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
