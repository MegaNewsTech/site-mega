'use client'

import Link from 'next/link'

type LogoProps = {
  className?: string
  inverted?: boolean
}

export default function Logo({ className = '', inverted = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`logo ${inverted ? 'logo--inverted' : ''} ${className}`.trim()}
      aria-label="Mega News - Ir para o início"
    >
      <img
        src="/megalogo.svg"
        alt="Mega News"
        className="logo__mark"
        width={168}
        height={58}
        draggable={false}
      />
    </Link>
  )
}
