import { useTranslations } from "next-intl";
import { AppStoreButton } from "../AppStoreButton";
import { Clouds } from "../ui/Clouds";

export function Hero() {
  const t = useTranslations("hero");
  return (
    <section id="download" className="relative overflow-hidden bg-hero">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-12 text-center md:pt-20">
        <h1 className="max-w-[15ch] text-display text-ink">{t("title")}</h1>
        <p className="mt-5 max-w-xl text-lg text-ink-2 md:mt-6 md:text-xl">
          {t("subtitle")}
        </p>
        <div className="mt-7 md:mt-9">
          <AppStoreButton />
        </div>
        <img
          src="/blobs/Fleur1.svg"
          alt=""
          aria-hidden
          draggable={false}
          className="breathe mt-10 w-[190px] select-none md:mt-14 md:w-[280px]"
        />
      </div>
      {/* Pulled up past the valley so Fleur sinks into the cloud, as in the app. */}
      <Clouds className="relative z-10 -mt-[calc(1.1*min(31.55vw,300px))] md:-mt-[calc(0.95*min(31.55vw,300px))]" />
    </section>
  );
}
