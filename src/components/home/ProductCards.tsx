'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SubItemIcon from '@/components/ui/SubItemIcon'
import { productHref, products, themeVars } from '@/features/products/products'
import './ProductCards.scss'

export default function ProductCards() {
  return (
    <section className="products" id="produtos">
      <div className="products__container">
        <motion.header
          className="products__head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <p className="products__eyebrow">Nossos produtos</p>
          <h2>A gestão do seu negócio, mais simples.</h2>
          <p className="products__sub">
            Soluções para postos de combustíveis e varejo que facilitam a gestão interna, o controle
            de estoque e as vendas externas.
          </p>
        </motion.header>

        <div className="products__grid">
          {products.map((product, i) => (
            <motion.article
              key={product.slug}
              className="pcard"
              style={themeVars(product)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
            >
              <img className="pcard__icon" src={product.icon} alt="" draggable={false} />
              <h3>{product.name}</h3>
              <p className="pcard__text">{product.cardText}</p>

              <div className="pcard__features">
                <span className="pcard__ribbon">{product.category}</span>
                <ul>
                  {product.cardItems.map((item) => (
                    <li key={item}>
                      <SubItemIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={productHref(product)} className="pcard__more">
                Saiba mais <ArrowRight size={16} />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
