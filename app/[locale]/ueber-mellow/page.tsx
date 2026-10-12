import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { AboutPage, aboutMetadata } from "@/components/about/AboutPage";

const PAGE_LOCALE = "de";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: PAGE_LOCALE }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== PAGE_LOCALE) return {};
  return aboutMetadata(PAGE_LOCALE);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== PAGE_LOCALE) notFound();
  setRequestLocale(locale);
  return <AboutPage locale={PAGE_LOCALE} />;
}
