import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AUTHOR, aboutPath } from "@/lib/author";

// Who writes the blog, in one line at the end of each article, with a link to
// the About page and to the editorial method.
export function AuthorBox() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const about = aboutPath(locale);
  const link =
    "font-semibold text-croix-ink underline decoration-croix-ink/30 decoration-2 underline-offset-[3px] transition hover:decoration-croix-ink";
  return (
    <p className="mt-12 text-[15px] leading-relaxed text-ink-2">
      {t.rich("authorLine", {
        name: AUTHOR.name,
        b: (chunks) => <strong className="font-semibold text-ink">{chunks}</strong>,
      })}{" "}
      {about.external ? (
        <a href={about.href} className={link}>{t("authorMore")}</a>
      ) : (
        <Link href={about.href} className={link}>{t("authorMore")}</Link>
      )}
      {" · "}
      <Link href="/editorial" className={link}>{t("editorialLink")}</Link>
    </p>
  );
}
