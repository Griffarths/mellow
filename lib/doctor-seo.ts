import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HREFLANG, type BlogLocale } from "./blog";
import { DOCTOR_PATH } from "./doctor";
import { localizedUrl, withDefault } from "./hreflang";

export function doctorUrl(locale: string) {
  return localizedUrl(locale, DOCTOR_PATH[locale]);
}

// hreflang → URL of the page in every language, plus x-default (English).
export function doctorAlternates() {
  return withDefault(
    Object.fromEntries(routing.locales.map((l) => [HREFLANG[l as BlogLocale], doctorUrl(l)])),
  );
}

export async function doctorMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "doctorPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: doctorUrl(locale), languages: doctorAlternates() },
  };
}
