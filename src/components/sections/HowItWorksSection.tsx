import { useTranslations } from "next-intl";
import { StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

const steps = ["step1", "step2", "step3", "step4"] as const;

export function HowItWorksSection() {
  const t = useTranslations("howItWorks");

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t("title")}</h2>
        </div>

        <StaggerContainer className="mt-10 grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <StaggerItem key={step}>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {t(step)}
                </h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">{t(`${step}Desc`)}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
