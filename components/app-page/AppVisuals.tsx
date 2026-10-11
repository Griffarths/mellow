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

// What you feel: three answers in large, side by side.
export function FeelFigures() {
  const ui = useTranslations("appPage.ui");
  const locale = intlLocale(useLocale());
  const hours = new Intl.NumberFormat(locale, { style: "unit", unit: "hour", unitDisplay: "short" });
  const percent = new Intl.NumberFormat(locale, { style: "percent" });
  const figures: Array<[string, string | null, string]> = [
    [hours.format(9), null, ui("perAttack")],
    ["4", ui("outOfTotal", { total: TOTAL }), ui("intenseAttacks")],
    [percent.format(6 / TOTAL), null, ui("withNausea")],
  ];
  return (
    <div aria-hidden className="grid grid-cols-3 divide-x divide-surface-line">
      {figures.map(([value, suffix, caption], i) => (
        <div key={caption} className="app-pop px-2 text-center md:px-6" style={delay(i, 140)}>
          <p className="whitespace-nowrap text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
            {value}
            {suffix && <span className="ml-1.5 text-lg font-bold tracking-normal text-ink-3 md:text-2xl">{suffix}</span>}
          </p>
          <p className="mt-3 text-balance text-sm text-ink-3 md:text-base">{caption}</p>
        </div>
      ))}
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
