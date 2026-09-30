import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import { PILLARS, pillarOfArticle, type PillarId } from "./pillars";

// Every site locale can have articles (content/blog/{locale}). A locale's blog
// goes live as soon as it has at least one article: see hasBlog().
export const BLOG_LOCALES = ["fr", "en", "de", "it", "es", "es-419", "pt", "pt-BR"] as const;
export type BlogLocale = (typeof BLOG_LOCALES)[number];

// hreflang / inLanguage code and Open Graph locale for each blog locale.
export const HREFLANG: Record<BlogLocale, string> = {
  fr: "fr-FR",
  en: "en",
  de: "de",
  it: "it",
  es: "es-ES",
  "es-419": "es-419",
  pt: "pt-PT",
  "pt-BR": "pt-BR",
};
export const OG_LOCALE: Record<BlogLocale, string> = {
  fr: "fr_FR",
  en: "en_US",
  de: "de_DE",
  it: "it_IT",
  es: "es_ES",
  "es-419": "es_LA",
  pt: "pt_PT",
  "pt-BR": "pt_BR",
};

export type Frontmatter = {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  coverImage: string;
  coverBgColor?: string;
  tags: string[];
  relatedSlugInOtherLanguage?: string;
};

export type Article = Frontmatter & {
  locale: BlogLocale;
  content: string;
  readingTime: { text: string; minutes: number; words: number };
};

const CONTENT_ROOT = path.join(process.cwd(), "content/blog");

export function isBlogLocale(locale: string): locale is BlogLocale {
  return (BLOG_LOCALES as readonly string[]).includes(locale);
}

// A locale's blog is live once it has at least one article; before that the
// blog shows the "coming soon" page.
export function hasBlog(locale: string): locale is BlogLocale {
  return isBlogLocale(locale) && getAllArticles(locale).length > 0;
}

export function liveBlogLocales(): BlogLocale[] {
  return BLOG_LOCALES.filter((l) => hasBlog(l));
}

function readArticle(locale: BlogLocale, file: string): Article {
  const full = path.join(CONTENT_ROOT, locale, file);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;
  const stats = readingTime(content);
  return {
    ...fm,
    locale,
    content,
    readingTime: { text: stats.text, minutes: stats.minutes, words: stats.words },
  };
}

export function getAllArticles(locale: BlogLocale): Article[] {
  const dir = path.join(CONTENT_ROOT, locale);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((f) => readArticle(locale, f))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getArticleBySlug(
  locale: BlogLocale,
  slug: string,
): Article | null {
  return getAllArticles(locale).find((a) => a.slug === slug) ?? null;
}

// Same pillar, same language; ties on shared tags keep the pillar's
// reading order.
export function getRelatedArticles(article: Article, max = 3): Article[] {
  const pillar = pillarOfArticle(article.locale, article.slug);
  if (!pillar) return [];
  const order = PILLARS[pillar][article.locale].articles;
  const all = getAllArticles(article.locale);
  return order
    .filter((slug) => slug !== article.slug)
    .map((slug) => all.find((a) => a.slug === slug))
    .filter((a): a is Article => a !== undefined)
    .map((a, i) => ({
      article: a,
      score: a.tags.filter((t) => article.tags.includes(t)).length,
      i,
    }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, max)
    .map((s) => s.article);
}

// All language versions of an article, as { locale: slug }.
// relatedSlugInOtherLanguage links versions pairwise and may chain
// (de → fr → en): versions are the connected group of these links.
export function getArticleVersions(article: Article): Partial<Record<BlogLocale, string>> {
  const all = BLOG_LOCALES.flatMap((l) => getAllArticles(l));
  const key = (a: Article) => `${a.locale}/${a.slug}`;
  const target = (a: Article): Article | undefined => {
    const s = a.relatedSlugInOtherLanguage;
    if (!s) return undefined;
    // Prefer FR then EN when the same slug exists in several languages.
    return (
      all.find((b) => b.locale !== a.locale && b.slug === s && b.locale === "fr") ??
      all.find((b) => b.locale !== a.locale && b.slug === s && b.locale === "en") ??
      all.find((b) => b.locale !== a.locale && b.slug === s)
    );
  };
  const group = new Map<string, Article>([[key(article), article]]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const a of all) {
      if (group.has(key(a))) continue;
      const t = target(a);
      const linkedFromGroup = [...group.values()].some((g) => {
        const gt = target(g);
        return gt !== undefined && key(gt) === key(a);
      });
      if (linkedFromGroup || (t && group.has(key(t)))) {
        group.set(key(a), a);
        grew = true;
      }
    }
  }
  const versions: Partial<Record<BlogLocale, string>> = {};
  for (const a of group.values()) if (!versions[a.locale]) versions[a.locale] = a.slug;
  return versions;
}

export function getPillarArticles(locale: BlogLocale, pillar: PillarId): Article[] {
  const all = getAllArticles(locale);
  return (PILLARS[pillar][locale]?.articles ?? [])
    .map((slug) => all.find((a) => a.slug === slug))
    .filter((a): a is Article => a !== undefined);
}

export type TocHeading = { level: 2 | 3; text: string; slug: string };

export function extractHeadings(content: string): TocHeading[] {
  // Fresh slugger per article so duplicate-handling state matches
  // what rehype-slug does at render time (per-document github-slugger).
  const slugger = new GithubSlugger();
  const lines = content.split("\n");
  const headings: TocHeading[] = [];
  let inCode = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const level = m[1].length as 2 | 3;
    const text = m[2].trim();
    headings.push({ level, text, slug: slugger.slug(text) });
  }
  return headings;
}
