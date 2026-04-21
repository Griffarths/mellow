import { useTranslations } from "next-intl";
import { AppStoreButton } from "../AppStoreButton";

export function Hero() {
  const t = useTranslations("hero");
  return (
    <section
      id="download"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-16 md:py-24"
    >
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-2 md:gap-12">
        <div className="order-2 flex flex-col justify-center text-center md:order-1 md:text-left">
          <h1 className="hero-title text-5xl font-bold tracking-tight md:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-black/60 md:text-xl">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <AppStoreButton />
          </div>
        </div>
        <div className="order-1 flex items-center justify-center md:order-2">
          <img
            src="/blobs/Trio.svg"
            alt=""
            aria-hidden
            draggable={false}
            className="w-full max-w-[220px] rotate-0 select-none md:max-w-[380px] md:rotate-12"
          />
        </div>
      </div>
    </section>
  );
}
