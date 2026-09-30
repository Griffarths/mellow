import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function BackToBlog() {
  const t = useTranslations("blog");
  return (
    <Link
      href="/blog"
      className="inline-flex items-center gap-1 rounded-chip bg-surface-soft px-3 py-2 text-sm font-semibold text-ink-2 transition hover:bg-surface-line hover:text-ink"
    >
      ← {t("backToBlog")}
    </Link>
  );
}
