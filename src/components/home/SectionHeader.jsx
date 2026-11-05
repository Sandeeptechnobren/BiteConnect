import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

// Eyebrow + heading + description, with an optional "View all" link on the right.
export default function SectionHeader({ id, eyebrow, title, description, linkTo, linkLabel, align = 'left', children }) {
  const centered = align === 'center'
  return (
    <Reveal
      className={
        centered
          ? 'mx-auto max-w-2xl text-center'
          : 'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'
      }
    >
      <div className={centered ? '' : 'max-w-2xl'}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id} className="mt-2 text-2xl font-bold sm:text-3xl">
          {title}
        </h2>
        {description && <p className="mt-3 text-base text-muted">{description}</p>}
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
        >
          {linkLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      )}
      {children}
    </Reveal>
  )
}
