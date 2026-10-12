import { routing } from "@/i18n/routing";
import { HREFLANG, type BlogLocale } from "./blog";
import { localizedUrl, withDefault } from "./hreflang";

// The About page, in each language. Spanish and Portuguese, Europe and the
// Americas, share /sobre-mellow (each under its own language prefix).
export const ABOUT_PATH: Record<string, string> = {
  fr: "/a-propos",
  en: "/about",
  de: "/ueber-mellow",
  it: "/chi-sono",
  es: "/sobre-mellow",
  "es-419": "/sobre-mellow",
  pt: "/sobre-mellow",
  "pt-BR": "/sobre-mellow",
};

export function aboutUrl(locale: string) {
  return localizedUrl(locale, ABOUT_PATH[locale] ?? ABOUT_PATH.en);
}

// hreflang → URL of the page in every language, plus x-default (English).
export function aboutAlternates() {
  return withDefault(
    Object.fromEntries(routing.locales.map((l) => [HREFLANG[l as BlogLocale], aboutUrl(l)])),
  );
}
