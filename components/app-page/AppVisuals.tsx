import { useLocale, useTranslations } from "next-intl";
import { Blob } from "../phones/Blob";

// Drawings of the app for the /app page, laid right on the page (no card):
// the key element of each screen, with the app's colours, mascots and
// wording (labels copied from the iOS app's strings, messages appPage.ui).
// The .app-pop and .app-grow-x parts play once in view (Reveal).

// Intl locale for dates: the site's "pt" is Portugal.
const intlLocale = (locale: string) => (locale === "pt" ? "pt-PT" : locale);
const delay = (i: number, step = 70, start = 100) => ({ animationDelay: `${start + i * step}ms` });

// Completing an attack: the tags of the app, coloured by group.
const TAGS: Array<["symptoms" | "triggers" | "reliefs" | "meds", string]> = [
  ["symptoms", "nausea"],
  ["triggers", "stress"],
  ["symptoms", "light"],
  ["reliefs", "darkRest"],
  ["triggers", "sleep"],
  ["symptoms", "throbbing"],
  ["meds", "Sumatriptan 50 mg"],
  ["triggers", "screens"],
  ["symptoms", "sound"],
  ["reliefs", "icePack"],
  ["triggers", "menstrual"],
  ["symptoms", "dizziness"],
  ["triggers", "skippedMeal"],
  ["reliefs", "meditation"],
  ["symptoms", "visual"],
  ["triggers", "caffeine"],
];
const GROUP_BG = {
  symptoms: "bg-fleur",
  triggers: "bg-tagada",
  reliefs: "bg-sable",
  meds: "bg-croix",
};

export function TagCloud() {
  const ui = useTranslations("appPage.ui");
  return (
    <div aria-hidden>
      <div className="flex flex-wrap gap-2.5">
        {TAGS.map(([group, key], i) => (
          <span
            key={key}
            className={`app-pop rounded-full px-4 py-2 text-[15px] font-semibold text-ink ${GROUP_BG[group]}`}
            style={delay(i, 45)}
          >
            {key.includes(" ") ? key : ui(key)}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2">
        {(["symptoms", "triggers", "reliefs", "meds"] as const).map((group) => (
          <span key={group} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${GROUP_BG[group]}`} />
            {ui(group)}
          </span>
        ))}
      </div>
    </div>
  );
}

// One month of the calendar, large: attacks coloured by intensity (August
// 2026, as on the App Store screenshots: 8 migraines), popping in.
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
    <div aria-hidden className="mx-auto w-full max-w-xl">
      <div className="flex items-baseline justify-between px-2">
        <p className="text-xl font-bold text-ink first-letter:uppercase">{month}</p>
        <p className="text-ink-3">{ui("monthMigraines", { count: 8 })}</p>
      </div>
      <div className="mt-5 grid grid-cols-7 gap-y-2 text-center">
        {weekdays.map((d, i) => (
          <span key={i} className="pb-1 text-sm text-ink-4">
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
              className="relative mx-auto grid h-10 w-10 place-items-center text-[15px] text-ink md:h-14 md:w-14 md:text-lg"
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
      <div className="mt-6 flex justify-center gap-6 text-sm text-ink-2">
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

// The analysis: three large figures.
export function BigStats() {
  const ui = useTranslations("appPage.ui");
  const stats: Array<[string, string]> = [
    ["7", ui("statMigraines")],
    ["7", ui("statDays")],
    ["6", ui("statIntensity")],
  ];
  return (
    <div aria-hidden className="grid grid-cols-3 divide-x divide-surface-line">
      {stats.map(([value, label], i) => (
        <div key={label} className="app-pop px-2 text-center" style={delay(i, 140)}>
          <p className="text-6xl font-extrabold tracking-tight text-ink md:text-7xl">{value}</p>
          <p className="mt-2 text-sm text-ink-3">{label}</p>
        </div>
      ))}
    </div>
  );
}

// What brings relief, bars filling in by efficacy.
export function ReliefBars() {
  const ui = useTranslations("appPage.ui");
  const reliefs: Array<[string, number, string, string]> = [
    [ui("darkRest"), 4, "w-full", "bg-success"],
    ["Sumatriptan 50 mg", 3, "w-3/4", "bg-success/45"],
    [ui("icePack"), 1, "w-1/4", "bg-surface-line"],
  ];
  return (
    <div aria-hidden>
      <div className="space-y-5">
        {reliefs.map(([name, times, width, color], i) => (
          <div key={name}>
            <div className="flex justify-between">
              <span className="font-semibold text-ink">{name}</span>
              <span className="text-ink-3">{ui("times", { count: times })}</span>
            </div>
            <div className="mt-2 h-3 rounded-full bg-surface-soft">
              <div className={`app-grow-x h-3 rounded-full ${width} ${color}`} style={delay(i, 220, 300)} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-2">
        {(
          [
            ["reliefHigh", "bg-success"],
            ["reliefMid", "bg-success/45"],
            ["reliefNone", "bg-surface-line"],
          ] as const
        ).map(([key, color]) => (
          <span key={key} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${color}`} />
            {ui(key)}
          </span>
        ))}
      </div>
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
