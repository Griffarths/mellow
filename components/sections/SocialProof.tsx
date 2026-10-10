import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { APP_STORE_RATING, REVIEWS, type Review } from "@/content/reviews";
import { typographize } from "@/lib/typography";

const PREVIEW = process.env.NODE_ENV === "development";
const SAMPLE_RATING = { value: 4.8, count: 120 };
const SAMPLE_REVIEWS: Review[] = [1, 2].map((n) => ({
  author: `Pseudo ${n}`,
  rating: 5,
  title: "Titre de l'avis",
  text: "Exemple d'avis. Remplace-le par un vrai avis App Store dans content/reviews.ts.",
}));

// Fluent Emoji flat star (public/emoji; MIT licence, Copyright (c) Microsoft
// Corporation). Missing stars are greyed out.
export function Stars({ rating, label, size }: { rating: number; label: string; size: string }) {
  return (
    <div role="img" aria-label={label} className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <img
          key={i}
          src="/emoji/star_flat.svg"
          alt=""
          aria-hidden
          width={32}
          height={32}
          draggable={false}
          className={`${size} select-none ${i <= Math.round(rating) ? "" : "opacity-30 grayscale"}`}
        />
      ))}
    </div>
  );
}

export function SocialProof() {
  const t = useTranslations("socialProof");
  const locale = useLocale() as Locale;
  const ownReviews = REVIEWS[locale] ?? [];
  const hasData = APP_STORE_RATING !== null || ownReviews.length > 0;
  if (!hasData && !PREVIEW) return null;

  const isSample = !hasData;
  const rating = isSample ? SAMPLE_RATING : APP_STORE_RATING;
  const reviews = (isSample ? SAMPLE_REVIEWS : ownReviews).slice(0, 3);
  const format = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const hasReviews = reviews.length > 0;

  const summary = rating && (
    <div
      className={`mt-6 flex items-center gap-4 md:mt-8 ${
        hasReviews ? "justify-center md:justify-start" : "justify-center"
      }`}
    >
      <p className="text-[72px] font-extrabold leading-none tracking-tight text-ink md:text-[88px]">
        {format.format(rating.value)}
      </p>
      <div className="text-left">
        <Stars
          rating={rating.value}
          size="h-5 w-5"
          label={t("starsLabel", { rating: format.format(rating.value) })}
        />
        <p className="mt-1.5 text-sm font-semibold text-ink">{t("outOf")}</p>
        <p className="text-sm text-ink-3">{t("count", { count: rating.count })}</p>
      </div>
    </div>
  );

  return (
    <section id="reviews" className="py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {isSample && (
          <p className="mb-8 rounded-chip bg-brand-hot-soft px-4 py-3 text-sm font-semibold text-ink">
            Aperçu visible en dev uniquement. Remplis content/reviews.ts pour
            afficher la section en production.
          </p>
        )}

        {!hasReviews ? (
          <div className="text-center">
            <h2 className="text-h2 text-ink">{t("title")}</h2>
            {summary}
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
            <div className="text-center md:sticky md:top-28 md:self-start md:text-left">
              <h2 className="text-h2 text-ink">{t("title")}</h2>
              {summary}
            </div>

            <div className="divide-y divide-surface-line">
              {reviews.map((review, i) => (
                <figure key={`${review.author}-${i}`} className="py-8 first:pt-0 last:pb-0">
                  <Stars
                    rating={review.rating}
                    size="h-4 w-4"
                    label={t("starsLabel", { rating: review.rating })}
                  />
                  <blockquote className="mt-3">
                    {review.title && (
                      <p className="text-lg font-bold tracking-tight text-ink">
                        {typographize(review.title, locale)}
                      </p>
                    )}
                    <p className="mt-2 whitespace-pre-line text-[17px] leading-[1.7] text-ink-body">
                      {typographize(review.text, locale)}
                    </p>
                  </blockquote>
                  <figcaption className="mt-4 text-sm text-ink-3">
                    <span className="font-semibold text-ink">{review.author}</span>
                    <span aria-hidden> · </span>
                    App Store
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
