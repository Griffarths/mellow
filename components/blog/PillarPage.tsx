import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Tile } from "@/components/ui/Tile";
import type { Article, BlogLocale } from "@/lib/blog";
import { PILLARS, PILLAR_IDS, type PillarId } from "@/lib/pillars";
import { TONES } from "@/lib/tones";
import { typographize } from "@/lib/typography";
import { ArticleCard } from "./ArticleCard";
import { BlogCta } from "./BlogCta";

type Props = {
  pillar: PillarId;
  locale: BlogLocale;
  articles: Article[];
};

export function PillarPage({ pillar, locale, articles }: Props) {
  const t = useTranslations("blog");
  const tc = useTranslations("courses");
  const copy = PILLARS[pillar][locale];
  const others = PILLAR_IDS.filter((id) => id !== pillar);

  return (
    <>
      <Nav />
      <header>
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-10 md:pb-14 md:pt-14">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-ink-3">
            <Link href="/blog" className="transition hover:text-ink">
              {t("indexTitle")}
            </Link>
            <span aria-hidden className="mx-2">
              ›
            </span>
            <span className="text-ink-2">{tc(`${pillar}.title`)}</span>
          </nav>
          <div className="mt-6 flex items-center gap-10">
            <div className="min-w-0 flex-1">
              <h1 className="text-display text-ink">{copy.title}</h1>
              <div className="mt-5 max-w-2xl space-y-4 text-base leading-relaxed text-ink-2 md:text-lg">
                {copy.intro.map((p) => (
                  <p key={p.slice(0, 24)}>{typographize(p, locale)}</p>
                ))}
              </div>
            </div>
            <img
              src={TONES[PILLARS[pillar].tone].mascot}
              alt=""
              aria-hidden
              draggable={false}
              className="breathe hidden w-44 shrink-0 select-none md:block lg:w-52"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <p className="text-sm font-semibold text-ink-3">
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

        <section className="mt-20">
          <h2 className="text-h3 text-ink md:text-[28px]">{t("otherPillars")}</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2 md:gap-4">
            {others.map((id) => (
              <Tile
                key={id}
                href={`/blog/${PILLARS[id][locale].slug}`}
                tone={PILLARS[id].tone}
                title={PILLARS[id][locale].title}
                subtitle={tc(`${id}.subtitle`)}
              />
            ))}
          </div>
        </section>

        <div className="mx-auto max-w-[65ch]">
          <BlogCta />
        </div>
      </main>
      <Footer />
    </>
  );
}
