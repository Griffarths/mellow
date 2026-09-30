// Generates the printable migraine diary PDFs and their PNG previews.
// Usage: node scripts/diary/build.mjs   (needs Google Chrome and network for
// the Plus Jakarta Sans web font). Outputs to public/downloads and
// public/tools.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CHROME =
  process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const FLEUR = readFileSync(path.join(ROOT, "public/blobs/Fleur1.svg"), "utf8");

const T = {
  fr: {
    title: "Journal de migraine",
    docTitle: "Journal de migraine · Mellow",
    name: "Prénom",
    month: "Mois",
    year: "Année",
    intro: "Chaque jour de crise, note l'intensité de 1 à 10 en bas de la case et coche « Méd. » si tu as pris un médicament de crise. Tu peux aussi écrire un mot dans la case : jour de règles, mauvaise nuit, stress…",
    keyIntensity: "Intensité de la crise, de 1 à 10",
    keyMed: "Médicament de crise pris",
    medShort: "Méd.",
    summary: "Ce mois-ci",
    migraineDays: "Jours de migraine",
    medDays: "Jours avec médicament",
    note: "Plus de 10 jours avec un médicament de crise dans le mois ? Parles-en à ton médecin : c'est le seuil de l'abus médicamenteux.",
    logTitle: "Détail de mes crises",
    logIntro: "Une ligne par crise. Pour chaque médicament ou soulagement, coche s'il a aidé. Imprime cette page autant de fois que nécessaire.",
    cols: ["Date", "Début et fin", "Intensité", "Symptômes", "Déclencheurs possibles", "Médicament et heure", "Soulagement sans médicament"],
    helped: "Ça a aidé :",
    effect: ["Oui", "Un peu", "Non"],
    triggersLabel: "Déclencheurs fréquents",
    triggers: ["Stress", "Manque de sommeil", "Repas sauté", "Règles", "Météo", "Écrans", "Alcool", "Déshydratation", "Caféine", "Lumière intense"],
    symptomsLabel: "Symptômes fréquents",
    symptoms: ["Nausées", "Gêne à la lumière", "Gêne au bruit", "Aura visuelle", "Vertiges", "Douleur qui bat"],
    reliefLabel: "Soulagements fréquents",
    relief: ["Repos dans le noir", "Froid sur le front", "Respiration lente", "Sommeil", "Boire de l'eau", "Manger un peu"],
    footer: "Reprends le contrôle de tes migraines avec l'application",
  },
  en: {
    title: "Migraine diary",
    docTitle: "Migraine diary · Mellow",
    name: "Name",
    month: "Month",
    year: "Year",
    intro: "On each attack day, write the intensity from 1 to 10 at the bottom of the box and tick “Med” if you took an acute medication. You can also jot down a word in the box: period day, bad night, stress…",
    keyIntensity: "Attack intensity, 1 to 10",
    keyMed: "Acute medication taken",
    medShort: "Med",
    summary: "This month",
    migraineDays: "Migraine days",
    medDays: "Days with medication",
    note: "More than 10 days with acute medication this month? Talk to your doctor: that is the medication-overuse threshold.",
    logTitle: "Attack log",
    logIntro: "One row per attack. For each medication or relief, tick whether it helped. Print this page as many times as you need.",
    cols: ["Date", "Start and end", "Intensity", "Symptoms", "Possible triggers", "Medication and time", "Drug-free relief"],
    helped: "Helped:",
    effect: ["Yes", "A bit", "No"],
    triggersLabel: "Common triggers",
    triggers: ["Stress", "Lack of sleep", "Skipped meal", "Period", "Weather", "Screens", "Alcohol", "Dehydration", "Caffeine", "Bright light"],
    symptomsLabel: "Common symptoms",
    symptoms: ["Nausea", "Light sensitivity", "Noise sensitivity", "Visual aura", "Dizziness", "Throbbing pain"],
    reliefLabel: "Common relief",
    relief: ["Rest in the dark", "Cold on the forehead", "Slow breathing", "Sleep", "Drinking water", "Eating a little"],
    footer: "Take back control of your migraines with the app",
  },
};

const PAPER = {
  a4: { w: 210, h: 297 },
  letter: { w: 215.9, h: 279.4 },
};

const LINE = "#B5B5B5";
const GRID = "#D0D0D0";

function css(paper) {
  const { w, h } = PAPER[paper];
  return `
  @page { size: ${w}mm ${h}mm; margin: 0; }
  @page land { size: ${h}mm ${w}mm; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: "Plus Jakarta Sans", Helvetica, Arial, sans-serif; color: #000; }
  .page { width: ${w}mm; height: ${h}mm; padding: 13mm 13mm 11mm; display: flex; flex-direction: column; break-after: page; overflow: hidden; }
  .page:last-child { break-after: auto; }
  .page.land { page: land; width: ${h}mm; height: ${w}mm; padding: 10mm 13mm 9mm; }
  .page.land header svg { width: 11mm; height: 11mm; }
  .page.land h1 { font-size: 18pt; }
  .page.land .intro { margin-top: 2.5mm; max-width: none; }
  .page.land footer { margin-top: 3.5mm; }
  header { display: flex; align-items: center; gap: 4mm; }
  header svg { width: 15mm; height: 15mm; flex: none; }
  h1 { font-size: 22pt; font-weight: 800; letter-spacing: -0.02em; line-height: 1; }
  .fields { margin-top: 5mm; display: flex; gap: 8mm; font-size: 9.5pt; font-weight: 600; color: #333; }
  .field { display: flex; align-items: flex-end; gap: 2mm; }
  .field span.line { display: inline-block; width: 30mm; border-bottom: 0.35mm solid #999; height: 5mm; }
  .field.long span.line { width: 36mm; }
  .field.short span.line { width: 16mm; }
  .intro { margin-top: 4mm; font-size: 9pt; color: #555; line-height: 1.45; max-width: 160mm; }

  /* Page 1: legend samples mirror what sits in each day box. */
  .legend { margin-top: 4mm; display: flex; flex-wrap: wrap; gap: 3mm 7mm; font-size: 8.5pt; font-weight: 600; color: #333; }
  .legend > span { display: inline-flex; align-items: center; gap: 2mm; }
  .sample { display: inline-flex; align-items: center; gap: 0.8mm; height: 6.4mm; font-size: 7.5pt; font-weight: 700; color: #555; border: 0.3mm solid ${GRID}; border-radius: 1.5mm; padding: 0 1.6mm; }
  .sample i { display: inline-block; width: 6mm; height: 3.2mm; border-bottom: 0.35mm solid #888; margin-bottom: 0.8mm; }
  .day .int i { display: inline-block; width: 6mm; height: 3.6mm; border-bottom: 0.35mm solid #888; }
  .sample b, .day .med b { display: inline-block; width: 3.2mm; height: 3.2mm; border: 0.4mm solid #888; border-radius: 0.7mm; }
  .sample.med { font-size: 6.5pt; font-weight: 600; }
  .grid { margin-top: 5mm; flex: 1; display: grid; grid-template-columns: repeat(7, 1fr); grid-auto-rows: 1fr; gap: 2mm; }
  .day { border: 0.35mm solid ${LINE}; border-radius: 2.5mm; position: relative; }
  .day .n { position: absolute; left: 2mm; top: 1.6mm; font-size: 8.5pt; font-weight: 800; color: #333; }
  .day .med { position: absolute; right: 1.8mm; top: 1.8mm; display: flex; align-items: center; gap: 0.9mm; font-size: 6.5pt; font-weight: 600; color: #555; }
  .day .int { position: absolute; right: 1.8mm; bottom: 1.8mm; display: flex; align-items: flex-end; gap: 0.8mm; font-size: 7.5pt; font-weight: 700; color: #555; }
  .summary { grid-column: span 4; border-radius: 2.5mm; background: #FFEEF3; padding: 3mm 4mm; display: flex; flex-direction: column; justify-content: center; gap: 2.2mm; font-size: 9pt; font-weight: 600; }
  .summary .h { font-size: 8pt; text-transform: uppercase; letter-spacing: 0.08em; color: #B8505F; font-weight: 700; }
  .summary .row { display: flex; align-items: flex-end; gap: 2mm; }
  .summary .row span.line { flex: 1; max-width: 22mm; border-bottom: 0.35mm solid #C47A88; height: 4.5mm; }
  .note { margin-top: 4mm; font-size: 8.5pt; color: #444; line-height: 1.45; }

  /* Page 2: framed table with a regular grid. */
  .tbl { margin-top: 3.5mm; flex: 1; display: flex; border: 0.4mm solid ${LINE}; border-radius: 2.5mm; overflow: hidden; }
  table { flex: 1; width: 100%; border-collapse: collapse; table-layout: fixed; }
  th { text-align: left; vertical-align: bottom; font-size: 7.5pt; font-weight: 700; color: #222; line-height: 1.25; padding: 1.8mm 2mm; background: #F2F2F2; border-bottom: 0.4mm solid ${LINE}; border-right: 0.3mm solid ${GRID}; }
  td { position: relative; vertical-align: top; padding: 1.2mm 2mm; border-top: 0.3mm solid ${GRID}; border-right: 0.3mm solid ${GRID}; }
  th:last-child, td:last-child { border-right: none; }
  tbody tr:first-child td { border-top: none; }
  td .ten { position: absolute; right: 2mm; bottom: 1.3mm; font-size: 8pt; font-weight: 700; color: #777; }
  td .help { position: absolute; left: 2mm; right: 2mm; bottom: 1.3mm; display: flex; align-items: center; gap: 1.8mm; font-size: 6.5pt; color: #666; white-space: nowrap; }
  td .help span { display: inline-flex; align-items: center; gap: 0.8mm; }
  td .help b { display: inline-block; width: 2.6mm; height: 2.6mm; border: 0.35mm solid #888; border-radius: 0.6mm; }
  .chips { margin-top: 3.5mm; display: grid; grid-template-columns: auto 1fr; gap: 1.2mm 4mm; font-size: 7.5pt; }
  .chips .k { font-weight: 700; color: #333; white-space: nowrap; }
  .chips .v { color: #555; }
  footer { margin-top: 5mm; display: flex; align-items: center; gap: 2mm; font-size: 8pt; color: #767676; }
  footer svg { width: 5mm; height: 5mm; }
  footer strong { color: #000; }
  footer .site { margin-left: auto; font-weight: 700; color: #000; }
  `;
}

const logo = (cls = "") => FLEUR.replace("<svg", `<svg class="${cls}"`);

// Each day box: day number, "Med" tick box top right, intensity /10 bottom
// right, and free space in the middle for a word about the day.
function page1(t) {
  const days = Array.from({ length: 31 }, (_, i) =>
    `<div class="day"><span class="n">${i + 1}</span><span class="med"><b></b>${t.medShort}</span><span class="int"><i></i>/10</span></div>`,
  ).join("");
  return `
  <section class="page">
    <header>${logo()}<h1>${t.title}</h1></header>
    <div class="fields"><div class="field long">${t.name} <span class="line"></span></div><div class="field">${t.month} <span class="line"></span></div><div class="field short">${t.year} <span class="line"></span></div></div>
    <p class="intro">${t.intro}</p>
    <div class="legend">
      <span><span class="sample"><i></i>/10</span>${t.keyIntensity}</span>
      <span><span class="sample med"><b></b>${t.medShort}</span>${t.keyMed}</span>
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

// "Did it help?" sits inside the medication and the relief cells so it is
// clear which one helped.
function page2(t) {
  const widths = [8, 11, 8, 17, 17, 19.5, 19.5];
  const cols = t.cols.map((c, i) => `<th style="width:${widths[i]}%">${c}</th>`).join("");
  const help = `<div class="help">${t.helped}${t.effect.map((e) => `<span><b></b>${e}</span>`).join("")}</div>`;
  const rows = Array.from({ length: 10 }, () =>
    `<tr><td></td><td></td><td><span class="ten">/10</span></td><td></td><td></td><td>${help}</td><td>${help}</td></tr>`,
  ).join("");
  return `
  <section class="page land">
    <header>${logo()}<h1>${t.logTitle}</h1></header>
    <p class="intro">${t.logIntro}</p>
    <div class="tbl"><table><thead><tr>${cols}</tr></thead><tbody>${rows}</tbody></table></div>
    <div class="chips">
      <span class="k">${t.triggersLabel}</span><span class="v">${t.triggers.join(" · ")}</span>
      <span class="k">${t.symptomsLabel}</span><span class="v">${t.symptoms.join(" · ")}</span>
      <span class="k">${t.reliefLabel}</span><span class="v">${t.relief.join(" · ")}</span>
    </div>
    ${footer(t)}
  </section>`;
}

function footer(t) {
  return `<footer>${logo()}<strong>Mellow</strong><span>${t.footer}</span><span class="site">mellowmigraine.com</span></footer>`;
}

function html(locale, paper, pages) {
  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><title>${T[locale].docTitle}</title>
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
        "--force-device-scale-factor=2",
        `--screenshot=${path.join(ROOT, "public/tools", `diary-${o.preview}-p${n}.png`)}`,
        pathToFileURL(one).href,
      ]);
    }
  }
  console.log("built", o.file);
}

// Content hashes, appended as ?v= to the URLs so browsers and CDNs pick up
// regenerated files instead of cached ones.
const hashes = {};
for (const dir of ["public/downloads", "public/tools"]) {
  for (const file of readdirSync(path.join(ROOT, dir)).filter((f) => /\.(pdf|png)$/.test(f))) {
    const data = readFileSync(path.join(ROOT, dir, file));
    hashes[`/${dir.replace("public/", "")}/${file}`] = createHash("md5").update(data).digest("hex").slice(0, 8);
  }
}
writeFileSync(path.join(ROOT, "lib/diary-assets.json"), JSON.stringify(hashes, null, 2) + "\n");
console.log("wrote lib/diary-assets.json");
