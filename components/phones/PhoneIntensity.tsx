import { PhoneFrame } from "./PhoneFrame";
import { Blob } from "./Blob";

export function PhoneIntensity() {
  return (
    <PhoneFrame>
      <div className="relative flex h-full flex-col p-6">
        <div className="flex justify-end">
          <button className="grid h-8 w-8 place-items-center rounded-full bg-black/[0.05]">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <h3 className="mt-4 text-lg font-bold tracking-tight">
          Quelle est l&apos;intensité ?
        </h3>
        <div className="mt-10 flex flex-col items-center gap-6">
          <Blob name="Tagada1" className="h-28 w-28" />
          <div className="w-full">
            <div className="relative h-1 rounded-full bg-mellow-sky/60">
              <div className="absolute left-0 top-0 h-1 w-[60%] rounded-full bg-mellow-sky" />
              <div className="absolute left-[58%] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow ring-1 ring-black/5" />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-black/40">
              <span>1</span>
              <span>10</span>
            </div>
            <div className="mt-4 flex items-baseline gap-2 text-mellow-blue">
              <span className="text-3xl font-bold">6</span>
              <span className="text-sm opacity-80">Modérée</span>
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2">
          <button className="grid h-10 w-10 place-items-center rounded-full bg-black/[0.05]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m14 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="h-10 flex-1 rounded-full bg-ink text-[13px] font-semibold text-white">
            Suivant
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
