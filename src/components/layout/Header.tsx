"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");

  const navItems = [
    { label: t("home"), href: "/" },
    { label: t("research"), href: "/research" },
    { label: t("listings"), href: "/listings" },
    { label: t("agents"), href: "/agents" },
    { label: t("careers"), href: "/careers" },
    { label: t("contact"), href: "/contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 lg:px-8 xl:px-[120px]">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.webp"
            alt="RE/MAX UP"
            width={140}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as "/" | "/listings" | "/research" | "/agents" | "/careers" | "/contact"}
              className={cn(
                "text-[15px] font-medium transition-colors hover:text-primary",
                isActive(item.href) ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/sell"
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("sell")}
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href as "/" | "/listings" | "/research" | "/agents" | "/careers" | "/contact"}
                className={cn(
                  "text-base font-medium",
                  isActive(item.href) ? "text-foreground" : "text-muted-foreground"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/sell"
              className="mt-2 rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {t("sell")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
