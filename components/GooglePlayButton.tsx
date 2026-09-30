import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { PLAY_STORE_URL } from "@/lib/stores";

type Props = {
  className?: string;
  sizeClass?: string;
};

// Official badges from play.google.com/intl/en_us/badges, one per locale.
export function GooglePlayButton({ className = "", sizeClass }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  if (!PLAY_STORE_URL) return null;

  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("googlePlayAriaLabel")}
      className={`inline-block transition hover:opacity-85 ${className}`}
    >
      <img
        src={`/google-play/${locale}.png`}
        alt={t("googlePlayAriaLabel")}
        width={646}
        height={192}
        className={sizeClass ?? "h-14 w-auto select-none md:h-16"}
        draggable={false}
      />
    </a>
  );
}
