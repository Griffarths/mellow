import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  return (
    <footer className="border-t border-black/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-sm text-black/50 md:flex-row md:justify-between md:gap-4">
        <div className="flex items-center gap-2">
          <img
            src="/blobs/Fleur1.svg"
            alt=""
            aria-hidden
            className="h-7 w-7 select-none"
            draggable={false}
          />
          <span className="font-semibold text-black/80">Mellow</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <LanguageSwitcher direction="up" />
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {locale === "fr" && (
            <Link href="/a-propos" className="hover:text-black">
              {t("about")}
            </Link>
          )}
          <Link href="/confidentialite" className="hover:text-black">
            {t("privacy")}
          </Link>
          <a
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            {t("terms")}
          </a>
          <Link href="/mentions-legales" className="hover:text-black">
            {t("legal")}
          </Link>
          <Link href="/contact" className="hover:text-black">
            {t("contact")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
