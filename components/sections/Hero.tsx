import { AppStoreButton } from "../AppStoreButton";
import { PhoneLog } from "../phones/PhoneLog";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 md:pt-20" id="download">
      <BackgroundBlobs />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:gap-12 md:pb-24">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-mellow-pink/60 px-3 py-1 text-xs font-medium text-mellow-rose">
            <span className="h-1.5 w-1.5 rounded-full bg-mellow-rose" />
            Nouveauté sur l&apos;App Store
          </span>
          <h1 className="hero-title mt-6 text-5xl font-bold tracking-tight md:text-7xl">
            Reprends le contrôle de tes{" "}
            <span className="relative inline-block">
              <span className="relative z-10">migraines</span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-mellow-pink md:h-4" />
            </span>
            .
          </h1>
          <p className="mt-6 max-w-lg text-lg text-black/60">
            Mellow t&apos;aide à enregistrer tes crises en un instant, identifier
            tes déclencheurs et comprendre ce qui te soulage vraiment.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <AppStoreButton />
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium text-black/70 ring-1 ring-black/10 transition hover:bg-cloud"
            >
              Voir les fonctionnalités
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14m0 0-6-6m6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-black/50">
            <div className="flex items-center gap-1">
              <Stars /> <span>4.8 sur l&apos;App Store</span>
            </div>
            <div>Privé · Offline-first</div>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="relative">
            <div className="absolute -left-10 top-10 float-slower">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-mellow-pink text-mellow-rose shadow-soft">
                <svg viewBox="0 0 32 32" className="h-9 w-9" fill="none">
                  <circle cx="16" cy="16" r="13" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
                  <circle cx="16" cy="16" r="8" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" />
                  <circle cx="16" cy="16" r="3" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div className="absolute -right-8 bottom-16 float-slow">
              <div className="rounded-2xl bg-white px-3 py-2 text-xs shadow-soft ring-1 ring-black/5">
                <div className="text-[10px] text-black/40">Intensité</div>
                <div className="flex items-baseline gap-1 text-mellow-blue">
                  <span className="text-lg font-bold">6</span>
                  <span className="text-[10px]">Modérée</span>
                </div>
              </div>
            </div>
            <PhoneLog />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-amber-500">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor">
          <path d="M10 1.5 12.5 7l6 .5-4.5 4 1.3 6L10 14.8 4.7 17.5l1.3-6-4.5-4 6-.5z" />
        </svg>
      ))}
    </div>
  );
}

function BackgroundBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-mellow-pink/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-40 h-72 w-72 rounded-full bg-mellow-sky/50 blur-3xl" />
    </>
  );
}
