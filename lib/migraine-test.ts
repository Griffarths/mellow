import type { ToolLocale } from "./tools";

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

export const TEST_COPY: Record<ToolLocale, TestCopy> = {
  fr: {
    progress: "Question {n} sur {total}",
    back: "Retour",
    next: "Continuer",
    seeResult: "Voir mon résultat",
    restart: "Refaire le test",
    resultEyebrow: "Ton résultat",
    disclaimer:
      "Ce test ne pose pas de diagnostic. Il t'aide à y voir plus clair et à préparer une consultation. En cas de doute, parles-en à ton médecin.",
    appTitle: "Confirme ton profil en suivant tes crises",
    appText:
      "Note chaque crise en deux taps pendant un mois. Mellow calcule ta fréquence, ta durée moyenne et tes jours de médicament, et prépare un rapport PDF pour ton médecin.",
    questions: [
      {
        id: "duration",
        title: "Sans traitement, combien de temps dure une crise en général ?",
        options: [
          { id: "under30m", label: "Moins de 30 minutes" },
          { id: "30mto4h", label: "De 30 minutes à 4 heures" },
          { id: "4to72h", label: "De 4 heures à 3 jours" },
          { id: "over72h", label: "Plus de 3 jours" },
          { id: "unknown", label: "Je ne sais pas, je prends toujours un traitement" },
        ],
      },
      {
        id: "location",
        title: "Où as-tu mal, le plus souvent ?",
        options: [
          { id: "one", label: "D'un seul côté de la tête (le côté peut changer d'une crise à l'autre)" },
          { id: "both", label: "Des deux côtés, comme un bandeau ou un casque" },
          { id: "varies", label: "Ça dépend des crises" },
        ],
      },
      {
        id: "quality",
        title: "À quoi ressemble la douleur ?",
        options: [
          { id: "pulsating", label: "Elle bat, elle pulse, comme un cœur dans la tête" },
          { id: "pressing", label: "Elle serre ou elle appuie, comme un étau" },
          { id: "other", label: "Autre, ou je ne sais pas" },
        ],
      },
      {
        id: "intensity",
        title: "Quelle est son intensité ?",
        options: [
          { id: "mild", label: "Légère : je peux continuer mes activités normalement" },
          { id: "moderate", label: "Modérée : elle me gêne, je ralentis" },
          { id: "severe", label: "Sévère : je dois m'arrêter ou m'allonger" },
        ],
      },
      {
        id: "activity",
        title: "L'activité physique rend-elle la douleur pire ?",
        hint: "Monter un escalier, marcher vite, te pencher en avant.",
        options: [
          { id: "yes", label: "Oui" },
          { id: "no", label: "Non" },
          { id: "unsure", label: "Je ne sais pas" },
        ],
      },
      {
        id: "nausea",
        title: "Pendant la crise, as-tu des nausées ou des vomissements ?",
        options: [
          { id: "yes", label: "Oui" },
          { id: "no", label: "Non" },
        ],
      },
      {
        id: "senses",
        title: "Pendant la crise, la lumière et le bruit te gênent-ils ?",
        options: [
          { id: "both", label: "Oui, les deux" },
          { id: "one", label: "Seulement l'un des deux" },
          { id: "none", label: "Aucun des deux" },
        ],
      },
      {
        id: "aura",
        title: "Avant ou au début de la douleur, as-tu parfois des troubles qui durent de 5 à 60 minutes puis disparaissent ?",
        hint: "Zigzags lumineux, tache aveugle, fourmillements qui remontent le long du bras, difficulté à trouver tes mots.",
        options: [
          { id: "often", label: "Oui, souvent" },
          { id: "sometimes", label: "Oui, c'est déjà arrivé" },
          { id: "never", label: "Non" },
        ],
      },
      {
        id: "frequency",
        title: "Combien de jours par mois as-tu mal à la tête ?",
        options: [
          { id: "under4", label: "Moins de 4 jours" },
          { id: "4to14", label: "De 4 à 14 jours" },
          { id: "15plus", label: "15 jours ou plus" },
        ],
      },
      {
        id: "medication",
        title: "Combien de jours par mois prends-tu un médicament contre la douleur ?",
        hint: "Paracétamol, ibuprofène, aspirine, triptan ou autre.",
        options: [
          { id: "under10", label: "Moins de 10 jours" },
          { id: "10to14", label: "De 10 à 14 jours" },
          { id: "15plus", label: "15 jours ou plus" },
        ],
      },
      {
        id: "redflags",
        title: "Dernière question, importante : ton mal de tête a-t-il déjà présenté l'un de ces signes ?",
        hint: "Plusieurs réponses possibles.",
        multiple: true,
        options: [
          { id: "thunderclap", label: "Une douleur brutale et très intense, la pire de ta vie, atteinte en moins d'une minute" },
          { id: "fever", label: "De la fièvre avec une raideur de la nuque" },
          { id: "neuro", label: "Une faiblesse d'un côté du corps, un trouble de la parole ou une confusion" },
          { id: "trauma", label: "Un mal de tête apparu après un choc à la tête" },
          { id: "new", label: "Un mal de tête nouveau après 50 ans, ou qui change brutalement de caractère" },
          { id: "longAura", label: "Des troubles visuels ou des fourmillements qui durent plus d'une heure" },
          { id: "none", label: "Aucun de ces signes", exclusive: true },
        ],
      },
    ],
    results: {
      urgent: {
        title: "Parles-en rapidement à un médecin",
        text: "Tu as coché au moins un signe qui justifie un avis médical sans attendre. Le plus souvent, la cause n'est pas grave, mais ces symptômes doivent être vérifiés. Si la douleur est brutale et très intense, ou s'il y a une faiblesse d'un côté du corps ou un trouble de la parole, appelle le 15 ou le 112.",
        links: ["Pour en savoir plus : ", { text: "l'aura n'est pas un AVC, mais elle peut y ressembler", href: "/blog/migraine-avec-aura" }, "."],
      },
      migraine: {
        title: "Tes maux de tête ressemblent à une migraine",
        text: "Tes réponses correspondent aux critères de la migraine sans aura : des crises de plusieurs heures, au moins deux caractéristiques typiques de la douleur, et des signes associés comme les nausées ou la gêne à la lumière et au bruit. Seul un médecin peut confirmer le diagnostic, mais c'est une bonne base pour en parler.",
        links: ["À lire : ", { text: "migraine ou mal de tête, comment faire la différence", href: "/blog/migraine-ou-mal-de-tete" }, " et ", { text: "comment identifier tes déclencheurs", href: "/blog/identifier-declencheurs-migraine" }, "."],
      },
      migraineAura: {
        title: "Tes maux de tête ressemblent à une migraine avec aura",
        text: "Tes crises ont les caractéristiques d'une migraine, et les troubles que tu décris avant la douleur ressemblent à une aura. Si ces troubles sont récents, inhabituels ou durent plus d'une heure, consulte pour en être sûr.",
        links: ["À lire : ", { text: "tout comprendre de la migraine avec aura", href: "/blog/migraine-avec-aura" }, " et ", { text: "la migraine ophtalmique", href: "/blog/migraine-ophtalmique" }, "."],
      },
      auraPossible: {
        title: "Tes troubles ressemblent à une aura migraineuse",
        text: "Des troubles visuels ou sensitifs qui durent de 5 à 60 minutes puis disparaissent sont typiques d'une aura, même quand la douleur qui suit est légère, ou absente. Parles-en à ton médecin, surtout si c'est récent.",
        links: ["À lire : ", { text: "la migraine avec aura", href: "/blog/migraine-avec-aura" }, " et ", { text: "la migraine ophtalmique", href: "/blog/migraine-ophtalmique" }, "."],
      },
      migraineProbable: {
        title: "Tes maux de tête ressemblent en partie à une migraine",
        text: "Tes réponses remplissent presque tous les critères de la migraine, mais pas tous. Les neurologues parlent alors de migraine probable. Noter tes crises pendant un mois aidera ton médecin à y voir plus clair.",
        links: ["Pour commencer : ", { text: "le journal de migraine à imprimer", href: "/outils/journal-de-migraine" }, " ou ", { text: "migraine ou mal de tête, comment faire la différence", href: "/blog/migraine-ou-mal-de-tete" }, "."],
      },
      tension: {
        title: "Tes maux de tête ressemblent à une céphalée de tension",
        text: "Une douleur qui serre des deux côtés, légère à modérée, sans nausées ni aggravation à l'effort : c'est le profil de la céphalée de tension, le mal de tête le plus fréquent. Le stress, le manque de sommeil et la posture en sont souvent à l'origine.",
        links: ["À lire : ", { text: "migraine ou mal de tête, comment faire la différence", href: "/blog/migraine-ou-mal-de-tete" }, " et ", { text: "stress et migraines", href: "/blog/stress-et-migraines" }, "."],
      },
      unclear: {
        title: "Tes réponses ne correspondent pas nettement à un profil",
        text: "Tes maux de tête ne rentrent clairement ni dans la migraine ni dans la céphalée de tension. Ce n'est pas inquiétant en soi, mais cela vaut la peine d'en parler à ton médecin, avec une trace écrite de tes crises pour l'aider.",
        links: ["Pour t'aider : ", { text: "le journal de migraine à imprimer", href: "/outils/journal-de-migraine" }, "."],
      },
    },
    chronicNote: ["Tu as mal à la tête 15 jours ou plus par mois : on parle alors de forme chronique. Des traitements de fond existent, parles-en à ton médecin. ", { text: "Mal de tête tous les jours : les causes", href: "/blog/mal-de-tete-tous-les-jours" }],
    overuseNote: ["Tu prends un médicament contre la douleur 10 jours ou plus par mois. Au-delà de ce seuil, le risque d'abus médicamenteux augmente : les médicaments eux-mêmes peuvent entretenir les maux de tête. ", { text: "Comment sortir de l'abus médicamenteux", href: "/blog/mal-de-tete-tous-les-jours" }],
  },
  en: {
    progress: "Question {n} of {total}",
    back: "Back",
    next: "Continue",
    seeResult: "See my result",
    restart: "Take the test again",
    resultEyebrow: "Your result",
    disclaimer:
      "This test is not a diagnosis. It helps you see more clearly and prepare for an appointment. If in doubt, talk to your doctor.",
    appTitle: "Confirm your profile by tracking your attacks",
    appText:
      "Log each attack in two taps for a month. Mellow works out your frequency, average duration and medication days, and prepares a PDF report for your doctor.",
    questions: [
      {
        id: "duration",
        title: "Without treatment, how long does an attack usually last?",
        options: [
          { id: "under30m", label: "Less than 30 minutes" },
          { id: "30mto4h", label: "30 minutes to 4 hours" },
          { id: "4to72h", label: "4 hours to 3 days" },
          { id: "over72h", label: "More than 3 days" },
          { id: "unknown", label: "I don't know, I always take something" },
        ],
      },
      {
        id: "location",
        title: "Where does it hurt, most of the time?",
        options: [
          { id: "one", label: "On one side of the head (the side can change from one attack to the next)" },
          { id: "both", label: "On both sides, like a band or a helmet" },
          { id: "varies", label: "It depends on the attack" },
        ],
      },
      {
        id: "quality",
        title: "What does the pain feel like?",
        options: [
          { id: "pulsating", label: "Throbbing or pulsing, like a heartbeat in the head" },
          { id: "pressing", label: "Tight or pressing, like a vice" },
          { id: "other", label: "Something else, or I'm not sure" },
        ],
      },
      {
        id: "intensity",
        title: "How strong is it?",
        options: [
          { id: "mild", label: "Mild: I can carry on as normal" },
          { id: "moderate", label: "Moderate: it gets in the way, I slow down" },
          { id: "severe", label: "Severe: I have to stop or lie down" },
        ],
      },
      {
        id: "activity",
        title: "Does physical activity make the pain worse?",
        hint: "Climbing stairs, walking fast, bending forward.",
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
          { id: "unsure", label: "I'm not sure" },
        ],
      },
      {
        id: "nausea",
        title: "During an attack, do you feel sick or vomit?",
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ],
      },
      {
        id: "senses",
        title: "During an attack, do light and noise bother you?",
        options: [
          { id: "both", label: "Yes, both" },
          { id: "one", label: "Only one of them" },
          { id: "none", label: "Neither" },
        ],
      },
      {
        id: "aura",
        title: "Before or as the pain starts, do you sometimes get symptoms that last 5 to 60 minutes and then go away?",
        hint: "Zigzag lights, a blind spot, tingling that spreads up the arm, trouble finding your words.",
        options: [
          { id: "often", label: "Yes, often" },
          { id: "sometimes", label: "Yes, it has happened" },
          { id: "never", label: "No" },
        ],
      },
      {
        id: "frequency",
        title: "How many days a month do you have a headache?",
        options: [
          { id: "under4", label: "Fewer than 4 days" },
          { id: "4to14", label: "4 to 14 days" },
          { id: "15plus", label: "15 days or more" },
        ],
      },
      {
        id: "medication",
        title: "How many days a month do you take a painkiller?",
        hint: "Acetaminophen (paracetamol), ibuprofen, aspirin, a triptan or other.",
        options: [
          { id: "under10", label: "Fewer than 10 days" },
          { id: "10to14", label: "10 to 14 days" },
          { id: "15plus", label: "15 days or more" },
        ],
      },
      {
        id: "redflags",
        title: "Last question, and an important one: has your headache ever come with any of these signs?",
        hint: "You can select several.",
        multiple: true,
        options: [
          { id: "thunderclap", label: "A sudden, extremely severe pain, the worst of your life, peaking within a minute" },
          { id: "fever", label: "Fever with a stiff neck" },
          { id: "neuro", label: "Weakness on one side of the body, trouble speaking or confusion" },
          { id: "trauma", label: "A headache that started after a blow to the head" },
          { id: "new", label: "A new headache after age 50, or one that suddenly changes in nature" },
          { id: "longAura", label: "Visual disturbances or tingling that last more than an hour" },
          { id: "none", label: "None of these", exclusive: true },
        ],
      },
    ],
    results: {
      urgent: {
        title: "See a doctor soon",
        text: "You selected at least one sign that calls for medical advice without delay. Most of the time the cause is not serious, but these symptoms need to be checked. If the pain is sudden and extremely severe, or if there is weakness on one side of the body or trouble speaking, call your local emergency number (911 in the US, 999 in the UK, 112 in Europe).",
        links: ["Learn more: ", { text: "aura is not a stroke, but it can look like one", href: "/blog/migraine-with-aura" }, "."],
      },
      migraine: {
        title: "Your headaches look like migraine",
        text: "Your answers match the criteria for migraine without aura: attacks lasting several hours, at least two typical pain features, and associated symptoms such as nausea or sensitivity to light and noise. Only a doctor can confirm the diagnosis, but it is a good starting point for that conversation.",
        links: ["Read next: ", { text: "migraine vs headache, how to tell the difference", href: "/blog/migraine-vs-headache" }, " and ", { text: "how to identify your triggers", href: "/blog/identify-migraine-triggers" }, "."],
      },
      migraineAura: {
        title: "Your headaches look like migraine with aura",
        text: "Your attacks have the features of migraine, and the symptoms you describe before the pain look like an aura. If they are new, unusual or last more than an hour, see a doctor to be sure.",
        links: ["Read next: ", { text: "understanding migraine with aura", href: "/blog/migraine-with-aura" }, " and ", { text: "ophthalmic migraine", href: "/blog/ophthalmic-migraine" }, "."],
      },
      auraPossible: {
        title: "Your symptoms look like a migraine aura",
        text: "Visual or sensory symptoms that last 5 to 60 minutes and then go away are typical of an aura, even when the pain that follows is mild, or absent. Talk to your doctor about it, especially if it is recent.",
        links: ["Read next: ", { text: "migraine with aura", href: "/blog/migraine-with-aura" }, " and ", { text: "ophthalmic migraine", href: "/blog/ophthalmic-migraine" }, "."],
      },
      migraineProbable: {
        title: "Your headaches partly look like migraine",
        text: "Your answers meet almost all the criteria for migraine, but not all of them. Neurologists call this probable migraine. Tracking your attacks for a month will help your doctor see more clearly.",
        links: ["Start with: ", { text: "the printable migraine diary", href: "/tools/migraine-diary" }, " or ", { text: "migraine vs headache, how to tell the difference", href: "/blog/migraine-vs-headache" }, "."],
      },
      tension: {
        title: "Your headaches look like tension-type headache",
        text: "A tight pain on both sides, mild to moderate, with no nausea and no worsening with activity: that is the profile of tension-type headache, the most common kind of headache. Stress, lack of sleep and posture are frequent causes.",
        links: ["Read next: ", { text: "migraine vs headache, how to tell the difference", href: "/blog/migraine-vs-headache" }, " and ", { text: "stress and migraines", href: "/blog/stress-and-migraines" }, "."],
      },
      unclear: {
        title: "Your answers don't clearly match one profile",
        text: "Your headaches don't clearly fit migraine or tension-type headache. That is not worrying in itself, but it is worth discussing with your doctor, ideally with a written record of your attacks.",
        links: ["To help: ", { text: "the printable migraine diary", href: "/tools/migraine-diary" }, "."],
      },
    },
    chronicNote: ["You have a headache 15 or more days a month: this is called a chronic form. Preventive treatments exist, talk to your doctor. ", { text: "Headache every day: the causes", href: "/blog/headache-every-day" }],
    overuseNote: ["You take a painkiller 10 or more days a month. Beyond that threshold, the risk of medication overuse rises: the medication itself can keep the headaches going. ", { text: "How to get out of medication overuse", href: "/blog/headache-every-day" }],
  },
};
