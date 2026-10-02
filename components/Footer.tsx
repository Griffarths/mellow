import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { PLAY_STORE_URL } from "@/lib/stores";
import { TOOLS_LABEL, isToolLocale, toolsMenu } from "@/lib/tools";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Props = {
  // This page's path in each language, when it differs (see LanguageSwitcher).
  localePaths?: Partial<Record<Locale, string>>;
};

const LINK = "transition hover:text-ink";

// The About page exists in French and English only.
const ABOUT_PATH: Partial<Record<string, string>> = { fr: "/a-propos", en: "/about" };

// Brand on the left, then three columns of links (resources, Mellow, legal);
// copyright and language at the bottom.
export function Footer({ localePaths }: Props = {}) {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const hero = useTranslations("hero");
  const locale = useLocale();
  const about = ABOUT_PATH[locale];

  return (
    <footer className="border-t border-surface-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-12 md:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))] md:gap-8 md:pt-14">
        <div>
          <Link href="/" className="inline-flex items-center gap-2">
            <img
              src="/blobs/Fleur1.svg"
              alt=""
              aria-hidden
              className="h-8 w-8 select-none"
              draggable={false}
            />
            <span className="text-lg font-extrabold tracking-tight text-ink">Mellow</span>
          </Link>
          <p className="mt-3 max-w-[26ch] text-[15px] leading-relaxed text-ink-2">{hero("title")}</p>
        </div>

        {/* Two columns on phones (resources and Mellow side by side, legal
            below), three from md. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:col-span-3 md:grid-cols-3 md:gap-8">
          {isToolLocale(locale) && (
            <Column title={TOOLS_LABEL[locale]}>
              {toolsMenu(locale).map((tool) => (
                <Link key={tool.path} href={tool.path} className={LINK}>
                  {tool.navLabel}
                </Link>
              ))}
            </Column>
          )}
          <Column title="Mellow">
            <Link href="/blog" className={LINK}>
              {nav("blog")}
            </Link>
            {about && (
              <Link href={about} className={LINK}>
                {t("about")}
              </Link>
            )}
            {PLAY_STORE_URL ? (
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
                {nav("android")}
              </a>
            ) : (
              <Link href="/android" className={LINK}>
                {nav("androidBeta")}
              </Link>
            )}
            <Link href="/editorial" className={LINK}>
              {t("editorial")}
            </Link>
            <Link href="/contact" className={LINK}>
              {t("contact")}
            </Link>
          </Column>
          <Column title={t("legalTitle")}>
            <Link href="/confidentialite" className={LINK}>
              {t("privacy")}
            </Link>
            <a
              href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              target="_blank"
              rel="noopener noreferrer"
              className={LINK}
            >
              {t("terms")}
            </a>
            <Link href="/mentions-legales" className={LINK}>
              {t("legal")}
            </Link>
            <Link href="/account-deletion" className={LINK}>
              {t("accountDeletion")}
            </Link>
          </Column>
        </div>
      </div>

      <div className="border-t border-surface-line">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-3 px-6 py-5 text-sm text-ink-3 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Mellow</span>
          {/* Pulled by its own padding so the label lines up with the edge. */}
          <div className="md:-mr-3">
            <LanguageSwitcher direction="up" paths={localePaths} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-sm font-bold text-ink">{title}</p>
      <nav aria-label={title} className="mt-4 flex flex-col items-start gap-3 text-sm leading-snug text-ink-3">
        {children}
      </nav>
    </div>
  );
}
