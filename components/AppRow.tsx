import { useLocale, useTranslations } from "next-intl";
import { APP_STORE_RATING } from "@/content/reviews";
import { StoreBadges } from "./StoreBadges";
import { Stars } from "./sections/SocialProof";

type Props = {
  title: string;
  text: string;
  className?: string;
};

// The app in one line, like its App Store listing, between two rules on the
// white page: the app icon, a title and a text, the rating, the badge on the
// right (under the text on a phone). Mid-article (AppCta) and on the diary
// pages, in place of the coloured cards.
export function AppRow({ title, text, className = "" }: Props) {
  const tStars = useTranslations("socialProof");
  const locale = useLocale();
  const rating = APP_STORE_RATING
    ? new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(
        APP_STORE_RATING.value,
      )
    : null;

  return (
    <aside
      className={`grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-4 border-y border-surface-line py-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-6 ${className}`}
    >
      <span className="grid h-14 w-14 place-items-center self-start rounded-[22%] bg-white ring-1 ring-surface-line md:self-center">
        <img src="/logo.png" alt="" aria-hidden width={450} height={450} className="h-10 w-10" />
      </span>
      <div className="min-w-0">
        <p className="text-[17px] font-bold leading-snug tracking-tight text-ink md:text-lg">{title}</p>
        <p className="mt-1 text-[15px] leading-relaxed text-ink-2 md:text-base">{text}</p>
        {rating && APP_STORE_RATING && (
          <div className="mt-2 flex items-center gap-2">
            <Stars rating={APP_STORE_RATING.value} label={tStars("starsLabel", { rating })} size="h-4 w-4" />
            <span className="text-sm text-ink-3">{rating}</span>
          </div>
        )}
      </div>
      <StoreBadges align="start" className="col-start-2 md:col-start-auto" sizeClass="h-10 w-auto select-none" />
    </aside>
  );
}
