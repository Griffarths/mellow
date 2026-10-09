import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { type BlogLocale, getPillarArticles, pageCount, pageOf } from "@/lib/blog";
import { PILLARS, type PillarId } from "@/lib/pillars";
import { DIARY, OVERUSE_PAGE, TEST_PAGE, isToolLocale } from "@/lib/tools";
import { typographize } from "@/lib/typography";
import { BlogBrowser } from "./BlogBrowser";
import { Pagination } from "./Pagination";
import { blogTabs, cardOf, searchIndex } from "./blog-lists";

type Props = {
  pillar: PillarId;
  locale: BlogLocale;
  page: number;
  // This category's path in every language where it is live.
  localePaths: Partial<Record<BlogLocale, string>>;
};

// One free resource per category, when it fits.
const TOOL: Partial<Record<PillarId, typeof TEST_PAGE | typeof DIARY | typeof OVERUSE_PAGE>> = {
  symptoms: TEST_PAGE,
  diagnosis: TEST_PAGE,
  triggers: DIARY,
  living: DIARY,
  treatments: OVERUSE_PAGE,
};

export function categoryPages(locale: BlogLocale, pillar: PillarId): number {
  return pageCount(getPillarArticles(locale, pillar).length);
}

export async function PillarPage({ pillar, locale, page, localePaths }: Props) {
  const t = await getTranslations({ locale, namespace: "blog" });
  const copy = PILLARS[pillar][locale];
  const articles = getPillarArticles(locale, pillar);
  const pages = pageCount(articles.length);
  if (page > pages) notFound();
  const tool = isToolLocale(locale) ? TOOL[pillar]?.[locale] ?? null : null;
  const base = `/blog/${copy.slug}`;

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
          <span className="text-ink-2">{copy.label}</span>
        </nav>

        <h1 className="mt-6 text-display text-ink">{copy.title}</h1>
        {page === 1 ? (
          <Intro paragraphs={copy.intro} locale={locale} tool={tool} />
        ) : (
          <p className="mt-4 text-lg text-ink-2">{t("pageN", { n: page })}</p>
        )}

        <div className="mt-12">
          <BlogBrowser
            tabs={await blogTabs(locale, pillar)}
            cards={pageOf(articles, page).map((a) => cardOf(locale, a, false))}
            index={searchIndex(locale)}
            count={t("pillarCount", { count: articles.length })}
          >
            <Pagination base={base} page={page} pages={pages} />
          </BlogBrowser>
        </div>

      </main>
      <Footer localePaths={localePaths} />
    </>
  );
}

function Intro({ paragraphs, locale, tool }: { paragraphs: string[]; locale: BlogLocale; tool: { path: string; title: string } | null }) {
  return (
    <>
      <div className="mt-5 max-w-[65ch] space-y-4 text-base leading-relaxed text-ink-2 md:text-[17px]">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{typographize(p, locale)}</p>
        ))}
      </div>
      {tool && (
        <p className="mt-6 text-[15px] text-ink-2">
          <Link
            href={tool.path}
            className="font-semibold text-ink underline decoration-ink/20 decoration-2 underline-offset-[3px] transition hover:decoration-ink"
          >
            {typographize(tool.title, locale)}
          </Link>
          <span aria-hidden> →</span>
        </p>
      )}
    </>
  );
}
