"use client";

import { useState } from "react";

type Metric = "pressure" | "humidity";

type Series = {
  label: string;
  values: number[];
  // The y range of the chart, with room above for the label of the change.
  min: number;
  max: number;
  // The app's colour for this measure (PressionHumiditeView).
  color: string;
  // The day of the big change, and its label ("−6 hPa", "+19 points").
  peak: number;
  change: string;
};

type Props = {
  title: string;
  days: string[];
  pressure: Series;
  humidity: Series;
};

// The viewBox is stretched to the box (preserveAspectRatio none): x from 0 to
// 700, y from 0 to 100, so a point's position is also its percentage.
const W = 700;
const x = (i: number, n: number) => ((i + 0.5) / n) * W;
const y = (v: number, s: Series) => ((s.max - v) / (s.max - s.min)) * 100;

// A smooth curve through the points (Catmull-Rom, as the app's chart).
function curve(points: Array<[number, number]>) {
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const [p1, p2] = [points[i], points[i + 1]];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

// The week's pressure or humidity as a curve, as in the app's chart: a button
// switches between the two, and the day of the big change is marked in red,
// with the change written above it.
export function WeatherChart({ title, days, pressure, humidity }: Props) {
  const [metric, setMetric] = useState<Metric>("pressure");
  const s = metric === "pressure" ? pressure : humidity;
  const n = s.values.length;
  const points = s.values.map((v, i) => [x(i, n), y(v, s)] as [number, number]);
  const line = curve(points);
  const [px, py] = points[s.peak];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-semibold text-ink-3">{title}</p>
        <div className="inline-flex rounded-full bg-surface-soft p-1" role="group">
          {(["pressure", "humidity"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMetric(m)}
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

      {/* Remounted on each switch, so the new curve fades in. */}
      <div key={metric} aria-hidden className="chart-fade relative mt-8 h-44 md:h-56">
        <svg viewBox={`0 0 ${W} 100`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id={`area-${metric}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={s.color} stopOpacity="0.45" />
              <stop offset="1" stopColor={s.color} stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <line
            x1={px}
            x2={px}
            y1={0}
            y2={100}
            stroke="#AAAAAA"
            strokeOpacity="0.6"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            vectorEffect="non-scaling-stroke"
          />
          <path d={`${line} L${points[n - 1][0]},100 L${points[0][0]},100 Z`} fill={`url(#area-${metric})`} />
          <path d={line} fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
        {/* The point and its label in HTML, so the stretched viewBox does
            not squash them. */}
        <span
          className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-danger shadow-[0_1px_3px_rgb(0_0_0/0.2)]"
          style={{ left: `${(px / W) * 100}%`, top: `${py}%` }}
        />
        <span
          className="absolute whitespace-nowrap rounded-full bg-danger px-3 py-1 text-sm font-bold text-white"
          style={{ left: `${(px / W) * 100}%`, top: `${py}%`, transform: "translate(-50%, calc(-100% - 14px))" }}
        >
          {s.change}
        </span>
      </div>

      <div aria-hidden className="mt-4 grid grid-cols-7 text-center">
        {days.map((day, i) => (
          <div key={day} className={i === s.peak ? "text-danger" : ""}>
            <p className={`text-sm first-letter:uppercase ${i === s.peak ? "" : "text-ink-3"}`}>{day}</p>
            <p className={`mt-1 text-sm font-bold tabular-nums md:text-lg ${i === s.peak ? "" : "text-ink"}`}>
              {s.values[i]}
              {metric === "humidity" && <span className="font-semibold">%</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
