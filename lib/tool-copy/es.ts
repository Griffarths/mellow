import type { Rich, TestCopy } from "../migraine-test";
import type { DiaryCopy, TestPageCopy } from "../tools";

// Spanish for Spain. No Spanish articles yet: the texts carry no blog links,
// results point to the diary instead. Add article links once the blog exists.
const DIARY_PATH = "/recursos/diario-de-migrana";
const diaryLink = { text: "el diario de migraña para imprimir", href: DIARY_PATH };
const nextStep: Rich = ["El siguiente paso: ", diaryLink, ", para anotar tus crisis de cara a tu consulta."];

export const diary: DiaryCopy = {
  path: DIARY_PATH,
  navLabel: "Diario de migraña",
  menuDescription: "Calendario y tabla de crisis para imprimir",
  metaTitle: "Diario de migraña para imprimir (PDF gratis)",
  description:
    "Descarga gratis un diario de migraña para imprimir: calendario del mes, intensidad, medicamentos y una tabla de crisis para enseñar a tu médico.",
  title: "Diario de migraña para imprimir",
  lead: "Un calendario del mes y una tabla de crisis, en dos páginas, para imprimir y rellenar día a día. Gratis y sin registro.",
  downloads: [
    { label: "Descargar el PDF (A4)", href: "/downloads/diario-de-migrana-mellow-a4.pdf", primary: true },
  ],
  downloadNote: "PDF, 2 páginas, formato A4.",
  previewAlt: [
    "Página 1 del diario: calendario del mes con, para cada día, la intensidad sobre 10, una casilla de medicamento y espacio para una nota",
    "Página 2 del diario: tabla de crisis con fecha, horas, intensidad, síntomas, desencadenantes, medicamento y alivio sin medicamentos, cada uno con una casilla «¿ha ayudado?»",
  ],
  whyTitle: "¿Por qué llevar un diario de migraña?",
  why: [
    [
      "Suele ser el primer consejo de los neurólogos. Anotar tus crisis te permite detectar tus desencadenantes, comprobar si un tratamiento funciona y ver si tus crisis siguen tu ciclo menstrual.",
    ],
    [
      "También te permite contar tus días con medicación. Por encima de 10 días al mes, aumenta el riesgo de abuso de medicación: los propios analgésicos pueden entonces mantener los dolores de cabeza.",
    ],
  ],
  howTitle: "Cómo rellenarlo",
  steps: [
    "Cada día de crisis, anota la intensidad del 1 al 10 en la parte de abajo de la casilla del día.",
    "Marca «Med.» si ese día has tomado un medicamento para la crisis. También puedes escribir una palabra en la casilla: día de regla, mala noche, estrés.",
    "Para cada crisis, rellena una fila de la tabla: hora de inicio y de fin, síntomas, posibles desencadenantes, medicamento tomado y alivio sin medicamentos, marcando en cada caso si ha ayudado.",
    "A final de mes, cuenta tus días de migraña y tus días con medicamento, y lleva el diario a tu próxima consulta.",
  ],
  doctorTitle: "Lo que va a mirar tu médico",
  doctor: [
    "El número de días de migraña al mes, para valorar si conviene un tratamiento preventivo.",
    "La duración y la intensidad de las crisis, para elegir el tratamiento de la crisis adecuado.",
    "El número de días con medicamento, para detectar un abuso de medicación.",
    "Los desencadenantes que se repiten, y una posible relación con la regla.",
  ],
  appTitle: "Mellow lo rellena contigo",
  appText:
    "Registra una crisis en dos toques desde tu móvil. Mellow calcula tus días de migraña, cuenta tus medicamentos, sigue la meteorología y prepara un informe PDF para tu médico.",
  faqTitle: "Preguntas frecuentes",
  faq: [
    {
      q: "¿Cuánto tiempo hay que llevar un diario de migraña?",
      a: "Al menos de uno a tres meses. Es el tiempo necesario para que aparezca un patrón, por ejemplo alrededor de la regla, y para que tu médico pueda valorar un tratamiento preventivo.",
    },
    {
      q: "¿Hay que anotar los días sin crisis?",
      a: "Deja simplemente la casilla vacía. Los días sin crisis cuentan tanto como los demás: dan tu frecuencia real y muestran los periodos tranquilos.",
    },
    {
      q: "¿El diario sustituye a una consulta médica?",
      a: "No. Es una herramienta para preparar tu consulta y hablarlo con tu médico, no para hacer un diagnóstico.",
    },
  ],
};

export const testPage: TestPageCopy = {
  path: "/recursos/test-de-migrana",
  navLabel: "Test de migraña",
  menuDescription: "¿Migraña o dolor de cabeza? 11 preguntas",
  metaTitle: "Test de migraña: ¿migraña o dolor de cabeza? (gratis, 2 minutos)",
  description:
    "Responde a 11 preguntas basadas en los criterios médicos de la migraña y descubre si tus dolores de cabeza se parecen a una migraña, a una cefalea tensional o a otra cosa.",
  title: "¿Migraña o dolor de cabeza? Haz el test",
  lead: "11 preguntas, 2 minutos. El test se basa en los criterios de la Clasificación Internacional de las Cefaleas (ICHD-3), la que utilizan los neurólogos.",
  howTitle: "¿Cómo funciona este test?",
  how: [
    [
      "Para hablar de migraña, los neurólogos buscan crisis de 4 a 72 horas, con al menos dos de estas características: dolor en un solo lado, pulsátil, de moderado a intenso, que empeora con el esfuerzo. También tiene que haber al menos un síntoma asociado: náuseas, o molestia a la vez con la luz y con el ruido.",
    ],
    [
      "La cefalea tensional, en cambio, aprieta por los dos lados, se queda en leve o moderada, no empeora con el esfuerzo y no provoca náuseas.",
    ],
    [
      "El test también tiene en cuenta el aura, el número de días con dolor de cabeza al mes y los días con medicamento, que pueden indicar un abuso de medicación.",
    ],
  ],
  faqTitle: "Preguntas frecuentes",
  faq: [
    {
      q: "¿Es fiable este test?",
      a: "Recoge los criterios que utilizan los médicos, pero no sustituye a una exploración. Solo un médico puede hacer un diagnóstico, teniendo en cuenta tu historia y una exploración clínica.",
    },
    {
      q: "¿Se pueden tener a la vez migrañas y cefaleas tensionales?",
      a: "Sí, e incluso es frecuente. Muchas personas con migraña también tienen dolores de cabeza más leves de tipo tensional. Un diario de crisis ayuda a distinguirlos.",
    },
    {
      q: "¿Cuándo hay que ir a urgencias?",
      a: "Ante un dolor repentino y muy intenso, fiebre con rigidez de nuca, debilidad en un lado del cuerpo, dificultad para hablar o confusión, o un dolor de cabeza después de un golpe en la cabeza. Llama al 112.",
    },
  ],
};

export const test: TestCopy = {
  progress: "Pregunta {n} de {total}",
  back: "Atrás",
  next: "Continuar",
  seeResult: "Ver mi resultado",
  restart: "Repetir el test",
  resultEyebrow: "Tu resultado",
  disclaimer:
    "Este test no hace un diagnóstico. Te ayuda a verlo más claro y a preparar una consulta. Si tienes dudas, habla con tu médico.",
  appTitle: "Confirma tu perfil registrando tus crisis",
  appText:
    "Registra cada crisis en dos toques durante un mes. Mellow calcula tu frecuencia, tu duración media y tus días con medicamento, y prepara un informe PDF para tu médico.",
  questions: [
    {
      id: "duration",
      title: "Sin tratamiento, ¿cuánto suele durar una crisis?",
      options: [
        { id: "under30m", label: "Menos de 30 minutos" },
        { id: "30mto4h", label: "De 30 minutos a 4 horas" },
        { id: "4to72h", label: "De 4 horas a 3 días" },
        { id: "over72h", label: "Más de 3 días" },
        { id: "unknown", label: "No lo sé, siempre tomo algo" },
      ],
    },
    {
      id: "location",
      title: "¿Dónde te duele, la mayoría de las veces?",
      options: [
        { id: "one", label: "En un solo lado de la cabeza (el lado puede cambiar de una crisis a otra)" },
        { id: "both", label: "En los dos lados, como una cinta o un casco" },
        { id: "varies", label: "Depende de la crisis" },
      ],
    },
    {
      id: "quality",
      title: "¿Cómo es el dolor?",
      options: [
        { id: "pulsating", label: "Late, palpita, como un corazón dentro de la cabeza" },
        { id: "pressing", label: "Aprieta o presiona, como una tenaza" },
        { id: "other", label: "Otro, o no lo sé" },
      ],
    },
    {
      id: "intensity",
      title: "¿Qué intensidad tiene?",
      options: [
        { id: "mild", label: "Leve: puedo seguir con mis actividades con normalidad" },
        { id: "moderate", label: "Moderada: me molesta, voy más despacio" },
        { id: "severe", label: "Intensa: tengo que parar o tumbarme" },
      ],
    },
    {
      id: "activity",
      title: "¿La actividad física empeora el dolor?",
      hint: "Subir escaleras, caminar deprisa, inclinarte hacia delante.",
      options: [
        { id: "yes", label: "Sí" },
        { id: "no", label: "No" },
        { id: "unsure", label: "No lo sé" },
      ],
    },
    {
      id: "nausea",
      title: "Durante la crisis, ¿tienes náuseas o vómitos?",
      options: [
        { id: "yes", label: "Sí" },
        { id: "no", label: "No" },
      ],
    },
    {
      id: "senses",
      title: "Durante la crisis, ¿te molestan la luz y el ruido?",
      options: [
        { id: "both", label: "Sí, los dos" },
        { id: "one", label: "Solo uno de los dos" },
        { id: "none", label: "Ninguno de los dos" },
      ],
    },
    {
      id: "aura",
      title: "Antes o al principio del dolor, ¿tienes a veces alteraciones que duran de 5 a 60 minutos y luego desaparecen?",
      hint: "Zigzags luminosos, una mancha ciega, un hormigueo que sube por el brazo, dificultad para encontrar las palabras.",
      options: [
        { id: "often", label: "Sí, a menudo" },
        { id: "sometimes", label: "Sí, me ha pasado alguna vez" },
        { id: "never", label: "No" },
      ],
    },
    {
      id: "frequency",
      title: "¿Cuántos días al mes te duele la cabeza?",
      options: [
        { id: "under4", label: "Menos de 4 días" },
        { id: "4to14", label: "De 4 a 14 días" },
        { id: "15plus", label: "15 días o más" },
      ],
    },
    {
      id: "medication",
      title: "¿Cuántos días al mes tomas un medicamento para el dolor?",
      hint: "Paracetamol, ibuprofeno, aspirina, un triptán u otro.",
      options: [
        { id: "under10", label: "Menos de 10 días" },
        { id: "10to14", label: "De 10 a 14 días" },
        { id: "15plus", label: "15 días o más" },
      ],
    },
    {
      id: "redflags",
      title: "Última pregunta, y es importante: ¿tu dolor de cabeza ha tenido alguna vez alguna de estas señales?",
      hint: "Puedes marcar varias respuestas.",
      multiple: true,
      options: [
        { id: "thunderclap", label: "Un dolor repentino y muy intenso, el peor de tu vida, que llega a su máximo en menos de un minuto" },
        { id: "fever", label: "Fiebre con rigidez de nuca" },
        { id: "neuro", label: "Debilidad en un lado del cuerpo, dificultad para hablar o confusión" },
        { id: "trauma", label: "Un dolor de cabeza que apareció después de un golpe en la cabeza" },
        { id: "new", label: "Un dolor de cabeza nuevo después de los 50 años, o que cambia de forma brusca" },
        { id: "longAura", label: "Alteraciones visuales u hormigueos que duran más de una hora" },
        { id: "none", label: "Ninguna de estas señales", exclusive: true },
      ],
    },
  ],
  results: {
    urgent: {
      title: "Consulta pronto con un médico",
      text: "Has marcado al menos una señal que requiere una valoración médica sin esperar. La mayoría de las veces la causa no es grave, pero estos síntomas hay que comprobarlos. Si el dolor es repentino y muy intenso, o si hay debilidad en un lado del cuerpo o dificultad para hablar, llama al 112.",
      links: [],
    },
    migraine: {
      title: "Tus dolores de cabeza se parecen a una migraña",
      text: "Tus respuestas cumplen los criterios de la migraña sin aura: crisis de varias horas, al menos dos características típicas del dolor y síntomas asociados como las náuseas o la molestia con la luz y el ruido. Solo un médico puede confirmar el diagnóstico, pero es una buena base para hablarlo.",
      links: nextStep,
    },
    migraineAura: {
      title: "Tus dolores de cabeza se parecen a una migraña con aura",
      text: "Tus crisis tienen las características de una migraña, y las alteraciones que describes antes del dolor se parecen a un aura. Si son recientes, poco habituales o duran más de una hora, consulta para salir de dudas.",
      links: nextStep,
    },
    auraPossible: {
      title: "Tus alteraciones se parecen a un aura migrañosa",
      text: "Las alteraciones visuales o sensitivas que duran de 5 a 60 minutos y luego desaparecen son típicas de un aura, incluso cuando el dolor que viene después es leve, o no aparece. Coméntalo con tu médico, sobre todo si es reciente.",
      links: nextStep,
    },
    migraineProbable: {
      title: "Tus dolores de cabeza se parecen en parte a una migraña",
      text: "Tus respuestas cumplen casi todos los criterios de la migraña, pero no todos. Los neurólogos hablan entonces de migraña probable. Anotar tus crisis durante un mes ayudará a tu médico a verlo más claro.",
      links: ["Para empezar: ", diaryLink, "."],
    },
    tension: {
      title: "Tus dolores de cabeza se parecen a una cefalea tensional",
      text: "Un dolor que aprieta por los dos lados, de leve a moderado, sin náuseas y sin empeorar con el esfuerzo: es el perfil de la cefalea tensional, el dolor de cabeza más frecuente. El estrés, la falta de sueño y la postura suelen estar detrás.",
      links: nextStep,
    },
    unclear: {
      title: "Tus respuestas no encajan claramente en un perfil",
      text: "Tus dolores de cabeza no encajan claramente ni en la migraña ni en la cefalea tensional. No es preocupante en sí, pero merece la pena hablarlo con tu médico, con un registro escrito de tus crisis para ayudarle.",
      links: ["Para ayudarte: ", diaryLink, "."],
    },
  },
  chronicNote: [
    "Te duele la cabeza 15 días o más al mes: en ese caso se habla de una forma crónica. Existen tratamientos preventivos, coméntalo con tu médico.",
  ],
  overuseNote: [
    "Tomas un medicamento para el dolor 10 días o más al mes. Por encima de ese umbral, aumenta el riesgo de abuso de medicación: los propios medicamentos pueden mantener los dolores de cabeza.",
  ],
};
