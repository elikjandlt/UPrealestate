"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Upload, ChevronRight, ChevronLeft, Home, User, Send, Tag, KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { districts } from "@/lib/mock";
import { FadeIn } from "@/components/motion/FadeIn";
import { FaqSection } from "@/components/sections/FaqSection";
import { CommissionCalculator } from "@/components/sections/CommissionCalculator";
import { MortgageCalculator } from "@/components/sections/MortgageCalculator";

export default function SellPage() {
  const t = useTranslations("sell");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    purpose: "" as "sell" | "rent" | "",
    propertyType: "",
    district: "",
    address: "",
    rooms: "",
    area: "",
    price: "",
    description: "",
    name: "",
    phone: "",
    email: "",
  });

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="bg-muted min-h-[60vh] py-20">
        <div className="mx-auto max-w-[600px] px-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <Check className="h-10 w-10 text-success" />
          </div>
          <h1 className="mt-6 text-3xl font-bold">Хүсэлт илгээгдлээ</h1>
          <p className="mt-2 text-muted-foreground">
            Бид тантай 24 цагийн дотор холбогдож, үнэгүй үнэлгээ өгөх болно.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-primary py-16 text-primary-foreground lg:py-20">
        <div className="mx-auto max-w-[1440px] px-4 text-center lg:px-8 xl:px-[120px]">
          <FadeIn>
            <h1 className="text-3xl font-bold md:text-4xl">{t("title")}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-primary-foreground/90">{t("subtitle")}</p>
          </FadeIn>
        </div>
      </div>

      <div className="bg-background py-10 lg:py-14">
        <div className="mx-auto max-w-[900px] px-4 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <StepBadge active={step >= 1} done={step > 1} label={t("step1")} />
            <div className="h-px w-6 bg-border sm:w-8" />
            <StepBadge active={step >= 2} done={step > 2} label={t("step2")} />
            <div className="h-px w-6 bg-border sm:w-8" />
            <StepBadge active={step >= 3} done={false} label={t("step3")} />
          </div>

          {step === 1 && (
            <FadeIn>
              <div className="rounded-2xl bg-card p-6 shadow-sm md:p-8">
                <h2 className="text-center text-xl font-semibold md:text-2xl">{t("purposeTitle")}</h2>
                <p className="mt-2 text-center text-muted-foreground">{t("purposeHint")}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <PurposeCard
                    selected={form.purpose === "sell"}
                    onClick={() => update("purpose", "sell")}
                    icon={<Tag className="h-8 w-8" />}
                    title={t("sellOption")}
                    description={t("sellOptionDesc")}
                  />
                  <PurposeCard
                    selected={form.purpose === "rent"}
                    onClick={() => update("purpose", "rent")}
                    icon={<KeyRound className="h-8 w-8" />}
                    title={t("rentOption")}
                    description={t("rentOptionDesc")}
                  />
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    disabled={!form.purpose}
                    onClick={() => setStep(2)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold",
                      form.purpose
                        ? "bg-primary text-primary-foreground"
                        : "cursor-not-allowed bg-muted text-muted-foreground"
                    )}
                  >
                    {t("next")}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </FadeIn>
          )}

          {step === 2 && (
            <FadeIn>
              <div className="rounded-2xl bg-card p-6 shadow-sm md:p-8">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <Home className="h-5 w-5 text-primary" />
                  {t("propertyInfo")}
                </h2>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium">{t("propertyType")}</label>
                    <select
                      value={form.propertyType}
                      onChange={(e) => update("propertyType", e.target.value)}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Сонгох</option>
                      <option value="apartment">Орон сууц</option>
                      <option value="house">Амины байр</option>
                      <option value="office">Оффис</option>
                      <option value="shop">Дэлгүүр</option>
                      <option value="land">Газар</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{t("district")}</label>
                    <select
                      value={form.district}
                      onChange={(e) => update("district", e.target.value)}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Сонгох</option>
                      {districts.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{t("address")}</label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      placeholder="Хаяг"
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{t("roomCount")}</label>
                    <input
                      type="number"
                      value={form.rooms}
                      onChange={(e) => update("rooms", e.target.value)}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{t("area")}</label>
                    <input
                      type="number"
                      value={form.area}
                      onChange={(e) => update("area", e.target.value)}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium">{t("price")}</label>
                    <input
                      type="text"
                      value={form.price}
                      onChange={(e) => update("price", e.target.value)}
                      placeholder={t("priceHint")}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">{t("priceHelp")}</p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium">{t("description")}</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      rows={4}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium">{t("upload")}</label>
                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted px-6 py-10 text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">{t("uploadHint")}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {t("back")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                  >
                    {t("next")}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </FadeIn>
          )}

          {step === 3 && (
            <FadeIn>
              <div className="rounded-2xl bg-card p-6 shadow-sm md:p-8">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <User className="h-5 w-5 text-primary" />
                  {t("contactInfo")}
                </h2>
                <p className="mt-2 text-muted-foreground">{t("contactHint")}</p>

                <div className="mt-6 grid gap-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{t("name")}</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{t("phone")}</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{t("email")}</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {t("back")}
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                  >
                    <Send className="h-4 w-4" />
                    {t("submit")}
                  </button>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </div>

      <CommissionCalculator />

      <MortgageCalculator />

      <FaqSection />
    </>
  );
}

function StepBadge({
  active,
  done,
  label,
}: {
  active: boolean;
  done: boolean;
  label: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium sm:px-4 sm:text-sm",
        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      )}
    >
      <div
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded-full text-[10px] sm:h-5 sm:w-5 sm:text-xs",
          active ? "bg-white/20" : "bg-border"
        )}
      >
        {done ? <Check className="h-3 w-3" /> : null}
      </div>
      {label}
    </div>
  );
}

function PurposeCard({
  selected,
  onClick,
  icon,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center rounded-2xl border-2 p-6 text-center transition-all sm:p-8",
        selected
          ? "border-primary bg-primary/5 text-primary"
          : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-muted"
      )}
    >
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full transition-colors",
          selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}
      >
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </button>
  );
}
