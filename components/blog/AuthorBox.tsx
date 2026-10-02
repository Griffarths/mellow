import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AUTHOR, aboutPath } from "@/lib/author";

// Who writes the blog, at the end of each article, with a link to the About
// page and to the editorial method.
export function AuthorBox() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const about = aboutPath(locale);
  const link =
    "font-semibold text-croix-ink underline decoration-croix-ink/30 decoration-2 underline-offset-[3px] transition hover:decoration-croix-ink";
  return (
    <aside
      aria-label={t("authorTitle")}
      className="mt-14 flex items-start gap-4 rounded-card bg-surface-soft p-5 md:p-6"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-fleur-tint">
        <img src={AUTHOR.mascot} alt="" aria-hidden draggable={false} className="h-9 w-9 select-none" />
      </span>
      <div className="min-w-0">
        <p className="text-caption font-bold uppercase tracking-[0.08em] text-ink-3">{t("authorTitle")}</p>
        <p className="mt-1 text-lg font-bold leading-snug text-ink">{AUTHOR.name}</p>
        <p className="text-sm font-semibold text-ink-3">{t("authorRole")}</p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{t("authorBio")}</p>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {about.external ? (
            <a href={about.href} className={link}>{t("authorMore")}</a>
          ) : (
            <Link href={about.href} className={link}>{t("authorMore")}</Link>
          )}
          <Link href="/editorial" className={link}>{t("editorialLink")}</Link>
        </p>
      </div>
    </aside>
  );
}
