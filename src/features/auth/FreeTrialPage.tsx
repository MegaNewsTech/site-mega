'use client'

import { useState, useEffect, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Lock } from 'lucide-react'
import DashedCircles from '@/components/ui/DashedCircles'
import { saveTrialState } from '@/lib/trial'
import { assetSrc } from '@/lib/asset'
import partner1 from '@/assets/clients/partner-2-150x150.jpg'
import partner2 from '@/assets/clients/partner-3-150x150.jpg'
import partner3 from '@/assets/clients/partner-4-1-150x150.jpg'
import partner4 from '@/assets/clients/partner-5-1-150x150.jpg'
import partner5 from '@/assets/clients/partner-6-150x150.jpg'
import partner6 from '@/assets/clients/partner-8-1-150x150.jpg'
import partner7 from '@/assets/clients/1-1-150x150.jpg'
import partner8 from '@/assets/clients/partner-7-150x150.jpg'
import './FreeTrialPage.scss'

const FEATURES = [
  {
    title: '7 dias sem compromisso',
    desc: 'Teste de verdade, no seu ritmo. Cancele quando quiser.',
  },
  {
    title: 'Sem cartão de crédito',
    desc: 'Zero risco para começar. Só pedimos dados básicos.',
  },
  {
    title: 'Setup para o seu segmento',
    desc: 'Posto, varejo ou vendas externas com orientação Mega.',
  },
  {
    title: 'Suporte humano',
    desc: 'Atendimento próximo, feito por quem entende o dia a dia.',
  },
]

const CLIENT_LOGOS = [
  { src: assetSrc(partner1), zoom: false },
  { src: assetSrc(partner2), zoom: false },
  { src: assetSrc(partner3), zoom: false },
  { src: assetSrc(partner4), zoom: false },
  { src: assetSrc(partner5), zoom: false },
  { src: assetSrc(partner6), zoom: false },
  { src: assetSrc(partner7), zoom: false },
  { src: assetSrc(partner8), zoom: true },
]

function onlyDigits(value: string) {
  return value.replace(/\D/g, '')
}

function maskCpf(value: string) {
  const digits = onlyDigits(value).slice(0, 11)

  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

function maskCnpj(value: string) {
  const digits = onlyDigits(value).slice(0, 14)

  return digits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
}

function maskDocument(value: string) {
  const digits = onlyDigits(value)
  return digits.length > 11 ? maskCnpj(value) : maskCpf(value)
}

export default function FreeTrialPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [company, setCompany] = useState('')
  const [taxId, setTaxId] = useState('')
  const [taxIdError, setTaxIdError] = useState('')

  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow
    const prevBody = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prevHtml
      document.body.style.overflow = prevBody
    }
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const digits = onlyDigits(taxId)

    if (digits.length !== 11 && digits.length !== 14) {
      setTaxIdError('Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.')
      return
    }

    setTaxIdError('')
    saveTrialState({
      name,
      email,
      whatsapp,
      company,
      cpf: digits.length === 11 ? taxId : undefined,
      cnpj: digits.length === 14 ? taxId : undefined,
    })
    router.push('/ativacao')
  }

  return (
    <div className="trial">
      <aside className="trial__left">
        <div className="trial__left-inner">
          <Link href="/" className="trial__brand">
            Mega News
            <span aria-hidden="true" />
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1>Comece o teste grátis de 7 dias!</h1>
            <p className="trial__lead">
              Zero risco, sem cartão e sem compromisso. Veja na prática como a Mega News impulsiona
              a gestão do seu negócio.
            </p>

            <ul className="trial__features">
              {FEATURES.map((item) => (
                <li key={item.title}>
                  <span className="trial__check" aria-hidden="true">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="trial__social-proof">
              <p className="trial__trusted">
                <span>confiável para empresas da região</span>
              </p>

              <div className="trial__avatar-stack" aria-label="Clientes Mega News">
                {CLIENT_LOGOS.map((logo, i) => (
                  <div
                    key={logo.src}
                    className="trial__avatar"
                    style={{ zIndex: CLIENT_LOGOS.length - i }}
                  >
                    <img
                      src={logo.src}
                      alt=""
                      className={logo.zoom ? 'is-zoom' : undefined}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>

              <p className="trial__social-caption">
                Empresas que confiam nos sistemas Mega News.
              </p>
            </div>
          </motion.div>

          <p className="trial__copy">
            © {new Date().getFullYear()} Mega News ·{' '}
             <Link href="/fale-com-vendas" className="trial__budget">
            Orçamento personalizado
            </Link> 
          </p>
        </div>
      </aside>

      <section className="trial__right">
        <DashedCircles />
        <motion.div
          className="trial__card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <form className="trial__form" onSubmit={handleSubmit}>
            <header className="trial__form-head">
              <h2>Bem-vindo!</h2>
              <p>Preencha os dados para começar o teste grátis.</p>
            </header>

            <label className="trial__field">
              <span>Nome</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label className="trial__field">
              <span>E-mail</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="voce@empresa.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="trial__field">
              <span>WhatsApp</span>
              <input
                type="tel"
                name="whatsapp"
                autoComplete="tel"
                placeholder="(74) 99999-9999"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
              />
            </label>

            <label className="trial__field">
              <span>Nome da empresa (ou nome fantasia)</span>
              <input
                type="text"
                name="company"
                autoComplete="organization"
                placeholder="Ex.: Posto Central"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </label>

            <label className="trial__field">
              <span>CPF ou CNPJ</span>
              <input
                type="text"
                name="taxId"
                inputMode="numeric"
                autoComplete="off"
                placeholder="CPF ou CNPJ"
                maxLength={18}
                value={taxId}
                onChange={(e) => {
                  setTaxId(maskDocument(e.target.value))
                  if (taxIdError) setTaxIdError('')
                }}
                required
                aria-invalid={taxIdError ? true : undefined}
              />
              {taxIdError ? <small className="trial__field-error">{taxIdError}</small> : null}
            </label>

            <button type="submit" className="trial__submit">
              Testar agora
              <ArrowRight size={18} aria-hidden="true" />
            </button>

            <div className="trial__secure">
              <Lock size={15} aria-hidden="true" />
              <span>Dados seguros e usados só para liberar o seu teste</span>
            </div>

            <p className="trial__switch">
              Já é cliente? <Link href="/login">Entrar</Link>
            </p>
          </form>
        </motion.div>
      </section>
    </div>
  )
}
