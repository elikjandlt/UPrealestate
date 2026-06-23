import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";

const partners = [
  { name: "Khan Bank", initial: "KB" },
  { name: "Golomt Bank", initial: "GB" },
  { name: "XacBank", initial: "XB" },
  { name: "TDB", initial: "TD" },
  { name: "M Bank", initial: "MB" },
  { name: "Chinggis Khaan Bank", initial: "CK" },
  { name: "Capitron Bank", initial: "CB" },
  { name: "Ard Credit", initial: "AC" },
];

export function PartnersSection() {
  const t = useTranslations("partners");

  return (
    <section className="border-y border-border bg-muted py-10">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <FadeIn>
          <p className="mb-6 text-center text-sm font-medium text-muted-foreground">{t("title")}</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex h-14 items-center justify-center rounded-lg bg-card px-6 shadow-sm"
              >
                <span className="text-lg font-bold tracking-tight text-muted-foreground">{partner.initial}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
