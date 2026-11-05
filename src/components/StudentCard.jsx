import { Link } from 'react-router-dom'
import { GraduationCap, MapPin } from 'lucide-react'
import ImageWithFallback from './ImageWithFallback'
import ConnectionButton from './ConnectionButton'
import MutualAvatars from './students/MutualAvatars'
import { cn } from '../utils/format'
import { collegeLabel, list, safeCollege } from './students/helpers'

function CollegeLink({ student, className = '' }) {
  const college = safeCollege(student?.collegeId)
  const label = collegeLabel(student)
  if (!label) return null
  const content = (
    <>
      <GraduationCap className="size-3.5 shrink-0 text-slate-400" aria-hidden="true" />
      <span className="truncate">{label}</span>
    </>
  )
  return college?.slug ? (
    <Link
      to={`/colleges/${college.slug}`}
      className={cn('inline-flex min-w-0 max-w-full items-center gap-1.5 text-xs text-muted hover:text-primary', className)}
    >
      {content}
    </Link>
  ) : (
    <span className={cn('inline-flex min-w-0 max-w-full items-center gap-1.5 text-xs text-muted', className)}>{content}</span>
  )
}

const meta = (student) => [student?.course, student?.year].filter(Boolean).join(' · ')

/**
 * <StudentCard student variant="default|compact|row" showMutual actions />
 * `actions` (or children) replaces the ConnectionButton in the row variant.
 */
export default function StudentCard({ student, variant = 'default', showMutual = false, actions, children, className = '' }) {
  if (!student) return null
  const href = `/students/${student.id}`
  const skills = list(student.skills)
  const customActions = actions ?? children

  if (variant === 'compact') {
    return (
      <div className={cn('flex gap-3 py-3', className)}>
        <Link to={href} tabIndex={-1} aria-hidden="true" className="shrink-0">
          <ImageWithFallback src={student.image} alt="" name={student.name} kind="avatar" className="size-12 rounded-full" />
        </Link>
        <div className="min-w-0 flex-1">
          <Link to={href} className="block truncate text-sm font-semibold text-ink hover:text-primary hover:underline">
            {student.name}
          </Link>
          <p className="truncate text-xs text-muted">{student.headline || meta(student)}</p>
          <CollegeLink student={student} className="mt-0.5" />
          {showMutual && <MutualAvatars student={student} className="mt-1.5" max={2} />}
          <div className="mt-2">{customActions ?? <ConnectionButton studentId={student.id} size="sm" />}</div>
        </div>
      </div>
    )
  }

  if (variant === 'row') {
    return (
      <div className={cn('flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4', className)}>
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <Link to={href} tabIndex={-1} aria-hidden="true" className="shrink-0">
            <ImageWithFallback src={student.image} alt="" name={student.name} kind="avatar" className="size-14 rounded-full" />
          </Link>
          <div className="min-w-0 flex-1">
            <Link to={href} className="block truncate font-semibold text-ink hover:text-primary hover:underline">
              {student.name}
            </Link>
            {meta(student) && <p className="truncate text-sm text-muted">{meta(student)}</p>}
            <CollegeLink student={student} className="mt-0.5" />
            {showMutual && <MutualAvatars student={student} className="mt-1.5" />}
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
          {customActions ?? <ConnectionButton studentId={student.id} size="sm" />}
        </div>
      </div>
    )
  }

  return (
    <article className={cn('card card-hover flex h-full flex-col overflow-hidden', className)}>
      <div className="h-16 border-b border-primary-100 bg-primary-50" aria-hidden="true" />
      <div className="flex flex-1 flex-col items-center px-4 pb-4 text-center">
        <Link to={href} tabIndex={-1} aria-hidden="true" className="-mt-10 rounded-full">
          <ImageWithFallback
            src={student.image}
            alt=""
            name={student.name}
            kind="avatar"
            className="size-20 rounded-full text-xl ring-4 ring-white"
          />
        </Link>
        <h3 className="mt-3 w-full truncate text-base font-semibold">
          <Link to={href} className="hover:text-primary hover:underline">
            {student.name}
          </Link>
        </h3>
        {meta(student) && <p className="w-full truncate text-sm text-muted">{meta(student)}</p>}
        <CollegeLink student={student} className="mt-1 justify-center" />
        {student.location && (
          <p className="mt-0.5 inline-flex max-w-full items-center gap-1 text-xs text-slate-400">
            <MapPin className="size-3 shrink-0" aria-hidden="true" />
            <span className="truncate">{student.location}</span>
          </p>
        )}
        {skills.length > 0 && (
          <ul className="mt-3 flex flex-wrap justify-center gap-1.5" aria-label="Skills">
            {skills.slice(0, 3).map((skill) => (
              <li key={skill} className="chip max-w-[9rem] truncate">
                {skill}
              </li>
            ))}
            {skills.length > 3 && <li className="chip bg-primary-50 text-primary-700">+{skills.length - 3}</li>}
          </ul>
        )}
        <div className="mt-auto w-full pt-4">
          {showMutual && (
            <div className="mb-3 flex justify-center">
              <MutualAvatars student={student} />
            </div>
          )}
          {customActions ?? <ConnectionButton studentId={student.id} fullWidth />}
        </div>
      </div>
    </article>
  )
}
