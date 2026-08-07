export const TRIAL_STORAGE_KEY = 'meganews-trial'

export type TrialState = {
  name?: string
  email?: string
  whatsapp?: string
  company?: string
  cpf?: string
  cnpj?: string
}

export function saveTrialState(data: TrialState) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(TRIAL_STORAGE_KEY, JSON.stringify(data))
}

export function loadTrialState(): TrialState {
  if (typeof window === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem(TRIAL_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as TrialState) : {}
  } catch {
    return {}
  }
}
