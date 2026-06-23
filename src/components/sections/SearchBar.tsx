"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { districts } from "@/lib/mock";
import { FadeIn } from "@/components/motion/FadeIn";

const priceOptions = [
  { value: "", label: "Бүх үнэ" },
  { value: "0-100000000", label: "0 - 100 сая ₮" },
  { value: "100000000-300000000", label: "100 - 300 сая ₮" },
  { value: "300000000-500000000", label: "300 - 500 сая ₮" },
  { value: "500000000-1000000000", label: "500 сая - 1 тэрбум ₮" },
  { value: "1000000000-", label: "1 тэрбум ₮-өөс дээш" },
];

const roomOptions = [
  { value: "", label: "Бүх өрөө" },
  { value: "1", label: "1 өрөө" },
  { value: "2", label: "2 өрөө" },
  { value: "3", label: "3 өрөө" },
  { value: "4+", label: "4+ өрөө" },
];

export function SearchBar() {
  const t = useTranslations("search");
  const locale = useLocale();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"sell" | "rent">("sell");
  const [district, setDistrict] = useState("");
  const [price, setPrice] = useState("");
  const [rooms, setRooms] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("type", activeTab);
    if (district) params.set("district", district);
    if (price) params.set("price", price);
    if (rooms) params.set("rooms", rooms);
    router.push(`/${locale}/listings?${params.toString()}`);
  };

  return (
    <FadeIn delay={0.3}>
      <div className="relative z-10 mx-auto -mt-8 max-w-[1200px] px-4 lg:px-8 xl:px-0">
        <div className="rounded-2xl bg-card p-4 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="flex gap-2">
              <TabButton active={activeTab === "sell"} onClick={() => setActiveTab("sell")}>
                {t("sellTab")}
              </TabButton>
              <TabButton active={activeTab === "rent"} onClick={() => setActiveTab("rent")}>
                {t("rentTab")}
              </TabButton>
            </div>

            <div className="grid flex-1 gap-4 md:grid-cols-3">
              <SelectField
                label={t("location")}
                value={district}
                onChange={setDistrict}
                placeholder={t("locationPlaceholder")}
                options={[{ value: "", label: t("locationPlaceholder") }, ...districts.map((d) => ({ value: d, label: d }))]}
              />
              <SelectField
                label={t("price")}
                value={price}
                onChange={setPrice}
                placeholder={t("pricePlaceholder")}
                options={priceOptions}
              />
              <SelectField
                label={t("rooms")}
                value={rooms}
                onChange={setRooms}
                placeholder={t("roomsPlaceholder")}
                options={roomOptions}
              />
            </div>

            <button
              type="button"
              onClick={handleSearch}
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

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md px-4 py-2 text-sm font-semibold transition-colors",
        active
          ? "bg-foreground text-background"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      )}
    >
      {children}
    </button>
  );
}

function SelectField({
  label,
  value,
  onChange,
  placeholder,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  const selectedLabel = options.find((o) => o.value === value)?.label ?? placeholder;
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            "flex w-full items-center justify-between rounded-lg bg-input px-4 py-3 text-left text-sm outline-none focus:ring-2 focus:ring-ring",
            value ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {selectedLabel}
          <svg
            className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <div className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-lg border border-border bg-card py-1 shadow-lg">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted",
                    value === opt.value && "bg-muted font-medium"
                  )}
                >
                  {opt.label}
                  {value === opt.value && <span className="text-primary">✓</span>}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
