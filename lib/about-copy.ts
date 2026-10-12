// The About page's text in the languages that have no hand-written page of
// their own (French, /a-propos, is the source; English is /about). Inline
// marks: **bold**, *italic*, {email} for the contact address. Tutoiement,
// "você" in Brazilian Portuguese, as on the rest of the site.
export type AboutBlock = { h2: string } | { p: string };

export type AboutCopy = {
  metaTitle: string;
  metaDescription: string;
  ogDescription: string;
  jobTitle: string;
  personDescription: string;
  back: string;
  title: string;
  blocks: AboutBlock[];
};

export const ABOUT_COPY: Record<"de" | "it" | "es" | "es-419" | "pt" | "pt-BR", AboutCopy> = {
  de: {
    metaTitle: "Über Mellow · Mellow",
    metaDescription:
      "Die Geschichte von Mellow, einer App zum Erfassen von Migräne, entwickelt von Laurine Nicoletti, unabhängige Entwicklerin aus Bordeaux. Eine App, gedacht von einer Migränikerin, nicht von einem Marketingkomitee.",
    ogDescription: "Die Geschichte von Mellow, einer App zum Erfassen von Migräne, entwickelt von Laurine Nicoletti.",
    jobTitle: "Unabhängige Entwicklerin",
    personDescription: "Entwicklerin von Mellow, einer App zum Erfassen von Migräne",
    back: "← Startseite",
    title: "Über Mellow",
    blocks: [
      { h2: "Hallo, ich bin Laurine 👋" },
      { p: "Ich bin **Laurine Nicoletti**, unabhängige Entwicklerin aus Bordeaux, und ich habe Migräne." },
      { p: "Ich habe Mellow entwickelt, weil **ich diese App selbst gebraucht habe**." },
      { h2: "Meine Geschichte mit der Migräne" },
      { p: "Meine ersten Migräneattacken hatte ich mit **21 Jahren**. Heute habe ich im Schnitt **einmal pro Woche** eine." },
      {
        p: "Ich habe Migräne **ohne Aura**. Der Schmerz baut sich nach und nach auf, auf einer Seite des Kopfes, bis er pochend und lähmend wird. Mit ihm kommen **Übelkeit**, **Lichtempfindlichkeit** und **Geräuschempfindlichkeit**. Das kostet mich einen ganzen Tag. Manchmal mehrere.",
      },
      {
        p: "Wenn du diese Zeilen liest, weißt du wahrscheinlich schon, wie sich das anfühlt. Dieses Gefühl, wenn **du weißt, dass es kommt**, du es aber nicht wirklich aufhalten kannst. Dieser Frust, Dinge absagen zu müssen, dich im Dunkeln zurückziehen zu müssen, dich stundenlang außer Gefecht gesetzt zu fühlen.",
      },
      { h2: "Warum diese App" },
      { p: "Laut WHO ist Migräne bei Menschen unter 50 Jahren **die Krankheit mit der zweitstärksten Beeinträchtigung weltweit**." },
      {
        p: "Und trotzdem wird sie weiterhin wie ein einfacher Kopfschmerz behandelt. *„Trink ein Glas Wasser, nimm eine Aspirin, das geht vorbei.“* Als ob alles nur im Kopf wäre. Als ob man übertreiben würde.",
      },
      {
        p: "Ich habe nach Werkzeugen gesucht, um meine eigenen Attacken besser zu verstehen. Meine Auslöser zu erkennen. Zu sehen, was hilft und was nicht. Konkrete Daten zu haben, die ich meinem Arzt zeigen kann.",
      },
      {
        p: "Was ich gefunden habe, hat mich frustriert. Komplizierte Apps, die 5 Minuten brauchen, um eine Attacke zu erfassen, wenn dir schon der Schädel brummt. Veraltete Designs, direkt aus dem Jahr 2010. Hohe Preise oder aggressive Paywalls für Grundfunktionen. Apps, die wie Krankenakten aussehen, nicht wie ein Begleiter für den Alltag.",
      },
      { p: "Also habe ich beschlossen, selbst eine zu bauen. Eine App, **gedacht von einer Migränikerin, nicht von einem Marketingkomitee.**" },
      { h2: "Was mir bei Mellow am Herzen liegt" },
      {
        p: "**Eine einfache Bedienung.** Eine Attacke zu erfassen dauert ein paar Sekunden. Kein endloses Formular. Keine Hürden. Wenn dir der Kopf platzt, willst du nicht mit einer Oberfläche kämpfen.",
      },
      {
        p: "**Ein durchdachtes Design.** Ich finde, ein Werkzeug, mit dem man eine chronische Krankheit managt, sollte angenehm zu benutzen sein. Nicht beängstigend. Nicht wie im Krankenhaus. Einfach beruhigend. Daher der Name *Mellow*.",
      },
      {
        p: "**Ein fairer Preis.** Mellow bietet eine großzügige kostenlose Version und ein Premium-Abo zu einem bewusst niedrigen Preis für alle, die weiter gehen möchten (detaillierte Analysen, persönliche Statistiken, Wetterdaten und mehr). Keine überhöhten Preise.",
      },
      {
        p: "**Inhalte mit Quellen.** Alle Artikel im Mellow-Blog basieren auf anerkannten medizinischen Quellen. WHO, Mayo Clinic, NHS, American Migraine Foundation, Migraine Trust. Keine ungeprüften „Wundermittel“. Keine Fehlinformationen zur Gesundheit.",
      },
      { p: "**Kein Verkauf von Daten.** Mellow wird deine Gesundheitsdaten niemals verkaufen. Das ist eine rote Linie." },
      { h2: "Was Mellow nicht ist" },
      {
        p: "Mellow **ist kein Ersatz für ärztlichen Rat**. Wenn du häufige oder starke Migräne hast, geh zu einem Neurologen oder zu deinem Hausarzt. Mellow ist ein Begleiter, der dir hilft, deine Attacken besser zu verstehen und besser mit den Fachleuten zu sprechen, die dich behandeln.",
      },
      { h2: "Und jetzt?" },
      {
        p: "Mellow ist noch jung. Ich entwickle die App allein, in meinem eigenen Tempo, und höre dabei auf die Rückmeldungen der Menschen mit Migräne, die sie nutzen.",
      },
      {
        p: "Wenn du Mellow nutzt und mir eine Idee oder einen Fehler mitteilen oder einfach Hallo sagen möchtest, erreichst du mich unter {email}.",
      },
      { p: "Danke, dass du da bist. Und pass auf dich auf." },
    ],
  },
  it: {
    metaTitle: "Chi sono · Mellow",
    metaDescription:
      "La storia di Mellow, app per tenere traccia dell'emicrania creata da Laurine Nicoletti, sviluppatrice indipendente a Bordeaux. Un'app pensata da una persona con emicrania, non da un comitato marketing.",
    ogDescription: "La storia di Mellow, app per tenere traccia dell'emicrania creata da Laurine Nicoletti.",
    jobTitle: "Sviluppatrice indipendente",
    personDescription: "Creatrice di Mellow, app per tenere traccia dell'emicrania",
    back: "← Home",
    title: "Chi sono",
    blocks: [
      { h2: "Ciao, sono Laurine 👋" },
      { p: "Sono **Laurine Nicoletti**, sviluppatrice indipendente a Bordeaux, e soffro di emicrania." },
      { p: "Ho creato Mellow perché **avevo bisogno di questa app per me stessa**." },
      { h2: "La mia storia con l'emicrania" },
      { p: "Ho avuto i miei primi attacchi di emicrania a **21 anni**. Oggi ne ho in media **uno a settimana**." },
      {
        p: "Soffro di emicrania **senza aura**. Il dolore arriva poco a poco, da un lato della testa, fino a diventare pulsante e invalidante. Insieme arrivano la **nausea**, l'**ipersensibilità alla luce** e ai **rumori**. Mi toglie una giornata. A volte di più.",
      },
      {
        p: "Se stai leggendo queste righe, probabilmente sai già cosa si prova. Quella sensazione in cui **sai che sta arrivando**, ma non puoi davvero fermarla. Quella frustrazione di dover annullare impegni, di doverti isolare al buio, di sentirti fuori gioco per ore.",
      },
      { h2: "Perché questa app" },
      { p: "Secondo l'OMS, l'emicrania è **la seconda malattia più invalidante al mondo** per chi ha meno di 50 anni." },
      {
        p: "Eppure si continua a trattarla come un semplice mal di testa. *«Bevi un bicchiere d'acqua, prendi una Tachipirina, ti passerà.»* Come se fosse tutto nella testa. Come se esagerassimo.",
      },
      {
        p: "Ho cercato strumenti per capire meglio i miei attacchi. Individuare i miei fattori scatenanti. Vedere cosa funziona e cosa no. Avere dati concreti da mostrare al mio medico.",
      },
      {
        p: "Quello che ho trovato mi ha frustrata. App complicate che chiedono 5 minuti per registrare un attacco quando hai già la testa che scoppia. Design datati, usciti dritti dal 2010. Prezzi alti o paywall aggressivi su funzioni di base. App che sembrano cartelle cliniche, non un compagno di tutti i giorni.",
      },
      { p: "Così ho deciso di farne una io. Un'app **pensata da una persona con emicrania, non da un comitato marketing.**" },
      { h2: "Cosa mi sta a cuore in Mellow" },
      {
        p: "**Un'esperienza semplice.** Registrare un attacco richiede pochi secondi. Nessun modulo infinito. Nessun ostacolo. Quando la testa ti scoppia, non hai voglia di combattere con un'interfaccia.",
      },
      {
        p: "**Un design curato.** Credo che uno strumento per gestire una malattia cronica debba essere piacevole da usare. Non ansiogeno. Non da ospedale. Semplicemente rilassante. Da qui il nome *Mellow*.",
      },
      {
        p: "**Un prezzo accessibile.** Mellow offre una versione gratuita generosa e un Premium a un prezzo volutamente basso per chi vuole andare oltre (analisi dettagliate, statistiche personalizzate, dati meteo e altro). Nessun prezzo gonfiato.",
      },
      {
        p: "**Contenuti con fonti.** Tutti gli articoli del blog di Mellow sono scritti a partire da fonti mediche riconosciute. OMS, Mayo Clinic, NHS, American Migraine Foundation, Migraine Trust. Nessun «rimedio miracoloso» non verificato. Nessuna disinformazione sulla salute.",
      },
      { p: "**Nessuna vendita di dati.** Mellow non venderà mai i tuoi dati sanitari. È una linea rossa." },
      { h2: "Cosa non è Mellow" },
      {
        p: "Mellow **non sostituisce il parere di un medico**. Se hai emicranie frequenti o forti, rivolgiti a un neurologo o al tuo medico di base. Mellow è un compagno che ti aiuta a capire meglio i tuoi attacchi e a dialogare meglio con i professionisti che ti curano.",
      },
      { h2: "E adesso?" },
      {
        p: "Mellow è ancora giovane. Lo sviluppo da sola, al mio ritmo, ascoltando i riscontri delle persone con emicrania che lo usano.",
      },
      {
        p: "Se usi Mellow e vuoi condividere con me un'idea, un bug o semplicemente salutarmi, puoi scrivermi a {email}.",
      },
      { p: "Grazie di essere qui. E prenditi cura di te." },
    ],
  },
  es: {
    metaTitle: "Sobre Mellow · Mellow",
    metaDescription:
      "La historia de Mellow, una app para registrar migrañas creada por Laurine Nicoletti, desarrolladora independiente en Burdeos. Una app pensada por una persona con migraña, no por un comité de marketing.",
    ogDescription: "La historia de Mellow, una app para registrar migrañas creada por Laurine Nicoletti.",
    jobTitle: "Desarrolladora independiente",
    personDescription: "Creadora de Mellow, una app para registrar migrañas",
    back: "← Inicio",
    title: "Sobre Mellow",
    blocks: [
      { h2: "Hola, soy Laurine 👋" },
      { p: "Soy **Laurine Nicoletti**, desarrolladora independiente en Burdeos, y tengo migraña." },
      { p: "Creé Mellow porque **necesitaba esta app para mí misma**." },
      { h2: "Mi historia con la migraña" },
      { p: "Tuve mis primeras migrañas a los **21 años**. Hoy tengo, de media, **una por semana**." },
      {
        p: "Tengo migraña **sin aura**. El dolor se instala poco a poco, en un lado de la cabeza, hasta volverse pulsátil e incapacitante. Con él llegan las **náuseas**, la **hipersensibilidad a la luz** y al **ruido**. Me quita un día entero. A veces varios.",
      },
      {
        p: "Si estás leyendo estas líneas, probablemente ya sabes lo que se siente. Esa sensación en la que **sabes que viene**, pero no puedes pararla de verdad. Esa frustración de tener que cancelar planes, de tener que aislarte a oscuras, de sentirte fuera de juego durante horas.",
      },
      { h2: "Por qué esta app" },
      { p: "Según la OMS, la migraña es **la segunda enfermedad más incapacitante del mundo** en menores de 50 años." },
      {
        p: "Y sin embargo, se sigue tratando como un simple dolor de cabeza. *«Bébete un vaso de agua, tómate un paracetamol, ya se te pasará.»* Como si todo estuviera en la cabeza. Como si exageráramos.",
      },
      {
        p: "Busqué herramientas para entender mejor mis propias crisis. Identificar mis desencadenantes. Ver qué funciona y qué no. Tener datos concretos que enseñar a mi médico.",
      },
      {
        p: "Lo que encontré me frustró. Apps complicadas que piden 5 minutos para registrar una crisis cuando ya te va a estallar la cabeza. Diseños anticuados, sacados directamente de 2010. Precios altos o muros de pago agresivos en funciones básicas. Apps que parecen historiales médicos, no un compañero del día a día.",
      },
      { p: "Así que decidí hacer una yo misma. Una app **pensada por una persona con migraña, no por un comité de marketing.**" },
      { h2: "Lo que me importa en Mellow" },
      {
        p: "**Una experiencia sencilla.** Registrar una crisis lleva unos segundos. Sin formularios interminables. Sin complicaciones. Cuando te va a estallar la cabeza, no tienes ganas de pelearte con una interfaz.",
      },
      {
        p: "**Un diseño cuidado.** Creo que una herramienta para gestionar una enfermedad crónica tiene que ser agradable de usar. Que no genere ansiedad. Que no parezca un hospital. Que simplemente tranquilice. De ahí el nombre *Mellow*.",
      },
      {
        p: "**Un precio accesible.** Mellow ofrece una versión gratuita generosa y un Premium a un precio deliberadamente bajo para quienes quieren ir más allá (análisis detallados, estadísticas personalizadas, datos meteorológicos, etc.). Sin precios inflados.",
      },
      {
        p: "**Contenido con fuentes.** Todos los artículos del blog de Mellow se escriben a partir de fuentes médicas reconocidas. OMS, Mayo Clinic, NHS, American Migraine Foundation, Migraine Trust. Sin «remedios milagro» sin verificar. Sin desinformación sobre salud.",
      },
      { p: "**Ninguna venta de datos.** Mellow nunca venderá tus datos de salud. Es una línea roja." },
      { h2: "Lo que Mellow no es" },
      {
        p: "Mellow **no sustituye la opinión de un médico**. Si tienes migrañas frecuentes o intensas, consulta a un neurólogo o a tu médico de cabecera. Mellow es un compañero que te ayuda a entender mejor tus crisis y a hablar mejor con los profesionales que te atienden.",
      },
      { h2: "¿Y ahora qué?" },
      {
        p: "Mellow todavía es joven. Lo desarrollo sola, a mi ritmo, escuchando lo que me cuentan las personas con migraña que lo usan.",
      },
      {
        p: "Si usas Mellow y quieres compartir conmigo una idea, un error o simplemente saludarme, puedes escribirme a {email}.",
      },
      { p: "Gracias por estar aquí. Y cuídate mucho." },
    ],
  },
  "es-419": {
    metaTitle: "Sobre Mellow · Mellow",
    metaDescription:
      "La historia de Mellow, una app para registrar migrañas creada por Laurine Nicoletti, desarrolladora independiente en Burdeos. Una app pensada por una persona con migraña, no por un comité de marketing.",
    ogDescription: "La historia de Mellow, una app para registrar migrañas creada por Laurine Nicoletti.",
    jobTitle: "Desarrolladora independiente",
    personDescription: "Creadora de Mellow, una app para registrar migrañas",
    back: "← Inicio",
    title: "Sobre Mellow",
    blocks: [
      { h2: "Hola, soy Laurine 👋" },
      { p: "Soy **Laurine Nicoletti**, desarrolladora independiente en Burdeos, y tengo migraña." },
      { p: "Creé Mellow porque **necesitaba esta app para mí misma**." },
      { h2: "Mi historia con la migraña" },
      { p: "Tuve mis primeras migrañas a los **21 años**. Hoy tengo, en promedio, **una por semana**." },
      {
        p: "Tengo migraña **sin aura**. El dolor se instala poco a poco, en un lado de la cabeza, hasta volverse pulsátil e incapacitante. Con él llegan las **náuseas**, la **hipersensibilidad a la luz** y al **ruido**. Me quita un día entero. A veces varios.",
      },
      {
        p: "Si estás leyendo estas líneas, probablemente ya sabes lo que se siente. Esa sensación en la que **sabes que viene**, pero no puedes detenerla de verdad. Esa frustración de tener que cancelar planes, de tener que aislarte a oscuras, de sentirte fuera de juego durante horas.",
      },
      { h2: "Por qué esta app" },
      { p: "Según la OMS, la migraña es **la segunda enfermedad más incapacitante del mundo** en menores de 50 años." },
      {
        p: "Y sin embargo, se sigue tratando como un simple dolor de cabeza. *«Tómate un vaso de agua, tómate un paracetamol, ya se te va a pasar.»* Como si todo estuviera en la cabeza. Como si exageráramos.",
      },
      {
        p: "Busqué herramientas para entender mejor mis propias crisis. Identificar mis desencadenantes. Ver qué funciona y qué no. Tener datos concretos para mostrarle a mi médico.",
      },
      {
        p: "Lo que encontré me frustró. Apps complicadas que piden 5 minutos para registrar una crisis cuando ya te va a estallar la cabeza. Diseños anticuados, sacados directamente de 2010. Precios altos o muros de pago agresivos en funciones básicas. Apps que parecen expedientes médicos, no un compañero del día a día.",
      },
      { p: "Así que decidí hacer una yo misma. Una app **pensada por una persona con migraña, no por un comité de marketing.**" },
      { h2: "Lo que me importa en Mellow" },
      {
        p: "**Una experiencia sencilla.** Registrar una crisis toma unos segundos. Sin formularios interminables. Sin complicaciones. Cuando te va a estallar la cabeza, no tienes ganas de pelearte con una interfaz.",
      },
      {
        p: "**Un diseño cuidado.** Creo que una herramienta para manejar una enfermedad crónica tiene que ser agradable de usar. Que no genere ansiedad. Que no parezca un hospital. Que simplemente tranquilice. De ahí el nombre *Mellow*.",
      },
      {
        p: "**Un precio accesible.** Mellow ofrece una versión gratuita generosa y un Premium a un precio deliberadamente bajo para quienes quieren ir más allá (análisis detallados, estadísticas personalizadas, datos del clima, etc.). Sin precios inflados.",
      },
      {
        p: "**Contenido con fuentes.** Todos los artículos del blog de Mellow se escriben a partir de fuentes médicas reconocidas. OMS, Mayo Clinic, NHS, American Migraine Foundation, Migraine Trust. Sin «remedios milagrosos» sin verificar. Sin desinformación sobre salud.",
      },
      { p: "**Ninguna venta de datos.** Mellow nunca venderá tus datos de salud. Es una línea roja." },
      { h2: "Lo que Mellow no es" },
      {
        p: "Mellow **no sustituye la opinión de un médico**. Si tienes migrañas frecuentes o intensas, consulta a un neurólogo o a tu médico general. Mellow es un compañero que te ayuda a entender mejor tus crisis y a hablar mejor con los profesionales que te atienden.",
      },
      { h2: "¿Y ahora qué?" },
      {
        p: "Mellow todavía es joven. Lo desarrollo sola, a mi ritmo, escuchando lo que me cuentan las personas con migraña que lo usan.",
      },
      {
        p: "Si usas Mellow y quieres compartir conmigo una idea, un error o simplemente saludarme, puedes escribirme a {email}.",
      },
      { p: "Gracias por estar aquí. Y cuídate mucho." },
    ],
  },
  pt: {
    metaTitle: "Sobre o Mellow · Mellow",
    metaDescription:
      "A história do Mellow, uma app para registar enxaquecas criada por Laurine Nicoletti, programadora independente em Bordéus. Uma app pensada por quem tem enxaqueca, não por uma equipa de marketing.",
    ogDescription: "A história do Mellow, uma app para registar enxaquecas criada por Laurine Nicoletti.",
    jobTitle: "Programadora independente",
    personDescription: "Criadora do Mellow, uma app para registar enxaquecas",
    back: "← Início",
    title: "Sobre o Mellow",
    blocks: [
      { h2: "Olá, eu sou a Laurine 👋" },
      { p: "Sou a **Laurine Nicoletti**, programadora independente em Bordéus, e tenho enxaqueca." },
      { p: "Criei o Mellow porque **precisava desta app para mim mesma**." },
      { h2: "A minha história com a enxaqueca" },
      { p: "Tive as minhas primeiras enxaquecas aos **21 anos**. Hoje tenho, em média, **uma por semana**." },
      {
        p: "Tenho enxaqueca **sem aura**. A dor instala-se aos poucos, de um lado da cabeça, até se tornar pulsátil e incapacitante. Com ela vêm as **náuseas**, a **hipersensibilidade à luz** e ao **barulho**. Tira-me um dia inteiro. Às vezes vários.",
      },
      {
        p: "Se estás a ler estas linhas, provavelmente já sabes como é. Aquela sensação em que **sabes que está a chegar**, mas não consegues realmente travá-la. Aquela frustração de ter de cancelar planos, de te isolares no escuro, de te sentires fora de jogo durante horas.",
      },
      { h2: "Porquê esta app" },
      { p: "Segundo a OMS, a enxaqueca é **a segunda doença mais incapacitante do mundo** em pessoas com menos de 50 anos." },
      {
        p: "E, no entanto, continua a ser tratada como uma simples dor de cabeça. *«Bebe um copo de água, toma um Ben-u-ron, isso passa.»* Como se fosse tudo da cabeça. Como se estivéssemos a exagerar.",
      },
      {
        p: "Procurei ferramentas para compreender melhor as minhas próprias crises. Identificar os meus gatilhos. Ver o que resulta e o que não resulta. Ter dados concretos para mostrar ao meu médico.",
      },
      {
        p: "O que encontrei frustrou-me. Apps complicadas que pedem 5 minutos para registar uma crise quando já tens a cabeça a rebentar. Designs antiquados, saídos diretamente de 2010. Preços altos ou paywalls agressivos em funcionalidades básicas. Apps que parecem processos clínicos, não um companheiro do dia a dia.",
      },
      { p: "Por isso decidi fazer uma eu mesma. Uma app **pensada por quem tem enxaqueca, não por uma equipa de marketing.**" },
      { h2: "O que me é importante no Mellow" },
      {
        p: "**Uma experiência simples.** Registar uma crise demora poucos segundos. Sem formulários intermináveis. Sem complicações. Quando tens a cabeça a rebentar, não te apetece lutar com uma interface.",
      },
      {
        p: "**Um design cuidado.** Acredito que uma ferramenta usada para gerir uma doença crónica deve ser agradável de usar. Sem causar ansiedade. Sem parecer um hospital. Apenas tranquilizante. Daí o nome *Mellow*.",
      },
      {
        p: "**Um preço acessível.** O Mellow oferece uma versão gratuita generosa e um Premium a um preço propositadamente baixo para quem quer ir mais longe (análises detalhadas, estatísticas personalizadas, dados meteorológicos, etc.). Sem preços inflacionados.",
      },
      {
        p: "**Conteúdo com fontes.** Todos os artigos do blog do Mellow são escritos a partir de fontes médicas reconhecidas. OMS, Mayo Clinic, NHS, American Migraine Foundation, Migraine Trust. Sem «remédios milagrosos» não verificados. Sem desinformação sobre saúde.",
      },
      { p: "**Nenhuma venda de dados.** O Mellow nunca venderá os teus dados de saúde. É uma linha vermelha." },
      { h2: "O que o Mellow não é" },
      {
        p: "O Mellow **não substitui um parecer médico**. Se tens enxaquecas frequentes ou fortes, consulta um neurologista ou o teu médico de família. O Mellow é um companheiro que te ajuda a compreender melhor as tuas crises e a dialogar melhor com os profissionais que cuidam de ti.",
      },
      { h2: "E agora?" },
      {
        p: "O Mellow ainda é jovem. Desenvolvo-o sozinha, ao meu ritmo, a ouvir as opiniões das pessoas com enxaqueca que o usam.",
      },
      {
        p: "Se usas o Mellow e queres partilhar comigo uma ideia, um erro ou simplesmente dizer olá, podes escrever-me para {email}.",
      },
      { p: "Obrigada por estares aqui. E cuida de ti." },
    ],
  },
  "pt-BR": {
    metaTitle: "Sobre o Mellow · Mellow",
    metaDescription:
      "A história do Mellow, um app para registrar enxaquecas criado por Laurine Nicoletti, desenvolvedora independente em Bordeaux. Um app pensado por quem tem enxaqueca, não por uma equipe de marketing.",
    ogDescription: "A história do Mellow, um app para registrar enxaquecas criado por Laurine Nicoletti.",
    jobTitle: "Desenvolvedora independente",
    personDescription: "Criadora do Mellow, um app para registrar enxaquecas",
    back: "← Início",
    title: "Sobre o Mellow",
    blocks: [
      { h2: "Oi, eu sou a Laurine 👋" },
      { p: "Sou a **Laurine Nicoletti**, desenvolvedora independente em Bordeaux, e tenho enxaqueca." },
      { p: "Criei o Mellow porque **eu precisava desse app para mim mesma**." },
      { h2: "Minha história com a enxaqueca" },
      { p: "Tive minhas primeiras enxaquecas aos **21 anos**. Hoje tenho, em média, **uma por semana**." },
      {
        p: "Tenho enxaqueca **sem aura**. A dor vem aos poucos, de um lado da cabeça, até ficar pulsátil e incapacitante. Junto com ela vêm as **náuseas**, a **sensibilidade à luz** e ao **barulho**. Isso me tira um dia inteiro. Às vezes vários.",
      },
      {
        p: "Se você está lendo estas linhas, provavelmente já sabe como é. Aquela sensação em que **você sabe que ela está vindo**, mas não consegue realmente impedir. Aquela frustração de ter que cancelar compromissos, de ter que se isolar no escuro, de se sentir fora do jogo por horas.",
      },
      { h2: "Por que este app" },
      { p: "Segundo a OMS, a enxaqueca é **a segunda doença mais incapacitante do mundo** em pessoas com menos de 50 anos." },
      {
        p: "E mesmo assim, ela continua sendo tratada como uma simples dor de cabeça. *“Toma um copo d'água, toma um Tylenol, que passa.”* Como se fosse coisa da sua cabeça. Como se a gente estivesse exagerando.",
      },
      {
        p: "Procurei ferramentas para entender melhor minhas próprias crises. Identificar meus gatilhos. Ver o que funciona e o que não funciona. Ter dados concretos para mostrar ao meu médico.",
      },
      {
        p: "O que encontrei me frustrou. Apps complicados que pedem 5 minutos para registrar uma crise quando sua cabeça já está explodindo. Designs ultrapassados, saídos direto de 2010. Preços altos ou paywalls agressivos em funções básicas. Apps que parecem prontuários médicos, não um companheiro do dia a dia.",
      },
      { p: "Então decidi criar um eu mesma. Um app **pensado por quem tem enxaqueca, não por uma equipe de marketing.**" },
      { h2: "O que é importante para mim no Mellow" },
      {
        p: "**Uma experiência simples.** Registrar uma crise leva poucos segundos. Sem formulários intermináveis. Sem complicação. Quando sua cabeça está explodindo, você não quer brigar com uma interface.",
      },
      {
        p: "**Um design caprichado.** Acredito que uma ferramenta para lidar com uma doença crônica precisa ser agradável de usar. Sem causar ansiedade. Sem cara de hospital. Só tranquilizante. Daí o nome *Mellow*.",
      },
      {
        p: "**Um preço acessível.** O Mellow oferece uma versão gratuita generosa e um Premium com preço propositalmente baixo para quem quer ir além (análises detalhadas, estatísticas personalizadas, dados do clima etc.). Sem preços inflados.",
      },
      {
        p: "**Conteúdo com fontes.** Todos os artigos do blog do Mellow são escritos a partir de fontes médicas reconhecidas. OMS, Mayo Clinic, NHS, American Migraine Foundation, Migraine Trust. Nada de “remédios milagrosos” sem comprovação. Nada de desinformação sobre saúde.",
      },
      { p: "**Nenhuma venda de dados.** O Mellow nunca vai vender seus dados de saúde. Isso é uma linha vermelha." },
      { h2: "O que o Mellow não é" },
      {
        p: "O Mellow **não substitui a orientação de um médico**. Se você tem enxaquecas frequentes ou fortes, procure um neurologista ou seu clínico geral. O Mellow é um companheiro que ajuda você a entender melhor suas crises e a conversar melhor com os profissionais que cuidam de você.",
      },
      { h2: "E agora?" },
      {
        p: "O Mellow ainda é jovem. Eu desenvolvo o app sozinha, no meu ritmo, ouvindo o retorno das pessoas com enxaqueca que o usam.",
      },
      {
        p: "Se você usa o Mellow e quer compartilhar uma ideia, um bug ou só dar um oi, pode me escrever em {email}.",
      },
      { p: "Obrigada por estar aqui. E se cuida." },
    ],
  },
};
