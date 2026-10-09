import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { type BlogLocale, getAllArticles, liveBlogLocales, pageCount, pageOf } from "@/lib/blog";
import { BlogBrowser } from "./BlogBrowser";
import { FeaturedArticle } from "./FeaturedArticle";
import { Pagination } from "./Pagination";
import { blogTabs, cardOf, searchIndex } from "./blog-lists";

// The blog: latest article in the spotlight (page 1), then every other article,
// newest first, 12 per page.
export function blogPages(locale: BlogLocale): number {
  return pageCount(Math.max(0, getAllArticles(locale).length - 1));
}

export async function BlogIndex({ locale, page }: { locale: BlogLocale; page: number }) {
  const t = await getTranslations({ locale, namespace: "blog" });
  const all = getAllArticles(locale);
  const [featured, ...rest] = all;
  const pages = pageCount(rest.length);
  if (page > pages) notFound();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-12 md:pb-28 md:pt-20">
        <h1 className="text-display text-ink">{t("indexTitle")}</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-2 md:text-xl">
          {page > 1 ? `${t("indexSubtitle")} · ${t("pageN", { n: page })}` : t("indexSubtitle")}
        </p>
        {all.length === 0 ? (
          <p className="mt-10 text-ink-3">{t("emptyState")}</p>
        ) : (
          <>
            {page === 1 && featured && (
              <div className="mt-10">
                <FeaturedArticle article={cardOf(locale, featured)} />
              </div>
            )}
            <div className="mt-12">
              <BlogBrowser
                tabs={await blogTabs(locale, null)}
                cards={pageOf(rest, page).map((a) => cardOf(locale, a))}
                index={searchIndex(locale)}
                count={t("pillarCount", { count: all.length })}
              >
                <Pagination base="/blog" page={page} pages={pages} />
              </BlogBrowser>
            </div>
          </>
        )}
      </main>
      {/* Page 2 and beyond: the language switch goes to the first page of the other blogs. */}
      <Footer localePaths={page > 1 ? Object.fromEntries(liveBlogLocales().map((l) => [l, "/blog"])) : undefined} />
    </>
  );
}
