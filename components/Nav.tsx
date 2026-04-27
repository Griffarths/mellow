import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AppStoreButton } from "./AppStoreButton";

export function Nav() {
  const t = useTranslations("nav");
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label={t("homeAriaLabel")}
          className="flex items-center gap-2 text-2xl font-bold tracking-tight"
        >
          <img
            src="/blobs/Fleur1.svg"
            alt=""
            aria-hidden
            className="h-9 w-9 select-none"
            draggable={false}
          />
          <span>Mellow</span>
        </Link>
        <Link
          href="/blog"
          className="text-sm font-medium text-black/70 transition hover:text-black"
        >
          {t("blog")}
        </Link>
        <AppStoreButton sizeClass="h-10 w-auto select-none" />
      </div>
    </header>
  );
}
