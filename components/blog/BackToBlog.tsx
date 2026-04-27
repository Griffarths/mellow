import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function BackToBlog() {
  const t = useTranslations("blog");
  return (
    <Link
      href="/blog"
      className="inline-flex items-center gap-1 text-sm text-black/55 transition hover:text-black"
    >
      ← {t("backToBlog")}
    </Link>
  );
}
