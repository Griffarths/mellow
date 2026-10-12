import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { DoctorPage } from "@/components/doctor/DoctorPage";
import { doctorMetadata } from "@/lib/doctor-seo";

const PAGE_LOCALE = "it";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: PAGE_LOCALE }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== PAGE_LOCALE) return {};
  return doctorMetadata(PAGE_LOCALE);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== PAGE_LOCALE) notFound();
  setRequestLocale(locale);
  return <DoctorPage />;
}
