import { defineRouting } from "next-intl/routing";

export const LOCALES = [
  "fr",
  "en",
  "de",
  "it",
  "es",
  "es-419",
  "pt",
  "pt-BR",
] as const;

export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  de: "Deutsch",
  it: "Italiano",
  es: "Español (España)",
  "es-419": "Español (Latinoamérica)",
  pt: "Português (Portugal)",
  "pt-BR": "Português (Brasil)",
};

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: "en",
  localePrefix: "as-needed",
});
