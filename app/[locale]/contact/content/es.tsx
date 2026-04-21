import { Link } from "@/i18n/navigation";

export default function ContactContentEs() {
  return (
    <>
      <h1>Soporte de Mellow</h1>

      <h2>Contacto</h2>
      <p>
        Para cualquier pregunta, informe de error o comentario, escríbenos a:
      </p>
      <p>
        <a href="mailto:contact.mellow@proton.me">
          <strong>contact.mellow@proton.me</strong>
        </a>
      </p>
      <p>
        Leemos cada mensaje y solemos responder en un plazo de 48 horas.
      </p>

      <h2>Acerca de Mellow</h2>
      <p>
        Mellow es un diario de migrañas y dolores de cabeza para iOS, sereno y
        cuidado en su diseño. Registra tus episodios en segundos, sigue
        desencadenantes como el estrés, el sueño, las hormonas y el clima, y
        empieza a ver los patrones detrás de tu dolor.
      </p>
      <p>
        Mellow es una herramienta de seguimiento personal. No es un dispositivo
        médico, no proporciona diagnóstico y no sustituye el consejo médico
        profesional. Consulta siempre a un profesional sanitario cualificado
        ante cualquier inquietud médica.
      </p>

      <h2>Suscripciones</h2>
      <p>
        Mellow es gratis. Mellow Premium desbloquea análisis avanzados,
        historial ilimitado, correlaciones meteorológicas y exportación.
      </p>

      <h3>Gestionar o cancelar tu suscripción</h3>
      <p>Las suscripciones se gestionan a través de tu Apple ID:</p>
      <ol>
        <li>
          Abre <strong>Ajustes</strong> en tu iPhone
        </li>
        <li>Toca tu nombre en la parte superior</li>
        <li>
          Toca <strong>Suscripciones</strong>
        </li>
        <li>
          Selecciona <strong>Mellow Premium</strong>
        </li>
        <li>
          Toca <strong>Cancelar suscripción</strong>
        </li>
      </ol>
      <p>
        Tu acceso permanece activo hasta el final del período de facturación
        actual.
      </p>

      <h3>Reembolsos</h3>
      <p>
        Los reembolsos los gestiona Apple. Visita{" "}
        <a
          href="https://reportaproblem.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          reportaproblem.apple.com
        </a>
        , inicia sesión con tu Apple ID y selecciona la compra de Mellow.
      </p>

      <h3>Restaurar compras</h3>
      <p>
        Abre Mellow, ve a Ajustes y toca «Restaurar compras». Asegúrate de
        haber iniciado sesión con el mismo Apple ID que usaste para
        suscribirte.
      </p>

      <hr />

      <h2>Aviso legal</h2>
      <ul>
        <li>
          <Link href="/confidentialite">Política de privacidad</Link>
        </li>
        <li>
          <a
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Condiciones de uso (Apple Standard EULA)
          </a>
        </li>
        <li>
          <Link href="/mentions-legales">Aviso legal</Link>
        </li>
      </ul>
    </>
  );
}
