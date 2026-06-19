"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { TrendingUp, Users, Gift, Briefcase, MapPin, Clock } from "lucide-react";
import { getJobs } from "@/lib/mock";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { CareerApplicationForm } from "@/components/sections/CareerApplicationForm";

export default function CareersPage() {
  const t = useTranslations("careers");
  const jobs = getJobs();
  const [selectedJob, setSelectedJob] = useState<{ _id: string; title: string } | null>(null);

  const benefits = [
    { key: "growth", icon: TrendingUp },
    { key: "team", icon: Users },
    { key: "rewards", icon: Gift },
  ] as const;

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

      <div className="bg-muted py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
          <FadeIn>
            <h2 className="text-center text-2xl font-bold">{t("whyTitle")}</h2>
          </FadeIn>
          <StaggerContainer className="mt-8 grid gap-6 md:grid-cols-3">
            {benefits.map(({ key, icon: Icon }) => (
              <StaggerItem key={key}>
                <div className="rounded-2xl bg-card p-8 text-center shadow-sm">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                    <Icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{t(key)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`${key}Desc`)}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      <div className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
          <FadeIn>
            <h2 className="text-2xl font-bold">{t("openJobs")}</h2>
          </FadeIn>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {jobs.map((job) => (
              <FadeIn key={job._id}>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                      <h3 className="mt-1 text-xl font-semibold">{job.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.experience}
                        </span>
                      </div>
                      <p className="mt-3 text-muted-foreground">{job.description}</p>

                      <div className="mt-4">
                        <p className="text-sm font-semibold">{t("requirements")}</p>
                        <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                          {job.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedJob({ _id: job._id, title: job.title })}
                      className="h-fit rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      {t("apply")}
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-muted py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
          <FadeIn>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold">{selectedJob ? t("jobApplicationTitle") : t("cvTitle")}</h2>
              <p className="mt-2 text-muted-foreground">{selectedJob ? t("jobApplicationSubtitle") : t("cvSubtitle")}</p>
            </div>
          </FadeIn>
          <CareerApplicationForm
            selectedJob={selectedJob}
            onBack={selectedJob ? () => setSelectedJob(null) : undefined}
          />
        </div>
      </div>
    </>
  );
}
