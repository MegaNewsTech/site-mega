'use client'

import { useState, useEffect, type ReactNode, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import HeroMosaic from '@/components/home/HeroMosaic'
import FloatingWhatsApp from '@/components/home/FloatingWhatsApp'
import Timeline from '@/components/home/Timeline'
import InstagramReels from '@/components/home/InstagramReels'
import LocationMap from '@/components/home/LocationMap'
import whyImg1 from '@/assets/images/632565646_18448927348096469_5160123843589800668_n.jpg'
import teamImg1 from '@/assets/images/472685719_122131928702469002_6158072994782679217_n.jpg'
import teamImg2 from '@/assets/images/539609867_18419294245096469_1428853511398648037_n.jpg'
import teamImg3 from '@/assets/images/502270133_675362858596444_8324571139659490822_n.jpg'
import teamImg4 from '@/assets/images/537545734_18419291521096469_418785219806407289_n.jpg'
import logoPosto from '@/assets/products/megaposto.svg'
import logoAnalytics from '@/assets/products/megapostoanalytcs.svg'
import logoAgil from '@/assets/products/megaagil.svg'
import logoFlex from '@/assets/products/megaflex.svg'
import partner1 from '@/assets/clients/partner-2-150x150.jpg'
import partner2 from '@/assets/clients/partner-3-150x150.jpg'
import partner3 from '@/assets/clients/partner-4-1-150x150.jpg'
import partner4 from '@/assets/clients/partner-5-1-150x150.jpg'
import partner5 from '@/assets/clients/partner-6-150x150.jpg'
import partner6 from '@/assets/clients/partner-8-1-150x150.jpg'
import partner7 from '@/assets/clients/1-1-150x150.jpg'
import partner8 from '@/assets/clients/partner-6-1-150x150.jpg'
import { assetSrc } from '@/lib/asset'
import './HomePage.scss'

const partners = [
  assetSrc(partner1),
  assetSrc(partner2),
  assetSrc(partner3),
  assetSrc(partner4),
  assetSrc(partner5),
  assetSrc(partner6),
  assetSrc(partner7),
  assetSrc(partner8),
]

const productTabs = [
  {
    id: 'posto',
    label: 'Mega Posto',
    logo: assetSrc(logoPosto),
    headline: 'Garanta a eficiência financeira e fiscal do seu posto de combustível!',
    description:
      'Emita NF-e, NFC-e, MD-e, MDF-e, gere SPEDs Fiscais e Contribuições. Controle de combustível, LMC e prestação de contas por frentista sem complicação.',
  },
  {
    id: 'analytics',
    label: 'Mega Posto Analytics',
    logo: assetSrc(logoAnalytics),
    headline: 'Visibilidade e precisão em tempo real',
    description:
      'O Mega Posto Analytics é um app em nuvem que permite acompanhar a movimentação financeira e de combustíveis do seu posto, integrado ao Mega Posto, oferecendo visibilidade e precisão em tempo real.',
  },
  {
    id: 'agil',
    label: 'Mega Ágil',
    logo: assetSrc(logoAgil),
    headline: 'Simplifique as vendas externas com o Mega Ágil!',
    description:
      'Sistema para dispositivos móveis que permite registrar e acompanhar pedidos em tempo real, com catálogo digital integrado, garantindo agilidade e eficiência para sua equipe.',
  },
  {
    id: 'flex',
    label: 'Mega Flex Gestão',
    logo: assetSrc(logoFlex),
    headline: 'Transforme a gestão do seu negócio de varejo!',
    description:
      'Emita NF-e, NFC-e, MD-e, MDF-e e SPEDs Fiscais e Contribuições com agilidade e segurança. Simplifique sua rotina e garanta total conformidade fiscal. Aproveite agora!',
  },
]

const IG_PROFILE = 'https://www.instagram.com/meganewsinfo/'
const WHATSAPP_CONTACT =
  'https://wa.me/5574999728690?text=' +
  encodeURIComponent(
    'Olá, equipe Mega News. Gostaria de conhecer as soluções e sistemas da empresa.',
  )

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

const controlItems = [
  {
    title: 'Sistemas homologados e confiáveis',
    text: 'Soluções reconhecidas e alinhadas às exigências fiscais, da emissão de documentos à escrituração digital.',
    panel: [
      'NF-e, NFC-e, MD-e e MDF-e ativos',
      'SPEDs Fiscais e Contribuições gerados',
      'Homologação SEFAZ no histórico Mega News',
      'Adequação contínua à reforma tributária',
      'Atualizações fiscais sem interrupção',
    ],
  },
  {
    title: 'Implantação com acompanhamento',
    text: 'Cuidamos de cada detalhe da implantação para que sua empresa opere com eficiência desde o primeiro dia.',
    panel: [
      'Diagnóstico do negócio concluído',
      'Parametrização do sistema em andamento',
      'Migração de dados validada',
      'Go-live acompanhado pela equipe Mega',
      'Checklist de operação liberado',
    ],
  },
  {
    title: 'Treinamento para a sua equipe',
    text: 'Capacitamos quem usa o sistema no dia a dia, com foco prático para aumentar a produtividade.',
    panel: [
      'Treinamento presencial ou remoto agendado',
      'Módulos por setor: financeiro e vendas',
      'Material de apoio na Base de Conhecimento',
      'Dúvidas da equipe respondidas',
      'Acompanhamento pós-treinamento ativo',
    ],
  },
  {
    title: 'Suporte especializado',
    text: 'Atendimento rápido feito por quem conhece o sistema e a rotina do cliente, para sua operação não parar.',
    panel: [
      'Canal de suporte por WhatsApp e telefone',
      'Chamado prioritário em atendimento',
      'Orientação fiscal disponível',
      'Atualização de versão aplicada',
      'Continuidade dos processos garantida',
    ],
  },
  {
    title: 'Integração entre setores',
    text: 'Vendas, estoque, financeiro e fiscal conversando no mesmo ecossistema, com menos retrabalho e mais controle.',
    panel: [
      'Estoque e financeiro sincronizados',
      'PDV e documentos fiscais integrados',
      'Mega Posto e Analytics em nuvem',
      'Força de venda móvel com Mega Ágil',
      'Relatórios gerenciais personalizáveis',
    ],
  },
  {
    title: 'Parceria de longo prazo',
    text: 'Há quase três décadas ao lado de empresas da região, com tecnologia próxima, suporte humano e evolução constante.',
    panel: [
      'Desde 1996 com a Mega News',
      '98% de satisfação dos clientes',
      'Parceiro em cada etapa do crescimento',
      'Comissão de Inovação e Qualidade ativa',
      'Evolução contínua dos sistemas',
    ],
  },
]

const customers = [
  { metric: '29 anos', label: 'Desenvolvendo sistemas para o seu negócio', sector: 'Trajetória' },
  { metric: '98%', label: 'De satisfação dos clientes', sector: 'Confiança' },
  { metric: '4', label: 'Sistemas para gestão, posto, vendas e analytics', sector: 'Produtos' },
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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [tab, setTab] = useState(0)
  const [controlOpen, setControlOpen] = useState(0)
  const [useCase, setUseCase] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)

  const goToSales = (e?: FormEvent) => {
    e?.preventDefault()
    if (email) {
      sessionStorage.setItem('meganews-sales-email', email)
    }
    router.push('/fale-com-vendas')
  }

  useEffect(() => {
    const produto = searchParams?.get('produto')
    if (produto) {
      const idx = productTabs.findIndex((t) => t.id === produto)
      if (idx >= 0) {
        setTab(idx)
        setAutoRotate(false)
      }
    }

    const hash = window.location.hash.replace('#', '')
    const targetId = produto ? 'produtos' : hash
    if (!targetId) return

    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)

    return () => window.clearTimeout(timer)
  }, [searchParams, pathname])

  useEffect(() => {
    if (!autoRotate) return
    const id = setInterval(() => setTab((t) => (t + 1) % productTabs.length), 6000)
    return () => clearInterval(id)
  }, [autoRotate])

  const selectProductTab = (index: number) => {
    setTab(index)
    setAutoRotate(false)
  }

  const activeTab = productTabs[tab]

  return (
    <div className="home">
      <section className="hero" id="comece">
        <div className="container hero__content">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Tecnologia que impulsiona
            <br />
            o seu negócio
          </motion.h1>
          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Soluções completas em automação comercial: vendas, estoque, financeiro e emissão fiscal
            em sistemas fáceis de usar e 100% confiáveis.
          </motion.p>

          <motion.form
            className="hero__form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={goToSales}
          >
            <input
              type="email"
              placeholder="Digite seu e-mail de trabalho"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              Solicitar orçamento <ArrowRight size={18} />
            </button>
          </motion.form>

          <motion.p
            className="hero__note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            Aumente sua eficiência com quem entende do seu dia a dia
          </motion.p>
        </div>
      </section>

      <section className="trust">
        <div className="container">
          <p>Parcerias de sucesso que crescem conosco</p>
          <div className="trust__marquee">
            <div className="trust__track trust__track--logos">
              {[...partners, ...partners].map((src, i) => (
                <img key={`${src}-${i}`} src={src} alt="" draggable={false} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="teammates" id="produtos">
        <div className="container">
          <FadeIn>
            <p className="eyebrow">Nossos produtos</p>
            <h2 className="section-title">Sistemas que atendem o seu negócio</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="teammates__tabs">
              {productTabs.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  className={i === tab ? 'active' : ''}
                  onClick={() => selectProductTab(i)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </FadeIn>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              className="teammates__panel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <div className="teammates__product">
                <img
                  className="teammates__product-logo"
                  src={activeTab.logo}
                  alt={activeTab.label}
                  draggable={false}
                />
                <div className="teammates__product-copy">
                  <h3>{activeTab.headline}</h3>
                  <p>{activeTab.description}</p>
                  <a
                    href={WHATSAPP_CONTACT}
                    className="teammates__cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Quero conhecer
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

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

      <section className="control" id="diferenciais">
        <div className="container control__grid">
          <FadeIn>
            <h2 className="section-title">Por que a Mega News é a escolha certa</h2>
            <div className="control__accordion">
              {controlItems.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  className={`control__item ${i === controlOpen ? 'open' : ''}`}
                  onClick={() => setControlOpen(i)}
                >
                  <div className="control__item-head">
                    <Check size={18} className="control__check" />
                    <strong>{item.title}</strong>
                  </div>
                  <AnimatePresence>
                    {i === controlOpen && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {item.text}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="control__panel">
              <div className="control__panel-title">{controlItems[controlOpen].title}</div>
              <div className="control__logs">
                {controlItems[controlOpen].panel.map((line, n) => (
                  <motion.div
                    key={`${controlOpen}-${line}`}
                    className="control__log"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * n }}
                  >
                    <span className="dot" />
                    {line}
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="customers" id="numeros">
        <div className="container">
          <FadeIn>
            <div className="customers__head">
              <h2 className="section-title">
                Números que
                <br />
                reforçam a confiança
              </h2>
              <Link href="/fale-com-vendas" className="btn btn-outline">
                Quero um orçamento
              </Link>
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

          <FadeIn>
            <blockquote className="customers__quote">
              “Na Mega News, o suporte é humano, próximo e feito por quem conhece o sistema e o dia
              a dia do cliente. Tecnologia é só o começo. Excelência é o padrão.”
              <cite>Mega News Informática</cite>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      <InstagramReels />

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

      <section className="enterprise" id="cresca">
        <div className="container">
          <FadeIn>
            <h2 className="section-title">
              Cresça conosco:
              <br />
              desafios em oportunidades
            </h2>
          </FadeIn>
          <div className="enterprise__grid">
            <FadeIn>
              <article className="enterprise__card">
                <h3>Implantação prioritária</h3>
                <p>
                  Processo fluido com equipe especializada. Do diagnóstico ao go-live, cuidamos de
                  cada detalhe.
                </p>
                <div className="enterprise__badges">
                  {['Posto', 'Varejo', 'Vendas'].map((b) => (
                    <span key={b}>{b}</span>
                  ))}
                </div>
                <Link href="/fale-com-vendas">Quero implantar →</Link>
              </article>
            </FadeIn>
            <FadeIn delay={0.1}>
              <article className="enterprise__card enterprise__card--stat">
                <div className="enterprise__big">29</div>
                <p>
                  Anos <strong>desenvolvendo sistemas</strong> que apoiam empresas no crescimento
                </p>
                <Link href="/fale-com-vendas">Conhecer a história →</Link>
              </article>
            </FadeIn>
            <FadeIn delay={0.2}>
              <article className="enterprise__card enterprise__card--image">
                <img
                  src={assetSrc(whyImg1)}
                  alt="Suporte especializado Mega News"
                  draggable={false}
                  loading="lazy"
                />
              </article>
            </FadeIn>
          </div>
        </div>
      </section>

      <Timeline />

      <HeroMosaic />

      <LocationMap />

      <section className="final-cta">
        <div className="container">
          <FadeIn className="final-cta__content">
            <h2 className="section-title">Pronto para impulsionar a gestão do seu negócio?</h2>
            <p className="section-subtitle">
              Fale com a gente e descubra qual sistema Mega News combina com a sua operação.
            </p>
            <div className="final-cta__actions">
              <Link href="/fale-com-vendas" className="btn btn-primary">
                Falar com vendas <ArrowRight size={18} />
              </Link>
              <Link href="/doubt" className="btn btn-outline">
                Tirar dúvidas
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
      <FloatingWhatsApp />
    </div>
  )
}
