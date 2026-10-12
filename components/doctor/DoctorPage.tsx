import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { APP_STORE_RATING } from "@/content/reviews";
import { DOCTOR_PATH } from "@/lib/doctor";
import { DIARY, isToolLocale } from "@/lib/tools";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StoreBadges } from "@/components/StoreBadges";
import { FinalCta } from "@/components/sections/FinalCta";
import { Stars } from "@/components/sections/SocialProof";
import {
  AnalysisSheet,
  HistorySheet,
  MidasSheet,
  PAPER,
} from "@/components/app-page/AppVisuals";
import { SpreadingHero } from "@/components/doctor/SpreadingHero";
import { LINK_CLASS } from "@/components/tools/RichText";

type Item = { title: string; text: string };

// Fluent emoji (MIT) of the three reports, in the order of the messages:
// the analysis, the history (one attack per line), MIDAS (90 days).
const REPORT_EMOJI = ["magnifying_glass_tilted_left_3d", "clipboard_3d", "spiral_calendar_3d"];

const KICKER = "text-sm font-semibold uppercase tracking-[0.08em] text-croix-ink";
const H2 = "mt-3 text-balance text-h2 text-ink";
const TEXT = "mt-4 text-[17px] leading-[1.7] text-ink-body md:text-lg";

// One sheet of the fan, as on the /app page.
function Sheet({ content }: { content: ReactNode }) {
  return (
    <div className={PAPER}>
      <div>{content}</div>
    </div>
  );
}

// On a phone, the three reports as a still pile, as a computer shows them
// before the animation: the analysis in front, the history and MIDAS behind
// it, peeking out and tilted. Same sizes and places as the fan of
// SpreadingHero, at full size.
function ReportsPile() {
  return (
    <div aria-hidden className="relative h-[390px]">
      <div className="absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2">
        <div className="absolute left-[10px] top-[24px] [transform:translate3d(222px,-5px,0)_rotate(-5deg)]">
          <Sheet content={<HistorySheet />} />
        </div>
        <div className="absolute right-[10px] top-[24px] [transform:translate3d(-222px,-5px,0)_rotate(5deg)]">
          <Sheet content={<MidasSheet />} />
        </div>
        <div className="absolute left-[255px] top-[18px] z-10 scale-[1.08]">
          <Sheet content={<AnalysisSheet />} />
        </div>
      </div>
    </div>
  );
}

// The title of a section, centred, as on the /app page: the kicker, the
// title, then the text if the section has one.
function Heading({ id }: { id: string }) {
  const t = useTranslations("doctorPage");
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className={KICKER}>{t(`${id}.kicker`)}</p>
      <h2 className={H2}>{t(`${id}.title`)}</h2>
      {t.has(`${id}.text`) && <p className={TEXT}>{t(`${id}.text`)}</p>}
    </div>
  );
}

// The page for the visitor's appointment, centred like the /app page: the
// three PDF reports of the app under the title, what doctors look at first,
// what the reports hold, three steps before the appointment, a word for
// health professionals, then the download.
export function DoctorPage() {
  const t = useTranslations("doctorPage");
  const tCta = useTranslations("finalCta");
  const tStars = useTranslations("socialProof");
  const locale = useLocale();
  const look = t.raw("look.items") as Item[];
  const reports = t.raw("reports.items") as Item[];
  const steps = t.raw("steps.items") as Item[];
  const diary = DIARY[isToolLocale(locale) ? locale : "en"].path;
  const rating = APP_STORE_RATING
    ? new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(
        APP_STORE_RATING.value,
      )
    : null;

  return (
    <>
      <Nav />
      <main className="overflow-x-clip">
        {/* Header, centred: the text, then the three reports, which rise
            and spread out as the page scrolls (SpreadingHero). */}
        <SpreadingHero
          text={
            <>
              <h1 className="text-balance text-h1 text-ink">{t("title")}</h1>
              <p className="mx-auto mt-5 max-w-3xl text-balance text-lg text-ink-2">{t("subtitle")}</p>
              {rating && APP_STORE_RATING && (
                <div className="mt-8 flex items-center justify-center gap-3">
                  <Stars rating={APP_STORE_RATING.value} label={tStars("starsLabel", { rating })} size="h-5 w-5" />
                  <span className="text-ink-2">{tCta("rating", { rating, count: APP_STORE_RATING.count })}</span>
                </div>
              )}
              <StoreBadges className="mt-4" sizeClass="h-11 w-auto select-none md:h-12" />
            </>
          }
          phone={<ReportsPile />}
          left={<Sheet content={<HistorySheet />} />}
          front={<Sheet content={<AnalysisSheet />} />}
          right={<Sheet content={<MidasSheet />} />}
        />

        {/* 1. What doctors look at first: one row per marker, its name large
            on the left and its text on the right (stacked on a phone), a
            rule between rows only, like the data on the /app page. */}
        <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <Heading id="look" />
          <div className="mt-12">
            {look.map((item) => (
              <div
                key={item.title}
                className="grid gap-2 border-t border-surface-line py-6 first:border-t-0 first:pt-0 md:grid-cols-2 md:items-baseline md:gap-10 md:py-7"
              >
                <h3 className="text-balance text-h3 text-ink md:text-[26px] md:leading-tight">{item.title}</h3>
                <p className="text-[17px] leading-[1.7] text-ink-body">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. The three reports side by side, centred, each under its
            emoji, like the rest between attacks on the /app page. */}
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <Heading id="reports" />
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {reports.map((item, i) => (
              <div key={item.title} className="text-center">
                <img
                  src={`/emoji/${REPORT_EMOJI[i]}.png`}
                  alt=""
                  aria-hidden
                  width={256}
                  height={256}
                  loading="lazy"
                  draggable={false}
                  className="mx-auto h-16 w-16 select-none md:h-20 md:w-20"
                />
                <h3 className="mt-4 text-xl font-bold text-ink">{item.title}</h3>
                {/* No word left alone on the last line of a centred text. */}
                <p className="mt-2 text-pretty text-[17px] leading-[1.7] text-ink-body">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Three steps before the appointment, one under the other in a
            narrow column, each with its number in large. The first step
            links to the printable diary. */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Heading id="steps" />
          <ol className="mx-auto mt-12 max-w-xl">
            {steps.map((item, i) => (
              <li key={item.title} className="flex gap-5">
                <span aria-hidden className="w-10 shrink-0 text-center text-[56px] font-extrabold leading-none tracking-tight text-croix-ink">
                  {i + 1}
                </span>
                <div className={`pt-3 ${i < steps.length - 1 ? "pb-10" : ""}`}>
                  <h3 className="text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-[17px] leading-[1.7] text-ink-body">
                    {t.rich(`steps.items.${i}.text`, {
                      diary: (chunks) => (
                        <Link href={diary} className={LINK_CLASS}>
                          {chunks}
                        </Link>
                      ),
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 4. For health professionals: a word and the contact page. */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Heading id="pro" />
          <p className="mt-6 text-center text-lg">
            <Link href="/contact" className={LINK_CLASS}>
              {t("pro.cta")}
            </Link>
          </p>
        </section>

        <FinalCta />
      </main>
      <Footer localePaths={DOCTOR_PATH as Partial<Record<Locale, string>>} />
    </>
  );
}
