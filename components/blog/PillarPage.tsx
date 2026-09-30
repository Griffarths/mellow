import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import type { Article, BlogLocale } from "@/lib/blog";
import { PILLARS, type PillarId } from "@/lib/pillars";
import { DIARY, TEST_PAGE } from "@/lib/tools";
import { typographize } from "@/lib/typography";
import { ArticleCard } from "./ArticleCard";
import { BlogCta } from "./BlogCta";
import { PillarNav } from "./PillarNav";

type Props = {
  pillar: PillarId;
  locale: BlogLocale;
  articles: Article[];
};

export function PillarPage({ pillar, locale, articles }: Props) {
  const t = useTranslations("blog");
  const tc = useTranslations("courses");
  const copy = PILLARS[pillar][locale];
  const tool = pillar === "understand" ? TEST_PAGE[locale] : DIARY[locale];

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pb-28 md:pt-14">
        <nav aria-label="Breadcrumb" className="text-sm font-semibold text-ink-3">
          <Link href="/blog" className="transition hover:text-ink">
            {t("indexTitle")}
          </Link>
          <span aria-hidden className="mx-2">
            ›
          </span>
          <span className="text-ink-2">{tc(`${pillar}.title`)}</span>
        </nav>

        <PillarNav locale={locale} current={pillar} className="mt-5" />

        <h1 className="mt-8 text-display text-ink">{copy.title}</h1>
        <div className="mt-5 max-w-[65ch] space-y-4 text-base leading-relaxed text-ink-2 md:text-[17px]">
          {copy.intro.map((p) => (
            <p key={p.slice(0, 24)}>{typographize(p, locale)}</p>
          ))}
        </div>

        <p className="mt-6 text-[15px] text-ink-2">
          <span className="mr-2 text-caption font-bold uppercase tracking-[0.08em] text-croix-ink">
            {tool.eyebrow}
          </span>
          <Link
            href={tool.path}
            className="font-semibold text-ink underline decoration-ink/20 decoration-2 underline-offset-[3px] transition hover:decoration-ink"
          >
            {typographize(tool.title, locale)}
          </Link>
          <span aria-hidden> →</span>
        </p>

        <p className="mt-12 text-sm font-semibold text-ink-3">
          {t("pillarCount", { count: articles.length })}
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {articles.map((article, i) => (
            <ArticleCard
              key={article.slug}
              article={article}
              badge={i === 0 ? t("startHere") : undefined}
            />
          ))}
        </div>

        <div className="mx-auto max-w-[65ch]">
          <BlogCta />
        </div>
      </main>
      <Footer />
    </>
  );
}
