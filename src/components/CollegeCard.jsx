import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import ImageWithFallback from './ImageWithFallback'
import { courseLabels } from '../data/selectors'
import { cn } from '../utils/format'

const TYPE_STYLES = {
  Government: 'bg-primary-50/95 text-primary-700 ring-primary-200',
  Private: 'bg-violet-50/95 text-violet-700 ring-violet-200',
}

export function TypeChip({ type, className = '' }) {
  if (!type) return null
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 backdrop-blur-sm',
        TYPE_STYLES[type] ?? 'bg-slate-50/95 text-slate-700 ring-slate-200',
        className,
      )}
    >
      {type}
    </span>
  )
}

function RepresentativeBadge({ className = '' }) {
  return (
    <span
      className={cn(
        'rounded-md bg-white/90 px-2 py-0.5 text-[10.5px] font-medium text-slate-700 shadow-sm backdrop-blur-sm',
        className,
      )}
    >
      Representative image
    </span>
  )
}

/**
 * <CollegeCard college variant="default|compact" />
 * Whole card is clickable (mouse), the "View College" link is the accessible target.
 */
export default function CollegeCard({ college, variant = 'default', className = '' }) {
  const navigate = useNavigate()
  if (!college) return null

  const href = `/colleges/${college.slug}`
  const { shown, extra } = courseLabels(college, variant === 'compact' ? 2 : 3)
  const location = [college.city, college.state].filter(Boolean).join(', ')

  const go = (e) => {
    // Let real links / buttons inside the card do their own thing.
    if (e.target.closest('a, button')) return
    navigate(href)
  }

  if (variant === 'compact') {
    return (
      <article
        onClick={go}
        className={cn('card card-hover group flex cursor-pointer gap-3.5 overflow-hidden p-3', className)}
      >
        <div className="relative w-28 shrink-0 sm:w-32">
          <ImageWithFallback
            src={college.image}
            alt={`${college.name} campus`}
            name={college.name}
            className="aspect-[4/3] w-full rounded-xl"
            imgClassName="transition-transform duration-500 group-hover:scale-105"
          />
          {!college.isAuthenticPhoto && (
            <span className="absolute inset-x-1 bottom-1 truncate rounded bg-white/90 px-1 text-center text-[9px] font-medium text-slate-700">
              Representative image
            </span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2">
            <TypeChip type={college.type} className="px-2 py-0.5 text-[10px]" />
            {college.established && <span className="text-[11px] text-muted">Est. {college.established}</span>}
          </div>
          <h3 className="mt-1.5 line-clamp-2 text-sm leading-snug font-semibold text-ink">
            <Link to={href} className="hover:text-primary focus-visible:text-primary">
              {college.name}
            </Link>
          </h3>
          {location && (
            <p className="mt-1 flex items-center gap-1 text-xs text-muted">
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{location}</span>
            </p>
          )}
          {shown.length > 0 && (
            <p className="mt-auto truncate pt-1.5 text-xs font-medium text-slate-600">
              {shown.join(' · ')}
              {extra > 0 && <span className="text-muted"> +{extra}</span>}
            </p>
          )}
        </div>
      </article>
    )
  }

  return (
    <article
      onClick={go}
      className={cn('card card-hover group flex h-full cursor-pointer flex-col overflow-hidden', className)}
    >
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={college.image}
          alt={`${college.name} campus`}
          name={college.name}
          className="aspect-[4/3] w-full"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <TypeChip type={college.type} className="absolute top-3 left-3 shadow-sm" />
        {!college.isAuthenticPhoto && <RepresentativeBadge className="absolute bottom-3 left-3" />}
        {college.logo && (
          <div className="absolute top-3 right-3">
            <ImageWithFallback
              src={college.logo}
              alt=""
              kind="avatar"
              name={college.shortName || college.name}
              className="size-10 rounded-full border-2 border-white bg-white text-xs shadow-md"
              imgClassName="object-contain p-0.5"
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-[17px] leading-snug font-semibold text-ink transition-colors group-hover:text-primary">
          {college.name}
        </h3>
        {location && (
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{location}</span>
          </p>
        )}

        {shown.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Courses offered">
            {shown.map((label) => (
              <li key={label} className="chip">
                {label}
              </li>
            ))}
            {extra > 0 && <li className="chip-primary">+{extra}</li>}
          </ul>
        )}

        {college.description && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{college.description}</p>}

        <div className="mt-auto pt-5">
        <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
            {college.established ? (
              <>
                <CalendarDays className="size-3.5" aria-hidden="true" />
                Est. {college.established}
              </>
            ) : (
              college.category
            )}
          </span>
          <Link
            to={href}
            className="btn-secondary btn-sm group/btn"
            aria-label={`View ${college.name}`}
          >
            View College
            <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
        </div>
      </div>
    </article>
  )
}

export function CollegeCardSkeleton({ variant = 'default' }) {
  if (variant === 'compact') {
    return (
      <div className="card flex gap-3.5 p-3" aria-hidden="true">
        <div className="skeleton aspect-[4/3] w-28 rounded-xl" />
        <div className="flex-1 space-y-2 py-1">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-3 w-2/3" />
        </div>
      </div>
    )
  }
  return (
    <div className="card overflow-hidden" aria-hidden="true">
      <div className="skeleton aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-5 w-4/5" />
        <div className="skeleton h-4 w-1/2" />
        <div className="flex gap-1.5">
          <div className="skeleton h-6 w-12 rounded-full" />
          <div className="skeleton h-6 w-14 rounded-full" />
          <div className="skeleton h-6 w-10 rounded-full" />
        </div>
        <div className="skeleton h-4 w-full" />
        <div className="flex justify-between border-t border-line pt-4">
          <div className="skeleton h-4 w-20" />
          <div className="skeleton h-9 w-28" />
        </div>
      </div>
    </div>
  )
}
