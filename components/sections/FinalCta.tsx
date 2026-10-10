import { useLocale, useTranslations } from "next-intl";
import { StoreBadges } from "../StoreBadges";
import { Blob } from "../phones/Blob";
import { APP_STORE_RATING } from "@/content/reviews";
import { Stars } from "./SocialProof";

// Last call to download: the mascot, text, App Store rating and badge on the
// left, and on computers a card with the app icon and a QR code to scan with
// the iPhone
// (public/qr-app-store.svg, generated with macOS CoreImage, points to the
// App Store page). Phones only get the badge: they cannot scan themselves.
export function FinalCta() {
  const t = useTranslations("finalCta");
  const tStars = useTranslations("socialProof");
  const locale = useLocale();
  const rating = APP_STORE_RATING
    ? new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(
        APP_STORE_RATING.value,
      )
    : null;

  return (
    <section className="bg-hero">
      <div className="mx-auto grid max-w-4xl items-center gap-12 px-6 py-20 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:py-24">
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start">
            <Blob name="Fleur1" className="h-20 w-20 md:h-24 md:w-24" />
          </div>
          <h2 className="mt-6 text-h2 text-ink">{t("title")}</h2>
          <p className="mt-4 text-balance text-lg text-ink-2">{t("subtitle")}</p>
          {rating && APP_STORE_RATING && (
            <div className="mt-8 flex items-center justify-center gap-3 md:justify-start">
              <Stars
                rating={APP_STORE_RATING.value}
                label={tStars("starsLabel", { rating })}
                size="h-5 w-5"
              />
              <span className="text-ink-2">
                {t("rating", { rating, count: APP_STORE_RATING.count })}
              </span>
            </div>
          )}
          <StoreBadges
            className={`${rating ? "mt-4" : "mt-8"} md:justify-start`}
            sizeClass="h-11 w-auto select-none md:h-12"
          />
        </div>

        <div className="hidden justify-center md:flex">
          <div className="w-[230px] rounded-card bg-white p-5 shadow-soft ring-1 ring-surface-line">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-[22%] bg-white ring-1 ring-surface-line">
              <img src="/logo.png" alt="" aria-hidden width={450} height={450} className="h-10 w-10" />
            </span>
            <img
              src="/qr-app-store.svg"
              alt={t("qrAlt")}
              width={31}
              height={31}
              className="mx-auto mt-4 h-40 w-40"
            />
            <p className="mt-2 text-center text-sm text-ink-2">{t("scan")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
