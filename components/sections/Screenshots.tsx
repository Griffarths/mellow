import { PhoneIntensity } from "../phones/PhoneIntensity";
import { PhoneTriggers } from "../phones/PhoneTriggers";
import { PhoneRelief } from "../phones/PhoneRelief";
import { PhoneAnalysis } from "../phones/PhoneAnalysis";
import { Blob } from "../phones/Blob";

const DECO_BLOBS = ["Fleur1", "Croix1", "Tagada1", "Fleur3"] as const;

type Shot = {
  eyebrow: string;
  title: string;
  description: string;
  phone: React.ReactNode;
};

const SHOTS: Shot[] = [
  {
    eyebrow: "Exprime",
    title: "ta douleur",
    description:
      "Un simple curseur de 1 à 10, avec un visage qui évolue. Parce que noter l'intensité ne doit pas demander d'effort quand tu as mal.",
    phone: <PhoneIntensity />,
  },
  {
    eyebrow: "Identifie",
    title: "tes déclencheurs",
    description:
      "Stress, lumière, cycle, caféine, voyage… Ajoute en un geste ce qui a pu déclencher la crise. Mellow apprend avec toi.",
    phone: <PhoneTriggers />,
  },
  {
    eyebrow: "Suis",
    title: "tes méthodes de soulagement",
    description:
      "Ice pack, médicaments, douche froide… Chaque méthode est notée selon son efficacité réelle, pas selon ce qu'on lit en ligne.",
    phone: <PhoneRelief />,
  },
  {
    eyebrow: "Analyse",
    title: "tes migraines",
    description:
      "Nombre de crises, durée et intensité moyennes, calendrier précis. Exporte le tout pour ton neurologue.",
    phone: <PhoneAnalysis />,
  },
];

export function Screenshots() {
  return (
    <section id="screens" className="relative overflow-hidden bg-cloud py-24 md:py-32">
      <Blob
        name="Croix1"
        className="float-slow pointer-events-none absolute -left-12 top-24 h-32 w-32 opacity-90 md:h-44 md:w-44"
      />
      <Blob
        name="Fleur1"
        className="float-slower pointer-events-none absolute right-0 top-1/2 h-28 w-28 opacity-90 md:h-40 md:w-40"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-mellow-blue">
            L&apos;app
          </p>
          <h2 className="section-title mt-3 text-4xl font-bold md:text-6xl">
            Chaque écran, pensé pour être utile quand ça fait mal.
          </h2>
        </div>

        <div className="mt-16 space-y-24 md:space-y-32">
          {SHOTS.map((s, i) => {
            const decoBlob = DECO_BLOBS[i % DECO_BLOBS.length];
            const isEven = i % 2 === 0;
            return (
              <div
                key={s.title}
                className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                  !isEven ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <div className="text-5xl font-bold tracking-tight md:text-6xl">
                    {s.eyebrow}
                  </div>
                  <div className="mt-1 text-3xl font-light tracking-tight text-black/60 md:text-4xl">
                    {s.title}
                  </div>
                  <p className="mt-6 max-w-md text-lg text-black/60">
                    {s.description}
                  </p>
                </div>
                <div className="relative flex justify-center">
                  <Blob
                    name={decoBlob}
                    className={`float-slow pointer-events-none absolute h-20 w-20 opacity-95 md:h-24 md:w-24 ${
                      isEven
                        ? "-left-4 -top-4 md:-left-10"
                        : "-right-4 -top-4 md:-right-10"
                    }`}
                  />
                  {s.phone}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
