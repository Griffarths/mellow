import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://mellowmigraine.com";
const PAGE_LOCALE = "fr";
const PAGE_URL = `${SITE_URL}/${PAGE_LOCALE}/a-propos`;

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: PAGE_LOCALE }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== PAGE_LOCALE) return {};
  return {
    title: "À propos — Mellow",
    description:
      "L'histoire de Mellow, app de tracking de migraines créée par Arthur Griffiths, développeur solo basé à Bordeaux. Une app pensée par un migraineux, pas par un comité marketing.",
    alternates: { canonical: PAGE_URL },
    openGraph: {
      type: "website",
      title: "À propos — Mellow",
      description:
        "L'histoire de Mellow, app de tracking de migraines créée par Arthur Griffiths.",
      url: PAGE_URL,
      locale: "fr_FR",
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  if (locale !== PAGE_LOCALE) notFound();
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: PAGE_URL,
    inLanguage: "fr-FR",
    name: "À propos — Mellow",
    mainEntity: {
      "@type": "Person",
      name: "Arthur Griffiths",
      jobTitle: "Développeur indépendant",
      description:
        "Créateur de Mellow, application de tracking de migraines",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bordeaux",
        addressCountry: "FR",
      },
    },
  };

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <BackToHome />

        <article className="mx-auto mt-10 max-w-[65ch]">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            À propos
          </h1>

          <h2 className="mt-14 scroll-mt-24 text-3xl font-bold tracking-tight md:text-4xl">
            Salut, moi c&apos;est Arthur 👋
          </h2>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            Je suis <strong className="font-semibold text-ink">Arthur Griffiths</strong>,
            développeur indépendant basé à Bordeaux, et je suis migraineux.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            J&apos;ai créé Mellow parce que{" "}
            <strong className="font-semibold text-ink">
              j&apos;avais besoin de cette app pour moi-même
            </strong>
            .
          </p>

          <h2 className="mt-14 scroll-mt-24 text-3xl font-bold tracking-tight md:text-4xl">
            Mon histoire avec la migraine
          </h2>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            J&apos;ai eu mes premières migraines à{" "}
            <strong className="font-semibold text-ink">21 ans</strong>.
            Aujourd&apos;hui, j&apos;en ai en moyenne{" "}
            <strong className="font-semibold text-ink">
              une fois par semaine
            </strong>
            .
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            Je suis migraineux <strong className="font-semibold text-ink">sans aura</strong>.
            La douleur s&apos;installe progressivement, d&apos;un côté de la tête,
            jusqu&apos;à devenir pulsatile et invalidante. Avec elle viennent les{" "}
            <strong className="font-semibold text-ink">nausées</strong>, l&apos;
            <strong className="font-semibold text-ink">hypersensibilité à la lumière</strong>{" "}
            et au <strong className="font-semibold text-ink">bruit</strong>. Ça me coupe
            une journée. Parfois plusieurs.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            Si tu lis ces lignes, tu sais probablement déjà ce que ça fait. Cette
            sensation où{" "}
            <strong className="font-semibold text-ink">tu sais que ça vient</strong>,
            mais où tu ne peux pas vraiment l&apos;arrêter. Cette frustration de devoir
            annuler des trucs, de devoir t&apos;isoler dans le noir, de te sentir
            hors-jeu pendant des heures.
          </p>

          <h2 className="mt-14 scroll-mt-24 text-3xl font-bold tracking-tight md:text-4xl">
            Pourquoi cette app
          </h2>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            La migraine est, selon l&apos;OMS,{" "}
            <strong className="font-semibold text-ink">
              la 2ème maladie la plus invalidante au monde
            </strong>{" "}
            chez les moins de 50 ans.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            Et pourtant, on continue de la traiter comme un simple mal de tête.{" "}
            <em className="italic">
              &quot;Bois un verre d&apos;eau, prends un Doliprane, ça va passer.&quot;
            </em>{" "}
            Comme si c&apos;était dans la tête. Comme si on exagérait.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            J&apos;ai cherché des outils pour mieux comprendre mes propres crises.
            Identifier mes déclencheurs. Voir ce qui marche, ce qui ne marche pas.
            Avoir des données concrètes à montrer à mon médecin.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            Ce que j&apos;ai trouvé m&apos;a frustré. Des apps complexes qui demandent
            5 minutes pour logger une crise quand t&apos;as déjà mal au crâne. Des
            designs datés, sortis tout droit de 2010. Des prix élevés ou des paywalls
            agressifs sur des fonctionnalités basiques. Des apps qui ressemblent à des
            dossiers médicaux, pas à un compagnon du quotidien.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            Alors j&apos;ai décidé d&apos;en faire une moi-même. Une app{" "}
            <strong className="font-semibold text-ink">
              pensée par un migraineux, pas par un comité marketing.
            </strong>
          </p>

          <h2 className="mt-14 scroll-mt-24 text-3xl font-bold tracking-tight md:text-4xl">
            Ce qui me tient à cœur dans Mellow
          </h2>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            <strong className="font-semibold text-ink">Une UX simple.</strong>{" "}
            Logger une crise prend quelques secondes. Pas de formulaire interminable.
            Pas de friction. Quand tu as la tête qui explose, tu n&apos;as pas envie
            de te battre avec une interface.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            <strong className="font-semibold text-ink">Un design soigné.</strong>{" "}
            Je crois qu&apos;un outil qu&apos;on utilise pour gérer une maladie chronique
            doit être agréable à utiliser. Pas anxiogène. Pas hospitalier. Juste apaisant.
            D&apos;où le nom <em className="italic">Mellow</em>.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            <strong className="font-semibold text-ink">Un prix accessible.</strong>{" "}
            Mellow propose une formule gratuite généreuse, et un Premium à un prix
            volontairement bas pour celles et ceux qui veulent aller plus loin (analyses
            détaillées, statistiques personnalisées, données météo, etc.). Pas de tarifs
            gonflés.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            <strong className="font-semibold text-ink">Du contenu sourcé.</strong>{" "}
            Tous les articles du blog Mellow sont rédigés à partir de sources médicales
            reconnues. Inserm, OMS, HAS, Mayo Clinic, NHS, American Migraine Foundation,
            Migraine Trust. Pas de &quot;remèdes miracles&quot; non vérifiés. Pas de
            désinformation santé.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            <strong className="font-semibold text-ink">Aucune vente de données.</strong>{" "}
            Mellow ne vendra jamais tes données de santé. C&apos;est une ligne rouge.
          </p>

          <h2 className="mt-14 scroll-mt-24 text-3xl font-bold tracking-tight md:text-4xl">
            Ce que Mellow n&apos;est pas
          </h2>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            Mellow{" "}
            <strong className="font-semibold text-ink">
              n&apos;est pas un substitut à un avis médical
            </strong>
            . Si tu as des migraines fréquentes ou sévères, consulte un neurologue ou
            ton médecin traitant. Mellow est un compagnon qui t&apos;aide à mieux comprendre
            tes crises et à mieux dialoguer avec les professionnels qui te soignent.
          </p>

          <h2 className="mt-14 scroll-mt-24 text-3xl font-bold tracking-tight md:text-4xl">
            Et maintenant ?
          </h2>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            Mellow est encore jeune. Je le développe seul, à mon rythme, en écoutant les
            retours des migraineux qui l&apos;utilisent.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            Si tu utilises Mellow et que tu veux me partager une idée, un bug, ou juste
            me dire bonjour, tu peux me joindre à{" "}
            <strong className="font-semibold text-ink">
              <a
                href="mailto:contact.mellow@proton.me"
                className="text-mellow-rose underline-offset-2 hover:underline"
              >
                contact.mellow@proton.me
              </a>
            </strong>
            .
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            Merci d&apos;être là. Et prends soin de toi.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">Arthur</p>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

function BackToHome() {
  // Reuse the same back-link affordance as blog articles, but pointing home.
  // We render a simple Link so that we don't tie the About page to blog state.
  return (
    <a
      href="/fr"
      className="inline-flex items-center gap-1 text-sm text-black/55 transition hover:text-black"
    >
      ← Accueil
    </a>
  );
}
