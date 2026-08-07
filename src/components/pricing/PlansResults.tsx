'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import imgPosto from '@/assets/images/591161359_18436937953096469_8693855331962761800_n.jpg'
import imgTeam from '@/assets/images/472685719_122131928702469002_6158072994782679217_n.jpg'
import imgSupport from '@/assets/team/474093605_122134078100469002_6708411422113641859_n.jpg'
import imgVarejo from '@/assets/images/606969141_18439111549096469_4439076244357103695_n.jpg'
import imgAgil from '@/assets/images/588428118_18438209116096469_4504334895665529977_n.jpg'
import imgCare from '@/assets/team/553533421_18422992504096469_5241358561180039412_n.jpg'
import imgHQ from '@/assets/team/502098171_18406693549096469_3877790639714763953_n.jpg'
import { assetSrc } from '@/lib/asset'

type ResultCard =
  | {
      id: string
      kind: 'stat'
      tag: string
      tagTone: 'purple' | 'pink' | 'blue' | 'green'
      metric: string
      label: string
      image: string
      link?: boolean
    }
  | {
      id: string
      kind: 'quote'
      quote: string
      author: string
      role: string
      image: string
    }

const RESULTS: ResultCard[] = [
  {
    id: 'posto',
    kind: 'stat',
    tag: 'Postos',
    tagTone: 'blue',
    metric: '40%',
    label: 'mais agilidade na rotina fiscal e de caixa',
    image: assetSrc(imgPosto),
    link: true,
  },
  {
    id: 'varejo',
    kind: 'stat',
    tag: 'Varejo',
    tagTone: 'pink',
    metric: '25%',
    label: 'redução de falhas no controle de estoque',
    image: assetSrc(imgVarejo),
    link: true,
  },
  {
    id: 'quote-1',
    kind: 'quote',
    quote:
      'O suporte é humano, próximo e feito por quem conhece o sistema e o dia a dia do cliente.',
    author: 'Cliente Mega News',
    role: 'Gestão comercial',
    image: assetSrc(imgSupport),
  },
  {
    id: 'horas',
    kind: 'stat',
    tag: 'Operação',
    tagTone: 'purple',
    metric: '29',
    label: 'anos desenvolvendo sistemas para o seu negócio',
    image: assetSrc(imgHQ),
    link: true,
  },
  {
    id: 'satisfacao',
    kind: 'stat',
    tag: 'Confiança',
    tagTone: 'green',
    metric: '98%',
    label: 'de satisfação dos clientes atendidos',
    image: assetSrc(imgTeam),
    link: true,
  },
  {
    id: 'quote-2',
    kind: 'quote',
    quote: 'Tecnologia é só o começo. Excelência no atendimento é o padrão Mega News.',
    author: 'Equipe Mega News',
    role: 'Suporte especializado',
    image: assetSrc(imgCare),
  },
  {
    id: 'vendas',
    kind: 'stat',
    tag: 'Vendas externas',
    tagTone: 'blue',
    metric: '3x',
    label: 'mais controle da força de venda em campo',
    image: assetSrc(imgAgil),
    link: true,
  },
]

const GAP = 20
const DRAG_THRESHOLD = 6

export default function PlansResults() {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startScroll: 0,
    moved: false,
  })
  const [index, setIndex] = useState(0)
  const [dragging, setDragging] = useState(false)
  const total = RESULTS.length

  const getStep = () => {
    const track = trackRef.current
    const card = track?.querySelector<HTMLElement>('.plans-results__card')
    if (!card) return 0
    return card.offsetWidth + GAP
  }

  const syncIndex = () => {
    const track = trackRef.current
    if (!track) return
    const step = getStep()
    if (!step) return
    const next = Math.round(track.scrollLeft / step)
    setIndex(Math.max(0, Math.min(total - 1, next)))
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', syncIndex, { passive: true })
    return () => track.removeEventListener('scroll', syncIndex)
  }, [total])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      dragRef.current = {
        active: true,
        pointerId: e.pointerId,
        startX: e.clientX,
        startScroll: track.scrollLeft,
        moved: false,
      }
      setDragging(true)
      track.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag.active || drag.pointerId !== e.pointerId) return
      const dx = e.clientX - drag.startX
      if (Math.abs(dx) > DRAG_THRESHOLD) drag.moved = true
      track.scrollLeft = drag.startScroll - dx
    }

    const endDrag = (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag.active || drag.pointerId !== e.pointerId) return
      drag.active = false
      setDragging(false)
      if (track.hasPointerCapture(e.pointerId)) {
        track.releasePointerCapture(e.pointerId)
      }
      // Encaixa no card mais próximo após soltar
      const step = getStep()
      if (step) {
        const next = Math.round(track.scrollLeft / step)
        const clamped = Math.max(0, Math.min(total - 1, next))
        track.scrollTo({ left: clamped * step, behavior: 'smooth' })
        setIndex(clamped)
      }
    }

    const onClickCapture = (e: MouseEvent) => {
      if (!dragRef.current.moved) return
      e.preventDefault()
      e.stopPropagation()
      dragRef.current.moved = false
    }

    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointermove', onPointerMove)
    track.addEventListener('pointerup', endDrag)
    track.addEventListener('pointercancel', endDrag)
    track.addEventListener('click', onClickCapture, true)

    return () => {
      track.removeEventListener('pointerdown', onPointerDown)
      track.removeEventListener('pointermove', onPointerMove)
      track.removeEventListener('pointerup', endDrag)
      track.removeEventListener('pointercancel', endDrag)
      track.removeEventListener('click', onClickCapture, true)
    }
  }, [total])

  const scrollToIndex = (next: number) => {
    const track = trackRef.current
    if (!track) return
    const step = getStep()
    if (!step) return
    const clamped = Math.max(0, Math.min(total - 1, next))
    track.scrollTo({ left: clamped * step, behavior: 'smooth' })
    setIndex(clamped)
  }

  return (
    <section className="plans-results" aria-label="Resultados dos clientes">
      <div className="container">
        <div className="plans-results__header">
          <h2>Nossos clientes obtêm mais resultados</h2>
          <Link href="/fale-com-vendas" className="plans-results__cta">
            Começar
          </Link>
        </div>

        <div
          className={`plans-results__track ${dragging ? 'is-dragging' : ''}`}
          ref={trackRef}
        >
          {RESULTS.map((item) =>
            item.kind === 'stat' ? (
              <article key={item.id} className="plans-results__card">
                <div className="plans-results__copy">
                  <span className={`plans-results__tag plans-results__tag--${item.tagTone}`}>
                    {item.tag}
                  </span>
                  <strong className="plans-results__metric">{item.metric}</strong>
                  <p>{item.label}</p>
                  {item.link && (
                    <Link href="/fale-com-vendas" className="plans-results__case">
                      Fale com a gente
                    </Link>
                  )}
                </div>
                <div className="plans-results__media">
                  <img src={item.image} alt="" draggable={false} />
                </div>
              </article>
            ) : (
              <article key={item.id} className="plans-results__card plans-results__card--quote">
                <div className="plans-results__copy">
                  <span className="plans-results__quote-mark" aria-hidden="true">
                    “
                  </span>
                  <p className="plans-results__quote">{item.quote}</p>
                  <cite>
                    {item.author}
                    <span>{item.role}</span>
                  </cite>
                </div>
                <div className="plans-results__media">
                  <img src={item.image} alt="" draggable={false} />
                </div>
              </article>
            ),
          )}
        </div>

        <div className="plans-results__nav">
          <p className="plans-results__pager">
            {index + 1} de {total}
          </p>
          <div className="plans-results__arrows">
            <button
              type="button"
              aria-label="Anterior"
              disabled={index === 0}
              onClick={() => scrollToIndex(index - 1)}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Próximo"
              disabled={index >= total - 1}
              onClick={() => scrollToIndex(index + 1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
