/** Microsoft Clarity (heatmaps and session recordings), loaded only after consent. */
export const CLARITY_PROJECT_ID = 'z1bbie976p'

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] }

declare global {
  interface Window {
    clarity?: ClarityFn
  }
}

export function loadClarity() {
  if (typeof window === 'undefined' || window.clarity) return

  // Snippet oficial do Clarity: cria a fila de chamadas e injeta o script.
  const clarity: ClarityFn = (...args: unknown[]) => {
    ;(clarity.q = clarity.q || []).push(args)
  }
  window.clarity = clarity

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`
  document.head.appendChild(script)

  // O site não faz publicidade: só armazenamento de análise.
  clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' })
}

/** Withdraws consent: Clarity erases its cookies and stops tracking. */
export function revokeClarity() {
  window.clarity?.('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' })
  window.clarity?.('consent', false)
}

/** Custom event to filter recordings (e.g. who asked for a quote). No-op without consent. */
export function trackEvent(name: string) {
  window.clarity?.('event', name)
}
