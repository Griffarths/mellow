import { Blob } from "../phones/Blob";

type Feature = {
  title: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    title: "Logging ultra-rapide",
    description:
      "Pendant la crise, chaque seconde compte. Déclare une migraine en cours en deux taps, renseigne les détails plus tard.",
    accent: "bg-mellow-pink/70",
    icon: <Bolt />,
  },
  {
    title: "Déclencheurs malins",
    description:
      "Stress, sommeil, écrans, cycle, caféine… Mellow corrèle tes déclencheurs avec tes crises pour révéler ce qui compte.",
    accent: "bg-mellow-sky/80",
    icon: <Target />,
  },
  {
    title: "Pression atmosphérique",
    description:
      "Suivi automatique de la météo et de la pression pendant chaque crise pour détecter les schémas invisibles.",
    accent: "bg-mellow-peach/70",
    icon: <Cloud />,
  },
  {
    title: "Ce qui te soulage",
    description:
      "Ice pack, douche froide, ibuprofène… Mellow classe chaque méthode par efficacité réelle sur toi.",
    accent: "bg-mellow-pink/70",
    icon: <Heart />,
  },
  {
    title: "Analyse détaillée",
    description:
      "Calendrier, durée moyenne, intensité, tendances sur 1, 3 ou 12 mois. Exportable pour ton médecin.",
    accent: "bg-black/90 text-white",
    icon: <Chart light />,
  },
  {
    title: "Privé par défaut",
    description:
      "Tes données restent sur ton téléphone. Pas de pub, pas de revente, pas de compte obligatoire.",
    accent: "bg-mellow-sky/80",
    icon: <Lock />,
  },
];

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-24 md:py-32">
      <Blob
        name="Tagada2"
        className="float-slower pointer-events-none absolute -right-12 top-16 h-40 w-40 opacity-80 md:h-56 md:w-56"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-mellow-rose">
            Fonctionnalités
          </p>
          <h2 className="section-title mt-3 text-4xl font-bold md:text-6xl">
            Conçue pour celles et ceux qui&nbsp;vivent avec.
          </h2>
          <p className="mt-5 text-lg text-black/60">
            Pas un énième journal médical compliqué. Mellow est pensée pour être
            utilisable même en pleine crise, avec la lumière éteinte.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const dark = feature.accent.includes("bg-black");
  return (
    <div
      className={`group relative flex flex-col gap-4 rounded-3xl p-6 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-soft ${
        dark ? "bg-ink text-white" : "bg-white"
      }`}
    >
      <div
        className={`grid h-12 w-12 place-items-center rounded-2xl ${feature.accent} ${
          dark ? "" : "text-ink"
        }`}
      >
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
      <p className={`text-sm ${dark ? "text-white/65" : "text-black/60"}`}>
        {feature.description}
      </p>
    </div>
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
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
function Cloud() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 18h11a4 4 0 0 0 .6-7.95 6 6 0 0 0-11.7 1.2A4 4 0 0 0 7 18z" strokeLinejoin="round" />
    </svg>
  );
}
function Heart() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M12 21s-7-4.5-9.5-9a5.5 5.5 0 0 1 9.5-4.9A5.5 5.5 0 0 1 21.5 12C19 16.5 12 21 12 21z" />
    </svg>
  );
}
function Chart({ light = false }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={light ? "white" : "currentColor"} strokeWidth="1.8">
      <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" strokeLinecap="round" />
    </svg>
  );
}
function Lock() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
    </svg>
  );
}
