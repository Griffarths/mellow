import { useTranslations } from "next-intl";
import { StoreBadges } from "../StoreBadges";

// Pink hero filling the screen behind the transparent nav, content centred
// under it, clouds drifting along the bottom. Height, background and
// clouds: .home-hero and .hero-clouds in globals.css.
export function Hero() {
  const t = useTranslations("hero");
  return (
    <section
      id="download"
      className="home-hero relative flex flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div className="relative z-[3] flex w-full max-w-6xl flex-col items-center">
        <img
          src="/blobs/Fleur1.svg"
          alt=""
          aria-hidden
          draggable={false}
          width={462}
          height={500}
          className="mb-[clamp(14px,1.8vw,24px)] h-auto w-[clamp(72px,7.5vw,112px)] select-none"
        />
        <h1 className="max-w-[15ch] text-display text-white">{t("title")}</h1>
        <p className="mt-5 max-w-xl text-lg text-white md:mt-4 md:max-w-3xl md:text-xl">
          {t("subtitle")}
        </p>
        <StoreBadges className="mt-7" />
      </div>
      <div className="hero-clouds" aria-hidden>
        <div className="l1" />
        <div className="l2" />
        <div className="l3" />
        <div className="l4" />
      </div>
    </section>
  );
}
