"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Banknote, TrendingUp, Home, Wallet } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

function formatMnt(value: number) {
  return new Intl.NumberFormat("mn-MN").format(value) + " ₮";
}

function parseNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  return Number(digits) || 0;
}

export function MortgageCalculator() {
  const t = useTranslations("mortgage");
  const [price, setPrice] = useState<string>("");
  const [downPayment, setDownPayment] = useState<string>("");
  const [downPaymentType, setDownPaymentType] = useState<"amount" | "percent">("amount");
  const [rate, setRate] = useState<string>("12");
  const [years, setYears] = useState<string>("20");
  const [income, setIncome] = useState<string>("");

  const numericPrice = parseNumber(price);
  const numericRate = Number(rate) || 0;
  const numericYears = Number(years) || 0;
  const numericIncome = parseNumber(income);

  const downPaymentAmount = useMemo(() => {
    if (downPaymentType === "amount") return parseNumber(downPayment);
    const percent = Number(downPayment) || 0;
    return Math.round(numericPrice * (percent / 100));
  }, [downPayment, downPaymentType, numericPrice]);

  const downPaymentPercent = useMemo(() => {
    if (numericPrice === 0) return 0;
    return Math.round((downPaymentAmount / numericPrice) * 1000) / 10;
  }, [downPaymentAmount, numericPrice]);

  const monthlyPayment = useMemo(() => {
    const principal = numericPrice - downPaymentAmount;
    if (principal <= 0 || numericRate <= 0 || numericYears <= 0) return 0;
    const r = numericRate / 100 / 12;
    const n = numericYears * 12;
    const pmt = principal * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    return Math.round(pmt);
  }, [numericPrice, downPaymentAmount, numericRate, numericYears]);

  const totalPayment = useMemo(() => {
    if (monthlyPayment <= 0 || numericYears <= 0) return 0;
    return Math.round(monthlyPayment * numericYears * 12);
  }, [monthlyPayment, numericYears]);

  const totalInterest = useMemo(() => {
    const principal = numericPrice - downPaymentAmount;
    return Math.max(0, totalPayment - principal);
  }, [totalPayment, numericPrice, downPaymentAmount]);

  const maxAffordablePrice = useMemo(() => {
    if (numericIncome <= 0 || numericRate <= 0 || numericYears <= 0) return 0;
    const r = numericRate / 100 / 12;
    const n = numericYears * 12;
    const maxMonthly = numericIncome * 0.4;
    const maxLoan = maxMonthly * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));
    const downPercent = downPaymentType === "percent" ? (Number(downPayment) || 0) / 100 : 0;
    if (downPercent >= 1) return 0;
    return Math.round(maxLoan / (1 - downPercent));
  }, [numericIncome, numericRate, numericYears, downPayment, downPaymentType]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const raw = e.target.value.replace(/\D/g, "");
    setter(raw);
  };

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-[900px] px-4 lg:px-8">
        <FadeIn>
          <div className="rounded-2xl bg-card p-6 shadow-sm md:p-8">
            <h2 className="flex items-center gap-2 text-xl font-semibold md:text-2xl">
              <Banknote className="h-6 w-6 text-primary" />
              {t("title")}
            </h2>
            <p className="mt-2 text-muted-foreground">{t("hint")}</p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">{t("price")}</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={price}
                  onChange={(e) => handlePriceChange(e, setPrice)}
                  placeholder="0"
                  className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">{t("downPayment")}</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={downPayment}
                    onChange={(e) => handlePriceChange(e, setDownPayment)}
                    placeholder="0"
                    className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                  <select
                    value={downPaymentType}
                    onChange={(e) => setDownPaymentType(e.target.value as "amount" | "percent")}
                    className="rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="amount">₮</option>
                    <option value="percent">%</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">{t("rate")}</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="24"
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

              <div>
                <label className="mb-1.5 block text-sm font-medium">{t("years")}</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={numericYears || 0}
                    onChange={(e) => setYears(e.target.value)}
                    className="w-full accent-primary"
                  />
                  <span className="w-16 shrink-0 rounded-lg border border-border bg-input px-3 py-2 text-center text-sm font-medium">
                    {numericYears}
                  </span>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium">{t("income")}</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={income}
                  onChange={(e) => handlePriceChange(e, setIncome)}
                  placeholder="0"
                  className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <p className="mt-1 text-xs text-muted-foreground">{t("incomeHelp")}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 rounded-xl bg-primary/5 p-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Home className="h-4 w-4" />
                  {t("monthlyPayment")}
                </p>
                <p className="mt-1 text-2xl font-bold text-primary">{formatMnt(monthlyPayment)}</p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  {t("totalInterest")}
                </p>
                <p className="mt-1 text-2xl font-bold text-foreground">{formatMnt(totalInterest)}</p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Wallet className="h-4 w-4" />
                  {t("totalPayment")}
                </p>
                <p className="mt-1 text-2xl font-bold text-foreground">{formatMnt(totalPayment)}</p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Banknote className="h-4 w-4" />
                  {t("downPaymentPercent")}
                </p>
                <p className="mt-1 text-2xl font-bold text-foreground">{downPaymentPercent}%</p>
              </div>
            </div>

            {maxAffordablePrice > 0 && (
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6">
                <p className="text-sm text-muted-foreground">{t("maxAffordable")}</p>
                <p className="mt-1 text-3xl font-bold text-primary">{formatMnt(maxAffordablePrice)}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t("maxAffordableHelp")}</p>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
