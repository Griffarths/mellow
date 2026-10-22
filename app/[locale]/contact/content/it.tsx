import { Link } from "@/i18n/navigation";

export default function ContactContentIt() {
  return (
    <>
      <h1>Supporto Mellow</h1>

      <h2>Contatti</h2>
      <p>Per qualsiasi domanda, segnalazione di bug o feedback, scrivici a:</p>
      <p>
        <a href="mailto:contact.mellow@proton.me">
          <strong>contact.mellow@proton.me</strong>
        </a>
      </p>
      <p>
        Leggiamo ogni messaggio e di solito rispondiamo entro 48 ore.
      </p>

      <h2>Informazioni su Mellow</h2>
      <p>
        Mellow è un diario delle emicranie e dei mal di testa per iPhone e Android, calmo e
        curato nel design. Registra gli episodi in pochi secondi, monitora
        trigger come stress, sonno, ormoni e meteo, e inizia a vedere gli
        schemi dietro al tuo dolore.
      </p>
      <p>
        Mellow è uno strumento di tracciamento personale. Non è un dispositivo
        medico, non fornisce diagnosi e non sostituisce un parere medico
        professionale. Consulta sempre un professionista qualificato per
        qualsiasi questione di salute.
      </p>

      <h2>Abbonamenti</h2>
      <p>
        Mellow si scarica gratuitamente. Mellow Premium sblocca analisi
        avanzate, storico illimitato, correlazioni meteo ed esportazione.
      </p>

      <h3>Gestire o annullare l&apos;abbonamento</h3>
      <p>Su iPhone, gli abbonamenti sono gestiti tramite il tuo ID Apple:</p>
      <ol>
        <li>
          Apri <strong>Impostazioni</strong> sul tuo iPhone
        </li>
        <li>Tocca il tuo nome in alto</li>
        <li>
          Tocca <strong>Abbonamenti</strong>
        </li>
        <li>
          Seleziona <strong>Mellow Premium</strong>
        </li>
        <li>
          Tocca <strong>Annulla abbonamento</strong>
        </li>
      </ol>
      <p>Su Android, sono gestiti tramite Google Play:</p>
      <ol>
        <li>
          Apri l&apos;app <strong>Google Play Store</strong>
        </li>
        <li>
          Tocca la tua immagine del profilo in alto a destra
        </li>
        <li>
          Tocca <strong>Pagamenti e abbonamenti</strong>, poi{" "}
          <strong>Abbonamenti</strong>
        </li>
        <li>
          Seleziona <strong>Mellow Premium</strong>
        </li>
        <li>
          Tocca <strong>Annulla abbonamento</strong>
        </li>
      </ol>
      <p>
        Il tuo accesso resta attivo fino alla fine del periodo di fatturazione
        in corso.
      </p>

      <h3>Rimborsi</h3>
      <p>
        Su iPhone, i rimborsi sono gestiti da Apple. Vai su{" "}
        <a
          href="https://reportaproblem.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          reportaproblem.apple.com
        </a>
        , accedi con il tuo ID Apple e seleziona l&apos;acquisto Mellow.
      </p>
      <p>
        Su Android, i rimborsi sono gestiti da Google Play. Vai sulla{" "}
        <a
          href="https://support.google.com/googleplay/workflow/9813244"
          target="_blank"
          rel="noopener noreferrer"
        >
          pagina dei rimborsi di Google Play
        </a>
        , accedi con l&apos;account Google che hai usato per abbonarti e
        seleziona l&apos;acquisto Mellow.
      </p>

      <h3>Ripristinare gli acquisti</h3>
      <p>
        Apri Mellow, vai in Impostazioni e tocca «Ripristina acquisti».
        Assicurati di aver effettuato l&apos;accesso con l&apos;account usato per
        abbonarti: il tuo ID Apple su iPhone o il tuo account Google su Android.
      </p>

      <hr />

      <h2>Note legali</h2>
      <ul>
        <li>
          <Link href="/confidentialite">Informativa sulla privacy</Link>
        </li>
        <li>
          <a
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Termini di utilizzo (Apple Standard EULA)
          </a>
        </li>
        <li>
          <Link href="/mentions-legales">Note legali</Link>
        </li>
      </ul>
    </>
  );
}
