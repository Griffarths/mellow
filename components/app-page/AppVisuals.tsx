import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Blob } from "../phones/Blob";

// Simplified drawings of the app's screens for the /app page: only the key
// element of each screen, with the app's colours, mascots and wording
// (labels copied from the iOS app's strings, messages appPage.ui).

// Intl locale for dates: the site's "pt" is Portugal.
const intlLocale = (locale: string) => (locale === "pt" ? "pt-PT" : locale);

function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div
      aria-hidden
      className={`rounded-card bg-white p-5 shadow-soft ring-1 ring-surface-line ${className}`}
    >
      {children}
    </div>
  );
}

// "Do you have a migraine?": the mascot, the 1 to 10 bars and the save button.
export function LogVisual() {
  const ui = useTranslations("appPage.ui");
  return (
    <Card className="w-[280px] text-center">
      <p className="text-[17px] font-bold text-ink">{ui("recordQuestion")}</p>
      <Blob name="Croix1" className="mx-auto mt-4 h-20 w-20" />
      <div className="mt-5 flex items-end justify-center gap-1.5">
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className={`w-4 rounded-md ${i < 8 ? "bg-croix" : "bg-surface-soft"}`}
            style={{ height: 12 + i * 4 }}
          />
        ))}
      </div>
      <p className="mt-3">
        <span className="text-3xl font-extrabold text-ink">8</span>{" "}
        <span className="text-ink-3">{ui("intense")}</span>
      </p>
      <span className="mt-4 block rounded-xl bg-ink py-2.5 text-sm font-semibold text-white">
        {ui("save")}
      </span>
    </Card>
  );
}

// The small home screen widget.
export function WidgetVisual() {
  const ui = useTranslations("appPage.ui");
  return (
    <Card className="grid h-[180px] w-[180px] content-between !rounded-[30px] !p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[15px] font-bold leading-tight text-ink">{ui("widgetTitle")}</p>
        <Blob name="Fleur1" className="h-9 w-9 shrink-0" />
      </div>
      <span className="block rounded-full bg-ink py-2.5 text-center text-sm font-semibold text-white">
        {ui("widgetSave")}
      </span>
    </Card>
  );
}

// Completing an attack: a few tags per group.
export function CompleteVisual() {
  const ui = useTranslations("appPage.ui");
  const groups: Array<[string, string[]]> = [
    [ui("symptoms"), [ui("nausea"), ui("light")]],
    [ui("triggers"), [ui("stress"), ui("sleep")]],
    [ui("meds"), ["Sumatriptan 50 mg"]],
  ];
  return (
    <Card className="w-[300px] space-y-4">
      {groups.map(([label, tags]) => (
        <div key={label}>
          <p className="text-sm font-semibold text-ink-3">{label}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-fleur-tint px-3 py-1.5 text-sm font-semibold text-ink">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </Card>
  );
}

// One month of the calendar, attacks coloured by intensity (August 2026,
// as on the App Store screenshots: 8 migraines).
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

export function CalendarVisual() {
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
  return (
    <Card className="w-[310px]">
      <div className="flex items-baseline justify-between">
        <p className="font-bold text-ink first-letter:uppercase">{month}</p>
        <p className="text-sm text-ink-3">{ui("monthMigraines", { count: 8 })}</p>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-y-1.5 text-center text-xs">
        {weekdays.map((d, i) => (
          <span key={i} className="text-ink-4">
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
              className={`mx-auto grid h-7 w-7 place-items-center rounded-full text-[13px] text-ink ${level ? INTENSITY_BG[level] : ""}`}
            >
              {day}
            </span>
          );
        })}
      </div>
      <div className="mt-4 flex justify-center gap-4 text-xs text-ink-2">
        {(["mild", "moderate", "intense"] as const).map((level) => (
          <span key={level} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${INTENSITY_BG[level]}`} />
            {ui(level)}
          </span>
        ))}
      </div>
    </Card>
  );
}

// The analysis: three figures, then what brings relief, by efficacy.
export function UnderstandVisual() {
  const ui = useTranslations("appPage.ui");
  const stats: Array<[string, string]> = [
    ["7", ui("statMigraines")],
    ["7", ui("statDays")],
    ["6", ui("statIntensity")],
  ];
  const reliefs: Array<[string, number, string, string]> = [
    [ui("darkRest"), 4, "w-full", "bg-success"],
    ["Sumatriptan 50 mg", 3, "w-3/4", "bg-success/45"],
  ];
  return (
    <Card className="w-[310px]">
      <div className="grid grid-cols-3 divide-x divide-surface-line text-center">
        {stats.map(([value, label]) => (
          <div key={label} className="px-1">
            <p className="text-2xl font-extrabold text-ink">{value}</p>
            <p className="text-[11px] leading-tight text-ink-3">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-3">
        {reliefs.map(([name, times, width, color]) => (
          <div key={name}>
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-ink">{name}</span>
              <span className="text-ink-3">{ui("times", { count: times })}</span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-surface-soft">
              <div className={`h-2 rounded-full ${width} ${color}`} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] text-ink-2">
        {(
          [
            ["reliefHigh", "bg-success"],
            ["reliefMid", "bg-success/45"],
            ["reliefNone", "bg-surface-line"],
          ] as const
        ).map(([key, color]) => (
          <span key={key} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${color}`} />
            {ui(key)}
          </span>
        ))}
      </div>
    </Card>
  );
}

// Pressure over the next seven days, the arrow coloured by the change.
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

export function WeatherVisual() {
  const ui = useTranslations("appPage.ui");
  const locale = intlLocale(useLocale());
  const day = new Intl.DateTimeFormat(locale, { weekday: "short" });
  return (
    <Card className="w-[320px]">
      <p className="font-bold text-ink">{ui("weatherDays")}</p>
      <div className="mt-4 grid grid-cols-7 text-center">
        {PRESSURE.map(([hpa, trend], i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <span className="text-[11px] text-ink-3 first-letter:uppercase">
              {day.format(new Date(2026, 7, 3 + i)).replace(".", "")}
            </span>
            <svg viewBox="0 0 16 16" className={`h-5 w-5 ${ARROW[trend]}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 13V3M4 7l4-4 4 4" />
            </svg>
            <span className="text-[13px] font-semibold tabular-nums text-ink">{hpa}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-right text-[11px] text-ink-4">hPa</p>
    </Card>
  );
}

// The hugs line of the home screen, under the four Mellows.
export function CareVisual() {
  const ui = useTranslations("appPage.ui");
  return (
    <div aria-hidden className="w-[310px]">
      <div className="flex justify-center gap-3">
        {(["Fleur1", "Tagada1", "Croix1", "Humeur1"] as const).map((name) => (
          <Blob key={name} name={name} className="h-14 w-14" />
        ))}
      </div>
      <Card className="mt-5 flex items-center gap-3">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-fleur-accent" fill="currentColor">
          <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.5 3 5 6.4 5c2 0 3.4 1.1 4.1 2.3h3C14.2 6.1 15.6 5 17.6 5 21 5 23.1 8.5 21.6 11.8 19.5 16.4 12 21 12 21z" />
        </svg>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-ink">{ui("hugs", { count: 14 })}</p>
          <p className="text-sm text-ink-3">{ui("hugsAction")}</p>
        </div>
        <span className="text-ink-4">→</span>
      </Card>
    </div>
  );
}

// The reports screen: the three PDFs and the export button.
export function DoctorVisual() {
  const ui = useTranslations("appPage.ui");
  const reports = [ui("reportAnalysis"), ui("reportHistory"), ui("reportMidas")];
  return (
    <Card className="w-[300px]">
      <ul className="divide-y divide-surface-line">
        {reports.map((name, i) => (
          <li key={name} className="flex items-center gap-3 py-3 first:pt-0">
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-ink-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2.5H7a2.5 2.5 0 0 0-2.5 2.5v14A2.5 2.5 0 0 0 7 21.5h10a2.5 2.5 0 0 0 2.5-2.5V8z" />
              <path d="M14 2.5V8h5.5" />
            </svg>
            <span className="flex-1 font-semibold text-ink">{name}</span>
            {i === 0 && <span className="text-ink">✓</span>}
          </li>
        ))}
      </ul>
      <span className="mt-4 block rounded-xl bg-ink py-2.5 text-center text-sm font-semibold text-white">
        {ui("export")}
      </span>
    </Card>
  );
}
