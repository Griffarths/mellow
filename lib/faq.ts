// The FAQ of an article: an H2 section holding at least three H3 questions
// (written by Blog Studio as "## Questions fréquentes" / "### … ?"). Used for
// the FAQPage structured data; the questions stay visible in the article.
export type FaqItem = { question: string; answer: string };

// Markdown → plain text, good enough for a short answer.
function plain(md: string): string {
  return md
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractFaq(content: string): FaqItem[] {
  for (const section of content.split(/^##\s+/m).slice(1)) {
    const parts = section.split(/^###\s+/m).slice(1);
    const items = parts
      .map((p) => {
        const nl = p.indexOf("\n");
        const question = plain(nl < 0 ? p : p.slice(0, nl));
        // The answer stops at the next component or heading.
        const answer = plain((nl < 0 ? "" : p.slice(nl)).split(/^(?:<[A-Z]|#)/m)[0]);
        return { question, answer };
      })
      .filter((x) => /[?？]$/.test(x.question) && x.answer.length > 0);
    if (items.length >= 3) return items;
  }
  return [];
}
