"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

type Metric = "pressure" | "humidity";

type Series = {
  label: string;
  values: number[];
  // The value the day before the first one, so Monday has a change too.
  previous: number;
  // The y range of the chart, with room above for the label of the change.
  min: number;
  max: number;
  // The app's colour for this measure (PressionHumiditeView).
  color: string;
  // The change written on the cursor, "{value}" replaced: "{value} hPa".
  format: string;
  // From the app's arrows: below `medium` the change is green, from `medium`
  // orange, from `strong` red (3 and 5 hPa, 7 and 12 points of humidity).
  medium: number;
  strong: number;
  unit: string;
};

type Props = {
  title: string;
  days: string[];
  pressure: Series;
  humidity: Series;
};

// Green, orange, red as the app's arrows, in the site's pastels: a soft green,
// the sable of the yellow Mellow, the pink of Croix (the intense attacks of
// the calendar). The dot is a shade darker than its label.
const LEVELS = [
  { dot: "#9ED2B0", bg: "#CDEBD7" },
  { dot: "#E8B57E", bg: "#F0CCA2" },
  { dot: "#D9707F", bg: "#F1A6B1" },
];

// The viewBox is stretched to the box (preserveAspectRatio none): x from 0 to
// 700, y from 0 to 100, so a point's position is also its percentage.
const W = 700;
const x = (i: number, n: number) => ((i + 0.5) / n) * W;
const y = (v: number, s: Series) => ((s.max - v) / (s.max - s.min)) * 100;

// A smooth curve through the points that never goes beyond them (monotone
// cubic, Steffen's method): the curve only turns at a day, so the lowest and
// highest points of the curve are the lowest and highest days.
function curve(points: Array<[number, number]>) {
  const n = points.length;
  const h = points[1][0] - points[0][0];
  const s = points.slice(1).map((p, i) => (p[1] - points[i][1]) / h);
  const m = points.map((_, i) => {
    if (i === 0 || i === n - 1) return NaN;
    const [s0, s1] = [s[i - 1], s[i]];
    const p = (s0 + s1) / 2;
    return (Math.sign(s0) + Math.sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
  });
  // The ends: the slope that makes a parabola with the next point.
  m[0] = (3 * s[0] - m[1]) / 2;
  m[n - 1] = (3 * s[n - 2] - m[n - 2]) / 2;
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const [p1, p2] = [points[i], points[i + 1]];
    d += ` C${p1[0] + h / 3},${p1[1] + (m[i] * h) / 3} ${p2[0] - h / 3},${p2[1] - (m[i + 1] * h) / 3} ${p2[0]},${p2[1]}`;
  }
  return d;
}

const signed = (n: number) => `${n < 0 ? "−" : "+"}${Math.abs(n)}`;

// The week's pressure or humidity as a curve, as in the app's chart: a button
// switches between the two, and a cursor follows the mouse (or the finger)
// from day to day, with the change since the day before, coloured like the
// app's arrows. At rest it sits on the day of the biggest change.
export function WeatherChart({ title, days, pressure, humidity }: Props) {
  const [metric, setMetric] = useState<Metric>("pressure");
  const [picked, setPicked] = useState<number | null>(null);
  const zone = useRef<HTMLDivElement>(null);

  const s = metric === "pressure" ? pressure : humidity;
  const n = s.values.length;
  const changes = s.values.map((v, i) => v - (i === 0 ? s.previous : s.values[i - 1]));
  const peak = changes.reduce((best, c, i) => (Math.abs(c) > Math.abs(changes[best]) ? i : best), 0);
  const day = picked ?? peak;
  const change = changes[day];
  const level = LEVELS[Math.abs(change) >= s.strong ? 2 : Math.abs(change) >= s.medium ? 1 : 0];
  const label = s.format.replace("{value}", signed(change));

  const points = s.values.map((v, i) => [x(i, n), y(v, s)] as [number, number]);
  const line = curve(points);
  const left = `${(points[day][0] / W) * 100}%`;
  const top = `${points[day][1]}%`;

  // The day under the pointer: the chart is cut in 7 equal columns.
  const follow = (e: PointerEvent<HTMLDivElement>) => {
    const box = zone.current?.getBoundingClientRect();
    if (!box) return;
    const i = Math.floor(((e.clientX - box.left) / box.width) * n);
    setPicked(Math.min(n - 1, Math.max(0, i)));
  };
  const keys = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    setPicked(Math.min(n - 1, Math.max(0, day + step)));
  };
  const switchTo = (m: Metric) => {
    setMetric(m);
    setPicked(null);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-semibold text-ink-3">{title}</p>
        <div className="inline-flex rounded-full bg-surface-soft p-1" role="group">
          {(["pressure", "humidity"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchTo(m)}
              aria-pressed={metric === m}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-hot ${
                metric === m ? "bg-white text-ink shadow-[0_1px_3px_rgb(0_0_0/0.12)]" : "text-ink-3 hover:text-ink"
              }`}
            >
              {(m === "pressure" ? pressure : humidity).label}
            </button>
          ))}
        </div>
      </div>

      {/* The whole chart and the days follow the pointer. touch-action
          pan-y: on a phone, sliding sideways moves the cursor and sliding up
          or down still scrolls the page. */}
      <div
        ref={zone}
        role="slider"
        tabIndex={0}
        aria-label={s.label}
        aria-valuemin={1}
        aria-valuemax={n}
        aria-valuenow={day + 1}
        aria-valuetext={`${days[day]}, ${s.values[day]}${s.unit}, ${label}`}
        onPointerMove={follow}
        onPointerDown={follow}
        onPointerLeave={(e) => e.pointerType === "mouse" && setPicked(null)}
        onKeyDown={keys}
        className="mt-8 cursor-crosshair touch-pan-y select-none rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brand-hot"
      >
        {/* Remounted on each switch, so the new curve fades in. */}
        <div key={metric} aria-hidden className="chart-fade relative h-44 md:h-56">
          <svg viewBox={`0 0 ${W} 100`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id={`area-${metric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={s.color} stopOpacity="0.45" />
                <stop offset="1" stopColor={s.color} stopOpacity="0.04" />
              </linearGradient>
            </defs>
            <path d={`${line} L${points[n - 1][0]},100 L${points[0][0]},100 Z`} fill={`url(#area-${metric})`} />
            <path d={line} fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          {/* The cursor in HTML, so it glides from day to day and the
              stretched viewBox does not squash it. */}
          <span
            className="absolute inset-y-0 border-l-[1.5px] border-dashed border-[#AAAAAA]/60 transition-[left] duration-200 ease-out"
            style={{ left }}
          />
          <span
            className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-[0_1px_3px_rgb(0_0_0/0.2)] transition-[left,top,background-color] duration-200 ease-out"
            style={{ left, top, backgroundColor: level.dot }}
          />
          <span
            className="absolute whitespace-nowrap rounded-full px-3 py-1 text-sm font-bold tabular-nums text-ink transition-[left,top,background-color] duration-200 ease-out"
            style={{ left, top, transform: "translate(-50%, calc(-100% - 14px))", backgroundColor: level.bg }}
          >
            {label}
          </span>
        </div>

        <div aria-hidden className="mt-4 grid grid-cols-7 text-center">
          {days.map((name, i) => (
            <div key={name}>
              <p className={`text-sm first-letter:uppercase ${i === day ? "font-bold text-ink" : "text-ink-3"}`}>{name}</p>
              <p className={`mt-1 text-sm font-bold tabular-nums md:text-lg ${i === day ? "text-ink" : "text-ink-4"}`}>
                {s.values[i]}
                {metric === "humidity" && <span className="font-semibold">%</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
