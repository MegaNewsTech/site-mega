'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import './FaqPage.scss'

const FAQ = [
  {
    q: 'O que é a Mega News?',
    a: 'Somos uma softhouse de Irecê-BA fundada em 1996. Desenvolvemos sistemas de automação comercial para postos de combustível, varejo e vendas externas, com implantação, treinamento e suporte especializados.',
  },
  {
    q: 'Quais sistemas vocês oferecem?',
    a: 'Mega Posto (postos de combustível), Mega Posto Analytics (acompanhamento em nuvem), Mega Ágil (força de venda móvel) e Mega Flex Gestão (gestão fiscal e comercial para varejo).',
  },
  {
    q: 'Vocês fazem a implantação do sistema?',
    a: 'Sim. Cuidamos da implantação com equipe especializada para que a operação comece com eficiência desde o primeiro dia, com parametrização, migração e go-live acompanhado.',
  },
  {
    q: 'Há treinamento para a equipe?',
    a: 'Sim. Oferecemos treinamento personalizado, presencial ou remoto, com foco no uso prático do sistema para aumentar a produtividade da sua equipe.',
  },
  {
    q: 'Como funciona o suporte técnico?',
    a: 'Atendimento especializado por telefone e WhatsApp. Fixo: (74) 3642-0750 (opção 2). WhatsApp suporte: (74) 99972-8690.',
  },
  {
    q: 'Os sistemas emitem documentos fiscais?',
    a: 'Sim. Mega Posto e Mega Flex Gestão emitem NF-e, NFC-e, MD-e, MDF-e e geram SPEDs Fiscais e Contribuições, com adequação contínua às exigências legais.',
  },
  {
    q: 'Atendem só postos de combustível?',
    a: 'Não. Atendemos postos (Mega Posto e Analytics), varejo (Mega Flex Gestão) e equipes de vendas externas (Mega Ágil).',
  },
  {
    q: 'Como faço para solicitar um orçamento?',
    a: 'Fale com a gente pelo formulário de Orçamento, pelo e-mail comercial@meganews.com.br ou WhatsApp (74) 9 9964-0446.',
  },
]

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="pricing pricing--doubt">
      <section className="pricing__quote pricing__quote--lead">
        <div className="container pricing__quote-grid">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Solicite um orçamento personalizado à nossa equipe de vendas
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Conte o segmento do seu negócio. Indicamos o sistema Mega News ideal e o plano de
              implantação.
            </motion.p>
            <Link href="/fale-com-vendas" className="btn btn-primary">
              Orçamento
            </Link>
          </div>
          <ul>
            <li>
              <Check size={18} /> Orçamento alinhado ao seu segmento
            </li>
            <li>
              <Check size={18} /> Sistemas para posto, varejo e vendas
            </li>
            <li>
              <Check size={18} /> Implantação, treinamento e suporte
            </li>
          </ul>
        </div>
      </section>

      <section className="pricing__faq">
        <div className="container">
          <h2>Perguntas frequentes</h2>
          <div className="pricing__faq-list">
            {FAQ.map((item, i) => (
              <div key={item.q} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.q}
                  <ChevronDown size={18} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="faq-item__body"
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
