// Screening quiz inspired by the ICHD-3 criteria for migraine without aura
// (1.1), migraine with aura (1.2), probable migraine (1.5), tension-type
// headache (2.x), chronic forms and medication overuse (8.2). It orients, it
// does not diagnose; red flags always win.

export type AnswerId = string;
export type Answers = Record<string, AnswerId | AnswerId[]>;

export type Rich = Array<string | { text: string; href: string }>;

type Option = { id: AnswerId; label: string; exclusive?: boolean };
export type Question = {
  id: string;
  title: string;
  hint?: string;
  multiple?: boolean;
  options: Option[];
};

export type ResultId =
  | "urgent"
  | "migraine"
  | "migraineAura"
  | "auraPossible"
  | "migraineProbable"
  | "tension"
  | "unclear";

export type Outcome = {
  result: ResultId;
  chronic: boolean;
  medicationOveruse: boolean;
};

export function score(a: Answers): Outcome {
  const one = (id: string) => (typeof a[id] === "string" ? (a[id] as string) : "");
  const flags = Array.isArray(a.redflags) ? a.redflags : [];

  const duration = one("duration");
  const location = one("location");
  const quality = one("quality");
  const intensity = one("intensity");
  const activity = one("activity");
  const nausea = one("nausea") === "yes";
  const senses = one("senses");
  const aura = one("aura");

  const chronic = one("frequency") === "15plus";
  const medicationOveruse = ["10to14", "15plus"].includes(one("medication"));

  if (flags.some((f) => f !== "none")) {
    return { result: "urgent", chronic, medicationOveruse };
  }

  // Migraine: B duration, C >= 2 pain features, D >= 1 associated symptom.
  const migraineB = ["4to72h", "unknown"].includes(duration);
  const migraineC =
    [
      location === "one",
      quality === "pulsating",
      ["moderate", "severe"].includes(intensity),
      activity === "yes",
    ].filter(Boolean).length >= 2;
  const migraineD = nausea || senses === "both";
  const migraineMet = [migraineB, migraineC, migraineD].filter(Boolean).length;
  const hasAura = ["often", "sometimes"].includes(aura);

  // Tension-type: 30 min to 7 days, >= 2 features, no nausea, not both
  // light and noise sensitivity.
  const tensionB = ["30mto4h", "4to72h", "over72h", "unknown"].includes(duration);
  const tensionC =
    [
      location === "both",
      quality === "pressing",
      ["mild", "moderate"].includes(intensity),
      activity === "no",
    ].filter(Boolean).length >= 2;
  const tensionD = !nausea && senses !== "both";

  let result: ResultId;
  if (migraineMet === 3) result = hasAura ? "migraineAura" : "migraine";
  else if (hasAura) result = "auraPossible";
  else if (tensionB && tensionC && tensionD) result = "tension";
  else if (migraineMet === 2) result = "migraineProbable";
  else result = "unclear";

  return { result, chronic, medicationOveruse };
}

export type TestCopy = {
  // {n} and {total} are replaced at render time.
  progress: string;
  back: string;
  next: string;
  seeResult: string;
  restart: string;
  resultEyebrow: string;
  disclaimer: string;
  appTitle: string;
  appText: string;
  questions: Question[];
  results: Record<ResultId, { title: string; text: string; links: Rich }>;
  chronicNote: Rich;
  overuseNote: Rich;
};
