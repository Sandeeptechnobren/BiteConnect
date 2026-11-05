import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react'
import Logo from '../Logo'
import ImageWithFallback from '../ImageWithFallback'
import { colleges } from '../../data/colleges'

function campusImage() {
  try {
    const list = Array.isArray(colleges) ? colleges : []
    const withPhoto = list.find((c) => c?.isAuthenticPhoto && (c.gallery?.[0]?.src || c.image)) ?? list[0]
    if (!withPhoto) return { src: null, name: 'Campus' }
    return { src: withPhoto.gallery?.[0]?.src ?? withPhoto.image, name: withPhoto.name }
  } catch {
    return { src: null, name: 'Campus' }
  }
}

/** Full-screen split layout used by /login and /signup (rendered outside <Layout>). */
export default function AuthLayout({ heading, subheading, statement, benefits = [], children }) {
  const reduce = useReducedMotion()
  const photo = campusImage()

  return (
    <div className="flex min-h-dvh bg-background">
      <aside className="relative hidden w-[46%] max-w-[720px] shrink-0 overflow-hidden bg-secondary lg:block">
        <ImageWithFallback src={photo.src} alt={`${photo.name} campus`} kind="college" name={photo.name} className="absolute inset-0 size-full" loading="eager" />
        <div className="absolute inset-0 bg-secondary/75" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" aria-hidden="true" />
        <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
          <Logo variant="light" />
          <div className="max-w-md">
            <h2 className="text-3xl leading-tight font-extrabold text-white xl:text-4xl">{statement}</h2>
            <ul className="mt-8 space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px] text-slate-200">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary-200" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-xs text-slate-400">Photo: {photo.name}</p>
          </div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between px-4 pt-4 sm:px-8 sm:pt-6">
          <div className="lg:invisible">
            <Logo />
          </div>
          <Link to="/" className="btn-ghost btn-sm min-h-11">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to site
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md"
          >
            <div className="card p-6 sm:p-8">
              <h1 className="text-2xl font-extrabold sm:text-[26px]">{heading}</h1>
              {subheading && <p className="mt-1.5 text-sm text-muted">{subheading}</p>}
              <div className="mt-6">{children}</div>
            </div>
            <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
              <ShieldCheck className="size-4 shrink-0 text-success" aria-hidden="true" />
              This is a demo — no data leaves your browser.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export function FieldError({ id, children }) {
  if (!children) return null
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-danger">
      {children}
    </p>
  )
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
