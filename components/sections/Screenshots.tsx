"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";

const LOCALE_TO_FOLDER: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  de: "DE",
  it: "IT",
  es: "ES",
  "es-419": "ES-419",
  pt: "PT",
  "pt-BR": "PT-BR",
};

// App Store screenshots 02 to 10; each already carries its feature headline.
const SHOTS = ["02", "03", "04", "05", "06", "07", "08", "09", "10"] as const;

export function Screenshots() {
  const t = useTranslations("screenshots");
  const locale = useLocale() as Locale;
  const folder = LOCALE_TO_FOLDER[locale] ?? "EN";
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  }

  return (
    <section id="screens" className="py-14 md:py-24">
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-6">
        <h2 className="mx-auto max-w-2xl text-center text-h2 text-ink md:mx-0 md:text-left">
          {t("title")}
        </h2>
        <div className="hidden shrink-0 gap-2 md:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scrollByCard(dir)}
              aria-label={dir === -1 ? t("prev") : t("next")}
              className="grid h-12 w-12 place-items-center rounded-full bg-surface-soft text-ink transition hover:bg-surface-line focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-hot"
            >
              <svg
                viewBox="0 0 16 16"
                className={`h-4 w-4 ${dir === -1 ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 md:mt-12">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-6 pr-6 [scrollbar-width:none] md:gap-6 md:pr-12 [&::-webkit-scrollbar]:hidden"
          style={{
            paddingLeft: "max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))",
            scrollPaddingLeft: "max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))",
          }}
        >
          {SHOTS.map((n) => (
            <img
              key={n}
              src={`/screenshot/${folder}/${n}.jpg`}
              alt={t(`alt.${n}`)}
              width={736}
              height={1600}
              loading="lazy"
              draggable={false}
              className="aspect-[736/1600] w-[240px] shrink-0 snap-start select-none rounded-card md:w-[280px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
