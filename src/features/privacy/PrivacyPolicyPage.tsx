import Link from 'next/link'
import CookiePreferencesButton from '@/components/ui/CookiePreferencesButton'
import './PrivacyPolicyPage.scss'

const UPDATED_AT = '21 de outubro de 2026'
const CONTACT_EMAIL = 'comercial@meganews.com.br'

export default function PrivacyPolicyPage() {
  return (
    <article className="privacy">
      <div className="privacy__container">
        <nav className="privacy__breadcrumb" aria-label="Você está em">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Política de privacidade</span>
        </nav>

        <header className="privacy__head">
          <p className="privacy__eyebrow">LGPD</p>
          <h1>Política de privacidade</h1>
          <p className="privacy__updated">Última atualização: {UPDATED_AT}</p>
          <p>
            Esta política explica como a Mega News trata os dados de quem visita o site
            meganews.com.br: o que coletamos, para quê, com quem compartilhamos e como você pode
            exercer seus direitos, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
          </p>
        </header>

        <section>
          <h2>1. Quem somos</h2>
          <p>
            Mega News Informática, inscrita no CNPJ 04.638.280/0001-19, com sede na R. Eliéser
            Dourado Moitinho, 499, Irecê-BA. Somos a controladora dos dados tratados neste site.
          </p>
        </section>

        <section>
          <h2>2. Quais dados coletamos</h2>
          <h3>Dados que você nos informa</h3>
          <p>
            Nos formulários de orçamento e de contato você pode informar nome, sobrenome, e-mail,
            telefone, cargo, empresa, porte da empresa, produto de interesse e uma descrição da sua
            necessidade. Esses dados <strong>não ficam armazenados no site</strong>: eles são usados
            apenas para montar uma mensagem no WhatsApp, que só é enviada à nossa equipe se você
            tocar em enviar.
          </p>
          <h3>Dados de navegação (somente com o seu consentimento)</h3>
          <p>
            Se você aceitar os cookies de análise, usamos o Microsoft Clarity para entender como o
            site é usado: páginas visitadas, cliques, rolagem, movimento do mouse, tipo de
            dispositivo e navegador e localização aproximada (país e cidade). Com essas informações
            geramos mapas de calor e gravações de navegação. O que é digitado nos formulários fica
            oculto nas gravações.
          </p>
        </section>

        <section>
          <h2>3. Para que usamos os dados</h2>
          <ul>
            <li>Responder pedidos de orçamento e contatos feitos pelo site.</li>
            <li>Entender o uso do site e melhorar conteúdo, navegação e desempenho.</li>
          </ul>
          <p>
            As bases legais são o seu <strong>consentimento</strong> (análise de navegação) e os{' '}
            <strong>procedimentos preliminares a um contrato</strong>, a seu pedido (orçamento),
            previstas no art. 7º, incisos I e V, da LGPD. Não vendemos dados pessoais.
          </p>
        </section>

        <section>
          <h2>4. Cookies</h2>
          <div className="privacy__table" role="region" aria-label="Cookies utilizados" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Para que serve</th>
                  <th>Quando é usado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Necessário</td>
                  <td>Guardar a sua escolha sobre cookies, no seu próprio navegador, por até 12 meses.</td>
                  <td>Sempre</td>
                </tr>
                <tr>
                  <td>Análise (Microsoft Clarity)</td>
                  <td>
                    Identificar visitas e sessões para gerar estatísticas, mapas de calor e
                    gravações (cookies como <code>_clck</code> e <code>_clsk</code>, definidos pela
                    Microsoft).
                  </td>
                  <td>Só se você aceitar</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Você pode aceitar, rejeitar ou mudar sua escolha a qualquer momento. Ao retirar o
            consentimento, os cookies do Clarity são apagados do seu navegador.
          </p>
          <CookiePreferencesButton className="privacy__button" />
        </section>

        <section>
          <h2>5. Com quem compartilhamos</h2>
          <ul>
            <li>
              <strong>Microsoft</strong>, que opera o Clarity, apenas se você aceitar os cookies de
              análise. Veja a{' '}
              <a
                href="https://privacy.microsoft.com/pt-br/privacystatement"
                target="_blank"
                rel="noopener noreferrer"
              >
                declaração de privacidade da Microsoft
              </a>{' '}
              e a{' '}
              <a
                href="https://learn.microsoft.com/clarity/setup-and-installation/clarity-cookies"
                target="_blank"
                rel="noopener noreferrer"
              >
                lista de cookies do Clarity
              </a>
              .
            </li>
            <li>
              <strong>WhatsApp (Meta)</strong>, quando você envia a mensagem de orçamento ou de
              contato. A conversa segue também a política de privacidade do WhatsApp.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Por quanto tempo guardamos</h2>
          <p>
            Os dados de navegação ficam no Clarity pelo prazo definido pela Microsoft para a
            ferramenta. As conversas de atendimento são mantidas pelo tempo necessário para
            responder ao seu pedido e cumprir obrigações legais.
          </p>
        </section>

        <section>
          <h2>7. Seus direitos</h2>
          <p>
            Pela LGPD (art. 18), você pode pedir a qualquer momento: confirmação de que tratamos
            seus dados, acesso, correção, anonimização, bloqueio ou eliminação, portabilidade,
            informação sobre compartilhamento e a revogação do consentimento.
          </p>
          <p>
            Para exercer seus direitos ou tirar dúvidas sobre esta política, fale com a gente pelo
            e-mail <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </section>

        <section>
          <h2>8. Aplicativo Mega Ágil</h2>
          <p>
            O aplicativo Mega Ágil tem termos e política próprios:{' '}
            <a href="https://meganews.com.br/politica-de-privacidade-megaagil/">
              Política de privacidade Mega Ágil
            </a>
            .
          </p>
        </section>

        <section>
          <h2>9. Alterações nesta política</h2>
          <p>
            Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A
            data da última atualização fica sempre no topo desta página.
          </p>
        </section>
      </div>
    </article>
  )
}
