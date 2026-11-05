import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpDown, LayoutGrid, List, SearchX, SlidersHorizontal, X } from 'lucide-react'
import CollegeCard, { CollegeCardSkeleton } from '../components/CollegeCard'
import FilterSidebar from '../components/FilterSidebar'
import Modal from '../components/Modal'
import { colleges } from '../data/colleges'
import { getCourseById } from '../data/selectors'
import {
  SORTS,
  activeFilterCount,
  filterColleges,
  parseFilters,
  serializeFilters,
  sortColleges,
} from '../components/colleges/collegeFilters'
import { cn, pluralize } from '../utils/format'

const PAGE_SIZE = 9

export default function ExploreColleges() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = useMemo(() => parseFilters(searchParams), [searchParams])
  const reduceMotion = useReducedMotion()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [view, setView] = useState('grid')
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(true)

  const allColleges = Array.isArray(colleges) ? colleges : []
  const results = useMemo(
    () => sortColleges(filterColleges(allColleges, filters), filters.sort),
    [allColleges, filters],
  )
  const activeCount = activeFilterCount(filters)

  // Brief skeleton on first load and whenever the filter set changes; reset paging.
  const filterKey = JSON.stringify(serializeFilters({ ...filters, sort: 'az' }))
  const firstRun = useRef(true)
  useEffect(() => {
    setVisible(PAGE_SIZE)
    setLoading(true)
    const t = setTimeout(() => setLoading(false), firstRun.current ? 350 : 280)
    firstRun.current = false
    return () => clearTimeout(t)
  }, [filterKey])

  useEffect(() => {
    document.title = 'Explore Colleges · Bite Connect'
  }, [])

  const update = (next) => {
    try {
      setSearchParams(serializeFilters(next), { replace: true })
    } catch {
      /* ignore */
    }
  }
  const reset = () => update({ sort: filters.sort })

  // Removable chips for the toolbar
  const chips = [
    ...(filters.q ? [{ key: 'q', label: `“${filters.q}”`, remove: () => update({ ...filters, q: '' }) }] : []),
    ...filters.location.map((l) => ({
      key: `l-${l}`,
      label: l,
      remove: () => update({ ...filters, location: filters.location.filter((x) => x !== l) }),
    })),
    ...filters.type.map((t) => ({
      key: `t-${t}`,
      label: t,
      remove: () => update({ ...filters, type: filters.type.filter((x) => x !== t) }),
    })),
    ...filters.course.map((id) => {
      const c = getCourseById(id)
      return {
        key: `c-${id}`,
        label: c ? (c.shortName === c.degree ? c.degree : `${c.degree} ${c.shortName}`) : id.toUpperCase(),
        remove: () => update({ ...filters, course: filters.course.filter((x) => x !== id) }),
      }
    }),
    ...filters.degree.map((d) => ({
      key: `d-${d}`,
      label: d,
      remove: () => update({ ...filters, degree: filters.degree.filter((x) => x !== d) }),
    })),
  ]

  const shown = results.slice(0, visible)
  const remaining = Math.max(0, results.length - visible)

  return (
    <div className="pb-20">
      {/* Header */}
      <header className="border-b border-line bg-surface">
        <div className="container-page py-8 md:py-12">
          <nav aria-label="Breadcrumb" className="text-xs text-muted">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-1.5" aria-hidden="true">
              /
            </span>
            <span className="text-ink">Colleges</span>
          </nav>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold md:text-4xl">Explore Colleges</h1>
              <p className="mt-2 text-base text-muted">
                Browse verified government and private colleges, compare courses and see which students are already on
                Bite Connect.
              </p>
            </div>
            <p className="text-sm text-muted" aria-live="polite">
              <span className="text-2xl font-bold text-ink tabular-nums">{results.length}</span>{' '}
              {results.length === 1 ? 'college' : 'colleges'} found
              {allColleges.length > 0 && results.length !== allColleges.length && (
                <span className="text-muted"> of {allColleges.length}</span>
              )}
            </p>
          </div>
        </div>
      </header>

      <div className="container-page mt-6 lg:mt-8 lg:grid lg:grid-cols-[272px_minmax(0,1fr)] lg:gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block" aria-label="College filters">
          <div className="card no-scrollbar sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto px-5 py-4">
            <FilterSidebar filters={filters} onChange={update} onReset={reset} />
          </div>
        </aside>

        <section aria-label="Results" className="min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="btn-secondary lg:hidden"
              aria-label={`Open filters${activeCount ? `, ${activeCount} active` : ''}`}
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Filters
              {activeCount > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] font-bold text-white">
                  {activeCount}
                </span>
              )}
            </button>

            <div className="ml-auto flex items-center gap-2">
              <label className="relative flex items-center">
                <span className="sr-only">Sort colleges</span>
                <ArrowUpDown className="pointer-events-none absolute left-3 size-4 text-muted" aria-hidden="true" />
                <select
                  value={filters.sort}
                  onChange={(e) => update({ ...filters, sort: e.target.value })}
                  className="input cursor-pointer appearance-none py-2 pr-8 pl-9 font-medium"
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="hidden rounded-xl border border-line bg-surface p-1 sm:flex" role="group" aria-label="Layout">
                {[
                  { v: 'grid', Icon: LayoutGrid, label: 'Grid view' },
                  { v: 'list', Icon: List, label: 'List view' },
                ].map(({ v, Icon, label }) => (
                  <button
                    key={v}
                    type="button"
                    aria-label={label}
                    aria-pressed={view === v}
                    onClick={() => setView(v)}
                    className={cn(
                      'grid size-9 cursor-pointer place-items-center rounded-lg transition',
                      view === v ? 'bg-primary-50 text-primary' : 'text-muted hover:bg-slate-50 hover:text-ink',
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {chips.length > 0 && (
            <ul className="mt-4 flex flex-wrap items-center gap-2" aria-label="Active filters">
              {chips.map((chip) => (
                <li key={chip.key}>
                  <button
                    type="button"
                    onClick={chip.remove}
                    aria-label={`Remove filter ${chip.label}`}
                    className="inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 py-1 pr-2 pl-3 text-xs font-medium text-primary-700 hover:bg-primary-100"
                  >
                    {chip.label}
                    <X className="size-3.5" aria-hidden="true" />
                  </button>
                </li>
              ))}
              <li>
                <button type="button" onClick={reset} className="cursor-pointer px-2 py-1 text-xs font-semibold text-muted hover:text-ink hover:underline">
                  Clear all
                </button>
              </li>
            </ul>
          )}

          {/* Results */}
          <div className="mt-6">
            {loading ? (
              <div className={gridClass(view)}>
                {Array.from({ length: view === 'list' ? 4 : 6 }).map((_, i) => (
                  <CollegeCardSkeleton key={i} variant={view === 'list' ? 'compact' : 'default'} />
                ))}
              </div>
            ) : results.length === 0 ? (
              <EmptyState onClear={reset} hasFilters={activeCount > 0} />
            ) : (
              <>
                <div className={gridClass(view)}>
                  {shown.map((college, i) => (
                    <motion.div
                      key={college.id ?? college.slug}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(i % PAGE_SIZE, 8) * 0.03 }}
                      className="min-w-0"
                    >
                      <CollegeCard college={college} variant={view === 'list' ? 'compact' : 'default'} />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col items-center gap-2">
                  <p className="text-xs text-muted">
                    Showing {shown.length} of {pluralize(results.length, 'college')}
                  </p>
                  {remaining > 0 && (
                    <button type="button" className="btn-secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                      Load more · {remaining} remaining
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      {/* Mobile drawer */}
      <Modal
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Filter colleges"
        variant="drawer-left"
        footer={
          <div className="flex w-full gap-3">
            <button type="button" className="btn-secondary flex-1" onClick={reset} disabled={activeCount === 0}>
              Reset
            </button>
            <button type="button" className="btn-primary flex-[2]" onClick={() => setDrawerOpen(false)}>
              Show {pluralize(results.length, 'result')}
            </button>
          </div>
        }
      >
        <FilterSidebar filters={filters} onChange={update} onReset={reset} />
      </Modal>
    </div>
  )
}

function gridClass(view) {
  return view === 'list' ? 'grid gap-4 md:grid-cols-2' : 'grid gap-6 md:grid-cols-2 xl:grid-cols-3'
}

function EmptyState({ onClear, hasFilters }) {
  return (
    <div className="card flex flex-col items-center px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary">
        <SearchX className="size-7" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-lg font-bold">No colleges match these filters</h2>
      <p className="mt-1 max-w-sm text-sm text-muted">
        Try removing a filter or searching for a different city or course.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {hasFilters && (
          <button type="button" className="btn-primary" onClick={onClear}>
            Clear filters
          </button>
        )}
        <Link to="/courses" className="btn-secondary">
          Browse courses
        </Link>
      </div>
    </div>
  )
}
