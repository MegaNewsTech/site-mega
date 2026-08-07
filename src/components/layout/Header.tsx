'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import Logo from '@/components/layout/Logo'
import './Header.scss'

type NavItem = {
  id: string
  title: string
  desc: string
  to: string
}

type NavGroup = {
  label: string
  items: NavItem[]
}

const NAV: NavGroup[] = [
  {
    label: 'Produtos',
    items: [
      {
        id: 'posto',
        title: 'Mega Posto',
        desc: 'Para postos de combustível',
        to: '/?produto=posto#produtos',
      },
      {
        id: 'analytics',
        title: 'Mega Posto Analytics',
        desc: 'Visibilidade em nuvem',
        to: '/?produto=analytics#produtos',
      },
      {
        id: 'agil',
        title: 'Mega Ágil',
        desc: 'Força de venda móvel',
        to: '/?produto=agil#produtos',
      },
      {
        id: 'flex',
        title: 'Mega Flex Gestão',
        desc: 'Gestão para varejo',
        to: '/?produto=flex#produtos',
      },
    ],
  },
  {
    label: 'Empresa',
    items: [
      {
        id: 'time',
        title: 'Nosso time',
        desc: 'Quem cuida de você no dia a dia',
        to: '/#time',
      },
      {
        id: 'diferenciais',
        title: 'Por que a Mega News',
        desc: 'Diferenciais e escolha certa',
        to: '/#diferenciais',
      },
      {
        id: 'numeros',
        title: 'Números e confiança',
        desc: 'Resultados que reforçam a parceria',
        to: '/#numeros',
      },
      {
        id: 'historia',
        title: 'Nossa história',
        desc: 'Timeline desde 1996',
        to: '/#historia',
      },
      {
        id: 'cresca',
        title: 'Cresça conosco',
        desc: 'Desafios em oportunidades',
        to: '/#cresca',
      },
      {
        id: 'localizacao',
        title: 'Onde estamos',
        desc: 'Sede em Irecê-BA',
        to: '/#localizacao',
      },
    ],
  },
  {
    label: 'Conteúdo',
    items: [
      {
        id: 'reels',
        title: 'Vídeos Mega',
        desc: 'Um vídeo para cada momento',
        to: '/#reels',
      },
      {
        id: 'instagram',
        title: 'Instagram',
        desc: 'Acompanhe a Mega News',
        to: '/#instagram',
      },
    ],
  },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const navClass = (href: string, extra = '') =>
    ['header__nav-link', isActive(href) && 'header__nav-link--active', extra]
      .filter(Boolean)
      .join(' ')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname, searchParams])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <Logo />

        <nav className="header__nav" aria-label="Principal">
          <Link href="/" className={navClass('/')} aria-current={isActive('/') ? 'page' : undefined}>
            Home
          </Link>
          {NAV.map((group) => (
            <div
              key={group.label}
              className="header__nav-item"
              onMouseEnter={() => setOpenMenu(group.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button className="header__nav-btn" type="button">
                {group.label}
                <ChevronDown size={14} className={openMenu === group.label ? 'rotated' : ''} />
              </button>
              <AnimatePresence>
                {openMenu === group.label && (
                  <motion.div
                    className="header__dropdown"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                  >
                    {group.items.map((item) => (
                      <Link key={item.id} href={item.to} className="header__dropdown-item">
                        <strong>{item.title}</strong>
                        <span>{item.desc}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="header__actions">
          {/* <Link href="/precos" className="header__nav-link">
            Preços
          </Link> */}
          <Link
            href="/fale-com-vendas"
            className={navClass('/fale-com-vendas')}
            aria-current={isActive('/fale-com-vendas') ? 'page' : undefined}
          >
            Orçamento
          </Link>
          <Link
            href="/doubt"
            className={navClass('/doubt')}
            aria-current={isActive('/doubt') ? 'page' : undefined}
          >
            Dúvidas
          </Link>
          <Link
            href="/login"
            className={navClass('/login', 'header__login')}
            aria-current={isActive('/login') ? 'page' : undefined}
          >
            Já é cliente? Entrar
          </Link>
          <Link href="/teste-gratis" className="btn btn-outline header__cta-sales">
            Teste Gratuito
          </Link>
          <button
            className="header__mobile-toggle"
            type="button"
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="header__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Link href="/" className={isActive('/') ? 'header__nav-link--active' : undefined}>
              Home
            </Link>
            {NAV.map((group) => (
              <div key={group.label} className="header__mobile-group">
                <strong>{group.label}</strong>
                {group.items.map((item) => (
                  <Link key={item.id} href={item.to}>
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
            {/* <Link href="/precos">Preços</Link> */}
            <Link
              href="/fale-com-vendas"
              className={isActive('/fale-com-vendas') ? 'header__nav-link--active' : undefined}
            >
              Orçamento
            </Link>
            <Link
              href="/doubt"
              className={isActive('/doubt') ? 'header__nav-link--active' : undefined}
            >
              Dúvidas
            </Link>
            <Link
              href="/login"
              className={isActive('/login') ? 'header__nav-link--active' : undefined}
            >
              Já é cliente? Entrar
            </Link>
            <Link href="/teste-gratis" className="btn btn-outline">
              Teste Gratuito
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
