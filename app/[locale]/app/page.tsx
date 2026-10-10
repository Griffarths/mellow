import type { Metadata } from "next";
import type { ComponentType } from "react";
import { hasLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { pageAlternates } from "@/lib/hreflang";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StoreBadges } from "@/components/StoreBadges";
import { FinalCta } from "@/components/sections/FinalCta";
import {
  CalendarVisual,
  CareVisual,
  CompleteVisual,
  DoctorVisual,
  LogVisual,
  UnderstandVisual,
  WeatherVisual,
  WidgetVisual,
} from "@/components/app-page/AppVisuals";

type Props = { params: Promise<{ locale: string }> };

// The app in detail: what it does at each moment of an attack, with
// simplified drawings of its screens, then what is free and what is Premium.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "appPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: pageAlternates(locale, "/app"),
  };
}

export default async function AppPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <AppContent />;
}

type BlockId = "log" | "widget" | "complete" | "calendar" | "understand" | "weather" | "care" | "doctor";

// In the order of an attack, from the first minutes to the appointment.
const BLOCKS: Array<{ id: BlockId; premium?: boolean; Visual: ComponentType }> = [
  { id: "log", Visual: LogVisual },
  { id: "widget", Visual: WidgetVisual },
  { id: "complete", Visual: CompleteVisual },
  { id: "calendar", Visual: CalendarVisual },
  { id: "understand", premium: true, Visual: UnderstandVisual },
  { id: "weather", premium: true, Visual: WeatherVisual },
  { id: "care", Visual: CareVisual },
  { id: "doctor", premium: true, Visual: DoctorVisual },
];

function PremiumTag({ label }: { label: string }) {
  return (
    <span className="ml-2 inline-block rounded-full bg-sable-tint px-2.5 py-0.5 align-middle text-xs font-semibold text-[#8A5A1F]">
      {label}
    </span>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 text-success" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}

function AppContent() {
  const t = useTranslations("appPage");
  const free = t.raw("plans.free.items") as string[];
  const premium = t.raw("plans.premium.items") as string[];

  return (
    <>
      <Nav />
      <main>
        <section className="px-6 pt-14 text-center md:pt-20">
          <h1 className="text-h1 text-ink">{t("title")}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-ink-2">{t("subtitle")}</p>
          <StoreBadges className="mt-8" sizeClass="h-11 w-auto select-none md:h-12" />
        </section>

        {/* One block per moment, the drawing alternating sides from md;
            on phones the text comes first. */}
        <ul className="mx-auto mt-6 max-w-5xl divide-y divide-surface-line px-6 md:mt-10">
          {BLOCKS.map(({ id, premium: isPremium, Visual }, i) => (
            <li
              key={id}
              className="grid items-center gap-10 py-14 md:grid-cols-2 md:gap-16 md:py-20"
            >
              <div className={i % 2 ? "md:order-2" : ""}>
                <p className="text-sm font-semibold text-croix-ink">{t(`blocks.${id}.kicker`)}</p>
                <h2 className="mt-2 text-balance text-h3 text-ink md:text-[30px] md:leading-tight">
                  {t(`blocks.${id}.title`)}
                  {isPremium && <PremiumTag label={t("premium")} />}
                </h2>
                <p className="mt-3 text-[17px] leading-[1.7] text-ink-body">{t(`blocks.${id}.text`)}</p>
              </div>
              <div className={`flex justify-center ${i % 2 ? "md:order-1" : ""}`}>
                <Visual />
              </div>
            </li>
          ))}
        </ul>

        <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-h2 text-ink">{t("plans.title")}</h2>
            <p className="mt-4 text-balance text-lg text-ink-2">{t("plans.subtitle")}</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-2">
            {(
              [
                ["free", free],
                ["premium", premium],
              ] as const
            ).map(([plan, items]) => (
              <div key={plan} className="rounded-card p-6 ring-1 ring-surface-line">
                <p className="text-h3 text-ink">
                  {t(`plans.${plan}.title`)}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[16px] leading-snug text-ink-body">
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-16 md:pb-24">
          <h2 className="text-center text-h2 text-ink">{t("data.title")}</h2>
          <div className="mt-10 grid divide-y divide-surface-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {(["cloud", "sold", "languages"] as const).map((id) => (
              <div key={id} className="py-6 first:pt-0 last:pb-0 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0">
                <h3 className="text-h3 text-ink">{t(`data.${id}.title`)}</h3>
                <p className="mt-2 text-[17px] leading-[1.7] text-ink-body">{t(`data.${id}.text`)}</p>
              </div>
            ))}
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
