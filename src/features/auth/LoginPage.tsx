'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import DashedCircles from '@/components/ui/DashedCircles'
import './LoginPage.scss'

export default function LoginPage() {
  const router = useRouter()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // UI only — autenticação real entra depois
    router.push('/')
  }

  return (
    <div className="auth-login">
      <aside className="auth-login__visual" aria-hidden="true">
        <img
          src="/background-img-login.png"
          alt=""
          className="auth-login__photo"
        />
        <div className="auth-login__veil" />
        <Link href="/" className="auth-login__brand">
          Mega News
          <span />
        </Link>
      </aside>

      <section className="auth-login__right">
        <DashedCircles />
        <motion.div
          className="auth-login__card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <form className="auth-login__form" onSubmit={handleSubmit}>
            <header className="auth-login__head">
              <h1>Login</h1>
              <p>Acesse sua conta Mega News.</p>
            </header>

            <label className="auth-login__field">
              <span>Login</span>
              <input
                type="text"
                name="username"
                autoComplete="username"
                placeholder="Seu e-mail ou usuário"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </label>

            <label className="auth-login__field">
              <span>Senha</span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button type="submit" className="auth-login__submit">
              Entrar
            </button>

            <p className="auth-login__switch">
              Não é cliente? <Link href="/teste-gratis">Faça o teste grátis</Link>
            </p>
          </form>
        </motion.div>
      </section>
    </div>
  )
}
