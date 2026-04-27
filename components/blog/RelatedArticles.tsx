import { useTranslations } from "next-intl";
import type { Article } from "@/lib/blog";
import { ArticleCard } from "./ArticleCard";

export function RelatedArticles({ articles }: { articles: Article[] }) {
  const t = useTranslations("blog");
  if (articles.length === 0) return null;

  return (
    <section className="mt-20 border-t border-black/5 pt-12">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
        {t("relatedTitle")}
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}
