"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Upload, Check } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

interface Job {
  _id: string;
  title: string;
}

interface CareerApplicationFormProps {
  selectedJob: Job | null;
  onBack?: () => void;
}

export function CareerApplicationForm({ selectedJob, onBack }: CareerApplicationFormProps) {
  const t = useTranslations("careers");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    experience: "",
    motivation: "",
  });

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  if (submitted) {
    return (
      <FadeIn>
        <div className="mx-auto max-w-[600px] rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <Check className="h-8 w-8 text-success" />
          </div>
          <h3 className="mt-4 text-xl font-bold">{t("applicationSent")}</h3>
          <p className="mt-1 text-muted-foreground">{t("applicationSentDesc")}</p>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <div className="mx-auto max-w-[600px] rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-5"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">{t("fullName")} *</label>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">{t("phone")} *</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">{t("email")} *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {selectedJob && (
            <div>
              <label className="mb-1.5 block text-sm font-semibold">{t("jobTitle")}</label>
              <input
                type="text"
                readOnly
                value={selectedJob.title}
                className="w-full rounded-lg border border-border bg-muted px-3 py-2.5 text-sm text-muted-foreground outline-none"
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-semibold">{t("experience")}</label>
            <textarea
              rows={3}
              value={form.experience}
              onChange={(e) => update("experience", e.target.value)}
              placeholder={t("experiencePlaceholder")}
              className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">{t("motivation")}</label>
            <textarea
              rows={3}
              value={form.motivation}
              onChange={(e) => update("motivation", e.target.value)}
              placeholder={t("motivationPlaceholder")}
              className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">{t("cvUpload")} *</label>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background py-10 text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">{t("cvUploadHint")}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {selectedJob && onBack && (
              <button
                type="button"
                onClick={onBack}
                className="w-full rounded-lg border border-border bg-background py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                {t("back")}
              </button>
            )}
            <button
              type="submit"
              className={cn(
                "rounded-lg bg-foreground py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/90",
                selectedJob ? "col-span-1 w-full" : "col-span-2 w-full"
              )}
            >
              {t("submitApplication")}
            </button>
          </div>
        </form>
      </div>
    </FadeIn>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
