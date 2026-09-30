import type { BlogLocale } from "./blog";
import type { Rich } from "./migraine-test";

type Faq = { q: string; a: string };

export type DiaryCopy = {
  path: string;
  navLabel: string;
  menuDescription: string;
  metaTitle: string;
  description: string;
  title: string;
  lead: string;
  downloads: Array<{ label: string; href: string; primary?: boolean }>;
  downloadNote: string;
  previewAlt: [string, string];
  whyTitle: string;
  why: Rich[];
  howTitle: string;
  steps: string[];
  doctorTitle: string;
  doctor: string[];
  appTitle: string;
  appText: string;
  faqTitle: string;
  faq: Faq[];
};

export type TestPageCopy = {
  path: string;
  navLabel: string;
  menuDescription: string;
  metaTitle: string;
  description: string;
  title: string;
  lead: string;
  howTitle: string;
  how: Rich[];
  faqTitle: string;
  faq: Faq[];
};

export const TOOLS_LABEL: Record<BlogLocale, string> = { fr: "Outils", en: "Tools" };

export const DIARY: Record<BlogLocale, DiaryCopy> = {
  fr: {
    path: "/outils/journal-de-migraine",
    navLabel: "Journal de migraine",
    menuDescription: "Calendrier et tableau des crises à imprimer",
    metaTitle: "Journal de migraine à imprimer (PDF gratuit)",
    description:
      "Télécharge gratuitement un journal de migraine à imprimer : calendrier du mois, intensité, médicaments et tableau des crises à montrer à ton médecin.",
    title: "Journal de migraine à imprimer",
    lead: "Un calendrier du mois et un tableau des crises, sur deux pages, à imprimer et à remplir au fil des jours. Gratuit, sans inscription.",
    downloads: [
      { label: "Télécharger le PDF (A4)", href: "/downloads/journal-de-migraine-mellow-a4.pdf", primary: true },
    ],
    downloadNote: "PDF, 2 pages, format A4.",
    previewAlt: [
      "Page 1 du journal : calendrier du mois avec, pour chaque jour, un rond où noter l'intensité de 1 à 10 et une case médicament",
      "Page 2 du journal : tableau des crises avec date, horaires, intensité, symptômes, déclencheurs, médicament et soulagement sans médicament",
    ],
    whyTitle: "Pourquoi tenir un journal de migraine ?",
    why: [
      [
        "C'est souvent le premier conseil des neurologues. Noter tes crises permet de ",
        { text: "repérer tes déclencheurs", href: "/blog/identifier-declencheurs-migraine" },
        ", de mesurer si un traitement fonctionne et de voir si tes crises suivent ",
        { text: "ton cycle", href: "/blog/migraine-et-regles" },
        ".",
      ],
      [
        "Il permet aussi de compter tes jours de médicament. Au-delà de 10 jours par mois, le risque d'",
        { text: "abus médicamenteux", href: "/blog/mal-de-tete-tous-les-jours" },
        " augmente : les antidouleurs eux-mêmes peuvent alors entretenir les maux de tête.",
      ],
    ],
    howTitle: "Comment le remplir",
    steps: [
      "Chaque jour de crise, écris dans le rond du jour l'intensité de 1 à 10. Si tu préfères, colorie-le : rose pour une crise légère, bleu pour une crise modérée, rouge pour une crise intense.",
      "Coche la petite case si tu as pris un médicament de crise ce jour-là.",
      "Pour chaque crise, remplis une ligne du tableau : heures de début et de fin, symptômes, déclencheurs possibles, médicament pris, soulagement sans médicament (repos dans le noir, froid, respiration…) et si ça a aidé.",
      "À la fin du mois, compte tes jours de migraine et tes jours avec médicament, puis apporte le journal à ta prochaine consultation.",
    ],
    doctorTitle: "Ce que ton médecin va regarder",
    doctor: [
      "Le nombre de jours de migraine par mois, pour savoir si un traitement de fond se discute.",
      "La durée et l'intensité des crises, pour choisir le bon traitement de crise.",
      "Le nombre de jours avec un médicament, pour repérer un abus médicamenteux.",
      "Les déclencheurs qui reviennent, et un éventuel lien avec les règles.",
    ],
    appTitle: "Plus simple : Mellow le remplit avec toi",
    appText:
      "Note une crise en deux taps sur ton téléphone. Mellow calcule tes jours de migraine, compte tes médicaments, suit la météo et prépare un rapport PDF pour ton médecin.",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Combien de temps faut-il tenir un journal de migraine ?",
        a: "Au moins un à trois mois. C'est le temps nécessaire pour voir apparaître un rythme, par exemple autour des règles, et pour que ton médecin puisse évaluer un traitement de fond.",
      },
      {
        q: "Faut-il noter les jours sans crise ?",
        a: "Laisse simplement la case vide. Les jours sans crise comptent autant que les autres : ils donnent ta fréquence réelle et montrent les périodes calmes.",
      },
      {
        q: "Le journal remplace-t-il une consultation ?",
        a: "Non. C'est un outil pour préparer ta consultation et en parler avec ton médecin, pas pour poser un diagnostic.",
      },
    ],
  },
  en: {
    path: "/tools/migraine-diary",
    navLabel: "Migraine diary",
    menuDescription: "Printable calendar and attack log",
    metaTitle: "Printable migraine diary (free PDF)",
    description:
      "Download a free printable migraine diary: a monthly calendar, intensity, medication days and an attack log to show your doctor.",
    title: "Printable migraine diary",
    lead: "A monthly calendar and an attack log on two pages, to print and fill in day by day. Free, no sign-up.",
    downloads: [
      { label: "Download the PDF (US Letter)", href: "/downloads/migraine-diary-mellow-letter.pdf", primary: true },
      { label: "A4 version", href: "/downloads/migraine-diary-mellow-a4.pdf" },
    ],
    downloadNote: "PDF, 2 pages.",
    previewAlt: [
      "Diary page 1: a monthly calendar with, for each day, a circle to write the intensity from 1 to 10 and a medication box",
      "Diary page 2: an attack log with date, times, intensity, symptoms, triggers, medication and drug-free relief",
    ],
    whyTitle: "Why keep a migraine diary?",
    why: [
      [
        "It is often the first thing a neurologist asks for. Logging your attacks helps you ",
        { text: "spot your triggers", href: "/blog/identify-migraine-triggers" },
        ", see whether a treatment works and check whether your attacks follow ",
        { text: "your cycle", href: "/blog/migraine-and-periods" },
        ".",
      ],
      [
        "It also counts your medication days. Beyond 10 days a month, the risk of ",
        { text: "medication overuse", href: "/blog/headache-every-day" },
        " rises: the painkillers themselves can then keep the headaches going.",
      ],
    ],
    howTitle: "How to fill it in",
    steps: [
      "On each attack day, write the intensity from 1 to 10 in that day's circle. If you prefer, color it in: pink for a mild attack, blue for a moderate one, red for a severe one.",
      "Tick the small box if you took an acute medication that day.",
      "For each attack, fill in one row of the log: start and end times, symptoms, possible triggers, medication taken, drug-free relief (resting in the dark, cold, breathing…) and whether it helped.",
      "At the end of the month, count your migraine days and medication days, then bring the diary to your next appointment.",
    ],
    doctorTitle: "What your doctor will look at",
    doctor: [
      "Migraine days per month, to decide whether a preventive treatment makes sense.",
      "How long and how strong attacks are, to choose the right acute treatment.",
      "Days with medication, to spot medication overuse.",
      "Recurring triggers, and any link with your period.",
    ],
    appTitle: "Easier: let Mellow fill it in with you",
    appText:
      "Log an attack in two taps on your phone. Mellow counts your migraine days and medication, tracks the weather and prepares a PDF report for your doctor.",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How long should I keep a migraine diary?",
        a: "At least one to three months. That is how long it takes for a pattern to show, for example around your period, and for your doctor to assess a preventive treatment.",
      },
      {
        q: "Should I log days without an attack?",
        a: "Just leave that day's box empty. Attack-free days matter as much as the others: they give your real frequency and show the calm periods.",
      },
      {
        q: "Does the diary replace a medical appointment?",
        a: "No. It is a tool to prepare your appointment and talk it through with your doctor, not to make a diagnosis.",
      },
    ],
  },
};

export const TEST_PAGE: Record<BlogLocale, TestPageCopy> = {
  fr: {
    path: "/outils/test-migraine",
    navLabel: "Test migraine",
    menuDescription: "Migraine ou mal de tête ? 11 questions",
    metaTitle: "Test migraine : migraine ou mal de tête ? (gratuit, 2 minutes)",
    description:
      "Réponds à 11 questions basées sur les critères médicaux de la migraine et découvre si tes maux de tête ressemblent à une migraine, à une céphalée de tension ou à autre chose.",
    title: "Migraine ou mal de tête ? Fais le test",
    lead: "11 questions, 2 minutes. Le test s'appuie sur les critères de la classification internationale des céphalées (ICHD-3), celle qu'utilisent les neurologues.",
    howTitle: "Comment fonctionne ce test ?",
    how: [
      [
        "Pour parler de migraine, les neurologues cherchent des crises de 4 à 72 heures, avec au moins deux de ces caractéristiques : douleur d'un seul côté, qui bat, modérée à sévère, aggravée par l'effort. Il faut aussi au moins un signe associé : des nausées, ou une gêne à la fois à la lumière et au bruit.",
      ],
      [
        "La céphalée de tension, elle, serre des deux côtés, reste légère à modérée, n'est pas aggravée par l'effort et ne donne pas de nausées. Pour aller plus loin : ",
        { text: "migraine ou mal de tête, comment faire la différence", href: "/blog/migraine-ou-mal-de-tete" },
        ".",
      ],
      [
        "Le test tient aussi compte de l'",
        { text: "aura", href: "/blog/migraine-avec-aura" },
        ", du nombre de jours de maux de tête par mois et des jours de médicament, qui peuvent signaler un ",
        { text: "abus médicamenteux", href: "/blog/mal-de-tete-tous-les-jours" },
        ".",
      ],
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Ce test est-il fiable ?",
        a: "Il reprend les critères utilisés par les médecins, mais il ne remplace pas un examen. Seul un médecin peut poser un diagnostic, en tenant compte de ton histoire et de ton examen clinique.",
      },
      {
        q: "Peut-on avoir à la fois des migraines et des céphalées de tension ?",
        a: "Oui, c'est même fréquent. Beaucoup de personnes migraineuses ont aussi des maux de tête plus légers de type tension. Un journal des crises aide à distinguer les deux.",
      },
      {
        q: "Quand faut-il consulter en urgence ?",
        a: "En cas de douleur brutale et très intense, de fièvre avec raideur de la nuque, de faiblesse d'un côté du corps, de trouble de la parole ou de confusion, ou d'un mal de tête après un choc à la tête. Appelle le 15 ou le 112.",
      },
    ],
  },
  en: {
    path: "/tools/migraine-test",
    navLabel: "Migraine test",
    menuDescription: "Migraine or headache? 11 questions",
    metaTitle: "Migraine test: migraine or headache? (free, 2 minutes)",
    description:
      "Answer 11 questions based on the medical criteria for migraine and find out whether your headaches look like migraine, tension-type headache or something else.",
    title: "Migraine or headache? Take the test",
    lead: "11 questions, 2 minutes. The test is based on the International Classification of Headache Disorders (ICHD-3), the criteria neurologists use.",
    howTitle: "How does this test work?",
    how: [
      [
        "To diagnose migraine, neurologists look for attacks lasting 4 to 72 hours, with at least two of these features: one-sided, throbbing, moderate to severe, worse with activity. There must also be at least one associated symptom: nausea, or sensitivity to both light and noise.",
      ],
      [
        "Tension-type headache feels tight on both sides, stays mild to moderate, doesn't get worse with activity and doesn't cause nausea. To go further: ",
        { text: "migraine vs headache, how to tell the difference", href: "/blog/migraine-vs-headache" },
        ".",
      ],
      [
        "The test also takes into account ",
        { text: "aura", href: "/blog/migraine-with-aura" },
        ", how many headache days you have each month and your medication days, which can point to ",
        { text: "medication overuse", href: "/blog/headache-every-day" },
        ".",
      ],
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Is this test reliable?",
        a: "It uses the criteria doctors use, but it does not replace an examination. Only a doctor can make a diagnosis, taking your history and a clinical exam into account.",
      },
      {
        q: "Can you have both migraine and tension-type headache?",
        a: "Yes, it is common. Many people with migraine also get milder tension-type headaches. A headache diary helps tell them apart.",
      },
      {
        q: "When should I seek emergency care?",
        a: "For a sudden, extremely severe pain, fever with a stiff neck, weakness on one side of the body, trouble speaking or confusion, or a headache after a blow to the head. Call your local emergency number.",
      },
    ],
  },
};
