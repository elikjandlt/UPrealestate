"use client";

import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, MessageCircle, Share2, Globe } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const footerLinks = [
    { label: nav("home"), href: "/" },
    { label: nav("listings"), href: "/listings" },
    { label: nav("agents"), href: "/agents" },
    { label: nav("careers"), href: "/careers" },
  ];

  const serviceLinks = [
    { label: nav("sell"), href: "/sell" },
    { label: "Түрээслэх", href: "/listings" },
    { label: "Үнэлгээ авах", href: "/sell" },
    { label: nav("contact"), href: "/contact" },
  ];

  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-8 xl:px-[120px]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Phone className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-white">Up properties</span>
            </Link>
            <p className="max-w-[280px] text-sm leading-relaxed">{t("tagline")}</p>
            <div className="flex gap-4">
              <a href="#" className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20">
                <Share2 className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-base font-semibold text-white">{t("links")}</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as "/"}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-base font-semibold text-white">{t("services")}</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href as "/"}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-base font-semibold text-white">{t("contact")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Улаанбаатар хот, Сүхбаатар дүүрэг</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+976 7777-7777</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@upproperties.mn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-8 md:flex-row md:justify-between">
          <p className="text-sm">© 2026 Up properties. {t("rights")}</p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-white">{t("terms")}</Link>
            <Link href="#" className="hover:text-white">{t("privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
