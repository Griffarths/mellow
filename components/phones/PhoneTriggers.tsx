import { PhoneFrame } from "./PhoneFrame";

const TRIGGERS = [
  { label: "Stress", active: true },
  { label: "Manque de sommeil" },
  { label: "Alcool" },
  { label: "Écrans" },
  { label: "Cycle menstruel" },
  { label: "Déshydratation" },
  { label: "Repas sauté" },
  { label: "Caféine" },
  { label: "Exposition aux odeurs" },
  { label: "Lumière intense", active: true },
  { label: "Activité physique intense" },
  { label: "Voyage" },
  { label: "Allergie" },
];

export function PhoneTriggers() {
  return (
    <PhoneFrame>
      <div className="relative flex h-full flex-col p-5">
        <div className="flex justify-end">
          <button className="grid h-7 w-7 place-items-center rounded-full bg-black/[0.05]">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <h3 className="mt-3 text-[15px] font-bold leading-tight tracking-tight">
          As-tu identifié
          <br />
          des déclencheurs ?
        </h3>
        <div className="mt-4 flex gap-2">
          <button className="h-9 flex-1 rounded-full bg-ink text-xs font-semibold text-white">
            Oui
          </button>
          <button className="h-9 flex-1 rounded-full bg-black/[0.05] text-xs font-semibold text-black/70">
            Non
          </button>
        </div>
        <p className="mt-4 text-[11px] text-black/40">Lesquels ?</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {TRIGGERS.map((t) => (
            <span
              key={t.label}
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] ${
                t.active
                  ? "bg-mellow-sky text-black"
                  : "bg-black/[0.05] text-black/70"
              }`}
            >
              {t.label}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 pt-4">
          <button className="grid h-9 w-9 place-items-center rounded-full bg-black/[0.05]">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m14 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="h-9 flex-1 rounded-full bg-ink text-xs font-semibold text-white">
            Suivant
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
