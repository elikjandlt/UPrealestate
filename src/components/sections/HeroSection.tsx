"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

const SLIDES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80",
];

const SLIDE_DURATION = 7000;

export function HeroSection() {
  const t = useTranslations("hero");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 z-0">
        {SLIDES.map((src, i) => {
          const isActive = i === index;
          return (
            <div
              key={src}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                isActive ? "opacity-100" : "opacity-0"
              )}
            >
              <Image
                src={src}
                alt={`Up properties hero ${i + 1}`}
                fill
                priority={i === 0}
                sizes="100vw"
                className={cn(
                  "object-cover transition-transform duration-[7000ms] ease-linear",
                  isActive ? "scale-110" : "scale-100"
                )}
              />
            </div>
          );
        })}
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
