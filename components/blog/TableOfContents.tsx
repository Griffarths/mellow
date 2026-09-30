import { useTranslations } from "next-intl";
import { extractHeadings } from "@/lib/blog";

export function TableOfContents({ content }: { content: string }) {
  const t = useTranslations("blog");
  const headings = extractHeadings(content);
  if (headings.length === 0) return null;

  return (
    <nav aria-label={t("tocTitle")} className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
      <p className="text-caption font-bold uppercase tracking-[0.08em] text-ink-3">
        {t("tocTitle")}
      </p>
      <ul className="mt-4 space-y-2.5 border-l border-surface-line pl-4 text-sm">
        {headings.map((h) => (
          <li
            key={`${h.level}-${h.slug}`}
            className={h.level === 3 ? "pl-4" : ""}
          >
            <a
              href={`#${h.slug}`}
              className="block leading-snug text-ink-2 transition hover:text-ink"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
