import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getAllArticles, hasBlog } from "@/lib/blog";

// Locales without articles yet skip the section.
export function LatestArticles() {
  const t = useTranslations("blog");
  const locale = useLocale();
  if (!hasBlog(locale)) return null;
  const articles = getAllArticles(locale).slice(0, 3);
  if (articles.length === 0) return null;

  return (
    <section id="latest" className="pb-14 md:pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-center text-h2 text-ink md:text-left">{t("latestTitle")}</h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-croix-ink underline decoration-croix-ink/30 decoration-2 underline-offset-[3px] transition hover:decoration-croix-ink"
          >
            {t("seeAll")}
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
