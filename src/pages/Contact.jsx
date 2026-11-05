import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Clock, Mail, MapPin, Send } from 'lucide-react'
import { FieldError, EMAIL_RE } from '../components/shell/AuthLayout'
import { useApp } from '../context/AppContext'
import { cn } from '../utils/format'

const TOPICS = ['General question', 'College information', 'Report incorrect data', 'Account & profile', 'Partnerships', 'Feedback']

const FAQS = [
  {
    q: 'Is the college information on Bite Connect official?',
    a: 'College names, locations and courses are compiled from public sources for this prototype. Always confirm admissions details, fees and eligibility on the college’s official website before applying.',
  },
  {
    q: 'Where is my profile data stored?',
    a: 'Only in your browser’s localStorage. Nothing is uploaded to a server — you can wipe everything at any time with “Reset demo data” in the profile menu.',
  },
  {
    q: 'Are the student profiles real people?',
    a: 'No. Student profiles in this prototype are mock personas created to demonstrate how connecting with peers works. Any resemblance to real students is coincidental.',
  },
]

const INITIAL = { name: '', email: '', topic: '', message: '' }

function FaqItem({ item, open, onToggle }) {
  const id = useId()
  const reduce = useReducedMotion()
  return (
    <div className="border-b border-line last:border-b-0">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-[15px] font-semibold text-ink transition hover:text-primary"
        >
          {item.q}
          <ChevronDown className={cn('size-5 shrink-0 text-muted transition-transform duration-200', open && 'rotate-180 text-primary')} aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: reduce ? 'auto' : 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: reduce ? 'auto' : 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const { toast, user, isAuthenticated } = useApp()
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    document.title = 'Contact · Bite Connect'
  }, [])

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const prefill = () => setForm((f) => ({ ...f, name: f.name || user?.name || '', email: f.email || user?.email || '' }))

  const onSubmit = (event) => {
    event.preventDefault()
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!EMAIL_RE.test(form.email.trim())) e.email = 'Please enter a valid email address.'
    if (!form.topic) e.topic = 'Choose a topic.'
    if (form.message.trim().length < 10) e.message = 'Your message should be at least 10 characters.'
    setErrors(e)
    const first = ['name', 'email', 'topic', 'message'].find((k) => e[k])
    if (first) {
      document.getElementById(`contact-${first}`)?.focus()
      return
    }
    toast("Thanks! This demo doesn't send messages, but your note looks great.")
    setForm(INITIAL)
  }

  const field = (key) => ({
    id: `contact-${key}`,
    value: form[key],
    onChange: set(key),
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `contact-${key}-error` : undefined,
    className: cn('input', errors[key] && 'border-danger focus:border-danger focus:ring-danger/10'),
  })

  const cards = [
    { Icon: Mail, title: 'Email support', body: <a href="mailto:support@biteconnect.app" className="font-semibold text-primary hover:text-primary-hover">support@biteconnect.app</a> },
    { Icon: MapPin, title: 'Office', body: 'Varanasi, Uttar Pradesh, India' },
    { Icon: Clock, title: 'Response time', body: 'Usually within 1–2 business days (Mon–Sat)' },
  ]

  return (
    <div className="pb-20">
      <section className="border-b border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">We’d love to hear from you</h1>
          <p className="mt-3 max-w-2xl text-base text-muted">
            Questions about a college, a correction to our data, or feedback on the prototype — send us a note and the team will get back to
            you.
          </p>
        </div>
      </section>

      <div className="container-page mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10">
        <section aria-labelledby="contact-form-title" className="card p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 id="contact-form-title" className="text-xl font-bold">
                Send a message
              </h2>
              <p className="mt-1 text-sm text-muted">All fields are required.</p>
            </div>
            {isAuthenticated && (
              <button type="button" onClick={prefill} className="btn-secondary btn-sm">
                Use my profile details
              </button>
            )}
          </div>

          <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="label">
                Name
              </label>
              <input {...field('name')} type="text" autoComplete="name" placeholder="Your full name" />
              <FieldError id="contact-name-error">{errors.name}</FieldError>
            </div>
            <div>
              <label htmlFor="contact-email" className="label">
                Email
              </label>
              <input {...field('email')} type="email" inputMode="email" autoComplete="email" placeholder="you@college.edu" />
              <FieldError id="contact-email-error">{errors.email}</FieldError>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contact-topic" className="label">
                Topic
              </label>
              <select {...field('topic')} className={cn(field('topic').className, 'cursor-pointer')}>
                <option value="">Select a topic</option>
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <FieldError id="contact-topic-error">{errors.topic}</FieldError>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contact-message" className="label">
                Message
              </label>
              <textarea {...field('message')} rows={6} maxLength={2000} placeholder="How can we help?" className={cn(field('message').className, 'resize-y')} />
              <div className="mt-1 flex justify-between gap-3">
                <FieldError id="contact-message-error">{errors.message}</FieldError>
                <span className="ml-auto pt-1.5 text-xs text-muted">{form.message.length}/2000</span>
              </div>
            </div>
            <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted">Demo only — messages are not sent anywhere.</p>
              <button type="submit" className="btn-primary">
                <Send className="size-4" aria-hidden="true" /> Send message
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-4">
          {cards.map(({ Icon, title, body }) => (
            <div key={title} className="card flex items-start gap-4 p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 text-sm">
                <h2 className="font-semibold text-ink">{title}</h2>
                <div className="mt-0.5 break-words text-muted">{body}</div>
              </div>
            </div>
          ))}
          <div className="rounded-2xl bg-secondary p-5 text-sm text-slate-300">
            <p className="font-semibold text-white">Looking for a college?</p>
            <p className="mt-1">Browse colleges across Uttar Pradesh by course, city and type.</p>
            <Link to="/colleges" className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary-200 hover:text-white">
              Discover colleges →
            </Link>
          </div>
        </aside>
      </div>

      <section aria-labelledby="faq-title" className="container-page mt-16">
        <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="mt-2 text-2xl font-bold">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-sm text-muted">Quick answers about how this prototype works.</p>
          </div>
          <div className="card px-5 sm:px-6">
            {FAQS.map((item, i) => (
              <FaqItem key={item.q} item={item} open={openFaq === i} onToggle={() => setOpenFaq((cur) => (cur === i ? -1 : i))} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
