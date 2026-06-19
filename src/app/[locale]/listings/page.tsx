"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { districts, getProperties } from "@/lib/mock";
import { PropertyCard } from "@/components/PropertyCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

const PAGE_SIZE = 6;

export default function ListingsPage() {
  const t = useTranslations("listings");
  const all = getProperties();

  const [sell, setSell] = useState(true);
  const [rent, setRent] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  const [district, setDistrict] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [rooms, setRooms] = useState<"" | "1" | "2" | "3" | "4+">("");
  const [amenities, setAmenities] = useState<Record<string, boolean>>({});
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = all.filter((p) => {
      const selectedTypes = [sell && "sell", rent && "rent"].filter(Boolean);
      if (selectedTypes.length > 0 && !selectedTypes.includes(p.type)) return false;
      if (propertyType && p.propertyType !== propertyType) return false;
      if (district && p.district !== district) return false;
      const minP = minPrice ? Number(minPrice) : 0;
      const maxP = maxPrice ? Number(maxPrice) : Infinity;
      if (p.price < minP || p.price > maxP) return false;
      const minA = minArea ? Number(minArea) : 0;
      const maxA = maxArea ? Number(maxArea) : Infinity;
      if (p.area < minA || p.area > maxA) return false;
      if (rooms) {
        if (rooms === "4+") {
          if (p.rooms < 4) return false;
        } else if (p.rooms !== Number(rooms)) {
          return false;
        }
      }
      const selectedAmenities = Object.entries(amenities)
        .filter(([, v]) => v)
        .map(([k]) => k);
      if (selectedAmenities.length > 0 && !selectedAmenities.every((a) => p.amenities?.includes(a))) {
        return false;
      }
      return true;
    });

    if (sort === "priceAsc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "area") result = [...result].sort((a, b) => a.area - b.area);

    return result;
  }, [all, sell, rent, propertyType, district, minPrice, maxPrice, minArea, maxArea, rooms, amenities, sort]);

  const activeMinPrice = useMemo(() => {
    return minPrice ? Number(minPrice) : Math.min(...all.map((p) => p.price));
  }, [minPrice, all]);

  const activeMaxPrice = useMemo(() => {
    return maxPrice ? Number(maxPrice) : Math.max(...all.map((p) => p.price));
  }, [maxPrice, all]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleAmenity = (key: string) =>
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }));

  const clearFilters = () => {
    setSell(true);
    setRent(false);
    setPropertyType("");
    setDistrict("");
    setMinPrice("");
    setMaxPrice("");
    setMinArea("");
    setMaxArea("");
    setRooms("");
    setAmenities({});
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 xl:px-[120px]">
        <FadeIn>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">{t("title")}</h1>
          <p className="mt-2 text-muted-foreground">
            {filtered.length} {t("found")}
          </p>
        </FadeIn>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
          <FadeIn className="lg:w-[280px] lg:shrink-0">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="mb-5 text-lg font-bold text-card-foreground">{t("filters")}</h2>

              <div className="space-y-6">
                <FilterGroup title={t("type")}>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={sell}
                      onChange={(e) => setSell(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                    />
                    <span className="text-sm">{t("sell")}</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rent}
                      onChange={(e) => setRent(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                    />
                    <span className="text-sm">{t("rent")}</span>
                  </label>
                </FilterGroup>

                <FilterGroup title={t("propertyType")}>
                  <div className="relative">
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">{t("propertyTypePlaceholder")}</option>
                      <option value="apartment">Орон сууц</option>
                      <option value="house">Амины байр</option>
                      <option value="office">Оффис</option>
                      <option value="shop">Дэлгүүр</option>
                      <option value="land">Газар</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </FilterGroup>

                <FilterGroup title={t("location")}>
                  <div className="relative">
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">{t("districtPlaceholder")}</option>
                      {districts.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </FilterGroup>

                <FilterGroup title={`${t("priceRange")}: ₮${activeMinPrice.toLocaleString("mn-MN")} - ₮${activeMaxPrice.toLocaleString("mn-MN")}`}>
                  <div className="mt-2 h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-foreground"
                      style={{
                        marginLeft: `${((activeMinPrice - Math.min(...all.map((p) => p.price))) / (Math.max(...all.map((p) => p.price)) - Math.min(...all.map((p) => p.price)))) * 100}%`,
                        width: `${((activeMaxPrice - activeMinPrice) / (Math.max(...all.map((p) => p.price)) - Math.min(...all.map((p) => p.price)))) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder={t("min")}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder={t("max")}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </FilterGroup>

                <FilterGroup title={t("area")}>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={minArea}
                      onChange={(e) => setMinArea(e.target.value)}
                      placeholder={t("areaMin")}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                    <input
                      type="number"
                      value={maxArea}
                      onChange={(e) => setMaxArea(e.target.value)}
                      placeholder={t("areaMax")}
                      className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </FilterGroup>

                <FilterGroup title={t("rooms")}>
                  <div className="flex flex-wrap gap-2">
                    {(["1", "2", "3", "4+"] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRooms(rooms === r ? "" : r)}
                        className={cn(
                          "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                          rooms === r
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        )}
                      >
                        {r}+
                      </button>
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup title={t("amenities")}>
                  <div className="space-y-2">
                    {[
                      { key: "Паркинг", label: t("parking") },
                      { key: "Балконтой", label: t("balcony") },
                      { key: "Тавилгатай", label: t("furnished") },
                      { key: "Лифт", label: t("elevator") },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          checked={!!amenities[key]}
                          onChange={() => toggleAmenity(key)}
                          className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                        />
                        <span className="text-sm">{label}</span>
                      </label>
                    ))}
                  </div>
                </FilterGroup>
              </div>

              <button
                type="button"
                onClick={() => setPage(1)}
                className="mt-6 w-full rounded-lg bg-foreground py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
              >
                {t("apply")}
              </button>
            </div>
          </FadeIn>

          <div className="flex-1">
            <FadeIn>
              <div className="mb-4 flex items-center justify-start">
                <SortDropdown value={sort} onChange={setSort} t={t} />
              </div>
            </FadeIn>

            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 text-center shadow-sm">
                <Search className="h-12 w-12 text-muted-foreground/40" />
                <p className="mt-4 text-muted-foreground">Үр дүн олдсонгүй</p>
                <button
                  onClick={clearFilters}
                  className="mt-2 text-sm font-medium text-primary hover:underline"
                >
                  {t("clear")}
                </button>
              </div>
            ) : (
              <StaggerContainer className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {paginated.map((property) => (
                  <StaggerItem key={property._id}>
                    <PropertyCard property={property} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={cn(
                    "rounded-lg border border-border px-4 py-2 text-sm font-medium",
                    page === 1
                      ? "cursor-not-allowed bg-muted text-muted-foreground"
                      : "bg-card text-foreground hover:bg-muted"
                  )}
                >
                  {t("prev")}
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      "h-9 min-w-[36px] rounded-lg px-3 text-sm font-medium",
                      page === p
                        ? "bg-foreground text-background"
                        : "border border-border bg-card text-foreground hover:bg-muted"
                    )}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className={cn(
                    "rounded-lg border border-border px-4 py-2 text-sm font-medium",
                    page === totalPages
                      ? "cursor-not-allowed bg-muted text-muted-foreground"
                      : "bg-card text-foreground hover:bg-muted"
                  )}
                >
                  {t("next")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2.5 text-sm font-semibold text-card-foreground">{title}</p>
      {children}
    </div>
  );
}

function SortDropdown({
  value,
  onChange,
  t,
}: {
  value: string;
  onChange: (v: string) => void;
  t: (key: string) => string;
}) {
  const [open, setOpen] = useState(false);
  const options = [
    { key: "newest", label: "Шинэ" },
    { key: "priceAsc", label: "Үнэ өсөх" },
    { key: "priceDesc", label: "Үнэ буурах" },
    { key: "area", label: "Талбай" },
  ];

  const selectedLabel = options.find((o) => o.key === value)?.label ?? "Шинэ";

  return (
    <div className="relative z-20">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-44 items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5 text-left text-sm outline-none focus:ring-2 focus:ring-ring"
      >
        <span>{t("sort")}: {selectedLabel}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-lg border border-border bg-card py-1 shadow-lg">
            {options.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => {
                  onChange(opt.key);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                  value === opt.key && "bg-muted font-medium"
                )}
              >
                {opt.label}
                {value === opt.key && <span className="text-primary">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
