import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getAllArticles, isBlogLocale } from "@/lib/blog";
import { ComingSoon } from "./coming-soon";

const SITE_URL = "https://mellowmigraine.com";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  if (!isBlogLocale(locale)) {
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
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
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
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h1 className="hero-title text-5xl font-bold tracking-tight md:text-7xl">
          {t("indexTitle")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-black/60 md:text-xl">
          {t("indexSubtitle")}
        </p>

        {articles.length === 0 ? (
          <p className="mt-12 text-black/50">{t("emptyState")}</p>
        ) : (
          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
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
