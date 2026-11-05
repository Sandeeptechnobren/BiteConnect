import ImageWithFallback from '../ImageWithFallback'
import { cn, pluralize } from '../../utils/format'
import { getMutualStudents } from './helpers'

/** Stacked tiny avatars + "N mutual connections". Renders nothing when there are none. */
export default function MutualAvatars({ student, className = '', max = 3 }) {
  const count = Number(student?.mutualConnections) || 0
  if (count <= 0) return null
  const people = getMutualStudents(student, max)
  return (
    <div className={cn('flex min-w-0 items-center gap-2 text-xs text-muted', className)}>
      {people.length > 0 && (
        <span className="flex shrink-0 -space-x-1.5" aria-hidden="true">
          {people.map((p) => (
            <ImageWithFallback
              key={p.id}
              src={p.image}
              alt=""
              name={p.name}
              kind="avatar"
              className="size-5 rounded-full text-[8px] ring-2 ring-white"
            />
          ))}
        </span>
      )}
      <span className="truncate">{pluralize(count, 'mutual connection')}</span>
    </div>
  )
}
