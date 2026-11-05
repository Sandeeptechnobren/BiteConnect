import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import CourseIcon from './CourseIcon'
import { cn, pluralize } from '../utils/format'

/**
 * <CourseCard course count />
 * A bordered "tile" — icon block, degree meta, college count and an arrow that slides on hover.
 * The whole tile is one link to /colleges?course=<id>.
 */
export default function CourseCard({ course, count = 0, className = '' }) {
  if (!course) return null
  const isPG = course.degreeType === 'Postgraduate'

  return (
    <Link
      to={`/colleges?course=${encodeURIComponent(course.id)}`}
      aria-label={`Explore ${pluralize(count, 'college')} offering ${course.name}`}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-5 transition duration-300',
        'hover:border-primary-200 hover:shadow-[var(--shadow-card-hover)] focus-visible:border-primary',
        className,
      )}
    >
      {/* accent bar that grows on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary ring-1 ring-primary-100 transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
          <CourseIcon name={course.icon} className="size-6" />
        </span>
        <span
          className={cn(
            'rounded-full px-2.5 py-1 text-[11px] font-semibold',
            isPG ? 'bg-violet-50 text-violet-700' : 'bg-slate-100 text-slate-700',
          )}
        >
          {isPG ? 'PG' : 'UG'} · {course.degree}
        </span>
      </div>

      <h3 className="mt-4 text-base leading-snug font-semibold text-ink">{course.name}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
        <Clock className="size-3.5" aria-hidden="true" />
        {course.degree} · {course.duration}
      </p>
      {course.description && <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted">{course.description}</p>}

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="text-sm">
          <span className="font-bold text-ink">{count}</span>{' '}
          <span className="text-muted">{count === 1 ? 'college' : 'colleges'}</span>
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Explore
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}
