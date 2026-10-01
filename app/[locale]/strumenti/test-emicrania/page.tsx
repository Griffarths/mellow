import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { TestPage } from "@/components/tools/TestPage";
import { toolJsonLd, toolMetadata } from "@/lib/tools-seo";

const PAGE_LOCALE = "it";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: PAGE_LOCALE }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== PAGE_LOCALE) return {};
  return toolMetadata("test", PAGE_LOCALE);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== PAGE_LOCALE) notFound();
  setRequestLocale(locale);
  return (
    <>
      <TestPage locale={PAGE_LOCALE} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd("test", PAGE_LOCALE)) }}
      />
    </>
  );
}
