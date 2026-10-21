'use client'

import { useState, useEffect, type ReactNode } from 'react'
import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Hero30 from '@/components/home/Hero30'
import ProductCards from '@/components/home/ProductCards'
import SupportSection from '@/components/home/SupportSection'
import ContactCta from '@/components/home/ContactCta'
import FloatingWhatsApp from '@/components/home/FloatingWhatsApp'
import LocationMap from '@/components/home/LocationMap'
import teamImg1 from '@/assets/images/472685719_122131928702469002_6158072994782679217_n.jpg'
import teamImg2 from '@/assets/images/539609867_18419294245096469_1428853511398648037_n.jpg'
import teamImg3 from '@/assets/images/502270133_675362858596444_8324571139659490822_n.jpg'
import teamImg4 from '@/assets/images/537545734_18419291521096469_418785219806407289_n.jpg'
import { assetSrc } from '@/lib/asset'
import './HomePage.scss'

const IG_PROFILE = 'https://www.instagram.com/meganewsinfo/'

type IgPost = {
  code: string
  url: string
  label: string
}

const instagramTopics = [
  {
    id: 'produtos',
    title: 'Nossos sistemas',
    desc: 'Mega Posto, Analytics, Ágil e Flex Gestão para o seu negócio.',
    posts: [
      {
        code: 'DY4bcWQye5K',
        url: 'https://www.instagram.com/p/DY4bcWQye5K/',
        label: 'Produtos Mega News',
      },
      {
        code: 'DW4VVXdF8Aj',
        url: 'https://www.instagram.com/p/DW4VVXdF8Aj/',
        label: 'Gestão e produtividade',
      },
      {
        code: 'DKSoGrlSpJ-',
        url: 'https://www.instagram.com/p/DKSoGrlSpJ-/',
        label: 'Soluções Mega',
      },
    ] satisfies IgPost[],
  },
  {
    id: 'suporte',
    title: 'Suporte e confiança',
    desc: 'Atendimento humano, próximo e feito por quem entende o seu dia a dia.',
    posts: [
      {
        code: 'DWmKOXjkgyx',
        url: 'https://www.instagram.com/p/DWmKOXjkgyx/',
        label: 'Suporte especializado',
      },
      {
        code: 'DS8A00WDijd',
        url: 'https://www.instagram.com/p/DS8A00WDijd/',
        label: 'Confiança Mega News',
      },
      {
        code: 'DVRcg87DY2X',
        url: 'https://www.instagram.com/p/DVRcg87DY2X/',
        label: 'Quem somos',
      },
    ] satisfies IgPost[],
  },
  {
    id: 'novidades',
    title: 'Novidades e bastidores',
    desc: 'Conteúdos direto do perfil oficial da Mega News.',
    posts: [
      {
        code: 'DUjLtQOksOK',
        url: 'https://www.instagram.com/p/DUjLtQOksOK/',
        label: 'Novidade Mega News',
      },
      {
        code: 'DY4bcWQye5K',
        url: 'https://www.instagram.com/p/DY4bcWQye5K/',
        label: 'Em destaque',
      },
      {
        code: 'DW4VVXdF8Aj',
        url: 'https://www.instagram.com/p/DW4VVXdF8Aj/',
        label: 'Do feed',
      },
    ] satisfies IgPost[],
  },
]

function InstagramFrame({ post }: { post: IgPost }) {
  return (
    <a
      className="ig-frame"
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir no Instagram: ${post.label}`}
    >
      <iframe
        title={post.label}
        src={`https://www.instagram.com/p/${post.code}/embed`}
        loading="lazy"
        allow="encrypted-media; clipboard-write"
        scrolling="no"
      />
      <span className="ig-frame__overlay" />
    </a>
  )
}

const customers = [
  { metric: '30 anos', label: 'Desenvolvendo sistemas para o seu negócio', sector: 'Trajetória' },
  { metric: '98%', label: 'De satisfação dos clientes', sector: 'Confiança' },
  { metric: '4', label: 'Sistemas para gestão, com atuação no Atacado e Varejo', sector: 'Produtos' },
]

const teamMoments = [
  { alt: 'Valores e colaboração Mega News', image: assetSrc(teamImg2) },
  { alt: 'Time Mega News em atendimento', image: assetSrc(teamImg1) },
  { alt: 'Equipe Mega News no dia a dia', image: assetSrc(teamImg3) },
  { alt: 'Especialistas Mega News com clientes', image: assetSrc(teamImg4) },
]

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [useCase, setUseCase] = useState(0)

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    const targetId = searchParams?.get('produto') ? 'produtos' : hash
    if (!targetId) return

    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)

    return () => window.clearTimeout(timer)
  }, [searchParams, pathname])

  return (
    <div className="home">
      <Hero30 />

      <ProductCards />

      <SupportSection />

      <section className="open-platform open-platform--team" id="time">
        <div className="container">
          <FadeIn>
            <p className="eyebrow">Quem cuida de você</p>
            <h2 className="section-title">O time Mega do seu lado</h2>
            <p className="section-subtitle">
              Pessoas reais, atendimento próximo e especialistas prontos para acompanhar cada etapa
              da sua operação.
            </p>
          </FadeIn>
          <div className="open-platform__cards open-platform__cards--team">
            {teamMoments.map((card, i) => (
              <motion.article
                key={card.alt}
                className="open-platform__card open-platform__card--photo"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <img
                  className="open-platform__media"
                  src={card.image}
                  alt={card.alt}
                  draggable={false}
                />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="usecases" id="instagram">
        <div className="container">
          <FadeIn>
            <p className="eyebrow">Conteúdo no Instagram</p>
            <h2 className="section-title">Acompanhe a Mega News</h2>
            <p className="section-subtitle" style={{ marginBottom: 48 }}>
              Produtos, suporte e bastidores direto do perfil{' '}
              <a href={IG_PROFILE} target="_blank" rel="noopener noreferrer">
                @meganewsinfo
              </a>
            </p>
          </FadeIn>

          <div className="usecases__layout">
            <div className="usecases__cats">
              {instagramTopics.map((topic, i) => (
                <button
                  key={topic.id}
                  type="button"
                  className={i === useCase ? 'active' : ''}
                  onClick={() => setUseCase(i)}
                >
                  <strong>{topic.title}</strong>
                  <span>{topic.desc}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={useCase}
                className="usecases__items"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
              >
                {instagramTopics[useCase].posts.map((post, i) => (
                  <motion.div
                    key={post.code + post.label}
                    className="usecases__card"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.07 * i }}
                  >
                    <InstagramFrame post={post} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="customers" id="numeros">
        <div className="container">
          <FadeIn>
            <div className="customers__head">
              <p className="eyebrow">Nossa trajetória</p>
              <h2 className="section-title">
                Três décadas desenvolvendo software
                <br />
                que faz o seu negócio girar.
              </h2>
            </div>
          </FadeIn>

          <div className="customers__grid">
            {customers.map((c, i) => (
              <FadeIn key={c.metric} delay={0.1 * i}>
                <article className="customers__card">
                  <span className="customers__sector">{c.sector}</span>
                  <div className="customers__metric">{c.metric}</div>
                  <p>{c.label}</p>
                  <Link href="/fale-com-vendas">
                    Fale com a gente <ArrowRight size={14} />
                  </Link>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />

      <LocationMap />

      <FloatingWhatsApp />
    </div>
  )
}
