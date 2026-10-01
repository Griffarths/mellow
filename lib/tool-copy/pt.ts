import type { Rich, TestCopy } from "../migraine-test";
import type { DiaryCopy, TestPageCopy } from "../tools";

// Portuguese for Portugal. No Portuguese articles yet: the texts carry no
// blog links, results point to the diary instead.
const DIARY_PATH = "/recursos/diario-de-enxaqueca";
const diaryLink = { text: "o diário de enxaqueca para imprimir", href: DIARY_PATH };
const nextStep: Rich = ["O passo seguinte: ", diaryLink, ", para registares as tuas crises até à consulta."];

export const diary: DiaryCopy = {
  path: DIARY_PATH,
  navLabel: "Diário de enxaqueca",
  menuDescription: "Calendário e registo de crises para imprimir",
  metaTitle: "Diário de enxaqueca para imprimir (PDF gratuito)",
  description:
    "Descarrega grátis um diário de enxaqueca para imprimir: calendário do mês, intensidade, medicação e um registo das crises para mostrares ao teu médico.",
  title: "Diário de enxaqueca para imprimir",
  lead: "Um calendário do mês e um registo das crises, em duas páginas, para imprimir e preencher ao longo dos dias. Grátis, sem criar conta.",
  downloads: [
    { label: "Descarregar o PDF (A4)", href: "/downloads/diario-de-enxaqueca-mellow-a4.pdf", primary: true },
  ],
  downloadNote: "PDF, 2 páginas, formato A4.",
  previewAlt: [
    "Página 1 do diário: calendário do mês com, para cada dia, a intensidade de 1 a 10, uma caixa para a medicação e espaço para uma nota",
    "Página 2 do diário: tabela das crises com data, horas, intensidade, sintomas, fatores desencadeantes, medicamento e alívio sem medicamentos, cada um com uma caixa «ajudou»",
  ],
  whyTitle: "Porquê manter um diário de enxaqueca?",
  why: [
    [
      "É muitas vezes o primeiro conselho dos neurologistas. Registar as tuas crises permite-te identificar os teus fatores desencadeantes, perceber se um tratamento funciona e ver se as tuas crises acompanham o teu ciclo menstrual.",
    ],
    [
      "Também te permite contar os dias em que tomas medicação. Acima de 10 dias por mês, aumenta o risco de uso excessivo de medicação: os próprios analgésicos podem então manter as dores de cabeça.",
    ],
  ],
  howTitle: "Como preencher",
  steps: [
    "Em cada dia de crise, anota a intensidade de 1 a 10 na parte de baixo da caixa do dia.",
    "Assinala «Med.» se tomaste um medicamento para a crise nesse dia. Também podes escrever uma palavra na caixa: dia de período, noite mal dormida, stress.",
    "Para cada crise, preenche uma linha da tabela: hora de início e de fim, sintomas, possíveis fatores desencadeantes, medicamento tomado e alívio sem medicamentos, assinalando em cada um se ajudou.",
    "No fim do mês, conta os teus dias de enxaqueca e os dias com medicação, e leva o diário à tua próxima consulta.",
  ],
  doctorTitle: "O que o teu médico vai observar",
  doctor: [
    "O número de dias de enxaqueca por mês, para saber se faz sentido um tratamento preventivo.",
    "A duração e a intensidade das crises, para escolher o tratamento de crise certo.",
    "O número de dias com medicação, para detetar um uso excessivo.",
    "Os fatores desencadeantes que se repetem, e uma eventual relação com o período.",
  ],
  appTitle: "A Mellow preenche-o contigo",
  appText:
    "Regista uma crise em dois toques no telemóvel. A Mellow calcula os teus dias de enxaqueca, conta a tua medicação, acompanha a meteorologia e prepara um relatório PDF para o teu médico.",
  faqTitle: "Perguntas frequentes",
  faq: [
    {
      q: "Durante quanto tempo se deve manter um diário de enxaqueca?",
      a: "Pelo menos um a três meses. É o tempo necessário para surgir um padrão, por exemplo à volta do período, e para o teu médico poder avaliar um tratamento preventivo.",
    },
    {
      q: "É preciso registar os dias sem crise?",
      a: "Deixa simplesmente a caixa em branco. Os dias sem crise contam tanto como os outros: mostram a tua frequência real e os períodos tranquilos.",
    },
    {
      q: "O diário substitui uma consulta?",
      a: "Não. É uma ferramenta para preparares a consulta e falares sobre isso com o teu médico, não para fazer um diagnóstico.",
    },
  ],
};

export const testPage: TestPageCopy = {
  path: "/recursos/teste-de-enxaqueca",
  navLabel: "Teste de enxaqueca",
  menuDescription: "Enxaqueca ou dor de cabeça? 11 perguntas",
  metaTitle: "Teste de enxaqueca: enxaqueca ou dor de cabeça? (grátis, 2 minutos)",
  description:
    "Responde a 11 perguntas baseadas nos critérios médicos da enxaqueca e descobre se as tuas dores de cabeça se parecem com enxaqueca, cefaleia de tensão ou outra coisa.",
  title: "Enxaqueca ou dor de cabeça? Faz o teste",
  lead: "11 perguntas, 2 minutos. O teste baseia-se nos critérios da Classificação Internacional das Cefaleias (ICHD-3), a que os neurologistas utilizam.",
  howTitle: "Como funciona este teste?",
  how: [
    [
      "Para falar de enxaqueca, os neurologistas procuram crises de 4 a 72 horas, com pelo menos duas destas características: dor de um só lado, pulsátil, moderada a intensa, agravada pelo esforço. É preciso também pelo menos um sintoma associado: náuseas, ou incómodo com a luz e com o ruído ao mesmo tempo.",
    ],
    [
      "A cefaleia de tensão, por sua vez, aperta dos dois lados, fica entre ligeira e moderada, não piora com o esforço e não provoca náuseas.",
    ],
    [
      "O teste tem também em conta a aura, o número de dias com dor de cabeça por mês e os dias com medicação, que podem indicar um uso excessivo de medicação.",
    ],
  ],
  faqTitle: "Perguntas frequentes",
  faq: [
    {
      q: "Este teste é fiável?",
      a: "Usa os critérios que os médicos utilizam, mas não substitui uma observação médica. Só um médico pode fazer um diagnóstico, tendo em conta a tua história e um exame clínico.",
    },
    {
      q: "É possível ter ao mesmo tempo enxaquecas e cefaleias de tensão?",
      a: "Sim, e é até frequente. Muitas pessoas com enxaqueca têm também dores de cabeça mais ligeiras do tipo tensão. Um diário das crises ajuda a distinguir as duas.",
    },
    {
      q: "Quando é preciso procurar ajuda urgente?",
      a: "Em caso de dor súbita e muito intensa, febre com rigidez da nuca, fraqueza de um lado do corpo, dificuldade em falar ou confusão, ou dor de cabeça depois de uma pancada na cabeça. Liga para o 112.",
    },
  ],
};

export const test: TestCopy = {
  progress: "Pergunta {n} de {total}",
  back: "Voltar",
  next: "Continuar",
  seeResult: "Ver o meu resultado",
  restart: "Refazer o teste",
  resultEyebrow: "O teu resultado",
  disclaimer:
    "Este teste não faz um diagnóstico. Ajuda-te a ver as coisas com mais clareza e a preparar uma consulta. Em caso de dúvida, fala com o teu médico.",
  appTitle: "Confirma o teu perfil registando as tuas crises",
  appText:
    "Regista cada crise em dois toques durante um mês. A Mellow calcula a tua frequência, a duração média e os dias com medicação, e prepara um relatório PDF para o teu médico.",
  questions: [
    {
      id: "duration",
      title: "Sem tratamento, quanto tempo dura normalmente uma crise?",
      options: [
        { id: "under30m", label: "Menos de 30 minutos" },
        { id: "30mto4h", label: "De 30 minutos a 4 horas" },
        { id: "4to72h", label: "De 4 horas a 3 dias" },
        { id: "over72h", label: "Mais de 3 dias" },
        { id: "unknown", label: "Não sei, tomo sempre alguma coisa" },
      ],
    },
    {
      id: "location",
      title: "Onde te dói, na maior parte das vezes?",
      options: [
        { id: "one", label: "De um só lado da cabeça (o lado pode mudar de uma crise para outra)" },
        { id: "both", label: "Dos dois lados, como uma fita ou um capacete" },
        { id: "varies", label: "Depende das crises" },
      ],
    },
    {
      id: "quality",
      title: "Como é a dor?",
      options: [
        { id: "pulsating", label: "Lateja, pulsa, como um coração dentro da cabeça" },
        { id: "pressing", label: "Aperta ou pressiona, como um torno" },
        { id: "other", label: "Outra, ou não sei" },
      ],
    },
    {
      id: "intensity",
      title: "Qual é a intensidade?",
      options: [
        { id: "mild", label: "Ligeira: consigo continuar as minhas atividades normalmente" },
        { id: "moderate", label: "Moderada: incomoda-me, abrando o ritmo" },
        { id: "severe", label: "Intensa: tenho de parar ou de me deitar" },
      ],
    },
    {
      id: "activity",
      title: "A atividade física piora a dor?",
      hint: "Subir escadas, andar depressa, inclinar-te para a frente.",
      options: [
        { id: "yes", label: "Sim" },
        { id: "no", label: "Não" },
        { id: "unsure", label: "Não sei" },
      ],
    },
    {
      id: "nausea",
      title: "Durante a crise, tens náuseas ou vómitos?",
      options: [
        { id: "yes", label: "Sim" },
        { id: "no", label: "Não" },
      ],
    },
    {
      id: "senses",
      title: "Durante a crise, a luz e o ruído incomodam-te?",
      options: [
        { id: "both", label: "Sim, os dois" },
        { id: "one", label: "Só um dos dois" },
        { id: "none", label: "Nenhum dos dois" },
      ],
    },
    {
      id: "aura",
      title: "Antes ou no início da dor, tens por vezes perturbações que duram de 5 a 60 minutos e depois desaparecem?",
      hint: "Ziguezagues luminosos, uma mancha cega, formigueiro que sobe pelo braço, dificuldade em encontrar as palavras.",
      options: [
        { id: "often", label: "Sim, muitas vezes" },
        { id: "sometimes", label: "Sim, já aconteceu" },
        { id: "never", label: "Não" },
      ],
    },
    {
      id: "frequency",
      title: "Quantos dias por mês tens dor de cabeça?",
      options: [
        { id: "under4", label: "Menos de 4 dias" },
        { id: "4to14", label: "De 4 a 14 dias" },
        { id: "15plus", label: "15 dias ou mais" },
      ],
    },
    {
      id: "medication",
      title: "Quantos dias por mês tomas um medicamento para a dor?",
      hint: "Paracetamol, ibuprofeno, aspirina, um triptano ou outro.",
      options: [
        { id: "under10", label: "Menos de 10 dias" },
        { id: "10to14", label: "De 10 a 14 dias" },
        { id: "15plus", label: "15 dias ou mais" },
      ],
    },
    {
      id: "redflags",
      title: "Última pergunta, e importante: a tua dor de cabeça já apresentou algum destes sinais?",
      hint: "Podes escolher várias respostas.",
      multiple: true,
      options: [
        { id: "thunderclap", label: "Uma dor súbita e muito intensa, a pior da tua vida, que atinge o máximo em menos de um minuto" },
        { id: "fever", label: "Febre com rigidez da nuca" },
        { id: "neuro", label: "Fraqueza de um lado do corpo, dificuldade em falar ou confusão" },
        { id: "trauma", label: "Uma dor de cabeça que surgiu depois de uma pancada na cabeça" },
        { id: "new", label: "Uma dor de cabeça nova depois dos 50 anos, ou que muda de repente de características" },
        { id: "longAura", label: "Perturbações visuais ou formigueiros que duram mais de uma hora" },
        { id: "none", label: "Nenhum destes sinais", exclusive: true },
      ],
    },
  ],
  results: {
    urgent: {
      title: "Fala rapidamente com um médico",
      text: "Assinalaste pelo menos um sinal que justifica um parecer médico sem esperar. Na maioria das vezes, a causa não é grave, mas estes sintomas têm de ser avaliados. Se a dor for súbita e muito intensa, ou se houver fraqueza de um lado do corpo ou dificuldade em falar, liga para o 112.",
      links: [],
    },
    migraine: {
      title: "As tuas dores de cabeça parecem enxaqueca",
      text: "As tuas respostas correspondem aos critérios da enxaqueca sem aura: crises de várias horas, pelo menos duas características típicas da dor e sintomas associados, como náuseas ou incómodo com a luz e o ruído. Só um médico pode confirmar o diagnóstico, mas é uma boa base para falares sobre isso.",
      links: nextStep,
    },
    migraineAura: {
      title: "As tuas dores de cabeça parecem enxaqueca com aura",
      text: "As tuas crises têm as características de uma enxaqueca, e as perturbações que descreves antes da dor parecem uma aura. Se forem recentes, invulgares ou durarem mais de uma hora, consulta um médico para teres a certeza.",
      links: nextStep,
    },
    auraPossible: {
      title: "As tuas perturbações parecem uma aura de enxaqueca",
      text: "Perturbações visuais ou sensitivas que duram de 5 a 60 minutos e depois desaparecem são típicas de uma aura, mesmo quando a dor que se segue é ligeira, ou não aparece. Fala sobre isso com o teu médico, sobretudo se for recente.",
      links: nextStep,
    },
    migraineProbable: {
      title: "As tuas dores de cabeça parecem, em parte, enxaqueca",
      text: "As tuas respostas cumprem quase todos os critérios da enxaqueca, mas não todos. Os neurologistas falam então de enxaqueca provável. Registar as tuas crises durante um mês vai ajudar o teu médico a ver com mais clareza.",
      links: ["Para começar: ", diaryLink, "."],
    },
    tension: {
      title: "As tuas dores de cabeça parecem cefaleia de tensão",
      text: "Uma dor que aperta dos dois lados, ligeira a moderada, sem náuseas nem agravamento com o esforço: é o perfil da cefaleia de tensão, a dor de cabeça mais frequente. O stress, a falta de sono e a postura estão muitas vezes na origem.",
      links: nextStep,
    },
    unclear: {
      title: "As tuas respostas não correspondem claramente a um perfil",
      text: "As tuas dores de cabeça não se encaixam claramente nem na enxaqueca nem na cefaleia de tensão. Isso não é preocupante em si, mas vale a pena falares com o teu médico, com um registo escrito das tuas crises para o ajudar.",
      links: ["Para te ajudar: ", diaryLink, "."],
    },
  },
  chronicNote: [
    "Tens dor de cabeça 15 dias ou mais por mês: fala-se então de uma forma crónica. Existem tratamentos preventivos, fala sobre isso com o teu médico.",
  ],
  overuseNote: [
    "Tomas um medicamento para a dor 10 dias ou mais por mês. Acima deste limiar, aumenta o risco de uso excessivo de medicação: os próprios medicamentos podem manter as dores de cabeça.",
  ],
};
