import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/stores";
import { isToolLocale } from "@/lib/tools";
import { TOOLS_LABEL, toolsMenu } from "@/lib/tools";
import { MobileMenu } from "./MobileMenu";
import { NavShell } from "./NavShell";
import { ToolsMenu } from "./ToolsMenu";
import { StoreBadges } from "./StoreBadges";

// Grey links, black while the nav is transparent over the pink hero.
export const NAV_LINK_CLASS =
  "whitespace-nowrap text-sm font-semibold text-ink-2 transition hover:text-ink group-data-[solid=false]/nav:text-ink";
const LINK_CLASS = NAV_LINK_CLASS;

// From md: logo, Resources menu, Blog, Android and the store badges. Below:
// logo, a download button and a burger (MobileMenu). On the home page
// (overHero) it starts transparent over the hero (NavShell).
export function Nav({ overHero = false }: { overHero?: boolean } = {}) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const resources = isToolLocale(locale)
    ? toolsMenu(locale).map((tool) => ({
        href: tool.path,
        label: tool.navLabel,
        description: tool.menuDescription,
      }))
    : [];
  const android = PLAY_STORE_URL
    ? { href: PLAY_STORE_URL, label: t("android"), external: true }
    : { href: "/android", label: t("androidBeta"), external: false };

  return (
    <NavShell overHero={overHero}>
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-10">
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
          <div className="hidden items-center gap-10 md:flex">
            {isToolLocale(locale) && <ToolsMenu label={TOOLS_LABEL[locale]} items={resources} />}
            <Link href="/blog" className={LINK_CLASS}>
              {t("blog")}
            </Link>
            {android.external ? (
              <a href={android.href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                {android.label}
              </a>
            ) : (
              <Link href={android.href} className={LINK_CLASS}>
                {android.label}
              </Link>
            )}
          </div>
        </div>
        <StoreBadges
          className="hidden shrink-0 flex-nowrap gap-2 md:flex"
          sizeClass="h-10 w-auto select-none"
        />
        <MobileMenu
          resourcesTitle={isToolLocale(locale) ? TOOLS_LABEL[locale] : ""}
          resources={resources}
          links={[{ href: "/blog", label: t("blog") }, android]}
          download={{
            label: t("download"),
            appStoreUrl: APP_STORE_URL,
            androidHref: android.href,
            androidExternal: android.external,
          }}
          openLabel={t("menuOpen")}
          closeLabel={t("menuClose")}
          badges={<StoreBadges align="start" sizeClass="h-11 w-auto select-none" />}
        />
      </div>
    </NavShell>
  );
}
