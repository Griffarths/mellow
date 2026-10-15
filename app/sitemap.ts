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
import { sameAlternates, withDefault } from "@/lib/hreflang";
import { TOOL_LOCALES } from "@/lib/tools";
import { TOOL_IDS, toolAlternates, toolUrl } from "@/lib/tools-seo";
import { doctorAlternates, doctorUrl } from "@/lib/doctor-seo";
import { aboutAlternates, aboutUrl } from "@/lib/about";

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
  const homeAlternates = sameAlternates("");
  for (const locale of routing.locales) {
    entries.push({
      url: url(locale, ""),
      changeFrequency: "monthly",
      priority: locale === routing.defaultLocale ? 1 : 0.9,
      alternates: { languages: homeAlternates },
    });
  }

  // The app in detail: same path in every locale
  const appAlternates = sameAlternates("/app");
  for (const locale of routing.locales) {
    entries.push({
      url: url(locale, "/app"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: appAlternates },
    });
  }

  // For your doctor: one path per language, cross-linked via hreflang
  const doctorLanguages = doctorAlternates();
  for (const locale of routing.locales) {
    entries.push({
      url: doctorUrl(locale),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: doctorLanguages },
    });
  }

  // Blog index: one entry per locale (every locale has /blog — coming-soon for non-FR/EN)
  const blogIndexAlternates = sameAlternates("/blog");
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
    const languages = withDefault(
      Object.fromEntries(
        live.map((l) => [HREFLANG[l], url(l, `/blog/${PILLARS[id][l].slug}`)]),
      ),
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
      const languages = withDefault(
        Object.fromEntries(
          (Object.entries(getArticleVersions(article)) as [BlogLocale, string][]).map(
            ([l, s]) => [HREFLANG[l], url(l, `/blog/${s}`)],
          ),
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

  // Android testers: same path in every locale
  const androidAlternates = sameAlternates("/android");
  for (const locale of routing.locales) {
    entries.push({
      url: url(locale, "/android"),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages: androidAlternates },
    });
  }

  // Localized legal pages
  for (const suffix of ["/contact", "/editorial", "/confidentialite", "/mentions-legales"]) {
    const languages = sameAlternates(suffix);
    for (const locale of routing.locales) {
      entries.push({
        url: url(locale, suffix),
        changeFrequency: "yearly",
        priority: 0.3,
        alternates: { languages },
      });
    }
  }

  // About: one path per language, cross-linked via hreflang
  const aboutLanguages = aboutAlternates();
  for (const locale of routing.locales) {
    entries.push({
      url: aboutUrl(locale),
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: { languages: aboutLanguages },
    });
  }

  return entries;
}
