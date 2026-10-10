"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Blob } from "../phones/Blob";

type MellowKey = "rose" | "bleu" | "rouge" | "jaune";

// Same order as the app's onboarding: the first three follow pain intensity,
// the yellow one comes after, between attacks.
const MELLOWS: Array<{
  key: MellowKey;
  blob: "Fleur1" | "Tagada1" | "Croix1" | "Humeur1";
}> = [
  { key: "rose", blob: "Fleur1" },
  { key: "bleu", blob: "Tagada1" },
  { key: "rouge", blob: "Croix1" },
  { key: "jaune", blob: "Humeur1" },
];

export function MellowsSlider() {
  const t = useTranslations("mellows");
  const [index, setIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * i, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      if (el.clientWidth === 0) return;
      setIndex(Math.round(el.scrollLeft / el.clientWidth));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="py-14 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          {/* The title breaks after its comma: "A gentle app, / not a
              medical record." */}
          <h2 className="text-h2 text-ink">{t.rich("title", { br: () => <br /> })}</h2>
          <p className="mt-4 text-lg text-ink-2">{t("subtitle")}</p>
        </div>

        <div className="mx-auto mt-6 max-w-lg md:mt-10">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {MELLOWS.map((m, i) => {
              const name = t(`${m.key}.name`);
              return (
                <div
                  key={m.key}
                  aria-hidden={i !== index}
                  className="flex w-full shrink-0 snap-center flex-col items-center px-6 py-5 text-center"
                >
                  <Blob
                    name={m.blob}
                    className="w-[110px] md:w-[140px]"
                    alt={name}
                  />
                  <h3 className="mt-5 text-[22px] font-bold leading-tight tracking-tight text-ink md:text-h3">
                    {name}
                  </h3>
                  <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-ink-2 md:text-base">
                    {t(`${m.key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* The four Mellows double as the page indicator, as in the app. */}
          <div className="mt-4 flex items-start justify-center gap-6">
            {MELLOWS.map((m, i) => {
              const active = i === index;
              return (
                <button
                  key={m.key}
                  type="button"
                  aria-label={t("dotAriaLabel", { name: t(`${m.key}.name`) })}
                  aria-current={active}
                  onClick={() => goTo(i)}
                  className="flex flex-col items-center gap-2 rounded-chip p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-hot"
                >
                  <Blob
                    name={m.blob}
                    className={`h-10 w-10 transition-opacity duration-200 ${
                      active ? "opacity-100" : "opacity-40 hover:opacity-70"
                    }`}
                  />
                  <span
                    className={`h-[5px] w-[5px] rounded-full transition-colors ${
                      active ? "bg-ink" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
