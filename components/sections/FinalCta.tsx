import { AppStoreButton } from "../AppStoreButton";
import { Blob } from "../phones/Blob";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 h-96 w-96 rounded-full bg-mellow-pink/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-20 h-96 w-96 rounded-full bg-mellow-sky/20 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1fr_auto]">
        <div>
          <h2 className="section-title text-4xl font-bold md:text-6xl">
            Arrête de deviner.
            <br />
            Commence à comprendre.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-white/65">
            Téléchargement gratuit. Pas de compte obligatoire. Tes données
            restent à toi.
          </p>
          <div className="mt-8">
            <AppStoreButton variant="light" />
          </div>
        </div>
        <div className="hidden md:block">
          <Blob color="#F8C8CC" className="h-40 w-40 float-slow" />
        </div>
      </div>
    </section>
  );
}
