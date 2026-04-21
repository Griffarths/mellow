import { Link } from "@/i18n/navigation";

export default function ContactContentDe() {
  return (
    <>
      <h1>Mellow Support</h1>

      <h2>Kontakt</h2>
      <p>Bei Fragen, Fehlermeldungen oder Feedback erreichst du uns unter:</p>
      <p>
        <a href="mailto:contact.mellow@proton.me">
          <strong>contact.mellow@proton.me</strong>
        </a>
      </p>
      <p>
        Wir lesen jede Nachricht und antworten in der Regel innerhalb von 48
        Stunden.
      </p>

      <h2>Über Mellow</h2>
      <p>
        Mellow ist ein ruhiges, durchdacht gestaltetes Migräne- und
        Kopfschmerztagebuch für iOS. Erfasse Episoden in Sekunden, beobachte
        Auslöser wie Stress, Schlaf, Hormone und Wetter — und erkenne die
        Muster hinter deinen Schmerzen.
      </p>
      <p>
        Mellow ist ein persönliches Tracking-Tool. Es ist kein Medizinprodukt,
        liefert keine Diagnose und ersetzt keine professionelle medizinische
        Beratung. Wende dich bei medizinischen Anliegen immer an eine
        qualifizierte Fachperson.
      </p>

      <h2>Abonnements</h2>
      <p>
        Mellow ist kostenlos. Mellow Premium schaltet erweiterte Analysen,
        unbegrenzten Verlauf, Wetterkorrelationen und den Export frei.
      </p>

      <h3>Abonnement verwalten oder kündigen</h3>
      <p>Abonnements werden über deine Apple ID verwaltet:</p>
      <ol>
        <li>
          Öffne <strong>Einstellungen</strong> auf deinem iPhone
        </li>
        <li>Tippe oben auf deinen Namen</li>
        <li>
          Tippe auf <strong>Abonnements</strong>
        </li>
        <li>
          Wähle <strong>Mellow Premium</strong>
        </li>
        <li>
          Tippe auf <strong>Abonnement kündigen</strong>
        </li>
      </ol>
      <p>
        Dein Zugang bleibt bis zum Ende der laufenden Abrechnungsperiode
        aktiv.
      </p>

      <h3>Rückerstattungen</h3>
      <p>
        Rückerstattungen werden von Apple bearbeitet. Besuche{" "}
        <a
          href="https://reportaproblem.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          reportaproblem.apple.com
        </a>
        , melde dich mit deiner Apple ID an und wähle den Mellow-Kauf aus.
      </p>

      <h3>Käufe wiederherstellen</h3>
      <p>
        Öffne Mellow, gehe zu Einstellungen und tippe auf „Käufe
        wiederherstellen". Achte darauf, mit derselben Apple ID angemeldet zu
        sein, mit der du das Abonnement abgeschlossen hast.
      </p>

      <hr />

      <h2>Rechtliches</h2>
      <ul>
        <li>
          <Link href="/confidentialite">Datenschutzerklärung</Link>
        </li>
        <li>
          <a
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nutzungsbedingungen (Apple Standard EULA)
          </a>
        </li>
        <li>
          <Link href="/mentions-legales">Impressum</Link>
        </li>
      </ul>
    </>
  );
}
