'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Info } from 'lucide-react'
import { loadClarity, revokeClarity } from '@/lib/clarity'
import { OPEN_PREFERENCES_EVENT, readConsent, saveConsent } from '@/lib/consent'
import './CookieConsent.scss'

export default function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [managing, setManaging] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const consent = readConsent()
    if (!consent) setOpen(true)
    else if (consent.analytics) loadClarity()

    const openPreferences = () => {
      setAnalytics(readConsent()?.analytics ?? false)
      setManaging(true)
      setOpen(true)
    }
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences)
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences)
  }, [])

  const decide = (allowAnalytics: boolean) => {
    const previous = readConsent()
    saveConsent(allowAnalytics)
    setOpen(false)
    setManaging(false)

    if (allowAnalytics) {
      loadClarity()
    } else if (previous?.analytics) {
      // Retirou o consentimento: apaga os cookies do Clarity e recarrega sem o script.
      revokeClarity()
      window.location.reload()
    }
  }

  if (!open) return null

  return (
    <section className="cookie-consent" role="dialog" aria-live="polite" aria-label="Aviso de cookies">
      <div className="cookie-consent__inner">
        <Info className="cookie-consent__icon" size={22} aria-hidden="true" />

        <div className="cookie-consent__body">
          <p>
            Usamos cookies opcionais para entender como o site é usado e melhorar a sua experiência,
            com mapas de calor e gravações de navegação do Microsoft Clarity (os dados digitados em
            formulários ficam ocultos). Se você rejeitar, usaremos somente o necessário para o site
            funcionar. Você pode mudar sua escolha a qualquer momento em “Gerenciar cookies”, no
            rodapé da página. <Link href="/politica-de-privacidade">Política de privacidade</Link>
          </p>

          {managing && (
            <div className="cookie-consent__prefs">
              <label className="cookie-consent__pref">
                <input type="checkbox" checked disabled />
                <span>
                  <strong>Necessários</strong>
                  Guardam a sua escolha de cookies. Sempre ativos.
                </span>
              </label>
              <label className="cookie-consent__pref">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
                <span>
                  <strong>Análise e melhoria do site</strong>
                  Microsoft Clarity: páginas visitadas, cliques, rolagem e movimento do mouse.
                </span>
              </label>
            </div>
          )}
        </div>

        <div className="cookie-consent__actions">
          {managing ? (
            <button type="button" onClick={() => decide(analytics)}>
              Salvar preferências
            </button>
          ) : (
            <>
              <button type="button" onClick={() => decide(true)}>
                Aceitar
              </button>
              <button type="button" onClick={() => decide(false)}>
                Rejeitar
              </button>
              <button type="button" onClick={() => setManaging(true)}>
                Gerenciar cookies
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
