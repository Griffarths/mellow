import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Real links to every page, so search engines reach the older articles too.
export function Pagination({ base, page, pages }: { base: string; page: number; pages: number }) {
  const t = useTranslations("blog");
  if (pages <= 1) return null;
  const href = (n: number) => (n === 1 ? base : `${base}/page/${n}`);
  // First, last and the pages around the current one; "…" in the gaps.
  const numbers: (number | "gap")[] = [];
  for (let n = 1; n <= pages; n++) {
    if (n === 1 || n === pages || Math.abs(n - page) <= 1) numbers.push(n);
    else if (numbers.at(-1) !== "gap") numbers.push("gap");
  }
  const step =
    "inline-flex h-10 items-center rounded-chip px-4 text-sm font-semibold text-ink transition hover:bg-surface-soft";
  return (
    <nav aria-label={t("pagination")} className="mt-12 flex flex-wrap items-center justify-center gap-1">
      {page > 1 && (
        <Link href={href(page - 1)} rel="prev" className={step}>
          <span aria-hidden className="mr-1">←</span>
          {t("previous")}
        </Link>
      )}
      {numbers.map((n, i) =>
        n === "gap" ? (
          <span key={`gap-${i}`} aria-hidden className="px-2 text-ink-3">
            …
          </span>
        ) : (
          <Link
            key={n}
            href={href(n)}
            aria-label={t("pageN", { n })}
            aria-current={n === page ? "page" : undefined}
            className={`grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm font-semibold transition ${
              n === page ? "bg-ink text-white" : "text-ink hover:bg-surface-soft"
            }`}
          >
            {n}
          </Link>
        ),
      )}
      {page < pages && (
        <Link href={href(page + 1)} rel="next" className={step}>
          {t("next")}
          <span aria-hidden className="ml-1">→</span>
        </Link>
      )}
    </nav>
  );
}
