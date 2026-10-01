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
    cycle: {
      title: "Migraine et règles",
      docTitle: "Journal migraine et règles · Mellow",
      intro: "Une ligne par mois. Coche « Règles » les jours de règles, note l'intensité de chaque crise de 1 à 10 et coche « Méd. » si tu as pris un médicament de crise.",
      month: "Mois",
      periods: "Règles",
      attack: "Crise /10",
      med: "Méd.",
      summaryTitle: "Bilan, cycle par cycle",
      cycle: "Cycle",
      firstDay: "Premier jour des règles",
      window: "Crise entre 2 jours avant et 3 jours après ?",
      yes: "Oui",
      no: "Non",
      conclusion: "Oui pour au moins 2 cycles sur 3 ? Parles-en à ton médecin : c'est la définition de la migraine menstruelle.",
    },
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
    cycle: {
      title: "Migraine and periods",
      docTitle: "Menstrual migraine diary · Mellow",
      intro: "One row per month. Tick “Period” on period days, write the intensity of each attack from 1 to 10 and tick “Med” if you took an acute medication.",
      month: "Month",
      periods: "Period",
      attack: "Attack /10",
      med: "Med",
      summaryTitle: "Cycle-by-cycle summary",
      cycle: "Cycle",
      firstDay: "First day of period",
      window: "Attack between 2 days before and 3 days after?",
      yes: "Yes",
      no: "No",
      conclusion: "Yes for at least 2 cycles out of 3? Talk to your doctor: that is the definition of menstrual migraine.",
    },
  },
  de: {
    title: "Migränetagebuch",
    docTitle: "Migränetagebuch · Mellow",
    name: "Vorname",
    month: "Monat",
    year: "Jahr",
    intro: "Trage an jedem Attackentag die Stärke von 1 bis 10 unten im Kästchen ein und kreuze „Med.“ an, wenn du ein Akutmedikament genommen hast. Du kannst auch ein Wort ins Kästchen schreiben: Periode, schlechte Nacht, Stress…",
    keyIntensity: "Stärke der Attacke, von 1 bis 10",
    keyMed: "Akutmedikament genommen",
    medShort: "Med.",
    summary: "Diesen Monat",
    migraineDays: "Migränetage",
    medDays: "Tage mit Medikament",
    note: "Mehr als 10 Tage mit einem Akutmedikament in diesem Monat? Sprich mit deinem Arzt darüber: Das ist die Schwelle für einen Medikamentenübergebrauch.",
    logTitle: "Meine Attacken im Detail",
    logIntro: "Eine Zeile pro Attacke. Kreuze bei jedem Medikament und jeder Linderung an, ob es geholfen hat. Drucke diese Seite so oft aus, wie du sie brauchst.",
    cols: ["Datum", "Beginn und Ende", "Stärke", "Symptome", "Mögliche Auslöser", "Medikament und Uhrzeit", "Linderung ohne Medikament"],
    helped: "Geholfen:",
    effect: ["Ja", "Etwas", "Nein"],
    triggersLabel: "Häufige Auslöser",
    triggers: ["Stress", "Schlafmangel", "Ausgelassene Mahlzeit", "Periode", "Wetter", "Bildschirme", "Alkohol", "Zu wenig getrunken", "Koffein", "Grelles Licht"],
    symptomsLabel: "Häufige Symptome",
    symptoms: ["Übelkeit", "Lichtempfindlichkeit", "Lärmempfindlichkeit", "Visuelle Aura", "Schwindel", "Pochender Schmerz"],
    reliefLabel: "Häufige Linderung",
    relief: ["Ruhe im Dunkeln", "Kälte auf der Stirn", "Langsames Atmen", "Schlaf", "Wasser trinken", "Etwas essen"],
    footer: "Nimm mit der App die Kontrolle über deine Migräne zurück",
    cycle: {
      title: "Migräne und Periode",
      docTitle: "Tagebuch für Menstruationsmigräne · Mellow",
      intro: "Eine Zeile pro Monat. Kreuze an den Tagen deiner Periode „Periode“ an, trage die Stärke jeder Attacke von 1 bis 10 ein und kreuze „Med.“ an, wenn du ein Akutmedikament genommen hast.",
      month: "Monat",
      periods: "Periode",
      attack: "Attacke /10",
      med: "Med.",
      summaryTitle: "Auswertung, Zyklus für Zyklus",
      cycle: "Zyklus",
      firstDay: "Erster Tag der Periode",
      window: "Attacke zwischen 2 Tagen davor und 3 Tagen danach?",
      yes: "Ja",
      no: "Nein",
      conclusion: "Ja in mindestens 2 von 3 Zyklen? Sprich mit deinem Arzt darüber: Das ist die Definition der Menstruationsmigräne.",
    },
  },
  it: {
    title: "Diario dell'emicrania",
    docTitle: "Diario dell'emicrania · Mellow",
    name: "Nome",
    month: "Mese",
    year: "Anno",
    intro: "In ogni giorno di attacco, annota l'intensità da 1 a 10 in basso nella casella e spunta «Farm.» se hai preso un farmaco per l'attacco. Puoi anche scrivere una parola nella casella: ciclo, notte difficile, stress…",
    keyIntensity: "Intensità dell'attacco, da 1 a 10",
    keyMed: "Farmaco per l'attacco assunto",
    medShort: "Farm.",
    summary: "Questo mese",
    migraineDays: "Giorni di emicrania",
    medDays: "Giorni con farmaci",
    note: "Più di 10 giorni con un farmaco per l'attacco nel mese? Parlane con il tuo medico: è la soglia dell'uso eccessivo di farmaci.",
    logTitle: "I miei attacchi nel dettaglio",
    logIntro: "Una riga per attacco. Per ogni farmaco o sollievo, spunta se ha aiutato. Stampa questa pagina tutte le volte che serve.",
    cols: ["Data", "Inizio e fine", "Intensità", "Sintomi", "Possibili fattori scatenanti", "Farmaco e ora", "Sollievo senza farmaci"],
    helped: "Ha aiutato:",
    effect: ["Sì", "Un po'", "No"],
    triggersLabel: "Fattori scatenanti frequenti",
    triggers: ["Stress", "Mancanza di sonno", "Pasto saltato", "Ciclo", "Meteo", "Schermi", "Alcol", "Disidratazione", "Caffeina", "Luce intensa"],
    symptomsLabel: "Sintomi frequenti",
    symptoms: ["Nausea", "Fastidio alla luce", "Fastidio ai rumori", "Aura visiva", "Vertigini", "Dolore pulsante"],
    reliefLabel: "Sollievi frequenti",
    relief: ["Riposo al buio", "Freddo sulla fronte", "Respirazione lenta", "Sonno", "Bere acqua", "Mangiare qualcosa"],
    footer: "Riprendi il controllo delle tue emicranie con l'app",
    cycle: {
      title: "Emicrania e ciclo",
      docTitle: "Diario dell'emicrania mestruale · Mellow",
      intro: "Una riga per mese. Spunta «Mestruazioni» nei giorni di mestruazioni, annota l'intensità di ogni attacco da 1 a 10 e spunta «Farm.» se hai preso un farmaco per l'attacco.",
      month: "Mese",
      periods: "Mestruazioni",
      attack: "Attacco /10",
      med: "Farm.",
      summaryTitle: "Bilancio, ciclo per ciclo",
      cycle: "Ciclo",
      firstDay: "Primo giorno delle mestruazioni",
      window: "Attacco tra 2 giorni prima e 3 giorni dopo?",
      yes: "Sì",
      no: "No",
      conclusion: "Sì in almeno 2 cicli su 3? Parlane con il tuo medico: è la definizione dell'emicrania mestruale.",
    },
  },
  es: {
    title: "Diario de migraña",
    docTitle: "Diario de migraña · Mellow",
    name: "Nombre",
    month: "Mes",
    year: "Año",
    intro: "Cada día de crisis, anota la intensidad del 1 al 10 en la parte de abajo de la casilla y marca «Med.» si has tomado un medicamento para la crisis. También puedes escribir una palabra en la casilla: día de regla, mala noche, estrés…",
    keyIntensity: "Intensidad de la crisis, del 1 al 10",
    keyMed: "Toma de medicamento para la crisis",
    medShort: "Med.",
    summary: "Este mes",
    migraineDays: "Días de migraña",
    medDays: "Días con medicamento",
    note: "¿Más de 10 días con un medicamento para la crisis este mes? Coméntalo con tu médico: es el umbral del abuso de medicación.",
    logTitle: "Mis crisis en detalle",
    logIntro: "Una fila por crisis. Para cada medicamento o alivio, marca si ha ayudado. Imprime esta página tantas veces como necesites.",
    cols: ["Fecha", "Inicio y fin", "Intensidad", "Síntomas", "Posibles desencadenantes", "Medicamento y hora", "Alivio sin medicamentos"],
    helped: "¿Ha ayudado?",
    effect: ["Sí", "Un poco", "No"],
    triggersLabel: "Desencadenantes frecuentes",
    triggers: ["Estrés", "Falta de sueño", "Saltarse una comida", "Regla", "Meteorología", "Pantallas", "Alcohol", "Deshidratación", "Cafeína", "Luz intensa"],
    symptomsLabel: "Síntomas frecuentes",
    symptoms: ["Náuseas", "Molestia con la luz", "Molestia con el ruido", "Aura visual", "Mareos", "Dolor pulsátil"],
    reliefLabel: "Alivios frecuentes",
    relief: ["Descanso a oscuras", "Frío en la frente", "Respiración lenta", "Dormir", "Beber agua", "Comer algo"],
    footer: "Recupera el control de tus migrañas con la app",
    cycle: {
      title: "Migraña y regla",
      docTitle: "Diario de migraña menstrual · Mellow",
      intro: "Una fila por mes. Marca «Regla» los días de regla, anota la intensidad de cada crisis del 1 al 10 y marca «Med.» si has tomado un medicamento para la crisis.",
      month: "Mes",
      periods: "Regla",
      attack: "Crisis /10",
      med: "Med.",
      summaryTitle: "Balance, ciclo a ciclo",
      cycle: "Ciclo",
      firstDay: "Primer día de la regla",
      window: "¿Crisis entre 2 días antes y 3 días después?",
      yes: "Sí",
      no: "No",
      conclusion: "¿Sí en al menos 2 de cada 3 ciclos? Coméntalo con tu médico: es la definición de la migraña menstrual.",
    },
  },
  "es-419": {
    title: "Diario de migraña",
    docTitle: "Diario de migraña · Mellow",
    name: "Nombre",
    month: "Mes",
    year: "Año",
    intro: "Cada día de crisis, anota la intensidad del 1 al 10 en la parte de abajo de la casilla y marca “Med.” si tomaste un medicamento para la crisis. También puedes escribir una palabra en la casilla: día de periodo, mala noche, estrés…",
    keyIntensity: "Intensidad de la crisis, del 1 al 10",
    keyMed: "Tomé un medicamento para la crisis",
    medShort: "Med.",
    summary: "Este mes",
    migraineDays: "Días de migraña",
    medDays: "Días con medicamento",
    note: "¿Más de 10 días con un medicamento para la crisis este mes? Coméntalo con tu médico: es el umbral del uso excesivo de medicamentos.",
    logTitle: "Mis crisis en detalle",
    logIntro: "Una fila por crisis. Para cada medicamento o alivio, marca si ayudó. Imprime esta página todas las veces que necesites.",
    cols: ["Fecha", "Inicio y fin", "Intensidad", "Síntomas", "Posibles desencadenantes", "Medicamento y hora", "Alivio sin medicamentos"],
    helped: "¿Ayudó?",
    effect: ["Sí", "Un poco", "No"],
    triggersLabel: "Desencadenantes frecuentes",
    triggers: ["Estrés", "Falta de sueño", "Saltarse una comida", "Periodo", "Clima", "Pantallas", "Alcohol", "Deshidratación", "Cafeína", "Luz intensa"],
    symptomsLabel: "Síntomas frecuentes",
    symptoms: ["Náuseas", "Molestia con la luz", "Molestia con el ruido", "Aura visual", "Mareo", "Dolor pulsátil"],
    reliefLabel: "Alivios frecuentes",
    relief: ["Descansar a oscuras", "Frío en la frente", "Respiración lenta", "Dormir", "Tomar agua", "Comer algo"],
    footer: "Recupera el control de tus migrañas con la app",
    cycle: {
      title: "Migraña y periodo",
      docTitle: "Diario de migraña menstrual · Mellow",
      intro: "Una fila por mes. Marca “Periodo” los días de periodo, anota la intensidad de cada crisis del 1 al 10 y marca “Med.” si tomaste un medicamento para la crisis.",
      month: "Mes",
      periods: "Periodo",
      attack: "Crisis /10",
      med: "Med.",
      summaryTitle: "Resumen, ciclo por ciclo",
      cycle: "Ciclo",
      firstDay: "Primer día del periodo",
      window: "¿Crisis entre 2 días antes y 3 días después?",
      yes: "Sí",
      no: "No",
      conclusion: "¿Sí en al menos 2 de cada 3 ciclos? Coméntalo con tu médico: es la definición de la migraña menstrual.",
    },
  },
  pt: {
    title: "Diário de enxaqueca",
    docTitle: "Diário de enxaqueca · Mellow",
    name: "Nome",
    month: "Mês",
    year: "Ano",
    intro: "Em cada dia de crise, anota a intensidade de 1 a 10 na parte de baixo da caixa e assinala «Med.» se tomaste um medicamento para a crise. Também podes escrever uma palavra na caixa: dia de período, noite mal dormida, stress…",
    keyIntensity: "Intensidade da crise, de 1 a 10",
    keyMed: "Toma de medicamento para a crise",
    medShort: "Med.",
    summary: "Este mês",
    migraineDays: "Dias de enxaqueca",
    medDays: "Dias com medicação",
    note: "Mais de 10 dias com um medicamento para a crise este mês? Fala com o teu médico: é o limiar do uso excessivo de medicação.",
    logTitle: "As minhas crises em detalhe",
    logIntro: "Uma linha por crise. Para cada medicamento ou alívio, assinala se ajudou. Imprime esta página as vezes que precisares.",
    cols: ["Data", "Início e fim", "Intensidade", "Sintomas", "Possíveis fatores desencadeantes", "Medicamento e hora", "Alívio sem medicamentos"],
    helped: "Ajudou:",
    effect: ["Sim", "Um pouco", "Não"],
    triggersLabel: "Fatores desencadeantes frequentes",
    triggers: ["Stress", "Falta de sono", "Refeição saltada", "Período", "Meteorologia", "Ecrãs", "Álcool", "Desidratação", "Cafeína", "Luz intensa"],
    symptomsLabel: "Sintomas frequentes",
    symptoms: ["Náuseas", "Incómodo com a luz", "Incómodo com o ruído", "Aura visual", "Tonturas", "Dor latejante"],
    reliefLabel: "Alívios frequentes",
    relief: ["Repouso no escuro", "Frio na testa", "Respiração lenta", "Dormir", "Beber água", "Comer alguma coisa"],
    footer: "Retoma o controlo das tuas enxaquecas com a app",
    cycle: {
      title: "Enxaqueca e período",
      docTitle: "Diário de enxaqueca menstrual · Mellow",
      intro: "Uma linha por mês. Assinala «Período» nos dias de período, anota a intensidade de cada crise de 1 a 10 e assinala «Med.» se tomaste um medicamento para a crise.",
      month: "Mês",
      periods: "Período",
      attack: "Crise /10",
      med: "Med.",
      summaryTitle: "Balanço, ciclo a ciclo",
      cycle: "Ciclo",
      firstDay: "Primeiro dia do período",
      window: "Crise entre 2 dias antes e 3 dias depois?",
      yes: "Sim",
      no: "Não",
      conclusion: "Sim em pelo menos 2 ciclos em cada 3? Fala com o teu médico: é a definição de enxaqueca menstrual.",
    },
  },
  "pt-BR": {
    title: "Diário de enxaqueca",
    docTitle: "Diário de enxaqueca · Mellow",
    name: "Nome",
    month: "Mês",
    year: "Ano",
    intro: "Em cada dia de crise, anote a intensidade de 1 a 10 na parte de baixo do quadrado e marque “Med.” se você tomou um medicamento para a crise. Você também pode escrever uma palavra no quadrado: menstruação, noite mal dormida, estresse…",
    keyIntensity: "Intensidade da crise, de 1 a 10",
    keyMed: "Tomou medicamento para a crise",
    medShort: "Med.",
    summary: "Este mês",
    migraineDays: "Dias de enxaqueca",
    medDays: "Dias com medicamento",
    note: "Mais de 10 dias com medicamento para a crise neste mês? Converse com o seu médico: esse é o limite do uso excessivo de medicamentos.",
    logTitle: "Minhas crises em detalhe",
    logIntro: "Uma linha por crise. Para cada medicamento ou alívio, marque se ajudou. Imprima esta página quantas vezes precisar.",
    cols: ["Data", "Início e fim", "Intensidade", "Sintomas", "Possíveis gatilhos", "Medicamento e horário", "Alívio sem medicamento"],
    helped: "Ajudou:",
    effect: ["Sim", "Um pouco", "Não"],
    triggersLabel: "Gatilhos comuns",
    triggers: ["Estresse", "Falta de sono", "Pular refeição", "Menstruação", "Clima", "Telas", "Álcool", "Desidratação", "Cafeína", "Luz forte"],
    symptomsLabel: "Sintomas comuns",
    symptoms: ["Náusea", "Incômodo com a luz", "Incômodo com barulho", "Aura visual", "Tontura", "Dor latejante"],
    reliefLabel: "Alívios comuns",
    relief: ["Descanso no escuro", "Gelo na testa", "Respiração lenta", "Dormir", "Beber água", "Comer alguma coisa"],
    footer: "Retome o controle das suas enxaquecas com o app",
    cycle: {
      title: "Enxaqueca e menstruação",
      docTitle: "Diário de enxaqueca menstrual · Mellow",
      intro: "Uma linha por mês. Marque “Menstruação” nos dias de menstruação, anote a intensidade de cada crise de 1 a 10 e marque “Med.” se você tomou um medicamento para a crise.",
      month: "Mês",
      periods: "Menstruação",
      attack: "Crise /10",
      med: "Med.",
      summaryTitle: "Resumo, ciclo a ciclo",
      cycle: "Ciclo",
      firstDay: "Primeiro dia da menstruação",
      window: "Crise entre 2 dias antes e 3 dias depois?",
      yes: "Sim",
      no: "Não",
      conclusion: "Sim em pelo menos 2 de cada 3 ciclos? Converse com o seu médico: essa é a definição de enxaqueca menstrual.",
    },
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
  /* Cycle diary, page 1: three months, one framed grid per month. */
  .page.land header .fields { margin: 0 0 0 auto; }
  /* The three grids share the page height: rows grow to fill it, whatever
     the length of the intro in each language. */
  .months { margin-top: 3.5mm; flex: 1; display: flex; flex-direction: column; gap: 3mm; }
  .cyc { flex: 1; display: flex; border: 0.4mm solid ${LINE}; border-radius: 2.5mm; overflow: hidden; }
  .cyc table { width: 100%; height: 100%; border-collapse: collapse; table-layout: fixed; }
  .cyc th, .cyc td { padding: 0; text-align: center; vertical-align: middle; border-top: 0.3mm solid ${GRID}; border-right: 0.3mm solid ${GRID}; background: none; border-bottom: none; }
  .cyc tr:first-child th { border-top: none; background: #F2F2F2; height: 5.5mm; font-size: 6.5pt; font-weight: 700; color: #555; line-height: 1; }
  .cyc th:last-child, .cyc td:last-child { border-right: none; }
  .cyc .lab { width: 25mm; text-align: left; padding: 0 2mm; font-size: 7.5pt; font-weight: 700; color: #333; white-space: nowrap; }
  .cyc tr:first-child th.lab { font-size: 7.5pt; color: #222; }
  .cyc th.lab .line { display: inline-block; width: 12mm; height: 3.2mm; margin-left: 1mm; border-bottom: 0.35mm solid #999; vertical-align: bottom; }
  .cyc tr.box td { height: 8mm; }
  .cyc tr.int td { height: 9.5mm; }
  .cyc td b { display: inline-block; width: 3.2mm; height: 3.2mm; border: 0.35mm solid #888; border-radius: 0.6mm; vertical-align: middle; }
  .cycles { margin-top: 3.5mm; border-radius: 2.5mm; background: #FFEEF3; padding: 3mm 4mm; }
  .cycles .h { font-size: 8pt; text-transform: uppercase; letter-spacing: 0.08em; color: #B8505F; font-weight: 700; }
  .cycles .three { margin-top: 2mm; display: grid; grid-template-columns: repeat(3, 1fr); gap: 6mm; }
  .cy { display: flex; flex-direction: column; gap: 1.8mm; font-size: 8pt; color: #333; }
  .cy strong { font-size: 8.5pt; color: #000; }
  .cy .row { display: flex; align-items: flex-end; gap: 1.5mm; }
  .cy .row .line { flex: 1; height: 3.6mm; border-bottom: 0.35mm solid #C47A88; }
  .cy .opts { display: flex; gap: 4mm; font-weight: 600; }
  .cy .opts span { display: inline-flex; align-items: center; gap: 1mm; }
  .cy .opts b { display: inline-block; width: 3mm; height: 3mm; border: 0.35mm solid #888; border-radius: 0.6mm; background: #fff; }
  .cycles .concl { margin-top: 2.5mm; font-size: 8pt; color: #444; line-height: 1.4; }
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

// Cycle diary, page 1: three months of days 1 to 31, each with a period box,
// the attack intensity and a medication box, then a cycle-by-cycle check of
// the menstrual migraine window (2 days before to 3 days after day 1).
function pageCycle(t) {
  const c = t.cycle;
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const month = `
    <div class="cyc"><table>
      <tr><th class="lab">${c.month}<span class="line"></span></th>${days.map((d) => `<th>${d}</th>`).join("")}</tr>
      <tr class="box"><td class="lab">${c.periods}</td>${days.map(() => "<td><b></b></td>").join("")}</tr>
      <tr class="int"><td class="lab">${c.attack}</td>${days.map(() => "<td></td>").join("")}</tr>
      <tr class="box"><td class="lab">${c.med}</td>${days.map(() => "<td><b></b></td>").join("")}</tr>
    </table></div>`;
  const cycle = (n) => `
    <div class="cy"><strong>${c.cycle} ${n}</strong>
      <div class="row">${c.firstDay} <span class="line"></span></div>
      <span>${c.window}</span>
      <div class="opts"><span><b></b>${c.yes}</span><span><b></b>${c.no}</span></div>
    </div>`;
  return `
  <section class="page land">
    <header>${logo()}<h1>${c.title}</h1><div class="fields"><div class="field long">${t.name} <span class="line"></span></div><div class="field short">${t.year} <span class="line"></span></div></div></header>
    <p class="intro">${c.intro}</p>
    <div class="months">${month}${month}${month}</div>
    <div class="cycles"><span class="h">${c.summaryTitle}</span>
      <div class="three">${cycle(1)}${cycle(2)}${cycle(3)}</div>
      <p class="concl">${c.conclusion}</p>
    </div>
    ${footer(t)}
  </section>`;
}

function footer(t) {
  return `<footer>${logo()}<strong>Mellow</strong><span>${t.footer}</span><span class="site">mellowmigraine.com</span></footer>`;
}

function html(locale, paper, pages, title = T[locale].docTitle) {
  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><title>${title}</title>
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

// kind "diary" (default): monthly calendar + attack log. kind "cycle": three
// months with the period + attack log. Previews are PNGs of each page of the
// first output of a locale; the cycle diary's page 2 reuses the diary's.
const OUTPUTS = [
  { locale: "fr", paper: "a4", file: "journal-de-migraine-mellow-a4.pdf", preview: "fr" },
  { locale: "en", paper: "letter", file: "migraine-diary-mellow-letter.pdf", preview: "en" },
  { locale: "en", paper: "a4", file: "migraine-diary-mellow-a4.pdf" },
  { locale: "de", paper: "a4", file: "migraene-tagebuch-mellow-a4.pdf", preview: "de" },
  { locale: "it", paper: "a4", file: "diario-emicrania-mellow-a4.pdf", preview: "it" },
  { locale: "es", paper: "a4", file: "diario-de-migrana-mellow-a4.pdf", preview: "es" },
  { locale: "es-419", paper: "letter", file: "diario-de-migrana-mellow-latam-carta.pdf", preview: "es-419" },
  { locale: "es-419", paper: "a4", file: "diario-de-migrana-mellow-latam-a4.pdf" },
  { locale: "pt", paper: "a4", file: "diario-de-enxaqueca-mellow-a4.pdf", preview: "pt" },
  { locale: "pt-BR", paper: "a4", file: "diario-de-enxaqueca-mellow-brasil-a4.pdf", preview: "pt-BR" },
  { kind: "cycle", locale: "fr", paper: "a4", file: "journal-migraine-et-regles-mellow-a4.pdf", preview: "fr" },
  { kind: "cycle", locale: "en", paper: "letter", file: "menstrual-migraine-diary-mellow-letter.pdf", preview: "en" },
  { kind: "cycle", locale: "en", paper: "a4", file: "menstrual-migraine-diary-mellow-a4.pdf" },
  { kind: "cycle", locale: "de", paper: "a4", file: "menstruationsmigraene-tagebuch-mellow-a4.pdf", preview: "de" },
  { kind: "cycle", locale: "it", paper: "a4", file: "diario-emicrania-mestruale-mellow-a4.pdf", preview: "it" },
  { kind: "cycle", locale: "es", paper: "a4", file: "diario-migrana-menstrual-mellow-a4.pdf", preview: "es" },
  { kind: "cycle", locale: "es-419", paper: "letter", file: "diario-migrana-menstrual-mellow-latam-carta.pdf", preview: "es-419" },
  { kind: "cycle", locale: "es-419", paper: "a4", file: "diario-migrana-menstrual-mellow-latam-a4.pdf" },
  { kind: "cycle", locale: "pt", paper: "a4", file: "diario-enxaqueca-menstrual-mellow-a4.pdf", preview: "pt" },
  { kind: "cycle", locale: "pt-BR", paper: "a4", file: "diario-enxaqueca-menstrual-mellow-brasil-a4.pdf", preview: "pt-BR" },
];

// Optional filter: `node scripts/diary/build.mjs cycle` rebuilds one kind
// only (PDFs embed their build date, so the others stay untouched).
const only = process.argv[2];

for (const o of OUTPUTS) {
  const kind = o.kind ?? "diary";
  if (only && only !== kind) continue;
  const t = T[o.locale];
  const cycle = kind === "cycle";
  const first = cycle ? pageCycle(t) : page1(t);
  const title = cycle ? t.cycle.docTitle : t.docTitle;
  const src = path.join(work, `${o.file}.html`);
  writeFileSync(src, html(o.locale, o.paper, [first, page2(t)], title));
  chrome(["--no-pdf-header-footer", `--print-to-pdf=${path.join(ROOT, "public/downloads", o.file)}`, pathToFileURL(src).href]);

  if (o.preview) {
    const { w, h } = PAPER[o.paper];
    const px = (mm) => Math.round((mm / 25.4) * 96);
    const pages = cycle
      ? [[1, first, px(h), px(w)]]
      : [
          [1, first, px(w), px(h)],
          [2, page2(t), px(h), px(w)],
        ];
    for (const [n, body, width, height] of pages) {
      const one = path.join(work, `${kind}-${o.preview}-p${n}.html`);
      writeFileSync(one, html(o.locale, o.paper, [body], title));
      chrome([
        `--window-size=${width},${height}`,
        "--force-device-scale-factor=2",
        `--screenshot=${path.join(ROOT, "public/tools", `${kind}-${o.preview}-p${n}.png`)}`,
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
