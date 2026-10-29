"use client";

import { useEffect, useRef, useState } from "react";
import type { TocHeading } from "@/lib/blog";

// Every article ends with these two parts, in its language: they go under the
// reading path, apart from the article's own parts.
const END_PARTS = new Set([
  "questions fréquentes",
  "frequently asked questions",
  "häufige fragen",
  "domande frequenti",
  "preguntas frecuentes",
  "perguntas frequentes",
  "sources",
  "quellen",
  "fonti",
  "fuentes",
  "fontes",
]);

// The article's table of contents as a thin bar under the site's menu, there
// while the article is read: the part being read, and along its bottom edge
// how far the reading has got. A click opens the article's parts as a reading
// path (read, being read, to come), with the sub-parts of the current one
// under it. It leaves the right side of the page to the QR code widget, and
// works on phones too.
export function TocBar({ headings, label }: { headings: TocHeading[]; label: string }) {
  const [open, setOpen] = useState(false);
  // Index of the heading being read (-1 before the first one).
  const [current, setCurrent] = useState(-1);
  const [progress, setProgress] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const article = document.querySelector("article");
    const targets = headings.map((h) => document.getElementById(h.slug));
    let frame = 0;
    const update = () => {
      frame = 0;
      // A heading is being read once it is in the top third of the screen
      // (and at least under the menu and this bar).
      const line = Math.max(160, window.innerHeight * 0.33);
      let index = -1;
      targets.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) index = i;
      });
      setCurrent(index);
      if (article) {
        const box = article.getBoundingClientRect();
        const total = box.height - window.innerHeight;
        setProgress(total > 0 ? Math.min(1, Math.max(0, -box.top / total)) : 1);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [headings]);

  useEffect(() => {
    if (!open) return;
    const outside = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  // The part (h2) the heading being read belongs to.
  let part = current;
  while (part > 0 && headings[part].level === 3) part--;

  const indexed = headings.map((h, i) => ({ h, i }));
  const isEnd = (h: TocHeading) => h.level === 2 && END_PARTS.has(h.text.toLowerCase());
  const parts = indexed.filter(({ h }) => h.level === 2 && !isEnd(h));
  const ends = indexed.filter(({ h }) => isEnd(h));
  // The sub-parts (h3) of the part at index i.
  const subParts = (i: number) => {
    const subs: { h: TocHeading; i: number }[] = [];
    for (let j = i + 1; j < headings.length && headings[j].level === 3; j++) subs.push({ h: headings[j], i: j });
    return subs;
  };
  const close = () => setOpen(false);

  return (
    <div ref={root} className="sticky top-16 z-30 border-b border-surface-line bg-white">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-3 px-6">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-ink transition hover:text-ink-2"
        >
          {label}
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {part >= 0 && (
          <>
            <span aria-hidden className="text-ink-3">
              ·
            </span>
            <span className="min-w-0 truncate text-sm text-ink-2">{headings[part].text}</span>
          </>
        )}
      </div>
      <div aria-hidden className="absolute inset-x-0 -bottom-px h-0.5">
        <div className="h-full origin-left bg-brand-hot" style={{ transform: `scaleX(${progress})` }} />
      </div>
      {open && (
        <div className="absolute inset-x-0 top-full">
          <div className="mx-auto max-w-6xl px-6">
            <nav
              aria-label={label}
              className="toc-scroll mt-2 max-h-[calc(100vh-9rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-2 shadow-[0_16px_32px_-12px_rgb(0_0_0/0.18)] ring-1 ring-surface-line"
            >
              <ol className="text-sm">
                {parts.map(({ h, i }, n) => {
                  const state = part < 0 || i > part ? "next" : i === part ? "current" : "read";
                  const subs = state === "current" ? subParts(i) : [];
                  return (
                    <li key={h.slug} className="relative pl-7">
                      {/* The path, from this dot to the next: pale pink once
                          read. Each dot sits on a white disc, so the line
                          stops short of it instead of running through. */}
                      {n < parts.length - 1 && (
                        <span
                          aria-hidden
                          className={`absolute -bottom-[18px] left-[15.5px] top-[18px] w-px ${state === "read" ? "bg-brand" : "bg-surface-line"}`}
                        />
                      )}
                      <span
                        aria-hidden
                        className="absolute left-[7px] top-[9px] z-10 grid h-[18px] w-[18px] place-items-center rounded-full bg-white"
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            state === "current"
                              ? "bg-brand-hot ring-4 ring-brand-hot-soft"
                              : state === "read"
                                ? "bg-brand"
                                : "border-[1.5px] border-ink-3/50 bg-white"
                          }`}
                        />
                      </span>
                      <a
                        href={`#${h.slug}`}
                        onClick={close}
                        aria-current={i === part ? "location" : undefined}
                        className={`block rounded-xl px-3 py-2 leading-snug transition hover:bg-surface-soft ${
                          state === "current" ? "font-semibold text-ink" : state === "read" ? "text-ink-3" : "text-ink-2"
                        }`}
                      >
                        {h.text}
                      </a>
                      {subs.length > 0 && (
                        <ul className="mb-1">
                          {subs.map((s) => (
                            <li key={s.h.slug}>
                              <a
                                href={`#${s.h.slug}`}
                                onClick={close}
                                className={`block rounded-lg px-3 py-1.5 text-[13px] leading-snug transition hover:bg-surface-soft ${
                                  s.i === current ? "text-ink" : "text-ink-3"
                                }`}
                              >
                                {s.h.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ol>
              {ends.length > 0 && (
                <div className="mx-3 mt-2 flex flex-wrap gap-x-5 gap-y-1 border-t border-surface-line pb-1 pt-3 text-[13px]">
                  {ends.map(({ h, i }) => (
                    <a
                      key={h.slug}
                      href={`#${h.slug}`}
                      onClick={close}
                      className={`transition hover:text-ink ${i === part ? "font-semibold text-ink" : "text-ink-3"}`}
                    >
                      {h.text}
                    </a>
                  ))}
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
