/** Cookie consent choice, stored in the visitor's browser (LGPD). */
export type ConsentState = {
  analytics: boolean
  date: string
}

const STORAGE_KEY = 'meganews-cookie-consent'
/** Ask again after a year. */
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000

export const OPEN_PREFERENCES_EVENT = 'meganews:open-cookie-preferences'

export function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const state = JSON.parse(raw) as ConsentState
    if (typeof state.analytics !== 'boolean') return null
    if (Date.now() - new Date(state.date).getTime() > MAX_AGE_MS) return null
    return state
  } catch {
    return null
  }
}

export function saveConsent(analytics: boolean): ConsentState {
  const state = { analytics, date: new Date().toISOString() }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // sem armazenamento (aba anônima, bloqueio): a escolha vale só nesta visita
  }
  return state
}

/** Reopens the cookie banner with the preferences panel (footer link, privacy page). */
export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))
}
