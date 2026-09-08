import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import type { Locale } from "@/i18n/routing";

const STEP1_URL = "https://groups.google.com/g/testeurs-mellow/about";
const STEP2_URL =
  "https://play.google.com/apps/testing/com.arthurgriffiths.mellow";
const CONTACT_EMAIL = "contact.mellow@proton.me";

type T = {
  meta: { title: string; description: string };
  title: string;
  intro: string;
  step1: { num: string; heading: string; body: string[]; btn: string };
  step2: { num: string; heading: string; body: string; btn: string };
  important: { heading: string; body: string };
  contact: string;
};

const TRANSLATIONS: Record<Locale, T> = {
  fr: {
    meta: {
      title: "Teste Mellow sur Android, rejoins les testeurs",
      description:
        "Mellow arrive sur Android. Rejoins les 12 testeurs nécessaires avant la publication sur le Play Store.",
    },
    title: "Teste Mellow sur Android",
    intro:
      "Mellow arrive sur Android. Avant de pouvoir la publier sur le Play Store, Google demande que 12 personnes utilisent l'application pendant 14 jours.",
    step1: {
      num: "Étape 1",
      heading: "Rejoins le groupe de testeurs",
      body: [
        "C'est ce qui te donne accès à la version de test.",
        "Connecte-toi d'abord à ton compte Google, et utilise le même compte que celui du Play Store sur ton téléphone. Avec une autre adresse, l'étape 2 te dira que tu n'es pas testeur. Pour vérifier lequel : ouvre le Play Store, touche ta photo de profil en haut à droite, l'adresse s'affiche.",
        "Tu arrives ensuite sur une page Google Groupes. Clique sur « Rejoindre le groupe », c'est tout. Aucun e-mail ne te sera envoyé.",
      ],
      btn: "Rejoindre le groupe",
    },
    step2: {
      num: "Étape 2",
      heading: "Installe Mellow",
      body: "Une fois dans le groupe, ouvre ce lien et clique sur « Devenir testeur », puis télécharge l'application.",
      btn: "Installer Mellow",
    },
    important: {
      heading: "Important",
      body: "Garde l'application installée pendant 14 jours. Si le nombre de testeurs descend en dessous de 12, le compteur repart à zéro et la sortie est repoussée pour tout le monde.",
    },
    contact: "Un problème, une question, un bug ? Écris à",
  },
  en: {
    meta: {
      title: "Test Mellow on Android, join the testers",
      description:
        "Mellow is coming to Android. Join the 12 testers needed before the Play Store launch.",
    },
    title: "Test Mellow on Android",
    intro:
      "Mellow is coming to Android. Before we can publish it on the Play Store, Google requires that 12 people use the app for 14 days.",
    step1: {
      num: "Step 1",
      heading: "Join the tester group",
      body: [
        "This gives you access to the test version.",
        "First sign in to your Google account, and use the same account as the Play Store on your phone. With a different address, step 2 will tell you that you are not a tester. To check which one: open the Play Store, tap your profile photo in the top right corner, and your address will be shown.",
        'You will then land on a Google Groups page. Click "Join group" — that\'s it. No emails will be sent to you.',
      ],
      btn: "Join the group",
    },
    step2: {
      num: "Step 2",
      heading: "Install Mellow",
      body: 'Once in the group, open this link and tap "Become a tester", then download the app.',
      btn: "Install Mellow",
    },
    important: {
      heading: "Important",
      body: "Keep the app installed for 14 days. If the number of testers drops below 12, the counter resets and the launch is delayed for everyone.",
    },
    contact: "An issue, a question, a bug? Write to",
  },
  de: {
    meta: {
      title: "Teste Mellow auf Android, werde Tester",
      description:
        "Mellow kommt auf Android. Werde Teil der 12 Tester, die vor der Veröffentlichung im Play Store benötigt werden.",
    },
    title: "Teste Mellow auf Android",
    intro:
      "Mellow kommt auf Android. Bevor wir es im Play Store veröffentlichen können, verlangt Google, dass 12 Personen die App 14 Tage lang nutzen.",
    step1: {
      num: "Schritt 1",
      heading: "Tritt der Testergruppe bei",
      body: [
        "Das gibt dir Zugang zur Testversion.",
        "Melde dich zunächst bei deinem Google-Konto an und verwende dasselbe Konto wie der Play Store auf deinem Telefon. Mit einer anderen Adresse wird dir Schritt 2 mitteilen, dass du kein Tester bist. Um nachzuprüfen welches: Öffne den Play Store, tippe auf dein Profilbild oben rechts, und deine Adresse wird angezeigt.",
        `Du landest dann auf einer Google Groups-Seite. Klicke auf „Gruppe beitreten" — das war's. Du erhältst keine E-Mails.`,
      ],
      btn: "Gruppe beitreten",
    },
    step2: {
      num: "Schritt 2",
      heading: "Installiere Mellow",
      body: 'Sobald du in der Gruppe bist, öffne diesen Link, tippe auf „Tester werden" und lade die App herunter.',
      btn: "Mellow installieren",
    },
    important: {
      heading: "Wichtig",
      body: "Behalte die App 14 Tage lang installiert. Wenn die Anzahl der Tester unter 12 fällt, beginnt der Zähler von vorne und die Veröffentlichung verzögert sich für alle.",
    },
    contact: "Ein Problem, eine Frage, ein Fehler? Schreib an",
  },
  it: {
    meta: {
      title: "Testa Mellow su Android, unisciti ai tester",
      description:
        "Mellow arriva su Android. Unisciti ai 12 tester necessari prima della pubblicazione sul Play Store.",
    },
    title: "Testa Mellow su Android",
    intro:
      "Mellow arriva su Android. Prima di poterla pubblicare sul Play Store, Google richiede che 12 persone usino l'app per 14 giorni.",
    step1: {
      num: "Passo 1",
      heading: "Unisciti al gruppo tester",
      body: [
        "Questo ti dà accesso alla versione di test.",
        "Prima accedi al tuo account Google e usa lo stesso account del Play Store sul tuo telefono. Con un indirizzo diverso, il passo 2 ti dirà che non sei un tester. Per verificare quale: apri il Play Store, tocca la tua foto profilo in alto a destra e il tuo indirizzo verrà mostrato.",
        "Arriverai quindi su una pagina di Google Gruppi. Clicca su «Unisciti al gruppo» — è tutto. Non riceverai alcuna e-mail.",
      ],
      btn: "Unisciti al gruppo",
    },
    step2: {
      num: "Passo 2",
      heading: "Installa Mellow",
      body: 'Una volta nel gruppo, apri questo link e tocca "Diventa tester", poi scarica l\'app.',
      btn: "Installa Mellow",
    },
    important: {
      heading: "Importante",
      body: "Mantieni l'app installata per 14 giorni. Se il numero di tester scende sotto 12, il contatore riparte da zero e il lancio viene posticipato per tutti.",
    },
    contact: "Un problema, una domanda, un bug? Scrivi a",
  },
  es: {
    meta: {
      title: "Prueba Mellow en Android, únete a los testers",
      description:
        "Mellow llega a Android. Únete a los 12 testers necesarios antes del lanzamiento en el Play Store.",
    },
    title: "Prueba Mellow en Android",
    intro:
      "Mellow llega a Android. Antes de poder publicarla en el Play Store, Google exige que 12 personas usen la aplicación durante 14 días.",
    step1: {
      num: "Paso 1",
      heading: "Únete al grupo de testers",
      body: [
        "Esto te da acceso a la versión de prueba.",
        "Primero inicia sesión en tu cuenta de Google y usa la misma cuenta que el Play Store en tu teléfono. Con otra dirección, el paso 2 te dirá que no eres tester. Para comprobarlo: abre el Play Store, toca tu foto de perfil en la esquina superior derecha y se mostrará tu dirección.",
        "Llegarás entonces a una página de Google Grupos. Haz clic en «Unirte al grupo» — eso es todo. No recibirás ningún correo electrónico.",
      ],
      btn: "Unirse al grupo",
    },
    step2: {
      num: "Paso 2",
      heading: "Instala Mellow",
      body: "Una vez en el grupo, abre este enlace y pulsa «Convertirte en tester», luego descarga la aplicación.",
      btn: "Instalar Mellow",
    },
    important: {
      heading: "Importante",
      body: "Mantén la aplicación instalada durante 14 días. Si el número de testers cae por debajo de 12, el contador vuelve a cero y el lanzamiento se retrasa para todos.",
    },
    contact: "¿Un problema, una pregunta, un error? Escribe a",
  },
  "es-419": {
    meta: {
      title: "Prueba Mellow en Android, únete a los testers",
      description:
        "Mellow llega a Android. Únete a los 12 testers necesarios antes del lanzamiento en el Play Store.",
    },
    title: "Prueba Mellow en Android",
    intro:
      "Mellow llega a Android. Antes de poder publicarla en el Play Store, Google exige que 12 personas usen la aplicación durante 14 días.",
    step1: {
      num: "Paso 1",
      heading: "Únete al grupo de testers",
      body: [
        "Esto te da acceso a la versión de prueba.",
        "Primero inicia sesión en tu cuenta de Google y usa la misma cuenta que el Play Store en tu teléfono. Con otra dirección, el paso 2 te dirá que no eres tester. Para comprobarlo: abre el Play Store, toca tu foto de perfil en la esquina superior derecha y se mostrará tu dirección.",
        "Llegarás entonces a una página de Google Grupos. Toca «Unirte al grupo» — eso es todo. No recibirás ningún correo electrónico.",
      ],
      btn: "Unirse al grupo",
    },
    step2: {
      num: "Paso 2",
      heading: "Instala Mellow",
      body: "Una vez en el grupo, abre este enlace y toca «Convertirte en tester», luego descarga la aplicación.",
      btn: "Instalar Mellow",
    },
    important: {
      heading: "Importante",
      body: "Mantén la aplicación instalada durante 14 días. Si el número de testers cae por debajo de 12, el contador vuelve a cero y el lanzamiento se retrasa para todos.",
    },
    contact: "¿Un problema, una pregunta, un error? Escribe a",
  },
  pt: {
    meta: {
      title: "Testa o Mellow no Android, junta-te aos testers",
      description:
        "O Mellow chega ao Android. Junta-te aos 12 testers necessários antes do lançamento no Play Store.",
    },
    title: "Testa o Mellow no Android",
    intro:
      "O Mellow chega ao Android. Antes de podermos publicá-lo no Play Store, o Google exige que 12 pessoas utilizem a aplicação durante 14 dias.",
    step1: {
      num: "Passo 1",
      heading: "Junta-te ao grupo de testers",
      body: [
        "É o que te dá acesso à versão de teste.",
        "Inicia sessão primeiro na tua conta Google e utiliza a mesma conta do Play Store no teu telefone. Com outro endereço, o passo 2 dir-te-á que não és tester. Para verificar qual: abre o Play Store, toca na tua foto de perfil no canto superior direito e o teu endereço será apresentado.",
        "Chegarás depois a uma página do Google Grupos. Clica em «Juntar-me ao grupo» — é tudo. Não receberás nenhum e-mail.",
      ],
      btn: "Juntar ao grupo",
    },
    step2: {
      num: "Passo 2",
      heading: "Instala o Mellow",
      body: "Uma vez no grupo, abre este link e carrega em «Tornar-me tester», depois descarrega a aplicação.",
      btn: "Instalar o Mellow",
    },
    important: {
      heading: "Importante",
      body: "Mantém a aplicação instalada durante 14 dias. Se o número de testers descer abaixo de 12, o contador recomeça e o lançamento é adiado para todos.",
    },
    contact: "Um problema, uma pergunta, um bug? Escreve para",
  },
  "pt-BR": {
    meta: {
      title: "Teste o Mellow no Android, junte-se aos testadores",
      description:
        "O Mellow está chegando ao Android. Junte-se aos 12 testadores necessários antes do lançamento no Play Store.",
    },
    title: "Teste o Mellow no Android",
    intro:
      "O Mellow está chegando ao Android. Antes de publicá-lo no Play Store, o Google exige que 12 pessoas usem o aplicativo por 14 dias.",
    step1: {
      num: "Passo 1",
      heading: "Entre no grupo de testadores",
      body: [
        "É o que dá acesso à versão de teste.",
        "Primeiro faça login na sua conta Google e use a mesma conta do Play Store no seu telefone. Com outro endereço, o passo 2 dirá que você não é testador. Para verificar qual: abra o Play Store, toque na sua foto de perfil no canto superior direito e seu endereço será exibido.",
        "Você chegará então a uma página do Google Grupos. Clique em «Entrar no grupo» — é só isso. Nenhum e-mail será enviado para você.",
      ],
      btn: "Entrar no grupo",
    },
    step2: {
      num: "Passo 2",
      heading: "Instale o Mellow",
      body: "Após entrar no grupo, abra este link e clique em «Tornar-se testador», depois baixe o aplicativo.",
      btn: "Instalar o Mellow",
    },
    important: {
      heading: "Importante",
      body: "Mantenha o aplicativo instalado por 14 dias. Se o número de testadores cair abaixo de 12, o contador reinicia e o lançamento é adiado para todos.",
    },
    contact: "Um problema, uma pergunta, um bug? Escreva para",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = TRANSLATIONS[(locale as Locale)] ?? TRANSLATIONS.en;
  return { title: t.meta.title, description: t.meta.description };
}

export default async function AndroidPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = TRANSLATIONS[(locale as Locale)] ?? TRANSLATIONS.en;

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-black/70">{t.intro}</p>

        <div className="mt-12 flex flex-col gap-5">
          {/* Step 1 */}
          <div className="rounded-2xl border border-black/10 bg-white p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-mellow-rose">
              {t.step1.num}
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight">
              {t.step1.heading}
            </h2>
            {t.step1.body.map((paragraph, i) => (
              <p key={i} className="mt-2 text-black/70">
                {paragraph}
              </p>
            ))}
            <a
              href={STEP1_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-80"
            >
              {t.step1.btn}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl border border-black/10 bg-white p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-mellow-rose">
              {t.step2.num}
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight">
              {t.step2.heading}
            </h2>
            <p className="mt-2 text-black/70">{t.step2.body}</p>
            <a
              href={STEP2_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-80"
            >
              {t.step2.btn}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Important */}
        <div className="mt-8 rounded-2xl bg-mellow-pink/40 px-8 py-6">
          <p className="font-bold">{t.important.heading}</p>
          <p className="mt-1 text-black/70">{t.important.body}</p>
        </div>

        {/* Contact */}
        <p className="mt-8 text-sm text-black/50">
          {t.contact}{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-mellow-rose underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}
