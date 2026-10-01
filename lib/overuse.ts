import type { Rich } from "./migraine-test";

// Medication-overuse check based on ICHD-3 8.2: days per month with each
// acute medication class against its threshold, plus the rule for several
// classes none of which is overused alone (8.2.6). It orients, it does not
// diagnose.

export type MedClass = "paracetamol" | "nsaid" | "triptan" | "combo";
export const MED_CLASSES: MedClass[] = ["paracetamol", "nsaid", "triptan", "combo"];

// Days per month from which regular intake counts as overuse. Combination
// painkillers and opioids share the 10-day threshold, so they share a field.
export const THRESHOLDS: Record<MedClass, number> = {
  paracetamol: 15,
  nsaid: 15,
  triptan: 10,
  combo: 10,
};
export const SEVERAL_CLASSES_THRESHOLD = 10;
// Headache days per month in the ICHD-3 definition.
export const HEADACHE_DAYS = 15;
// "Close to a threshold": one or two days below it.
const NEAR = 2;

export type OveruseInput = {
  headacheDays: number;
  days: Record<MedClass, number>;
  // Days with at least one of them: a day with two drugs counts once.
  totalDays: number;
  threeMonthsOrMore: boolean;
};

export type OveruseStatus = "empty" | "below" | "near" | "over" | "moh";

export type Finding = {
  key: MedClass | "total";
  days: number;
  limit: number;
  over: boolean;
  near: boolean;
};

export function assess(input: OveruseInput): { status: OveruseStatus; findings: Finding[] } {
  const used = MED_CLASSES.filter((c) => input.days[c] > 0);
  if (used.length === 0) return { status: "empty", findings: [] };

  const finding = (key: Finding["key"], days: number, limit: number): Finding => ({
    key,
    days,
    limit,
    over: days >= limit,
    near: days < limit && days >= limit - NEAR,
  });
  const findings = used.map((c) => finding(c, input.days[c], THRESHOLDS[c]));
  if (used.length > 1) {
    findings.push(finding("total", input.totalDays, SEVERAL_CLASSES_THRESHOLD));
  }

  let status: OveruseStatus = "below";
  if (findings.some((f) => f.over)) {
    status =
      input.headacheDays >= HEADACHE_DAYS && input.threeMonthsOrMore ? "moh" : "over";
  } else if (findings.some((f) => f.near)) {
    status = "near";
  }
  return { status, findings };
}

// Bounds of the total: at least the busiest class, at most every class on
// different days (and never more than a month).
export function totalBounds(days: Record<MedClass, number>) {
  const values = MED_CLASSES.map((c) => days[c]);
  return {
    min: Math.max(...values),
    max: Math.min(31, values.reduce((a, b) => a + b, 0)),
  };
}

type Field = { label: string; hint?: string };

export type OveruseCopy = {
  intro: string;
  headache: Field;
  medsTitle: string;
  fields: Record<MedClass | "total", Field>;
  durationLabel: string;
  durationOptions: [string, string];
  decrease: string;
  increase: string;
  resultEyebrow: string;
  empty: string;
  findingLabel: Record<MedClass | "total", string>;
  // {days} and {limit} are replaced at render time.
  findingValue: string;
  results: Record<Exclude<OveruseStatus, "empty">, { title: string; text: string }>;
  appTitle: string;
  appText: string;
  disclaimer: string;
};

type Faq = { q: string; a: string };

export type OverusePageCopy = {
  path: string;
  navLabel: string;
  menuDescription: string;
  metaTitle: string;
  description: string;
  title: string;
  lead: string;
  thresholdsTitle: string;
  thresholdsIntro: Rich;
  table: { headers: [string, string]; rows: Array<[string, string]> };
  thresholdsNote: string;
  whatTitle: string;
  what: Rich[];
  faqTitle: string;
  faq: Faq[];
};
