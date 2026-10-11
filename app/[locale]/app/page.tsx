import type { Metadata } from "next";
import { hasLocale, useLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { pageAlternates } from "@/lib/hreflang";
import { APP_STORE_RATING } from "@/content/reviews";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Phone } from "@/components/PhoneFrame";
import { StoreBadges } from "@/components/StoreBadges";
import { FinalCta } from "@/components/sections/FinalCta";
import { Stars } from "@/components/sections/SocialProof";
import { IntensityDemo } from "@/components/app-page/IntensityDemo";
import { Reveal } from "@/components/app-page/Reveal";
import {
  BigCalendar,
  BigStats,
  MellowsCare,
  ReliefBars,
  ReportsList,
  TagCloud,
  WeatherBand,
} from "@/components/app-page/AppVisuals";

type Props = { params: Promise<{ locale: string }> };

// The app in detail, one moment of an attack per section, each laid out its
// own way with the app's elements right on the page: the intensity to play
// with, the tags, the calendar, the analysis, the weather, the Mellows, the
// reports. Then free or Premium, and the data.
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

const KICKER = "text-sm font-semibold uppercase tracking-[0.08em] text-croix-ink";
const H2 = "mt-3 text-balance text-h2 text-ink";
const TEXT = "mt-4 text-[17px] leading-[1.7] text-ink-body md:text-lg";

function PremiumTag({ label }: { label: string }) {
  return (
    <span className="ml-3 inline-block -translate-y-1 rounded-full bg-sable-tint px-3 py-1 align-middle text-xs font-semibold text-[#8A5A1F]">
      {label}
    </span>
  );
}

function Heading({ id, premium }: { id: string; premium?: boolean }) {
  const t = useTranslations("appPage");
  return (
    <>
      <p className={KICKER}>{t(`blocks.${id}.kicker`)}</p>
      <h2 className={H2}>
        {t(`blocks.${id}.title`)}
        {premium && <PremiumTag label={t("premium")} />}
      </h2>
      <p className={TEXT}>{t(`blocks.${id}.text`)}</p>
    </>
  );
}

function Cell({ value }: { value: string }) {
  if (value === "yes")
    return (
      <svg viewBox="0 0 20 20" className="mx-auto h-5 w-5 text-success" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-label="✓">
        <path d="m4 10.5 4 4 8-9" />
      </svg>
    );
  if (value === "no") return <span className="text-ink-mute" aria-label="–">–</span>;
  return <span className="text-sm font-semibold text-ink">{value}</span>;
}

function AppContent() {
  const t = useTranslations("appPage");
  const ui = useTranslations("appPage.ui");
  const tCta = useTranslations("finalCta");
  const tStars = useTranslations("socialProof");
  const tFeatures = useTranslations("features");
  const locale = useLocale();
  const careItems = t.raw("blocks.care.items") as Array<{ title: string; text: string }>;
  const rows = t.raw("plans.rows") as Array<{ label: string; free: string; premium: string }>;
  const rating = APP_STORE_RATING
    ? new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(
        APP_STORE_RATING.value,
      )
    : null;

  return (
    <>
      <Nav />
      {/* Without JavaScript the drawings show as they end up. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: "<style>.app-pop{opacity:1}.app-grow-x{transform:none}</style>",
        }}
      />
      <main className="overflow-x-clip">
        {/* Header: the text and the phone with the app's home screen. */}
        <section>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-12 md:grid-cols-2 md:pb-20 md:pt-16">
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
              <StoreBadges className="mt-4 md:justify-start" sizeClass="h-11 w-auto select-none md:h-12" />
            </div>
            <div className="mx-auto w-[230px] md:w-[270px]">
              <Phone src={`/app-screens/${locale}/home.jpg`} alt={tFeatures("phoneAlt")} />
            </div>
          </div>
        </section>

        {/* 1. Centred: the title, then the three Mellows of the intensity
            scale and the slider to play with. */}
        <section className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
          <Heading id="log" />
          <div className="mt-12">
            <IntensityDemo
              labels={{
                question: ui("recordQuestion"),
                mild: ui("mild"),
                moderate: ui("moderate"),
                intense: ui("intense"),
                hint: t("blocks.log.hint"),
                ranges: [
                  ui("range", { from: 1, to: 3 }),
                  ui("range", { from: 4, to: 6 }),
                  ui("range", { from: 7, to: 10 }),
                ],
              }}
            />
          </div>
        </section>

        {/* 2. Text on the left, the app's tags on the right. */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20 md:py-24">
          <div>
            <Heading id="complete" />
          </div>
          <Reveal>
            <TagCloud />
          </Reveal>
        </section>

        {/* 3. Centred and wide: the calendar. */}
        <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Heading id="calendar" />
          </div>
          <Reveal className="mt-12">
            <BigCalendar />
          </Reveal>
        </section>

        {/* 4. The text and the relief bars, the big figures beside them. */}
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 md:grid-cols-2 md:gap-20 md:py-24">
          <Reveal>
            <Heading id="understand" premium />
            <div className="mt-10">
              <ReliefBars />
            </div>
          </Reveal>
          <Reveal className="md:order-first">
            <BigStats />
          </Reveal>
        </section>

        {/* 5. The text left-aligned, the seven days across the page. */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <Heading id="weather" premium />
          </div>
          <Reveal className="mt-12">
            <p className="mb-4 text-sm font-semibold text-ink-3">{ui("weatherDays")}</p>
            <WeatherBand />
          </Reveal>
        </section>

        {/* 6. Centred: the four Mellows, each with what it brings. */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Heading id="care" />
          </div>
          <Reveal className="mt-14">
            <MellowsCare items={careItems} />
          </Reveal>
        </section>

        {/* 7. The reports on the left, the text on the right. */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:gap-20 md:py-24">
          <div className="md:order-2">
            <Heading id="doctor" premium />
          </div>
          <Reveal className="md:order-1">
            <ReportsList />
          </Reveal>
        </section>

        {/* Free or Premium, as a comparison table. */}
        <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <div className="text-center">
            <h2 className="text-h2 text-ink">{t("plans.title")}</h2>
            <p className="mt-4 text-balance text-lg text-ink-2">{t("plans.subtitle")}</p>
          </div>
          <table className="mt-10 w-full text-left">
            <thead>
              <tr className="border-b border-ink">
                <th className="py-3" />
                <th className="w-24 py-3 text-center font-bold text-ink md:w-32">{t("plans.freeTitle")}</th>
                <th className="w-24 py-3 text-center font-bold text-croix-ink md:w-32">{t("plans.premiumTitle")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-line">
              {rows.map((row) => (
                <tr key={row.label}>
                  <td className="py-3.5 pr-3 text-[16px] leading-snug text-ink-body">{row.label}</td>
                  <td className="py-3.5 text-center">
                    <Cell value={row.free} />
                  </td>
                  <td className="py-3.5 text-center">
                    <Cell value={row.premium} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
