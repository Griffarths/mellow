import { useLocale, useTranslations } from "next-intl";
import { APP_STORE_RATING } from "@/content/reviews";
import type { StoreCampaign } from "@/lib/stores";
import { StoreBadges } from "./StoreBadges";
import { Stars } from "./sections/SocialProof";

type Props = {
  title: string;
  text: string;
  className?: string;
  campaign?: StoreCampaign;
};

// The app like a small App Store listing, between two rules on the white
// page: the app icon, then a title, a text, and under them the badge with the
// rating next to it, all grouped on the left whatever the page's width.
// Mid-article (AppCta) and on the diary pages, in place of the coloured cards.
export function AppRow({ title, text, className = "", campaign = "site" }: Props) {
  const tStars = useTranslations("socialProof");
  const locale = useLocale();
  const rating = APP_STORE_RATING
    ? new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(
        APP_STORE_RATING.value,
      )
    : null;

  return (
    <aside className={`flex gap-4 border-y border-surface-line py-6 md:gap-6 ${className}`}>
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[22%] bg-white ring-1 ring-surface-line">
        <img src="/logo.png" alt="" aria-hidden width={450} height={450} className="h-10 w-10" />
      </span>
      <div className="min-w-0">
        <p className="text-[17px] font-bold leading-snug tracking-tight text-ink md:text-lg">{title}</p>
        <p className="mt-1 text-[15px] leading-relaxed text-ink-2 md:text-base">{text}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
          <StoreBadges align="start" sizeClass="h-10 w-auto select-none" campaign={campaign} />
          {rating && APP_STORE_RATING && (
            <div className="flex items-center gap-2">
              <Stars rating={APP_STORE_RATING.value} label={tStars("starsLabel", { rating })} size="h-4 w-4" />
              <span className="text-sm text-ink-3">{rating}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
