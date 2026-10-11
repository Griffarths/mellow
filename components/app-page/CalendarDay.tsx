"use client";

import { useState } from "react";

export type Level = "mild" | "moderate" | "intense";

export type DayAttack = {
  level: Level;
  // The Mellow of the intensity, as in the app: Fleur1, Tagada2 or Croix2.
  blob: string;
  score: number;
  date: string;
  start: string;
  end: string;
  duration: string;
};

type Props = {
  month: string;
  count: string;
  weekdays: string[];
  // Empty cells before the 1st (the month starts on a Saturday: 5).
  offset: number;
  days: number;
  attacks: Record<number, DayAttack>;
  initial: number;
  labels: Record<Level | "intensity" | "start" | "end" | "duration", string>;
};

const BG: Record<Level, string> = { mild: "bg-fleur", moderate: "bg-tagada", intense: "bg-croix" };
const delay = (i: number) => ({ animationDelay: `${200 + i * 110}ms` });

// The month of the app's calendar, and beside it the sheet of the attack
// chosen, as when a day is tapped in the app: its Mellow, its intensity, its
// start, end and duration. Each coloured day can be clicked; the most intense
// one is open at first. Below the calendar on a phone.
export function CalendarDay({ month, count, weekdays, offset, days, attacks, initial, labels }: Props) {
  const [picked, setPicked] = useState(initial);
  const attack = attacks[picked];
  let n = 0;

  return (
    <div className="mx-auto grid max-w-3xl items-center gap-10 md:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] md:gap-14">
      <div className="w-full">
        <div className="flex items-baseline justify-between px-2">
          <p className="text-lg font-bold text-ink first-letter:uppercase">{month}</p>
          <p className="text-ink-3">{count}</p>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-y-1 text-center">
          {weekdays.map((d, i) => (
            <span key={i} aria-hidden className="text-sm text-ink-4">
              {d}
            </span>
          ))}
          {Array.from({ length: offset }, (_, i) => (
            <span key={`e${i}`} />
          ))}
          {Array.from({ length: days }, (_, i) => {
            const day = i + 1;
            const a = attacks[day];
            if (!a)
              return (
                <span
                  key={day}
                  className="mx-auto grid h-9 w-9 place-items-center text-[15px] text-ink md:h-10 md:w-10 md:text-base"
                >
                  {day}
                </span>
              );
            return (
              <button
                key={day}
                type="button"
                onClick={() => setPicked(day)}
                aria-pressed={picked === day}
                aria-label={`${a.date}, ${a.score}/10`}
                className={`relative mx-auto grid h-9 w-9 place-items-center rounded-full text-[15px] text-ink transition md:h-10 md:w-10 md:text-base ${
                  picked === day ? "ring-2 ring-ink ring-offset-2" : "hover:ring-2 hover:ring-ink/20 hover:ring-offset-2"
                } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-hot`}
              >
                <span className={`app-pop absolute inset-0 rounded-full ${BG[a.level]}`} style={delay(n++)} />
                <span className="relative">{day}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex justify-center gap-6 text-sm text-ink-2">
          {(["mild", "moderate", "intense"] as const).map((level) => (
            <span key={level} className="flex items-center gap-2">
              <span className={`h-3 w-3 rounded-full ${BG[level]}`} />
              {labels[level]}
            </span>
          ))}
        </div>
      </div>

      {/* The sheet of the chosen attack, as in the app (no card: right on
          the page). Remounted on each choice, so it fades in. */}
      <div key={picked} aria-live="polite" className="chart-fade mx-auto w-full max-w-xs text-left md:mx-0">
        <p className="font-semibold text-ink first-letter:uppercase">{attack.date}</p>
        <div className="mt-4 flex items-center gap-4">
          <img
            src={`/blobs/${attack.blob}.svg`}
            alt=""
            aria-hidden
            draggable={false}
            className="h-16 w-16 select-none"
          />
          <div>
            <p className="leading-none">
              <span className="text-5xl font-extrabold tracking-tight text-ink">{attack.score}</span>
              <span className="ml-0.5 text-lg font-semibold text-ink-3">/10</span>
            </p>
            <p className="mt-1.5 text-sm text-ink-2">{labels.intensity}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-surface-line pt-4">
          {(
            [
              ["start", attack.start],
              ["end", attack.end],
              ["duration", attack.duration],
            ] as const
          ).map(([key, value]) => (
            <div key={key}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{labels[key]}</p>
              <p className="mt-1 text-lg font-bold tabular-nums text-ink">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
