"use client";

import { useState, type ReactNode } from "react";
import type { ToolLocale } from "@/lib/tools";
import {
  assess,
  MED_CLASSES,
  totalBounds,
  type Finding,
  type MedClass,
  type OveruseCopy,
} from "@/lib/overuse";
import { typographize } from "@/lib/typography";

type Props = {
  locale: ToolLocale;
  // Only this language's texts, so the client bundle doesn't carry all eight.
  copy: OveruseCopy;
  // Store badges rendered on the server.
  badges: ReactNode;
};

const NO_DAYS: Record<MedClass, number> = { paracetamol: 0, nsaid: 0, triptan: 0, combo: 0 };
const MONTH = 31;

function clamp(n: number, min: number, max: number) {
  return Number.isNaN(n) ? min : Math.min(max, Math.max(min, Math.round(n)));
}

// Bar colour: blue below the threshold, sand when close, red-pink above.
function barClass(f: Finding) {
  if (f.over) return "bg-croix-accent";
  if (f.near) return "bg-sable-accent";
  return "bg-tagada-accent";
}

export function OveruseCalculator({ locale, copy: c, badges }: Props) {
  const ty = (s: string) => typographize(s, locale);
  const [headache, setHeadache] = useState(0);
  const [days, setDays] = useState(NO_DAYS);
  // Null until the visitor adjusts it: by default each drug is counted on
  // separate days, the highest total possible.
  const [totalSet, setTotalSet] = useState<number | null>(null);
  const [threeMonths, setThreeMonths] = useState<boolean | null>(null);

  const classesUsed = MED_CLASSES.filter((k) => days[k] > 0).length;
  const bounds = totalBounds(days);
  const total = clamp(totalSet ?? bounds.max, bounds.min, bounds.max);
  const { status, findings } = assess({
    headacheDays: headache,
    days,
    totalDays: total,
    threeMonthsOrMore: threeMonths === true,
  });

  const box = "rounded-card bg-white p-5 ring-1 ring-surface-line md:p-8";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
      <form className={box} onSubmit={(e) => e.preventDefault()}>
        <p className="text-sm font-semibold text-ink-3">{ty(c.intro)}</p>
        <Stepper
          id="headache"
          label={ty(c.headache.label)}
          value={headache}
          onChange={setHeadache}
          decrease={c.decrease}
          increase={c.increase}
        />

        <p className="mt-6 text-caption font-bold uppercase tracking-[0.08em] text-croix-ink">
          {ty(c.medsTitle)}
        </p>
        <div className="divide-y divide-surface-line">
          {MED_CLASSES.map((k) => (
            <Stepper
              key={k}
              id={k}
              label={ty(c.fields[k].label)}
              hint={c.fields[k].hint && ty(c.fields[k].hint)}
              value={days[k]}
              onChange={(v) => setDays((d) => ({ ...d, [k]: v }))}
              decrease={c.decrease}
              increase={c.increase}
            />
          ))}
          {/* Only asked when two drugs could share a day. */}
          {classesUsed > 1 && (
            <Stepper
              id="total"
              label={ty(c.fields.total.label)}
              hint={c.fields.total.hint && ty(c.fields.total.hint)}
              value={total}
              min={bounds.min}
              max={bounds.max}
              onChange={setTotalSet}
              decrease={c.decrease}
              increase={c.increase}
            />
          )}
        </div>

        <fieldset className="mt-6 border-t border-surface-line pt-6">
          <legend className="text-[15px] font-semibold leading-snug text-ink md:text-base">
            {ty(c.durationLabel)}
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {c.durationOptions.map((label, i) => {
              const on = threeMonths === (i === 1);
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setThreeMonths(i === 1)}
                  className={`rounded-btn px-4 py-3 text-[15px] font-semibold leading-snug transition focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-hot ${
                    on ? "bg-ink text-white" : "bg-surface-soft text-ink hover:bg-surface-line"
                  }`}
                >
                  {ty(label)}
                </button>
              );
            })}
          </div>
        </fieldset>
      </form>

      <div className={`${box} lg:sticky lg:top-24`} aria-live="polite">
        <p className="text-caption font-bold uppercase tracking-[0.08em] text-croix-ink">
          {ty(c.resultEyebrow)}
        </p>
        {status === "empty" ? (
          <p className="mt-3 text-[17px] leading-relaxed text-ink-2">{ty(c.empty)}</p>
        ) : (
          <>
            <h2 className="mt-3 text-h3 text-ink">{ty(c.results[status].title)}</h2>
            <p className="mt-3 text-[16px] leading-[1.7] text-ink-body">{ty(c.results[status].text)}</p>
            <ul className="mt-6 space-y-4">
              {findings.map((f) => (
                <li key={f.key}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="font-semibold text-ink">{ty(c.findingLabel[f.key])}</span>
                    <span className="shrink-0 tabular-nums text-ink-3">
                      {c.findingValue.replace("{days}", String(f.days)).replace("{limit}", String(f.limit))}
                    </span>
                  </div>
                  {/* Days out of a month, with the threshold marked. */}
                  <div className="relative mt-2 h-2 rounded-full bg-surface-soft" aria-hidden>
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${barClass(f)}`}
                      style={{ width: `${(Math.min(f.days, MONTH) / MONTH) * 100}%` }}
                    />
                    <span
                      className="absolute -top-1 h-4 w-0.5 rounded-full bg-ink"
                      style={{ left: `${(f.limit / MONTH) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-8 border-t border-surface-line pt-6">
          <p className="text-lg font-bold tracking-tight text-ink">{ty(c.appTitle)}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{ty(c.appText)}</p>
          <div className="mt-4">{badges}</div>
        </div>
      </div>
    </div>
  );
}

type StepperProps = {
  id: string;
  label: string;
  hint?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  decrease: string;
  increase: string;
};

// A number of days, typed or set with the minus and plus buttons.
function Stepper({ id, label, hint, value, min = 0, max = MONTH, onChange, decrease, increase }: StepperProps) {
  const set = (n: number) => onChange(clamp(n, min, max));
  const round =
    "grid h-9 w-9 shrink-0 place-items-center rounded-full md:h-10 md:w-10 bg-surface-soft text-ink transition hover:bg-surface-line disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-hot";
  return (
    <div className="flex items-center justify-between gap-3 py-4 md:gap-4">
      <label htmlFor={`days-${id}`} className="min-w-0">
        <span className="block text-[15px] font-semibold leading-snug text-ink md:text-base">{label}</span>
        {hint && <span className="mt-0.5 block text-sm leading-snug text-ink-3">{hint}</span>}
      </label>
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          aria-label={`${decrease}, ${label}`}
          disabled={value <= min}
          onClick={() => set(value - 1)}
          className={round}
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="M3.5 8h9" />
          </svg>
        </button>
        <input
          id={`days-${id}`}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => set(e.target.valueAsNumber)}
          onFocus={(e) => e.target.select()}
          className="w-9 rounded-chip bg-transparent py-1 md:w-11 text-center text-lg font-bold tabular-nums text-ink [appearance:textfield] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-hot [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          aria-label={`${increase}, ${label}`}
          disabled={value >= max}
          onClick={() => set(value + 1)}
          className={round}
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="M3.5 8h9M8 3.5v9" />
          </svg>
        </button>
      </div>
    </div>
  );
}
