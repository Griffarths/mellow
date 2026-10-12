import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { DoctorPage } from "@/components/doctor/DoctorPage";
import { doctorMetadata } from "@/lib/doctor-seo";

// Spain and Latin America share this URL.
const PAGE_LOCALES = ["es", "es-419"] as const;
type PageLocale = (typeof PAGE_LOCALES)[number];
const isPageLocale = (l: string): l is PageLocale => (PAGE_LOCALES as readonly string[]).includes(l);

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return PAGE_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isPageLocale(locale)) return {};
  return doctorMetadata(locale);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isPageLocale(locale)) notFound();
  setRequestLocale(locale);
  return <DoctorPage />;
}
