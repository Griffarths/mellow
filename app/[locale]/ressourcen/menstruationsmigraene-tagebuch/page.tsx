import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { DiaryPage } from "@/components/tools/DiaryPage";
import { toolJsonLd, toolMetadata } from "@/lib/tools-seo";

const PAGE_LOCALES = ["de"] as const;
type PageLocale = (typeof PAGE_LOCALES)[number];
const isPageLocale = (l: string): l is PageLocale => (PAGE_LOCALES as readonly string[]).includes(l);

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return PAGE_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isPageLocale(locale)) return {};
  return toolMetadata("cycleDiary", locale);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isPageLocale(locale)) notFound();
  setRequestLocale(locale);
  return (
    <>
      <DiaryPage locale={locale} tool="cycleDiary" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd("cycleDiary", locale)) }}
      />
    </>
  );
}
