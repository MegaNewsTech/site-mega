'use client'

import type { ReactNode } from 'react'
import { openCookiePreferences } from '@/lib/consent'

/** Reopens the cookie banner so the visitor can change or withdraw consent. */
export default function CookiePreferencesButton({
  className,
  children = 'Gerenciar cookies',
}: {
  className?: string
  children?: ReactNode
}) {
  return (
    <button type="button" className={className} onClick={openCookiePreferences}>
      {children}
    </button>
  )
}
