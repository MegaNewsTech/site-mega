'use client'

import { useEffect, useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, CreditCard, Eye, EyeOff, Lock } from 'lucide-react'
import DashedCircles from '@/components/ui/DashedCircles'
import { loadTrialState, type TrialState } from '@/lib/trial'
import './AccountActivationPage.scss'

const CODE_LENGTH = 6
const RESEND_COOLDOWN = 30

function Stepper({ step }: { step: 1 | 2 | 3 }) {
  return (
    <ol className="ativacao__steps" aria-label="Etapas de ativação">
      {[1, 2, 3].map((n) => {
        const done = n < step
        const current = n === step
        return (
          <li key={n} className="ativacao__step-item">
            {n > 1 && (
              <span
                className={`ativacao__dash ${done || current ? 'is-active' : ''}`}
                aria-hidden="true"
              />
            )}
            <span
              className={`ativacao__step ${done ? 'is-done' : ''} ${current ? 'is-current' : ''}`}
              aria-current={current ? 'step' : undefined}
            >
              {done ? <Check size={16} strokeWidth={3} /> : n}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, '')
}

export default function AccountActivationPage() {
  const router = useRouter()
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const [trial, setTrial] = useState<TrialState>({})

  useEffect(() => {
    setTrial(loadTrialState())
  }, [])

  const email = trial.email?.trim() || 'seu e-mail'
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''))
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [loginName, setLoginName] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [error, setError] = useState('')
  const [resendIn, setResendIn] = useState(RESEND_COOLDOWN)

  useEffect(() => {
    if (trial.email) {
      setLoginName(trial.email)
    }
  }, [trial.email])

  useEffect(() => {
    if (step !== 1 || resendIn <= 0) return

    const timer = window.setTimeout(() => {
      setResendIn((value) => value - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [step, resendIn])

  const codeValue = code.join('')
  const codeComplete = codeValue.length === CODE_LENGTH
  const canResend = resendIn <= 0

  const handleResendCode = () => {
    if (!canResend) return
    setResendIn(RESEND_COOLDOWN)
    setError('')
    // UI only — reenvio real entra depois
  }

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus()
    inputsRef.current[index]?.select()
  }

  const applyCodeDigits = (digits: string, startIndex = 0) => {
    const next = [...code]
    const chars = onlyDigits(digits).slice(0, CODE_LENGTH - startIndex).split('')

    chars.forEach((char, i) => {
      next[startIndex + i] = char
    })

    setCode(next)

    const filled = next.join('').length
    focusInput(Math.min(filled, CODE_LENGTH - 1))
  }

  const handleCodeChange = (index: number, value: string) => {
    const digits = onlyDigits(value)

    if (digits.length > 1) {
      applyCodeDigits(digits, index)
      return
    }

    const next = [...code]
    next[index] = digits.slice(-1)
    setCode(next)
    setError('')

    if (digits && index < CODE_LENGTH - 1) {
      focusInput(index + 1)
    }
  }

  const handleCodeKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      e.preventDefault()
      const next = [...code]
      next[index - 1] = ''
      setCode(next)
      focusInput(index - 1)
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      focusInput(index - 1)
    }

    if (e.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      e.preventDefault()
      focusInput(index + 1)
    }
  }

  const handleCodePaste = (index: number, e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text')
    if (!pasted) return
    applyCodeDigits(pasted, index)
    setError('')
  }

  const goNextFromEmail = (e: FormEvent) => {
    e.preventDefault()
    if (!codeComplete) {
      setError('Informe o código de 6 dígitos enviado por e-mail.')
      focusInput(codeValue.length)
      return
    }
    setError('')
    setStep(2)
  }

  const handlePassword = (e: FormEvent) => {
    e.preventDefault()
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }
    if (password !== confirm) {
      setError('As senhas não coincidem.')
      return
    }
    setError('')
    setLoginPassword(password)
    setStep(3)
  }

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    // UI only — autenticação real entra depois
    router.push('/')
  }

  return (
    <div className="ativacao">
      <DashedCircles />

      <div className="container ativacao__wrap">
        <Stepper step={step} />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.section
              key="email"
              className="ativacao__panel ativacao__panel--center ativacao__panel--card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <h1>Ativação da Conta</h1>
              <p className="ativacao__text">
                Enviamos um código de confirmação para <strong>{email}</strong>. Digite os 6 dígitos
                abaixo ou cole o código completo.
              </p>

              <form className="ativacao__code-form" onSubmit={goNextFromEmail}>
                <div className="ativacao__code" role="group" aria-label="Código de verificação">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputsRef.current[index] = el
                      }}
                      className="ativacao__code-input"
                      type="text"
                      inputMode="numeric"
                      autoComplete={index === 0 ? 'one-time-code' : 'off'}
                      name={`code-${index}`}
                      maxLength={CODE_LENGTH}
                      value={digit}
                      aria-label={`Dígito ${index + 1} de ${CODE_LENGTH}`}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(index, e)}
                      onPaste={(e) => handleCodePaste(index, e)}
                      onFocus={(e) => e.target.select()}
                    />
                  ))}
                </div>

                {error && <p className="ativacao__error">{error}</p>}

                <button type="submit" className="ativacao__btn">
                  Próximo
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </form>

              <button
                type="button"
                className="ativacao__ghost"
                onClick={handleResendCode}
                disabled={!canResend}
              >
                {canResend ? 'Reenviar código' : `Reenviar código em ${resendIn}s`}
              </button>
            </motion.section>
          )}

          {step === 2 && (
            <motion.section
              key="password"
              className="ativacao__panel ativacao__panel--password ativacao__panel--card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <form className="ativacao__form" onSubmit={handlePassword}>
                <h1>Definição de Senha</h1>
                <p className="ativacao__text">Crie uma senha segura para acessar sua conta Mega News.</p>

                <label className="ativacao__field">
                  <span>Senha</span>
                  <span className="ativacao__input">
                    <Lock size={16} aria-hidden="true" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      autoComplete="new-password"
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="ativacao__eye"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </span>
                </label>

                <label className="ativacao__field">
                  <span>Confirmação de Senha</span>
                  <span className="ativacao__input">
                    <CreditCard size={16} aria-hidden="true" />
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      name="confirm"
                      autoComplete="new-password"
                      placeholder="Repita a senha"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="ativacao__eye"
                      onClick={() => setShowConfirm((v) => !v)}
                      aria-label={showConfirm ? 'Ocultar confirmação' : 'Mostrar confirmação'}
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </span>
                </label>

                {error && <p className="ativacao__error">{error}</p>}

                <button type="submit" className="ativacao__btn ativacao__btn--end">
                  Próximo
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </form>
            </motion.section>
          )}

          {step === 3 && (
            <motion.section
              key="login"
              className="ativacao__panel ativacao__panel--login ativacao__panel--card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <h1>Login</h1>
              <form className="ativacao__login-form" onSubmit={handleLogin}>
                <label className="ativacao__underline">
                  <span>Nome</span>
                  <input
                    type="text"
                    name="username"
                    autoComplete="username"
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    required
                  />
                </label>

                <label className="ativacao__underline ativacao__underline--password">
                  <span>Senha</span>
                  <span className="ativacao__underline-input">
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      name="password"
                      autoComplete="current-password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="ativacao__eye"
                      onClick={() => setShowLoginPassword((v) => !v)}
                      aria-label={showLoginPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    >
                      {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </span>
                </label>

                <div className="ativacao__login-row">
                  <p>
                    Não tem uma conta? <Link href="/teste-gratis">Criar conta</Link>
                  </p>
                  <button type="submit" className="ativacao__btn ativacao__btn--compact">
                    Entrar
                  </button>
                </div>
              </form>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
