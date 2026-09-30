import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import type { Locale } from "@/i18n/routing";

import En from "./content/en";
import Fr from "./content/fr";
import De from "./content/de";
import It from "./content/it";
import Es from "./content/es";
import Es419 from "./content/es-419";
import Pt from "./content/pt";
import PtBr from "./content/pt-BR";

const CONTENT: Record<Locale, () => React.ReactNode> = {
  fr: Fr,
  en: En,
  de: De,
  it: It,
  es: Es,
  "es-419": Es419,
  pt: Pt,
  "pt-BR": PtBr,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent locale={locale as Locale} />;
}

function ContactContent({ locale }: { locale: Locale }) {
  const t = useTranslations("common");
  const Content = CONTENT[locale] ?? En;
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-chip bg-surface-soft px-3 py-2 text-sm font-semibold text-ink-2 transition hover:bg-surface-line hover:text-ink"
        >
          {t("back")}
        </Link>

        <article className="prose mt-8 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-ink prose-h1:text-h1 prose-h2:mt-14 prose-h2:text-[24px] md:prose-h2:text-[30px] prose-h3:mt-10 prose-h3:text-xl prose-p:text-ink-body prose-a:font-semibold prose-a:text-croix-ink prose-a:underline-offset-[3px] prose-strong:text-ink prose-li:text-ink-body prose-li:marker:text-croix-accent">
          <Content />
        </article>
      </main>
      <Footer />
    </>
  );
}
