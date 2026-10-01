import type { Rich, TestCopy } from "../migraine-test";
import type { OverusePageCopy, OveruseCopy } from "../overuse";
import type { DiaryCopy, TestPageCopy } from "../tools";

// No German articles yet: the texts carry no blog links, results point to
// the diary instead. Add article links once the German blog exists.
const DIARY_PATH = "/ressourcen/migraene-tagebuch";
const diaryLink = { text: "das Migränetagebuch zum Ausdrucken", href: DIARY_PATH };
const nextStep: Rich = ["Nächster Schritt: ", diaryLink, ", um deine Attacken bis zu deinem Arzttermin festzuhalten."];

export const diary: DiaryCopy = {
  path: DIARY_PATH,
  navLabel: "Migränetagebuch",
  menuDescription: "Kalender und Attackenprotokoll zum Ausdrucken",
  metaTitle: "Migränetagebuch zum Ausdrucken (kostenloses PDF)",
  description:
    "Lade dir kostenlos ein Migränetagebuch zum Ausdrucken herunter: Monatskalender, Schmerzstärke, Medikamente und ein Protokoll deiner Attacken für deinen Arzt.",
  title: "Migränetagebuch zum Ausdrucken",
  lead: "Ein Monatskalender und ein Protokoll deiner Attacken auf zwei Seiten, zum Ausdrucken und Ausfüllen im Lauf der Tage. Kostenlos, ohne Anmeldung.",
  downloads: [
    { label: "PDF herunterladen (A4)", href: "/downloads/migraene-tagebuch-mellow-a4.pdf", primary: true },
  ],
  downloadNote: "PDF, 2 Seiten, Format A4.",
  previewAlt: [
    "Seite 1 des Tagebuchs: Monatskalender mit, für jeden Tag, der Stärke von 1 bis 10, einem Kästchen für Medikamente und Platz für eine Notiz",
    "Seite 2 des Tagebuchs: Attackenprotokoll mit Datum, Uhrzeiten, Stärke, Symptomen, Auslösern, Medikament und Linderung ohne Medikament, jeweils mit einem Kästchen „Hat geholfen“",
  ],
  whyTitle: "Warum ein Migränetagebuch führen?",
  why: [
    [
      "Es ist oft der erste Rat von Neurologen. Wenn du deine Attacken aufschreibst, kannst du deine Auslöser erkennen, prüfen, ob eine Behandlung wirkt, und sehen, ob deine Attacken deinem Zyklus folgen.",
    ],
    [
      "Außerdem zählst du so deine Tage mit Medikamenten. Bei mehr als 10 Tagen im Monat steigt das Risiko eines Medikamentenübergebrauchs: Dann können die Schmerzmittel selbst die Kopfschmerzen aufrechterhalten.",
    ],
  ],
  howTitle: "So füllst du es aus",
  steps: [
    "Trage an jedem Attackentag die Stärke von 1 bis 10 unten im Kästchen des Tages ein.",
    "Kreuze „Med.“ an, wenn du an diesem Tag ein Akutmedikament genommen hast. Du kannst auch ein Wort ins Kästchen schreiben: Periode, schlechte Nacht, Stress.",
    "Fülle für jede Attacke eine Zeile des Protokolls aus: Beginn und Ende, Symptome, mögliche Auslöser, eingenommenes Medikament und Linderung ohne Medikament, und kreuze jeweils an, ob es geholfen hat.",
    "Zähle am Monatsende deine Migränetage und deine Tage mit Medikament und nimm das Tagebuch zu deinem nächsten Arzttermin mit.",
  ],
  doctorTitle: "Worauf dein Arzt achten wird",
  doctor: [
    "Die Zahl der Migränetage pro Monat, um zu entscheiden, ob eine vorbeugende Behandlung infrage kommt.",
    "Dauer und Stärke der Attacken, um die richtige Akutbehandlung zu wählen.",
    "Die Zahl der Tage mit Medikament, um einen Medikamentenübergebrauch zu erkennen.",
    "Wiederkehrende Auslöser und einen möglichen Zusammenhang mit deiner Periode.",
  ],
  appTitle: "Mellow füllt es mit dir aus",
  appText:
    "Erfasse eine Attacke mit zwei Taps auf deinem Handy. Mellow berechnet deine Migränetage, zählt deine Medikamente, verfolgt das Wetter und erstellt einen PDF-Bericht für deinen Arzt.",
  faqTitle: "Häufige Fragen",
  faq: [
    {
      q: "Wie lange sollte man ein Migränetagebuch führen?",
      a: "Mindestens ein bis drei Monate. So lange dauert es, bis sich ein Muster zeigt, zum Beispiel rund um die Periode, und bis dein Arzt eine vorbeugende Behandlung beurteilen kann.",
    },
    {
      q: "Soll ich auch Tage ohne Attacke eintragen?",
      a: "Lass das Kästchen einfach leer. Tage ohne Attacke zählen genauso wie die anderen: Sie zeigen deine tatsächliche Häufigkeit und die ruhigen Phasen.",
    },
    {
      q: "Ersetzt das Tagebuch einen Arztbesuch?",
      a: "Nein. Es hilft dir, deinen Termin vorzubereiten und mit deinem Arzt darüber zu sprechen, aber es stellt keine Diagnose.",
    },
  ],
};

export const testPage: TestPageCopy = {
  path: "/ressourcen/migraene-test",
  navLabel: "Migräne-Test",
  menuDescription: "Migräne oder Kopfschmerz? 11 Fragen",
  metaTitle: "Migräne-Test: Migräne oder Kopfschmerz? (kostenlos, 2 Minuten)",
  description:
    "Beantworte 11 Fragen auf Grundlage der medizinischen Kriterien für Migräne und finde heraus, ob deine Kopfschmerzen eher nach Migräne, Spannungskopfschmerz oder etwas anderem aussehen.",
  title: "Migräne oder Kopfschmerz? Mach den Test",
  lead: "11 Fragen, 2 Minuten. Der Test stützt sich auf die Kriterien der Internationalen Klassifikation von Kopfschmerzerkrankungen (ICHD-3), mit der Neurologen arbeiten.",
  howTitle: "Wie funktioniert dieser Test?",
  how: [
    [
      "Um von Migräne zu sprechen, achten Neurologen auf Attacken von 4 bis 72 Stunden mit mindestens zwei dieser Merkmale: einseitiger Schmerz, pochend, mittelstark bis stark, verstärkt durch körperliche Aktivität. Dazu kommt mindestens ein Begleitsymptom: Übelkeit oder eine Empfindlichkeit gegenüber Licht und Lärm zugleich.",
    ],
    [
      "Spannungskopfschmerz dagegen drückt auf beiden Seiten, bleibt leicht bis mittelstark, wird durch Aktivität nicht schlimmer und verursacht keine Übelkeit.",
    ],
    [
      "Der Test berücksichtigt außerdem die Aura, die Zahl der Kopfschmerztage pro Monat und die Tage mit Medikamenten, die auf einen Medikamentenübergebrauch hinweisen können.",
    ],
  ],
  faqTitle: "Häufige Fragen",
  faq: [
    {
      q: "Ist dieser Test zuverlässig?",
      a: "Er übernimmt die Kriterien, mit denen Ärzte arbeiten, ersetzt aber keine Untersuchung. Nur ein Arzt kann eine Diagnose stellen, unter Berücksichtigung deiner Vorgeschichte und einer klinischen Untersuchung.",
    },
    {
      q: "Kann man gleichzeitig Migräne und Spannungskopfschmerzen haben?",
      a: "Ja, das ist sogar häufig. Viele Menschen mit Migräne haben auch leichtere Kopfschmerzen vom Spannungstyp. Ein Kopfschmerztagebuch hilft, beides auseinanderzuhalten.",
    },
    {
      q: "Wann sollte ich sofort ärztliche Hilfe suchen?",
      a: "Bei plötzlichen, extrem starken Schmerzen, Fieber mit Nackensteifigkeit, Schwäche auf einer Körperseite, Sprachstörungen oder Verwirrtheit oder bei Kopfschmerzen nach einem Schlag auf den Kopf. Ruf den Notruf 112 an.",
    },
  ],
};

export const test: TestCopy = {
  progress: "Frage {n} von {total}",
  back: "Zurück",
  next: "Weiter",
  seeResult: "Mein Ergebnis anzeigen",
  restart: "Test wiederholen",
  resultEyebrow: "Dein Ergebnis",
  disclaimer:
    "Dieser Test stellt keine Diagnose. Er hilft dir, klarer zu sehen und einen Arzttermin vorzubereiten. Im Zweifel sprich mit deinem Arzt.",
  appTitle: "Bestätige dein Profil, indem du deine Attacken erfasst",
  appText:
    "Erfasse einen Monat lang jede Attacke mit zwei Taps. Mellow berechnet deine Häufigkeit, deine durchschnittliche Dauer und deine Tage mit Medikamenten und erstellt einen PDF-Bericht für deinen Arzt.",
  questions: [
    {
      id: "duration",
      title: "Wie lange dauert eine Attacke ohne Behandlung normalerweise?",
      options: [
        { id: "under30m", label: "Weniger als 30 Minuten" },
        { id: "30mto4h", label: "30 Minuten bis 4 Stunden" },
        { id: "4to72h", label: "4 Stunden bis 3 Tage" },
        { id: "over72h", label: "Mehr als 3 Tage" },
        { id: "unknown", label: "Ich weiß es nicht, ich nehme immer etwas ein" },
      ],
    },
    {
      id: "location",
      title: "Wo tut es meistens weh?",
      options: [
        { id: "one", label: "Auf einer Seite des Kopfes (die Seite kann von Attacke zu Attacke wechseln)" },
        { id: "both", label: "Auf beiden Seiten, wie ein Band oder ein Helm" },
        { id: "varies", label: "Das ist von Attacke zu Attacke verschieden" },
      ],
    },
    {
      id: "quality",
      title: "Wie fühlt sich der Schmerz an?",
      options: [
        { id: "pulsating", label: "Er pocht oder pulsiert, wie ein Herzschlag im Kopf" },
        { id: "pressing", label: "Er drückt oder presst, wie ein Schraubstock" },
        { id: "other", label: "Anders, oder ich weiß es nicht" },
      ],
    },
    {
      id: "intensity",
      title: "Wie stark ist er?",
      options: [
        { id: "mild", label: "Leicht: Ich kann meinen Alltag normal weiterführen" },
        { id: "moderate", label: "Mittelstark: Er stört mich, ich werde langsamer" },
        { id: "severe", label: "Stark: Ich muss aufhören oder mich hinlegen" },
      ],
    },
    {
      id: "activity",
      title: "Wird der Schmerz durch körperliche Aktivität schlimmer?",
      hint: "Treppen steigen, schnell gehen, dich nach vorn beugen.",
      options: [
        { id: "yes", label: "Ja" },
        { id: "no", label: "Nein" },
        { id: "unsure", label: "Ich weiß es nicht" },
      ],
    },
    {
      id: "nausea",
      title: "Ist dir während einer Attacke übel oder musst du erbrechen?",
      options: [
        { id: "yes", label: "Ja" },
        { id: "no", label: "Nein" },
      ],
    },
    {
      id: "senses",
      title: "Stören dich während einer Attacke Licht und Lärm?",
      options: [
        { id: "both", label: "Ja, beides" },
        { id: "one", label: "Nur eines von beiden" },
        { id: "none", label: "Keines von beiden" },
      ],
    },
    {
      id: "aura",
      title: "Hast du vor oder zu Beginn des Schmerzes manchmal Störungen, die 5 bis 60 Minuten dauern und dann verschwinden?",
      hint: "Leuchtende Zickzacklinien, ein blinder Fleck, ein Kribbeln, das den Arm hinaufwandert, Mühe, die richtigen Worte zu finden.",
      options: [
        { id: "often", label: "Ja, oft" },
        { id: "sometimes", label: "Ja, das ist schon vorgekommen" },
        { id: "never", label: "Nein" },
      ],
    },
    {
      id: "frequency",
      title: "An wie vielen Tagen im Monat hast du Kopfschmerzen?",
      options: [
        { id: "under4", label: "An weniger als 4 Tagen" },
        { id: "4to14", label: "An 4 bis 14 Tagen" },
        { id: "15plus", label: "An 15 Tagen oder mehr" },
      ],
    },
    {
      id: "medication",
      title: "An wie vielen Tagen im Monat nimmst du ein Schmerzmittel?",
      hint: "Paracetamol, Ibuprofen, Aspirin, ein Triptan oder anderes.",
      options: [
        { id: "under10", label: "An weniger als 10 Tagen" },
        { id: "10to14", label: "An 10 bis 14 Tagen" },
        { id: "15plus", label: "An 15 Tagen oder mehr" },
      ],
    },
    {
      id: "redflags",
      title: "Letzte Frage, und eine wichtige: Hatten deine Kopfschmerzen schon einmal eines dieser Zeichen?",
      hint: "Mehrere Antworten möglich.",
      multiple: true,
      options: [
        { id: "thunderclap", label: "Ein plötzlicher, extrem starker Schmerz, der schlimmste deines Lebens, der in weniger als einer Minute seinen Höhepunkt erreicht" },
        { id: "fever", label: "Fieber mit Nackensteifigkeit" },
        { id: "neuro", label: "Eine Schwäche auf einer Körperseite, eine Sprachstörung oder Verwirrtheit" },
        { id: "trauma", label: "Kopfschmerzen, die nach einem Schlag auf den Kopf aufgetreten sind" },
        { id: "new", label: "Neue Kopfschmerzen nach dem 50. Lebensjahr oder Kopfschmerzen, die sich plötzlich verändern" },
        { id: "longAura", label: "Sehstörungen oder Kribbeln, die länger als eine Stunde dauern" },
        { id: "none", label: "Keines dieser Zeichen", exclusive: true },
      ],
    },
  ],
  results: {
    urgent: {
      title: "Sprich bald mit einem Arzt",
      text: "Du hast mindestens ein Zeichen angekreuzt, bei dem du ohne Zögern ärztlichen Rat einholen solltest. Meistens ist die Ursache nicht ernst, aber diese Symptome müssen abgeklärt werden. Wenn der Schmerz plötzlich und extrem stark ist oder eine Schwäche auf einer Körperseite oder eine Sprachstörung auftritt, ruf den Notruf 112 an.",
      links: [],
    },
    migraine: {
      title: "Deine Kopfschmerzen sehen nach Migräne aus",
      text: "Deine Antworten entsprechen den Kriterien der Migräne ohne Aura: Attacken von mehreren Stunden, mindestens zwei typische Merkmale des Schmerzes und Begleitsymptome wie Übelkeit oder Licht- und Lärmempfindlichkeit. Nur ein Arzt kann die Diagnose bestätigen, aber das ist eine gute Grundlage für das Gespräch.",
      links: nextStep,
    },
    migraineAura: {
      title: "Deine Kopfschmerzen sehen nach Migräne mit Aura aus",
      text: "Deine Attacken haben die Merkmale einer Migräne, und die Störungen, die du vor dem Schmerz beschreibst, ähneln einer Aura. Wenn diese Störungen neu oder ungewöhnlich sind oder länger als eine Stunde dauern, lass sie ärztlich abklären, um sicherzugehen.",
      links: nextStep,
    },
    auraPossible: {
      title: "Deine Störungen ähneln einer Migräneaura",
      text: "Seh- oder Gefühlsstörungen, die 5 bis 60 Minuten dauern und dann verschwinden, sind typisch für eine Aura, auch wenn der Schmerz danach leicht ist oder ganz ausbleibt. Sprich mit deinem Arzt darüber, vor allem wenn es neu ist.",
      links: nextStep,
    },
    migraineProbable: {
      title: "Deine Kopfschmerzen sehen teilweise nach Migräne aus",
      text: "Deine Antworten erfüllen fast alle Kriterien der Migräne, aber nicht alle. Neurologen sprechen dann von wahrscheinlicher Migräne. Wenn du deine Attacken einen Monat lang aufschreibst, hilft das deinem Arzt, klarer zu sehen.",
      links: ["Für den Anfang: ", diaryLink, "."],
    },
    tension: {
      title: "Deine Kopfschmerzen sehen nach Spannungskopfschmerz aus",
      text: "Ein drückender Schmerz auf beiden Seiten, leicht bis mittelstark, ohne Übelkeit und ohne Verschlechterung bei Aktivität: Das ist das Profil des Spannungskopfschmerzes, der häufigsten Kopfschmerzart. Stress, Schlafmangel und die Körperhaltung sind oft die Ursache.",
      links: nextStep,
    },
    unclear: {
      title: "Deine Antworten passen nicht eindeutig zu einem Profil",
      text: "Deine Kopfschmerzen passen weder eindeutig zur Migräne noch zum Spannungskopfschmerz. Das ist an sich nicht beunruhigend, aber es lohnt sich, mit deinem Arzt darüber zu sprechen, am besten mit schriftlichen Notizen zu deinen Attacken.",
      links: ["Als Hilfe: ", diaryLink, "."],
    },
  },
  chronicNote: [
    "Du hast an 15 oder mehr Tagen im Monat Kopfschmerzen: Dann spricht man von einer chronischen Form. Es gibt vorbeugende Behandlungen, sprich mit deinem Arzt darüber.",
  ],
  overuseNote: [
    "Du nimmst an 10 oder mehr Tagen im Monat ein Schmerzmittel. Ab dieser Schwelle steigt das Risiko eines Medikamentenübergebrauchs: Die Medikamente selbst können die Kopfschmerzen dann aufrechterhalten. ",
    { text: "Prüfe mit dem Rechner, wo du stehst", href: "/ressourcen/medikamentenuebergebrauch-rechner" },
    ".",
  ],
};

export const cycleDiary: DiaryCopy = {
  path: "/ressourcen/menstruationsmigraene-tagebuch",
  navLabel: "Tagebuch für Menstruationsmigräne",
  menuDescription: "Attacken und Periode über 3 Monate, zum Ausdrucken",
  metaTitle: "Tagebuch für Menstruationsmigräne zum Ausdrucken (kostenloses PDF)",
  description:
    "Ein Kalender über 3 Monate zum Ausdrucken: Trage deine Periode und deine Attacken ein und sieh, ob deine Migräne deinem Zyklus folgt, wie es Ärzte empfehlen.",
  title: "Tagebuch für Menstruationsmigräne",
  lead: "Drei Monate auf einer Seite: Trage deine Periode, deine Attacken und deine Medikamente ein und sieh, ob deine Migräne deinem Zyklus folgt. Kostenlos, ohne Anmeldung.",
  downloads: [
    { label: "PDF herunterladen (A4)", href: "/downloads/menstruationsmigraene-tagebuch-mellow-a4.pdf", primary: true },
  ],
  downloadNote: "PDF, 2 Seiten, Format A4.",
  previewAlt: [
    "Seite 1 des Tagebuchs: Kalender über drei Monate mit, für jeden Tag, einem Kästchen für die Periode, der Stärke der Attacke und einem Kästchen für Medikamente, danach eine Auswertung Zyklus für Zyklus",
    "Seite 2 des Tagebuchs: Attackenprotokoll mit Datum, Uhrzeiten, Stärke, Symptomen, Auslösern, Medikament und Linderung ohne Medikament",
  ],
  whyTitle: "Warum die Migräne zusammen mit dem Zyklus verfolgen?",
  why: [
    [
      "Bei vielen Frauen kommen die Attacken rund um die Periode. Ärzte sprechen von Menstruationsmigräne, wenn sie zwischen 2 Tagen vor und 3 Tagen nach Beginn der Periode auftreten, in mindestens 2 von 3 Zyklen.",
    ],
    [
      "Um das herauszufinden, musst du deine Periode und deine Attacken mindestens 3 Zyklen lang aufschreiben: Genau dafür ist dieses Tagebuch da. Eine Bestätigung kann die Behandlung verändern, zum Beispiel mit einer Behandlung, die gezielt auf diese wenigen Tage ausgerichtet ist.",
    ],
  ],
  howTitle: "So füllst du es aus",
  steps: [
    "Schreib den Monat an den Anfang jeder Zeile. Kreuze an jedem Tag deiner Periode das Kästchen „Periode“ an.",
    "Trage an jedem Attackentag die Stärke von 1 bis 10 in die Zeile „Attacke“ ein und kreuze „Med.“ an, wenn du ein Akutmedikament genommen hast.",
    "Fülle am Ende jedes Zyklus die Auswertung aus: erster Tag der Periode und ob du zwischen 2 Tagen davor und 3 Tagen danach eine Attacke hattest.",
    "Auf Seite 2 kannst du jede Attacke genauer beschreiben. Nimm das Tagebuch dann zu deinem nächsten Arzttermin mit.",
  ],
  doctorTitle: "Worauf dein Arzt achten wird",
  doctor: [
    "Ob deine Attacken in mindestens 2 von 3 Zyklen rund um die Periode auftreten.",
    "Ob du auch zu anderen Zeiten im Zyklus Attacken hast, was die Behandlung beeinflusst.",
    "Dauer und Stärke der Attacken während der Periode, die oft länger und stärker sind.",
    "Deine Tage mit Medikamenten, um einen Medikamentenübergebrauch zu vermeiden.",
  ],
  appTitle: "Mellow füllt es mit dir aus",
  appText:
    "Erfasse deine Attacken mit zwei Taps, mit dem Menstruationszyklus als möglichem Auslöser. Mellow zeigt dir, was immer wiederkommt, und erstellt einen PDF-Bericht für deinen Arzt.",
  faqTitle: "Häufige Fragen",
  faq: [
    {
      q: "Wie viele Zyklen sollte man verfolgen?",
      a: "Mindestens 3. Von Menstruationsmigräne spricht man, wenn die Attacken in mindestens 2 von 3 Zyklen rund um die Periode auftreten.",
    },
    {
      q: "Und wenn mein Zyklus unregelmäßig ist?",
      a: "Das Tagebuch funktioniert trotzdem: Es folgt den Kalendertagen, nicht einem theoretischen Zyklus. Kreuze deine Periode einfach an, wenn sie kommt.",
    },
    {
      q: "Und mit der Pille?",
      a: "Das Tagebuch funktioniert auch dann. Mit der Pille treten die Attacken oft in der Pillenpause oder der Woche mit wirkstofffreien Tabletten auf, und das Tagebuch macht das sichtbar. Sprich mit deinem Arzt darüber, vor allem wenn du Migräne mit Aura hast.",
    },
  ],
};

export const overusePage: OverusePageCopy = {
  path: "/ressourcen/medikamentenuebergebrauch-rechner",
  navLabel: "Rechner für Medikamentenübergebrauch",
  menuDescription: "Deine Medikamententage im Vergleich zu den Schwellen",
  metaTitle: "Medikamentenübergebrauch: Prüfe, ob du die Schwellen überschreitest (kostenlos)",
  description:
    "Gib deine Tage mit Schmerz- und Migränemitteln ein: Der Rechner vergleicht sie mit den medizinischen Schwellen für Kopfschmerz bei Medikamentenübergebrauch, je nach Medikament 10 oder 15 Tage pro Monat.",
  title: "Rechner für Medikamentenübergebrauch",
  lead: "Zu viele Schmerzmittel können Kopfschmerzen aufrechterhalten. Gib an, an wie vielen Tagen im Monat du sie nimmst: Der Rechner vergleicht das mit den Schwellen, mit denen Neurologen arbeiten.",
  thresholdsTitle: "Die Schwellen, Medikament für Medikament",
  thresholdsIntro: [
    "Die Internationale Klassifikation von Kopfschmerzerkrankungen (ICHD-3) definiert den Kopfschmerz bei Medikamentenübergebrauch so: Kopfschmerzen an mindestens 15 Tagen im Monat bei einer Person, die bereits Migräne oder einen anderen Kopfschmerz hat, mit einer regelmäßigen Einnahme von Akutmedikamenten über diesen Schwellen seit mehr als 3 Monaten.",
  ],
  table: {
    headers: ["Medikament", "Schwelle"],
    rows: [
      ["Paracetamol", "15 Tage im Monat oder mehr"],
      ["Entzündungshemmer und Aspirin (Ibuprofen, Naproxen, Diclofenac…)", "15 Tage im Monat oder mehr"],
      ["Triptane (Sumatriptan, Rizatriptan, Zolmitriptan…)", "10 Tage im Monat oder mehr"],
      ["Kombinationspräparate (mit Koffein oder Codein…) und Opioide (Tramadol, Codein…)", "10 Tage im Monat oder mehr"],
      ["Mehrere dieser Gruppen, ohne dass eine allein ihre Schwelle überschreitet", "10 Tage im Monat oder mehr insgesamt"],
    ],
  },
  thresholdsNote:
    "Diese Schwellen zählen Tage, nicht Tabletten: Ein Tag, an dem du zwei Tabletten oder zwei verschiedene Medikamente nimmst, zählt als ein Tag.",
  whatTitle: "Was tun, wenn du eine Schwelle überschreitest?",
  what: [
    [
      "Setze nicht alles auf einmal auf eigene Faust ab. Sprich mit deinem Arzt: Er hilft dir, diese Medikamente schrittweise zu reduzieren, oft mit einer vorbeugenden Behandlung, um die Zeit zu überbrücken.",
    ],
    [
      "Die gute Nachricht: Bei vielen Menschen gehen die Kopfschmerzen deutlich zurück, sobald die Medikamententage wieder unter den Schwellen liegen, meist innerhalb von einigen Wochen bis Monaten.",
    ],
    [
      "Um deine Medikamententage im Lauf des Monats festzuhalten, nutze ",
      { text: "das Migränetagebuch zum Ausdrucken", href: "/ressourcen/migraene-tagebuch" },
      ".",
    ],
  ],
  faqTitle: "Häufige Fragen",
  faq: [
    {
      q: "Zähle ich Tage oder Tabletten?",
      a: "Tage. Ein Tag, an dem du zwei Tabletten oder zwei verschiedene Medikamente nimmst, zählt als ein Tag.",
    },
    {
      q: "Zählen vorbeugende Behandlungen mit?",
      a: "Nein. Nur Akutmedikamente, die du gegen den Schmerz nimmst, zählen. Vorbeugende Behandlungen, die du täglich nimmst, um Attacken zu verhindern, zählen nicht.",
    },
    {
      q: "Stellt dieser Rechner eine Diagnose?",
      a: "Nein. Er vergleicht deine Antworten mit den medizinischen Schwellen, damit du mit deinem Arzt darüber sprechen kannst. Nur ein Arzt kann einen Kopfschmerz bei Medikamentenübergebrauch bestätigen.",
    },
  ],
};

export const overuse: OveruseCopy = {
  intro: "In einem typischen Monat:",
  headache: { label: "Tage mit Kopfschmerzen" },
  medsTitle: "Akutmedikamente",
  fields: {
    paracetamol: { label: "Tage mit Paracetamol" },
    nsaid: { label: "Tage mit einem Entzündungshemmer oder Aspirin", hint: "Ibuprofen, Naproxen, Diclofenac…" },
    triptan: { label: "Tage mit einem Triptan", hint: "Sumatriptan, Rizatriptan, Zolmitriptan…" },
    combo: { label: "Tage mit einem Kombinationspräparat oder Opioid", hint: "Mit Koffein oder Codein, Tramadol…" },
    total: { label: "Insgesamt: Tage mit mindestens einem Medikament", hint: "Ein Tag mit mehreren Medikamenten zählt nur einmal." },
  },
  durationLabel: "Seit wann nimmst du Medikamente so häufig?",
  durationOptions: ["Seit weniger als 3 Monaten", "Seit 3 Monaten oder länger"],
  decrease: "Ein Tag weniger",
  increase: "Ein Tag mehr",
  resultEyebrow: "Dein Ergebnis",
  empty: "Gib deine Medikamententage ein, um zu sehen, wo du stehst.",
  findingLabel: {
    paracetamol: "Paracetamol",
    nsaid: "Entzündungshemmer und Aspirin",
    triptan: "Triptane",
    combo: "Kombinationen und Opioide",
    total: "Alle Medikamente zusammen",
  },
  findingValue: "{days} Tage · Schwelle {limit}",
  results: {
    below: {
      title: "Du liegst unter den Schwellen",
      text: "Deine Medikamententage bleiben unter den Schwellen für einen Medikamentenübergebrauch. Zähle sie weiter: So bemerkst du eine Veränderung am besten früh.",
    },
    near: {
      title: "Du näherst dich einer Schwelle",
      text: "Du bist ein oder zwei Tage von einer Schwelle entfernt. Das ist noch kein Medikamentenübergebrauch, aber ein guter Zeitpunkt, mit deinem Arzt zu sprechen, vor allem über eine vorbeugende Behandlung, wenn deine Attacken häufig sind.",
    },
    over: {
      title: "Du überschreitest eine Schwelle",
      text: "In diesem Rhythmus können die Medikamente selbst die Kopfschmerzen aufrechterhalten. Sprich mit deinem Arzt, ohne auf eigene Faust alles auf einmal abzusetzen: Er hilft dir, schrittweise zu reduzieren.",
    },
    moh: {
      title: "Dein Profil entspricht einem Kopfschmerz bei Medikamentenübergebrauch",
      text: "Kopfschmerzen an 15 oder mehr Tagen im Monat und Medikamente über der Schwelle seit 3 Monaten oder länger: Das sind die Kriterien für einen Kopfschmerz bei Medikamentenübergebrauch. Nur ein Arzt kann das bestätigen. Sprich bald mit ihm: Das ist häufig, und es lässt sich behandeln.",
    },
  },
  appTitle: "Lass Mellow für dich zählen",
  appText:
    "Erfasse jede Attacke und jedes Medikament mit zwei Taps. Mellow zählt deine Medikamententage und erstellt einen PDF-Bericht für deinen Arzt.",
  disclaimer:
    "Dieser Rechner stellt keine Diagnose. Er hilft dir, klarer zu sehen und einen Arzttermin vorzubereiten. Im Zweifel sprich mit deinem Arzt.",
};
