import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";

const BADGES: Record<Locale, string> = {
  fr: "Download_on_the_App_Store_Badge_FR_RGB_blk_100517.svg",
  en: "Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg",
  de: "Download_on_the_App_Store_Badge_DE_RGB_blk_092917.svg",
  it: "Download_on_the_App_Store_Badge_IT_RGB_blk_100317.svg",
  es: "Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg",
  "es-419": "Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg",
  pt: "Download_on_the_App_Store_Badge_PTPT_RGB_blk_100317.svg",
  "pt-BR": "Download_on_the_App_Store_Badge_PTBR_RGB_blk_092917.svg",
};

type Props = {
  className?: string;
  sizeClass?: string;
};

export function AppStoreButton({ className = "", sizeClass }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const file = BADGES[locale] ?? BADGES.en;

  return (
    <a
      href="#"
      aria-label={t("appStoreAriaLabel")}
      className={`inline-block transition hover:opacity-85 ${className}`}
    >
      <img
        src={`/app-store/${file}`}
        alt={t("appStoreAriaLabel")}
        className={
          sizeClass ?? "h-14 w-auto select-none md:h-16"
        }
        draggable={false}
      />
    </a>
  );
}
