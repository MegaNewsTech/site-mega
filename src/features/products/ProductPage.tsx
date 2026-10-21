'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import FloatingWhatsApp from '@/components/home/FloatingWhatsApp'
import { productHref, products, themeVars, type Product } from './products'
import './ProductPage.scss'

function FadeIn({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function ProductPage({ product }: { product: Product }) {
  const others = products.filter((p) => p.slug !== product.slug)

  return (
    <div className="product-page" style={themeVars(product)}>
      <div className="product-page__container">
        <nav className="product-page__breadcrumb" aria-label="Você está em">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#produtos">Produtos</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <section className="product-page__intro">
          <FadeIn className="product-page__showcase">
            <div className="product-page__frame">
              <span className="product-page__pill">{product.pillLabel}</span>
              <img src={product.logo} alt={product.name} draggable={false} />
            </div>
            <p className="product-page__band">{product.bandText}</p>
          </FadeIn>

          <FadeIn className="product-page__about" delay={0.1}>
            <p className="product-page__eyebrow">O produto</p>
            <h1>{product.headline}</h1>
            <p>{product.intro}</p>
          </FadeIn>
        </section>

        <section className="product-page__resources">
          <FadeIn className="product-page__resources-head">
            <h2>Recursos para o seu dia a dia</h2>
            <span>{product.name}</span>
          </FadeIn>
          <div className="product-page__resources-grid">
            {product.resources.map((resource, i) => (
              <FadeIn key={resource.title} delay={0.08 * i} className="product-page__resource">
                <h3>{resource.title}</h3>
                <p>{resource.text}</p>
                <ul>
                  {resource.items.map((item) => (
                    <li key={item}>
                      <Check size={18} strokeWidth={2.25} />
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
        </section>

        <FadeIn className="product-page__cta">
          <div>
            <h2>{product.ctaTitle}</h2>
            <p>{product.ctaText}</p>
          </div>
          <Link href="/fale-com-vendas" className="product-page__cta-btn">
            Falar com a equipe
          </Link>
        </FadeIn>

        <section className="product-page__others">
          <div className="product-page__others-head">
            <h2>Conheça também</h2>
            <Link href="/#produtos">
              Todos os produtos <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="product-page__others-grid">
            {others.map((other, i) => (
              <FadeIn key={other.slug} delay={0.08 * i}>
                <Link href={productHref(other)} className="other-card" style={themeVars(other)}>
                  <div className="other-card__top">
                    <img src={other.icon} alt="" draggable={false} />
                    <span>{other.category}</span>
                  </div>
                  <h3>{other.name}</h3>
                  <p>{other.shortText}</p>
                  <span className="other-card__link">
                    Conhecer solução <ArrowUpRight size={14} />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
      <FloatingWhatsApp />
    </div>
  )
}
