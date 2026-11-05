import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, BookOpen, Building2, MapPin, SearchX, Search as SearchIcon, Users, X } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import ImageWithFallback from '../components/ImageWithFallback'
import CourseIcon from '../components/CourseIcon'
import Highlight from '../components/shell/Highlight'
import { POPULAR_SEARCHES, courseDisplayName, hrefFor, searchAll } from '../components/shell/search'
import { cn, pluralize } from '../utils/format'

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'colleges', label: 'Colleges', Icon: Building2 },
  { key: 'students', label: 'Students', Icon: Users },
  { key: 'courses', label: 'Courses', Icon: BookOpen },
  { key: 'locations', label: 'Locations', Icon: MapPin },
]
const PREVIEW = { colleges: 6, students: 6, courses: 4, locations: 4 }

function readQuery(params) {
  try {
    return (params.get('q') ?? '').slice(0, 120)
  } catch {
    return ''
  }
}

function SectionHeader({ title, count, onShowAll }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 className="text-lg font-bold">
        {title} <span className="ml-1 text-sm font-medium text-muted">({count})</span>
      </h2>
      {onShowAll && (
        <button type="button" onClick={onShowAll} className="btn-ghost btn-sm text-primary hover:text-primary-hover">
          View all <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

function CollegeResult({ college, q }) {
  return (
    <Link to={hrefFor.college(college)} className="card card-hover group flex gap-4 overflow-hidden p-3">
      <ImageWithFallback src={college.image} alt={`${college.name} campus`} kind="college" name={college.name} className="aspect-[4/3] w-28 shrink-0 rounded-xl sm:w-36" />
      <div className="min-w-0 flex-1 py-1">
        <h3 className="line-clamp-2 text-[15px] leading-snug font-semibold group-hover:text-primary">
          <Highlight text={college.name} query={q} />
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">
            <Highlight text={[college.city, college.state].filter(Boolean).join(', ')} query={q} />
          </span>
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {college.type && <span className="chip-primary">{college.type}</span>}
          {college.category && <span className="chip max-sm:hidden">{college.category}</span>}
        </div>
      </div>
    </Link>
  )
}

function StudentResult({ student, q }) {
  const skills = (student.skills ?? []).slice(0, 3)
  return (
    <Link to={hrefFor.student(student)} className="card card-hover group flex items-start gap-3.5 p-4">
      <ImageWithFallback src={student.image} alt={student.name} kind="avatar" name={student.name} className="size-14 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold group-hover:text-primary">
          <Highlight text={student.name} query={q} />
        </h3>
        <p className="truncate text-sm text-muted">
          <Highlight text={[student.course, student.year].filter(Boolean).join(' · ')} query={q} />
        </p>
        <p className="truncate text-sm text-muted">
          <Highlight text={student.collegeName} query={q} />
        </p>
        {skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span key={s} className="chip">
                <Highlight text={s} query={q} />
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

function CourseResult({ course, q }) {
  return (
    <Link to={hrefFor.course(course)} className="card card-hover group flex items-center gap-4 p-4">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary">
        <CourseIcon name={course.icon} className="size-6" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold group-hover:text-primary">
          <Highlight text={courseDisplayName(course)} query={q} />
        </h3>
        <p className="text-sm text-muted">
          {course.degreeType} · {course.duration} · {pluralize(course.collegeCount ?? 0, 'college')}
        </p>
      </div>
      <ArrowRight className="size-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
    </Link>
  )
}

function LocationResult({ location, q }) {
  return (
    <Link to={hrefFor.location(location)} className="card card-hover group flex items-center gap-4 p-4">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600">
        <MapPin className="size-6" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold group-hover:text-primary">
          <Highlight text={location.city} query={q} />
        </h3>
        <p className="text-sm text-muted">
          {location.state ? `${location.state} · ` : ''}
          {pluralize(location.collegeCount ?? 0, 'college')}
        </p>
      </div>
      <ArrowRight className="size-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
    </Link>
  )
}

function Skeleton() {
  return (
    <div aria-hidden="true" className="space-y-8">
      {[0, 1].map((s) => (
        <div key={s}>
          <div className="skeleton mb-4 h-6 w-40" />
          <div className="grid gap-4 md:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="card flex gap-4 p-3">
                <div className="skeleton aspect-[4/3] w-28 shrink-0 rounded-xl sm:w-36" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="skeleton h-4 w-4/5" />
                  <div className="skeleton h-3 w-1/2" />
                  <div className="skeleton h-5 w-24 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Suggestions({ title, onPick }) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {POPULAR_SEARCHES.map((term) => (
          <button key={term} type="button" onClick={() => onPick(term)} className="btn-secondary btn-sm rounded-full">
            <SearchIcon className="size-3.5 text-muted" aria-hidden="true" /> {term}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Search() {
  const [params, setParams] = useSearchParams()
  const q = readQuery(params).trim()
  const [tab, setTab] = useState('all')
  const [loading, setLoading] = useState(Boolean(q))

  useEffect(() => {
    if (!q) {
      setLoading(false)
      return undefined
    }
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(t)
  }, [q])

  useEffect(() => {
    document.title = q ? `“${q}” — Search · Bite Connect` : 'Search · Bite Connect'
  }, [q])

  const results = useMemo(() => searchAll(q), [q])
  const counts = {
    all: results.total,
    colleges: results.colleges.length,
    students: results.students.length,
    courses: results.courses.length,
    locations: results.locations.length,
  }

  const pick = (term) => {
    setTab('all')
    setParams({ q: term })
  }
  const clearSearch = () => {
    setTab('all')
    setParams({})
  }

  const show = (key) => tab === 'all' || tab === key
  const limit = (key, list) => (tab === 'all' ? list.slice(0, PREVIEW[key]) : list)
  const showAll = (key) => (tab === 'all' && counts[key] > PREVIEW[key] ? () => setTab(key) : undefined)

  return (
    <div className="pb-20">
      <section className="border-b border-line bg-surface">
        <div className="container-page py-8 sm:py-10">
          <p className="eyebrow">Search</p>
          <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            {q ? (
              <>
                Results for <span className="text-primary">“{q}”</span>
              </>
            ) : (
              'Search Bite Connect'
            )}
          </h1>
          <p className="mt-2 text-sm text-muted">Find colleges, students, courses and locations — search also matches skills, interests and cities.</p>
          <div className="mt-6 flex max-w-3xl items-center gap-3">
            <SearchBar variant="page" defaultValue={q} autoFocus={!q} className="flex-1" />
            {q && (
              <button type="button" onClick={clearSearch} className="btn-secondary shrink-0 max-sm:px-3">
                <X className="size-4" aria-hidden="true" />
                <span className="max-sm:sr-only">Clear</span>
              </button>
            )}
          </div>

          {q && (
            <div role="tablist" aria-label="Result categories" className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              {TABS.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={cn(
                    'inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold transition',
                    tab === key ? 'border-primary bg-primary text-white' : 'border-line bg-surface text-slate-700 hover:border-slate-300 hover:bg-slate-50',
                  )}
                >
                  {Icon && <Icon className="size-4" aria-hidden="true" />}
                  {label}
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.5 text-[11px] leading-none font-bold',
                      tab === key ? 'bg-white/20 text-white' : 'bg-slate-100 text-muted',
                    )}
                  >
                    {counts[key]}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="container-page pt-8 sm:pt-10" aria-live="polite" aria-busy={loading}>
        {!q ? (
          <div className="card mx-auto max-w-2xl px-6 py-14 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-50 text-primary">
              <SearchIcon className="size-7" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-xl font-bold">What are you looking for?</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Try a college name, a course like BCA, a city such as Varanasi, or a skill like React.
            </p>
            <div className="mt-6">
              <Suggestions title="Suggested searches" onPick={pick} />
            </div>
          </div>
        ) : loading ? (
          <Skeleton />
        ) : results.total === 0 ? (
          <div className="card mx-auto max-w-2xl px-6 py-14 text-center">
            <span className="relative mx-auto grid size-20 place-items-center rounded-full bg-slate-100 text-slate-400">
              <SearchX className="size-9" aria-hidden="true" />
              <span className="absolute -right-1 -bottom-1 size-6 rounded-full border-4 border-surface bg-primary-100" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-xl font-bold">No results for “{q}”</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Check the spelling, use fewer words, or try a broader term like a city or course name.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={clearSearch} className="btn-secondary">
                Clear search
              </button>
              <Link to="/colleges" className="btn-primary">
                Browse all colleges
              </Link>
            </div>
            <div className="mt-8 border-t border-line pt-6">
              <Suggestions title="Or try one of these" onPick={pick} />
            </div>
          </div>
        ) : tab !== 'all' && counts[tab] === 0 ? (
          <div className="card mx-auto max-w-xl px-6 py-12 text-center">
            <p className="font-semibold">No {tab} match “{q}”.</p>
            <button type="button" onClick={() => setTab('all')} className="btn-secondary mt-4">
              Show all results
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {show('colleges') && counts.colleges > 0 && (
              <section aria-label="Colleges">
                <SectionHeader title="Colleges" count={counts.colleges} onShowAll={showAll('colleges')} />
                <div className="grid gap-4 md:grid-cols-2">
                  {limit('colleges', results.colleges).map((c) => (
                    <CollegeResult key={c.id} college={c} q={q} />
                  ))}
                </div>
              </section>
            )}
            {show('students') && counts.students > 0 && (
              <section aria-label="Students">
                <SectionHeader title="Students" count={counts.students} onShowAll={showAll('students')} />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {limit('students', results.students).map((s) => (
                    <StudentResult key={s.id} student={s} q={q} />
                  ))}
                </div>
              </section>
            )}
            {show('courses') && counts.courses > 0 && (
              <section aria-label="Courses">
                <SectionHeader title="Courses" count={counts.courses} onShowAll={showAll('courses')} />
                <div className="grid gap-4 md:grid-cols-2">
                  {limit('courses', results.courses).map((c) => (
                    <CourseResult key={c.id} course={c} q={q} />
                  ))}
                </div>
              </section>
            )}
            {show('locations') && counts.locations > 0 && (
              <section aria-label="Locations">
                <SectionHeader title="Locations" count={counts.locations} onShowAll={showAll('locations')} />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {limit('locations', results.locations).map((l) => (
                    <LocationResult key={l.city} location={l} q={q} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
