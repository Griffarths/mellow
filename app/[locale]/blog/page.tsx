import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { PillarNav } from "@/components/blog/PillarNav";
import { HREFLANG, getAllArticles, hasBlog } from "@/lib/blog";
import { ComingSoon } from "./coming-soon";
import { pageAlternates } from "@/lib/hreflang";

const SITE_URL = "https://mellowmigraine.com";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function blogUrl(locale: string) {
  return locale === routing.defaultLocale
    ? `${SITE_URL}/blog`
    : `${SITE_URL}/${locale}/blog`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "blog" });
  const title = hasBlog(locale) ? t("metaTitle") : t("comingSoon.title");
  const description = hasBlog(locale)
    ? t("metaDescription")
    : t("comingSoon.text");
  return {
    title,
    description,
    alternates: pageAlternates(locale, "/blog"),
    openGraph: { type: "website", title, description, url: blogUrl(locale) },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  if (!hasBlog(locale)) {
    return (
      <>
        <Nav />
        <ComingSoon />
        <Footer />
      </>
    );
  }

  const t = await getTranslations("blog");
  const articles = getAllArticles(locale);
  const blogUrl =
    locale === routing.defaultLocale
      ? `${SITE_URL}/blog`
      : `${SITE_URL}/${locale}/blog`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": blogUrl,
    url: blogUrl,
    name: `Mellow — ${t("indexTitle")}`,
    description: t("indexSubtitle"),
    inLanguage: locale === "en" ? "en-US" : HREFLANG[locale],
    publisher: {
      "@type": "Organization",
      name: "Mellow",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 450,
        height: 450,
      },
    },
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      url: `${blogUrl}/${article.slug}`,
      image: `${SITE_URL}/logo.png`,
      datePublished: new Date(article.publishedAt).toISOString(),
      dateModified: new Date(article.updatedAt).toISOString(),
      keywords: article.tags.join(", "),
      author: {
        "@type": "Organization",
        name: "Mellow",
        url: SITE_URL,
      },
    })),
  };

  return (
    <>
      <Nav />
      <header>
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-12 md:pb-14 md:pt-20">
          <h1 className="text-display text-ink">{t("indexTitle")}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-2 md:text-xl">
            {t("indexSubtitle")}
          </p>
          <PillarNav locale={locale} className="mt-7" />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        {articles.length === 0 ? (
          <p className="text-ink-3">{t("emptyState")}</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
