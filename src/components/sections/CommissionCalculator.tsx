"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Calculator } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

function formatMnt(value: number) {
  return new Intl.NumberFormat("mn-MN").format(value) + " ₮";
}

export function CommissionCalculator() {
  const t = useTranslations("sell");
  const [price, setPrice] = useState<string>("");
  const [rate, setRate] = useState<string>("2");

  const numericPrice = Number(price.replace(/\D/g, "")) || 0;
  const numericRate = Number(rate) || 0;

  const commission = useMemo(
    () => Math.round(numericPrice * (numericRate / 100)),
    [numericPrice, numericRate]
  );
  const net = useMemo(() => numericPrice - commission, [numericPrice, commission]);

  return (
    <section className="bg-muted py-16 lg:py-20">
      <div className="mx-auto max-w-[900px] px-4 lg:px-8">
        <FadeIn>
          <div className="rounded-2xl bg-card p-6 shadow-sm md:p-8">
            <h2 className="flex items-center gap-2 text-xl font-semibold md:text-2xl">
              <Calculator className="h-6 w-6 text-primary" />
              {t("calcTitle")}
            </h2>
            <p className="mt-2 text-muted-foreground">{t("calcHint")}</p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">{t("calcPrice")}</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={price}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    setPrice(raw);
                  }}
                  placeholder="0"
                  className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">{t("calcRate")}</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={numericRate || 0}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full accent-primary"
                  />
                  <span className="w-16 shrink-0 rounded-lg border border-border bg-input px-3 py-2 text-center text-sm font-medium">
                    {numericRate}%
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 rounded-xl bg-primary/5 p-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">{t("calcCommission")}</p>
                <p className="mt-1 text-2xl font-bold text-primary">{formatMnt(commission)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("calcNet")}</p>
                <p className="mt-1 text-2xl font-bold text-foreground">{formatMnt(net)}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
