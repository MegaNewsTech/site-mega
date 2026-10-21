'use client'

import { motion } from 'framer-motion'
import numeralsBg from '@/assets/campaign/30-anos-fundo.svg'
import seal30 from '@/assets/campaign/selo-30-anos.svg'
import { assetSrc } from '@/lib/asset'
import './Hero30.scss'

export default function Hero30() {
  return (
    <section className="hero30" id="comece">
      <img className="hero30__numerals" src={assetSrc(numeralsBg)} alt="" aria-hidden="true" draggable={false} />

      <div className="hero30__inner">
        <motion.div
          className="hero30__copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="hero30__eyebrow">Mega News</p>
          <h1>
            <strong>Há 30 anos,</strong>
            <br />
            traduzindo <strong>tecnologia</strong> em <strong>software</strong>
          </h1>
          <p className="hero30__sub">
            Tecnologia que simplifica processos, automatiza operações e impulsiona as vendas do seu
            negócio.
          </p>
        </motion.div>

        <motion.div
          className="hero30__seal"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="hero30__seal-mark">
            <img src={assetSrc(seal30)} alt="Mega News 30 anos" draggable={false} />
            <span>Anos</span>
          </div>
          <p>
            Deixe a tecnologia
            <br />
            com a gente
          </p>
        </motion.div>
      </div>
    </section>
  )
}
