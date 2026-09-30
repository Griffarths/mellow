import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AppStoreButton } from "./AppStoreButton";

export function Nav() {
  const t = useTranslations("nav");
  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-line bg-white/85 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-4 sm:gap-6 md:gap-10">
          <Link
            href="/"
            aria-label={t("homeAriaLabel")}
            className="flex shrink-0 items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl"
          >
            <img
              src="/blobs/Fleur1.svg"
              alt=""
              aria-hidden
              className="h-8 w-8 select-none sm:h-9 sm:w-9"
              draggable={false}
            />
            <span>Mellow</span>
          </Link>
          <Link
            href="/blog"
            className="whitespace-nowrap text-sm font-semibold text-ink-2 transition hover:text-ink"
          >
            {t("blog")}
          </Link>
          <Link
            href="/android"
            className="whitespace-nowrap text-sm font-semibold text-ink-2 transition hover:text-ink"
          >
            {t("androidBeta")}
          </Link>
        </div>
        <AppStoreButton className="hidden shrink-0 sm:inline-block" sizeClass="h-10 w-auto select-none" />
      </div>
    </header>
  );
}
