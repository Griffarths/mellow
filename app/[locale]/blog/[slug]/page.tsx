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
import { mdxComponents } from "@/lib/mdx-components";
import {
  BLOG_LOCALES,
  type BlogLocale,
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  isBlogLocale,
} from "@/lib/blog";

const SITE_URL = "https://mellowmigraine.com";

function pathFor(locale: string, suffix: string) {
  return locale === routing.defaultLocale ? suffix : `/${locale}${suffix}`;
}

function urlFor(locale: string, suffix: string) {
  return `${SITE_URL}${pathFor(locale, suffix)}`;
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return BLOG_LOCALES.flatMap((locale) =>
    getAllArticles(locale).map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isBlogLocale(locale)) return {};
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

  const article = getArticleBySlug(locale, slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: article.title,
    description: article.description,
    image: `${SITE_URL}${article.coverImage}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: locale === "fr" ? "fr-FR" : "en",
    author: {
      "@type": "Organization",
      name: "Mellow",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Mellow",
      url: SITE_URL,
    },
  };

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <BackToBlog />

        <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
          <article className="min-w-0">
            <ArticleHeader article={article} />
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
              <BlogCta />
              <RelatedArticles articles={related} />
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
