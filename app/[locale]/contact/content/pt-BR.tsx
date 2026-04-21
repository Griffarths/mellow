import { Link } from "@/i18n/navigation";

export default function ContactContentPtBr() {
  return (
    <>
      <h1>Suporte do Mellow</h1>

      <h2>Contato</h2>
      <p>
        Para qualquer pergunta, relato de bug ou comentário, entre em contato:
      </p>
      <p>
        <a href="mailto:contact.mellow@proton.me">
          <strong>contact.mellow@proton.me</strong>
        </a>
      </p>
      <p>
        Lemos cada mensagem e geralmente respondemos em até 48 horas.
      </p>

      <h2>Sobre o Mellow</h2>
      <p>
        O Mellow é um diário de enxaquecas e dores de cabeça para iOS, calmo e
        com design caprichado. Registre episódios em segundos, acompanhe
        gatilhos como estresse, sono, hormônios e clima, e comece a enxergar os
        padrões por trás da sua dor.
      </p>
      <p>
        O Mellow é uma ferramenta de acompanhamento pessoal. Não é um
        dispositivo médico, não fornece diagnóstico e não substitui orientação
        médica profissional. Consulte sempre um profissional de saúde
        qualificado para qualquer preocupação médica.
      </p>

      <h2>Assinaturas</h2>
      <p>
        O Mellow é grátis. O Mellow Premium libera análises avançadas,
        histórico ilimitado, correlações com o clima e exportação.
      </p>

      <h3>Gerenciar ou cancelar sua assinatura</h3>
      <p>As assinaturas são gerenciadas pelo seu Apple ID:</p>
      <ol>
        <li>
          Abra <strong>Ajustes</strong> no seu iPhone
        </li>
        <li>Toque no seu nome no topo</li>
        <li>
          Toque em <strong>Assinaturas</strong>
        </li>
        <li>
          Selecione <strong>Mellow Premium</strong>
        </li>
        <li>
          Toque em <strong>Cancelar assinatura</strong>
        </li>
      </ol>
      <p>
        Seu acesso continua ativo até o fim do período de cobrança atual.
      </p>

      <h3>Reembolsos</h3>
      <p>
        Os reembolsos são tratados pela Apple. Acesse{" "}
        <a
          href="https://reportaproblem.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          reportaproblem.apple.com
        </a>
        , entre com seu Apple ID e selecione a compra do Mellow.
      </p>

      <h3>Restaurar compras</h3>
      <p>
        Abra o Mellow, vá em Ajustes e toque em «Restaurar compras».
        Certifique-se de estar conectado com o mesmo Apple ID usado para
        assinar.
      </p>

      <hr />

      <h2>Aviso legal</h2>
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
            Termos de uso (Apple Standard EULA)
          </a>
        </li>
        <li>
          <Link href="/mentions-legales">Aviso legal</Link>
        </li>
      </ul>
    </>
  );
}
