"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Blob } from "../phones/Blob";

type MellowKey = "rose" | "bleu" | "rouge";

const MELLOWS: Array<{ key: MellowKey; blob: "Fleur1" | "Tagada1" | "Croix1" }> =
  [
    { key: "rose", blob: "Fleur1" },
    { key: "bleu", blob: "Tagada1" },
    { key: "rouge", blob: "Croix1" },
  ];

const TINTS: Record<MellowKey, string> = {
  rose: "bg-fleur-tint",
  bleu: "bg-tagada-tint",
  rouge: "bg-croix-tint",
};

export function MellowsSlider() {
  const t = useTranslations("mellows");
  const [index, setIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slideWidth = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? el.clientWidth;
    el.scrollTo({ left: slideWidth * i, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const slideWidth =
        (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
      if (slideWidth === 0) return;
      const i = Math.round(el.scrollLeft / slideWidth);
      setIndex(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="pb-14 pt-12 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-ink">{t("title")}</h2>
          <p className="mt-4 text-lg text-ink-2">{t("subtitle")}</p>
        </div>

        <div className="mt-10 md:mt-14">
          {/* Swipeable on mobile, three cards side by side from md. */}
          <div
            ref={scrollerRef}
            className="-mx-6 flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-6 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {MELLOWS.map((m) => {
              const name = t(`${m.key}.name`);
              return (
                <div
                  key={m.key}
                  className="w-full shrink-0 snap-center pr-3 last:pr-0 md:w-auto md:pr-0"
                >
                  <div
                    className={`flex h-full flex-col items-center rounded-card px-6 py-10 text-center ${TINTS[m.key]}`}
                  >
                    <Blob
                      name={m.blob}
                      className="h-32 w-32 md:h-36 md:w-36"
                      alt={name}
                    />
                    <h3 className="mt-6 text-h3 text-ink">{name}</h3>
                    <p className="mt-2 max-w-sm text-base text-ink-2">
                      {t(`${m.key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
            {MELLOWS.map((m, i) => (
              <button
                key={m.key}
                type="button"
                aria-label={t("dotAriaLabel", { name: t(`${m.key}.name`) })}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-ink" : "w-2 bg-ink-mute"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
