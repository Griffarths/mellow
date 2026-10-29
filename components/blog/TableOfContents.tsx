import { useLocale, useTranslations } from "next-intl";
import { extractHeadings } from "@/lib/blog";
import { TocBar } from "./TocBar";

export function TableOfContents({ content }: { content: string }) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const headings = extractHeadings(content, locale);
  if (headings.length === 0) return null;

  return <TocBar headings={headings} label={t("tocTitle")} />;
}
