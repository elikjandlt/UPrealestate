"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";

export function SearchBar() {
  const t = useTranslations("search");
  const [activeTab, setActiveTab] = useState<"sell" | "rent">("sell");

  return (
    <FadeIn delay={0.3}>
      <div className="relative z-10 mx-auto -mt-8 max-w-[1200px] px-4 lg:px-8 xl:px-0">
        <div className="rounded-2xl bg-card p-4 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("sell")}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-semibold transition-colors",
                  activeTab === "sell"
                    ? "bg-foreground text-background"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {t("sellTab")}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("rent")}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-semibold transition-colors",
                  activeTab === "rent"
                    ? "bg-foreground text-background"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {t("rentTab")}
              </button>
            </div>

            <div className="grid flex-1 gap-4 md:grid-cols-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  {t("location")}
                </label>
                <div className="flex items-center justify-between rounded-lg bg-input px-4 py-3">
                  <span className="text-sm text-muted-foreground">{t("locationPlaceholder")}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">{t("price")}</label>
                <div className="flex items-center justify-between rounded-lg bg-input px-4 py-3">
                  <span className="text-sm text-muted-foreground">{t("pricePlaceholder")}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">{t("rooms")}</label>
                <div className="flex items-center justify-between rounded-lg bg-input px-4 py-3">
                  <span className="text-sm text-muted-foreground">{t("roomsPlaceholder")}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-6 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
            >
              <Search className="h-4 w-4" />
              {t("search")}
            </button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
