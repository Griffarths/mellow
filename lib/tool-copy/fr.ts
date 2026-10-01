import type { TestCopy } from "../migraine-test";
import type { DiaryCopy, TestPageCopy } from "../tools";

export const diary: DiaryCopy = {
  path: "/ressources/journal-de-migraine",
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
    "Page 1 du journal : calendrier du mois avec, pour chaque jour, l'intensité sur 10, une case médicament et de la place pour une note",
    "Page 2 du journal : tableau des crises avec date, horaires, intensité, symptômes, déclencheurs, médicament et soulagement sans médicament, chacun avec une case « ça a aidé »",
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
    "Chaque jour de crise, note l'intensité de 1 à 10 en bas de la case du jour.",
    "Coche « Méd. » si tu as pris un médicament de crise ce jour-là. Tu peux aussi écrire un mot dans la case : jour de règles, mauvaise nuit, stress.",
    "Pour chaque crise, remplis une ligne du tableau : heures de début et de fin, symptômes, déclencheurs possibles, médicament pris et soulagement sans médicament, en cochant pour chacun s'il a aidé.",
    "À la fin du mois, compte tes jours de migraine et tes jours avec médicament, puis apporte le journal à ta prochaine consultation.",
  ],
  doctorTitle: "Ce que ton médecin va regarder",
  doctor: [
    "Le nombre de jours de migraine par mois, pour savoir si un traitement de fond se discute.",
    "La durée et l'intensité des crises, pour choisir le bon traitement de crise.",
    "Le nombre de jours avec un médicament, pour repérer un abus médicamenteux.",
    "Les déclencheurs qui reviennent, et un éventuel lien avec les règles.",
  ],
  appTitle: "Mellow le remplit avec toi",
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
};

export const testPage: TestPageCopy = {
  path: "/ressources/test-migraine",
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
};

export const test: TestCopy = {
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
      links: ["Pour commencer : ", { text: "le journal de migraine à imprimer", href: "/ressources/journal-de-migraine" }, " ou ", { text: "migraine ou mal de tête, comment faire la différence", href: "/blog/migraine-ou-mal-de-tete" }, "."],
    },
    tension: {
      title: "Tes maux de tête ressemblent à une céphalée de tension",
      text: "Une douleur qui serre des deux côtés, légère à modérée, sans nausées ni aggravation à l'effort : c'est le profil de la céphalée de tension, le mal de tête le plus fréquent. Le stress, le manque de sommeil et la posture en sont souvent à l'origine.",
      links: ["À lire : ", { text: "migraine ou mal de tête, comment faire la différence", href: "/blog/migraine-ou-mal-de-tete" }, " et ", { text: "stress et migraines", href: "/blog/stress-et-migraines" }, "."],
    },
    unclear: {
      title: "Tes réponses ne correspondent pas nettement à un profil",
      text: "Tes maux de tête ne rentrent clairement ni dans la migraine ni dans la céphalée de tension. Ce n'est pas inquiétant en soi, mais cela vaut la peine d'en parler à ton médecin, avec une trace écrite de tes crises pour l'aider.",
      links: ["Pour t'aider : ", { text: "le journal de migraine à imprimer", href: "/ressources/journal-de-migraine" }, "."],
    },
  },
  chronicNote: ["Tu as mal à la tête 15 jours ou plus par mois : on parle alors de forme chronique. Des traitements de fond existent, parles-en à ton médecin. ", { text: "Mal de tête tous les jours : les causes", href: "/blog/mal-de-tete-tous-les-jours" }],
  overuseNote: ["Tu prends un médicament contre la douleur 10 jours ou plus par mois. Au-delà de ce seuil, le risque d'abus médicamenteux augmente : les médicaments eux-mêmes peuvent entretenir les maux de tête. ", { text: "Comment sortir de l'abus médicamenteux", href: "/blog/mal-de-tete-tous-les-jours" }],
};
