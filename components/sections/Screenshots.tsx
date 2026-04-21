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

const BASE_FRAMES: Record<Locale, number> = {
  fr: 130,
  en: 142,
  de: 152,
  it: 162,
  es: 172,
  "es-419": 182,
  pt: 192,
  "pt-BR": 202,
};

const FRAME_ORDER = [0, 1, 2, 3, 4, 5, 8, 7, 6];

export function Screenshots() {
  const t = useTranslations("screenshots");
  const locale = useLocale() as Locale;
  const folder = LOCALE_TO_FOLDER[locale] ?? "EN";
  const base = BASE_FRAMES[locale] ?? BASE_FRAMES.en;
  const frames = FRAME_ORDER.map((offset) => base + offset);

  return (
    <section id="screens" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="section-title max-w-2xl text-4xl font-bold md:text-6xl">
          {t("title")}
        </h2>
      </div>

      <div className="mt-12 md:mt-16">
        <div
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pr-6 [scrollbar-width:none] md:gap-8 md:pr-12 [&::-webkit-scrollbar]:hidden"
          style={{
            paddingLeft:
              "max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))",
          }}
        >
          {frames.map((n) => (
            <img
              key={n}
              src={`/screenshot/${folder}/Frame%20${n}.jpg`}
              alt=""
              draggable={false}
              className="aspect-[1320/2868] w-[260px] shrink-0 snap-center select-none md:w-[300px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
