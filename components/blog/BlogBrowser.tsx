"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { CardArticle } from "@/lib/blog-card";
import { ArticleCard } from "./ArticleCard";

export type BlogTab = { href: string; label: string; count: number; active: boolean };

type Props = {
  tabs: BlogTab[];
  // Cards of the current page.
  cards: CardArticle[];
  // Every article of the language, for the search.
  index: CardArticle[];
  count: string;
  // Pagination, hidden while searching.
  children?: ReactNode;
};

const fold = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Desktop: a sidebar with the search and every category (with its number of
// articles), the cards on the right. Mobile: the search, then the categories
// as a row of pills that scrolls.
export function BlogBrowser({ tabs, cards, index, count, children }: Props) {
  const t = useTranslations("blog");
  const [query, setQuery] = useState("");
  const words = fold(query).split(/\s+/).filter(Boolean);
  const results = useMemo(
    () =>
      words.length
        ? index.filter((a) => {
            const text = fold(`${a.title} ${a.description} ${a.category ?? ""}`);
            return words.every((w) => text.includes(w));
          })
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, index],
  );

  return (
    <div className="lg:grid lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-12">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <label className="relative block">
          <span className="sr-only">{t("searchLabel")}</span>
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3"
          >
            <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="m14 14 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-chip bg-surface-soft py-2.5 pl-11 pr-4 text-[15px] text-ink placeholder:text-ink-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          />
        </label>

        <nav aria-label={t("themes")} className="mt-4 lg:mt-8">
          {/* Mobile: pills in a row that scrolls. */}
          <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={tab.active ? "page" : undefined}
                className={`shrink-0 whitespace-nowrap rounded-chip px-4 py-2 text-sm font-semibold transition ${
                  tab.active ? "bg-ink text-white" : "bg-surface-soft text-ink hover:bg-surface-line"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
          {/* Desktop: the list, with the number of articles. */}
          <ul className="hidden space-y-1 lg:block">
            {tabs.map((tab) => (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={tab.active ? "page" : undefined}
                  className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[15px] transition ${
                    tab.active ? "bg-surface-soft font-bold text-ink" : "font-medium text-ink-2 hover:bg-surface-soft hover:text-ink"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-sm tabular-nums ${tab.active ? "text-ink" : "text-ink-3"}`}>{tab.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="mt-8 min-w-0 lg:mt-0">
        {words.length ? (
          <section aria-live="polite">
            <p className="text-sm font-semibold text-ink-3">
              {t("searchResults", { count: results.length, query: query.trim() })}
            </p>
            {results.length > 0 && (
              <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-5">
                {results.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <p className="text-sm font-semibold text-ink-3">{count}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-5">
              {cards.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
            {children}
          </>
        )}
      </div>
    </div>
  );
}
