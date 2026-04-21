import { PhoneFrame } from "./PhoneFrame";

export function PhoneRelief() {
  return (
    <PhoneFrame>
      <div className="relative flex h-full flex-col p-5">
        <TopBar title="Analyse détaillée" />
        <div className="mt-4">
          <h4 className="text-[13px] font-bold">Méthodes de soulagement</h4>
          <p className="text-[10px] text-black/45">
            Les méthodes essayées les plus efficaces
          </p>
          <div className="mt-2 space-y-2 rounded-2xl bg-black/[0.04] p-3">
            <Row name="Ice pack" value="Très efficace" pct={92} color="#8AB4E8" />
            <Row name="Douche froide" value="Peu efficace" pct={22} color="#8AB4E8" />
            <Row name="Massage" value="Inefficace" pct={4} color="#8AB4E8" muted />
            <Row name="Aliments" value="Inefficace" pct={4} color="#8AB4E8" muted />
            <div className="pt-1 text-center text-[10px] text-black/40">
              Voir plus ⌄
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-[13px] font-bold">Médicaments</h4>
          <p className="text-[10px] text-black/45">
            Les médicaments pris les plus efficaces
          </p>
          <div className="mt-2 space-y-2 rounded-2xl bg-black/[0.04] p-3">
            <Row name="Ibuprofen 400mg" value="Efficace" pct={78} color="#EF4A5B" />
            <Row name="Paracétamol 1000mg" value="Peu efficace" pct={22} color="#EF4A5B" />
            <Row name="Aspirin 1000mg" value="Inefficace" pct={4} color="#EF4A5B" muted />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function TopBar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <button className="grid h-7 w-7 place-items-center rounded-full bg-black/[0.05]">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m14 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <span className="text-[11px] font-semibold">{title}</span>
      <button className="grid h-7 w-7 place-items-center rounded-full bg-black/[0.05]">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 16V4M6 10l6-6 6 6M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

function Row({
  name,
  value,
  pct,
  color,
  muted = false,
}: {
  name: string;
  value: string;
  pct: number;
  color: string;
  muted?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-[10px]">
        <span className="font-medium">{name}</span>
        <span className="text-black/40">{value}</span>
      </div>
      <div className="mt-1 h-1 rounded-full bg-black/[0.06]">
        <div
          className="h-1 rounded-full"
          style={{
            width: `${Math.max(pct, 3)}%`,
            background: muted ? "rgba(0,0,0,0.15)" : color,
          }}
        />
      </div>
    </div>
  );
}
