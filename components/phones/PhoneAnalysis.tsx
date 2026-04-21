import { PhoneFrame } from "./PhoneFrame";

export function PhoneAnalysis() {
  const migraineDays = new Set([8, 12, 13, 14, 16, 17, 18, 19]);
  const today = 20;
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const firstWeekday = 2;
  const leading = Array.from({ length: firstWeekday }, (_, i) => -i - 1).reverse();

  return (
    <PhoneFrame>
      <div className="relative flex h-full flex-col p-5">
        <div className="flex items-center justify-between">
          <button className="grid h-7 w-7 place-items-center rounded-full bg-black/[0.05]">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m14 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="text-[11px] font-semibold">Analyse détaillée</span>
          <button className="grid h-7 w-7 place-items-center rounded-full bg-black/[0.05]">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 16V4M6 10l6-6 6 6M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <h4 className="mt-4 text-[13px] font-bold">Aperçu</h4>
        <div className="mt-2 flex gap-1.5">
          <span className="rounded-full bg-ink px-2.5 py-1 text-[9px] font-semibold text-white">
            1 mois
          </span>
          <span className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[9px] text-black/60">
            3 mois
          </span>
          <span className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[9px] text-black/60">
            12 mois
          </span>
        </div>

        <div className="mt-3 rounded-2xl bg-black/[0.04] p-3">
          <div className="text-2xl font-bold leading-none">56</div>
          <div className="mt-1 text-[10px] text-black/50">Migraines</div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-black/[0.04] p-3">
            <div className="text-lg font-bold leading-none">25min</div>
            <div className="mt-1 text-[10px] text-black/50">Durée moy.</div>
          </div>
          <div className="rounded-2xl bg-black/[0.04] p-3">
            <div className="text-lg font-bold leading-none">6.0</div>
            <div className="mt-1 text-[10px] text-black/50">Intensité moy.</div>
          </div>
        </div>

        <h4 className="mt-4 text-[12px] font-bold">Calendrier des migraines</h4>
        <div className="mt-1 flex items-center justify-between px-1 text-[10px] text-black/50">
          <button>‹</button>
          <span className="font-semibold text-black/80">Avril 2026</span>
          <button>›</button>
        </div>
        <div className="mt-1 grid grid-cols-7 gap-0.5 text-center text-[8px] text-black/30">
          {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>
        <div className="mt-0.5 grid grid-cols-7 gap-0.5">
          {leading.map((i) => (
            <div key={`l${i}`} />
          ))}
          {days.map((d) => {
            const isMigraine = migraineDays.has(d);
            const isToday = d === today;
            return (
              <div
                key={d}
                className={`relative flex h-5 items-center justify-center rounded-md text-[9px] ${
                  isToday
                    ? "bg-ink font-bold text-white"
                    : "bg-black/[0.03] text-black/70"
                }`}
              >
                {d}
                {isMigraine && !isToday && (
                  <span className="absolute bottom-0.5 left-1/2 h-0.5 w-2 -translate-x-1/2 rounded-full bg-mellow-rose" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PhoneFrame>
  );
}
