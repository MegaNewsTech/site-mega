'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import Logo from '@/components/layout/Logo'
import { trackEvent } from '@/lib/clarity'
import { productHref, products } from '@/features/products/products'
import './Header.scss'

const PRODUCT_ITEMS = products.map((product) => ({
  id: product.slug,
  title: product.name,
  desc: product.shortText,
  to: productHref(product),
}))

// Ocultos do menu por enquanto (as páginas continuam no ar): /doubt, /login e /teste-gratis.

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // No topo da home o header acompanha o hero escuro; ao rolar volta ao claro.
  const onDark = pathname === '/' && !scrolled && !mobileOpen

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setProductsOpen(false)
  }, [pathname, searchParams])

  const headerClass = ['header', scrolled && 'header--scrolled', onDark && 'header--dark']
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClass}>
      <div className="header__inner">
        <Logo inverted={onDark} />

        <nav className="header__nav" aria-label="Principal">
          <Link
            href="/"
            className={`header__nav-link ${isActive('/') ? 'header__nav-link--active' : ''}`}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            Home
          </Link>
          <div
            className="header__nav-item"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className={`header__nav-btn ${isActive('/produtos') ? 'header__nav-link--active' : ''}`}
              type="button"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((open) => !open)}
            >
              Produtos
              <ChevronDown size={14} className={productsOpen ? 'rotated' : ''} />
            </button>
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  className="header__dropdown"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                >
                  {PRODUCT_ITEMS.map((item) => (
                    <Link key={item.id} href={item.to} className="header__dropdown-item">
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/#suporte" className="header__nav-link">
            Suporte
          </Link>
        </nav>

        <div className="header__actions">
          <Link
            href="/fale-com-vendas"
            className="header__cta"
            onClick={() => trackEvent('cta_solicitar_orcamento')}
          >
            Solicitar orçamento
          </Link>
          <button
            className="header__mobile-toggle"
            type="button"
            aria-label="Menu"
            aria-expanded={mobileOpen}
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
            <div className="header__mobile-group">
              <strong>Produtos</strong>
              {PRODUCT_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={item.to}
                  className={isActive(item.to) ? 'header__nav-link--active' : undefined}
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <Link href="/#suporte">Suporte</Link>
            <Link
              href="/fale-com-vendas"
              className="header__cta header__cta--block"
              onClick={() => trackEvent('cta_solicitar_orcamento')}
            >
              Solicitar orçamento
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
