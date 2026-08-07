'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ChevronDown, Lock, Sparkles } from 'lucide-react'
import Link from 'next/link'
import PlansResults from '@/components/pricing/PlansResults'
import './PlansPage.scss'

type Billing = 'anual' | 'mensal'

const TEAM_SIZES = [
  { id: '1-19', label: '1–19 pessoas' },
  { id: '20-49', label: '20–49 pessoas' },
  { id: '50-99', label: '50–99 pessoas' },
  { id: '100-250', label: '100–250 pessoas' },
  { id: '251+', label: '251+ pessoas' },
] as const

const PROMO_TEXT =
  'Descontos de até 50% em diversos produtos selecionados. Só por tempo limitado, aproveite antes que acabe.'

const PLANS = [
  {
    id: 'gratis',
    name: 'Grátis',
    hiddenPrice: false,
    desc: 'Ideal para conhecer a Mega News e avaliar se o sistema combina com o seu negócio.',
    cta: 'Começar grátis',
    to: '/teste-gratis',
    highlight: false,
    features: [
      'Apresentação dos sistemas Mega',
      'Diagnóstico inicial do seu segmento',
      'Orientação sobre o plano ideal',
      'Acesso a materiais de apresentação',
    ],
  },
  {
    id: 'basico',
    name: 'Básico',
    hiddenPrice: true,
    desc: 'Para empresas que precisam de gestão eficiente com o essencial no dia a dia.',
    cta: 'Quero meu preço',
    to: '/fale-com-vendas',
    highlight: true,
    badge: 'Mais popular',
    features: [
      'Sistema alinhado ao seu segmento',
      'Implantação acompanhada',
      'Treinamento da equipe',
      'Suporte técnico especializado',
      'Emissão fiscal conforme o plano',
      'Atualizações contínuas',
    ],
  },
  {
    id: 'profissional',
    name: 'Profissional',
    hiddenPrice: true,
    desc: 'Para operações que querem mais recursos, prioridade no suporte e escala.',
    cta: 'Quero meu preço',
    to: '/fale-com-vendas',
    highlight: false,
    features: [
      'Tudo do plano Básico',
      'Prioridade no atendimento',
      'Recursos avançados de gestão',
      'Acompanhamento consultivo',
      'Relatórios e indicadores',
      'Onboarding acelerado',
      'Suporte WhatsApp e telefone',
    ],
  },
]

export default function PlansPage() {
  const [teamSize, setTeamSize] = useState<string>(TEAM_SIZES[0].id)
  const [billing, setBilling] = useState<Billing>('anual')
  const teamLabel = TEAM_SIZES.find((s) => s.id === teamSize)?.label.toLowerCase()

  return (
    <div className="plans">
      <div className="plans__promo" aria-label="Promoção">
        <div className="plans__promo-track">
          <span>{PROMO_TEXT}</span>
          <span aria-hidden="true">{PROMO_TEXT}</span>
          <span aria-hidden="true">{PROMO_TEXT}</span>
        </div>
      </div>

      <section className="plans__hero">
        <div className="container">
          <motion.p
            className="plans__eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Planos Mega News
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            Escolha o plano certo para o seu negócio
          </motion.h1>
          <motion.p
            className="plans__lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Cada operação é única. Informe o porte da equipe e fale com a gente para receber um
            valor personalizado.
          </motion.p>

          <motion.div
            className="plans__controls"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <label className="plans__team">
              <span className="plans__team-label">Escolha o tamanho da equipe:</span>
              <span className="plans__team-select-wrap">
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  aria-label="Tamanho da equipe"
                >
                  {TEAM_SIZES.map((size) => (
                    <option key={size.id} value={size.id}>
                      {size.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} aria-hidden="true" />
              </span>
            </label>

            <div className="plans__billing" role="group" aria-label="Preferência de pagamento">
              <button
                type="button"
                className={billing === 'anual' ? 'is-active' : ''}
                aria-pressed={billing === 'anual'}
                onClick={() => setBilling('anual')}
              >
                <span className="plans__billing-main">
                  Anual
                  <span className="plans__billing-hint">(à vista)</span>
                </span>
                <span className="plans__save">ECONOMIZE 18%</span>
              </button>
              <button
                type="button"
                className={billing === 'mensal' ? 'is-active' : ''}
                aria-pressed={billing === 'mensal'}
                onClick={() => setBilling('mensal')}
              >
                Mensal
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="plans__grid-wrap">
        <div className="container plans__grid">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.id}
              className={`plans__card ${plan.highlight ? 'plans__card--highlight' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.45 }}
            >
              {plan.badge && <span className="plans__badge">{plan.badge}</span>}
              <h2>{plan.name}</h2>
              <p className="plans__desc">{plan.desc}</p>

              {plan.hiddenPrice ? (
                <div className="plans__mystery">
                  <div className="plans__mystery-price" aria-hidden="true">
                    <span className="plans__currency">R$</span>
                    <strong className="plans__amount plans__amount--hidden">•••</strong>
                    <span className="plans__unit">/mês</span>
                  </div>
                  <p className="plans__mystery-label">
                    <Lock size={14} aria-hidden="true" />
                    Valor sob medida para a sua operação
                  </p>
                  <p className="plans__price-note">
                    {billing === 'anual'
                      ? 'Preferência anual com economia de até 18%'
                      : 'Preferência de cobrança mensal'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="plans__price">
                    <strong className="plans__amount">Grátis</strong>
                  </div>
                  <p className="plans__price-note">para sempre · sem cartão</p>
                </>
              )}

              <Link
                href={plan.to}
                className={`btn ${plan.highlight ? 'btn-primary' : 'plans__cta-outline'}`}
              >
                {plan.hiddenPrice && <Sparkles size={16} aria-hidden="true" />}
                {plan.cta}
              </Link>

              <ul className="plans__features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="plans__disclaimer-wrap">
        <p className="plans__disclaimer container">
          Os valores são personalizados conforme o sistema, porte da operação ({teamLabel}) e escopo
          de implantação. Fale com a gente e receba uma proposta sob medida — sem compromisso.
        </p>
      </section>

      <PlansResults />
    </div>
  )
}
