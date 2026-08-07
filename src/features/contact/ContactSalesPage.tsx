'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import './ContactSalesPage.scss'

const BENEFITS = [
  'Identifique o sistema ideal para o seu segmento: posto, varejo ou vendas externas',
  'Conheça implantação, treinamento e suporte especializados da Mega News',
  'Receba um orçamento personalizado para o seu negócio',
]

const SIZES = ['1-19', '20-49', '50-99', '100-250', '251-1500', '1500+']
const EXPLORE = [
  'Mega Posto',
  'Mega Posto Analytics',
  'Mega Ágil',
  'Mega Flex Gestão',
  'Pacote completo',
  'Não tenho certeza',
]

export default function ContactSalesPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    phone: '',
    company: '',
    companySize: '',
    explore: '',
    needs: '',
  })

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="contact">
      <section className="contact__hero">
        <div className="container contact__grid">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>
              Converse com nossa equipe de vendas e descubra como a Mega News pode impulsionar o seu
              negócio
            </h1>

            <ul className="contact__benefits">
              {BENEFITS.map((b) => (
                <li key={b}>
                  <Sparkles size={16} className="star" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="contact__help">
              Para suporte técnico, ligue (74) 3642-0750 ou WhatsApp (74) 99972-8690
            </div>

            <blockquote className="contact__quote">
              “Somos uma softhouse dedicada a criar soluções que acompanham o crescimento do seu
              negócio. Oferecemos sistemas eficientes para controle financeiro, vendas externas e
              gestão fiscal.”
              <cite>
                <strong>Mega News</strong>
                Automação comercial desde 1996
              </cite>
            </blockquote>
          </motion.div>

          <motion.div
            className="contact__form-wrap"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {submitted ? (
              <div className="contact__success">
                <div className="contact__success-icon">✓</div>
                <h2>Obrigado!</h2>
                <p>Seu envio foi recebido. Nossa equipe de vendas entrará em contato em breve.</p>
                <button type="button" className="btn btn-primary" onClick={() => setSubmitted(false)}>
                  Enviar outro formulário
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={onSubmit}>
                <h2>Contate nossa equipe de vendas</h2>

                <div className="contact__row">
                  <label>
                    Nome*
                    <input
                      required
                      placeholder="Seu nome"
                      value={form.firstName}
                      onChange={(e) => update('firstName', e.target.value)}
                    />
                  </label>
                  <label>
                    Sobrenome*
                    <input
                      required
                      placeholder="Seu sobrenome"
                      value={form.lastName}
                      onChange={(e) => update('lastName', e.target.value)}
                    />
                  </label>
                </div>

                <label>
                  E-mail profissional*
                  <input
                    type="email"
                    required
                    placeholder="nome@empresa.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                  />
                </label>

                <label>
                  Título do trabalho
                  <input
                    placeholder="Ex.: Gerente, Diretor, Analista"
                    value={form.jobTitle}
                    onChange={(e) => update('jobTitle', e.target.value)}
                  />
                </label>

                <label>
                  Número de telefone*
                  <div className="contact__phone">
                    <span className="contact__flag">🇧🇷 +55</span>
                    <input
                      required
                      placeholder="(74) 99999-9999"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                    />
                  </div>
                </label>

                <div className="contact__row">
                  <label>
                    Nome da empresa*
                    <input
                      required
                      placeholder="Nome da sua empresa"
                      value={form.company}
                      onChange={(e) => update('company', e.target.value)}
                    />
                  </label>
                  <label>
                    Tamanho da empresa*
                    <select
                      required
                      value={form.companySize}
                      onChange={(e) => update('companySize', e.target.value)}
                    >
                      <option value="">Selecionar...</option>
                      {SIZES.map((s) => (
                        <option key={s} value={s}>
                          {s} funcionários
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label>
                  O que você gostaria de explorar? *
                  <select
                    required
                    value={form.explore}
                    onChange={(e) => update('explore', e.target.value)}
                  >
                    <option value="">Selecionar...</option>
                    {EXPLORE.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Conte-nos mais sobre sua empresa e o sistema que você gostaria de implantar com a
                  Mega News
                  <textarea
                    rows={4}
                    placeholder="Descrever necessidades do seu negócio"
                    value={form.needs}
                    onChange={(e) => update('needs', e.target.value)}
                  />
                </label>

                <button type="submit" className="btn btn-primary contact__submit">
                  Enviar
                </button>

                <p className="contact__legal">
                  Ao enviar este formulário, aceito a{' '}
                  <a href="#">política de privacidade</a> da Mega News e autorizo o contato para fins
                  de marketing por e-mail, telefone, SMS e outros meios.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <section className="contact__trust">
        <div className="container">
          <h2>Com a confiança de empresas que crescem com a gente</h2>
          <div className="contact__stats">
            {[
              { value: '29 anos', label: 'No mercado de software' },
              { value: '98%', label: 'Satisfação dos clientes' },
              { value: '4', label: 'Sistemas para gestão e vendas' },
              { value: 'Irecê-BA', label: 'Atendimento regional e além' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="contact__stat"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i }}
              >
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
