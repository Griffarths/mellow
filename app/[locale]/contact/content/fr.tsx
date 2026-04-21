import { Link } from "@/i18n/navigation";

export default function ContactContentFr() {
  return (
    <>
      <h1>Support Mellow</h1>

      <h2>Contact</h2>
      <p>Pour toute question, signalement de bug ou retour, contacte-nous à :</p>
      <p>
        <a href="mailto:contact.mellow@proton.me">
          <strong>contact.mellow@proton.me</strong>
        </a>
      </p>
      <p>
        Nous lisons chaque message et répondons généralement dans les 48
        heures.
      </p>

      <h2>À propos de Mellow</h2>
      <p>
        Mellow est un journal de migraines et maux de tête pour iOS, calme et
        soigné. Enregistre tes épisodes en quelques secondes, suis des
        déclencheurs comme le stress, le sommeil, les hormones et la météo, et
        commence à voir les schémas derrière ta douleur.
      </p>
      <p>
        Mellow est un outil de suivi personnel. Ce n&apos;est pas un dispositif
        médical, il ne fournit pas de diagnostic et ne remplace pas l&apos;avis
        d&apos;un professionnel de santé. Consulte toujours un professionnel
        qualifié pour toute préoccupation médicale.
      </p>

      <h2>Abonnements</h2>
      <p>
        Mellow est gratuit à télécharger. Mellow Premium débloque les analyses
        avancées, l&apos;historique illimité, les corrélations météo et
        l&apos;export.
      </p>

      <h3>Gérer ou annuler ton abonnement</h3>
      <p>Les abonnements sont gérés via ton identifiant Apple :</p>
      <ol>
        <li>
          Ouvre <strong>Réglages</strong> sur ton iPhone
        </li>
        <li>Touche ton nom en haut</li>
        <li>
          Touche <strong>Abonnements</strong>
        </li>
        <li>
          Sélectionne <strong>Mellow Premium</strong>
        </li>
        <li>
          Touche <strong>Annuler l&apos;abonnement</strong>
        </li>
      </ol>
      <p>
        Ton accès reste actif jusqu&apos;à la fin de la période de facturation
        en cours.
      </p>

      <h3>Remboursements</h3>
      <p>
        Les remboursements sont gérés par Apple. Va sur{" "}
        <a
          href="https://reportaproblem.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          reportaproblem.apple.com
        </a>
        , connecte-toi avec ton identifiant Apple et sélectionne l&apos;achat
        Mellow.
      </p>

      <h3>Restaurer les achats</h3>
      <p>
        Ouvre Mellow, va dans Réglages et touche «&nbsp;Restaurer les
        achats&nbsp;». Assure-toi d&apos;être connecté avec le même identifiant
        Apple que celui utilisé pour t&apos;abonner.
      </p>

      <hr />

      <h2>Mentions légales</h2>
      <ul>
        <li>
          <Link href="/confidentialite">Politique de confidentialité</Link>
        </li>
        <li>
          <a
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Conditions d&apos;utilisation (Apple Standard EULA)
          </a>
        </li>
        <li>
          <Link href="/mentions-legales">Mentions légales</Link>
        </li>
      </ul>
    </>
  );
}
