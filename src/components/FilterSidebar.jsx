import { useId, useMemo, useState } from 'react'
import { Check, ChevronDown, Search, X } from 'lucide-react'
import { courses, degreeTypes } from '../data/courses'
import { collegeCountForCourse, getLocations } from '../data/selectors'
import { cn } from '../utils/format'

export const EMPTY_FILTERS = { q: '', location: [], type: [], course: [], degree: [] }
const TYPES = ['Government', 'Private']

const toggle = (list = [], value) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
const sameLower = (a, b) => String(a ?? '').toLowerCase() === String(b ?? '').toLowerCase()

function Section({ title, children, defaultOpen = true, count = 0 }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <section className="border-b border-line py-4 last:border-b-0">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={id}
          className="flex min-h-9 w-full cursor-pointer items-center justify-between gap-2 rounded-lg text-left text-sm font-semibold text-ink"
        >
          <span className="flex items-center gap-2">
            {title}
            {count > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-white">{count}</span>
            )}
          </span>
          <ChevronDown className={cn('size-4 text-muted transition-transform', open && 'rotate-180')} aria-hidden="true" />
        </button>
      </h3>
      <div id={id} hidden={!open} className="mt-2">
        {children}
      </div>
    </section>
  )
}

function CheckRow({ checked, onChange, label, meta }) {
  return (
    <label className="group flex min-h-9 cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1 text-sm text-slate-700 hover:bg-slate-50">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden="true"
        className={cn(
          'grid size-[18px] shrink-0 place-items-center rounded-[5px] border transition peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-1',
          checked ? 'border-primary bg-primary text-white' : 'border-slate-300 bg-white group-hover:border-slate-400',
        )}
      >
        {checked && <Check className="size-3" strokeWidth={3} />}
      </span>
      <span className={cn('min-w-0 flex-1 truncate', checked && 'font-medium text-ink')}>{label}</span>
      {meta != null && <span className="text-xs text-muted tabular-nums">{meta}</span>}
    </label>
  )
}

/**
 * <FilterSidebar filters onChange onReset />
 * filters = { q: string, location: string[], type: string[], course: string[], degree: string[] }
 * onChange receives the complete next filters object.
 */
export default function FilterSidebar({ filters = EMPTY_FILTERS, onChange = () => {}, onReset = () => {}, className = '' }) {
  const f = { ...EMPTY_FILTERS, ...filters }
  const [showAllCourses, setShowAllCourses] = useState(false)
  const searchId = useId()

  const locationGroups = useMemo(() => {
    try {
      const groups = new Map()
      getLocations().forEach(({ city, state }) => {
        if (!city) return
        const key = state || 'Other'
        groups.set(key, [...(groups.get(key) ?? []), city])
      })
      return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b))
    } catch {
      return []
    }
  }, [])

  const courseCounts = useMemo(() => Object.fromEntries(courses.map((c) => [c.id, collegeCountForCourse(c.id)])), [])
  const visibleCourses = showAllCourses ? courses : courses.slice(0, 6)

  const set = (key, value) => onChange({ ...f, [key]: value })
  const hasLocation = (value) => f.location.some((l) => sameLower(l, value))
  const toggleLocation = (value) =>
    set('location', hasLocation(value) ? f.location.filter((l) => !sameLower(l, value)) : [...f.location, value])

  const activeCount = (f.q ? 1 : 0) + f.location.length + f.type.length + f.course.length + f.degree.length

  return (
    <div className={cn('text-sm', className)}>
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-base font-bold text-ink">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          disabled={activeCount === 0}
          className="cursor-pointer rounded-md px-1.5 py-1 text-sm font-medium text-primary hover:underline disabled:cursor-default disabled:text-slate-400 disabled:no-underline"
        >
          Reset all
        </button>
      </div>

      <Section title="Search">
        <label htmlFor={searchId} className="sr-only">
          Search colleges by name
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            id={searchId}
            type="search"
            value={f.q}
            onChange={(e) => set('q', e.target.value)}
            placeholder="College name, city…"
            className="input pr-9 pl-9"
          />
          {f.q && (
            <button
              type="button"
              onClick={() => set('q', '')}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-md text-muted hover:bg-slate-100"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </Section>

      <Section title="Location" count={f.location.length}>
        {locationGroups.length === 0 ? (
          <p className="text-xs text-muted">No locations available.</p>
        ) : (
          <div className="space-y-3">
            {locationGroups.map(([state, cities]) => (
              <fieldset key={state}>
                <legend className="mb-1 flex w-full items-center justify-between px-1.5">
                  <span className="text-[11px] font-semibold tracking-wider text-muted uppercase">{state}</span>
                  {state !== 'Other' && cities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => toggleLocation(state)}
                      aria-pressed={hasLocation(state)}
                      className={cn(
                        'cursor-pointer rounded px-1 text-[11px] font-medium',
                        hasLocation(state) ? 'text-primary' : 'text-slate-500 hover:text-primary',
                      )}
                    >
                      {hasLocation(state) ? 'All selected' : 'Select all'}
                    </button>
                  )}
                </legend>
                {cities.map((city) => (
                  <CheckRow key={city} label={city} checked={hasLocation(city)} onChange={() => toggleLocation(city)} />
                ))}
              </fieldset>
            ))}
          </div>
        )}
      </Section>

      <Section title="College type" count={f.type.length}>
        <div className="grid grid-cols-2 gap-2">
          {TYPES.map((t) => {
            const on = f.type.includes(t)
            return (
              <button
                key={t}
                type="button"
                aria-pressed={on}
                onClick={() => set('type', toggle(f.type, t))}
                className={cn(
                  'min-h-10 cursor-pointer rounded-xl border px-3 text-sm font-medium transition',
                  on ? 'border-primary bg-primary-50 text-primary-700' : 'border-line bg-white text-slate-700 hover:border-slate-300',
                )}
              >
                {t}
              </button>
            )
          })}
        </div>
      </Section>

      <Section title="Course available" count={f.course.length}>
        <div>
          {visibleCourses.map((c) => (
            <CheckRow
              key={c.id}
              label={`${c.shortName === c.degree ? c.degree : `${c.degree} ${c.shortName}`}`}
              meta={courseCounts[c.id]}
              checked={f.course.includes(c.id)}
              onChange={() => set('course', toggle(f.course, c.id))}
            />
          ))}
        </div>
        {courses.length > 6 && (
          <button
            type="button"
            onClick={() => setShowAllCourses((s) => !s)}
            className="mt-1 cursor-pointer px-1.5 py-1 text-xs font-semibold text-primary hover:underline"
          >
            {showAllCourses ? 'Show fewer' : `Show all ${courses.length} courses`}
          </button>
        )}
      </Section>

      <Section title="Degree type" count={f.degree.length}>
        {degreeTypes.map((d) => (
          <CheckRow key={d} label={d} checked={f.degree.includes(d)} onChange={() => set('degree', toggle(f.degree, d))} />
        ))}
      </Section>
    </div>
  )
}
