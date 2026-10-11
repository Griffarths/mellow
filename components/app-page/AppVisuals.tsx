import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Blob } from "../phones/Blob";

// Drawings of the app for the /app page, laid right on the page (no card):
// the key element of each screen, with the app's colours, mascots and
// wording (labels copied from the iOS app's strings, messages appPage.ui).
// The .app-pop and .app-grow-x parts play once in view (Reveal).

// Intl locale for dates: the site's "pt" is Portugal.
const intlLocale = (locale: string) => (locale === "pt" ? "pt-PT" : locale);
const delay = (i: number, step = 70, start = 100) => ({ animationDelay: `${start + i * step}ms` });

// Completing an attack: the nine questions the app asks, in its order, each
// with a 3D emoji from Microsoft's Fluent Emoji (public/emoji; MIT licence,
// Copyright (c) Microsoft Corporation). Labels and questions are the app's
// own (messages appPage.ui.steps). Only the emojis pop in: the text is
// always visible.
const STEP_EMOJI = [
  "alarm_clock_3d",
  "thermometer_3d",
  "round_pushpin_3d",
  "sparkles_3d",
  "face_with_head-bandage_3d",
  "high_voltage_3d",
  "pill_3d",
  "relieved_face_3d",
  "spiral_calendar_3d",
];

export function CompleteGrid() {
  const ui = useTranslations("appPage.ui");
  const steps = ui.raw("steps") as Array<{ label: string; question: string }>;
  return (
    <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.label} className="flex items-center gap-4">
          <img
            src={`/emoji/${STEP_EMOJI[i]}.png`}
            alt=""
            aria-hidden
            width={256}
            height={256}
            loading="lazy"
            draggable={false}
            className="app-pop h-12 w-12 shrink-0 select-none md:h-14 md:w-14"
            style={delay(i, 70)}
          />
          <div className="min-w-0">
            <p className="text-lg font-bold text-ink">{step.label}</p>
            <p className="text-[15px] leading-snug text-ink-3">{step.question}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// One month of the calendar: attacks coloured by intensity (August 2026, as
// on the App Store screenshots: 8 migraines), popping in. Sized so the whole
// section fits on a laptop screen.
const ATTACKS: Record<number, "mild" | "moderate" | "intense"> = {
  2: "intense",
  5: "moderate",
  9: "mild",
  15: "intense",
  19: "moderate",
  23: "intense",
  26: "mild",
  30: "intense",
};
const INTENSITY_BG = { mild: "bg-fleur", moderate: "bg-tagada", intense: "bg-croix" };

export function BigCalendar() {
  const ui = useTranslations("appPage.ui");
  const locale = intlLocale(useLocale());
  const month = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(
    new Date(2026, 7, 1),
  );
  // Monday 3 to Sunday 9 August 2026, for the weekday initials.
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(new Date(2026, 7, 3 + i)),
  );
  const offset = 5; // 1 August 2026 is a Saturday.
  let n = 0;
  return (
    <div aria-hidden className="mx-auto w-full max-w-md">
      <div className="flex items-baseline justify-between px-2">
        <p className="text-lg font-bold text-ink first-letter:uppercase">{month}</p>
        <p className="text-ink-3">{ui("monthMigraines", { count: 8 })}</p>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-y-1 text-center">
        {weekdays.map((d, i) => (
          <span key={i} className="text-sm text-ink-4">
            {d}
          </span>
        ))}
        {Array.from({ length: offset }, (_, i) => (
          <span key={`e${i}`} />
        ))}
        {Array.from({ length: 31 }, (_, i) => {
          const day = i + 1;
          const level = ATTACKS[day];
          return (
            <span
              key={day}
              className="relative mx-auto grid h-9 w-9 place-items-center text-[15px] text-ink md:h-10 md:w-10 md:text-base"
            >
              {level && (
                <span
                  className={`app-pop absolute inset-0 rounded-full ${INTENSITY_BG[level]}`}
                  style={delay(n++, 110, 200)}
                />
              )}
              <span className="relative">{day}</span>
            </span>
          );
        })}
      </div>
      <div className="mt-4 flex justify-center gap-6 text-sm text-ink-2">
        {(["mild", "moderate", "intense"] as const).map((level) => (
          <span key={level} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${INTENSITY_BG[level]}`} />
            {ui(level)}
          </span>
        ))}
      </div>
    </div>
  );
}

// The analysis, as in the app (AnalyseDetaillee): one example month of 8
// migraines, the one in the calendar above.
const TOTAL = 8;

// What keeps coming back: the potential triggers, each with its share of the
// migraines in red, paler the rarer it is (like the app's rows), then what
// is logged together.
const TRIGGERS: Array<["stress" | "sleepLack" | "screens", number]> = [
  ["stress", 5],
  ["sleepLack", 4],
  ["screens", 3],
];

export function TriggerList() {
  const ui = useTranslations("appPage.ui");
  const percent = new Intl.NumberFormat(intlLocale(useLocale()), { style: "percent" });
  const max = TRIGGERS[0][1];
  return (
    <div aria-hidden>
      <p className="text-sm font-semibold text-ink-3">{ui("triggersTitle")}</p>
      <ul className="mt-2 divide-y divide-surface-line">
        {TRIGGERS.map(([key, count], i) => (
          <li key={key} className="flex items-center gap-5 py-4">
            <span
              className="app-pop w-20 shrink-0 text-3xl font-extrabold tabular-nums tracking-tight text-danger md:text-4xl"
              style={delay(i, 140)}
            >
              <span style={{ opacity: 0.35 + (0.65 * count) / max }}>{percent.format(count / TOTAL)}</span>
            </span>
            <span>
              <span className="block text-lg font-bold text-ink">{ui(key)}</span>
              <span className="block text-ink-3">{ui("share", { count, total: TOTAL })}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm font-semibold text-ink-3">{ui("together")}</p>
      <div className="app-pop mt-3 flex items-start gap-4" style={delay(3, 140)}>
        <svg viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 text-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3.2-3.2a4.5 4.5 0 0 0-6.4-6.4L12 5.6" />
          <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3.2 3.2a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" />
        </svg>
        <span>
          <span className="block text-lg font-bold text-ink">
            {ui("stress")} · {ui("sleepLack")}
          </span>
          <span className="block text-ink-3">{ui("togetherDetail", { count: 3, total: TOTAL })}</span>
        </span>
      </div>
    </div>
  );
}

// What you feel: three answers in large, each over its little chart from the
// app (the durations bar, the intensities from 1 to 10, the symptoms). Side
// by side on a computer; on a phone one answer per row, the chart beside it.
const DURATIONS: Array<["durShort" | "durDay" | "durLong", number, string]> = [
  ["durShort", 5, "bg-surface-grouped"],
  ["durDay", 2, "bg-tagada"],
  ["durLong", 1, "bg-danger/75"],
];
// How many of the 8 migraines got each score, 1 to 10 (the calendar's ones),
// written above each bar as in the app.
const INTENSITIES = [0, 1, 1, 0, 1, 1, 1, 2, 1, 0];
const intensityBg = (score: number) => (score <= 3 ? "bg-fleur" : score <= 6 ? "bg-tagada" : "bg-croix");

function Feel({
  value,
  suffix,
  caption,
  index,
  children,
}: {
  value: string;
  suffix?: string;
  caption: string;
  index: number;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-x-6 py-7 first:pt-0 last:pb-0 md:block md:px-8 md:py-0 md:first:pl-0 md:last:pr-0">
      <div className="app-pop" style={delay(index, 140)}>
        <p className="whitespace-nowrap text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
          {value}
          {suffix && <span className="ml-1.5 text-lg font-bold tracking-normal text-ink-3 md:text-2xl">{suffix}</span>}
        </p>
        <p className="mt-2 text-sm leading-snug text-ink-3 md:text-base">{caption}</p>
      </div>
      <div className="md:mt-6">{children}</div>
    </div>
  );
}

export function FeelFigures() {
  const ui = useTranslations("appPage.ui");
  const locale = intlLocale(useLocale());
  const hours = new Intl.NumberFormat(locale, { style: "unit", unit: "hour", unitDisplay: "short" });
  const percent = new Intl.NumberFormat(locale, { style: "percent" });
  return (
    <div aria-hidden className="grid divide-y divide-surface-line md:grid-cols-3 md:divide-x md:divide-y-0">
      <Feel value={hours.format(9)} caption={ui("perAttack")} index={0}>
        <div className="flex h-3 gap-[3px]">
          {DURATIONS.map(([key, count, bg], i) => (
            <div
              key={key}
              className={`app-grow-x rounded ${bg}`}
              style={{ flex: `${count} 1 0`, ...delay(i, 150, 300) }}
            />
          ))}
        </div>
        <ul className="mt-3 space-y-1.5 text-sm">
          {DURATIONS.map(([key, count, bg]) => (
            <li key={key} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${bg}`} />
              <span className="text-ink-2">{ui(key)}</span>
              <span className="ml-auto font-semibold tabular-nums text-ink-3">{count}</span>
            </li>
          ))}
        </ul>
      </Feel>

      <Feel value="4" suffix={ui("outOfTotal", { total: TOTAL })} caption={ui("intenseAttacks")} index={1}>
        <div className="flex items-end gap-1">
          {INTENSITIES.map((count, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs font-semibold tabular-nums text-ink-3">{count || "\u00a0"}</span>
              <div
                className={`w-full rounded-[3px] ${count ? `app-grow-y ${intensityBg(i + 1)}` : "bg-surface-grouped"}`}
                style={count ? { height: count * 28, ...delay(i, 60, 300) } : { height: 4 }}
              />
            </div>
          ))}
        </div>
        <div className="mt-1.5 flex gap-1 text-center text-xs tabular-nums text-ink-4">
          {INTENSITIES.map((_, i) => (
            <span key={i} className="flex-1">
              {i + 1}
            </span>
          ))}
        </div>
      </Feel>

      <Feel value={percent.format(6 / TOTAL)} caption={ui("withNausea")} index={2}>
        <ul className="divide-y divide-surface-line text-sm md:text-[15px]">
          {(
            [
              ["lightSensitivity", 5],
              ["soundSensitivity", 4],
            ] as const
          ).map(([key, count]) => (
            <li key={key} className="flex items-baseline justify-between gap-3 py-2 first:pt-0">
              <span className="text-ink-2">{ui(key)}</span>
              <span className="font-semibold tabular-nums text-ink-3">{percent.format(count / TOTAL)}</span>
            </li>
          ))}
        </ul>
      </Feel>
    </div>
  );
}

// What works, or not: the best medication and the best method in green, what
// had no effect in red, as in the app's list.
export function ReliefList() {
  const ui = useTranslations("appPage.ui");
  const rows: Array<[string, boolean, number, number]> = [
    ["Sumatriptan 50 mg", true, 5, 6],
    [ui("darkRest"), true, 4, 4],
    [ui("icePack"), false, 3, 4],
  ];
  return (
    <div aria-hidden>
      <p className="text-sm font-semibold text-ink-3">{ui("reliefBest")}</p>
      <ul className="mt-2 divide-y divide-surface-line">
        {rows.map(([name, works, count, total], i) => (
          <li key={name} className="flex items-start gap-4 py-4">
            <svg
              viewBox="0 0 24 24"
              className={`app-pop mt-0.5 h-7 w-7 shrink-0 ${works ? "text-success" : "text-danger"}`}
              style={delay(i, 140)}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9.5" />
              <path d={works ? "m8 12.5 2.8 2.8L16.5 9.5" : "m9 9 6 6m0-6-6 6"} />
            </svg>
            <span>
              <span className="block text-lg font-bold text-ink">{name}</span>
              <span className="block text-ink-3">
                {ui(works ? "effective" : "noEffect", { count, total })}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// The medication doses month by month, the line at 10 a month behind the bars
// (as in the app: the bars only turn red above it).
const DOSES = [3, 5, 4, 7, 5, 6]; // March to August 2026.
const CEILING = 12;

export function MedsChart() {
  const ui = useTranslations("appPage.ui");
  const month = new Intl.DateTimeFormat(intlLocale(useLocale()), { month: "short" });
  return (
    <div aria-hidden>
      <p className="text-sm font-semibold text-ink-3">{ui("medsTitle")}</p>
      <div className="relative mt-6 h-40">
        <div
          className="absolute inset-x-0 border-t-2 border-dashed border-danger"
          style={{ bottom: `${(10 / CEILING) * 100}%` }}
        >
          <span className="absolute -top-6 right-0 text-sm font-bold text-danger">10</span>
        </div>
        <div className="relative flex h-full items-end gap-3 md:gap-4">
          {DOSES.map((doses, i) => (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <span className="text-sm font-semibold tabular-nums text-ink-3">{doses}</span>
              <div
                className="app-grow-y w-full rounded-md bg-tagada"
                style={{ height: `${(doses / CEILING) * 100}%`, ...delay(i, 90, 200) }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex gap-3 md:gap-4">
        {DOSES.map((_, i) => (
          <span key={i} className="flex-1 text-center text-sm text-ink-4 first-letter:uppercase">
            {month.format(new Date(2026, 2 + i, 1)).replace(".", "")}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm text-ink-3">{ui("medsLine")}</p>
    </div>
  );
}

// Pressure over the next seven days, across the page: one column per day,
// the arrow coloured by the change.
const PRESSURE: Array<[number, "up" | "down" | "drop"]> = [
  [1016, "up"],
  [1012, "down"],
  [1006, "drop"],
  [1009, "up"],
  [1014, "up"],
  [1013, "down"],
  [1017, "up"],
];
// The arrow points up; turned to ↗ when pressure rises, ↘ when it falls.
const ARROW = {
  up: "rotate-45 text-tagada-accent",
  down: "rotate-[135deg] text-sable-accent",
  drop: "rotate-[135deg] text-croix-accent",
};

export function WeatherBand() {
  const locale = intlLocale(useLocale());
  const day = new Intl.DateTimeFormat(locale, { weekday: "short" });
  return (
    <div aria-hidden className="grid grid-cols-7 divide-x divide-surface-line">
      {PRESSURE.map(([hpa, trend], i) => (
        <div key={i} className="app-pop flex flex-col items-center gap-3 py-2" style={delay(i, 100)}>
          <span className="text-sm text-ink-3 first-letter:uppercase">
            {day.format(new Date(2026, 7, 3 + i)).replace(".", "")}
          </span>
          <svg viewBox="0 0 16 16" className={`h-8 w-8 md:h-10 md:w-10 ${ARROW[trend]}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 13V3M4 7l4-4 4 4" />
          </svg>
          <span className="text-base font-bold tabular-nums text-ink md:text-xl">{hpa}</span>
        </div>
      ))}
    </div>
  );
}

// The four Mellows, each with something the app does between attacks.
const CARE_MELLOWS = ["Fleur1", "Tagada1", "Croix1", "Humeur1"] as const;

export function MellowsCare({ items }: { items: Array<{ title: string; text: string }> }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
      {items.map((item, i) => (
        <div key={item.title} className="text-center">
          <span className="app-pop inline-block" style={delay(i, 140)}>
            <Blob name={CARE_MELLOWS[i]} className="mx-auto h-24 w-24 md:h-28 md:w-28" />
          </span>
          <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

// The three reports, as in the app's Reports screen.
export function ReportsList() {
  const ui = useTranslations("appPage.ui");
  const reports: Array<[string, string]> = [
    [ui("reportAnalysis"), ui("reportAnalysisSub")],
    [ui("reportHistory"), ui("reportHistorySub")],
    [ui("reportMidas"), ui("reportMidasSub")],
  ];
  return (
    <ul aria-hidden className="divide-y divide-surface-line">
      {reports.map(([name, sub], i) => (
        <li key={name} className="app-pop flex items-center gap-5 py-5" style={delay(i, 140)}>
          <span className="grid h-14 w-12 shrink-0 place-items-center rounded-lg bg-croix text-[11px] font-bold tracking-wide text-ink">
            PDF
          </span>
          <span>
            <span className="block text-lg font-bold text-ink">{name}</span>
            <span className="block text-ink-3">{sub}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
