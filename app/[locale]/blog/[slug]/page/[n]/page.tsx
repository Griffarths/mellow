import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { PillarPage, categoryPages } from "@/components/blog/PillarPage";
import { type BlogLocale, getPillarArticles, hasBlog, liveBlogLocales } from "@/lib/blog";
import { localizedUrl } from "@/lib/hreflang";
import { PILLARS, PILLAR_IDS, pillarForSlug, type PillarId } from "@/lib/pillars";

// Pages 2, 3… of a category (page 1 is /blog/{category}).
type Props = { params: Promise<{ locale: string; slug: string; n: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return liveBlogLocales().flatMap((locale) =>
    PILLAR_IDS.flatMap((id) =>
      Array.from({ length: categoryPages(locale, id) - 1 }, (_, i) => ({
        locale,
        slug: PILLARS[id][locale].slug,
        n: String(i + 2),
      })),
    ),
  );
}

const pageNumber = (n: string) => (/^\d+$/.test(n) && Number(n) >= 2 ? Number(n) : null);

// The category in the other languages: their first page.
function firstPages(pillar: PillarId) {
  return Object.fromEntries(
    liveBlogLocales()
      .filter((l) => getPillarArticles(l, pillar).length > 0)
      .map((l) => [l, `/blog/${PILLARS[pillar][l].slug}`]),
  ) as Partial<Record<BlogLocale, string>>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, n } = await params;
  const page = pageNumber(n);
  if (!hasLocale(routing.locales, locale) || !hasBlog(locale) || !page) return {};
  const pillar = pillarForSlug(locale, slug);
  if (!pillar) return {};
  const t = await getTranslations({ locale, namespace: "blog" });
  const copy = PILLARS[pillar][locale];
  const title = `${copy.metaTitle} · ${t("pageN", { n: page })} · Mellow`;
  const url = localizedUrl(locale, `/blog/${copy.slug}/page/${page}`);
  return { title, description: copy.description, alternates: { canonical: url }, openGraph: { type: "website", title, url } };
}

export default async function CategoryListPage({ params }: Props) {
  const { locale, slug, n } = await params;
  const page = pageNumber(n);
  if (!hasLocale(routing.locales, locale) || !hasBlog(locale) || !page) notFound();
  const pillar = pillarForSlug(locale, slug);
  if (!pillar) notFound();
  setRequestLocale(locale);
  return <PillarPage pillar={pillar} locale={locale} page={page} localePaths={firstPages(pillar)} />;
}
