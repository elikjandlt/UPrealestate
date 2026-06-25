"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

const VIDEO_ID = "qKFT4VA7elU";
const POSTER_URL = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80";

export function HeroSection() {
  const t = useTranslations("hero");
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0"
          )}
        >
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&rel=0&playsinline=1&playlist=${VIDEO_ID}`}
            title="Up properties hero video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setLoaded(true)}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 scale-[1.25] border-0"
          />
        </div>

        <div className={cn("absolute inset-0 transition-opacity duration-700", loaded ? "opacity-0" : "opacity-100")}>
          <Image
            src={POSTER_URL}
            alt="Up properties hero"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/50 to-primary/30" />
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

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
