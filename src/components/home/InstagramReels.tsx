'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Plus } from 'lucide-react'
import './InstagramReels.scss'

type IgVideo = {
  code: string
  title: string
  desc: string
  url: string
}

const VIDEOS: IgVideo[] = [
  {
    code: 'DVRcg87DY2X',
    title: 'Quem somos',
    desc: 'A história e o jeito Mega de cuidar do cliente.',
    url: 'https://www.instagram.com/p/DVRcg87DY2X/',
  },
  {
    code: 'DWmKOXjkgyx',
    title: 'Suporte especializado',
    desc: 'Atendimento humano, próximo e feito por quem conhece o sistema.',
    url: 'https://www.instagram.com/p/DWmKOXjkgyx/',
  },
  {
    code: 'DXutPRWDoPL',
    title: 'No dia a dia',
    desc: 'Bastidores da operação e da equipe Mega News.',
    url: 'https://www.instagram.com/p/DXutPRWDoPL/',
  },
  {
    code: 'DW4VVXdF8Aj',
    title: 'Gestão e produtividade',
    desc: 'Como nossos sistemas acompanham o crescimento do seu negócio.',
    url: 'https://www.instagram.com/p/DW4VVXdF8Aj/',
  },
  {
    code: 'DUjLtQOksOK',
    title: 'Novidades Mega',
    desc: 'Lançamentos e conteúdos direto do perfil oficial.',
    url: 'https://www.instagram.com/p/DUjLtQOksOK/',
  },
  {
    code: 'DYQYspWTC0H',
    title: 'Em destaque',
    desc: 'O que está rodando agora no Instagram da Mega News.',
    url: 'https://www.instagram.com/p/DYQYspWTC0H/',
  },
]

export default function InstagramReels() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const [canLoad, setCanLoad] = useState(false)
  const [frameLoaded, setFrameLoaded] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '120px 0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Defer iframe load slightly so scroll stays smooth when the section appears.
  useEffect(() => {
    if (!inView) return

    const timer = window.setTimeout(() => setCanLoad(true), 180)
    return () => window.clearTimeout(timer)
  }, [inView])

  useEffect(() => {
    setFrameLoaded(false)
  }, [active])

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === cardRef.current)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const goPrev = () => setActive((i) => (i - 1 + VIDEOS.length) % VIDEOS.length)
  const goNext = () => setActive((i) => (i + 1) % VIDEOS.length)

  const toggleFullscreen = async () => {
    const card = cardRef.current
    if (!card) return

    try {
      if (document.fullscreenElement === card) {
        await document.exitFullscreen()
      } else {
        await card.requestFullscreen()
      }
    } catch {
      // Browser may block fullscreen without a trusted gesture or support.
    }
  }

  const current = VIDEOS[active]
  const showLoader = !canLoad || !frameLoaded

  return (
    <section
      ref={sectionRef}
      className={`ig-showcase ${inView ? 'is-visible' : ''}`}
      id="reels"
      aria-label="Vídeos Mega News"
    >
      <div className="container">
        <p className="ig-showcase__eyebrow">Conteúdo no Instagram</p>
        <h2 className="ig-showcase__title">Um vídeo para cada momento Mega</h2>
        <p className="ig-showcase__subtitle">
          Bastidores, suporte e novidades da Mega News. Navegue pelos vídeos com as setas.
        </p>

        <div className="ig-showcase__panel">
          <aside className="ig-showcase__nav" aria-label="Lista de vídeos">
            {VIDEOS.map((video, i) => {
              const isActive = i === active
              return (
                <button
                  key={video.code}
                  type="button"
                  className={`ig-showcase__nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                >
                  {!isActive && <Plus size={16} className="ig-showcase__nav-plus" />}
                  <strong>{video.title}</strong>
                  {isActive && <span>{video.desc}</span>}
                </button>
              )
            })}
            <a
              className="ig-showcase__nav-more"
              href="https://www.instagram.com/meganewsinfo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Plus size={16} /> Ver perfil @meganewsinfo
            </a>
          </aside>

          <div className="ig-showcase__stage">
            <button
              type="button"
              className="ig-showcase__arrow ig-showcase__arrow--prev"
              onClick={goPrev}
              aria-label="Vídeo anterior"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="ig-showcase__carousel">
              <article
                ref={cardRef}
                className={`ig-showcase__card ${isFullscreen ? 'is-fullscreen' : ''}`}
              >
                <div className={`ig-showcase__frame ${showLoader ? 'is-loading' : 'is-ready'}`}>
                  {showLoader && (
                    <div className="ig-showcase__skeleton" aria-hidden>
                      <span className="ig-showcase__skeleton-pulse" />
                      <span className="ig-showcase__skeleton-text">Carregando vídeo…</span>
                    </div>
                  )}
                  {canLoad && (
                    <iframe
                      key={current.code}
                      title={current.title}
                      className={frameLoaded ? 'is-loaded' : ''}
                      src={`https://www.instagram.com/p/${current.code}/embed`}
                      allow="autoplay; encrypted-media; clipboard-write; fullscreen"
                      allowFullScreen
                      loading="lazy"
                      scrolling="no"
                      onLoad={() => setFrameLoaded(true)}
                    />
                  )}
                </div>
                <div className="ig-showcase__card-body">
                  <h3>{current.title}</h3>
                  <p>{current.desc}</p>
                  <div className="ig-showcase__card-actions">
                    <a href={current.url} target="_blank" rel="noopener noreferrer">
                      Abrir no Instagram
                    </a>
                    <button
                      type="button"
                      className="ig-showcase__fullscreen"
                      onClick={toggleFullscreen}
                      aria-label={isFullscreen ? 'Sair da tela cheia' : 'Ver em tela cheia'}
                    >
                      {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                    </button>
                  </div>
                </div>
              </article>
            </div>

            <button
              type="button"
              className="ig-showcase__arrow ig-showcase__arrow--next"
              onClick={goNext}
              aria-label="Próximo vídeo"
            >
              <ChevronRight size={22} />
            </button>

            <div className="ig-showcase__dots" role="tablist" aria-label="Vídeos">
              {VIDEOS.map((video, i) => (
                <button
                  key={video.code}
                  type="button"
                  className={i === active ? 'active' : ''}
                  aria-label={video.title}
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
