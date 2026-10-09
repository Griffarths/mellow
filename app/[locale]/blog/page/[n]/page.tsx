import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { BlogIndex, blogPages } from "@/components/blog/BlogIndex";
import { hasBlog, liveBlogLocales } from "@/lib/blog";
import { localizedUrl } from "@/lib/hreflang";

// Pages 2, 3… of the blog list (page 1 is /blog).
type Props = { params: Promise<{ locale: string; n: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return liveBlogLocales().flatMap((locale) =>
    Array.from({ length: blogPages(locale) - 1 }, (_, i) => ({ locale, n: String(i + 2) })),
  );
}

const pageNumber = (n: string) => (/^\d+$/.test(n) && Number(n) >= 2 ? Number(n) : null);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, n } = await params;
  const page = pageNumber(n);
  if (!hasLocale(routing.locales, locale) || !hasBlog(locale) || !page) return {};
  const t = await getTranslations({ locale, namespace: "blog" });
  const title = `${t("metaTitle")} · ${t("pageN", { n: page })}`;
  const url = localizedUrl(locale, `/blog/page/${page}`);
  return { title, description: t("metaDescription"), alternates: { canonical: url }, openGraph: { type: "website", title, url } };
}

export default async function BlogListPage({ params }: Props) {
  const { locale, n } = await params;
  const page = pageNumber(n);
  if (!hasLocale(routing.locales, locale) || !hasBlog(locale) || !page) notFound();
  setRequestLocale(locale);
  return <BlogIndex locale={locale} page={page} />;
}
