import { useTranslations } from "next-intl";
import { extractHeadings } from "@/lib/blog";

export function TableOfContents({ content }: { content: string }) {
  const t = useTranslations("blog");
  const headings = extractHeadings(content);
  if (headings.length === 0) return null;

  return (
    <nav aria-label={t("tocTitle")} className="sticky top-24">
      <p className="text-sm font-semibold tracking-wide text-black/80">
        {t("tocTitle")}
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        {headings.map((h) => (
          <li
            key={`${h.level}-${h.slug}`}
            className={h.level === 3 ? "pl-4" : ""}
          >
            <a
              href={`#${h.slug}`}
              className="text-black/55 transition hover:text-black"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
