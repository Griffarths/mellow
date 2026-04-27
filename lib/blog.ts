import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

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

export function getRelatedArticles(article: Article, max = 3): Article[] {
  return getAllArticles(article.locale)
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      article: a,
      score: a.tags.filter((t) => article.tags.includes(t)).length,
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((s) => s.article);
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export type TocHeading = { level: 2 | 3; text: string; slug: string };

export function extractHeadings(content: string): TocHeading[] {
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
    headings.push({ level, text, slug: slugifyHeading(text) });
  }
  return headings;
}
