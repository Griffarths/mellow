import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import {
  BLOG_LOCALES,
  type BlogLocale,
  HREFLANG,
  getAllArticles,
  getArticleVersions,
  getPillarArticles,
  liveBlogLocales,
} from "@/lib/blog";
import { PILLARS, PILLAR_IDS } from "@/lib/pillars";
import { TOOL_LOCALES } from "@/lib/tools";
import { TOOL_IDS, toolAlternates, toolUrl } from "@/lib/tools-seo";

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

  // Pillar pages, in every language where the pillar has articles, cross-linked via hreflang
  for (const id of PILLAR_IDS) {
    const live = liveBlogLocales().filter((l) => getPillarArticles(l, id).length > 0);
    const languages = Object.fromEntries(
      live.map((l) => [HREFLANG[l], url(l, `/blog/${PILLARS[id][l].slug}`)]),
    );
    for (const locale of live) {
      entries.push({
        url: url(locale, `/blog/${PILLARS[id][locale].slug}`),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages },
      });
    }
  }

  // Free tools, in every language, cross-linked via hreflang
  for (const tool of TOOL_IDS) {
    const languages = toolAlternates(tool);
    for (const locale of TOOL_LOCALES) {
      entries.push({
        url: toolUrl(tool, locale),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages },
      });
    }
  }

  // Articles in every language, with hreflang to all their language versions
  for (const locale of BLOG_LOCALES) {
    for (const article of getAllArticles(locale)) {
      const languages = Object.fromEntries(
        (Object.entries(getArticleVersions(article)) as [BlogLocale, string][]).map(
          ([l, s]) => [HREFLANG[l], url(l, `/blog/${s}`)],
        ),
      );
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

  // About page — FR and EN have different paths; cross-link via hreflang
  const aboutLanguages = {
    "fr-FR": `${SITE_URL}/fr/a-propos`,
    en: `${SITE_URL}/about`,
  };
  entries.push({
    url: `${SITE_URL}/fr/a-propos`,
    changeFrequency: "yearly",
    priority: 0.5,
    alternates: { languages: aboutLanguages },
  });
  entries.push({
    url: `${SITE_URL}/about`,
    changeFrequency: "yearly",
    priority: 0.5,
    alternates: { languages: aboutLanguages },
  });

  return entries;
}
