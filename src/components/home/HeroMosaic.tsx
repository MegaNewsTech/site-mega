'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import agentSupport from '@/assets/team/474093605_122134078100469002_6708411422113641859_n.jpg'
import agentTeam from '@/assets/team/474791005_122134204964469002_520408274121525014_n.jpg'
import agentExperts from '@/assets/team/517982600_18412484764096469_1263547386549760221_n.jpg'
import agentCare from '@/assets/team/553533421_18422992504096469_5241358561180039412_n.jpg'
import agentPartner from '@/assets/team/520175043_24001087669510368_8353317623962188198_n.jpg'
import agentPurpose from '@/assets/team/531699488_1672006150134834_2688584939538733625_n.jpg'
import agentConsulting from '@/assets/team/514890012_18411026329096469_7396333855187197710_n.jpg'
import agentTraining from '@/assets/team/474746427_122134197878469002_5752023892496483758_n.jpg'
import agentDay from '@/assets/team/505473274_694958756841437_5194751207956841514_n.jpg'
import agentSystem from '@/assets/team/474742606_122134106978469002_7620751405159626241_n.jpg'
import logoPosto from '@/assets/products/megaposto.svg'
import logoAnalytics from '@/assets/products/megapostoanalytcs.svg'
import logoAgil from '@/assets/products/megaagil.svg'
import logoFlex from '@/assets/products/megaflex.svg'
import { assetSrc } from '@/lib/asset'
import './HeroMosaic.scss'

type CardKind = 'board' | 'chart' | 'kanban' | 'dark' | 'agent' | 'map' | 'timer' | 'logo'

type MosaicCard = {
  id: string
  kind: CardKind
  label: string
  image?: string
  hideLabel?: boolean
  people?: boolean
}

const HERO_ID = 'r1c2'

const ROWS: MosaicCard[][] = [
  [
    { id: 'r0c0', kind: 'board', label: 'Mega Posto', image: assetSrc(logoPosto) },
    { id: 'r0c1', kind: 'chart', label: 'Atendimento', image: assetSrc(agentCare), people: true },
    { id: 'r0c2', kind: 'kanban', label: 'Suporte técnico', image: assetSrc(agentSupport), people: true },
    { id: 'r0c3', kind: 'dark', label: 'Bastidores', image: assetSrc(agentDay), people: true },
    { id: 'r0c4', kind: 'map', label: 'Nosso time', image: assetSrc(agentTeam), people: true },
  ],
  [
    { id: 'r1c0', kind: 'board', label: 'Parceria', image: assetSrc(agentPartner), people: true },
    { id: 'r1c1', kind: 'board', label: 'Treinamento', image: assetSrc(agentTraining), people: true },
    { id: 'r1c2', kind: 'logo', label: 'Mega News', hideLabel: true },
    { id: 'r1c3', kind: 'chart', label: 'Consultoria', image: assetSrc(agentConsulting), people: true },
    { id: 'r1c4', kind: 'timer', label: 'Produtos', image: assetSrc(agentSystem), people: true },
  ],
  [
    { id: 'r2c0', kind: 'dark', label: 'Analytics', image: assetSrc(logoAnalytics) },
    { id: 'r2c1', kind: 'board', label: 'Especialistas', image: assetSrc(agentExperts), people: true },
    { id: 'r2c2', kind: 'kanban', label: 'Com propósito', image: assetSrc(agentPurpose), people: true },
    { id: 'r2c3', kind: 'chart', label: 'Mega Ágil', image: assetSrc(logoAgil) },
    { id: 'r2c4', kind: 'board', label: 'Mega Flex', image: assetSrc(logoFlex) },
  ],
]

const PHOTO_BG = [255, 255, 255] as const
const STAGE_BG = [246, 247, 251] as const

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v))
}

function mixRgb(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  t: number,
) {
  return `rgb(${Math.round(lerp(a[0], b[0], t))}, ${Math.round(lerp(a[1], b[1], t))}, ${Math.round(lerp(a[2], b[2], t))})`
}

function scalesFromProgress(p: number) {
  const t = clamp01(p)
  const shrink = clamp01(t / 0.9)
  const eased = 1 - Math.pow(1 - shrink, 1.7)
  return {
    // Começa no tamanho do print (menor que o zoom cheio anterior)
    heroScale: lerp(3.15, 1, eased),
    heroRadius: lerp(10, 14, eased),
    heroChrome: lerp(0.55, 1, eased),
    othersOpacity: lerp(0.32, 0.78, clamp01(t / 0.72)),
    othersScale: lerp(0.78, 1, clamp01(t / 0.72)),
    stageBg: mixRgb(PHOTO_BG, STAGE_BG, eased),
  }
}

export default function HeroMosaic() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const update = () => {
      const rect = section.getBoundingClientRect()
      const sectionTop = window.scrollY + rect.top
      const sectionHeight = section.offsetHeight
      const viewH = window.innerHeight
      // Adianta o início da animação em relação à entrada da seção
      const start = sectionTop - viewH * 0.12
      const end = sectionTop + sectionHeight - viewH
      const raw = end <= start ? 1 : (window.scrollY - start) / (end - start)
      setProgress(clamp01(raw))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const { heroScale, heroRadius, heroChrome, othersOpacity, othersScale, stageBg } =
    scalesFromProgress(progress)

  const stageScale = lerp(1.01, 1, clamp01(progress))
  const heroBorder = `1.5px solid rgba(216, 219, 227, ${heroChrome})`
  const heroShadow = `0 ${lerp(12, 20, heroChrome)}px ${lerp(36, 50, heroChrome)}px rgba(0, 0, 0, ${lerp(0.12, 0.1, heroChrome)}), 0 ${lerp(4, 6, heroChrome)}px ${lerp(12, 16, heroChrome)}px rgba(0, 0, 0, ${lerp(0.06, 0.05, heroChrome)})`

  return (
    <section ref={sectionRef} className="hero-mosaic" aria-label="Produtos Mega News">
      <div className="hero-mosaic__sticky">
        <div
          className="hero-mosaic__viewport"
          style={
            {
              background: stageBg,
              '--mosaic-edge': stageBg,
              '--mosaic-vignette': String(lerp(0.2, 0.85, heroChrome)),
            } as CSSProperties
          }
        >
          <div className="hero-mosaic__center">
            <div className="hero-mosaic__stage" style={{ transform: `scale(${stageScale})` }}>
              {ROWS.map((row, ri) => (
                <div key={ri} className={`hero-mosaic__row hero-mosaic__row--${ri}`}>
                  {row.map((card) => {
                    const isHero = card.id === HERO_ID
                    const hasPhoto = Boolean(card.image) || isHero
                    const mediaSrc = isHero ? '/megalogo.svg' : card.image

                    return (
                      <article
                        key={card.id}
                        className={[
                          'mosaic-card',
                          `mosaic-card--${card.kind}`,
                          isHero ? 'mosaic-card--hero' : '',
                          hasPhoto && !isHero ? 'mosaic-card--photo' : '',
                          card.people ? 'mosaic-card--people' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        style={
                          isHero
                            ? {
                                transform: `scale(${heroScale})`,
                                borderRadius: `${heroRadius}px`,
                                border: heroBorder,
                                boxShadow: heroShadow,
                                zIndex: 30,
                              }
                            : {
                                opacity: othersOpacity,
                                transform: `scale(${othersScale})`,
                                zIndex: 1,
                              }
                        }
                      >
                        {!card.hideLabel && (
                          <span className="mosaic-card__label">{card.label}</span>
                        )}
                        {mediaSrc ? (
                          <img
                            className={`mosaic-card__media ${isHero ? 'mosaic-card__media--logo' : ''}`}
                            src={mediaSrc}
                            alt={card.label}
                            draggable={false}
                          />
                        ) : null}
                      </article>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="hero-mosaic__vignette" />
          <div className="hero-mosaic__fade" />
        </div>
      </div>
    </section>
  )
}
