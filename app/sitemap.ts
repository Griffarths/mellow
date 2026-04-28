import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { BLOG_LOCALES, getAllArticles } from "@/lib/blog";

const SITE_URL = "https://mellowmigraine.com";

function path(locale: string, suffix: string) {
  return locale === routing.defaultLocale ? suffix : `/${locale}${suffix}`;
}

function url(locale: string, suffix: string) {
  return `${SITE_URL}${path(locale, suffix)}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home: one entry per locale, with hreflang alternates pointing to all locales
  const homeAlternates = Object.fromEntries(
    routing.locales.map((l) => [l, url(l, "")]),
  );
  for (const locale of routing.locales) {
    entries.push({
      url: url(locale, ""),
      changeFrequency: "monthly",
      priority: locale === routing.defaultLocale ? 1 : 0.9,
      alternates: { languages: homeAlternates },
    });
  }

  // Blog index: one entry per locale (every locale has /blog — coming-soon for non-FR/EN)
  const blogIndexAlternates = Object.fromEntries(
    routing.locales.map((l) => [l, url(l, "/blog")]),
  );
  for (const locale of routing.locales) {
    entries.push({
      url: url(locale, "/blog"),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: blogIndexAlternates },
    });
  }

  // Articles in FR and EN, with cross-language hreflang when defined
  for (const locale of BLOG_LOCALES) {
    for (const article of getAllArticles(locale)) {
      const languages: Record<string, string> = {
        [locale]: url(locale, `/blog/${article.slug}`),
      };
      if (article.relatedSlugInOtherLanguage) {
        const other = locale === "fr" ? "en" : "fr";
        languages[other] = url(
          other,
          `/blog/${article.relatedSlugInOtherLanguage}`,
        );
      }
      entries.push({
        url: url(locale, `/blog/${article.slug}`),
        lastModified: new Date(article.updatedAt),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages },
      });
    }
  }

  // Localized legal pages
  for (const suffix of ["/contact", "/confidentialite", "/mentions-legales"]) {
    const languages = Object.fromEntries(
      routing.locales.map((l) => [l, url(l, suffix)]),
    );
    for (const locale of routing.locales) {
      entries.push({
        url: url(locale, suffix),
        changeFrequency: "yearly",
        priority: 0.3,
        alternates: { languages },
      });
    }
  }

  // About page (FR only for now; EN version to be added later)
  entries.push({
    url: `${SITE_URL}/fr/a-propos`,
    changeFrequency: "yearly",
    priority: 0.5,
  });

  return entries;
}
