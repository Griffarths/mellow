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

export function MellowsSlider() {
  const t = useTranslations("mellows");
  const [index, setIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slideWidth = el.clientWidth;
    el.scrollTo({ left: slideWidth * i, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const slideWidth = el.clientWidth;
      if (slideWidth === 0) return;
      const i = Math.round(el.scrollLeft / slideWidth);
      setIndex(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title text-4xl font-bold md:text-6xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-black/60 md:text-xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-12">
          <div
            ref={scrollerRef}
            className="-mx-6 flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {MELLOWS.map((m) => {
              const name = t(`${m.key}.name`);
              return (
                <div key={m.key} className="w-full shrink-0 snap-center pr-4">
                  <div className="flex flex-col items-center justify-center px-6 py-10 text-center md:py-12">
                    <Blob
                      name={m.blob}
                      className="h-32 w-32 md:h-40 md:w-40"
                      alt={name}
                    />
                    <h3 className="mt-6 text-2xl font-bold tracking-tight md:text-3xl">
                      {name}
                    </h3>
                    <p className="mt-3 max-w-md text-base text-black/60">
                      {t(`${m.key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {MELLOWS.map((m, i) => (
              <button
                key={m.key}
                type="button"
                aria-label={t("dotAriaLabel", { name: t(`${m.key}.name`) })}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-ink" : "w-2 bg-black/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
