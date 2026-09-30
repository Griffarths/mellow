import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import { PILLARS, pillarOfArticle, type PillarId } from "./pillars";

export const BLOG_LOCALES = ["fr", "en"] as const;
export type BlogLocale = (typeof BLOG_LOCALES)[number];

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

export function getPillarArticles(locale: BlogLocale, pillar: PillarId): Article[] {
  const all = getAllArticles(locale);
  return PILLARS[pillar][locale].articles
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
