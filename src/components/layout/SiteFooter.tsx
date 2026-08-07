'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/layout/Footer'

const HIDE_FOOTER = ['/login', '/teste-gratis', '/ativacao']

export default function SiteFooter() {
  const pathname = usePathname()

  if (HIDE_FOOTER.includes(pathname)) {
    return null
  }

  return <Footer />
}
