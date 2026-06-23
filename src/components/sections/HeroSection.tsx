import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80"
          alt="Up properties hero"
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-20 lg:px-8 xl:px-[120px] lg:py-24">
        <div className="max-w-3xl">
          <FadeIn>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-primary-foreground/90 md:text-xl">
              {t("subtitle")}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/sell"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-base font-semibold text-primary transition-transform hover:scale-[1.02]"
              >
                {t("sellCta")}
              </Link>
              <Link
                href="/listings"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-foreground/15 px-6 py-3.5 text-base font-semibold text-primary-foreground backdrop-blur transition-colors hover:bg-primary-foreground/25"
              >
                {t("listingsCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
