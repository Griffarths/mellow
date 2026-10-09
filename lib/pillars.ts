import type { BlogLocale } from "./blog";
import type { Tone } from "./tones";

// Blog categories, in the order of the blog navigation (a reader's path: the
// basics, recognize, know, avoid, treat, live with it). Each one has its own page
// (/blog/{slug}), an entry in the blog navigation and a label on the article cards.
export type PillarId = "triggers" | "symptoms" | "treatments" | "diagnosis" | "living" | "general";
export const PILLAR_IDS: PillarId[] = ["general", "symptoms", "diagnosis", "triggers", "treatments", "living"];

type PillarCopy = {
  slug: string;
  // Short name: tab, card label, breadcrumb.
  label: string;
  // Page heading.
  title: string;
  metaTitle: string;
  description: string;
  intro: string[];
  // Articles of the category, newest first (Blog Studio adds new ones when publishing).
  articles: string[];
};

type Pillar = { tone: Tone } & Record<BlogLocale, PillarCopy>;

// Each article belongs to exactly one category, in every language it exists in.
// New articles must be added here to appear on a category page (Blog Studio does
// it when publishing). A category shows up in a language once it has articles.
export const PILLARS: Record<PillarId, Pillar> = {
  triggers: {
    tone: "tagada",
    fr: {
      slug: "declencheurs-migraine",
      label: "Déclencheurs",
      title: "Les déclencheurs de la migraine",
      metaTitle: "Déclencheurs de migraine : sommeil, stress, écrans, règles",
      description: "Sommeil, stress, alimentation, écrans, météo, cycle hormonal : ce que disent les études sur les déclencheurs de migraine et comment repérer les tiens.",
      intro: [
        "Une crise de migraine a rarement une seule cause. Le plus souvent, plusieurs facteurs s'additionnent : une nuit trop courte, un repas sauté, une période de stress, la chute des hormones avant les règles. Les connaître, c'est pouvoir en éviter une partie.",
        "Ces articles passent en revue les déclencheurs les plus fréquents, ce qu'en disent vraiment les études, et comment repérer les tiens grâce à un carnet de crises.",
      ],
      articles: [
        "pilule-et-migraine",
        "migraine-et-ecrans",
        "migraines-du-week-end",
        "migraine-et-sommeil",
        "migraine-et-alimentation",
        "pression-atmospherique-migraines",
        "stress-et-migraines",
        "identifier-declencheurs-migraine",
        "migraine-et-regles",
      ],
    },
    en: {
      slug: "migraine-triggers",
      label: "Triggers",
      title: "Migraine triggers",
      metaTitle: "Migraine triggers: sleep, stress, screens and hormones",
      description: "Sleep, stress, food, screens, weather, hormonal cycle: what studies say about migraine triggers and how to spot your own.",
      intro: [
        "A migraine attack rarely has a single cause. More often, several factors add up: a short night, a skipped meal, a stressful week, the hormone drop before a period. Knowing them means you can avoid some of them.",
        "These articles go through the most common triggers, what studies really say about them, and how to spot your own with an attack diary.",
      ],
      articles: [
        "birth-control-and-migraine",
        "migraine-and-screens",
        "weekend-migraines",
        "migraine-and-sleep",
        "migraine-and-food",
        "barometric-pressure-and-migraines",
        "stress-and-migraines",
        "identify-migraine-triggers",
        "migraine-and-periods",
      ],
    },
    es: {
      slug: "desencadenantes-migrana",
      label: "Desencadenantes",
      title: "Desencadenantes de la migraña",
      metaTitle: "Desencadenantes de la migraña: sueño, estrés y hormonas",
      description: "Sueño, estrés, alimentación, pantallas, clima, ciclo hormonal: lo que dicen los estudios sobre los desencadenantes de la migraña y cómo detectar los tuyos.",
      intro: [
        "Una crisis de migraña rara vez tiene una sola causa. Casi siempre se suman varios factores: una noche corta, una comida saltada, una semana de estrés, la bajada hormonal antes de la regla. Conocerlos te permite evitar una parte.",
        "Estos artículos repasan los desencadenantes más frecuentes, lo que dicen de verdad los estudios y cómo identificar los tuyos con un diario de crisis.",
      ],
      articles: [
        "pastilla-anticonceptiva-migrana",
        "migrana-presion-atmosferica",
        "migrana-por-estres-circulo-vicioso",
        "migrana-menstrual-ciclo-crisis",
        "migrana-de-fin-de-semana",
        "dolor-de-cabeza-al-despertar-migrana-sueno",
        "desencadenantes-de-la-migrana-como-identificarlos",
        "alimentos-que-provocan-migrana",
        "migrana-y-pantallas-luz-azul",
      ],
    },
    "es-419": {
      slug: "desencadenantes-migrana",
      label: "Desencadenantes",
      title: "Desencadenantes de la migraña",
      metaTitle: "Desencadenantes de la migraña: sueño, estrés y hormonas",
      description: "Sueño, estrés, alimentación, pantallas, clima y ciclo hormonal: lo que dicen los estudios sobre los desencadenantes de la migraña y cómo reconocer los tuyos.",
      intro: [
        "Una crisis de migraña casi nunca tiene una sola causa. Lo común es que se sumen varios factores: dormir poco, saltarte una comida, una semana de estrés, la caída hormonal antes de la menstruación. Conocerlos te ayuda a evitar algunos.",
        "En estos artículos revisamos los desencadenantes más comunes, lo que dicen realmente los estudios y cómo reconocer los tuyos con un diario de crisis.",
      ],
      articles: [
        "pastillas-anticonceptivas-y-migrana",
        "migrana-presion-atmosferica",
        "migrana-por-estres-circulo-vicioso",
        "migrana-menstrual-ciclo-desencadena-crisis",
        "migrana-de-fin-de-semana",
        "dolor-de-cabeza-al-despertar-migrana-sueno",
        "desencadenantes-de-la-migrana-como-identificarlos",
        "alimentos-que-provocan-migrana",
        "luz-azul-y-migrana",
      ],
    },
    de: {
      slug: "migraene-ausloeser",
      label: "Auslöser",
      title: "Migräne-Auslöser",
      metaTitle: "Migräne-Auslöser: Schlaf, Stress, Bildschirm, Hormone",
      description: "Schlaf, Stress, Ernährung, Bildschirme, Wetter, Zyklus: Was Studien über Migräne-Auslöser sagen und wie du deine eigenen erkennst.",
      intro: [
        "Eine Migräneattacke hat selten nur eine Ursache. Meist kommen mehrere Faktoren zusammen: eine kurze Nacht, eine ausgelassene Mahlzeit, eine stressige Woche, der Hormonabfall vor der Periode. Wer sie kennt, kann einige davon vermeiden.",
        "Diese Artikel gehen die häufigsten Auslöser durch, zeigen, was Studien wirklich dazu sagen, und wie du deine eigenen mit einem Kopfschmerztagebuch erkennst.",
      ],
      articles: [
        "pille-und-migraene",
        "stress-und-migraene",
        "migraene-und-periode",
        "migraene-ernaehrung-ausloeser",
        "migraene-ausloeser-erkennen",
        "migraene-am-wochenende",
        "migraene-am-morgen-schlaf",
        "luftdruck-migraene",
        "migraene-bildschirm-blaulicht",
      ],
    },
    it: {
      slug: "emicrania-fattori-scatenanti",
      label: "Fattori scatenanti",
      title: "I fattori scatenanti dell'emicrania",
      metaTitle: "Fattori scatenanti dell'emicrania: sonno, stress, ormoni",
      description: "Sonno, stress, alimentazione, schermi, meteo, ciclo ormonale: cosa dicono gli studi sui fattori scatenanti dell'emicrania e come riconoscere i tuoi.",
      intro: [
        "Un attacco di emicrania raramente ha una sola causa. Più spesso si sommano diversi fattori: una notte corta, un pasto saltato, una settimana stressante, il calo ormonale prima del ciclo. Conoscerli ti permette di evitarne una parte.",
        "Questi articoli passano in rassegna i fattori scatenanti più frequenti, cosa dicono davvero gli studi e come riconoscere i tuoi con un diario degli attacchi.",
      ],
      articles: [
        "pillola-anticoncezionale-emicrania",
        "pressione-atmosferica-emicrania",
        "mal-di-testa-al-risveglio-emicrania-sonno",
        "fattori-scatenanti-emicrania",
        "emicrania-mestruale-ciclo-perche",
        "emicrania-e-alimentazione",
        "emicrania-del-weekend",
        "emicrania-da-stress",
        "emicrania-e-schermi-luce-blu",
      ],
    },
    pt: {
      slug: "desencadeantes-enxaqueca",
      label: "Desencadeantes",
      title: "Desencadeantes da enxaqueca",
      metaTitle: "Desencadeantes da enxaqueca: sono, stress e hormonas",
      description: "Sono, stress, alimentação, ecrãs, tempo, ciclo hormonal: o que dizem os estudos sobre os desencadeantes da enxaqueca e como identificar os teus.",
      intro: [
        "Uma crise de enxaqueca raramente tem uma só causa. Na maioria das vezes, juntam-se vários fatores: uma noite curta, uma refeição saltada, uma semana de stress, a descida hormonal antes da menstruação. Conhecê-los permite evitar uma parte.",
        "Estes artigos revêem os desencadeantes mais frequentes, o que dizem realmente os estudos e como identificar os teus com um diário de crises.",
      ],
      articles: [
        "pilula-e-enxaqueca",
        "pressao-atmosferica-enxaqueca",
        "enxaqueca-menstrual-ciclo-crises",
        "enxaqueca-e-stress",
        "enxaqueca-ao-fim-de-semana",
        "dor-de-cabeca-ao-acordar-enxaqueca-sono",
        "desencadeantes-da-enxaqueca",
        "alimentos-que-causam-enxaqueca",
        "enxaqueca-e-ecras-luz-azul",
      ],
    },
    "pt-BR": {
      slug: "gatilhos-enxaqueca",
      label: "Gatilhos",
      title: "Gatilhos da enxaqueca",
      metaTitle: "Gatilhos da enxaqueca: sono, estresse, telas e hormônios",
      description: "Sono, estresse, alimentação, telas, clima, ciclo hormonal: o que os estudos dizem sobre os gatilhos da enxaqueca e como identificar os seus.",
      intro: [
        "Uma crise de enxaqueca raramente tem uma causa só. Na maioria das vezes, vários fatores se somam: uma noite mal dormida, uma refeição pulada, uma semana de estresse, a queda dos hormônios antes da menstruação. Conhecer esses fatores ajuda a evitar parte deles.",
        "Estes artigos passam pelos gatilhos mais comuns, pelo que os estudos realmente dizem e por como identificar os seus com um diário de crises.",
      ],
      articles: [
        "anticoncepcional-e-enxaqueca",
        "pressao-atmosferica-e-enxaqueca",
        "gatilhos-da-enxaqueca-como-identificar",
        "estresse-e-enxaqueca-ciclo-vicioso",
        "enxaqueca-menstrual-ciclo-crises",
        "enxaqueca-de-fim-de-semana",
        "dor-de-cabeca-ao-acordar-enxaqueca-sono",
        "alimentos-que-causam-enxaqueca",
        "luz-azul-enxaqueca-telas",
      ],
    },
  },
  symptoms: {
    tone: "fleur",
    fr: {
      slug: "symptomes-migraine",
      label: "Symptômes",
      title: "Les symptômes de la migraine",
      metaTitle: "Symptômes de la migraine : aura, durée, types de migraine",
      description: "Aura, migraine sans aura, migraine ophtalmique, durée d'une crise, migraine liée aux règles : reconnaître les symptômes et les différentes formes de migraine.",
      intro: [
        "La migraine ne se résume pas à un mal de tête. Elle peut s'accompagner de nausées, d'une sensibilité à la lumière et au bruit, et parfois d'une aura visuelle avant la douleur. Selon les personnes, les crises n'ont pas la même forme ni la même durée.",
        "Ces articles t'aident à reconnaître les symptômes, à comprendre les différents types de migraine et à savoir combien de temps une crise peut durer.",
      ],
      articles: [
        "types-de-migraine",
        "migraine-sans-aura",
        "migraine-catameniale",
        "migraine-ophtalmique",
        "migraine-avec-aura",
        "combien-de-temps-dure-une-migraine",
      ],
    },
    en: {
      slug: "migraine-symptoms",
      label: "Symptoms",
      title: "Migraine symptoms",
      metaTitle: "Migraine symptoms: aura, duration and types of migraine",
      description: "Aura, migraine without aura, ocular migraine, how long an attack lasts, menstrual migraine: recognize the symptoms and the different forms of migraine.",
      intro: [
        "Migraine is more than a headache. It can come with nausea, sensitivity to light and noise, and sometimes a visual aura before the pain. Attacks do not look the same or last the same time for everyone.",
        "These articles help you recognize the symptoms, understand the different types of migraine and know how long an attack can last.",
      ],
      articles: [
        "types-of-migraine",
        "migraine-without-aura",
        "menstrual-migraine",
        "ophthalmic-migraine",
        "migraine-with-aura",
        "how-long-does-a-migraine-last",
      ],
    },
    es: {
      slug: "sintomas-migrana",
      label: "Síntomas",
      title: "Síntomas de la migraña",
      metaTitle: "Síntomas de la migraña: aura, duración y tipos",
      description: "Aura, migraña sin aura, migraña oftálmica, duración de una crisis, migraña menstrual: cómo reconocer los síntomas y las distintas formas de migraña.",
      intro: [
        "La migraña no es solo un dolor de cabeza. Puede venir con náuseas, sensibilidad a la luz y al ruido, y a veces un aura visual antes del dolor. Las crisis no tienen la misma forma ni la misma duración en todas las personas.",
        "Estos artículos te ayudan a reconocer los síntomas, entender los distintos tipos de migraña y saber cuánto puede durar una crisis.",
      ],
      articles: [
        "tipos-de-migrana",
        "migrana-sin-aura-sintomas-duracion",
        "migrana-ocular-que-es-sintomas",
        "migrana-menstrual-regla",
        "migrana-con-aura-sintomas",
        "cuanto-dura-una-migrana",
      ],
    },
    "es-419": {
      slug: "sintomas-migrana",
      label: "Síntomas",
      title: "Síntomas de la migraña",
      metaTitle: "Síntomas de la migraña: aura, duración y tipos",
      description: "Aura, migraña sin aura, migraña oftálmica, cuánto dura una crisis y migraña menstrual: cómo reconocer los síntomas y los distintos tipos de migraña.",
      intro: [
        "La migraña es mucho más que un dolor de cabeza. Puede venir acompañada de náuseas, sensibilidad a la luz y al ruido, y a veces de un aura visual antes del dolor. Las crisis no se ven igual ni duran lo mismo en todas las personas.",
        "En estos artículos te ayudamos a reconocer los síntomas, entender los distintos tipos de migraña y saber cuánto puede durar una crisis.",
      ],
      articles: [
        "tipos-de-migrana",
        "migrana-sin-aura-sintomas-duracion",
        "migrana-ocular-que-es-sintomas",
        "migrana-menstrual",
        "migrana-con-aura-senales-antes-de-la-crisis",
        "cuanto-dura-una-migrana",
      ],
    },
    de: {
      slug: "migraene-symptome",
      label: "Symptome",
      title: "Migräne-Symptome",
      metaTitle: "Migräne-Symptome: Aura, Dauer und Migräneformen",
      description: "Aura, Migräne ohne Aura, Augenmigräne, Dauer einer Attacke, menstruelle Migräne: So erkennst du die Symptome und die verschiedenen Formen der Migräne.",
      intro: [
        "Migräne ist mehr als Kopfschmerz. Sie kann mit Übelkeit, Licht- und Lärmempfindlichkeit und manchmal mit einer visuellen Aura vor dem Schmerz einhergehen. Attacken sehen nicht bei allen gleich aus und dauern nicht gleich lang.",
        "Diese Artikel helfen dir, die Symptome zu erkennen, die verschiedenen Migräneformen zu verstehen und einzuschätzen, wie lange eine Attacke dauern kann.",
      ],
      articles: [
        "migraene-arten-formen-ueberblick",
        "migraene-ohne-aura",
        "wie-lange-dauert-eine-migraene",
        "migraene-mit-aura",
        "menstruelle-migraene",
        "augenmigraene",
      ],
    },
    it: {
      slug: "sintomi-emicrania",
      label: "Sintomi",
      title: "I sintomi dell'emicrania",
      metaTitle: "Sintomi dell'emicrania: aura, durata e tipi di emicrania",
      description: "Aura, emicrania senza aura, emicrania oftalmica, durata di un attacco, emicrania mestruale: riconoscere i sintomi e le diverse forme di emicrania.",
      intro: [
        "L'emicrania non è solo mal di testa. Può accompagnarsi a nausea, sensibilità alla luce e ai rumori e talvolta a un'aura visiva prima del dolore. Gli attacchi non hanno la stessa forma né la stessa durata per tutti.",
        "Questi articoli ti aiutano a riconoscere i sintomi, a capire i diversi tipi di emicrania e a sapere quanto può durare un attacco.",
      ],
      articles: [
        "tipi-di-emicrania",
        "emicrania-senza-aura-sintomi-durata",
        "quanto-dura-emicrania",
        "emicrania-oftalmica",
        "emicrania-mestruale",
        "emicrania-con-aura-sintomi",
      ],
    },
    pt: {
      slug: "sintomas-enxaqueca",
      label: "Sintomas",
      title: "Sintomas da enxaqueca",
      metaTitle: "Sintomas da enxaqueca: aura, duração e tipos",
      description: "Aura, enxaqueca sem aura, enxaqueca oftálmica, duração de uma crise, enxaqueca menstrual: reconhecer os sintomas e as diferentes formas de enxaqueca.",
      intro: [
        "A enxaqueca não é só uma dor de cabeça. Pode vir com náuseas, sensibilidade à luz e ao ruído e, por vezes, uma aura visual antes da dor. As crises não têm a mesma forma nem a mesma duração para todos.",
        "Estes artigos ajudam-te a reconhecer os sintomas, a perceber os diferentes tipos de enxaqueca e a saber quanto tempo pode durar uma crise.",
      ],
      articles: [
        "tipos-de-enxaqueca",
        "enxaqueca-sem-aura-sintomas-duracao",
        "quanto-tempo-dura-uma-enxaqueca",
        "enxaqueca-ocular-oftalmica",
        "enxaqueca-menstrual",
        "enxaqueca-com-aura-sinais-antes-da-crise",
      ],
    },
    "pt-BR": {
      slug: "sintomas-enxaqueca",
      label: "Sintomas",
      title: "Sintomas da enxaqueca",
      metaTitle: "Sintomas da enxaqueca: aura, duração e tipos",
      description: "Aura, enxaqueca sem aura, enxaqueca oftálmica, duração de uma crise, enxaqueca menstrual: como reconhecer os sintomas e os diferentes tipos de enxaqueca.",
      intro: [
        "Enxaqueca não é só dor de cabeça. Ela pode vir com náusea, sensibilidade à luz e ao barulho e, às vezes, uma aura visual antes da dor. As crises não têm a mesma forma nem a mesma duração para todo mundo.",
        "Estes artigos ajudam você a reconhecer os sintomas, entender os diferentes tipos de enxaqueca e saber quanto tempo uma crise pode durar.",
      ],
      articles: [
        "tipos-de-enxaqueca",
        "enxaqueca-sem-aura-sintomas-duracao",
        "quanto-tempo-dura-uma-crise-de-enxaqueca",
        "enxaqueca-ocular-aura-visual",
        "enxaqueca-menstrual",
        "enxaqueca-com-aura-sinais-antes-da-crise",
      ],
    },
  },
  treatments: {
    tone: "sable",
    fr: {
      slug: "traitements-migraine",
      label: "Traitements",
      title: "Les traitements de la migraine",
      metaTitle: "Traitements de la migraine : triptans, anti-CGRP, Botox",
      description: "Triptans, anti-CGRP, Botox, magnésium, méthodes sans médicament : ce que l'on sait des traitements de crise et de fond de la migraine, expliqué simplement.",
      intro: [
        "Il existe deux grandes familles de traitements : ceux qui calment une crise en cours, et ceux qui en réduisent la fréquence, dits traitements de fond. Le bon choix dépend du nombre de crises, de leur intensité et de ton profil, et il se fait avec ton médecin.",
        "Ces articles expliquent simplement comment fonctionnent les principaux traitements, ce que disent les études et ce que tu peux essayer sans médicament.",
      ],
      articles: [
        "botox-migraine-chronique",
        "magnesium-et-migraine",
        "anti-cgrp-migraine",
        "triptans-tout-comprendre",
        "soulager-migraine-sans-medicament",
      ],
    },
    en: {
      slug: "migraine-treatments",
      label: "Treatments",
      title: "Migraine treatments",
      metaTitle: "Migraine treatments: triptans, CGRP drugs and Botox",
      description: "Triptans, CGRP drugs, Botox, magnesium, drug-free methods: what we know about acute and preventive migraine treatments, explained simply.",
      intro: [
        "There are two main families of treatment: those that ease an attack in progress, and preventive treatments that reduce how often attacks happen. The right choice depends on how many attacks you have, how severe they are and your own situation, and it is made with your doctor.",
        "These articles explain in plain words how the main treatments work, what studies say and what you can try without medication.",
      ],
      articles: [
        "botox-for-chronic-migraine",
        "magnesium-and-migraine",
        "cgrp-migraine-treatment",
        "triptans-explained",
        "relieve-migraine-without-medication",
      ],
    },
    es: {
      slug: "tratamientos-migrana",
      label: "Tratamientos",
      title: "Tratamientos de la migraña",
      metaTitle: "Tratamientos de la migraña: triptanes, anti-CGRP y bótox",
      description: "Triptanes, anti-CGRP, bótox, magnesio, métodos sin fármacos: lo que se sabe de los tratamientos de la crisis y preventivos de la migraña, explicado con claridad.",
      intro: [
        "Hay dos grandes familias de tratamientos: los que alivian una crisis en curso y los preventivos, que reducen su frecuencia. La mejor opción depende del número de crisis, de su intensidad y de tu situación, y se decide con tu médico.",
        "Estos artículos explican de forma sencilla cómo funcionan los principales tratamientos, qué dicen los estudios y qué puedes probar sin medicamentos.",
      ],
      articles: [
        "triptanes-para-la-migrana",
        "magnesio-para-la-migrana",
        "como-aliviar-una-migrana-sin-medicamentos",
        "anti-cgrp-migrana-tratamiento-preventivo",
        "botox-migrana-cronica-protocolo-preempt",
      ],
    },
    "es-419": {
      slug: "tratamientos-migrana",
      label: "Tratamientos",
      title: "Tratamientos para la migraña",
      metaTitle: "Tratamientos para la migraña: triptanes, anti-CGRP y Botox",
      description: "Triptanes, anti-CGRP, Botox, magnesio y métodos sin medicamentos: lo que se sabe sobre los tratamientos para la crisis y los preventivos de la migraña.",
      intro: [
        "Existen dos grandes grupos de tratamientos: los que alivian una crisis que ya empezó y los preventivos, que reducen su frecuencia. La mejor opción depende de cuántas crisis tienes, de su intensidad y de tu situación, y se decide con tu médico.",
        "En estos artículos explicamos de forma sencilla cómo funcionan los principales tratamientos, qué dicen los estudios y qué puedes probar sin medicamentos.",
      ],
      articles: [
        "triptanes-para-la-migrana",
        "magnesio-para-la-migrana",
        "como-aliviar-una-migrana-sin-medicamentos",
        "anti-cgrp-migrana-tratamiento-preventivo",
        "botox-para-migrana-cronica-protocolo-preempt",
      ],
    },
    de: {
      slug: "migraene-behandlung",
      label: "Behandlung",
      title: "Migräne-Behandlung",
      metaTitle: "Migräne-Behandlung: Triptane, CGRP-Antikörper, Botox",
      description: "Triptane, CGRP-Antikörper, Botox, Magnesium, Methoden ohne Medikamente: was über Akut- und Vorbeugebehandlung der Migräne bekannt ist, einfach erklärt.",
      intro: [
        "Es gibt zwei große Gruppen von Behandlungen: solche, die eine laufende Attacke lindern, und vorbeugende Behandlungen, die Attacken seltener machen sollen. Welche passt, hängt von der Zahl und Stärke deiner Attacken und deiner Situation ab, und das entscheidest du mit deiner Ärztin oder deinem Arzt.",
        "Diese Artikel erklären einfach, wie die wichtigsten Behandlungen wirken, was Studien zeigen und was du ohne Medikamente ausprobieren kannst.",
      ],
      articles: [
        "triptane-bei-migraene",
        "migraene-hausmittel-ohne-medikamente",
        "magnesium-bei-migraene",
        "cgrp-antikoerper-migraene",
        "botox-migraene-preempt-schema",
      ],
    },
    it: {
      slug: "trattamenti-emicrania",
      label: "Trattamenti",
      title: "I trattamenti dell'emicrania",
      metaTitle: "Trattamenti dell'emicrania: triptani, anti-CGRP e Botox",
      description: "Triptani, anti-CGRP, Botox, magnesio, metodi senza farmaci: cosa si sa dei trattamenti dell'attacco e di profilassi dell'emicrania, spiegato in modo semplice.",
      intro: [
        "Esistono due grandi famiglie di trattamenti: quelli che calmano un attacco in corso e quelli di profilassi, che ne riducono la frequenza. La scelta giusta dipende dal numero di attacchi, dalla loro intensità e dalla tua situazione, e si fa con il medico.",
        "Questi articoli spiegano in modo semplice come funzionano i principali trattamenti, cosa dicono gli studi e cosa puoi provare senza farmaci.",
      ],
      articles: [
        "triptani-emicrania",
        "rimedi-emicrania-senza-farmaci",
        "magnesio-emicrania",
        "anticorpi-monoclonali-emicrania-anti-cgrp",
        "botox-emicrania-cronica-protocollo-preempt",
      ],
    },
    pt: {
      slug: "tratamentos-enxaqueca",
      label: "Tratamentos",
      title: "Tratamentos da enxaqueca",
      metaTitle: "Tratamentos da enxaqueca: triptanos, anti-CGRP e Botox",
      description: "Triptanos, anti-CGRP, Botox, magnésio, métodos sem medicamentos: o que se sabe dos tratamentos de crise e preventivos da enxaqueca, explicado de forma simples.",
      intro: [
        "Há duas grandes famílias de tratamentos: os que aliviam uma crise em curso e os preventivos, que reduzem a frequência das crises. A escolha certa depende do número de crises, da sua intensidade e da tua situação, e faz-se com o teu médico.",
        "Estes artigos explicam de forma simples como funcionam os principais tratamentos, o que dizem os estudos e o que podes experimentar sem medicamentos.",
      ],
      articles: [
        "triptanos-enxaqueca",
        "magnesio-para-enxaqueca-forma-dose",
        "anti-cgrp-enxaqueca-tratamento-preventivo",
        "aliviar-enxaqueca-sem-medicamentos",
        "botox-enxaqueca-cronica-protocolo-preempt",
      ],
    },
    "pt-BR": {
      slug: "tratamentos-enxaqueca",
      label: "Tratamentos",
      title: "Tratamentos da enxaqueca",
      metaTitle: "Tratamentos da enxaqueca: triptanos, anti-CGRP e Botox",
      description: "Triptanos, anti-CGRP, Botox, magnésio, métodos sem remédio: o que se sabe sobre os tratamentos da crise e preventivos da enxaqueca, explicado de forma simples.",
      intro: [
        "Existem duas grandes famílias de tratamento: os que aliviam uma crise em andamento e os preventivos, que diminuem a frequência das crises. A escolha certa depende de quantas crises você tem, da intensidade delas e da sua situação, e é feita com o seu médico.",
        "Estes artigos explicam de um jeito simples como funcionam os principais tratamentos, o que os estudos dizem e o que você pode testar sem remédio.",
      ],
      articles: [
        "triptanos-para-enxaqueca",
        "magnesio-para-enxaqueca",
        "como-aliviar-enxaqueca-sem-remedio",
        "anti-cgrp-enxaqueca-tratamento-preventivo",
        "botox-para-enxaqueca-cronica-protocolo-preempt",
      ],
    },
  },
  diagnosis: {
    tone: "croix",
    fr: {
      slug: "diagnostic-migraine",
      label: "Diagnostic",
      title: "Le diagnostic de la migraine",
      metaTitle: "Diagnostic de la migraine : migraine ou mal de tête ?",
      description: "Migraine ou mal de tête, maux de tête quotidiens, signes qui doivent faire consulter en urgence, part de l'hérédité : comprendre comment la migraine se diagnostique.",
      intro: [
        "Il n'existe pas d'examen sanguin ni d'imagerie qui prouve une migraine : le diagnostic se fait en consultation, à partir de tes symptômes et de l'histoire de tes crises. D'où l'importance de bien décrire ce que tu vis.",
        "Ces articles t'aident à distinguer une migraine d'un autre mal de tête, à repérer les signes qui doivent faire consulter rapidement et à comprendre le rôle de l'hérédité.",
      ],
      articles: [
        "mal-de-tete-quand-aller-aux-urgences",
        "migraine-hereditaire-genetique-transmission",
        "mal-de-tete-tous-les-jours",
        "migraine-ou-mal-de-tete",
      ],
    },
    en: {
      slug: "migraine-diagnosis",
      label: "Diagnosis",
      title: "Migraine diagnosis",
      metaTitle: "Migraine diagnosis: migraine or headache?",
      description: "Migraine or headache, daily headaches, warning signs that need urgent care, the role of heredity: understand how migraine is diagnosed.",
      intro: [
        "No blood test or scan proves a migraine: the diagnosis is made in a consultation, based on your symptoms and the history of your attacks. That is why describing what you experience clearly matters.",
        "These articles help you tell a migraine from another headache, spot the signs that call for quick medical care and understand the role of heredity.",
      ],
      articles: [
        "when-to-go-to-the-er-for-a-migraine",
        "is-migraine-hereditary",
        "headache-every-day",
        "migraine-vs-headache",
      ],
    },
    es: {
      slug: "diagnostico-migrana",
      label: "Diagnóstico",
      title: "Diagnóstico de la migraña",
      metaTitle: "Diagnóstico de la migraña: ¿migraña o dolor de cabeza?",
      description: "Migraña o dolor de cabeza, dolor de cabeza diario, señales para ir a urgencias, papel de la herencia: cómo se diagnostica la migraña.",
      intro: [
        "No hay análisis de sangre ni prueba de imagen que demuestre una migraña: el diagnóstico se hace en consulta, a partir de tus síntomas y de la historia de tus crisis. Por eso es tan importante describir bien lo que te pasa.",
        "Estos artículos te ayudan a distinguir una migraña de otro dolor de cabeza, a reconocer las señales que requieren consultar rápido y a entender el papel de la herencia.",
      ],
      articles: [
        "cuando-ir-a-urgencias-por-dolor-de-cabeza",
        "dolor-de-cabeza-todos-los-dias",
        "diferencia-migrana-dolor-de-cabeza",
        "migrana-hereditaria-genetica",
      ],
    },
    "es-419": {
      slug: "diagnostico-migrana",
      label: "Diagnóstico",
      title: "Diagnóstico de la migraña",
      metaTitle: "Diagnóstico de la migraña: ¿migraña o dolor de cabeza?",
      description: "Migraña o dolor de cabeza, dolor de cabeza diario, señales para ir a urgencias y el papel de la herencia: cómo se diagnostica la migraña.",
      intro: [
        "No existe un análisis de sangre ni un estudio de imagen que confirme una migraña: el diagnóstico se hace en la consulta, a partir de tus síntomas y de la historia de tus crisis. Por eso es clave describir bien lo que te pasa.",
        "En estos artículos te ayudamos a distinguir una migraña de otro dolor de cabeza, a reconocer las señales para consultar de inmediato y a entender el papel de la herencia.",
      ],
      articles: [
        "cuando-ir-a-urgencias-por-dolor-de-cabeza",
        "dolor-de-cabeza-todos-los-dias",
        "diferencia-migrana-dolor-de-cabeza",
        "la-migrana-es-hereditaria",
      ],
    },
    de: {
      slug: "migraene-diagnose",
      label: "Diagnose",
      title: "Migräne-Diagnose",
      metaTitle: "Migräne-Diagnose: Migräne oder Kopfschmerz?",
      description: "Migräne oder Kopfschmerz, tägliche Kopfschmerzen, Warnzeichen für den Notfall, die Rolle der Vererbung: So wird Migräne diagnostiziert.",
      intro: [
        "Es gibt keinen Bluttest und keine Bildgebung, die Migräne beweist: Die Diagnose entsteht im Gespräch mit der Ärztin oder dem Arzt, anhand deiner Symptome und des Verlaufs deiner Attacken. Deshalb lohnt es sich, genau zu beschreiben, was du erlebst.",
        "Diese Artikel helfen dir, Migräne von anderen Kopfschmerzen zu unterscheiden, Warnzeichen für eine schnelle Abklärung zu erkennen und die Rolle der Vererbung zu verstehen.",
      ],
      articles: [
        "kopfschmerzen-wann-zum-notarzt",
        "migraene-oder-kopfschmerzen-unterschied",
        "jeden-tag-kopfschmerzen",
        "migraene-erblich",
      ],
    },
    it: {
      slug: "diagnosi-emicrania",
      label: "Diagnosi",
      title: "La diagnosi dell'emicrania",
      metaTitle: "Diagnosi dell'emicrania: emicrania o mal di testa?",
      description: "Emicrania o mal di testa, mal di testa quotidiano, segnali da pronto soccorso, ruolo dell'ereditarietà: come si arriva alla diagnosi di emicrania.",
      intro: [
        "Non esiste un esame del sangue o di imaging che dimostri un'emicrania: la diagnosi si fa durante la visita, a partire dai tuoi sintomi e dalla storia dei tuoi attacchi. Per questo è importante descrivere bene quello che vivi.",
        "Questi articoli ti aiutano a distinguere un'emicrania da un altro mal di testa, a riconoscere i segnali che richiedono una visita rapida e a capire il ruolo dell'ereditarietà.",
      ],
      articles: [
        "mal-di-testa-quando-andare-al-pronto-soccorso",
        "mal-di-testa-tutti-i-giorni",
        "differenza-tra-emicrania-e-mal-di-testa",
        "emicrania-ereditaria",
      ],
    },
    pt: {
      slug: "diagnostico-enxaqueca",
      label: "Diagnóstico",
      title: "Diagnóstico da enxaqueca",
      metaTitle: "Diagnóstico da enxaqueca: enxaqueca ou dor de cabeça?",
      description: "Enxaqueca ou dor de cabeça, dores de cabeça diárias, sinais de alarme para a urgência, papel da hereditariedade: como se diagnostica a enxaqueca.",
      intro: [
        "Não há análise ao sangue nem exame de imagem que prove uma enxaqueca: o diagnóstico faz-se na consulta, a partir dos teus sintomas e da história das tuas crises. Por isso é importante descrever bem o que sentes.",
        "Estes artigos ajudam-te a distinguir uma enxaqueca de outra dor de cabeça, a reconhecer os sinais que pedem uma consulta rápida e a perceber o papel da hereditariedade.",
      ],
      articles: [
        "dor-de-cabeca-quando-ir-as-urgencias",
        "dor-de-cabeca-todos-os-dias",
        "diferenca-entre-enxaqueca-e-dor-de-cabeca",
        "enxaqueca-hereditaria",
      ],
    },
    "pt-BR": {
      slug: "diagnostico-enxaqueca",
      label: "Diagnóstico",
      title: "Diagnóstico da enxaqueca",
      metaTitle: "Diagnóstico da enxaqueca: enxaqueca ou dor de cabeça?",
      description: "Enxaqueca ou dor de cabeça, dor de cabeça todo dia, sinais para ir ao pronto-socorro, papel da genética: como a enxaqueca é diagnosticada.",
      intro: [
        "Não existe exame de sangue nem de imagem que comprove uma enxaqueca: o diagnóstico é feito na consulta, a partir dos seus sintomas e do histórico das suas crises. Por isso vale a pena descrever bem o que você sente.",
        "Estes artigos ajudam você a diferenciar uma enxaqueca de outra dor de cabeça, reconhecer os sinais que pedem atendimento rápido e entender o papel da genética.",
      ],
      articles: [
        "dor-de-cabeca-quando-ir-ao-pronto-socorro",
        "dor-de-cabeca-todos-os-dias",
        "diferenca-entre-enxaqueca-e-dor-de-cabeca",
        "enxaqueca-e-hereditaria",
      ],
    },
  },
  living: {
    tone: "sable",
    fr: {
      slug: "vivre-avec-la-migraine",
      label: "Vivre avec la migraine",
      title: "Vivre avec la migraine",
      metaTitle: "Vivre avec la migraine : carnet, enfants et quotidien",
      description: "Tenir un carnet de crises, accompagner un enfant migraineux, organiser son quotidien : des conseils concrets pour vivre mieux avec la migraine.",
      intro: [
        "La migraine ne s'arrête pas à la crise : elle pèse sur le travail, l'école, la vie de famille et les projets. Quelques habitudes simples aident à reprendre la main, comme noter ses crises ou préparer ses rendez-vous.",
        "Ces articles rassemblent des conseils concrets pour le quotidien, pour toi comme pour un enfant ou un adolescent qui vit avec la migraine.",
      ],
      articles: [
        "carnet-de-migraine-quoi-noter",
        "migraine-enfant-adolescent",
      ],
    },
    en: {
      slug: "living-with-migraine",
      label: "Living with migraine",
      title: "Living with migraine",
      metaTitle: "Living with migraine: diary, children and daily life",
      description: "Keeping an attack diary, supporting a child with migraine, organizing daily life: practical advice to live better with migraine.",
      intro: [
        "Migraine does not stop when the attack ends: it weighs on work, school, family life and plans. A few simple habits help you take back some control, such as tracking your attacks or preparing your appointments.",
        "These articles gather practical advice for daily life, for you as well as for a child or teenager living with migraine.",
      ],
      articles: [
        "migraine-diary-what-to-note",
        "migraine-in-children-and-teens",
      ],
    },
    es: {
      slug: "vivir-con-migrana",
      label: "Vivir con migraña",
      title: "Vivir con migraña",
      metaTitle: "Vivir con migraña: diario, niños y día a día",
      description: "Llevar un diario de crisis, acompañar a un niño con migraña, organizar el día a día: consejos prácticos para vivir mejor con la migraña.",
      intro: [
        "La migraña no termina con la crisis: pesa en el trabajo, en los estudios, en la vida familiar y en los planes. Algunos hábitos sencillos ayudan a recuperar el control, como anotar tus crisis o preparar tus consultas.",
        "Estos artículos reúnen consejos prácticos para el día a día, para ti y para un niño o adolescente que vive con migraña.",
      ],
      articles: [
        "diario-de-migrana-que-anotar",
        "migrana-infantil-guia-para-padres",
      ],
    },
    "es-419": {
      slug: "vivir-con-migrana",
      label: "Vivir con migraña",
      title: "Vivir con migraña",
      metaTitle: "Vivir con migraña: diario, niños y día a día",
      description: "Llevar un diario de crisis, acompañar a un niño con migraña y organizar el día a día: consejos prácticos para vivir mejor con la migraña.",
      intro: [
        "La migraña no termina cuando pasa la crisis: pesa en el trabajo, en la escuela, en la vida familiar y en los planes. Algunos hábitos sencillos te ayudan a recuperar el control, como anotar tus crisis o preparar tus consultas.",
        "En estos artículos reunimos consejos prácticos para el día a día, para ti y para un niño o adolescente que vive con migraña.",
      ],
      articles: [
        "diario-de-migrana-que-anotar",
        "migrana-en-ninos-guia-para-padres",
      ],
    },
    de: {
      slug: "leben-mit-migraene",
      label: "Leben mit Migräne",
      title: "Leben mit Migräne",
      metaTitle: "Leben mit Migräne: Tagebuch, Kinder und Alltag",
      description: "Ein Kopfschmerztagebuch führen, ein Kind mit Migräne begleiten, den Alltag organisieren: praktische Tipps, um besser mit Migräne zu leben.",
      intro: [
        "Migräne endet nicht mit der Attacke: Sie belastet Arbeit, Schule, Familienleben und Pläne. Ein paar einfache Gewohnheiten helfen, wieder mehr Kontrolle zu gewinnen, etwa Attacken notieren oder Arzttermine vorbereiten.",
        "Diese Artikel sammeln praktische Tipps für den Alltag, für dich und für Kinder oder Jugendliche mit Migräne.",
      ],
      articles: [
        "migraenekalender-was-notieren",
        "migraene-bei-kindern",
      ],
    },
    it: {
      slug: "vivere-con-emicrania",
      label: "Vivere con l'emicrania",
      title: "Vivere con l'emicrania",
      metaTitle: "Vivere con l'emicrania: diario, bambini e vita quotidiana",
      description: "Tenere un diario degli attacchi, accompagnare un bambino con emicrania, organizzare la giornata: consigli pratici per vivere meglio con l'emicrania.",
      intro: [
        "L'emicrania non finisce con l'attacco: pesa sul lavoro, sulla scuola, sulla vita familiare e sui progetti. Qualche abitudine semplice aiuta a riprendere il controllo, come annotare gli attacchi o preparare le visite.",
        "Questi articoli raccolgono consigli pratici per la vita di tutti i giorni, per te e per un bambino o un adolescente che convive con l'emicrania.",
      ],
      articles: [
        "diario-dell-emicrania-cosa-annotare",
        "emicrania-nei-bambini",
      ],
    },
    pt: {
      slug: "viver-com-enxaqueca",
      label: "Viver com enxaqueca",
      title: "Viver com enxaqueca",
      metaTitle: "Viver com enxaqueca: diário, crianças e dia a dia",
      description: "Manter um diário de crises, acompanhar uma criança com enxaqueca, organizar o dia a dia: conselhos práticos para viver melhor com a enxaqueca.",
      intro: [
        "A enxaqueca não acaba com a crise: pesa no trabalho, na escola, na vida familiar e nos planos. Alguns hábitos simples ajudam a recuperar o controlo, como registar as crises ou preparar as consultas.",
        "Estes artigos reúnem conselhos práticos para o dia a dia, para ti e para uma criança ou adolescente que vive com enxaqueca.",
      ],
      articles: [
        "diario-de-enxaqueca-o-que-anotar",
        "enxaqueca-em-criancas-guia-para-pais",
      ],
    },
    "pt-BR": {
      slug: "conviver-com-enxaqueca",
      label: "Conviver com a enxaqueca",
      title: "Conviver com a enxaqueca",
      metaTitle: "Conviver com a enxaqueca: diário, crianças e rotina",
      description: "Manter um diário de crises, apoiar uma criança com enxaqueca, organizar a rotina: dicas práticas para conviver melhor com a enxaqueca.",
      intro: [
        "A enxaqueca não termina quando a crise passa: ela pesa no trabalho, na escola, na vida em família e nos planos. Alguns hábitos simples ajudam a retomar o controle, como anotar as crises ou se preparar para as consultas.",
        "Estes artigos reúnem dicas práticas para o dia a dia, para você e para uma criança ou adolescente que convive com a enxaqueca.",
      ],
      articles: [
        "diario-de-enxaqueca-o-que-anotar",
        "enxaqueca-infantil-guia-para-pais",
      ],
    },
  },
  general: {
    tone: "fleur",
    fr: {
      slug: "tout-sur-la-migraine",
      label: "Les bases",
      title: "Tout savoir sur la migraine",
      metaTitle: "Tout savoir sur la migraine : chiffres et vocabulaire",
      description: "Combien de personnes vivent avec la migraine, les mots à connaître pour en parler avec ton médecin : les repères essentiels sur la migraine.",
      intro: [
        "La migraine touche des centaines de millions de personnes dans le monde, et elle a son propre vocabulaire : aura, prodrome, céphalée, traitement de fond. Avoir ces repères en tête aide à mieux comprendre ce que tu lis et ce que te dit ton médecin.",
        "Ces articles rassemblent les chiffres clés et les définitions essentielles, pour poser les bases.",
      ],
      articles: [
        "glossaire-migraine",
        "migraine-en-chiffres",
      ],
    },
    en: {
      slug: "all-about-migraine",
      label: "Basics",
      title: "All about migraine",
      metaTitle: "All about migraine: key figures and vocabulary",
      description: "How many people live with migraine and the words to know to talk about it with your doctor: the essential basics about migraine.",
      intro: [
        "Migraine affects hundreds of millions of people worldwide, and it has its own vocabulary: aura, prodrome, headache disorder, preventive treatment. Having these basics in mind helps you understand what you read and what your doctor tells you.",
        "These articles gather the key figures and essential definitions, to lay the groundwork.",
      ],
      articles: [
        "migraine-glossary",
        "migraine-by-the-numbers",
      ],
    },
    es: {
      slug: "todo-sobre-la-migrana",
      label: "Lo básico",
      title: "Todo sobre la migraña",
      metaTitle: "Todo sobre la migraña: cifras y vocabulario",
      description: "Cuántas personas viven con migraña y las palabras que conviene conocer para hablar con tu médico: lo esencial sobre la migraña.",
      intro: [
        "La migraña afecta a cientos de millones de personas en el mundo y tiene su propio vocabulario: aura, pródromo, cefalea, tratamiento preventivo. Tener claros estos conceptos te ayuda a entender lo que lees y lo que te dice tu médico.",
        "Estos artículos reúnen las cifras clave y las definiciones esenciales, para empezar con buen pie.",
      ],
      articles: [
        "migrana-en-cifras",
        "glosario-de-migrana",
      ],
    },
    "es-419": {
      slug: "todo-sobre-la-migrana",
      label: "Lo básico",
      title: "Todo sobre la migraña",
      metaTitle: "Todo sobre la migraña: cifras y vocabulario",
      description: "Cuántas personas viven con migraña y las palabras que conviene conocer para hablar con tu médico: lo esencial sobre la migraña.",
      intro: [
        "La migraña afecta a cientos de millones de personas en el mundo y tiene su propio vocabulario: aura, pródromo, cefalea, tratamiento preventivo. Tener claros estos conceptos te ayuda a entender lo que lees y lo que te dice tu médico.",
        "En estos artículos reunimos las cifras clave y las definiciones esenciales, para empezar con buen pie.",
      ],
      articles: [
        "glosario-de-migrana",
        "estadisticas-de-migrana",
      ],
    },
    de: {
      slug: "alles-ueber-migraene",
      label: "Grundlagen",
      title: "Alles über Migräne",
      metaTitle: "Alles über Migräne: Zahlen und Begriffe",
      description: "Wie viele Menschen mit Migräne leben und welche Begriffe du für das Gespräch mit deiner Ärztin kennen solltest: das Wichtigste über Migräne.",
      intro: [
        "Migräne betrifft weltweit Hunderte Millionen Menschen und hat ihr eigenes Vokabular: Aura, Prodromalphase, Kopfschmerzerkrankung, Prophylaxe. Mit diesen Begriffen verstehst du besser, was du liest und was dir deine Ärztin oder dein Arzt sagt.",
        "Diese Artikel sammeln die wichtigsten Zahlen und Begriffe als Grundlage.",
      ],
      articles: [
        "migraene-statistik-zahlen",
        "migraene-glossar",
      ],
    },
    it: {
      slug: "tutto-sull-emicrania",
      label: "Le basi",
      title: "Tutto sull'emicrania",
      metaTitle: "Tutto sull'emicrania: numeri e vocabolario",
      description: "Quante persone convivono con l'emicrania e le parole da conoscere per parlarne con il medico: le basi essenziali sull'emicrania.",
      intro: [
        "L'emicrania riguarda centinaia di milioni di persone nel mondo e ha un suo vocabolario: aura, prodromo, cefalea, profilassi. Avere questi riferimenti ti aiuta a capire meglio quello che leggi e quello che ti dice il medico.",
        "Questi articoli raccolgono i numeri chiave e le definizioni essenziali, per partire con le basi giuste.",
      ],
      articles: [
        "glossario-emicrania",
        "emicrania-statistiche-mondo-italia",
      ],
    },
    pt: {
      slug: "tudo-sobre-enxaqueca",
      label: "O essencial",
      title: "Tudo sobre a enxaqueca",
      metaTitle: "Tudo sobre a enxaqueca: números e vocabulário",
      description: "Quantas pessoas vivem com enxaqueca e as palavras a conhecer para falar com o teu médico: o essencial sobre a enxaqueca.",
      intro: [
        "A enxaqueca afeta centenas de milhões de pessoas em todo o mundo e tem o seu próprio vocabulário: aura, pródromo, cefaleia, tratamento preventivo. Ter estas referências presentes ajuda-te a perceber melhor o que lês e o que te diz o médico.",
        "Estes artigos reúnem os números-chave e as definições essenciais, para começar pelas bases.",
      ],
      articles: [
        "glossario-enxaqueca",
        "enxaqueca-em-numeros",
      ],
    },
    "pt-BR": {
      slug: "tudo-sobre-enxaqueca",
      label: "O essencial",
      title: "Tudo sobre enxaqueca",
      metaTitle: "Tudo sobre enxaqueca: números e vocabulário",
      description: "Quantas pessoas convivem com enxaqueca e as palavras que você precisa conhecer para falar com o seu médico: o essencial sobre a enxaqueca.",
      intro: [
        "A enxaqueca atinge centenas de milhões de pessoas no mundo e tem um vocabulário próprio: aura, pródromo, cefaleia, tratamento preventivo. Conhecer esses termos ajuda você a entender melhor o que lê e o que o médico diz.",
        "Estes artigos reúnem os números principais e as definições essenciais, para começar pelo básico.",
      ],
      articles: [
        "glossario-da-enxaqueca",
        "enxaqueca-em-numeros",
      ],
    },
  },
};

export function pillarForSlug(locale: BlogLocale, slug: string): PillarId | null {
  return PILLAR_IDS.find((id) => PILLARS[id][locale].slug === slug) ?? null;
}

export function pillarOfArticle(locale: BlogLocale, articleSlug: string): PillarId | null {
  return PILLAR_IDS.find((id) => PILLARS[id][locale].articles.includes(articleSlug)) ?? null;
}
