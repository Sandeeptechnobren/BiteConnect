import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, LoaderCircle, Lock, Mail, Sparkles } from 'lucide-react'
import AuthLayout, { EMAIL_RE, FieldError } from '../components/shell/AuthLayout'
import { safeRedirect } from '../components/shell/hooks'
import { useApp } from '../context/AppContext'
import { demoUser } from '../data/students'
import { cn } from '../utils/format'

const BENEFITS = [
  'Discover verified colleges, courses and campus details',
  'Connect with students from your college and beyond',
  'Build a profile that showcases your skills and projects',
]

export default function Login() {
  const { login, toast, isAuthenticated } = useApp()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const redirect = safeRedirect(params.get('redirect'), '/')
  const [form, setForm] = useState({ email: '', password: '', remember: true })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(null) // 'form' | 'demo' | null
  const timer = useRef(null)

  useEffect(() => {
    document.title = 'Log in · Bite Connect'
    return () => clearTimeout(timer.current)
  }, [])

  const signupHref = params.get('redirect') ? `/signup?redirect=${encodeURIComponent(redirect)}` : '/signup'

  const validate = () => {
    const next = {}
    if (!form.email.trim()) next.email = 'Enter your email address.'
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Enter a valid email address, like name@college.edu.'
    if (!form.password) next.password = 'Enter your password.'
    else if (form.password.length < 6) next.password = 'Password must be at least 6 characters.'
    return next
  }

  const finish = (email, mode) => {
    setLoading(mode)
    timer.current = setTimeout(() => {
      login({ email })
      navigate(redirect, { replace: true })
    }, 600)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (loading) return
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) {
      document.getElementById(next.email ? 'login-email' : 'login-password')?.focus()
      return
    }
    finish(form.email.trim(), 'form')
  }

  const onDemo = () => {
    if (loading) return
    setErrors({})
    setForm((f) => ({ ...f, email: demoUser.email, password: '' }))
    finish(demoUser.email, 'demo')
  }

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  return (
    <AuthLayout
      heading="Welcome back"
      subheading={isAuthenticated ? `You're already logged in — continue to log in again as someone else.` : 'Log in to connect with students and save your progress.'}
      statement="Your college journey, connected."
      benefits={BENEFITS}
    >
      <button type="button" onClick={onDemo} disabled={Boolean(loading)} className="btn-dark w-full">
        {loading === 'demo' ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <Sparkles className="size-4" aria-hidden="true" />}
        {loading === 'demo' ? 'Signing you in…' : 'Continue as demo user'}
      </button>

      <div className="my-6 flex items-center gap-3 text-xs font-medium text-muted">
        <span className="h-px flex-1 bg-line" /> or log in with email <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="login-email" className="label">
            Email
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@college.edu"
              value={form.email}
              onChange={set('email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'login-email-error' : undefined}
              className={cn('input pl-10', errors.email && 'border-danger focus:border-danger focus:ring-danger/10')}
            />
          </div>
          <FieldError id="login-email-error">{errors.email}</FieldError>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="label">
              Password
            </label>
            <button
              type="button"
              onClick={() => toast('Password reset is disabled in this demo', { type: 'info' })}
              className="mb-1.5 cursor-pointer text-xs font-semibold text-primary hover:text-primary-hover"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={form.password}
              onChange={set('password')}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'login-password-error' : undefined}
              className={cn('input pr-12 pl-10', errors.password && 'border-danger focus:border-danger focus:ring-danger/10')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              className="absolute top-1/2 right-1 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-slate-400 transition hover:text-ink"
            >
              {showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
            </button>
          </div>
          <FieldError id="login-password-error">{errors.password}</FieldError>
        </div>

        <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-slate-700">
          <input type="checkbox" checked={form.remember} onChange={set('remember')} className="size-4 rounded border-line accent-primary" />
          Remember me on this device
        </label>

        <button type="submit" disabled={Boolean(loading)} className="btn-primary w-full">
          {loading === 'form' && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
          {loading === 'form' ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        New to Bite Connect?{' '}
        <Link to={signupHref} className="font-semibold text-primary hover:text-primary-hover">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  )
}
