'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import img1996 from '@/assets/team/496759220_18404191606096469_1363969337201398765_n.jpg'
import img1998 from '@/assets/images/539609867_18419294245096469_1428853511398648037_n.jpg'
import img2003 from '@/assets/images/472685719_122131928702469002_6158072994782679217_n.jpg'
import img2004 from '@/assets/images/502098171_18406693549096469_3877790639714763953_n.jpg'
import img2005 from '@/assets/images/502270133_675362858596444_8324571139659490822_n.jpg'
import img2006 from '@/assets/images/505473274_694958756841437_5194751207956841514_n.jpg'
import img2007 from '@/assets/images/537545734_18419291521096469_418785219806407289_n.jpg'
import img2009 from '@/assets/images/474880136_122134079624469002_7950224213902225708_n.jpg'
import img2011 from '@/assets/images/591161359_18436937953096469_8693855331962761800_n.jpg'
import img2015 from '@/assets/images/588428118_18438209116096469_4504334895665529977_n.jpg'
import img2016 from '@/assets/images/613178407_18441013834096469_2321587580206784034_n.jpg'
import img2018 from '@/assets/images/630159040_18447383629096469_1480681091620518511_n.jpg'
import img2021 from '@/assets/images/619855837_18442213336096469_6710787893797757926_n.jpg'
import { assetSrc } from '@/lib/asset'
import './Timeline.scss'

const TIMELINE = [
  {
    year: '1996',
    title: 'A fundação da Mega News',
    text: 'Onildo Martins funda a Mega News. No início, a principal fonte de renda vinha dos cursos de informática e do desenvolvimento de software customizado, com os irmãos Elci e Gildário Martins como colaboradores.',
    image: assetSrc(img1996),
  },
  {
    year: '1998',
    title: 'Primeiro sistema em DOS',
    text: 'Lança o SAC, o primeiro sistema da empresa em tecnologia DOS, marcando o início da trajetória em software de gestão.',
    image: assetSrc(img1998),
  },
  {
    year: '2003',
    title: 'Expansão na microrregião',
    text: 'Aumenta a estrutura física, contrata novos colaboradores, treina a mão de obra técnica e inicia a expansão para a microrregião de Irecê.',
    image: assetSrc(img2003),
  },
  {
    year: '2004',
    title: 'Reconhecimento da SEFAZ',
    text: 'Lança o Mega SAC, segundo sistema em DOS. A Mega News é reconhecida pela SEFAZ como a primeira empresa a homologar sistema para impressora fiscal térmica na Bahia.',
    image: assetSrc(img2004),
  },
  {
    year: '2005',
    title: 'Oportunizando Talentos',
    text: 'Nasce o projeto social de capacitação de jovens para o mercado de trabalho, reforçando o papel da empresa na comunidade.',
    image: assetSrc(img2005),
  },
  {
    year: '2006',
    title: 'Chegada ao Windows',
    text: 'Lança o Mega Flex, o primeiro sistema da Mega News desenvolvido para a plataforma Windows.',
    image: assetSrc(img2006),
  },
  {
    year: '2007',
    title: 'Prêmios e SPED',
    text: 'Conquista o primeiro Prêmio Mérito Logista CDL e segue premiada nos anos seguintes. Desenvolve o módulo SPED com integração à Receita Federal.',
    image: assetSrc(img2007),
  },
  {
    year: '2009',
    title: 'MPE Brasil e Mobile',
    text: 'Vence o Prêmio MPE Brasil na Bahia, na categoria Práticas de Gestão. Participa do programa Aprender e Empreender e lança o Mega Flex Mobile para Windows Mobile.',
    image: assetSrc(img2009),
  },
  {
    year: '2011',
    title: 'Evolução da marca',
    text: 'A Mega News avança na consolidação e evolução da sua identidade de marca no mercado.',
    image: assetSrc(img2018),
  },
  {
    year: '2015',
    title: 'Nova geração na liderança',
    text: 'Onildo Martins conclui sua trajetória. Tiago Souza assume o Desenvolvimento de Sistemas e Elci Martins assume a Diretoria Administrativa.',
    image: assetSrc(img2015),
  },
  {
    year: '2016',
    title: 'Bicampeã do MPE Brasil',
    text: 'Bicampeã do Prêmio MPE Brasil em Práticas de Gestão e Responsabilidade Social. Apoia o Campeonato de Programação do IFBA-Irecê e atualiza o mobile para Mega Ágil em Android.',
    image: assetSrc(img2016),
  },
  {
    year: '2018',
    title: 'Inovação e Analytics',
    text: 'Cria a comissão Inovação e Qualidade, atualiza IDEs, frameworks e banco de dados, e lança o Mega Posto Analytics, primeira solução web da Mega.',
    image: assetSrc(img2011),
  },
  {
    year: '2020',
    title: 'Lean e nova marca',
    text: 'Implanta o programa de transformação Lean Manufacturing, padroniza processos internos e moderniza a logomarca Mega News.',
    image: assetSrc(img2004),
  },
  {
    year: '2021',
    title: 'Financeiro, DF-e e conhecimento',
    text: 'Desenvolve o módulo Financeiro independente em C#.NET, o painel de Documentação Fiscal Eletrônica (DF-e) e lança a Base de Conhecimento Mega.',
    image: assetSrc(img2021),
  },
] as const

export default function Timeline() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [autoRotate, setAutoRotate] = useState(true)
  const yearsRailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rail = yearsRailRef.current
    if (!rail) return
    const chip = rail.querySelector<HTMLElement>(`[data-year-index="${active}"]`)
    if (!chip) return

    // Só move o trilho horizontal — scrollIntoView puxaria a página inteira
    // (ex.: ao abrir /#produtos, a timeline “roubava” o scroll para cá).
    const left = chip.offsetLeft - (rail.clientWidth - chip.offsetWidth) / 2
    rail.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
  }, [active])

  useEffect(() => {
    if (!autoRotate) return
    const id = window.setInterval(() => {
      setDirection(1)
      setActive((i) => (i + 1) % TIMELINE.length)
    }, 6000)
    return () => window.clearInterval(id)
  }, [autoRotate])

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(TIMELINE.length - 1, index))
    if (next === active) return
    setDirection(next > active ? 1 : -1)
    setActive(next)
    setAutoRotate(false)
  }

  const current = TIMELINE[active]
  const tone = active % 2 === 0 ? 'blue' : 'red'

  return (
    <section className="timeline-stack" id="historia" aria-label="Timeline Mega News">
      <div className="container timeline-stack__intro">
        <p className="eyebrow">Nossa história</p>
        <h2 className="section-title">Timeline</h2>
        <p className="section-subtitle">
          Quase três décadas construindo sistemas, formando pessoas e acompanhando o crescimento das
          empresas da região. Escolha um ano para navegar.
        </p>
      </div>

      <div className="timeline-stack__nav" aria-label="Navegação por ano">
        <div className="container timeline-stack__nav-inner">
          <button
            type="button"
            className="timeline-stack__nav-arrow"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Ano anterior"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="timeline-stack__years" ref={yearsRailRef}>
            {TIMELINE.map((item, i) => (
              <button
                key={item.year}
                type="button"
                data-year-index={i}
                className={`timeline-stack__year-chip ${i === active ? 'is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-current={i === active ? 'true' : undefined}
              >
                {item.year}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="timeline-stack__nav-arrow"
            onClick={() => goTo(active + 1)}
            disabled={active === TIMELINE.length - 1}
            aria-label="Próximo ano"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="container timeline-stack__stage">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.article
            key={current.year}
            className={`timeline-stack__card timeline-stack__card--${tone}`}
            custom={direction}
            initial={{ opacity: 0, x: direction * 36, scale: 0.985 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -28, scale: 0.985 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="timeline-stack__body">
              <span className="timeline-stack__year">{current.year}</span>
              <h3>{current.title}</h3>
              <p>{current.text}</p>
              <div className="timeline-stack__pager">
                <span>
                  {active + 1} / {TIMELINE.length}
                </span>
              </div>
            </div>
            <div className="timeline-stack__media">
              <img src={current.image} alt="" draggable={false} />
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  )
}
