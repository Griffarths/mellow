import { AppStoreButton } from "../AppStoreButton";
import { Blob } from "../phones/Blob";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mx-auto flex justify-center">
          <Blob name="Fleur1" className="float-slow h-32 w-32 md:h-40 md:w-40" />
        </div>
        <h2 className="section-title mt-8 text-4xl font-bold md:text-6xl">
          Télécharge Mellow
        </h2>
        <div className="mt-8 flex justify-center">
          <AppStoreButton />
        </div>
      </div>
    </section>
  );
}
