import Link from "next/link";
import { useTranslations } from "next-intl";
import { PropertyCard } from "@/components/PropertyCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { getProperties } from "@/lib/mock";

export function FeaturedListingsSection() {
  const t = useTranslations("featured");
  const properties = getProperties().slice(0, 3);

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
            {t("title")}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </FadeIn>

        <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <StaggerItem key={property._id}>
              <PropertyCard property={property} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.4}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/listings"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-card-foreground shadow-sm transition-colors hover:bg-secondary"
            >
              {t("viewAll")}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
