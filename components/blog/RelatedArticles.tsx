import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Article } from "@/lib/blog";
import type { PillarLink } from "@/lib/pillar-link";
import { ArticleCard } from "./ArticleCard";

type Props = {
  articles: Article[];
  pillar: PillarLink;
};

export function RelatedArticles({ articles, pillar }: Props) {
  const t = useTranslations("blog");
  const tc = useTranslations("courses");
  if (articles.length === 0) return null;

  return (
    <section className="mt-16 border-t border-surface-line pt-12">
      <h2 className="text-h3 text-ink md:text-[28px]">{t("relatedTitle")}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
      {pillar && (
        <Link
          href={pillar.href}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-croix-ink underline decoration-croix-ink/30 decoration-2 underline-offset-[3px] transition hover:decoration-croix-ink"
        >
          {t("allInPillar", { pillar: tc(`${pillar.id}.title`) })}
          <span aria-hidden>→</span>
        </Link>
      )}
    </section>
  );
}
