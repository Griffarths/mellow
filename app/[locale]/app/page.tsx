import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hasLocale, useLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { pageAlternates } from "@/lib/hreflang";
import { APP_STORE_RATING } from "@/content/reviews";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StoreBadges } from "@/components/StoreBadges";
import { Blob } from "@/components/phones/Blob";
import { FinalCta } from "@/components/sections/FinalCta";
import { Stars } from "@/components/sections/SocialProof";
import { IntensityDemo } from "@/components/app-page/IntensityDemo";
import { Reveal } from "@/components/app-page/Reveal";
import {
  CalendarVisual,
  CareVisual,
  CompleteVisual,
  DoctorVisual,
  HeroVisual,
  UnderstandVisual,
  WeatherVisual,
  WidgetVisual,
} from "@/components/app-page/AppVisuals";

type Props = { params: Promise<{ locale: string }> };

// The app in detail: a header with the phone and floating cards, key
// figures, then what the app does at each moment of an attack (drawings that
// come to life on scroll, an intensity picker to play with), what is free or
// Premium, and the data.
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

type Tone = "fleur" | "tagada" | "croix" | "sable";
type BlockId = "log" | "widget" | "complete" | "calendar" | "understand" | "weather" | "care" | "doctor";

const TONE_BG: Record<Tone, string> = {
  fleur: "bg-fleur",
  tagada: "bg-tagada",
  croix: "bg-croix",
  sable: "bg-sable",
};
// Darker shades of the four colours, readable as text on white.
const STAT_COLORS = ["text-[#C2477F]", "text-[#3F6FB0]", "text-croix-ink", "text-[#9A6326]"];

// In the order of an attack, from the first minutes to the appointment.
const BLOCKS: Array<{ id: BlockId; tone: Tone; premium?: boolean }> = [
  { id: "log", tone: "croix" },
  { id: "widget", tone: "fleur" },
  { id: "complete", tone: "tagada" },
  { id: "calendar", tone: "fleur" },
  { id: "understand", tone: "sable", premium: true },
  { id: "weather", tone: "tagada", premium: true },
  { id: "care", tone: "fleur" },
  { id: "doctor", tone: "sable", premium: true },
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

// Line icons for the data section.
const DATA_ICONS: Record<"cloud" | "sold" | "languages", ReactNode> = {
  cloud: (
    <>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      <path d="m9.5 14 2 2 3.5-3.5" />
    </>
  ),
  sold: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </>
  ),
  languages: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z" />
    </>
  ),
};

function AppContent() {
  const t = useTranslations("appPage");
  const ui = useTranslations("appPage.ui");
  const tCta = useTranslations("finalCta");
  const tStars = useTranslations("socialProof");
  const locale = useLocale();
  const stats = t.raw("stats") as Array<{ value: string; label: string }>;
  const free = t.raw("plans.free.items") as string[];
  const premium = t.raw("plans.premium.items") as string[];
  const rating = APP_STORE_RATING
    ? new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(
        APP_STORE_RATING.value,
      )
    : null;

  const visuals: Record<BlockId, ReactNode> = {
    log: (
      <IntensityDemo
        labels={{
          question: ui("recordQuestion"),
          mild: ui("mild"),
          moderate: ui("moderate"),
          intense: ui("intense"),
          save: ui("save"),
        }}
      />
    ),
    widget: <WidgetVisual />,
    complete: <CompleteVisual />,
    calendar: <CalendarVisual />,
    understand: <UnderstandVisual />,
    weather: <WeatherVisual />,
    care: <CareVisual />,
    doctor: <DoctorVisual />,
  };

  return (
    <>
      <Nav />
      {/* Without JavaScript the drawings show as they end up. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: "<style>.app-rise,.app-pop{opacity:1}.app-grow-x{transform:none}</style>",
        }}
      />
      <main className="overflow-x-clip">
        <section className="bg-gradient-to-b from-hero to-white">
          <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 pb-16 pt-12 md:grid-cols-2 md:pb-24 md:pt-16">
            <div className="text-center md:text-left">
              <h1 className="text-h1 text-ink">{t("title")}</h1>
              <p className="mx-auto mt-5 max-w-md text-balance text-lg text-ink-2 md:mx-0">{t("subtitle")}</p>
              {rating && APP_STORE_RATING && (
                <div className="mt-8 flex items-center justify-center gap-3 md:justify-start">
                  <Stars
                    rating={APP_STORE_RATING.value}
                    label={tStars("starsLabel", { rating })}
                    size="h-5 w-5"
                  />
                  <span className="text-ink-2">
                    {tCta("rating", { rating, count: APP_STORE_RATING.count })}
                  </span>
                </div>
              )}
              <StoreBadges
                className="mt-4 md:justify-start"
                sizeClass="h-11 w-auto select-none md:h-12"
              />
            </div>
            <HeroVisual />
          </div>
        </section>

        {/* Key figures, each in one of the Mellows' colours. */}
        <section className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-surface-line">
            {stats.map((s, i) => (
              <div key={s.value} className="px-3 text-center">
                <p className={`text-[32px] font-extrabold leading-none tracking-tight md:text-[40px] ${STAT_COLORS[i]}`}>
                  {s.value}
                </p>
                <p className="mx-auto mt-2 max-w-[16ch] text-sm leading-snug text-ink-2">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* One step per moment, numbered; the drawing alternates sides from
            md and sits on a soft glow of the step's colour. On phones the
            text comes first. */}
        <div className="mx-auto max-w-5xl px-6 pt-12 md:pt-20">
          {BLOCKS.map(({ id, tone, premium: isPremium }, i) => (
            <section key={id} className="grid items-center gap-10 py-12 md:grid-cols-2 md:gap-16 md:py-16">
              <div className={i % 2 ? "md:order-2" : ""}>
                <p className="flex items-center gap-2.5 text-sm font-semibold text-croix-ink">
                  <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold text-ink ${TONE_BG[tone]}`}>
                    {i + 1}
                  </span>
                  {t(`blocks.${id}.kicker`)}
                </p>
                <h2 className="mt-3 text-balance text-h3 text-ink md:text-[30px] md:leading-tight">
                  {t(`blocks.${id}.title`)}
                  {isPremium && <PremiumTag label={t("premium")} />}
                </h2>
                <p className="mt-3 text-[17px] leading-[1.7] text-ink-body">{t(`blocks.${id}.text`)}</p>
              </div>
              <Reveal className={`relative flex justify-center ${i % 2 ? "md:order-1" : ""}`}>
                <span
                  aria-hidden
                  className={`absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl ${TONE_BG[tone]}`}
                />
                <div className="app-rise relative">{visuals[id]}</div>
              </Reveal>
            </section>
          ))}
        </div>

        <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-h2 text-ink">{t("plans.title")}</h2>
            <p className="mt-4 text-balance text-lg text-ink-2">{t("plans.subtitle")}</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-5 md:grid-cols-2">
            {(
              [
                ["free", free, "Fleur1", "ring-1 ring-surface-line"],
                ["premium", premium, "Croix1", "ring-2 ring-croix"],
              ] as const
            ).map(([plan, items, mascot, ring]) => (
              <div key={plan} className={`relative rounded-card bg-white p-6 shadow-soft ${ring}`}>
                <Blob name={mascot} className="absolute -top-5 right-5 h-11 w-11" />
                <p className="text-h3 text-ink">{t(`plans.${plan}.title`)}</p>
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
            {(
              [
                ["cloud", "bg-tagada-tint"],
                ["sold", "bg-fleur-tint"],
                ["languages", "bg-sable-tint"],
              ] as const
            ).map(([id, tint]) => (
              <div key={id} className="py-6 first:pt-0 last:pb-0 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0">
                <span aria-hidden className={`grid h-12 w-12 place-items-center rounded-full text-ink ${tint}`}>
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {DATA_ICONS[id]}
                  </svg>
                </span>
                <h3 className="mt-4 text-h3 text-ink">{t(`data.${id}.title`)}</h3>
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
