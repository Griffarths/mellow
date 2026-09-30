import { Link } from "@/i18n/navigation";
import type { Rich } from "@/lib/migraine-test";
import { typographize } from "@/lib/typography";

export const LINK_CLASS =
  "font-semibold text-croix-ink underline decoration-croix-ink/30 decoration-2 underline-offset-[3px] transition hover:decoration-croix-ink";

export function RichText({ parts, locale }: { parts: Rich; locale: string }) {
  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <span key={i}>{typographize(p, locale)}</span>
        ) : (
          <Link key={i} href={p.href} className={LINK_CLASS}>
            {typographize(p.text, locale)}
          </Link>
        ),
      )}
    </>
  );
}
