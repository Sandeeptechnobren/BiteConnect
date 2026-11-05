import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Check, Eye, EyeOff, LoaderCircle, X } from 'lucide-react'
import AuthLayout, { EMAIL_RE, FieldError } from '../components/shell/AuthLayout'
import { safeRedirect } from '../components/shell/hooks'
import { courseDisplayName } from '../components/shell/search'
import { useApp } from '../context/AppContext'
import { colleges } from '../data/colleges'
import { courses } from '../data/courses'
import { getCollegeById, getCourseById, getStudentYears } from '../data/selectors'
import { cn } from '../utils/format'

const BENEFITS = [
  'Free profile to showcase your course, skills and projects',
  'Find classmates and seniors from colleges near you',
  'Compare colleges and courses side by side',
]

const STRENGTH = [
  { label: 'Too weak', color: 'bg-danger', text: 'text-danger' },
  { label: 'Weak', color: 'bg-danger', text: 'text-danger' },
  { label: 'Fair', color: 'bg-warning', text: 'text-warning' },
  { label: 'Good', color: 'bg-primary', text: 'text-primary' },
  { label: 'Strong', color: 'bg-success', text: 'text-success' },
]

function passwordScore(pw) {
  if (!pw) return 0
  let score = 0
  if (pw.length >= 8) score += 1
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 1
  if (/\d/.test(pw)) score += 1
  if (/[^A-Za-z0-9]/.test(pw)) score += 1
  if (pw.length < 6) score = Math.min(score, 1)
  return score
}

const INITIAL = { name: '', email: '', password: '', confirmPassword: '', collegeId: '', courseId: '', year: '' }

export default function Signup() {
  const { signup } = useApp()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const rawRedirect = params.get('redirect')
  const redirect = safeRedirect(rawRedirect, '/profile')
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    document.title = 'Sign up · Bite Connect'
    return () => clearTimeout(timer.current)
  }, [])

  const collegeOptions = useMemo(
    () => [...(Array.isArray(colleges) ? colleges : [])].sort((a, b) => String(a.name).localeCompare(String(b.name))),
    [],
  )
  // When a college is chosen, list its courses first (others still selectable).
  const courseOptions = useMemo(() => {
    const college = form.collegeId ? getCollegeById(form.collegeId) : null
    const offered = new Set(college?.courses ?? [])
    return {
      offered: courses.filter((c) => offered.has(c.id)),
      other: courses.filter((c) => !offered.has(c.id)),
    }
  }, [form.collegeId])

  const score = passwordScore(form.password)
  const strength = STRENGTH[score]
  const matchState = !form.confirmPassword ? null : form.confirmPassword === form.password

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Enter your full name.'
    if (!form.email.trim()) e.email = 'Enter your email address.'
    else if (!EMAIL_RE.test(form.email.trim())) e.email = 'Enter a valid email address.'
    if (!form.password) e.password = 'Create a password.'
    else if (form.password.length < 8) e.password = 'Use at least 8 characters.'
    else if (score < 2) e.password = 'Make it stronger — mix upper and lower case, numbers or symbols.'
    if (!form.confirmPassword) e.confirmPassword = 'Confirm your password.'
    else if (form.confirmPassword !== form.password) e.confirmPassword = 'Passwords do not match.'
    if (!form.collegeId) e.collegeId = 'Select your college.'
    if (!form.courseId) e.courseId = 'Select your course.'
    if (!form.year) e.year = 'Select your academic year.'
    return e
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (loading) return
    const e = validate()
    setErrors(e)
    const first = Object.keys(INITIAL).find((k) => e[k])
    if (first) {
      document.getElementById(`signup-${first}`)?.focus()
      return
    }
    const college = getCollegeById(form.collegeId)
    const course = getCourseById(form.courseId)
    setLoading(true)
    timer.current = setTimeout(() => {
      signup({
        name: form.name.trim().replace(/\s+/g, ' '),
        email: form.email.trim(),
        collegeId: college?.id ?? Number(form.collegeId),
        collegeName: college?.shortName ?? college?.name ?? '',
        course: courseDisplayName(course),
        courseId: course?.id ?? form.courseId,
        year: form.year,
        ...(college?.city ? { location: [college.city, college.state].filter(Boolean).join(', ') } : {}),
      })
      navigate(redirect, { replace: true })
    }, 600)
  }

  const set = (key) => (e) => {
    const value = e.target.value
    setForm((f) => ({ ...f, [key]: value, ...(key === 'collegeId' ? { courseId: '' } : {}) }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const field = (key) => ({
    id: `signup-${key}`,
    value: form[key],
    onChange: set(key),
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `signup-${key}-error` : undefined,
  })
  const inputCls = (key, extra = '') => cn('input', extra, errors[key] && 'border-danger focus:border-danger focus:ring-danger/10')

  return (
    <AuthLayout
      heading="Create your account"
      subheading="Join students from colleges across Uttar Pradesh and India."
      statement="Find your people before you even reach campus."
      benefits={BENEFITS}
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="signup-name" className="label">
            Full name
          </label>
          <input {...field('name')} type="text" autoComplete="name" placeholder="e.g. Priya Verma" className={inputCls('name')} />
          <FieldError id="signup-name-error">{errors.name}</FieldError>
        </div>

        <div>
          <label htmlFor="signup-email" className="label">
            Email
          </label>
          <input {...field('email')} type="email" inputMode="email" autoComplete="email" placeholder="you@college.edu" className={inputCls('email')} />
          <FieldError id="signup-email-error">{errors.email}</FieldError>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-password" className="label">
              Password
            </label>
            <div className="relative">
              <input
                {...field('password')}
                type={show ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="8+ characters"
                className={inputCls('password', 'pr-11')}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? 'Hide passwords' : 'Show passwords'}
                aria-pressed={show}
                className="absolute top-1/2 right-1 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-slate-400 transition hover:text-ink"
              >
                {show ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="signup-confirmPassword" className="label">
              Confirm password
            </label>
            <input
              {...field('confirmPassword')}
              type={show ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Repeat password"
              className={inputCls('confirmPassword')}
            />
          </div>
        </div>

        <div className="-mt-1 space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="grid flex-1 grid-cols-4 gap-1.5" aria-hidden="true">
              {[1, 2, 3, 4].map((i) => (
                <span key={i} className={cn('h-1.5 rounded-full transition-colors', form.password && i <= Math.max(score, 1) ? strength.color : 'bg-slate-200')} />
              ))}
            </div>
            <span className={cn('w-16 text-right text-xs font-semibold', form.password ? strength.text : 'text-muted')} aria-live="polite">
              {form.password ? strength.label : ''}
            </span>
          </div>
          {matchState !== null && (
            <p className={cn('flex items-center gap-1 text-xs font-medium', matchState ? 'text-success' : 'text-danger')} aria-live="polite">
              {matchState ? <Check className="size-3.5" aria-hidden="true" /> : <X className="size-3.5" aria-hidden="true" />}
              {matchState ? 'Passwords match' : 'Passwords do not match yet'}
            </p>
          )}
          <FieldError id="signup-password-error">{errors.password}</FieldError>
          <FieldError id="signup-confirmPassword-error">{errors.confirmPassword}</FieldError>
        </div>

        <div>
          <label htmlFor="signup-collegeId" className="label">
            College
          </label>
          <select {...field('collegeId')} className={inputCls('collegeId', 'cursor-pointer pr-9')}>
            <option value="">Select your college</option>
            {collegeOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
                {c.city ? ` — ${c.city}` : ''}
              </option>
            ))}
          </select>
          <FieldError id="signup-collegeId-error">{errors.collegeId}</FieldError>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_9.5rem]">
          <div className="min-w-0">
            <label htmlFor="signup-courseId" className="label">
              Course
            </label>
            <select {...field('courseId')} className={inputCls('courseId', 'cursor-pointer pr-9')}>
              <option value="">Select course</option>
              {courseOptions.offered.length > 0 ? (
                <>
                  <optgroup label="Offered at this college">
                    {courseOptions.offered.map((c) => (
                      <option key={c.id} value={c.id}>
                        {courseDisplayName(c)}
                      </option>
                    ))}
                  </optgroup>
                  {courseOptions.other.length > 0 && (
                    <optgroup label="Other courses">
                      {courseOptions.other.map((c) => (
                        <option key={c.id} value={c.id}>
                          {courseDisplayName(c)}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </>
              ) : (
                courseOptions.other.map((c) => (
                  <option key={c.id} value={c.id}>
                    {courseDisplayName(c)}
                  </option>
                ))
              )}
            </select>
            <FieldError id="signup-courseId-error">{errors.courseId}</FieldError>
          </div>
          <div>
            <label htmlFor="signup-year" className="label">
              Academic year
            </label>
            <select {...field('year')} className={inputCls('year', 'cursor-pointer pr-9')}>
              <option value="">Select year</option>
              {getStudentYears().map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <FieldError id="signup-year-error">{errors.year}</FieldError>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-muted">
          By creating an account you agree to our{' '}
          <Link to="/terms" className="font-semibold text-ink underline-offset-2 hover:underline">
            Terms
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="font-semibold text-ink underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          . Your password is never stored.
        </p>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link
          to={rawRedirect ? `/login?redirect=${encodeURIComponent(redirect)}` : '/login'}
          className="font-semibold text-primary hover:text-primary-hover"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  )
}
