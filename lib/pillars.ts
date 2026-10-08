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

// Each article belongs to exactly one pillar, in every language it exists in.
// New articles must be added here to appear on a pillar page (Blog Studio does
// it when publishing). A pillar shows up in a language once it has articles.
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
        "migraine-hereditaire-genetique-transmission",
        "migraine-sans-aura",
        "types-de-migraine",
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
        "is-migraine-hereditary",
        "migraine-without-aura",
        "types-of-migraine",
      ],
    },
    de: {
      slug: "migraene-verstehen",
      title: "Migräne verstehen",
      metaTitle: "Migräne verstehen: Symptome, Aura, Dauer und Ursachen",
      description:
        "Migräne oder Kopfschmerz, Aura, Phasen einer Attacke, tägliche Kopfschmerzen: alle unsere Artikel, um zu verstehen, was in deinem Gehirn passiert.",
      intro: [
        "Migräne ist nicht einfach nur starker Kopfschmerz. Sie ist eine neurologische Erkrankung mit eigenen Mechanismen, Phasen und besonderen Formen wie der Aura. Wer sie versteht, lebt schon besser mit ihr: Du weißt, was mit dir passiert, erkennst die Anzeichen und sprichst leichter mit deiner Ärztin oder deinem Arzt darüber.",
        "Diese Artikel erklären dir einfach, was vor, während und nach einer Attacke passiert, wie du Migräne von Spannungskopfschmerz unterscheidest, wie lange eine Attacke dauert und wann dich tägliche Kopfschmerzen aufhorchen lassen sollten.",
      ],
      articles: ["migraene-erblich", "migraene-glossar", "jeden-tag-kopfschmerzen", "augenmigraene", "migraene-statistik-zahlen", "migraene-mit-aura", "wie-lange-dauert-eine-migraene", "migraene-oder-kopfschmerzen-unterschied", "migraene-ohne-aura", "migraene-arten-formen-ueberblick"],
    },
    it: {
      slug: "capire-emicrania",
      title: "Capire l'emicrania",
      metaTitle: "Capire l'emicrania: sintomi, aura, durata e cause",
      description:
        "Emicrania o mal di testa, aura, fasi di un attacco, mal di testa quotidiano: tutti i nostri articoli per capire cosa succede nel tuo cervello.",
      intro: [
        "L'emicrania non è un semplice mal di testa. È una malattia neurologica, con i suoi meccanismi, le sue fasi e forme particolari come l'aura. Capirla significa già viverla meglio: sai cosa ti succede, riconosci i segnali e ne parli più facilmente con il tuo medico.",
        "Questi articoli ti spiegano in modo semplice cosa succede prima, durante e dopo un attacco, come distinguere l'emicrania da una cefalea tensiva, quanto dura un attacco e quando un mal di testa quotidiano deve metterti in allerta.",
      ],
      articles: ["emicrania-ereditaria", "glossario-emicrania", "mal-di-testa-tutti-i-giorni", "emicrania-oftalmica", "emicrania-statistiche-mondo-italia", "emicrania-con-aura-sintomi", "quanto-dura-emicrania", "differenza-tra-emicrania-e-mal-di-testa", "emicrania-senza-aura-sintomi-durata", "tipi-di-emicrania"],
    },
    es: {
      slug: "comprender-migrana",
      title: "Comprender la migraña",
      metaTitle: "Comprender la migraña: síntomas, aura, duración y causas",
      description:
        "Migraña o dolor de cabeza, aura, fases de una crisis, dolor de cabeza diario: todos nuestros artículos para entender lo que pasa en tu cerebro.",
      intro: [
        "La migraña no es un simple dolor de cabeza. Es una enfermedad neurológica, con sus mecanismos, sus fases y formas particulares como el aura. Comprenderla ya es vivirla mejor: sabes lo que te pasa, reconoces las señales y hablas de ello con más facilidad con tu médico.",
        "Estos artículos te explican de forma sencilla qué ocurre antes, durante y después de una crisis, cómo distinguir una migraña de una cefalea tensional, cuánto dura una crisis y cuándo un dolor de cabeza diario debe ponerte en alerta.",
      ],
      articles: ["migrana-hereditaria-genetica", "glosario-de-migrana", "dolor-de-cabeza-todos-los-dias", "migrana-ocular-que-es-sintomas", "migrana-en-cifras", "migrana-con-aura-sintomas", "cuanto-dura-una-migrana", "diferencia-migrana-dolor-de-cabeza", "migrana-sin-aura-sintomas-duracion", "tipos-de-migrana"],
    },
    "es-419": {
      slug: "comprender-migrana",
      title: "Comprender la migraña",
      metaTitle: "Comprender la migraña: síntomas, aura, duración y causas",
      description:
        "Migraña o dolor de cabeza, aura, fases de una crisis, dolor de cabeza diario: todos nuestros artículos para entender lo que pasa en tu cerebro.",
      intro: [
        "La migraña no es un simple dolor de cabeza. Es una enfermedad neurológica, con sus mecanismos, sus fases y formas particulares como el aura. Entenderla ya es vivirla mejor: sabes lo que te está pasando, reconoces las señales y te resulta más fácil hablarlo con tu médico.",
        "Estos artículos te explican de forma sencilla qué pasa antes, durante y después de una crisis, cómo diferenciar una migraña de una cefalea tensional, cuánto dura una crisis y cuándo un dolor de cabeza diario debe preocuparte.",
      ],
      articles: ["la-migrana-es-hereditaria", "glosario-de-migrana", "dolor-de-cabeza-todos-los-dias", "migrana-ocular-que-es-sintomas", "estadisticas-de-migrana", "migrana-con-aura-senales-antes-de-la-crisis", "cuanto-dura-una-migrana", "diferencia-migrana-dolor-de-cabeza", "migrana-sin-aura-sintomas-duracion", "tipos-de-migrana"],
    },
    pt: {
      slug: "compreender-enxaqueca",
      title: "Compreender a enxaqueca",
      metaTitle: "Compreender a enxaqueca: sintomas, aura, duração e causas",
      description:
        "Enxaqueca ou dor de cabeça, aura, fases de uma crise, dores de cabeça diárias: todos os nossos artigos para perceberes o que se passa no teu cérebro.",
      intro: [
        "A enxaqueca não é uma simples dor de cabeça. É uma doença neurológica, com os seus mecanismos, as suas fases e formas particulares, como a aura. Compreendê-la já é vivê-la melhor: sabes o que te está a acontecer, reconheces os sinais e falas sobre isso mais facilmente com o teu médico.",
        "Estes artigos explicam-te de forma simples o que acontece antes, durante e depois de uma crise, como distinguir uma enxaqueca de uma cefaleia de tensão, quanto tempo dura uma crise e quando uma dor de cabeça diária deve alertar-te.",
      ],
      articles: ["enxaqueca-hereditaria", "glossario-enxaqueca", "dor-de-cabeca-todos-os-dias", "enxaqueca-ocular-oftalmica", "enxaqueca-em-numeros", "enxaqueca-com-aura-sinais-antes-da-crise", "quanto-tempo-dura-uma-enxaqueca", "diferenca-entre-enxaqueca-e-dor-de-cabeca", "enxaqueca-sem-aura-sintomas-duracao", "tipos-de-enxaqueca"],
    },
    "pt-BR": {
      slug: "entender-enxaqueca",
      title: "Entender a enxaqueca",
      metaTitle: "Entender a enxaqueca: sintomas, aura, duração e causas",
      description:
        "Enxaqueca ou dor de cabeça, aura, fases de uma crise, dor de cabeça todos os dias: todos os nossos artigos para você entender o que acontece no seu cérebro.",
      intro: [
        "A enxaqueca não é uma simples dor de cabeça. É uma doença neurológica, com seus mecanismos, suas fases e formas específicas, como a aura. Entender a enxaqueca já é conviver melhor com ela: você sabe o que está acontecendo, reconhece os sinais e conversa com mais facilidade com o seu médico.",
        "Estes artigos explicam de forma simples o que acontece antes, durante e depois de uma crise, como diferenciar uma enxaqueca de uma cefaleia tensional, quanto tempo dura uma crise e quando uma dor de cabeça diária deve acender um alerta.",
      ],
      articles: ["enxaqueca-e-hereditaria", "glossario-da-enxaqueca", "dor-de-cabeca-todos-os-dias", "enxaqueca-ocular-aura-visual", "enxaqueca-em-numeros", "enxaqueca-com-aura-sinais-antes-da-crise", "quanto-tempo-dura-uma-crise-de-enxaqueca", "diferenca-entre-enxaqueca-e-dor-de-cabeca", "enxaqueca-sem-aura-sintomas-duracao", "tipos-de-enxaqueca"],
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
        "pilule-et-migraine",
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
        "birth-control-and-migraine",
      ],
    },
    de: {
      slug: "migraene-vorbeugen",
      title: "Migräne vorbeugen",
      metaTitle: "Migräne vorbeugen: Auslöser, Schlaf, Ernährung und Stress",
      description:
        "Schlaf, Ernährung, Stress, Bildschirme, Wetter, Hormone: Finde deine eigenen Auslöser und gewöhne dir an, was die Zahl deiner Attacken senkt.",
      intro: [
        "Eine Migräneattacke kommt selten aus dem Nichts. Unregelmäßiger Schlaf, eine ausgelassene Mahlzeit, eine stressige Woche, ein Luftdruckabfall oder die nahende Periode können ein Migränegehirn, das empfindlicher ist als andere, aus dem Gleichgewicht bringen.",
        "Vorbeugen heißt zuerst, deine eigenen Auslöser zu erkennen, die nicht unbedingt die der anderen sind, und dann anzupassen, was sich anpassen lässt. Diese Artikel zeigen, was Studien sagen, welche Mythen du vergessen kannst und welche Gewohnheiten wirklich helfen, Attacken seltener zu machen.",
      ],
      articles: ["migraene-bildschirm-blaulicht", "magnesium-bei-migraene", "migraene-am-wochenende", "migraene-am-morgen-schlaf", "migraene-ernaehrung-ausloeser", "luftdruck-migraene", "stress-und-migraene", "migraene-ausloeser-erkennen", "migraene-und-periode", "pille-und-migraene"],
    },
    it: {
      slug: "prevenire-emicrania",
      title: "Prevenire l'emicrania",
      metaTitle: "Prevenire l'emicrania: fattori scatenanti, sonno, alimentazione e stress",
      description:
        "Sonno, alimentazione, stress, schermi, meteo, ormoni: individua i tuoi fattori scatenanti e adotta le abitudini che riducono la frequenza degli attacchi.",
      intro: [
        "Un attacco di emicrania raramente arriva per caso. Un sonno irregolare, un pasto saltato, una settimana stressante, un calo di pressione atmosferica o l'arrivo del ciclo possono far vacillare un cervello emicranico, più sensibile degli altri.",
        "Prevenire significa prima di tutto individuare i tuoi fattori scatenanti, che non sono per forza quelli degli altri, e poi modificare ciò che si può. Questi articoli fanno il punto su cosa dicono gli studi, sui falsi miti da dimenticare e sulle abitudini che aiutano davvero a diradare gli attacchi.",
      ],
      articles: ["emicrania-e-schermi-luce-blu", "magnesio-emicrania", "emicrania-del-weekend", "mal-di-testa-al-risveglio-emicrania-sonno", "emicrania-e-alimentazione", "pressione-atmosferica-emicrania", "emicrania-da-stress", "fattori-scatenanti-emicrania", "emicrania-mestruale-ciclo-perche", "pillola-anticoncezionale-emicrania"],
    },
    es: {
      slug: "prevenir-migrana",
      title: "Prevenir la migraña",
      metaTitle: "Prevenir la migraña: desencadenantes, sueño, alimentación y estrés",
      description:
        "Sueño, alimentación, estrés, pantallas, clima, hormonas: identifica tus desencadenantes y adopta los hábitos que reducen la frecuencia de tus crisis.",
      intro: [
        "Una crisis de migraña rara vez llega por casualidad. Un sueño irregular, una comida saltada, una semana estresante, una bajada de la presión atmosférica o la llegada de la regla pueden desestabilizar un cerebro migrañoso, más sensible que los demás.",
        "Prevenir es, ante todo, identificar tus propios desencadenantes, que no son necesariamente los de los demás, y después ajustar lo que se pueda. Estos artículos repasan lo que dicen los estudios, los mitos que conviene olvidar y los hábitos que de verdad ayudan a espaciar las crisis.",
      ],
      articles: ["migrana-y-pantallas-luz-azul", "magnesio-para-la-migrana", "migrana-de-fin-de-semana", "dolor-de-cabeza-al-despertar-migrana-sueno", "alimentos-que-provocan-migrana", "migrana-presion-atmosferica", "migrana-por-estres-circulo-vicioso", "desencadenantes-de-la-migrana-como-identificarlos", "migrana-menstrual-ciclo-crisis", "pastilla-anticonceptiva-migrana"],
    },
    "es-419": {
      slug: "prevenir-migrana",
      title: "Prevenir la migraña",
      metaTitle: "Prevenir la migraña: desencadenantes, sueño, alimentación y estrés",
      description:
        "Sueño, alimentación, estrés, pantallas, clima, hormonas: identifica tus desencadenantes y adopta los hábitos que reducen la frecuencia de tus crisis.",
      intro: [
        "Una crisis de migraña rara vez llega de la nada. Dormir a deshoras, saltarte una comida, una semana estresante, un descenso de la presión atmosférica o la llegada de tu periodo pueden desestabilizar un cerebro con migraña, que es más sensible que otros.",
        "Prevenir es, antes que nada, identificar tus propios desencadenantes, que no tienen por qué ser los de otras personas, y luego ajustar lo que se pueda. Estos artículos repasan lo que dicen los estudios, los mitos que puedes olvidar y los hábitos que de verdad ayudan a espaciar las crisis.",
      ],
      articles: ["luz-azul-y-migrana", "magnesio-para-la-migrana", "migrana-de-fin-de-semana", "dolor-de-cabeza-al-despertar-migrana-sueno", "alimentos-que-provocan-migrana", "migrana-presion-atmosferica", "migrana-por-estres-circulo-vicioso", "desencadenantes-de-la-migrana-como-identificarlos", "migrana-menstrual-ciclo-desencadena-crisis", "pastillas-anticonceptivas-y-migrana"],
    },
    pt: {
      slug: "prevenir-enxaqueca",
      title: "Prevenir a enxaqueca",
      metaTitle: "Prevenir a enxaqueca: fatores desencadeantes, sono, alimentação e stress",
      description:
        "Sono, alimentação, stress, ecrãs, meteorologia, hormonas: identifica os teus fatores desencadeantes e adota os hábitos que reduzem a frequência das crises.",
      intro: [
        "Uma crise de enxaqueca raramente surge por acaso. Um sono irregular, uma refeição saltada, uma semana stressante, uma descida da pressão atmosférica ou a chegada da menstruação podem desequilibrar um cérebro com enxaqueca, mais sensível do que os outros.",
        "Prevenir é, antes de mais, identificar os teus próprios fatores desencadeantes, que não são necessariamente os dos outros, e depois ajustar o que for possível. Estes artigos fazem o ponto da situação sobre o que dizem os estudos, os mitos a esquecer e os hábitos que ajudam mesmo a espaçar as crises.",
      ],
      articles: ["enxaqueca-e-ecras-luz-azul", "magnesio-para-enxaqueca-forma-dose", "enxaqueca-ao-fim-de-semana", "dor-de-cabeca-ao-acordar-enxaqueca-sono", "alimentos-que-causam-enxaqueca", "pressao-atmosferica-enxaqueca", "enxaqueca-e-stress", "desencadeantes-da-enxaqueca", "enxaqueca-menstrual-ciclo-crises", "pilula-e-enxaqueca"],
    },
    "pt-BR": {
      slug: "prevenir-enxaqueca",
      title: "Prevenir a enxaqueca",
      metaTitle: "Prevenir a enxaqueca: gatilhos, sono, alimentação e estresse",
      description:
        "Sono, alimentação, estresse, telas, clima, hormônios: descubra seus gatilhos e adote os hábitos que diminuem a frequência das crises.",
      intro: [
        "Uma crise de enxaqueca raramente aparece do nada. Sono irregular, uma refeição pulada, uma semana estressante, uma queda na pressão atmosférica ou a chegada da menstruação podem desequilibrar um cérebro com enxaqueca, que é mais sensível que os outros.",
        "Prevenir é, antes de tudo, identificar os seus próprios gatilhos, que não são necessariamente os de outras pessoas, e depois ajustar o que for possível. Estes artigos mostram o que dizem os estudos, os mitos que você pode esquecer e os hábitos que realmente ajudam a espaçar as crises.",
      ],
      articles: ["luz-azul-enxaqueca-telas", "magnesio-para-enxaqueca", "enxaqueca-de-fim-de-semana", "dor-de-cabeca-ao-acordar-enxaqueca-sono", "alimentos-que-causam-enxaqueca", "pressao-atmosferica-e-enxaqueca", "estresse-e-enxaqueca-ciclo-vicioso", "gatilhos-da-enxaqueca-como-identificar", "enxaqueca-menstrual-2", "enxaqueca-menstrual-ciclo-crises", "anticoncepcional-e-enxaqueca"],
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
        "mal-de-tete-quand-aller-aux-urgences",
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
        "when-to-go-to-the-er-for-a-migraine",
      ],
    },
    de: {
      slug: "migraene-bewaeltigen",
      title: "Migräne bewältigen",
      metaTitle: "Migräne bewältigen: Akutbehandlung, Prophylaxe und Linderung",
      description:
        "Triptane, CGRP-Therapien, Botox, Methoden ohne Medikamente, menstruelle Migräne, Migräne bei Kindern: was hilft, eine Attacke zu lindern und seltener zu machen.",
      intro: [
        "Wenn die Attacke da ist, zählt jede Minute. Die richtige Behandlung zu wählen und richtig einzunehmen, zu wissen, was ohne Medikamente hilft, und Medikamentenübergebrauch zu vermeiden, macht einen großen Unterschied.",
        "Wenn die Attacken häufig sind, gibt es weitere Möglichkeiten: vorbeugende Behandlungen wie CGRP-Therapien oder Botox und Strategien für menstruelle Migräne oder Migräne im Kindesalter. Diese Artikel helfen dir, diese Behandlungen zu verstehen, um mit deiner Ärztin oder deinem Arzt darüber zu sprechen. Sie ersetzen keinen ärztlichen Rat.",
      ],
      articles: ["migraene-bei-kindern", "botox-migraene-preempt-schema", "cgrp-antikoerper-migraene", "menstruelle-migraene", "triptane-bei-migraene", "migraene-hausmittel-ohne-medikamente", "kopfschmerzen-wann-zum-notarzt"],
    },
    it: {
      slug: "gestire-emicrania",
      title: "Gestire l'emicrania",
      metaTitle: "Gestire l'emicrania: terapie per l'attacco, terapie di profilassi e sollievo",
      description:
        "Triptani, anti-CGRP, Botox, metodi senza farmaci, emicrania mestruale, emicrania nei bambini: cosa funziona per alleviare un attacco e ridurne il numero.",
      intro: [
        "Quando l'attacco arriva, ogni minuto conta. Scegliere e assumere bene la terapia, sapere cosa fare senza farmaci ed evitare l'abuso di farmaci fa davvero la differenza.",
        "Quando gli attacchi sono frequenti, esistono altre opzioni: terapie di profilassi come gli anti-CGRP o il Botox e strategie adatte all'emicrania mestruale o infantile. Questi articoli ti aiutano a capire queste terapie per parlarne con il tuo medico. Non sostituiscono il suo parere.",
      ],
      articles: ["emicrania-nei-bambini", "botox-emicrania-cronica-protocollo-preempt", "anticorpi-monoclonali-emicrania-anti-cgrp", "emicrania-mestruale", "triptani-emicrania", "rimedi-emicrania-senza-farmaci", "mal-di-testa-quando-andare-al-pronto-soccorso"],
    },
    es: {
      slug: "gestionar-migrana",
      title: "Gestionar la migraña",
      metaTitle: "Gestionar la migraña: tratamientos de la crisis, tratamientos preventivos y alivio",
      description:
        "Triptanes, anti-CGRP, bótox, métodos sin medicamentos, migraña menstrual, migraña infantil: lo que funciona para aliviar una crisis y reducir su número.",
      intro: [
        "Cuando llega la crisis, cada minuto cuenta. Elegir bien el tratamiento y tomarlo correctamente, saber qué hacer sin medicamentos y evitar el abuso de medicación marca una gran diferencia.",
        "Cuando las crisis son frecuentes, existen otras opciones: tratamientos preventivos como los anti-CGRP o el bótox, y estrategias adaptadas a la migraña menstrual o infantil. Estos artículos te ayudan a entender estos tratamientos para hablarlo con tu médico. No sustituyen su opinión.",
      ],
      articles: ["migrana-infantil-guia-para-padres", "botox-migrana-cronica-protocolo-preempt", "anti-cgrp-migrana-tratamiento-preventivo", "migrana-menstrual-regla", "triptanes-para-la-migrana", "como-aliviar-una-migrana-sin-medicamentos", "cuando-ir-a-urgencias-por-dolor-de-cabeza"],
    },
    "es-419": {
      slug: "manejar-migrana",
      title: "Manejar la migraña",
      metaTitle: "Manejar la migraña: tratamientos para la crisis, tratamientos preventivos y alivio",
      description:
        "Triptanes, anti-CGRP, bótox, métodos sin medicamentos, migraña menstrual, migraña en niños: lo que funciona para aliviar una crisis y tener menos.",
      intro: [
        "Cuando llega la crisis, cada minuto cuenta. Elegir bien tu tratamiento y tomarlo de la forma correcta, saber qué hacer sin medicamentos y evitar el uso excesivo de medicamentos hace una gran diferencia.",
        "Cuando las crisis son frecuentes, hay otras opciones: tratamientos preventivos como los anti-CGRP o el bótox, y estrategias pensadas para la migraña menstrual o la migraña en niños. Estos artículos te ayudan a entender estos tratamientos para que los platiques con tu médico. No reemplazan su opinión.",
      ],
      articles: ["migrana-en-ninos-guia-para-padres", "botox-para-migrana-cronica-protocolo-preempt", "anti-cgrp-migrana-tratamiento-preventivo", "migrana-menstrual", "triptanes-para-la-migrana", "como-aliviar-una-migrana-sin-medicamentos", "cuando-ir-a-urgencias-por-dolor-de-cabeza"],
    },
    pt: {
      slug: "gerir-enxaqueca",
      title: "Gerir a enxaqueca",
      metaTitle: "Gerir a enxaqueca: tratamentos da crise, tratamentos preventivos e alívio",
      description:
        "Triptanos, anti-CGRP, Botox, métodos sem medicamentos, enxaqueca menstrual, enxaqueca nas crianças: o que resulta para aliviar uma crise e reduzir o número de crises.",
      intro: [
        "Quando a crise chega, cada minuto conta. Escolher e tomar bem o tratamento, saber o que fazer sem medicamentos e evitar o uso excessivo de medicação faz toda a diferença.",
        "Quando as crises são frequentes, existem outras opções: tratamentos preventivos como os anti-CGRP ou o Botox, e estratégias adaptadas à enxaqueca menstrual ou infantil. Estes artigos ajudam-te a compreender estes tratamentos para falares sobre eles com o teu médico. Não substituem a opinião dele.",
      ],
      articles: ["enxaqueca-em-criancas-guia-para-pais", "botox-enxaqueca-cronica-protocolo-preempt", "anti-cgrp-enxaqueca-tratamento-preventivo", "enxaqueca-menstrual", "triptanos-enxaqueca", "aliviar-enxaqueca-sem-medicamentos", "dor-de-cabeca-quando-ir-as-urgencias"],
    },
    "pt-BR": {
      slug: "gerenciar-enxaqueca",
      title: "Gerenciar a enxaqueca",
      metaTitle: "Gerenciar a enxaqueca: tratamento da crise, tratamento preventivo e alívio",
      description:
        "Triptanos, anti-CGRP, Botox, métodos sem remédio, enxaqueca menstrual, enxaqueca em crianças: o que funciona para aliviar uma crise e ter menos crises.",
      intro: [
        "Quando a crise chega, cada minuto conta. Escolher bem o tratamento e tomá-lo do jeito certo, saber o que fazer sem remédio e evitar o uso excessivo de medicamentos faz muita diferença.",
        "Quando as crises são frequentes, existem outras opções: tratamentos preventivos como os anti-CGRP ou o Botox, e estratégias pensadas para a enxaqueca menstrual ou infantil. Estes artigos ajudam você a entender esses tratamentos para conversar com o seu médico. Eles não substituem a orientação médica.",
      ],
      articles: ["enxaqueca-infantil-guia-para-pais", "botox-para-enxaqueca-cronica-protocolo-preempt", "anti-cgrp-enxaqueca-tratamento-preventivo", "enxaqueca-menstrual", "triptanos-para-enxaqueca", "como-aliviar-enxaqueca-sem-remedio", "dor-de-cabeca-quando-ir-ao-pronto-socorro"],
    },
  },
};

export function pillarForSlug(locale: BlogLocale, slug: string): PillarId | null {
  return PILLAR_IDS.find((id) => PILLARS[id][locale].slug === slug) ?? null;
}

export function pillarOfArticle(locale: BlogLocale, articleSlug: string): PillarId | null {
  return PILLAR_IDS.find((id) => PILLARS[id][locale].articles.includes(articleSlug)) ?? null;
}
