import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Building2, MapPin, Search, TrendingUp, Users, BookOpen, X } from 'lucide-react'
import ImageWithFallback from './ImageWithFallback'
import CourseIcon from './CourseIcon'
import Highlight from './shell/Highlight'
import { useDebouncedValue, useDismiss } from './shell/hooks'
import { POPULAR_SEARCHES, courseDisplayName, hrefFor, searchAll } from './shell/search'
import { cn, pluralize } from '../utils/format'

const PER_GROUP = 4

const GROUPS = [
  { key: 'colleges', label: 'Colleges', Icon: Building2 },
  { key: 'students', label: 'Students', Icon: Users },
  { key: 'courses', label: 'Courses', Icon: BookOpen },
  { key: 'locations', label: 'Locations', Icon: MapPin },
]

const PLACEHOLDERS = {
  navbar: 'Search colleges, students, courses…',
  hero: 'Search colleges, courses, cities or students',
  page: 'Search colleges, students, courses, locations…',
}

function toItems(query) {
  const q = query.trim()
  if (!q) {
    return POPULAR_SEARCHES.map((term) => ({ id: `popular-${term}`, kind: 'popular', group: 'popular', label: term, href: hrefFor.search(term) }))
  }
  const r = searchAll(q)
  const items = [
    ...r.colleges.slice(0, PER_GROUP).map((c) => ({ id: `c-${c.id}`, kind: 'college', group: 'colleges', data: c, href: hrefFor.college(c) })),
    ...r.students.slice(0, PER_GROUP).map((s) => ({ id: `s-${s.id}`, kind: 'student', group: 'students', data: s, href: hrefFor.student(s) })),
    ...r.courses.slice(0, PER_GROUP).map((c) => ({ id: `k-${c.id}`, kind: 'course', group: 'courses', data: c, href: hrefFor.course(c) })),
    ...r.locations.slice(0, PER_GROUP).map((l) => ({ id: `l-${l.city}`, kind: 'location', group: 'locations', data: l, href: hrefFor.location(l) })),
  ]
  items.push({ id: 'all', kind: 'search', group: 'all', label: q, href: hrefFor.search(q), total: r.total })
  return items
}

function OptionBody({ item, query }) {
  const d = item.data
  switch (item.kind) {
    case 'college':
      return (
        <>
          <ImageWithFallback src={d.image} alt="" kind="college" name={d.name} className="size-10 shrink-0 rounded-lg" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-ink">
              <Highlight text={d.name} query={query} />
            </span>
            <span className="block truncate text-xs text-muted">
              <Highlight text={[d.city, d.state].filter(Boolean).join(', ')} query={query} />
            </span>
          </span>
        </>
      )
    case 'student':
      return (
        <>
          <ImageWithFallback src={d.image} alt="" kind="avatar" name={d.name} className="size-10 shrink-0 rounded-full text-xs" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-ink">
              <Highlight text={d.name} query={query} />
            </span>
            <span className="block truncate text-xs text-muted">
              <Highlight text={[d.collegeName, d.course].filter(Boolean).join(' · ')} query={query} />
            </span>
          </span>
        </>
      )
    case 'course':
      return (
        <>
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary">
            <CourseIcon name={d.icon} className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-ink">
              <Highlight text={courseDisplayName(d)} query={query} />
            </span>
            <span className="block truncate text-xs text-muted">
              {d.shortName} · {pluralize(d.collegeCount ?? 0, 'college')}
            </span>
          </span>
        </>
      )
    case 'location':
      return (
        <>
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-600">
            <MapPin className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-ink">
              <Highlight text={d.city} query={query} />
            </span>
            <span className="block truncate text-xs text-muted">
              {d.state ? `${d.state} · ` : ''}
              {pluralize(d.collegeCount ?? 0, 'college')}
            </span>
          </span>
        </>
      )
    default:
      return null
  }
}

/**
 * <SearchBar variant="navbar|hero|page" autoFocus onNavigate defaultValue placeholder className />
 * Combobox with grouped suggestions (colleges / students / courses / locations).
 * Enter with no highlighted suggestion → /search?q=
 */
export default function SearchBar({ variant = 'navbar', autoFocus = false, onNavigate, defaultValue = '', placeholder, className = '' }) {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const listId = useId()
  const wrapRef = useRef(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const [value, setValue] = useState(defaultValue ?? '')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const query = useDebouncedValue(value, 150)

  // keep in sync when the page passes a new value (e.g. /search?q= changes)
  useEffect(() => {
    setValue(defaultValue ?? '')
  }, [defaultValue])

  useEffect(() => {
    setActive(-1)
  }, [query])

  useEffect(() => {
    if (autoFocus) {
      const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50)
      return () => clearTimeout(t)
    }
    return undefined
  }, [autoFocus])

  useDismiss(wrapRef, open, () => {
    setOpen(false)
    setActive(-1)
  })

  const items = useMemo(() => toItems(query), [query])
  const hasQuery = query.trim().length > 0
  const resultCount = items.filter((i) => i.kind !== 'search').length

  useEffect(() => {
    if (active < 0 || !listRef.current) return
    const node = listRef.current.querySelector(`[data-index="${active}"]`)
    node?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const go = (item) => {
    if (!item) return
    navigate(item.href)
    setOpen(false)
    setActive(-1)
    if (item.kind === 'popular') setValue(item.label)
    else if (item.kind !== 'search' && variant === 'navbar') setValue('')
    inputRef.current?.blur()
    onNavigate?.(item)
  }

  const submit = (event) => {
    event.preventDefault()
    if (open && active >= 0 && items[active]) {
      go(items[active])
      return
    }
    const q = value.trim()
    if (!q) {
      setOpen(true)
      inputRef.current?.focus()
      return
    }
    go({ kind: 'search', href: hrefFor.search(q), label: q })
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!open) setOpen(true)
      setActive((i) => (items.length ? (i + 1) % items.length : -1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) setOpen(true)
      setActive((i) => (items.length ? (i <= 0 ? items.length - 1 : i - 1) : -1))
    } else if (event.key === 'Escape') {
      if (open) {
        event.stopPropagation()
        setOpen(false)
        setActive(-1)
      } else if (value) {
        setValue('')
      }
    } else if (event.key === 'Tab') {
      setOpen(false)
    }
  }

  const clear = () => {
    setValue('')
    setActive(-1)
    setOpen(true)
    inputRef.current?.focus()
  }

  const activeId = open && active >= 0 && items[active] ? `${listId}-${active}` : undefined

  const optionProps = (item, index) => ({
    id: `${listId}-${index}`,
    role: 'option',
    'aria-selected': index === active,
    'data-index': index,
    onMouseDown: (e) => e.preventDefault(),
    onMouseMove: () => active !== index && setActive(index),
    onClick: () => go(item),
  })

  const isHero = variant === 'hero'
  const isNavbar = variant === 'navbar'

  const renderGroups = () => {
    if (!hasQuery) {
      return (
        <div className="p-4">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
            <TrendingUp className="size-3.5" aria-hidden="true" /> Popular searches
          </p>
          <ul role="listbox" id={listId} ref={listRef} aria-label="Popular searches" className="flex flex-wrap gap-2">
            {items.map((item, index) => (
              <li
                key={item.id}
                {...optionProps(item, index)}
                className={cn(
                  'inline-flex min-h-9 cursor-pointer items-center rounded-full border px-3.5 text-sm font-medium transition',
                  index === active ? 'border-primary bg-primary-50 text-primary-700' : 'border-line bg-surface text-slate-700 hover:border-slate-300',
                )}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )
    }

    let index = -1
    return (
      <ul role="listbox" id={listId} ref={listRef} aria-label="Search suggestions" className="py-2">
        {resultCount === 0 && (
          <li role="presentation" className="px-4 pt-3 pb-2 text-sm text-muted">
            No quick matches for <span className="font-semibold text-ink">“{query.trim()}”</span>. Try a college, course, city or skill.
          </li>
        )}
        {GROUPS.map(({ key, label, Icon }) => {
          const groupItems = items.filter((i) => i.group === key)
          if (!groupItems.length) return null
          return (
            <li role="presentation" key={key} className="pb-1">
              <p className="flex items-center gap-1.5 px-4 pt-2 pb-1 text-[11px] font-semibold tracking-wider text-muted uppercase" aria-hidden="true">
                <Icon className="size-3.5" /> {label}
              </p>
              <ul role="group" aria-label={label}>
                {groupItems.map((item) => {
                  index = items.indexOf(item)
                  return (
                    <li
                      key={item.id}
                      {...optionProps(item, index)}
                      className={cn(
                        'mx-2 flex min-h-12 cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 transition-colors',
                        index === active ? 'bg-primary-50' : 'hover:bg-slate-50',
                      )}
                    >
                      <OptionBody item={item} query={query} />
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
        {items
          .filter((i) => i.kind === 'search')
          .map((item) => {
            const i = items.indexOf(item)
            return (
              <li
                key={item.id}
                {...optionProps(item, i)}
                className={cn(
                  'mx-2 mt-1 flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border-t border-line px-2.5 py-2 text-sm font-semibold text-primary transition-colors',
                  i === active ? 'bg-primary-50' : 'hover:bg-slate-50',
                )}
              >
                <Search className="size-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">See all results for “{item.label}”</span>
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </li>
            )
          })}
      </ul>
    )
  }

  return (
    <div ref={wrapRef} className={cn('relative w-full', className)}>
      <form role="search" onSubmit={submit} className={cn(isHero && 'card flex items-center gap-2 rounded-2xl p-2 shadow-lg')}>
        <label htmlFor={`${listId}-input`} className="sr-only">
          Search Bite Connect
        </label>
        <div className="relative min-w-0 flex-1">
          <Search
            className={cn('pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400', isNavbar ? 'left-3 size-4' : 'left-4 size-5')}
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            id={`${listId}-input`}
            type="search"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeId}
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="search"
            value={value}
            placeholder={placeholder ?? PLACEHOLDERS[variant] ?? PLACEHOLDERS.page}
            onChange={(e) => {
              setValue(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className={cn(
              'w-full min-w-0 text-ink outline-none transition placeholder:text-slate-400 [&::-webkit-search-cancel-button]:appearance-none',
              isNavbar &&
                'h-10 rounded-xl border border-transparent bg-slate-100 pr-9 pl-9 text-sm focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/10',
              isHero && 'h-12 rounded-xl bg-transparent pr-10 pl-12 text-base',
              variant === 'page' &&
                'h-12 rounded-xl border border-line bg-surface pr-11 pl-12 text-base shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/10',
            )}
          />
          {value && (
            <button
              type="button"
              onClick={clear}
              aria-label="Clear search"
              className={cn(
                'absolute top-1/2 grid -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-slate-400 transition hover:bg-slate-200/70 hover:text-ink',
                isNavbar ? 'right-1 size-8' : 'right-1.5 size-9',
              )}
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
        {isHero && (
          <button type="submit" className="btn-primary shrink-0 px-4 sm:px-6">
            <Search className="size-4 sm:hidden" aria-hidden="true" />
            <span className="max-sm:sr-only">Search</span>
          </button>
        )}
      </form>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -4, transition: { duration: 0.12 } }}
            transition={{ duration: 0.16 }}
            className={cn(
              'card absolute top-full z-50 mt-2 max-h-[min(70vh,34rem)] overflow-y-auto overscroll-contain text-left',
              isNavbar ? 'right-0 w-[min(28rem,calc(100vw-2rem))]' : 'inset-x-0',
            )}
          >
            {renderGroups()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
