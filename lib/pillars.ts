import type { BlogLocale } from "./blog";
import type { Tone } from "./tones";

export type PillarId = "understand" | "prevent" | "manage";
export const PILLAR_IDS: PillarId[] = ["understand", "prevent", "manage"];

type PillarCopy = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string[];
  // Articles in reading order: the first one is where to start.
  articles: string[];
};

type Pillar = { tone: Tone } & Record<BlogLocale, PillarCopy>;

// Each article belongs to exactly one pillar, in both languages.
// New articles must be added here to appear on a pillar page.
export const PILLARS: Record<PillarId, Pillar> = {
  understand: {
    tone: "fleur",
    fr: {
      slug: "comprendre-la-migraine",
      title: "Comprendre la migraine",
      metaTitle: "Comprendre la migraine : symptômes, aura, durée et causes",
      description:
        "Migraine ou mal de tête, aura, phases d'une crise, maux de tête quotidiens : tous nos articles pour comprendre ce qui se passe dans ton cerveau.",
      intro: [
        "La migraine n'est pas un simple mal de tête. C'est une maladie neurologique, avec ses mécanismes, ses phases et ses formes particulières, comme l'aura. La comprendre, c'est déjà mieux la vivre : tu sais ce qui t'arrive, tu reconnais les signes et tu en parles plus facilement avec ton médecin.",
        "Ces articles t'expliquent simplement ce qui se passe avant, pendant et après une crise, comment distinguer une migraine d'une céphalée de tension, combien de temps dure une crise et quand un mal de tête quotidien doit t'alerter.",
      ],
      articles: [
        "migraine-ou-mal-de-tete",
        "combien-de-temps-dure-une-migraine",
        "migraine-avec-aura",
        "migraine-ophtalmique",
        "mal-de-tete-tous-les-jours",
        "migraine-en-chiffres",
        "glossaire-migraine",
      ],
    },
    en: {
      slug: "understanding-migraine",
      title: "Understanding migraine",
      metaTitle: "Understanding migraine: symptoms, aura, duration and causes",
      description:
        "Migraine or headache, aura, attack phases, daily headaches: all our articles to understand what is happening in your brain.",
      intro: [
        "Migraine is not just a bad headache. It is a neurological disease, with its own mechanisms, phases and specific forms such as aura. Understanding it already makes it easier to live with: you know what is happening, you recognize the signs and you can talk about it more easily with your doctor.",
        "These articles explain in plain words what happens before, during and after an attack, how to tell a migraine from a tension headache, how long an attack lasts and when a daily headache should worry you.",
      ],
      articles: [
        "migraine-vs-headache",
        "how-long-does-a-migraine-last",
        "migraine-with-aura",
        "ophthalmic-migraine",
        "headache-every-day",
        "migraine-by-the-numbers",
        "migraine-glossary",
      ],
    },
  },
  prevent: {
    tone: "tagada",
    fr: {
      slug: "prevenir-la-migraine",
      title: "Prévenir la migraine",
      metaTitle: "Prévenir la migraine : déclencheurs, sommeil, alimentation, stress",
      description:
        "Sommeil, alimentation, stress, écrans, météo, cycle hormonal : identifie tes déclencheurs et adopte les habitudes qui réduisent la fréquence de tes crises.",
      intro: [
        "Une crise de migraine arrive rarement par hasard. Un sommeil décalé, un repas sauté, une semaine stressante, une chute de pression ou l'approche des règles peuvent faire basculer un cerveau migraineux, déjà plus sensible que les autres.",
        "Prévenir, c'est d'abord repérer tes propres déclencheurs, qui ne sont pas forcément ceux des autres, puis ajuster ce qui peut l'être. Ces articles font le point sur ce que disent les études, les idées reçues à oublier et les habitudes qui aident vraiment à espacer les crises.",
      ],
      articles: [
        "identifier-declencheurs-migraine",
        "migraine-et-sommeil",
        "stress-et-migraines",
        "migraine-et-alimentation",
        "migraine-et-ecrans",
        "pression-atmospherique-migraines",
        "migraines-du-week-end",
        "migraine-et-regles",
        "magnesium-et-migraine",
      ],
    },
    en: {
      slug: "migraine-prevention",
      title: "Preventing migraine",
      metaTitle: "Migraine prevention: triggers, sleep, food and stress",
      description:
        "Sleep, food, stress, screens, weather, hormones: find your own triggers and adopt the habits that reduce how often attacks happen.",
      intro: [
        "A migraine attack rarely comes out of nowhere. Irregular sleep, a skipped meal, a stressful week, a drop in air pressure or your period coming up can tip a migraine brain, which is more sensitive than others.",
        "Prevention starts with spotting your own triggers, which are not necessarily someone else's, then adjusting what you can. These articles cover what the research says, the myths to forget and the habits that genuinely help space out attacks.",
      ],
      articles: [
        "identify-migraine-triggers",
        "migraine-and-sleep",
        "stress-and-migraines",
        "migraine-and-food",
        "migraine-and-screens",
        "barometric-pressure-and-migraines",
        "weekend-migraines",
        "migraine-and-periods",
        "magnesium-and-migraine",
      ],
    },
  },
  manage: {
    tone: "sable",
    fr: {
      slug: "gerer-la-migraine",
      title: "Gérer la migraine",
      metaTitle: "Gérer la migraine : traitements de crise, traitements de fond et soulagement",
      description:
        "Triptans, anti-CGRP, Botox, méthodes sans médicament, migraine cataméniale, migraine de l'enfant : ce qui marche pour soulager une crise et en réduire le nombre.",
      intro: [
        "Quand la crise est là, chaque minute compte. Bien choisir et bien prendre ton traitement, savoir quoi faire sans médicament et éviter l'abus médicamenteux change beaucoup de choses.",
        "Quand les crises sont fréquentes, d'autres options existent : des traitements de fond comme les anti-CGRP ou le Botox, et des stratégies adaptées aux migraines liées aux règles ou à l'enfance. Ces articles t'aident à comprendre ces traitements pour en parler avec ton médecin. Ils ne remplacent pas son avis.",
      ],
      articles: [
        "soulager-migraine-sans-medicament",
        "triptans-tout-comprendre",
        "anti-cgrp-migraine",
        "botox-migraine-chronique",
        "migraine-catameniale",
        "migraine-enfant-adolescent",
      ],
    },
    en: {
      slug: "managing-migraine",
      title: "Managing migraine",
      metaTitle: "Managing migraine: acute treatments, preventive treatments and relief",
      description:
        "Triptans, CGRP treatments, Botox, drug-free methods, menstrual migraine, migraine in children: what works to relieve an attack and reduce how many you get.",
      intro: [
        "When an attack hits, every minute counts. Choosing and taking your treatment the right way, knowing what to do without medication and avoiding medication overuse makes a real difference.",
        "When attacks are frequent, other options exist: preventive treatments such as CGRP medications or Botox, and strategies adapted to menstrual or childhood migraine. These articles help you understand these treatments so you can discuss them with your doctor. They do not replace medical advice.",
      ],
      articles: [
        "relieve-migraine-without-medication",
        "triptans-explained",
        "cgrp-migraine-treatment",
        "botox-for-chronic-migraine",
        "menstrual-migraine",
        "migraine-in-children-and-teens",
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
