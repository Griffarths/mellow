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
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyContent locale={locale as Locale} />;
}

function PrivacyContent({ locale }: { locale: Locale }) {
  const t = useTranslations("common");
  const Content = CONTENT[locale] ?? Fr;
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-black/50 transition hover:text-black"
        >
          {t("back")}
        </Link>

        <article className="prose prose-neutral mt-6 max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl md:prose-h1:text-5xl prose-h2:mt-14 prose-h2:text-2xl md:prose-h2:text-3xl prose-h3:mt-10 prose-h3:text-xl prose-p:text-black/70 prose-a:text-mellow-rose prose-a:underline-offset-2 prose-strong:text-ink prose-li:text-black/70">
          <Content />
        </article>
      </main>
      <Footer />
    </>
  );
}
