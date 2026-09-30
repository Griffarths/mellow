import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { APP_STORE_RATING, REVIEWS, type Review } from "@/content/reviews";
import { TONES, type Tone } from "@/lib/tones";

const PREVIEW = process.env.NODE_ENV === "development";
const SAMPLE_RATING = { value: 4.8, count: 120 };
const SAMPLE_REVIEWS: Review[] = [1, 2, 3].map((n) => ({
  author: `Pseudo ${n}`,
  rating: 5,
  text: "Exemple d'avis. Remplace-le par un vrai avis App Store dans content/reviews.ts.",
}));
const CARD_TONES: Tone[] = ["fleur", "tagada", "sable"];

function Stars({ rating, label, size }: { rating: number; label: string; size: string }) {
  return (
    <div role="img" aria-label={label} className="flex gap-0.5 text-ink">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`${size} ${i <= Math.round(rating) ? "" : "opacity-20"}`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function SocialProof() {
  const t = useTranslations("socialProof");
  const locale = useLocale() as Locale;
  const ownReviews = REVIEWS[locale] ?? REVIEWS.en ?? REVIEWS.fr ?? [];
  const hasData = APP_STORE_RATING !== null || ownReviews.length > 0;
  if (!hasData && !PREVIEW) return null;

  const isSample = !hasData;
  const rating = isSample ? SAMPLE_RATING : APP_STORE_RATING;
  const reviews = (isSample ? SAMPLE_REVIEWS : ownReviews).slice(0, 3);
  const formatRating = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <section id="reviews" className="py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {isSample && (
          <p className="mb-6 rounded-chip bg-brand-hot-soft px-4 py-3 text-sm font-semibold text-ink">
            Aperçu visible en dev uniquement. Remplis content/reviews.ts pour
            afficher la section en production.
          </p>
        )}
        <h2 className="text-center text-h2 text-ink md:text-left">{t("title")}</h2>

        <div
          className={`mt-10 grid gap-3 md:mt-12 md:grid-cols-2 md:gap-4 ${
            rating ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {rating && (
            <div className="flex flex-col items-center justify-center rounded-card bg-hero p-8 text-center">
              <p className="text-[64px] font-extrabold leading-none tracking-tight text-ink">
                {formatRating.format(rating.value)}
              </p>
              <p className="mt-1 text-sm font-semibold text-ink-2">{t("outOf")}</p>
              <div className="mt-4">
                <Stars
                  rating={rating.value}
                  size="h-5 w-5"
                  label={t("starsLabel", { rating: formatRating.format(rating.value) })}
                />
              </div>
              <p className="mt-3 text-sm text-ink-2">
                {t("count", { count: rating.count })}
              </p>
            </div>
          )}

          {reviews.map((review, i) => (
            <figure
              key={`${review.author}-${i}`}
              className={`flex flex-col rounded-card p-6 md:p-7 ${TONES[CARD_TONES[i % CARD_TONES.length]].tint}`}
            >
              <Stars
                rating={review.rating}
                size="h-4 w-4"
                label={t("starsLabel", { rating: review.rating })}
              />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-body">
                {review.text}
              </blockquote>
              <figcaption className="mt-5 text-sm font-bold text-ink">
                {review.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
