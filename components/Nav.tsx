import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/stores";
import { DOCTOR_PATH } from "@/lib/doctor";
import { typographize } from "@/lib/typography";
import { TOOLS_LABEL, isToolLocale, toolsMenu } from "@/lib/tools";
import { MobileMenu } from "./MobileMenu";
import { NavShell } from "./NavShell";
import { ToolsMenu } from "./ToolsMenu";
import { StoreBadges } from "./StoreBadges";

// Black, pink on hover. nav-on-hero: white while the nav is transparent over
// the pink hero (globals.css).
const LINK_CLASS =
  "nav-on-hero whitespace-nowrap text-sm font-semibold text-ink transition hover:text-croix-ink";

// From md: logo, then the menu (the app, for your doctor, the free tools,
// the blog) and on the right a small Android link beside the store badge. Below:
// logo, a download button and a burger (MobileMenu). On the home page
// (overHero) it starts transparent over the hero (NavShell), without the
// download badge or button (nav-cta, globals.css): the hero has its own.
export function Nav({ overHero = false }: { overHero?: boolean } = {}) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const resources = isToolLocale(locale)
    ? toolsMenu(locale).map((tool) => ({
        href: tool.path,
        label: tool.navLabel,
        // French: a non-breaking space before "?".
        description: typographize(tool.menuDescription, locale),
      }))
    : [];
  const doctor = DOCTOR_PATH[locale] ?? DOCTOR_PATH.en;
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
            <span className="nav-on-hero transition-colors">Mellow</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            <Link href="/app" className={LINK_CLASS}>
              {t("app")}
            </Link>
            <Link href={doctor} className={LINK_CLASS}>
              {t("doctor")}
            </Link>
            {isToolLocale(locale) && (
              <ToolsMenu label={TOOLS_LABEL[locale]} items={resources} />
            )}
            <Link href="/blog" className={LINK_CLASS}>
              {t("blog")}
            </Link>
          </div>
        </div>
        {/* Android, small, beside the badge; both hidden over the home hero
            until the nav turns white (nav-cta). */}
        <div className="nav-cta hidden shrink-0 items-center gap-4 md:flex">
          {android.external ? (
            <a href={android.href} target="_blank" rel="noopener noreferrer" className="hidden whitespace-nowrap text-xs font-semibold text-ink-3 transition hover:text-ink lg:block">
              {android.label}
            </a>
          ) : (
            <Link href={android.href} className="hidden whitespace-nowrap text-xs font-semibold text-ink-3 transition hover:text-ink lg:block">
              {android.label}
            </Link>
          )}
          <StoreBadges className="shrink-0 flex-nowrap gap-2" sizeClass="h-10 w-auto select-none" />
        </div>
        <MobileMenu
          top={[
            { href: "/app", label: t("app") },
            { href: doctor, label: t("doctor") },
          ]}
          resourcesTitle={isToolLocale(locale) ? TOOLS_LABEL[locale] : ""}
          resources={resources}
          links={[{ href: "/blog", label: t("blog") }]}
          android={android}
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
