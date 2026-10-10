import { useLocale, useTranslations } from "next-intl";
import { StoreBadges } from "../StoreBadges";
import { APP_STORE_RATING } from "@/content/reviews";

// Last call to download: the text and badge on the left, and on computers an
// App Store-like card with a QR code to scan with the iPhone
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
          <h2 className="text-h2 text-ink">{t("title")}</h2>
          <p className="mt-4 text-balance text-lg text-ink-2">{t("subtitle")}</p>
          <StoreBadges className="mt-8 md:justify-start" sizeClass="h-11 w-auto select-none md:h-12" />
        </div>

        <div className="hidden justify-center md:flex">
          <div className="w-[230px] rounded-card bg-white p-5 shadow-soft ring-1 ring-surface-line">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[22%] bg-white ring-1 ring-surface-line">
                <img src="/logo.png" alt="" aria-hidden width={450} height={450} className="h-9 w-9" />
              </span>
              <div>
                <p className="font-bold leading-tight text-ink">Mellow</p>
                {rating && (
                  <p
                    className="text-sm text-ink-3"
                    aria-label={tStars("starsLabel", { rating })}
                  >
                    {rating} <span aria-hidden>★</span>
                  </p>
                )}
              </div>
            </div>
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
