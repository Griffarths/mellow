import type { Rich, TestCopy } from "../migraine-test";
import type { DiaryCopy, TestPageCopy } from "../tools";

// Brazilian Portuguese (same URLs as Portugal, regional wording). No
// articles yet: results point to the diary instead.
const DIARY_PATH = "/ferramentas/diario-de-enxaqueca";
const diaryLink = { text: "o diário de enxaqueca para imprimir", href: DIARY_PATH };
const nextStep: Rich = ["Próximo passo: ", diaryLink, ", para anotar suas crises até a consulta."];

export const diary: DiaryCopy = {
  path: DIARY_PATH,
  navLabel: "Diário de enxaqueca",
  menuDescription: "Calendário e registro de crises para imprimir",
  metaTitle: "Diário de enxaqueca para imprimir (PDF grátis)",
  description:
    "Baixe grátis um diário de enxaqueca para imprimir: calendário do mês, intensidade, medicamentos e um registro das crises para mostrar ao seu médico.",
  title: "Diário de enxaqueca para imprimir",
  lead: "Um calendário do mês e um registro das crises, em duas páginas, para imprimir e preencher ao longo dos dias. Grátis, sem cadastro.",
  downloads: [
    { label: "Baixar o PDF (A4)", href: "/downloads/diario-de-enxaqueca-mellow-brasil-a4.pdf", primary: true },
  ],
  downloadNote: "PDF, 2 páginas, formato A4.",
  previewAlt: [
    "Página 1 do diário: calendário do mês com, para cada dia, a intensidade de 1 a 10, um quadradinho para o medicamento e espaço para uma anotação",
    "Página 2 do diário: tabela das crises com data, horários, intensidade, sintomas, gatilhos, medicamento e alívio sem medicamento, cada um com um quadradinho “ajudou”",
  ],
  whyTitle: "Por que manter um diário de enxaqueca?",
  why: [
    [
      "Costuma ser o primeiro conselho dos neurologistas. Anotar suas crises ajuda você a identificar seus gatilhos, ver se um tratamento está funcionando e perceber se as crises acompanham seu ciclo menstrual.",
    ],
    [
      "Ele também permite contar seus dias com medicamento. Acima de 10 dias por mês, aumenta o risco de uso excessivo de medicamentos: os próprios analgésicos podem então manter as dores de cabeça.",
    ],
  ],
  howTitle: "Como preencher",
  steps: [
    "Em cada dia de crise, anote a intensidade de 1 a 10 na parte de baixo do quadrado do dia.",
    "Marque “Med.” se você tomou um medicamento para a crise nesse dia. Você também pode escrever uma palavra no quadrado: menstruação, noite mal dormida, estresse.",
    "Para cada crise, preencha uma linha da tabela: horário de início e de fim, sintomas, possíveis gatilhos, medicamento tomado e alívio sem medicamento, marcando em cada um se ajudou.",
    "No fim do mês, conte seus dias de enxaqueca e seus dias com medicamento, e leve o diário à sua próxima consulta.",
  ],
  doctorTitle: "O que o seu médico vai observar",
  doctor: [
    "O número de dias de enxaqueca por mês, para saber se vale a pena discutir um tratamento preventivo.",
    "A duração e a intensidade das crises, para escolher o tratamento de crise certo.",
    "O número de dias com medicamento, para identificar um uso excessivo.",
    "Os gatilhos que se repetem, e uma possível relação com a menstruação.",
  ],
  appTitle: "O Mellow preenche com você",
  appText:
    "Registre uma crise com dois toques no celular. O Mellow calcula seus dias de enxaqueca, conta seus medicamentos, acompanha o clima e prepara um relatório em PDF para o seu médico.",
  faqTitle: "Perguntas frequentes",
  faq: [
    {
      q: "Por quanto tempo devo manter um diário de enxaqueca?",
      a: "Pelo menos de um a três meses. É o tempo necessário para aparecer um padrão, por exemplo perto da menstruação, e para o seu médico poder avaliar um tratamento preventivo.",
    },
    {
      q: "Preciso anotar os dias sem crise?",
      a: "É só deixar o quadrado em branco. Os dias sem crise contam tanto quanto os outros: eles mostram sua frequência real e os períodos tranquilos.",
    },
    {
      q: "O diário substitui uma consulta médica?",
      a: "Não. Ele é uma ferramenta para preparar a consulta e conversar com o seu médico, não para fazer um diagnóstico.",
    },
  ],
};

export const testPage: TestPageCopy = {
  path: "/ferramentas/teste-de-enxaqueca",
  navLabel: "Teste de enxaqueca",
  menuDescription: "Enxaqueca ou dor de cabeça? 11 perguntas",
  metaTitle: "Teste de enxaqueca: enxaqueca ou dor de cabeça? (grátis, 2 minutos)",
  description:
    "Responda a 11 perguntas baseadas nos critérios médicos da enxaqueca e descubra se suas dores de cabeça se parecem com enxaqueca, cefaleia tensional ou outra coisa.",
  title: "Enxaqueca ou dor de cabeça? Faça o teste",
  lead: "11 perguntas, 2 minutos. O teste se baseia nos critérios da Classificação Internacional das Cefaleias (ICHD-3), a mesma usada pelos neurologistas.",
  howTitle: "Como funciona este teste?",
  how: [
    [
      "Para falar em enxaqueca, os neurologistas procuram crises de 4 a 72 horas, com pelo menos duas destas características: dor de um lado só, latejante, moderada a forte, que piora com esforço físico. Também é preciso ter pelo menos um sintoma associado: náusea, ou incômodo com a luz e com o barulho ao mesmo tempo.",
    ],
    [
      "Já a cefaleia tensional aperta dos dois lados, fica entre leve e moderada, não piora com esforço e não causa náusea.",
    ],
    [
      "O teste também leva em conta a aura, o número de dias com dor de cabeça por mês e os dias com medicamento, que podem indicar um uso excessivo de medicamentos.",
    ],
  ],
  faqTitle: "Perguntas frequentes",
  faq: [
    {
      q: "Este teste é confiável?",
      a: "Ele usa os critérios que os médicos usam, mas não substitui uma avaliação médica. Só um médico pode dar um diagnóstico, levando em conta o seu histórico e um exame clínico.",
    },
    {
      q: "Dá para ter enxaqueca e cefaleia tensional ao mesmo tempo?",
      a: "Sim, e é até comum. Muitas pessoas com enxaqueca também têm dores de cabeça mais leves do tipo tensional. Um diário das crises ajuda a diferenciar as duas.",
    },
    {
      q: "Quando procurar atendimento de urgência?",
      a: "Em caso de dor súbita e muito forte, febre com rigidez na nuca, fraqueza de um lado do corpo, dificuldade para falar ou confusão, ou dor de cabeça depois de uma pancada na cabeça. Ligue para o SAMU (192).",
    },
  ],
};

export const test: TestCopy = {
  progress: "Pergunta {n} de {total}",
  back: "Voltar",
  next: "Continuar",
  seeResult: "Ver meu resultado",
  restart: "Refazer o teste",
  resultEyebrow: "Seu resultado",
  disclaimer:
    "Este teste não faz diagnóstico. Ele ajuda você a enxergar com mais clareza e a se preparar para uma consulta. Na dúvida, converse com o seu médico.",
  appTitle: "Confirme seu perfil registrando suas crises",
  appText:
    "Registre cada crise com dois toques durante um mês. O Mellow calcula sua frequência, a duração média e os dias com medicamento, e prepara um relatório em PDF para o seu médico.",
  questions: [
    {
      id: "duration",
      title: "Sem tratamento, quanto tempo dura uma crise, em geral?",
      options: [
        { id: "under30m", label: "Menos de 30 minutos" },
        { id: "30mto4h", label: "De 30 minutos a 4 horas" },
        { id: "4to72h", label: "De 4 horas a 3 dias" },
        { id: "over72h", label: "Mais de 3 dias" },
        { id: "unknown", label: "Não sei, sempre tomo alguma coisa" },
      ],
    },
    {
      id: "location",
      title: "Onde dói, na maioria das vezes?",
      options: [
        { id: "one", label: "De um lado só da cabeça (o lado pode mudar de uma crise para outra)" },
        { id: "both", label: "Dos dois lados, como uma faixa ou um capacete" },
        { id: "varies", label: "Depende da crise" },
      ],
    },
    {
      id: "quality",
      title: "Como é a dor?",
      options: [
        { id: "pulsating", label: "Lateja, pulsa, como um coração dentro da cabeça" },
        { id: "pressing", label: "Aperta ou pressiona, como uma morsa" },
        { id: "other", label: "Outra, ou não sei" },
      ],
    },
    {
      id: "intensity",
      title: "Qual é a intensidade?",
      options: [
        { id: "mild", label: "Leve: consigo continuar minhas atividades normalmente" },
        { id: "moderate", label: "Moderada: atrapalha, eu desacelero" },
        { id: "severe", label: "Forte: preciso parar ou me deitar" },
      ],
    },
    {
      id: "activity",
      title: "A atividade física piora a dor?",
      hint: "Subir escadas, andar rápido, se inclinar para a frente.",
      options: [
        { id: "yes", label: "Sim" },
        { id: "no", label: "Não" },
        { id: "unsure", label: "Não sei" },
      ],
    },
    {
      id: "nausea",
      title: "Durante a crise, você tem náusea ou vômito?",
      options: [
        { id: "yes", label: "Sim" },
        { id: "no", label: "Não" },
      ],
    },
    {
      id: "senses",
      title: "Durante a crise, a luz e o barulho incomodam você?",
      options: [
        { id: "both", label: "Sim, os dois" },
        { id: "one", label: "Só um dos dois" },
        { id: "none", label: "Nenhum dos dois" },
      ],
    },
    {
      id: "aura",
      title: "Antes ou no começo da dor, você às vezes tem alterações que duram de 5 a 60 minutos e depois desaparecem?",
      hint: "Zigue-zagues luminosos, uma mancha cega, formigamento que sobe pelo braço, dificuldade para encontrar as palavras.",
      options: [
        { id: "often", label: "Sim, muitas vezes" },
        { id: "sometimes", label: "Sim, já aconteceu" },
        { id: "never", label: "Não" },
      ],
    },
    {
      id: "frequency",
      title: "Quantos dias por mês você tem dor de cabeça?",
      options: [
        { id: "under4", label: "Menos de 4 dias" },
        { id: "4to14", label: "De 4 a 14 dias" },
        { id: "15plus", label: "15 dias ou mais" },
      ],
    },
    {
      id: "medication",
      title: "Quantos dias por mês você toma algum remédio para dor?",
      hint: "Paracetamol, dipirona, ibuprofeno, aspirina, um triptano ou outro.",
      options: [
        { id: "under10", label: "Menos de 10 dias" },
        { id: "10to14", label: "De 10 a 14 dias" },
        { id: "15plus", label: "15 dias ou mais" },
      ],
    },
    {
      id: "redflags",
      title: "Última pergunta, e importante: sua dor de cabeça já apresentou algum destes sinais?",
      hint: "Você pode marcar mais de uma resposta.",
      multiple: true,
      options: [
        { id: "thunderclap", label: "Uma dor súbita e muito forte, a pior da sua vida, que atinge o máximo em menos de um minuto" },
        { id: "fever", label: "Febre com rigidez na nuca" },
        { id: "neuro", label: "Fraqueza de um lado do corpo, dificuldade para falar ou confusão" },
        { id: "trauma", label: "Uma dor de cabeça que começou depois de uma pancada na cabeça" },
        { id: "new", label: "Uma dor de cabeça nova depois dos 50 anos, ou que muda de características de repente" },
        { id: "longAura", label: "Alterações visuais ou formigamentos que duram mais de uma hora" },
        { id: "none", label: "Nenhum destes sinais", exclusive: true },
      ],
    },
  ],
  results: {
    urgent: {
      title: "Procure um médico logo",
      text: "Você marcou pelo menos um sinal que pede uma avaliação médica sem demora. Na maioria das vezes a causa não é grave, mas esses sintomas precisam ser investigados. Se a dor for súbita e muito forte, ou se houver fraqueza de um lado do corpo ou dificuldade para falar, ligue para o SAMU (192).",
      links: [],
    },
    migraine: {
      title: "Suas dores de cabeça parecem enxaqueca",
      text: "Suas respostas correspondem aos critérios da enxaqueca sem aura: crises de várias horas, pelo menos duas características típicas da dor e sintomas associados, como náusea ou incômodo com a luz e o barulho. Só um médico pode confirmar o diagnóstico, mas é uma boa base para conversar com ele.",
      links: nextStep,
    },
    migraineAura: {
      title: "Suas dores de cabeça parecem enxaqueca com aura",
      text: "Suas crises têm as características de uma enxaqueca, e as alterações que você descreve antes da dor parecem uma aura. Se elas forem recentes, diferentes do normal ou durarem mais de uma hora, procure um médico para ter certeza.",
      links: nextStep,
    },
    auraPossible: {
      title: "Suas alterações parecem uma aura de enxaqueca",
      text: "Alterações visuais ou sensitivas que duram de 5 a 60 minutos e depois desaparecem são típicas de uma aura, mesmo quando a dor que vem depois é leve, ou nem aparece. Converse com o seu médico, principalmente se for algo recente.",
      links: nextStep,
    },
    migraineProbable: {
      title: "Suas dores de cabeça parecem, em parte, enxaqueca",
      text: "Suas respostas preenchem quase todos os critérios da enxaqueca, mas não todos. Os neurologistas chamam isso de enxaqueca provável. Anotar suas crises durante um mês vai ajudar o seu médico a enxergar com mais clareza.",
      links: ["Para começar: ", diaryLink, "."],
    },
    tension: {
      title: "Suas dores de cabeça parecem cefaleia tensional",
      text: "Uma dor que aperta dos dois lados, leve a moderada, sem náusea e sem piorar com esforço: esse é o perfil da cefaleia tensional, o tipo de dor de cabeça mais comum. Estresse, falta de sono e postura costumam estar na origem.",
      links: nextStep,
    },
    unclear: {
      title: "Suas respostas não se encaixam claramente em um perfil",
      text: "Suas dores de cabeça não se encaixam claramente nem na enxaqueca nem na cefaleia tensional. Isso não é preocupante em si, mas vale a pena conversar com o seu médico, levando um registro escrito das suas crises para ajudar.",
      links: ["Para ajudar: ", diaryLink, "."],
    },
  },
  chronicNote: [
    "Você tem dor de cabeça 15 dias ou mais por mês: nesse caso, fala-se em forma crônica. Existem tratamentos preventivos, converse com o seu médico.",
  ],
  overuseNote: [
    "Você toma remédio para dor 10 dias ou mais por mês. Acima desse limite, aumenta o risco de uso excessivo de medicamentos: os próprios remédios podem manter as dores de cabeça.",
  ],
};
