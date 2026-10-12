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
import { ReportsFan } from "@/components/app-page/AppVisuals";
import { LINK_CLASS } from "@/components/tools/RichText";

type Item = { title: string; text: string };

const KICKER = "text-sm font-semibold uppercase tracking-[0.08em] text-croix-ink";
const H2 = "mt-3 text-balance text-h2 text-ink";
const TEXT = "mt-4 text-[17px] leading-[1.7] text-ink-body md:text-lg";

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
        {/* Header, centred: the text, then the three reports fanned out. */}
        <section className="mx-auto max-w-6xl px-6 pb-8 pt-12 md:pb-12 md:pt-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-h1 text-ink">{t("title")}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-ink-2">{t("subtitle")}</p>
            {rating && APP_STORE_RATING && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <Stars rating={APP_STORE_RATING.value} label={tStars("starsLabel", { rating })} size="h-5 w-5" />
                <span className="text-ink-2">{tCta("rating", { rating, count: APP_STORE_RATING.count })}</span>
              </div>
            )}
            <StoreBadges className="mt-4" sizeClass="h-11 w-auto select-none md:h-12" />
          </div>
          <div className="mt-12 md:mt-16">
            <ReportsFan />
          </div>
        </section>

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

        {/* 2. The three reports side by side, a rule between them on
            computers. */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Heading id="reports" />
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
            {reports.map((item) => (
              <div key={item.title} className="md:border-l md:border-surface-line md:px-10 md:first:border-l-0 md:first:pl-0 md:last:pr-0">
                <h3 className="text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-[17px] leading-[1.7] text-ink-body">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Three steps before the appointment, numbered. The first one
            links to the printable diary. */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Heading id="steps" />
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
            {steps.map((item, i) => (
              <li key={item.title}>
                <span aria-hidden className="block text-5xl font-extrabold leading-none text-croix">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-[17px] leading-[1.7] text-ink-body">
                  {t.rich(`steps.items.${i}.text`, {
                    diary: (chunks) => (
                      <Link href={diary} className={LINK_CLASS}>
                        {chunks}
                      </Link>
                    ),
                  })}
                </p>
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
