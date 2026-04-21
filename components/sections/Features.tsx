type Feature = {
  title: React.ReactNode;
  description: string;
  bg: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
  span: "big" | "small";
};

const FEATURES: Feature[] = [
  {
    title: (
      <>
        Enregistrement
        <br />
        ultra-rapide
      </>
    ),
    description:
      "Pendant la crise, chaque seconde compte. Déclare une migraine en deux taps et renseigne les détails plus tard.",
    bg: "bg-[#FDECEF]",
    iconBg: "bg-white",
    iconColor: "text-[#EF4A5B]",
    icon: <Bolt />,
    span: "big",
  },
  {
    title: "Suivi des déclencheurs",
    description:
      "Stress, sommeil, écrans, cycle… Mellow révèle ce qui déclenche tes crises.",
    bg: "bg-[#E6EEFB]",
    iconBg: "bg-white",
    iconColor: "text-[#5F86C0]",
    icon: <Target />,
    span: "small",
  },
  {
    title: "Pression atmosphérique",
    description:
      "Suivi météo automatique pour détecter les schémas invisibles.",
    bg: "bg-[#EEE7F7]",
    iconBg: "bg-white",
    iconColor: "text-[#8B6FD6]",
    icon: <Cloud />,
    span: "small",
  },
  {
    title: (
      <>
        Stats
        <br />
        et historique
      </>
    ),
    description:
      "Calendrier, durée moyenne, intensité, tendances sur 1, 3 ou 12 mois. Tout ton historique, à portée de main.",
    bg: "bg-[#FDE2D1]",
    iconBg: "bg-white",
    iconColor: "text-[#F28B3E]",
    icon: <Chart />,
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
              key={f.title}
              className={`flex flex-col justify-between rounded-[32px] p-8 md:rounded-[40px] md:p-10 ${f.bg} ${
                f.span === "big" ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              <div
                className={`grid h-14 w-14 place-items-center rounded-2xl ${f.iconBg} ${f.iconColor}`}
              >
                {f.icon}
              </div>
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

function Bolt() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
    </svg>
  );
}
function Target() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" strokeLinecap="round" />
    </svg>
  );
}
