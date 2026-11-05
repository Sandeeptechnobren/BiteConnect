import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Search, SlidersHorizontal, Sparkles, UsersRound, X } from 'lucide-react'
import StudentCard from '../components/StudentCard'
import Modal from '../components/Modal'
import SkillsFilter from '../components/students/SkillsFilter'
import StudentCardSkeleton from '../components/students/StudentCardSkeleton'
import { useApp } from '../context/AppContext'
import { getStudentYears } from '../data/selectors'
import { cn, matches, pluralize } from '../utils/format'
import { allColleges, allCourses, allStudents, getSuggestions, list } from '../components/students/helpers'

const PAGE_SIZE = 12

function readParams(params) {
  try {
    return {
      q: params.get('q') ?? '',
      college: params.get('college') ?? '',
      course: params.get('course') ?? '',
      year: params.get('year') ?? '',
      skills: (params.get('skills') ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    }
  } catch {
    return { q: '', college: '', course: '', year: '', skills: [] }
  }
}

// `college` may be an id or a slug (Home / College Details link with either).
const findCollege = (colleges, value) => (value ? colleges.find((c) => String(c.id) === value || c.slug === value) ?? null : null)

function FilterSelect({ id, label, value, onChange, children, srOnlyLabel = false }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={srOnlyLabel ? 'sr-only' : 'label'}>
        {label}
      </label>
      <select id={id} className={cn('input cursor-pointer', value && 'border-primary/50 bg-primary-50/40')} value={value} onChange={(e) => onChange(e.target.value)}>
        {children}
      </select>
    </div>
  )
}

export default function ExploreStudents() {
  const [params, setParams] = useSearchParams()
  const { user, getStatus } = useApp()
  const reduce = useReducedMotion()
  const filters = readParams(params)
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const students = useMemo(() => allStudents(), [])
  const colleges = useMemo(() => allColleges(), [])
  const courses = useMemo(() => allCourses(), [])
  const years = getStudentYears()
  const skillOptions = useMemo(() => [...new Set(students.flatMap((s) => list(s.skills)))].sort((a, b) => a.localeCompare(b)), [students])

  const selectedCollege = findCollege(colleges, filters.college)
  const filterKey = JSON.stringify(filters)
  const activeCount = [filters.q, filters.college, filters.course, filters.year].filter(Boolean).length + filters.skills.length
  const hasFilters = activeCount > 0

  const update = (patch) => {
    try {
      const next = new URLSearchParams(params)
      Object.entries(patch).forEach(([key, value]) => {
        const v = Array.isArray(value) ? value.join(',') : String(value ?? '')
        if (v.trim()) next.set(key, v)
        else next.delete(key)
      })
      setParams(next, { replace: true })
    } catch {
      /* ignore malformed params */
    }
  }
  const clearAll = () => setParams(new URLSearchParams(), { replace: true })

  // Brief skeleton on every filter change + reset pagination.
  useEffect(() => {
    setLoading(true)
    setVisible(PAGE_SIZE)
    const t = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(t)
  }, [filterKey])

  const results = useMemo(() => {
    const f = JSON.parse(filterKey)
    const college = findCollege(colleges, f.college)
    const wanted = f.skills.map((s) => s.toLowerCase())
    return students.filter((s) => {
      if (f.q) {
        const hay = [s.name, ...list(s.skills), ...list(s.interests)]
        if (!hay.some((h) => matches(h, f.q))) return false
      }
      if (f.college && (college ? s.collegeId !== college.id : true)) return false
      if (f.course && s.courseId !== f.course) return false
      if (f.year && s.year !== f.year) return false
      if (wanted.length) {
        const have = list(s.skills).map((x) => String(x).toLowerCase())
        if (!wanted.every((w) => have.includes(w))) return false
      }
      return true
    })
  }, [filterKey, students, colleges])

  // Not keyed on getStatus so a suggestion stays visible (as "Request Sent") after connecting.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const suggestions = useMemo(() => (hasFilters ? [] : getSuggestions(user, getStatus, 6)), [hasFilters, user?.collegeId, user?.courseId])

  const activeChips = [
    filters.q && { key: 'q', label: `"${filters.q}"`, clear: () => update({ q: '' }) },
    filters.college && { key: 'college', label: selectedCollege?.shortName || selectedCollege?.name || filters.college, clear: () => update({ college: '' }) },
    filters.course && { key: 'course', label: courses.find((c) => c.id === filters.course)?.shortName || filters.course, clear: () => update({ course: '' }) },
    filters.year && { key: 'year', label: filters.year, clear: () => update({ year: '' }) },
    ...filters.skills.map((s) => ({ key: `skill-${s}`, label: s, clear: () => update({ skills: filters.skills.filter((x) => x !== s) }) })),
  ].filter(Boolean)

  const collegeValue = selectedCollege ? String(selectedCollege.id) : ''

  const selects = (prefix, srOnly) => (
    <>
      <FilterSelect id={`${prefix}-college`} label="College" value={collegeValue} onChange={(v) => update({ college: v })} srOnlyLabel={srOnly}>
        <option value="">All colleges</option>
        {colleges.map((c) => (
          <option key={c.id} value={String(c.id)}>
            {c.shortName || c.name}
          </option>
        ))}
      </FilterSelect>
      <FilterSelect id={`${prefix}-course`} label="Course" value={filters.course} onChange={(v) => update({ course: v })} srOnlyLabel={srOnly}>
        <option value="">All courses</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </FilterSelect>
      <FilterSelect id={`${prefix}-year`} label="Year" value={filters.year} onChange={(v) => update({ year: v })} srOnlyLabel={srOnly}>
        <option value="">Any year</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </FilterSelect>
    </>
  )

  const shown = results.slice(0, visible)

  return (
    <div className="pb-16">
      {/* Header */}
      <header className="border-b border-line bg-surface">
        <div className="container-page py-8 sm:py-10">
          <p className="eyebrow">Student network</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold sm:text-4xl">Discover Students</h1>
              <p className="mt-2 max-w-2xl text-muted">
                Find classmates, seniors and peers across colleges. Filter by college, course, year or skills and grow your network.
              </p>
            </div>
            <p className="inline-flex shrink-0 items-center gap-2 text-sm text-muted">
              <UsersRound className="size-4 text-primary" aria-hidden="true" />
              <span>
                <strong className="text-ink">{students.length}</strong> students on Bite Connect
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Filter toolbar (sticky under the navbar) */}
      <div className="sticky top-16 z-20 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
        <div className="container-page py-3">
          <div className="flex items-center gap-2 lg:grid lg:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))_auto] lg:gap-3">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <label htmlFor="students-q" className="sr-only">
                Search students by name, skill or interest
              </label>
              <input
                id="students-q"
                type="search"
                className="input pl-10"
                placeholder="Search name, skill or interest"
                value={filters.q}
                onChange={(e) => update({ q: e.target.value })}
              />
            </div>
            <div className="hidden lg:contents">
              {selects('d', true)}
              <SkillsFilter options={skillOptions} selected={filters.skills} onChange={(v) => update({ skills: v })} />
              <button type="button" className="btn-ghost" onClick={clearAll} disabled={!hasFilters}>
                Clear all
              </button>
            </div>
            <button type="button" className="btn-secondary shrink-0 lg:hidden" onClick={() => setDrawerOpen(true)} aria-label={`Open filters${activeCount ? ` (${activeCount} active)` : ''}`}>
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Filters</span>
              {activeCount > 0 && <span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] text-white">{activeCount}</span>}
            </button>
          </div>
          {activeChips.length > 0 && (
            <ul className="no-scrollbar mt-3 flex gap-2 overflow-x-auto" aria-label="Active filters">
              {activeChips.map((chip) => (
                <li key={chip.key} className="shrink-0">
                  <button type="button" onClick={chip.clear} className="chip-primary min-h-8 cursor-pointer pr-2 hover:bg-primary-100" aria-label={`Remove filter ${chip.label}`}>
                    <span className="max-w-[12rem] truncate">{chip.label}</span>
                    <X className="size-3.5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="container-page pt-8">
        {/* People you may know */}
        {!hasFilters && suggestions.length > 0 && (
          <section aria-labelledby="pymk" className="mb-10 rounded-2xl border border-primary-100 bg-primary-50/50 p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" aria-hidden="true" />
              <h2 id="pymk" className="text-lg font-bold">
                People you may know
              </h2>
            </div>
            <p className="mt-1 text-sm text-muted">Students who share your college, course or skills.</p>
            <ul className="no-scrollbar -mx-4 mt-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6">
              {suggestions.map((s) => (
                <li key={s.id} className="w-64 shrink-0 snap-start rounded-xl border border-line bg-surface px-4 py-1 shadow-sm">
                  <StudentCard student={s} variant="compact" showMutual />
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold" aria-live="polite">
            {loading ? 'Searching…' : hasFilters ? `${pluralize(results.length, 'student')} found` : 'All students'}
          </h2>
          {!loading && results.length > 0 && (
            <p className="text-sm text-muted">
              Showing {Math.min(visible, results.length)} of {results.length}
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5">
            {Array.from({ length: 8 }, (_, i) => (
              <StudentCardSkeleton key={i} />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="card flex flex-col items-center px-6 py-16 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-primary-50 text-primary">
              <UsersRound className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">No students match these filters</h3>
            <p className="mt-1 max-w-md text-sm text-muted">Try removing a filter or searching for a different skill, college or name.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button type="button" className="btn-primary" onClick={clearAll}>
                Clear all filters
              </button>
              <Link to="/colleges" className="btn-secondary">
                Browse colleges
              </Link>
            </div>
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5">
              {shown.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(i % PAGE_SIZE, 8) * 0.03 }}
                >
                  <StudentCard student={s} showMutual />
                </motion.li>
              ))}
            </ul>
            {visible < results.length && (
              <div className="mt-10 flex justify-center">
                <button type="button" className="btn-secondary min-w-48" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                  Load more ({results.length - visible} more)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile / tablet filters */}
      <Modal
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Filter students"
        variant="drawer-right"
        footer={
          <div className="flex gap-2">
            <button type="button" className="btn-secondary flex-1" onClick={clearAll} disabled={!hasFilters}>
              Clear all
            </button>
            <button type="button" className="btn-primary flex-1" onClick={() => setDrawerOpen(false)}>
              Show {pluralize(results.length, 'result')}
            </button>
          </div>
        }
      >
        <div className="space-y-5">
          {selects('m', false)}
          <fieldset>
            <legend className="label">Skills {filters.skills.length > 0 && <span className="text-muted">({filters.skills.length} selected)</span>}</legend>
            <SkillsFilter inline options={skillOptions} selected={filters.skills} onChange={(v) => update({ skills: v })} />
          </fieldset>
        </div>
      </Modal>
    </div>
  )
}
