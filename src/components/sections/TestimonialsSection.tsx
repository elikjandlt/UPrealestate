import { useTranslations } from "next-intl";
import { StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { getTestimonials } from "@/lib/mock";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const testimonials = getTestimonials();

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t("title")}</h2>
        </div>

        <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <StaggerItem key={item._id}>
              <div className="rounded-xl bg-card p-6 shadow-sm">
                <p className="text-base leading-relaxed text-card-foreground">"{item.quote}"</p>
                <div className="mt-4">
                  <p className="font-semibold text-card-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
