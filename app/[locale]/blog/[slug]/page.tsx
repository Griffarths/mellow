import type { Metadata } from "next";
import type { ComponentProps } from "react";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { remarkTypographize } from "@/lib/typography";
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
import { AppCta } from "@/components/blog/AppCta";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { AUTHOR, aboutUrl } from "@/lib/author";
import { extractFaq } from "@/lib/faq";
import { breadcrumbJsonLd, withDefault } from "@/lib/hreflang";
import {
  type BlogLocale,
  HREFLANG,
  OG_LOCALE,
  coverOgImage,
  getAllArticles,
  getArticleBySlug,
  getArticleVersions,
  getPillarArticles,
  getRelatedArticles,
  hasBlog,
  liveBlogLocales,
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

// A pillar page exists in a language once the pillar has articles there.
function pillarIsLive(pillar: PillarId, locale: BlogLocale) {
  return getPillarArticles(locale, pillar).length > 0;
}

export function generateStaticParams() {
  return liveBlogLocales().flatMap((locale) => [
    ...getAllArticles(locale).map((a) => ({ locale, slug: a.slug })),
    ...PILLAR_IDS.filter((id) => pillarIsLive(id, locale)).map((id) => ({
      locale,
      slug: PILLARS[id][locale].slug,
    })),
  ]);
}

function pillarLanguages(pillar: PillarId) {
  return withDefault(Object.fromEntries(
    liveBlogLocales()
      .filter((l) => pillarIsLive(pillar, l))
      .map((l) => [HREFLANG[l], urlFor(l, `/blog/${PILLARS[pillar][l].slug}`)]),
  ));
}

// Paths for the language switcher, { locale: "/blog/<slug>" }.
function pillarPaths(pillar: PillarId) {
  return Object.fromEntries(
    liveBlogLocales()
      .filter((l) => pillarIsLive(pillar, l))
      .map((l) => [l, `/blog/${PILLARS[pillar][l].slug}`]),
  );
}

function articlePaths(versions: Partial<Record<BlogLocale, string>>) {
  return Object.fromEntries(Object.entries(versions).map(([l, s]) => [l, `/blog/${s}`]));
}

// hreflang alternates of an article: every language version found through
// relatedSlugInOtherLanguage (see getArticleVersions).
function articleLanguages(versions: Partial<Record<BlogLocale, string>>) {
  return withDefault(Object.fromEntries(
    (Object.entries(versions) as [BlogLocale, string][]).map(([l, s]) => [
      HREFLANG[l],
      urlFor(l, `/blog/${s}`),
    ]),
  ));
}

const inLanguage = (locale: BlogLocale) => (locale === "en" ? "en-US" : HREFLANG[locale]);

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
      locale: OG_LOCALE[locale],
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasBlog(locale)) return {};
  const pillar = pillarForSlug(locale, slug);
  if (pillar) return pillarIsLive(pillar, locale) ? pillarMetadata(pillar, locale) : {};
  const article = getArticleBySlug(locale, slug);
  if (!article) return {};

  const url = urlFor(locale, `/blog/${slug}`);
  const ogImage = coverOgImage(article);
  const ogLocale = OG_LOCALE[locale];
  const languages = articleLanguages(getArticleVersions(article));

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
  if (!hasBlog(locale)) notFound();
  setRequestLocale(locale);

  const pillar = pillarForSlug(locale, slug);
  if (pillar) {
    const articles = getPillarArticles(locale, pillar);
    if (articles.length === 0) notFound();
    const copy = PILLARS[pillar][locale];
    const pillarUrl = urlFor(locale, `/blog/${copy.slug}`);
    const pillarJsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": pillarUrl,
      url: pillarUrl,
      name: copy.title,
      description: copy.description,
      inLanguage: inLanguage(locale),
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
    const pillarBreadcrumb = breadcrumbJsonLd([
      ["Mellow", urlFor(locale, "")],
      ["Blog", urlFor(locale, "/blog")],
      [copy.label, pillarUrl],
    ]);
    return (
      <>
        <PillarPage pillar={pillar} locale={locale} page={1} localePaths={pillarPaths(pillar)} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pillarJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pillarBreadcrumb) }}
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
        label: PILLARS[articlePillar][locale].label,
      }
    : null;
  // The mid-article app card takes the colour of the article's topic.
  const components = articlePillar
    ? {
        ...mdxComponents,
        AppCta: (props: ComponentProps<typeof AppCta>) => (
          <AppCta {...props} tone={PILLARS[articlePillar].tone} />
        ),
      }
    : mdxComponents;
  const related = getRelatedArticles(article);
  const hasEndCta = /<AppCta[^>]*variant="end"/.test(article.content);

  const articleUrl = urlFor(locale, `/blog/${slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: coverOgImage(article),
    datePublished: new Date(article.publishedAt).toISOString(),
    dateModified: new Date(article.updatedAt).toISOString(),
    inLanguage: inLanguage(locale),
    keywords: article.tags.join(", "),
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: aboutUrl(locale),
      worksFor: { "@type": "Organization", name: "Mellow", url: SITE_URL },
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

  // Home › Blog › (topic) › article, shown by Google in place of the raw address.
  const breadcrumb = breadcrumbJsonLd([
    ["Mellow", urlFor(locale, "")],
    ["Blog", urlFor(locale, "/blog")],
    ...(articlePillar
      ? [
          [
            PILLARS[articlePillar][locale].label,
            urlFor(locale, `/blog/${PILLARS[articlePillar][locale].slug}`),
          ] as [string, string],
        ]
      : []),
    [article.title, articleUrl],
  ]);

  // FAQ of the article (when it has one), declared to search engines.
  const faq = extractFaq(article.content);
  const faqJsonLd =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: inLanguage(locale),
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <BackToBlog />

        <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
          <article className="min-w-0">
            <ArticleHeader article={article} pillar={pillarLink} />
            <div className="mt-10 max-w-[65ch]">
              <MDXRemote
                source={article.content}
                components={components}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm, remarkTypographize(article.locale)],
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
              <AuthorBox />
              {!hasEndCta && <BlogCta />}
              <RelatedArticles articles={related} pillar={pillarLink} />
            </div>
          </article>

          <aside className="hidden lg:block">
            <TableOfContents content={article.content} />
          </aside>
        </div>
      </main>
      <Footer localePaths={articlePaths(getArticleVersions(article))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </>
  );
}
