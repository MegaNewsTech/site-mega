'use client'

import { motion } from 'framer-motion'
import { CircleCheck } from 'lucide-react'
import './SupportSection.scss'

const HIGHLIGHTS = [
  'Suporte técnico especializado em sistemas',
  'Atendimento humano e personalizado',
  'Quem conhece o sistema e o dia a dia do cliente',
]

const CONTACTS = [
  { label: 'Telefone', value: '(74) 99964 0446', href: 'tel:+5574999640446' },
  { label: 'E-mail', value: 'comercial@meganews.com.br', href: 'mailto:comercial@meganews.com.br' },
  { label: 'WhatsApp', value: '(74) 99964 0446', href: 'https://wa.me/5574999640446', external: true },
]

export default function SupportSection() {
  return (
    <section className="support" id="suporte">
      <div className="support__container">
        <motion.div
          className="support__copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <p className="support__eyebrow">Suporte especializado</p>
          <h2>Atendimento humano e especializado</h2>
          <p className="support__text">
            Na Mega News, o suporte é humano, próximo e feito por quem conhece o sistema e o dia a dia
            do cliente.
          </p>
          <ul>
            {HIGHLIGHTS.map((item) => (
              <li key={item}>
                <CircleCheck size={22} strokeWidth={1.75} />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.aside
          className="support__card"
          aria-label="Nossos contatos"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <h3>Nossos contatos</h3>
          <p className="support__card-sub">
            Nossa equipe está à disposição para ouvir você e esclarecer suas dúvidas.
          </p>
          <dl>
            {CONTACTS.map((contact) => (
              <div key={contact.label}>
                <dt>{contact.label}</dt>
                <dd>
                  <a
                    href={contact.href}
                    {...(contact.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {contact.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
          <p className="support__card-note">Conte com um atendimento humano e próximo.</p>
        </motion.aside>
      </div>
    </section>
  )
}
