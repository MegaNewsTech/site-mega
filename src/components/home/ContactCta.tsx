'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { whatsappUrl } from '@/lib/whatsapp'
import { trackEvent } from '@/lib/clarity'
import './ContactCta.scss'

/** Message the visitor sends on WhatsApp (no backend integration yet). */
function buildMessage(name: string, company: string, email: string) {
  const lines = [
    '*Quero conhecer as soluções — site Mega News*',
    '',
    `*Nome:* ${name.trim()}`,
  ]
  if (company.trim()) lines.push(`*Empresa:* ${company.trim()}`)
  lines.push(`*E-mail:* ${email.trim()}`)
  return lines.join('\n')
}

export default function ContactCta() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const link = whatsappUrl(buildMessage(name, company, email))
    setWhatsappLink(link)
    trackEvent('contato_home_enviado_whatsapp')
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="contact-cta" id="contato">
      <motion.div
        className="contact-cta__container"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55 }}
      >
        <div className="contact-cta__copy">
          <p className="contact-cta__eyebrow">Vamos conversar</p>
          <h2>Uma solução para o seu negócio.</h2>
          <p>
            Deixe seu contato para conhecer as soluções da Mega News e conversar sobre o que sua
            empresa precisa.
          </p>
        </div>

        <form className="contact-cta__form" onSubmit={onSubmit} data-clarity-mask="true">
          <div className="contact-cta__row">
            <label>
              Nome
              <input
                required
                placeholder="Seu nome"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Empresa (opcional)
              <input
                placeholder="Nome da empresa"
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </label>
          </div>
          <label>
            E-mail
            <input
              type="email"
              required
              placeholder="voce@empresa.com.br"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button type="submit">Quero conhecer as soluções</button>
          {whatsappLink ? (
            <p className="contact-cta__note contact-cta__note--sent" role="status">
              Abrimos o WhatsApp com a sua mensagem pronta, é só tocar em enviar.{' '}
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Abrir novamente
              </a>
            </p>
          ) : (
            <p className="contact-cta__note">Seus dados serão usados para este primeiro contato.</p>
          )}
        </form>
      </motion.div>
    </section>
  )
}
