import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/FadeIn";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section className="bg-primary py-16 text-primary-foreground lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 text-center lg:px-8 xl:px-[120px]">
        <FadeIn>
          <h2 className="text-3xl font-bold md:text-4xl">{t("title")}</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-primary-foreground/90">
            {t("subtitle")}
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-8">
            <Link
              href="/sell"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-primary shadow-sm transition-transform hover:scale-[1.02]"
            >
              {t("button")}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
