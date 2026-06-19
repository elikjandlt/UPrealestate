"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFaqs } from "@/lib/mock";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

export function FaqSection() {
  const [open, setOpen] = useState<string | null>(null);
  const faqs = getFaqs();

  return (
    <section className="bg-muted py-16 lg:py-20">
      <div className="mx-auto max-w-[900px] px-4 lg:px-8">
        <StaggerContainer className="space-y-4">
          {faqs.map((faq) => (
            <StaggerItem key={faq._id}>
              <div className="rounded-xl bg-card shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpen(open === faq._id ? null : faq._id)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
>
                  <span className="font-semibold text-card-foreground">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                      open === faq._id && "rotate-180"
                    )}
                  />
                </button>
                {open === faq._id && (
                  <div className="border-t border-border px-5 py-4">
                    <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
