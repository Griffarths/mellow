import type { Rich, TestCopy } from "../migraine-test";
import type { OverusePageCopy, OveruseCopy } from "../overuse";
import type { DiaryCopy, TestPageCopy } from "../tools";

// No Italian articles yet: the texts carry no blog links, results point to
// the diary instead. Add article links once the Italian blog exists.
const DIARY_PATH = "/risorse/diario-emicrania";
const diaryLink = { text: "il diario dell'emicrania da stampare", href: DIARY_PATH };
const nextStep: Rich = ["Il passo successivo: ", diaryLink, ", per annotare i tuoi attacchi in vista della visita."];

export const diary: DiaryCopy = {
  path: DIARY_PATH,
  navLabel: "Diario dell'emicrania",
  menuDescription: "Calendario e tabella degli attacchi da stampare",
  metaTitle: "Diario dell'emicrania da stampare (PDF gratuito)",
  description:
    "Scarica gratis un diario dell'emicrania da stampare: calendario del mese, intensità, farmaci e una tabella degli attacchi da mostrare al tuo medico.",
  title: "Diario dell'emicrania da stampare",
  lead: "Un calendario del mese e una tabella degli attacchi, su due pagine, da stampare e compilare giorno dopo giorno. Gratis, senza registrazione.",
  downloads: [
    { label: "Scarica il PDF (A4)", href: "/downloads/diario-emicrania-mellow-a4.pdf", primary: true },
  ],
  downloadNote: "PDF, 2 pagine, formato A4.",
  previewAlt: [
    "Pagina 1 del diario: calendario del mese con, per ogni giorno, l'intensità da 1 a 10, una casella per il farmaco e lo spazio per una nota",
    "Pagina 2 del diario: tabella degli attacchi con data, orari, intensità, sintomi, fattori scatenanti, farmaco e sollievo senza farmaci, ciascuno con una casella «ha aiutato»",
  ],
  whyTitle: "Perché tenere un diario dell'emicrania?",
  why: [
    [
      "Spesso è il primo consiglio dei neurologi. Annotare i tuoi attacchi ti permette di individuare i tuoi fattori scatenanti, di capire se una terapia funziona e di vedere se i tuoi attacchi seguono il tuo ciclo.",
    ],
    [
      "Ti permette anche di contare i giorni in cui prendi farmaci. Oltre i 10 giorni al mese aumenta il rischio di uso eccessivo di farmaci: gli antidolorifici stessi possono allora mantenere il mal di testa.",
    ],
  ],
  howTitle: "Come compilarlo",
  steps: [
    "In ogni giorno di attacco, annota l'intensità da 1 a 10 in basso nella casella del giorno.",
    "Spunta «Farm.» se quel giorno hai preso un farmaco per l'attacco. Puoi anche scrivere una parola nella casella: ciclo, notte difficile, stress.",
    "Per ogni attacco, compila una riga della tabella: ora di inizio e di fine, sintomi, possibili fattori scatenanti, farmaco preso e sollievo senza farmaci, spuntando per ciascuno se ha aiutato.",
    "A fine mese, conta i tuoi giorni di emicrania e i giorni con farmaci, poi porta il diario alla prossima visita.",
  ],
  doctorTitle: "Cosa guarderà il tuo medico",
  doctor: [
    "Il numero di giorni di emicrania al mese, per capire se valutare una terapia di profilassi.",
    "La durata e l'intensità degli attacchi, per scegliere la terapia per l'attacco più adatta.",
    "Il numero di giorni con farmaci, per individuare un uso eccessivo.",
    "I fattori scatenanti che si ripetono, ed eventuali legami con il ciclo.",
  ],
  appTitle: "Mellow lo compila con te",
  appText:
    "Registra un attacco con due tap sul telefono. Mellow calcola i tuoi giorni di emicrania, conta i farmaci, segue il meteo e prepara un report PDF per il tuo medico.",
  faqTitle: "Domande frequenti",
  faq: [
    {
      q: "Per quanto tempo bisogna tenere un diario dell'emicrania?",
      a: "Almeno da uno a tre mesi. È il tempo necessario perché emerga un ritmo, per esempio intorno al ciclo, e perché il tuo medico possa valutare una terapia di profilassi.",
    },
    {
      q: "Bisogna annotare anche i giorni senza attacchi?",
      a: "Lascia semplicemente vuota la casella. I giorni senza attacchi contano quanto gli altri: danno la tua frequenza reale e mostrano i periodi tranquilli.",
    },
    {
      q: "Il diario sostituisce una visita medica?",
      a: "No. È uno strumento per preparare la visita e parlarne con il tuo medico, non per fare una diagnosi.",
    },
  ],
};

export const testPage: TestPageCopy = {
  path: "/risorse/test-emicrania",
  navLabel: "Test emicrania",
  menuDescription: "Emicrania o mal di testa? 11 domande",
  metaTitle: "Test emicrania: emicrania o mal di testa? (gratis, 2 minuti)",
  description:
    "Rispondi a 11 domande basate sui criteri medici dell'emicrania e scopri se il tuo mal di testa somiglia a un'emicrania, a una cefalea tensiva o a qualcos'altro.",
  title: "Emicrania o mal di testa? Fai il test",
  lead: "11 domande, 2 minuti. Il test si basa sui criteri della Classificazione internazionale delle cefalee (ICHD-3), quella usata dai neurologi.",
  howTitle: "Come funziona questo test?",
  how: [
    [
      "Per parlare di emicrania, i neurologi cercano attacchi da 4 a 72 ore, con almeno due di queste caratteristiche: dolore da un solo lato, pulsante, da moderato a forte, peggiorato dallo sforzo fisico. Serve anche almeno un sintomo associato: nausea, oppure fastidio sia alla luce sia ai rumori.",
    ],
    [
      "La cefalea tensiva, invece, stringe da entrambi i lati, resta da lieve a moderata, non peggiora con lo sforzo e non provoca nausea.",
    ],
    [
      "Il test tiene conto anche dell'aura, del numero di giorni di mal di testa al mese e dei giorni con farmaci, che possono indicare un uso eccessivo di farmaci.",
    ],
  ],
  faqTitle: "Domande frequenti",
  faq: [
    {
      q: "Questo test è affidabile?",
      a: "Riprende i criteri usati dai medici, ma non sostituisce una visita. Solo un medico può fare una diagnosi, tenendo conto della tua storia e di un esame clinico.",
    },
    {
      q: "Si possono avere sia emicrania sia cefalea tensiva?",
      a: "Sì, anzi è frequente. Molte persone con emicrania hanno anche mal di testa più lievi di tipo tensivo. Un diario degli attacchi aiuta a distinguerli.",
    },
    {
      q: "Quando bisogna rivolgersi subito a un medico?",
      a: "In caso di dolore improvviso e molto intenso, febbre con rigidità del collo, debolezza su un lato del corpo, difficoltà a parlare o confusione, o mal di testa dopo un colpo alla testa. Chiama il 112 o il 118.",
    },
  ],
};

export const test: TestCopy = {
  progress: "Domanda {n} di {total}",
  back: "Indietro",
  next: "Continua",
  seeResult: "Vedi il mio risultato",
  restart: "Rifai il test",
  resultEyebrow: "Il tuo risultato",
  disclaimer:
    "Questo test non fa una diagnosi. Ti aiuta a vederci più chiaro e a preparare una visita. In caso di dubbio, parlane con il tuo medico.",
  appTitle: "Conferma il tuo profilo registrando i tuoi attacchi",
  appText:
    "Registra ogni attacco con due tap per un mese. Mellow calcola la tua frequenza, la durata media e i giorni con farmaci, e prepara un report PDF per il tuo medico.",
  questions: [
    {
      id: "duration",
      title: "Senza terapia, quanto dura di solito un attacco?",
      options: [
        { id: "under30m", label: "Meno di 30 minuti" },
        { id: "30mto4h", label: "Da 30 minuti a 4 ore" },
        { id: "4to72h", label: "Da 4 ore a 3 giorni" },
        { id: "over72h", label: "Più di 3 giorni" },
        { id: "unknown", label: "Non lo so, prendo sempre qualcosa" },
      ],
    },
    {
      id: "location",
      title: "Dove senti dolore, il più delle volte?",
      options: [
        { id: "one", label: "Da un solo lato della testa (il lato può cambiare da un attacco all'altro)" },
        { id: "both", label: "Da entrambi i lati, come una fascia o un casco" },
        { id: "varies", label: "Dipende dagli attacchi" },
      ],
    },
    {
      id: "quality",
      title: "Com'è il dolore?",
      options: [
        { id: "pulsating", label: "Pulsa, batte, come un cuore nella testa" },
        { id: "pressing", label: "Stringe o preme, come una morsa" },
        { id: "other", label: "Altro, oppure non lo so" },
      ],
    },
    {
      id: "intensity",
      title: "Quanto è intenso?",
      options: [
        { id: "mild", label: "Lieve: posso continuare le mie attività normalmente" },
        { id: "moderate", label: "Moderato: mi dà fastidio, rallento" },
        { id: "severe", label: "Forte: devo fermarmi o sdraiarmi" },
      ],
    },
    {
      id: "activity",
      title: "L'attività fisica peggiora il dolore?",
      hint: "Salire le scale, camminare in fretta, piegarti in avanti.",
      options: [
        { id: "yes", label: "Sì" },
        { id: "no", label: "No" },
        { id: "unsure", label: "Non lo so" },
      ],
    },
    {
      id: "nausea",
      title: "Durante l'attacco hai nausea o vomito?",
      options: [
        { id: "yes", label: "Sì" },
        { id: "no", label: "No" },
      ],
    },
    {
      id: "senses",
      title: "Durante l'attacco, la luce e i rumori ti danno fastidio?",
      options: [
        { id: "both", label: "Sì, entrambi" },
        { id: "one", label: "Solo uno dei due" },
        { id: "none", label: "Nessuno dei due" },
      ],
    },
    {
      id: "aura",
      title: "Prima o all'inizio del dolore, ti capita di avere disturbi che durano da 5 a 60 minuti e poi scompaiono?",
      hint: "Zigzag luminosi, una macchia cieca, un formicolio che risale lungo il braccio, difficoltà a trovare le parole.",
      options: [
        { id: "often", label: "Sì, spesso" },
        { id: "sometimes", label: "Sì, è già successo" },
        { id: "never", label: "No" },
      ],
    },
    {
      id: "frequency",
      title: "Quanti giorni al mese hai mal di testa?",
      options: [
        { id: "under4", label: "Meno di 4 giorni" },
        { id: "4to14", label: "Da 4 a 14 giorni" },
        { id: "15plus", label: "15 giorni o più" },
      ],
    },
    {
      id: "medication",
      title: "Quanti giorni al mese prendi un farmaco contro il dolore?",
      hint: "Paracetamolo, ibuprofene, aspirina, un triptano o altro.",
      options: [
        { id: "under10", label: "Meno di 10 giorni" },
        { id: "10to14", label: "Da 10 a 14 giorni" },
        { id: "15plus", label: "15 giorni o più" },
      ],
    },
    {
      id: "redflags",
      title: "Ultima domanda, importante: il tuo mal di testa ha mai presentato uno di questi segnali?",
      hint: "Puoi scegliere più risposte.",
      multiple: true,
      options: [
        { id: "thunderclap", label: "Un dolore improvviso e molto intenso, il peggiore della tua vita, che raggiunge il massimo in meno di un minuto" },
        { id: "fever", label: "Febbre con rigidità del collo" },
        { id: "neuro", label: "Debolezza su un lato del corpo, difficoltà a parlare o confusione" },
        { id: "trauma", label: "Un mal di testa comparso dopo un colpo alla testa" },
        { id: "new", label: "Un mal di testa nuovo dopo i 50 anni, o che cambia improvvisamente carattere" },
        { id: "longAura", label: "Disturbi visivi o formicolii che durano più di un'ora" },
        { id: "none", label: "Nessuno di questi segnali", exclusive: true },
      ],
    },
  ],
  results: {
    urgent: {
      title: "Parlane presto con un medico",
      text: "Hai selezionato almeno un segnale che richiede un parere medico senza aspettare. Il più delle volte la causa non è grave, ma questi sintomi vanno verificati. Se il dolore è improvviso e molto intenso, o se c'è debolezza su un lato del corpo o difficoltà a parlare, chiama il 112 o il 118.",
      links: [],
    },
    migraine: {
      title: "Il tuo mal di testa somiglia a un'emicrania",
      text: "Le tue risposte corrispondono ai criteri dell'emicrania senza aura: attacchi di diverse ore, almeno due caratteristiche tipiche del dolore e sintomi associati come nausea o fastidio alla luce e ai rumori. Solo un medico può confermare la diagnosi, ma è una buona base per parlarne.",
      links: nextStep,
    },
    migraineAura: {
      title: "Il tuo mal di testa somiglia a un'emicrania con aura",
      text: "I tuoi attacchi hanno le caratteristiche di un'emicrania, e i disturbi che descrivi prima del dolore somigliano a un'aura. Se questi disturbi sono recenti, insoliti o durano più di un'ora, rivolgiti a un medico per avere la certezza.",
      links: nextStep,
    },
    auraPossible: {
      title: "I tuoi disturbi somigliano a un'aura emicranica",
      text: "Disturbi visivi o sensitivi che durano da 5 a 60 minuti e poi scompaiono sono tipici di un'aura, anche quando il dolore che segue è lieve, o assente. Parlane con il tuo medico, soprattutto se è una cosa recente.",
      links: nextStep,
    },
    migraineProbable: {
      title: "Il tuo mal di testa somiglia in parte a un'emicrania",
      text: "Le tue risposte soddisfano quasi tutti i criteri dell'emicrania, ma non tutti. In questo caso i neurologi parlano di emicrania probabile. Annotare i tuoi attacchi per un mese aiuterà il tuo medico a vederci più chiaro.",
      links: ["Per cominciare: ", diaryLink, "."],
    },
    tension: {
      title: "Il tuo mal di testa somiglia a una cefalea tensiva",
      text: "Un dolore che stringe da entrambi i lati, da lieve a moderato, senza nausea né peggioramento con lo sforzo: è il profilo della cefalea tensiva, il mal di testa più frequente. Stress, mancanza di sonno e postura ne sono spesso la causa.",
      links: nextStep,
    },
    unclear: {
      title: "Le tue risposte non corrispondono chiaramente a un profilo",
      text: "Il tuo mal di testa non rientra chiaramente né nell'emicrania né nella cefalea tensiva. Non è preoccupante di per sé, ma vale la pena parlarne con il tuo medico, con una traccia scritta dei tuoi attacchi per aiutarlo.",
      links: ["Per aiutarti: ", diaryLink, "."],
    },
  },
  chronicNote: [
    "Hai mal di testa 15 giorni o più al mese: in questo caso si parla di forma cronica. Esistono terapie di profilassi, parlane con il tuo medico.",
  ],
  overuseNote: [
    "Prendi un farmaco contro il dolore 10 giorni o più al mese. Oltre questa soglia aumenta il rischio di uso eccessivo di farmaci: i farmaci stessi possono mantenere il mal di testa. ",
    { text: "Verifica a che punto sei con il calcolatore", href: "/risorse/calcolatore-abuso-farmaci" },
    ".",
  ],
};

export const cycleDiary: DiaryCopy = {
  path: "/risorse/diario-emicrania-mestruale",
  navLabel: "Diario dell'emicrania mestruale",
  menuDescription: "Attacchi e ciclo su 3 mesi, da stampare",
  metaTitle: "Diario dell'emicrania mestruale da stampare (PDF gratuito)",
  description:
    "Un calendario di 3 mesi da stampare per annotare mestruazioni e attacchi, e capire se le tue emicranie seguono il ciclo, come chiedono i medici.",
  title: "Diario dell'emicrania mestruale da stampare",
  lead: "Tre mesi su una pagina per annotare mestruazioni, attacchi e farmaci, e capire se le tue emicranie seguono il ciclo. Gratis, senza registrazione.",
  downloads: [
    { label: "Scarica il PDF (A4)", href: "/downloads/diario-emicrania-mestruale-mellow-a4.pdf", primary: true },
  ],
  downloadNote: "PDF, 2 pagine, formato A4.",
  previewAlt: [
    "Pagina 1 del diario: calendario di tre mesi con, per ogni giorno, una casella per le mestruazioni, l'intensità dell'attacco e una casella per il farmaco, poi un bilancio ciclo per ciclo",
    "Pagina 2 del diario: tabella degli attacchi con data, orari, intensità, sintomi, fattori scatenanti, farmaco e sollievo senza farmaci",
  ],
  whyTitle: "Perché seguire l'emicrania insieme al ciclo?",
  why: [
    [
      "In molte donne gli attacchi tornano intorno alle mestruazioni. I medici parlano di emicrania mestruale quando compaiono tra 2 giorni prima e 3 giorni dopo l'inizio delle mestruazioni, in almeno 2 cicli su 3.",
    ],
    [
      "Per saperlo, bisogna annotare mestruazioni e attacchi per almeno 3 cicli: è proprio ciò che permette questo diario. Confermarlo può cambiare la terapia, per esempio con un trattamento mirato su quei pochi giorni.",
    ],
  ],
  howTitle: "Come compilarlo",
  steps: [
    "Scrivi il mese all'inizio di ogni riga. In ogni giorno di mestruazioni, spunta la casella «Mestruazioni».",
    "In ogni giorno di attacco, annota l'intensità da 1 a 10 nella riga «Attacco» e spunta «Farm.» se hai preso un farmaco per l'attacco.",
    "Alla fine di ogni ciclo, compila il bilancio: primo giorno delle mestruazioni e se c'è stato un attacco tra 2 giorni prima e 3 giorni dopo.",
    "A pagina 2 puoi descrivere ogni attacco nel dettaglio, poi porta il diario alla prossima visita.",
  ],
  doctorTitle: "Cosa guarderà il tuo medico",
  doctor: [
    "Se i tuoi attacchi cadono intorno alle mestruazioni in almeno 2 cicli su 3.",
    "Se hai attacchi anche in altri momenti del ciclo, cosa che orienta la terapia.",
    "La durata e l'intensità degli attacchi mestruali, spesso più lunghi e più forti.",
    "I giorni con farmaci, per evitare un uso eccessivo.",
  ],
  appTitle: "Mellow lo compila con te",
  appText:
    "Registra i tuoi attacchi con due tap, con il ciclo mestruale tra i fattori scatenanti. Mellow ti mostra cosa si ripete e prepara un report PDF per il tuo medico.",
  faqTitle: "Domande frequenti",
  faq: [
    {
      q: "Quanti cicli bisogna seguire?",
      a: "Almeno 3. Si parla di emicrania mestruale quando gli attacchi cadono intorno alle mestruazioni in almeno 2 cicli su 3.",
    },
    {
      q: "E se il mio ciclo è irregolare?",
      a: "Il diario funziona lo stesso: segue i giorni del calendario, non un ciclo teorico. Spunta semplicemente le mestruazioni quando arrivano.",
    },
    {
      q: "E con la pillola?",
      a: "Il diario funziona anche in questo caso. Con la pillola gli attacchi cadono spesso nella settimana di pausa o di compresse inattive, e il diario lo mostra. Parlane con il tuo medico, soprattutto se hai l'emicrania con aura.",
    },
  ],
};

export const overusePage: OverusePageCopy = {
  path: "/risorse/calcolatore-abuso-farmaci",
  navLabel: "Calcolatore di abuso di farmaci",
  menuDescription: "I tuoi giorni con farmaci rispetto alle soglie",
  metaTitle: "Abuso di farmaci: calcola se superi le soglie (gratis)",
  description:
    "Indica i giorni in cui prendi farmaci contro il dolore e l'emicrania: il calcolatore li confronta con le soglie mediche della cefalea da uso eccessivo di farmaci, 10 o 15 giorni al mese a seconda del farmaco.",
  title: "Calcolatore di abuso di farmaci",
  lead: "Troppi antidolorifici possono mantenere il mal di testa. Indica in quanti giorni al mese li prendi: il calcolatore li confronta con le soglie usate dai neurologi.",
  thresholdsTitle: "Le soglie, farmaco per farmaco",
  thresholdsIntro: [
    "La Classificazione internazionale delle cefalee (ICHD-3) definisce la cefalea da uso eccessivo di farmaci così: mal di testa almeno 15 giorni al mese in una persona che ha già l'emicrania o un'altra cefalea, con un'assunzione regolare di farmaci per l'attacco oltre queste soglie da più di 3 mesi.",
  ],
  table: {
    headers: ["Farmaco", "Soglia"],
    rows: [
      ["Paracetamolo", "15 giorni al mese o più"],
      ["Antinfiammatori e aspirina (ibuprofene, ketoprofene, naprossene…)", "15 giorni al mese o più"],
      ["Triptani (sumatriptan, rizatriptan, eletriptan…)", "10 giorni al mese o più"],
      ["Associazioni (con caffeina o codeina…) e oppioidi (tramadolo, codeina…)", "10 giorni al mese o più"],
      ["Più di queste famiglie, senza superare la soglia di nessuna", "10 giorni al mese o più in totale"],
    ],
  },
  thresholdsNote:
    "Queste soglie contano i giorni, non le compresse: un giorno in cui prendi due compresse, o due farmaci diversi, conta come un solo giorno.",
  whatTitle: "Cosa fare se superi una soglia?",
  what: [
    [
      "Non smettere tutto di colpo di tua iniziativa. Parlane con il tuo medico: ti aiuterà a ridurre questi farmaci gradualmente, spesso con una terapia di profilassi per superare questa fase.",
    ],
    [
      "La buona notizia: in molte persone il mal di testa diminuisce nettamente quando i giorni con farmaci tornano sotto le soglie, di solito nel giro di qualche settimana o qualche mese.",
    ],
    [
      "Per tenere il conto dei giorni con farmaci nel corso del mese, usa ",
      { text: "il diario dell'emicrania da stampare", href: "/risorse/diario-emicrania" },
      ".",
    ],
  ],
  faqTitle: "Domande frequenti",
  faq: [
    {
      q: "Conto i giorni o le compresse?",
      a: "I giorni. Un giorno in cui prendi due compresse, o due farmaci diversi, conta come un solo giorno.",
    },
    {
      q: "Le terapie di profilassi contano?",
      a: "No. Contano solo i farmaci per l'attacco, presi per calmare il dolore. Le terapie di profilassi prese ogni giorno per prevenire gli attacchi non contano.",
    },
    {
      q: "Questo calcolatore fa una diagnosi?",
      a: "No. Confronta le tue risposte con le soglie mediche per aiutarti a parlarne con il tuo medico. Solo un medico può confermare una cefalea da uso eccessivo di farmaci.",
    },
  ],
};

export const overuse: OveruseCopy = {
  intro: "In un mese tipico:",
  headache: { label: "Giorni con mal di testa" },
  medsTitle: "Farmaci per l'attacco",
  fields: {
    paracetamol: { label: "Giorni con paracetamolo" },
    nsaid: { label: "Giorni con un antinfiammatorio o aspirina", hint: "Ibuprofene, ketoprofene, naprossene…" },
    triptan: { label: "Giorni con un triptano", hint: "Sumatriptan, rizatriptan, eletriptan…" },
    combo: { label: "Giorni con un'associazione o un oppioide", hint: "Con caffeina o codeina, tramadolo…" },
    total: { label: "In totale, giorni con almeno un farmaco", hint: "Un giorno in cui ne prendi più di uno conta una sola volta." },
  },
  durationLabel: "Da quanto tempo prendi farmaci con questa frequenza?",
  durationOptions: ["Da meno di 3 mesi", "Da 3 mesi o più"],
  decrease: "Un giorno in meno",
  increase: "Un giorno in più",
  resultEyebrow: "Il tuo risultato",
  empty: "Indica i giorni con farmaci per vedere a che punto sei.",
  findingLabel: {
    paracetamol: "Paracetamolo",
    nsaid: "Antinfiammatori e aspirina",
    triptan: "Triptani",
    combo: "Associazioni e oppioidi",
    total: "Tutti i farmaci insieme",
  },
  findingValue: "{days} giorni · soglia {limit}",
  results: {
    below: {
      title: "Sei sotto le soglie",
      text: "I tuoi giorni con farmaci restano sotto le soglie dell'uso eccessivo. Continua a contarli: è il modo migliore per accorgerti in tempo di un cambiamento.",
    },
    near: {
      title: "Ti stai avvicinando a una soglia",
      text: "Sei a uno o due giorni da una soglia. Non è un uso eccessivo, ma è il momento giusto per parlarne con il tuo medico, soprattutto di una terapia di profilassi se i tuoi attacchi sono frequenti.",
    },
    over: {
      title: "Superi una soglia",
      text: "Con questo ritmo, i farmaci stessi possono mantenere il mal di testa. Parlane con il tuo medico, senza smettere tutto di colpo di tua iniziativa: ti aiuterà a ridurli gradualmente.",
    },
    moh: {
      title: "Il tuo profilo corrisponde a una cefalea da uso eccessivo di farmaci",
      text: "Mal di testa 15 giorni al mese o più, e farmaci oltre la soglia da 3 mesi o più: sono i criteri della cefalea da uso eccessivo di farmaci. Solo un medico può confermarlo. Parlane presto: è frequente, e si cura.",
    },
  },
  appTitle: "Lascia che Mellow conti per te",
  appText:
    "Registra ogni attacco e ogni farmaco con due tap. Mellow conta i tuoi giorni con farmaci e prepara un report PDF per il tuo medico.",
  disclaimer:
    "Questo calcolatore non fa una diagnosi. Ti aiuta a vederci più chiaro e a preparare una visita. In caso di dubbio, parlane con il tuo medico.",
};
