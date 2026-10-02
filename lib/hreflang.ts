import { routing } from "@/i18n/routing";

const SITE_URL = "https://mellowmigraine.com";

// hreflang code of each language of the site.
const CODE: Record<string, string> = {
  fr: "fr-FR",
  en: "en",
  de: "de",
  it: "it",
  es: "es-ES",
  "es-419": "es-419",
  pt: "pt-PT",
  "pt-BR": "pt-BR",
};

export function localizedUrl(locale: string, suffix: string) {
  return locale === routing.defaultLocale
    ? `${SITE_URL}${suffix}`
    : `${SITE_URL}/${locale}${suffix}`;
}

// Adds x-default (the English version, shown to visitors whose language the
// site doesn't have) to a hreflang map. No English version, no x-default.
export function withDefault(languages: Record<string, string>) {
  return languages.en ? { ...languages, "x-default": languages.en } : languages;
}

// Canonical + hreflang of a page that exists at the same path in every language.
export function pageAlternates(locale: string, suffix: string) {
  return {
    canonical: localizedUrl(locale, suffix),
    languages: withDefault(
      Object.fromEntries(routing.locales.map((l) => [CODE[l], localizedUrl(l, suffix)])),
    ),
  };
}

// schema.org breadcrumb: [name, url] pairs from the home page down to the current page.
export function breadcrumbJsonLd(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, item], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item,
    })),
  };
}
