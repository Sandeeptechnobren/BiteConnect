import { Link } from 'react-router-dom'
import { cn } from '../utils/format'

/** Brand mark: two overlapping conversation bubbles joined by a connection link. */
export function LogoMark({ className = 'size-9' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="9" fill="#2563EB" />
      <path
        d="M10 7h7a4 4 0 0 1 4 4v3.2H16a4 4 0 0 0-4 4V19l-2.6 2.3a.6.6 0 0 1-1-.45V18.6A4 4 0 0 1 6 15v-4a4 4 0 0 1 4-4Z"
        fill="#fff"
        fillOpacity=".55"
      />
      <path
        d="M16 13.2h7a4 4 0 0 1 4 4V21a4 4 0 0 1-2.4 3.66v2.24a.6.6 0 0 1-1 .45L20.9 25H16a4 4 0 0 1-4-4v-3.8a4 4 0 0 1 4-4Z"
        fill="#fff"
      />
      <path d="M17.2 19.1h4.6" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16.9" cy="19.1" r="1.75" fill="#2563EB" />
      <circle cx="22.1" cy="19.1" r="1.75" fill="#2563EB" />
    </svg>
  )
}

/**
 * <Logo variant="dark|light" showText />
 * dark  → ink wordmark for light backgrounds (navbar)
 * light → white wordmark for dark backgrounds (footer, auth panel)
 */
export default function Logo({ variant = 'dark', showText = true, className = '', onClick }) {
  const light = variant === 'light'
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Bite Connect home"
      className={cn('inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-lg', className)}
    >
      <LogoMark className="size-9 shrink-0" />
      {showText && (
        <span className={cn('text-lg leading-none font-extrabold tracking-tight whitespace-nowrap', light ? 'text-white' : 'text-ink')}>
          Bite <span className={light ? 'text-primary-200' : 'text-primary'}>Connect</span>
        </span>
      )}
    </Link>
  )
}
