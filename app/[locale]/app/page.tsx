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
import { RisingHero } from "@/components/app-page/RisingHero";
import { WeatherChart } from "@/components/app-page/WeatherChart";
import {
  BigCalendar,
  CareGrid,
  CompleteGrid,
  FeelFigures,
  MedsChart,
  ReliefList,
  ReportsFan,
  TriggerList,
} from "@/components/app-page/AppVisuals";

type Props = { params: Promise<{ locale: string }> };

// The app in detail, one moment of an attack per section, each laid out its
// own way with the app's elements right on the page: the intensity to play
// with, the questions, the calendar, the triggers, what the attacks are like,
// what brings relief, the weather, the reports, the rest between attacks.
// Then the data.
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

function Heading({ id }: { id: string }) {
  const t = useTranslations("appPage");
  return (
    <>
      <p className={KICKER}>{t(`blocks.${id}.kicker`)}</p>
      <h2 className={H2}>{t(`blocks.${id}.title`)}</h2>
      <p className={TEXT}>{t(`blocks.${id}.text`)}</p>
    </>
  );
}

// One example week for the weather chart (from Monday 3 August 2026): the
// pressure drops by 6 hPa on Wednesday while the humidity climbs by 19 points,
// the kind of change the app flags before attacks (red), and Thursday moves
// a little less (orange).
const PRESSURE = [1016, 1014, 1008, 1011, 1013, 1014, 1015];
const HUMIDITY = [62, 64, 83, 75, 70, 66, 63];

function AppContent() {
  const t = useTranslations("appPage");
  const ui = useTranslations("appPage.ui");
  const tCta = useTranslations("finalCta");
  const tStars = useTranslations("socialProof");
  const tFeatures = useTranslations("features");
  const locale = useLocale();
  const weekday = new Intl.DateTimeFormat(locale === "pt" ? "pt-PT" : locale, { weekday: "short" });
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    weekday.format(new Date(2026, 7, 3 + i)).replace(".", ""),
  );
  const careItems = t.raw("blocks.care.items") as Array<{ title: string; text: string }>;
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
        {/* Header, centred: the text, then the phone with the app's home
            screen, cut by the bottom of the screen. The header stays in
            place while the phone rises, then the page goes on (RisingHero). */}
        <RisingHero
          text={
            <>
              <h1 className="text-h1 text-ink">{t("title")}</h1>
              <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-ink-2">{t("subtitle")}</p>
              {rating && APP_STORE_RATING && (
                <div className="mt-8 flex items-center justify-center gap-3">
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
              <StoreBadges className="mt-4" sizeClass="h-11 w-auto select-none md:h-12" />
            </>
          }
          phone={
            <Phone
              src={`/app-screens/${locale}/home.jpg`}
              alt={tFeatures("phoneAlt")}
              eager
              shadow="shadow-[0_1px_3px_rgb(0_0_0/0.05),0_18px_36px_-18px_rgb(0_0_0/0.14)]"
            />
          }
          promises={t.raw("promises") as Array<{ title: string; text: string }>}
        />

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

        {/* 2. The title left-aligned on top, then the nine questions of the
            app in a grid across the page (one column on phones). */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <Heading id="complete" />
          </div>
          <Reveal className="mt-12">
            <CompleteGrid />
          </Reveal>
        </section>

        {/* 3. Centred: the calendar, compact enough for the whole section to
            fit on one laptop screen. */}
        <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Heading id="calendar" />
          </div>
          <Reveal className="mt-6">
            <BigCalendar />
          </Reveal>
        </section>

        {/* 4. What triggers the attacks: the text on the left, the app's
            potential triggers on the right. */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:gap-20 md:py-24">
          <div>
            <Heading id="triggers" />
          </div>
          <Reveal>
            <TriggerList />
          </Reveal>
        </section>

        {/* 5. Centred: what the attacks are like, three answers in large,
            each with its little chart from the app. */}
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Heading id="feel" />
          </div>
          <Reveal className="mt-12">
            <FeelFigures />
          </Reveal>
        </section>

        {/* 6. What brings relief: the title on top, then what works or not
            and the medication doses side by side. */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <Heading id="relief" />
          </div>
          <Reveal className="mt-12 grid gap-14 md:grid-cols-2 md:gap-20">
            <ReliefList />
            <MedsChart />
          </Reveal>
        </section>

        {/* 7. The text left-aligned, then the week's curve across the page,
            pressure or humidity, as in the app. */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <Heading id="weather" />
          </div>
          <div className="mt-12">
            <WeatherChart
              title={ui("weatherDays")}
              days={weekdays}
              pressure={{
                label: ui("pressure"),
                values: PRESSURE,
                previous: 1017,
                min: 1002,
                max: 1020,
                color: "#F4BCC4",
                format: "{value} hPa",
                medium: 3,
                strong: 5,
                unit: " hPa",
              }}
              humidity={{
                label: ui("humidity"),
                values: HUMIDITY,
                previous: 60,
                min: 45,
                max: 100,
                color: "#BFD4EE",
                format: ui.raw("points") as string,
                medium: 7,
                strong: 12,
                unit: "%",
              }}
            />
          </div>
        </section>

        {/* 8. Centred: the title, then the three PDF reports of the app
            fanned out below it. */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Heading id="doctor" />
          </div>
          <Reveal className="mt-12">
            <ReportsFan />
          </Reveal>
        </section>

        {/* 9. Centred: four things the app does between attacks, each with
            its emoji. */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Heading id="care" />
          </div>
          <Reveal className="mt-14">
            <CareGrid items={careItems} />
          </Reveal>
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
