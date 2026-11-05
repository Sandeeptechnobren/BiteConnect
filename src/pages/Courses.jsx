import { useEffect, useId, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, BookOpen, GraduationCap, Search, X } from 'lucide-react'
import CourseCard from '../components/CourseCard'
import { courses, degreeTypes } from '../data/courses'
import { colleges } from '../data/colleges'
import { collegeCountForCourse } from '../data/selectors'
import { matches, pluralize } from '../utils/format'

const GROUP_COPY = {
  Undergraduate: 'Start here after Class 12 — engineering, computing and science degrees.',
  Postgraduate: 'Specialise after graduation in computing or management.',
}

export default function Courses() {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('All')
  const reduceMotion = useReducedMotion()
  const inputId = useId()

  useEffect(() => {
    document.title = 'Courses · Bite Connect'
  }, [])

  const counts = useMemo(() => Object.fromEntries(courses.map((c) => [c.id, collegeCountForCourse(c.id)])), [])

  const filtered = useMemo(
    () =>
      courses.filter((c) =>
        matches([c.name, c.shortName, c.degree, c.description, c.degreeType].join(' '), query),
      ),
    [query],
  )

  const groups = degreeTypes
    .filter((d) => group === 'All' || group === d)
    .map((d) => ({ degreeType: d, items: filtered.filter((c) => c.degreeType === d) }))
    .filter((g) => g.items.length > 0)

  const totalColleges = Array.isArray(colleges) ? colleges.length : 0

  return (
    <div className="pb-20">
      {/* Header — split layout with a stats strip */}
      <header className="border-b border-line bg-surface">
        <div className="container-page grid gap-8 py-10 md:py-14 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">Courses</p>
            <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Find colleges by the course you want</h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
              Pick a programme to see every college on Bite Connect that offers it — then meet the students already
              studying there.
            </p>
          </div>
          <dl className="grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-background">
            {[
              { label: 'Courses', value: courses.length },
              { label: 'Degree levels', value: degreeTypes.length },
              { label: 'Colleges', value: totalColleges },
            ].map((s) => (
              <div key={s.label} className="px-3 py-4 text-center sm:px-5">
                <dt className="text-xs text-muted">{s.label}</dt>
                <dd className="mt-0.5 text-2xl font-bold text-ink tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* Controls */}
      <div className="sticky top-16 z-20 border-b border-line bg-background/90 backdrop-blur">
        <div className="container-page flex flex-col gap-3 py-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-sm">
            <label htmlFor={inputId} className="sr-only">
              Search courses
            </label>
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. computer, MBA, civil…"
              className="input pr-9 pl-9"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery('')}
                className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-md text-muted hover:bg-slate-100"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto" role="group" aria-label="Degree level">
            {['All', ...degreeTypes].map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={group === g}
                onClick={() => setGroup(g)}
                className={
                  group === g
                    ? 'btn-sm btn shrink-0 bg-secondary text-white'
                    : 'btn-sm btn shrink-0 border border-line bg-surface text-slate-700 hover:bg-slate-50'
                }
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page mt-10 space-y-14">
        {groups.length === 0 ? (
          <div className="card flex flex-col items-center px-6 py-16 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary">
              <BookOpen className="size-7" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-bold">No courses match “{query}”</h2>
            <p className="mt-1 text-sm text-muted">Try a broader term like “engineering” or “computer”.</p>
            <button
              type="button"
              className="btn-primary mt-6"
              onClick={() => {
                setQuery('')
                setGroup('All')
              }}
            >
              Show all courses
            </button>
          </div>
        ) : (
          groups.map((g) => (
            <section key={g.degreeType} aria-labelledby={`grp-${g.degreeType}`} className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
              <div className="lg:sticky lg:top-36 lg:self-start">
                <span className="grid size-11 place-items-center rounded-xl bg-secondary text-white">
                  <GraduationCap className="size-5" aria-hidden="true" />
                </span>
                <h2 id={`grp-${g.degreeType}`} className="mt-3 text-2xl font-bold">
                  {g.degreeType}
                </h2>
                <p className="mt-1 text-sm text-muted">{pluralize(g.items.length, 'course')}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{GROUP_COPY[g.degreeType]}</p>
                <Link
                  to={`/colleges?degree=${g.degreeType}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  All {g.degreeType.toLowerCase()} colleges
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {g.items.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.3, delay: Math.min(i, 6) * 0.04 }}
                  >
                    <CourseCard course={course} count={counts[course.id] ?? 0} />
                  </motion.div>
                ))}
              </div>
            </section>
          ))
        )}

        {/* Closing CTA band (different rhythm from the grids) */}
        <section className="flex flex-col items-start gap-5 rounded-2xl bg-secondary px-6 py-8 text-white sm:flex-row sm:items-center sm:justify-between md:px-10">
          <div>
            <h2 className="text-xl font-bold text-white">Not sure which course fits you?</h2>
            <p className="mt-1 text-sm text-slate-300">Talk to students who are already studying it.</p>
          </div>
          <Link to="/students" className="btn bg-white text-secondary hover:bg-slate-100">
            Meet students
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  )
}
