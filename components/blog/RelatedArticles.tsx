import { useTranslations } from "next-intl";
import type { Article } from "@/lib/blog";
import { ArticleCard } from "./ArticleCard";

export function RelatedArticles({ articles }: { articles: Article[] }) {
  const t = useTranslations("blog");
  if (articles.length === 0) return null;

  return (
    <section className="mt-16 border-t border-surface-line pt-12">
      <h2 className="text-h3 text-ink md:text-[28px]">
        {t("relatedTitle")}
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}
