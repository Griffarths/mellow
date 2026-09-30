import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { BackToBlog } from "@/components/blog/BackToBlog";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { BlogCta } from "@/components/blog/BlogCta";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { PillarPage } from "@/components/blog/PillarPage";
import { mdxComponents } from "@/lib/mdx-components";
import {
  BLOG_LOCALES,
  type BlogLocale,
  getAllArticles,
  getArticleBySlug,
  getPillarArticles,
  getRelatedArticles,
  isBlogLocale,
} from "@/lib/blog";
import {
  PILLARS,
  PILLAR_IDS,
  pillarForSlug,
  pillarOfArticle,
  type PillarId,
} from "@/lib/pillars";

const SITE_URL = "https://mellowmigraine.com";

function pathFor(locale: string, suffix: string) {
  return locale === routing.defaultLocale ? suffix : `/${locale}${suffix}`;
}

function urlFor(locale: string, suffix: string) {
  return `${SITE_URL}${pathFor(locale, suffix)}`;
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return BLOG_LOCALES.flatMap((locale) => [
    ...getAllArticles(locale).map((a) => ({ locale, slug: a.slug })),
    ...PILLAR_IDS.map((id) => ({ locale, slug: PILLARS[id][locale].slug })),
  ]);
}

function pillarLanguages(pillar: PillarId) {
  return {
    "fr-FR": urlFor("fr", `/blog/${PILLARS[pillar].fr.slug}`),
    en: urlFor("en", `/blog/${PILLARS[pillar].en.slug}`),
  };
}

function pillarMetadata(pillar: PillarId, locale: BlogLocale): Metadata {
  const copy = PILLARS[pillar][locale];
  const url = urlFor(locale, `/blog/${copy.slug}`);
  return {
    title: `${copy.metaTitle} · Mellow`,
    description: copy.description,
    alternates: { canonical: url, languages: pillarLanguages(pillar) },
    openGraph: {
      type: "website",
      title: copy.metaTitle,
      description: copy.description,
      url,
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isBlogLocale(locale)) return {};
  const pillar = pillarForSlug(locale, slug);
  if (pillar) return pillarMetadata(pillar, locale);
  const article = getArticleBySlug(locale, slug);
  if (!article) return {};

  const url = urlFor(locale, `/blog/${slug}`);
  const ogImage = `${SITE_URL}${article.coverImage}`;
  const ogLocale = locale === "fr" ? "fr_FR" : "en_US";

  const languages: Record<string, string> = {
    [locale === "fr" ? "fr-FR" : "en"]: url,
  };
  if (article.relatedSlugInOtherLanguage) {
    const other: BlogLocale = locale === "fr" ? "en" : "fr";
    languages[other === "fr" ? "fr-FR" : "en"] = urlFor(
      other,
      `/blog/${article.relatedSlugInOtherLanguage}`,
    );
  }

  return {
    title: `${article.title} · Mellow`,
    description: article.description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url,
      locale: ogLocale,
      images: [{ url: ogImage }],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  if (!isBlogLocale(locale)) notFound();
  setRequestLocale(locale);

  const pillar = pillarForSlug(locale, slug);
  if (pillar) {
    const articles = getPillarArticles(locale, pillar);
    const copy = PILLARS[pillar][locale];
    const pillarUrl = urlFor(locale, `/blog/${copy.slug}`);
    const pillarJsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": pillarUrl,
      url: pillarUrl,
      name: copy.title,
      description: copy.description,
      inLanguage: locale === "fr" ? "fr-FR" : "en-US",
      isPartOf: { "@type": "Blog", "@id": urlFor(locale, "/blog") },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: articles.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: urlFor(locale, `/blog/${a.slug}`),
          name: a.title,
        })),
      },
    };
    return (
      <>
        <PillarPage pillar={pillar} locale={locale} articles={articles} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pillarJsonLd) }}
        />
      </>
    );
  }

  const article = getArticleBySlug(locale, slug);
  if (!article) notFound();

  const articlePillar = pillarOfArticle(locale, article.slug);
  const pillarLink = articlePillar
    ? {
        href: `/blog/${PILLARS[articlePillar][locale].slug}`,
        id: articlePillar,
      }
    : null;
  const related = getRelatedArticles(article);
  const hasEndCta = /<AppCta[^>]*variant="end"/.test(article.content);

  const articleUrl = urlFor(locale, `/blog/${slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: `${SITE_URL}/logo.png`,
    datePublished: new Date(article.publishedAt).toISOString(),
    dateModified: new Date(article.updatedAt).toISOString(),
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    keywords: article.tags.join(", "),
    author: {
      "@type": "Organization",
      name: "Mellow",
      url: SITE_URL,
    },
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <BackToBlog />

        <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
          <article className="min-w-0">
            <ArticleHeader article={article} pillar={pillarLink} />
            <div className="mx-auto mt-10 max-w-[65ch]">
              <MDXRemote
                source={article.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypeAutolinkHeadings,
                        {
                          behavior: "wrap",
                          properties: { className: "no-underline" },
                        },
                      ],
                    ],
                  },
                }}
              />
              {!hasEndCta && <BlogCta />}
              <RelatedArticles articles={related} pillar={pillarLink} />
            </div>
          </article>

          <aside className="hidden lg:block">
            <TableOfContents content={article.content} />
          </aside>
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
