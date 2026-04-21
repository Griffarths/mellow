const FREE = [
  "Enregistrement des crises illimité",
  "Intensité, durée et déclencheurs",
  "Méthodes de soulagement",
  "Vue mensuelle simple",
];

const PREMIUM = [
  "Tout ce qui est dans la version gratuite",
  "Analyse détaillée sur 3 et 12 mois",
  "Corrélation pression atmosphérique & météo",
  "Classement d'efficacité des traitements",
  "Export PDF pour ton médecin",
  "Rappels et routines personnalisés",
  "Support prioritaire",
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-mellow-rose">
            Tarifs
          </p>
          <h2 className="section-title mt-3 text-4xl font-bold md:text-6xl">
            Gratuit pour commencer. Premium pour aller loin.
          </h2>
          <p className="mt-5 text-lg text-black/60">
            Essaie Mellow sans limite. Débloque la compréhension profonde de tes
            migraines quand tu veux.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-2">
          <Card
            title="Gratuit"
            price="0€"
            suffix=""
            description="Toutes les bases pour commencer à comprendre tes crises."
            features={FREE}
            cta="Télécharger"
            accent="bg-white ring-1 ring-black/10"
            ctaStyle="bg-white text-ink ring-1 ring-black/10 hover:bg-cloud"
          />
          <Card
            title="Premium"
            price="4,99€"
            suffix="/mois"
            badge="Le plus choisi"
            description="Analyse détaillée, corrélations et export médecin."
            features={PREMIUM}
            cta="Passer Premium"
            accent="bg-ink text-white"
            ctaStyle="bg-white text-ink hover:bg-cloud"
            dark
          />
        </div>

        <p className="mt-8 text-center text-xs text-black/40">
          Facturation annuelle disponible · Annulation en un tap · Sans engagement
        </p>
      </div>
    </section>
  );
}

function Card({
  title,
  price,
  suffix,
  description,
  features,
  cta,
  accent,
  ctaStyle,
  badge,
  dark = false,
}: {
  title: string;
  price: string;
  suffix: string;
  description: string;
  features: string[];
  cta: string;
  accent: string;
  ctaStyle: string;
  badge?: string;
  dark?: boolean;
}) {
  return (
    <div className={`relative flex flex-col rounded-3xl p-8 ${accent}`}>
      {badge && (
        <span className="absolute right-6 top-6 rounded-full bg-mellow-pink px-3 py-1 text-[11px] font-semibold text-mellow-rose">
          {badge}
        </span>
      )}
      <div className="text-sm font-semibold uppercase tracking-wider opacity-70">
        {title}
      </div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-5xl font-bold tracking-tight">{price}</span>
        <span className="text-sm opacity-60">{suffix}</span>
      </div>
      <p className={`mt-3 text-sm ${dark ? "text-white/65" : "text-black/60"}`}>
        {description}
      </p>
      <ul className="mt-6 space-y-3 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span
              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                dark ? "bg-white/15" : "bg-mellow-pink/70"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className={dark ? "text-white/85" : "text-black/75"}>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href="#download"
        className={`mt-8 inline-flex h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition ${ctaStyle}`}
      >
        {cta}
      </a>
    </div>
  );
}
