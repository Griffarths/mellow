// Generates the printable migraine diary PDFs and their PNG previews.
// Usage: node scripts/diary/build.mjs   (needs Google Chrome and network for
// the Plus Jakarta Sans web font). Outputs to public/downloads and
// public/tools.
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CHROME =
  process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const FLEUR = readFileSync(path.join(ROOT, "public/blobs/Fleur1.svg"), "utf8");

const COLORS = { mild: "#F4C1D8", moderate: "#BFD4EE", severe: "#F1A6B1" };

const T = {
  fr: {
    title: "Journal de migraine",
    month: "Mois",
    year: "Année",
    intro: "Chaque jour de crise, colorie la pastille selon l'intensité. Coche la case si tu as pris un médicament de crise.",
    mild: "Légère (1 à 3)",
    moderate: "Modérée (4 à 6)",
    severe: "Intense (7 à 10)",
    med: "Médicament pris",
    summary: "Ce mois-ci",
    migraineDays: "Jours de migraine",
    medDays: "Jours avec médicament",
    note: "Plus de 10 jours avec un médicament de crise dans le mois ? Parles-en à ton médecin : c'est le seuil de l'abus médicamenteux.",
    logTitle: "Détail de mes crises",
    logIntro: "Une ligne par crise. Coche si le traitement a aidé, pour repérer ce qui marche vraiment pour toi.",
    cols: ["Date", "Début et fin", "Intensité", "Symptômes", "Déclencheurs possibles", "Traitement et heure", "Ça a aidé ?"],
    effect: ["Oui", "En partie", "Non"],
    triggersLabel: "Déclencheurs fréquents",
    triggers: ["Stress", "Manque de sommeil", "Repas sauté", "Règles", "Météo", "Écrans", "Alcool", "Déshydratation", "Caféine", "Lumière intense"],
    symptomsLabel: "Symptômes fréquents",
    symptoms: ["Nausées", "Gêne à la lumière", "Gêne au bruit", "Aura visuelle", "Vertiges", "Douleur qui bat"],
    footer: "Suis tes crises en deux taps avec l'app Mellow",
  },
  en: {
    title: "Migraine diary",
    month: "Month",
    year: "Year",
    intro: "On each attack day, colour in the dot by intensity. Tick the box if you took an acute medication.",
    mild: "Mild (1 to 3)",
    moderate: "Moderate (4 to 6)",
    severe: "Severe (7 to 10)",
    med: "Medication taken",
    summary: "This month",
    migraineDays: "Migraine days",
    medDays: "Days with medication",
    note: "More than 10 days with acute medication this month? Talk to your doctor: that is the medication-overuse threshold.",
    logTitle: "Attack log",
    logIntro: "One row per attack. Tick whether the treatment helped, to see what really works for you.",
    cols: ["Date", "Start and end", "Intensity", "Symptoms", "Possible triggers", "Treatment and time", "Did it help?"],
    effect: ["Yes", "Partly", "No"],
    triggersLabel: "Common triggers",
    triggers: ["Stress", "Lack of sleep", "Skipped meal", "Period", "Weather", "Screens", "Alcohol", "Dehydration", "Caffeine", "Bright light"],
    symptomsLabel: "Common symptoms",
    symptoms: ["Nausea", "Light sensitivity", "Noise sensitivity", "Visual aura", "Dizziness", "Throbbing pain"],
    footer: "Track your attacks in two taps with the Mellow app",
  },
};

const PAPER = {
  a4: { w: 210, h: 297 },
  letter: { w: 215.9, h: 279.4 },
};

function css(paper) {
  const { w, h } = PAPER[paper];
  return `
  @page { size: ${w}mm ${h}mm; margin: 0; }
  @page land { size: ${h}mm ${w}mm; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: "Plus Jakarta Sans", Helvetica, Arial, sans-serif; color: #000; }
  .page { width: ${w}mm; height: ${h}mm; padding: 13mm 13mm 11mm; display: flex; flex-direction: column; break-after: page; overflow: hidden; }
  .page.land { page: land; width: ${h}mm; height: ${w}mm; }
  .page:last-child { break-after: auto; }
  header { display: flex; align-items: center; gap: 4mm; }
  header svg { width: 15mm; height: 15mm; flex: none; }
  h1 { font-size: 22pt; font-weight: 800; letter-spacing: -0.02em; line-height: 1; }
  .fields { margin-left: auto; display: flex; gap: 6mm; font-size: 9.5pt; font-weight: 600; color: #444; }
  .field { display: flex; align-items: flex-end; gap: 2mm; }
  .field span.line { display: inline-block; width: 32mm; border-bottom: 0.35mm solid #BBB; height: 5mm; }
  .field.short span.line { width: 18mm; }
  .intro { margin-top: 4mm; font-size: 9pt; color: #555; line-height: 1.45; max-width: 150mm; }
  .legend { margin-top: 4mm; display: flex; flex-wrap: wrap; gap: 5mm; font-size: 8.5pt; font-weight: 600; color: #333; }
  .legend i { display: inline-block; width: 3.6mm; height: 3.6mm; border-radius: 50%; vertical-align: -0.6mm; margin-right: 1.5mm; }
  .legend b { display: inline-block; width: 3.2mm; height: 3.2mm; border: 0.35mm solid #999; border-radius: 0.8mm; vertical-align: -0.5mm; margin-right: 1.5mm; }
  .grid { margin-top: 5mm; flex: 1; display: grid; grid-template-columns: repeat(7, 1fr); grid-auto-rows: 1fr; gap: 2mm; }
  .day { border: 0.3mm solid #E2E2E2; border-radius: 2.5mm; position: relative; }
  .day .n { position: absolute; left: 2mm; top: 1.6mm; font-size: 8pt; font-weight: 700; color: #777; }
  .day .dot { position: absolute; left: 50%; top: 50%; width: 11mm; height: 11mm; transform: translate(-50%, -45%); border: 0.35mm dashed #CFCFCF; border-radius: 50%; }
  .day .med { position: absolute; right: 2mm; bottom: 2mm; width: 3.4mm; height: 3.4mm; border: 0.35mm solid #BBB; border-radius: 0.8mm; }
  .summary { grid-column: span 4; border-radius: 2.5mm; background: #FFEEF3; padding: 3mm 4mm; display: flex; flex-direction: column; justify-content: center; gap: 2.2mm; font-size: 9pt; font-weight: 600; }
  .summary .h { font-size: 8pt; text-transform: uppercase; letter-spacing: 0.08em; color: #B8505F; font-weight: 700; }
  .summary .row { display: flex; align-items: flex-end; gap: 2mm; }
  .summary .row span.line { flex: 1; max-width: 22mm; border-bottom: 0.35mm solid #D9A5B0; height: 4.5mm; }
  .note { margin-top: 4mm; font-size: 8.5pt; color: #444; line-height: 1.45; }
  table { margin-top: 5mm; width: 100%; border-collapse: separate; border-spacing: 0; table-layout: fixed; flex: 1; }
  th { text-align: left; font-size: 8pt; font-weight: 700; color: #333; padding: 2mm; background: #F4F4F4; }
  th:first-child { border-top-left-radius: 2mm; } th:last-child { border-top-right-radius: 2mm; }
  td { border-bottom: 0.3mm solid #E2E2E2; border-right: 0.3mm solid #EFEFEF; vertical-align: top; padding: 2mm; font-size: 8pt; color: #999; }
  td:last-child { border-right: none; }
  td.int { color: #999; }
  td.eff span { display: block; margin-bottom: 1.3mm; white-space: nowrap; }
  td.eff b { display: inline-block; width: 3mm; height: 3mm; border: 0.35mm solid #BBB; border-radius: 0.7mm; vertical-align: -0.5mm; margin-right: 1.3mm; }
  .chips { margin-top: 4mm; display: grid; grid-template-columns: auto 1fr; gap: 1.5mm 4mm; font-size: 8pt; }
  .chips .k { font-weight: 700; color: #333; white-space: nowrap; }
  .chips .v { color: #555; }
  footer { margin-top: 5mm; display: flex; align-items: center; gap: 2mm; font-size: 8pt; color: #767676; }
  footer svg { width: 5mm; height: 5mm; }
  footer strong { color: #000; }
  footer .site { margin-left: auto; font-weight: 700; color: #000; }
  `;
}

const logo = (cls = "") => FLEUR.replace("<svg", `<svg class="${cls}"`);

function page1(t) {
  const days = Array.from({ length: 31 }, (_, i) =>
    `<div class="day"><span class="n">${i + 1}</span><span class="dot"></span><span class="med"></span></div>`,
  ).join("");
  return `
  <section class="page">
    <header>${logo()}<h1>${t.title}</h1>
      <div class="fields"><div class="field">${t.month} <span class="line"></span></div><div class="field short">${t.year} <span class="line"></span></div></div>
    </header>
    <p class="intro">${t.intro}</p>
    <div class="legend">
      <span><i style="background:${COLORS.mild}"></i>${t.mild}</span>
      <span><i style="background:${COLORS.moderate}"></i>${t.moderate}</span>
      <span><i style="background:${COLORS.severe}"></i>${t.severe}</span>
      <span><b></b>${t.med}</span>
    </div>
    <div class="grid">${days}
      <div class="summary"><span class="h">${t.summary}</span>
        <div class="row">${t.migraineDays} <span class="line"></span></div>
        <div class="row">${t.medDays} <span class="line"></span></div>
      </div>
    </div>
    <p class="note">${t.note}</p>
    ${footer(t)}
  </section>`;
}

function page2(t) {
  const widths = [9, 12, 8, 21, 21, 17, 12];
  const cols = t.cols.map((c, i) => `<th style="width:${widths[i]}%">${c}</th>`).join("");
  const eff = t.effect.map((e) => `<span><b></b>${e}</span>`).join("");
  const rows = Array.from({ length: 7 }, () =>
    `<tr><td></td><td></td><td class="int">&nbsp;/10</td><td></td><td></td><td></td><td class="eff">${eff}</td></tr>`,
  ).join("");
  return `
  <section class="page land">
    <header>${logo()}<h1>${t.logTitle}</h1></header>
    <p class="intro">${t.logIntro}</p>
    <table><thead><tr>${cols}</tr></thead><tbody>${rows}</tbody></table>
    <div class="chips">
      <span class="k">${t.triggersLabel}</span><span class="v">${t.triggers.join(" · ")}</span>
      <span class="k">${t.symptomsLabel}</span><span class="v">${t.symptoms.join(" · ")}</span>
    </div>
    ${footer(t)}
  </section>`;
}

function footer(t) {
  return `<footer>${logo()}<strong>Mellow</strong><span>${t.footer}</span><span class="site">mellowmigraine.com</span></footer>`;
}

function html(locale, paper, pages) {
  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=block">
<style>${css(paper)}</style></head><body>${pages.join("")}</body></html>`;
}

function chrome(args) {
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--virtual-time-budget=8000", ...args], {
    stdio: "ignore",
  });
}

const work = path.join(tmpdir(), "mellow-diary");
rmSync(work, { recursive: true, force: true });
mkdirSync(work, { recursive: true });
mkdirSync(path.join(ROOT, "public/downloads"), { recursive: true });
mkdirSync(path.join(ROOT, "public/tools"), { recursive: true });

const OUTPUTS = [
  { locale: "fr", paper: "a4", file: "journal-de-migraine-mellow-a4.pdf", preview: "fr" },
  { locale: "en", paper: "letter", file: "migraine-diary-mellow-letter.pdf", preview: "en" },
  { locale: "en", paper: "a4", file: "migraine-diary-mellow-a4.pdf" },
];

for (const o of OUTPUTS) {
  const t = T[o.locale];
  const src = path.join(work, `${o.file}.html`);
  writeFileSync(src, html(o.locale, o.paper, [page1(t), page2(t)]));
  chrome(["--no-pdf-header-footer", `--print-to-pdf=${path.join(ROOT, "public/downloads", o.file)}`, pathToFileURL(src).href]);

  if (o.preview) {
    const { w, h } = PAPER[o.paper];
    const px = (mm) => Math.round((mm / 25.4) * 96);
    for (const [n, body, width, height] of [
      [1, page1(t), px(w), px(h)],
      [2, page2(t), px(h), px(w)],
    ]) {
      const one = path.join(work, `${o.preview}-p${n}.html`);
      writeFileSync(one, html(o.locale, o.paper, [body]));
      chrome([
        `--window-size=${width},${height}`,
        "--force-device-scale-factor=1.5",
        `--screenshot=${path.join(ROOT, "public/tools", `diary-${o.preview}-p${n}.png`)}`,
        pathToFileURL(one).href,
      ]);
    }
  }
  console.log("built", o.file);
}
