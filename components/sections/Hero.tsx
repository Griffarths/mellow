import { AppStoreButton } from "../AppStoreButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24" id="download">
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:gap-12 md:pb-28">
        <div className="flex flex-col justify-center">
          <h1 className="hero-title text-5xl font-bold tracking-tight md:text-7xl">
            Reprends le contrôle de tes migraines.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-black/60 md:text-xl">
            Mellow t&apos;accompagne pour mieux les comprendre et les traverser.
          </p>
          <div className="mt-8">
            <AppStoreButton />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/blobs/Trio.svg"
            alt=""
            aria-hidden
            draggable={false}
            className="w-full max-w-[420px] select-none md:max-w-[520px]"
          />
        </div>
      </div>
    </section>
  );
}
