import { routing } from "@/i18n/routing";

const SITE_URL = "https://mellowmigraine.com";

// hreflang code of each language of the site, as Google reads them: an ISO
// 639-1 language, optionally with an ISO 3166-1 country (Google ignores other
// codes, such as es-419). French goes by language alone, for French speakers
// in every country; Spain keeps es-ES, and the Latin American version is the
// Spanish of every other country.
export const HREFLANG: Record<string, string> = {
  fr: "fr",
  en: "en",
  de: "de",
  it: "it",
  es: "es-ES",
  "es-419": "es",
  pt: "pt-PT",
  "pt-BR": "pt-BR",
};

// Language-alone codes added next to a language-and-country one, for the
// speakers of that language elsewhere: the Brazilian version also serves
// Portuguese speakers outside Portugal and Brazil.
const CATCH_ALL: Record<string, string> = { "pt-BR": "pt" };

export function localizedUrl(locale: string, suffix: string) {
  return locale === routing.defaultLocale
    ? `${SITE_URL}${suffix}`
    : `${SITE_URL}/${locale}${suffix}`;
}

// Completes a hreflang map: the catch-all codes, and x-default (the English
// version, shown to visitors whose language the site doesn't have). No
// English version, no x-default.
export function withDefault(languages: Record<string, string>) {
  const all = { ...languages };
  for (const [code, catchAll] of Object.entries(CATCH_ALL)) {
    if (all[code] && !all[catchAll]) all[catchAll] = all[code];
  }
  return all.en ? { ...all, "x-default": all.en } : all;
}

// hreflang map of a page that exists at the same path in every language (also used by the sitemap).
export function sameAlternates(suffix: string) {
  return withDefault(
    Object.fromEntries(routing.locales.map((l) => [HREFLANG[l], localizedUrl(l, suffix)])),
  );
}

// Canonical + hreflang of a page that exists at the same path in every language.
export function pageAlternates(locale: string, suffix: string) {
  return {
    canonical: localizedUrl(locale, suffix),
    languages: sameAlternates(suffix),
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
