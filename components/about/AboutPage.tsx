import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ABOUT_COPY } from "@/lib/about-copy";
import { ABOUT_PATH, aboutAlternates, aboutUrl } from "@/lib/about";
import { HREFLANG, OG_LOCALE } from "@/lib/blog";

export type AboutLocale = keyof typeof ABOUT_COPY;

const EMAIL = "contact.mellow@proton.me";
const H2 = "mt-14 scroll-mt-24 text-[26px] font-extrabold leading-tight tracking-tight text-ink md:text-[32px]";
const P = "my-5 text-[17px] leading-[1.8] text-ink-body md:text-lg";

export function aboutMetadata(locale: AboutLocale): Metadata {
  const c = ABOUT_COPY[locale];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: aboutUrl(locale), languages: aboutAlternates() },
    openGraph: {
      type: "website",
      title: c.metaTitle,
      description: c.ogDescription,
      url: aboutUrl(locale),
      locale: OG_LOCALE[locale],
    },
  };
}

// **bold**, *italic* and {email} inside a paragraph of lib/about-copy.ts.
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\{email\})/).map((part, i) => {
    if (part.startsWith("**")) return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
    if (part.startsWith("*")) return <em key={i} className="italic">{part.slice(1, -1)}</em>;
    if (part === "{email}")
      return (
        <strong key={i} className="font-semibold text-ink">
          <a
            href={`mailto:${EMAIL}`}
            className="text-croix-ink underline decoration-croix-ink/30 decoration-2 underline-offset-[3px] transition hover:decoration-croix-ink"
          >
            {EMAIL}
          </a>
        </strong>
      );
    return part;
  });
}

// The About page in the languages other than French and English, laid out
// like /a-propos and /about: Laurine's story, then her signature.
export function AboutPage({ locale }: { locale: AboutLocale }) {
  const c = ABOUT_COPY[locale];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: aboutUrl(locale),
    inLanguage: HREFLANG[locale],
    name: c.metaTitle,
    mainEntity: {
      "@type": "Person",
      name: "Laurine Nicoletti",
      jobTitle: c.jobTitle,
      description: c.personDescription,
      address: { "@type": "PostalAddress", addressLocality: "Bordeaux", addressCountry: "FR" },
    },
  };

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-chip bg-surface-soft px-3 py-2 text-sm font-semibold text-ink-2 transition hover:bg-surface-line hover:text-ink"
        >
          {c.back}
        </Link>

        <article className="mx-auto mt-10 max-w-[65ch]">
          <h1 className="text-h1 text-ink">{c.title}</h1>
          {c.blocks.map((block, i) =>
            "h2" in block ? (
              <h2 key={i} className={H2}>
                {block.h2}
              </h2>
            ) : (
              <p key={i} className={P}>
                {inline(block.p)}
              </p>
            ),
          )}
          <p className={P}>Laurine</p>
        </article>
      </main>
      <Footer localePaths={ABOUT_PATH} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
