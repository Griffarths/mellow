import { getTranslations } from "next-intl/server";
import { type BlogLocale, type CardArticle, getAllArticles, getPillarArticles, toCard } from "@/lib/blog";
import { PILLARS, PILLAR_IDS, pillarOfArticle, type PillarId } from "@/lib/pillars";
import type { BlogTab } from "./BlogBrowser";

// Shared by the blog list and the category pages.

// "All articles", then the categories that have articles in this language.
export async function blogTabs(locale: BlogLocale, current: PillarId | null): Promise<BlogTab[]> {
  const t = await getTranslations({ locale, namespace: "blog" });
  return [
    { href: "/blog", label: t("allArticles"), count: getAllArticles(locale).length, active: current === null },
    ...PILLAR_IDS.map((id) => ({ id, count: getPillarArticles(locale, id).length }))
      .filter((c) => c.count > 0)
      .map(({ id, count }) => ({
        href: `/blog/${PILLARS[id][locale].slug}`,
        label: PILLARS[id][locale].label,
        count,
        active: id === current,
      })),
  ];
}

// Card with its category label (none on a category page: it would repeat the title).
export function cardOf(locale: BlogLocale, article: Parameters<typeof toCard>[0], withCategory = true): CardArticle {
  const id = withCategory ? pillarOfArticle(locale, article.slug) : null;
  return toCard(article, id ? PILLARS[id][locale].label : undefined);
}

// Every article of the language, for the search.
export function searchIndex(locale: BlogLocale): CardArticle[] {
  return getAllArticles(locale).map((a) => cardOf(locale, a));
}
