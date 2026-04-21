type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    title: "Logging ultra-rapide",
    description:
      "Pendant la crise, chaque seconde compte. Déclare une migraine en deux taps et renseigne les détails plus tard.",
    icon: <Bolt />,
  },
  {
    title: "Suivi des déclencheurs",
    description:
      "Stress, sommeil, écrans, cycle, caféine… Mellow corrèle tes déclencheurs avec tes crises pour révéler ce qui compte.",
    icon: <Target />,
  },
  {
    title: "Pression atmosphérique",
    description:
      "Suivi automatique de la météo et de la pression pendant chaque crise pour détecter les schémas invisibles.",
    icon: <Cloud />,
  },
  {
    title: "Stats et historique",
    description:
      "Calendrier, durée moyenne, intensité, tendances sur 1, 3 ou 12 mois. Tout ton historique, à portée de main.",
    icon: <Chart />,
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h2 className="section-title text-4xl font-bold md:text-6xl">
            Pensée pour être utile,
            <br />
            même en pleine crise.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-4 rounded-3xl bg-cloud p-6 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-ink ring-1 ring-black/5">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold tracking-tight">{f.title}</h3>
              <p className="text-sm text-black/60">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bolt() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
    </svg>
  );
}
function Target() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
function Cloud() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M7 18h11a4 4 0 0 0 .6-7.95 6 6 0 0 0-11.7 1.2A4 4 0 0 0 7 18z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Chart() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" strokeLinecap="round" />
    </svg>
  );
}
