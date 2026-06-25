"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

const POSTER_URL = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80";

export function HeroSection() {
  const t = useTranslations("hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        await video.play();
        setCanPlay(true);
      } catch {
        setCanPlay(false);
      }
    };

    if (video.readyState >= 3) {
      attemptPlay();
    } else {
      video.addEventListener("canplay", attemptPlay, { once: true });
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          poster={POSTER_URL}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            canPlay ? "opacity-100" : "opacity-0"
          )}
        />
        <div className={cn("absolute inset-0 transition-opacity duration-700", canPlay ? "opacity-0" : "opacity-100")}>
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
                href="/listings"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-base font-semibold text-primary transition-transform hover:scale-[1.02]"
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
