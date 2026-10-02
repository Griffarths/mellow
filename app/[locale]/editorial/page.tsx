import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { pageAlternates } from "@/lib/hreflang";

const SITE_URL = "https://mellowmigraine.com";
const pageUrl = (locale: string) =>
  locale === routing.defaultLocale ? `${SITE_URL}/editorial` : `${SITE_URL}/${locale}/editorial`;

type Props = { params: Promise<{ locale: string }> };

// How the blog is written: who, which sources, what we don't do, updates.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "editorialPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: pageAlternates(locale, "/editorial"),
  };
}

export default async function EditorialPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <EditorialContent />;
}

const H2 =
  "mt-12 scroll-mt-24 text-[24px] font-extrabold leading-tight tracking-tight text-ink md:text-[28px]";
const P = "my-4 text-[17px] leading-[1.8] text-ink-body md:text-lg";

function EditorialContent() {
  const t = useTranslations("editorialPage");
  const c = useTranslations("common");
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 rounded-chip bg-surface-soft px-3 py-2 text-sm font-semibold text-ink-2 transition hover:bg-surface-line hover:text-ink"
        >
          {c("back")}
        </Link>
        <article className="mt-10 max-w-[65ch]">
          <h1 className="text-h1 text-ink">{t("title")}</h1>
          <p className={`${P} mt-6`}>{t("intro")}</p>
          <h2 className={H2}>{t("whoTitle")}</h2>
          <p className={P}>{t("whoText")}</p>
          <h2 className={H2}>{t("sourcesTitle")}</h2>
          <p className={P}>{t("sourcesText")}</p>
          <h2 className={H2}>{t("limitsTitle")}</h2>
          <p className={P}>{t("limitsText")}</p>
          <h2 className={H2}>{t("updatesTitle")}</h2>
          <p className={P}>{t("updatesText")}</p>
          <h2 className={H2}>{t("errorTitle")}</h2>
          <p className={P}>
            {t("errorText")}{" "}
            <Link
              href="/contact"
              className="font-semibold text-croix-ink underline decoration-croix-ink/30 decoration-2 underline-offset-[3px] transition hover:decoration-croix-ink"
            >
              {t("contact")}
            </Link>
          </p>
          <p className="mt-12 rounded-card bg-surface-soft p-5 text-[15px] leading-relaxed text-ink-2">
            {t("disclaimer")}
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
