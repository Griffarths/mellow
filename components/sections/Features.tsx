type Feature = {
  title: string;
  description: string;
  bg: string;
  illustration: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    title: "Logging ultra-rapide",
    description:
      "Pendant la crise, chaque seconde compte. Déclare une migraine en deux taps et renseigne les détails plus tard.",
    bg: "bg-[#FDECEF]",
    illustration: <LoggingIllus />,
  },
  {
    title: "Suivi des déclencheurs",
    description:
      "Stress, sommeil, écrans, cycle, caféine… Mellow corrèle tes déclencheurs avec tes crises pour révéler ce qui compte.",
    bg: "bg-[#E6EEFB]",
    illustration: <TriggersIllus />,
  },
  {
    title: "Pression atmosphérique",
    description:
      "Suivi automatique de la météo et de la pression pendant chaque crise pour détecter les schémas invisibles.",
    bg: "bg-[#EEE7F7]",
    illustration: <PressureIllus />,
  },
  {
    title: "Stats et historique",
    description:
      "Calendrier, durée moyenne, intensité, tendances sur 1, 3 ou 12 mois. Tout ton historique, à portée de main.",
    bg: "bg-[#FDE2D1]",
    illustration: <StatsIllus />,
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

        <div className="mt-16 space-y-5 md:mt-24 md:space-y-6">
          {FEATURES.map((f, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={f.title}
                className={`grid overflow-hidden rounded-[32px] md:grid-cols-2 md:rounded-[40px] ${f.bg}`}
              >
                <div
                  className={`flex items-center justify-center p-10 md:p-14 ${
                    isEven ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <div className="aspect-square w-full max-w-[360px]">
                    {f.illustration}
                  </div>
                </div>
                <div
                  className={`flex flex-col justify-center p-10 md:p-14 ${
                    isEven ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                    {f.title}
                  </h3>
                  <p className="mt-4 text-base text-black/60 md:text-lg">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LoggingIllus() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid h-36 w-36 place-items-center rounded-[32px] bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] md:h-44 md:w-44">
          <svg viewBox="0 0 24 24" className="h-20 w-20 md:h-24 md:w-24" fill="#EF4A5B">
            <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
          </svg>
        </div>
      </div>
      <FloatingChip className="left-0 top-4 md:left-2 md:top-8" delay="0s">
        <span className="h-2 w-2 rounded-full bg-[#EF4A5B]" />
        En cours
      </FloatingChip>
      <FloatingChip className="right-0 bottom-10 md:right-2" delay="1s">
        2 taps
      </FloatingChip>
      <FloatingChip className="left-6 bottom-2 md:left-10" delay="2s">
        ⚡ Instantané
      </FloatingChip>
    </div>
  );
}

function TriggersIllus() {
  const chips = [
    { label: "Stress", active: true, x: "10%", y: "20%" },
    { label: "Manque de sommeil", x: "50%", y: "8%" },
    { label: "Lumière intense", active: true, x: "8%", y: "60%" },
    { label: "Caféine", x: "55%", y: "46%" },
    { label: "Cycle menstruel", x: "20%", y: "82%" },
    { label: "Écrans", x: "60%", y: "76%" },
  ];
  return (
    <div className="relative h-full w-full">
      {chips.map((c) => (
        <span
          key={c.label}
          style={{ left: c.x, top: c.y }}
          className={`absolute inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium shadow-sm md:text-sm ${
            c.active
              ? "bg-[#8AB4E8] text-white"
              : "bg-white text-black/70 ring-1 ring-black/5"
          }`}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

function PressureIllus() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <svg viewBox="0 0 240 240" className="h-full w-full">
        <defs>
          <linearGradient id="pressureArc" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#B8A4E3" />
            <stop offset="100%" stopColor="#8B6FD6" />
          </linearGradient>
        </defs>
        <path
          d="M40 160 A80 80 0 0 1 200 160"
          fill="none"
          stroke="#fff"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <path
          d="M40 160 A80 80 0 0 1 170 102"
          fill="none"
          stroke="url(#pressureArc)"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <g transform="translate(120 168)">
          <text
            textAnchor="middle"
            fontFamily="var(--font-jakarta)"
            fontWeight="700"
            fontSize="38"
            fill="#0A0A0A"
          >
            1012
          </text>
          <text
            y="22"
            textAnchor="middle"
            fontFamily="var(--font-jakarta)"
            fontWeight="500"
            fontSize="13"
            fill="rgba(10,10,10,0.5)"
          >
            hPa
          </text>
        </g>
      </svg>
      <div className="absolute right-2 top-4 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium shadow-sm md:right-6">
        <CloudMini /> Pluie
      </div>
      <div className="absolute left-2 bottom-8 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#8B6FD6] shadow-sm md:left-6">
        <ArrowDown /> -8 hPa
      </div>
    </div>
  );
}

function StatsIllus() {
  const migraineDays = new Set([3, 8, 12, 13, 14, 18, 22, 27]);
  const today = 21;
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <div className="relative h-full w-full">
      <div className="grid h-full w-full gap-2 md:gap-3">
        <div className="grid grid-cols-7 gap-1.5 md:gap-2">
          {days.map((d) => {
            const isMigraine = migraineDays.has(d);
            const isToday = d === today;
            return (
              <div
                key={d}
                className={`relative flex aspect-square items-center justify-center rounded-lg text-[10px] font-medium md:rounded-xl md:text-xs ${
                  isToday
                    ? "bg-ink text-white"
                    : isMigraine
                      ? "bg-white text-black/80 shadow-sm"
                      : "bg-white/60 text-black/40"
                }`}
              >
                {d}
                {isMigraine && !isToday && (
                  <span className="absolute bottom-1 left-1/2 h-0.5 w-2.5 -translate-x-1/2 rounded-full bg-[#EF4A5B]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute -top-2 right-0 rounded-2xl bg-white px-3 py-2 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.2)] md:-right-2">
        <div className="text-xs text-black/40">Intensité moy.</div>
        <div className="text-xl font-bold">6.0</div>
      </div>
    </div>
  );
}

function FloatingChip({
  children,
  className = "",
  delay = "0s",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}) {
  return (
    <span
      style={{ animationDelay: delay }}
      className={`absolute inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium shadow-sm md:text-sm ${className}`}
    >
      {children}
    </span>
  );
}

function CloudMini() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#8B6FD6" strokeWidth="2">
      <path d="M7 18h11a4 4 0 0 0 .6-7.95 6 6 0 0 0-11.7 1.2A4 4 0 0 0 7 18z" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 5v14m0 0-6-6m6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
