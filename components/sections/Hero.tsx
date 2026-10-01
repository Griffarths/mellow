import { useTranslations } from "next-intl";
import { StoreBadges } from "../StoreBadges";
import { Clouds } from "../ui/Clouds";

export function Hero() {
  const t = useTranslations("hero");
  return (
    <section id="download" className="relative overflow-hidden bg-hero">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-12 text-center md:pt-14">
        <h1 className="max-w-[15ch] text-display text-ink">{t("title")}</h1>
        <p className="mt-5 max-w-xl text-lg text-ink-2 md:mt-4 md:max-w-3xl md:text-xl">
          {t("subtitle")}
        </p>
        <StoreBadges className="mt-7" />
        <img
          src="/blobs/Fleur1.svg"
          alt=""
          aria-hidden
          draggable={false}
          className="breathe mt-10 w-[190px] select-none md:mt-8 md:w-[340px]"
        />
      </div>
      {/* Pulled up past the valley (60% of the cloud's height) so the bottom
          third of Fleur sinks into the cloud, as in the app. The cloud's
          height is rarely a whole pixel: it overhangs the section by 1px
          (clipped) so neither Fleur nor the pink shows as a hairline under it. */}
      <Clouds
        maxHeight={240}
        className="relative z-10 -mb-px -mt-[calc(1.1*min(31.55vw,240px))] md:-mt-[calc(1.2*min(31.55vw,240px))]"
      />
    </section>
  );
}
