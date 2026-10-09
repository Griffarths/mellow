"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { CardArticle } from "@/lib/blog-card";
import { ArticleCard } from "./ArticleCard";

export type BlogTab = { href: string; label: string; active: boolean };

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

// Category tabs (the ones that do not fit go into a "⋮" menu on desktop; on
// mobile the row scrolls), the blog search and the grid of cards.
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
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <Tabs tabs={tabs} />
        <label className="relative block md:w-72 md:shrink-0">
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
      </div>

      {words.length ? (
        <section aria-live="polite" className="mt-8">
          <p className="text-sm font-semibold text-ink-3">
            {t("searchResults", { count: results.length, query: query.trim() })}
          </p>
          {results.length > 0 && (
            <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {results.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          <p className="mt-8 text-sm font-semibold text-ink-3">{count}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {cards.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
          {children}
        </>
      )}
    </div>
  );
}

function Tabs({ tabs }: { tabs: BlogTab[] }) {
  const t = useTranslations("blog");
  const rowRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(tabs.length);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // How many tabs fit in the row, the "⋮" button taking the place of the others.
  useLayoutEffect(() => {
    const row = rowRef.current, measure = measureRef.current;
    if (!row || !measure) return;
    const fit = () => {
      if (!window.matchMedia("(min-width: 768px)").matches) return setVisible(tabs.length);
      const widths = [...measure.children].map((c) => (c as HTMLElement).offsetWidth);
      const gap = 28, more = 40, room = row.clientWidth;
      const total = widths.reduce((s, w) => s + w, 0) + gap * (widths.length - 1);
      if (total <= room) return setVisible(tabs.length);
      let used = more, n = 0;
      while (n < widths.length && used + widths[n] + gap <= room) used += widths[n++] + gap;
      setVisible(Math.max(1, n));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(row);
    return () => ro.disconnect();
  }, [tabs]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const shown = tabs.slice(0, visible), hidden = tabs.slice(visible);
  const tabClass = (active: boolean) =>
    `shrink-0 whitespace-nowrap border-b-2 py-2 text-[17px] transition ${
      active ? "border-ink font-bold text-ink" : "border-transparent font-medium text-ink-2 hover:text-ink"
    }`;

  return (
    <nav aria-label={t("themes")} className="relative min-w-0 flex-1">
      {/* Hidden copy of every tab, to measure them. */}
      <div ref={measureRef} aria-hidden className="pointer-events-none invisible absolute flex h-0 overflow-hidden">
        {tabs.map((tab) => (
          <span key={tab.href} className={tabClass(tab.active)}>
            {tab.label}
          </span>
        ))}
      </div>
      <div
        ref={rowRef}
        className="-mx-6 flex items-center gap-7 overflow-x-auto px-6 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {shown.map((tab) => (
          <Link key={tab.href} href={tab.href} aria-current={tab.active ? "page" : undefined} className={tabClass(tab.active)}>
            {tab.label}
          </Link>
        ))}
        {hidden.length > 0 && (
          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-label={t("moreCategories")}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className={`grid h-10 w-10 place-items-center rounded-full transition hover:bg-surface-soft ${
                hidden.some((h) => h.active) ? "text-ink" : "text-ink-2"
              }`}
            >
              <svg viewBox="0 0 4 18" aria-hidden className="h-4 w-1">
                <circle cx="2" cy="2" r="2" fill="currentColor" />
                <circle cx="2" cy="9" r="2" fill="currentColor" />
                <circle cx="2" cy="16" r="2" fill="currentColor" />
              </svg>
            </button>
            {open && (
              <div className="absolute right-0 top-12 z-20 min-w-56 overflow-hidden rounded-card bg-white py-2 shadow-soft ring-1 ring-surface-line">
                {hidden.map((tab) => (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    aria-current={tab.active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block px-5 py-2.5 text-[15px] transition hover:bg-surface-soft ${
                      tab.active ? "font-bold text-ink" : "font-medium text-ink-2"
                    }`}
                  >
                    {tab.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
