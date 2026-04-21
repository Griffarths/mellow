import { Link } from "@/i18n/navigation";

export default function ContactContentPt() {
  return (
    <>
      <h1>Suporte da Mellow</h1>

      <h2>Contacto</h2>
      <p>
        Para qualquer questão, relato de bug ou comentário, contacta-nos em:
      </p>
      <p>
        <a href="mailto:contact.mellow@proton.me">
          <strong>contact.mellow@proton.me</strong>
        </a>
      </p>
      <p>
        Lemos todas as mensagens e normalmente respondemos em 48 horas.
      </p>

      <h2>Sobre a Mellow</h2>
      <p>
        A Mellow é um diário de enxaquecas e dores de cabeça para iOS, calmo e
        cuidado no design. Regista episódios em segundos, acompanha
        desencadeadores como stress, sono, hormonas e meteorologia, e começa a
        ver os padrões por trás da tua dor.
      </p>
      <p>
        A Mellow é uma ferramenta de acompanhamento pessoal. Não é um
        dispositivo médico, não fornece diagnóstico e não substitui um parecer
        médico profissional. Consulta sempre um profissional de saúde
        qualificado para qualquer preocupação médica.
      </p>

      <h2>Subscrições</h2>
      <p>
        A Mellow é gratuita. A Mellow Premium desbloqueia análises avançadas,
        histórico ilimitado, correlações meteorológicas e exportação.
      </p>

      <h3>Gerir ou cancelar a tua subscrição</h3>
      <p>As subscrições são geridas através do teu ID Apple:</p>
      <ol>
        <li>
          Abre <strong>Definições</strong> no teu iPhone
        </li>
        <li>Toca no teu nome no topo</li>
        <li>
          Toca em <strong>Subscrições</strong>
        </li>
        <li>
          Seleciona <strong>Mellow Premium</strong>
        </li>
        <li>
          Toca em <strong>Cancelar subscrição</strong>
        </li>
      </ol>
      <p>
        O teu acesso permanece ativo até ao final do período de faturação
        atual.
      </p>

      <h3>Reembolsos</h3>
      <p>
        Os reembolsos são tratados pela Apple. Visita{" "}
        <a
          href="https://reportaproblem.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          reportaproblem.apple.com
        </a>
        , inicia sessão com o teu ID Apple e seleciona a compra da Mellow.
      </p>

      <h3>Restaurar compras</h3>
      <p>
        Abre a Mellow, vai a Definições e toca em «Restaurar compras».
        Certifica-te de que estás com sessão iniciada com o mesmo ID Apple
        usado para subscrever.
      </p>

      <hr />

      <h2>Avisos legais</h2>
      <ul>
        <li>
          <Link href="/confidentialite">Política de privacidade</Link>
        </li>
        <li>
          <a
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Condições de utilização (Apple Standard EULA)
          </a>
        </li>
        <li>
          <Link href="/mentions-legales">Aviso legal</Link>
        </li>
      </ul>
    </>
  );
}
