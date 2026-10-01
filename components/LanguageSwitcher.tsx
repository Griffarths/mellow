"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/routing";

type Props = {
  direction?: "down" | "up";
  // This page's path in each language, for pages whose URL changes with the
  // language (tools, articles, About). A language missing from the map has
  // no version of the page. Without a map, the path stays the same.
  paths?: Partial<Record<Locale, string>>;
};

// Where to go when the page doesn't exist in the chosen language: the blog
// index for blog pages, the home page otherwise.
function fallbackPath(pathname: string) {
  return pathname.startsWith("/blog") ? "/blog" : "/";
}

export function LanguageSwitcher({ direction = "down", paths }: Props = {}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      const target = paths ? (paths[next] ?? fallbackPath(pathname)) : pathname;
      router.replace(target, { locale: next });
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 rounded-chip px-3 py-2 text-sm font-semibold text-ink-2 transition hover:bg-surface-soft disabled:opacity-60"
      >
        <span>{LOCALE_LABELS[locale]}</span>
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path
            d="m6 9 6 6 6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute left-1/2 z-50 min-w-[220px] -translate-x-1/2 overflow-hidden rounded-card bg-white p-1.5 shadow-soft ring-1 ring-surface-line ${
            direction === "up" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {LOCALES.map((code) => {
            const active = locale === code;
            return (
              <li key={code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => switchTo(code)}
                  className={`flex w-full items-center justify-between gap-3 rounded-btn px-3 py-2.5 text-left text-sm transition ${
                    active
                      ? "bg-surface-soft font-semibold text-ink"
                      : "text-ink-2 hover:bg-surface-soft"
                  }`}
                >
                  <span>{LOCALE_LABELS[code]}</span>
                  {active && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden
                    >
                      <path
                        d="m5 12 5 5L20 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
