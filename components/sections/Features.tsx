type Feature = {
  id: string;
  title: React.ReactNode;
  description: string;
  bg: string;
  image: string;
  span: "big" | "small";
};

const FEATURES: Feature[] = [
  {
    id: "logging",
    title: (
      <>
        Enregistrement
        <br />
        ultra-rapide
      </>
    ),
    description:
      "Pendant la crise, chaque seconde compte. Déclare une migraine en deux taps et renseigne les détails plus tard.",
    bg: "bg-[#FFE5E5]",
    image: "/assets/Migraine1.svg",
    span: "big",
  },
  {
    id: "triggers",
    title: "Suivi des déclencheurs",
    description:
      "Stress, sommeil, écrans, cycle… Mellow révèle ce qui déclenche tes crises.",
    bg: "bg-[#FADFCC]",
    image: "/assets/Historique.svg",
    span: "small",
  },
  {
    id: "pressure",
    title: "Pression atmosphérique",
    description:
      "Suivi météo automatique pour détecter les schémas invisibles.",
    bg: "bg-[#DFE8F5]",
    image: "/assets/Pression.svg",
    span: "small",
  },
  {
    id: "stats",
    title: (
      <>
        Stats
        <br />
        et historique
      </>
    ),
    description:
      "Calendrier, durée moyenne, intensité, tendances sur 1, 3 ou 12 mois. Tout ton historique, à portée de main.",
    bg: "bg-[#FADFEA]",
    image: "/assets/Analyse.svg",
    span: "big",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h2 className="section-title text-4xl font-bold md:text-6xl">
            Des fonctionnalités pensées pour réduire tes migraines.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.id}
              className={`flex flex-col justify-between rounded-[32px] p-8 md:rounded-[40px] md:p-10 ${f.bg} ${
                f.span === "big" ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              <img
                src={f.image}
                alt=""
                aria-hidden
                draggable={false}
                className="h-16 w-16 select-none rounded-2xl md:h-20 md:w-20 md:rounded-3xl"
              />
              <div className="mt-16 md:mt-24">
                <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {f.title}
                </h3>
                <p className="mt-3 max-w-md text-base text-black/60 md:text-lg">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

