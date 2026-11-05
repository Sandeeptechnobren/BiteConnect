import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Logo from './Logo'

// lucide 1.x ships no brand icons — small inline SVGs instead.
const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/biteconnect',
    icon: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/biteconnect',
    icon: (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.3" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.6" cy="6.4" r="1.25" />
      </>
    ),
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/biteconnect',
    icon: <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" />,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@biteconnect',
    icon: (
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    ),
  },
]

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { to: '/colleges', label: 'Discover Colleges' },
      { to: '/students', label: 'Explore Students' },
      { to: '/courses', label: 'Explore Courses' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/contact', label: 'Contact Us' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms and Conditions' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-secondary text-slate-300">
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo variant="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Bite Connect helps students discover colleges, explore courses and connect with peers from campuses across India — all in one
              place.
            </p>
            <ul className="mt-6 flex items-center gap-2" aria-label="Social media">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Bite Connect on ${s.label} (opens in a new tab)`}
                    className="grid size-11 place-items-center rounded-xl bg-white/5 text-slate-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true" focusable="false">
                      {s.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-xs font-semibold tracking-[0.14em] text-white uppercase">{col.title}</h2>
                <ul className="mt-4 space-y-1">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="inline-flex min-h-10 items-center text-sm text-slate-400 transition hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Bite Connect. All rights reserved.
            <span className="mx-2 hidden text-slate-600 sm:inline" aria-hidden="true">
              |
            </span>
            <span className="block sm:inline">Prototype with mock data.</span>
          </p>
          <a
            href="https://www.kineticsoftwaresolution.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-1.5 text-slate-300 transition hover:text-white"
          >
            Created with
            <Heart className="size-3.5 fill-rose-500 text-rose-500" aria-hidden="true" />
            <span className="sr-only">love</span> by <span className="font-semibold text-white">Kinetic Software Solutions</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
