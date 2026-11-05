// Building blocks for the College Details page (pages/CollegeDetails.jsx).
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Award, BedDouble, BookOpen, Briefcase, Building2, Bus, ChevronLeft, ChevronRight, CircleCheck, CircleParking, Clock,
  Coffee, Cpu, Dumbbell, ExternalLink, FlaskConical, GraduationCap, HeartPulse, Landmark, Library, MapPin, Microscope,
  Monitor, Music, Navigation, Presentation, ShieldCheck, Sprout, Store, Theater, Trees, Trophy, Users, UtensilsCrossed, Wifi,
  Wrench,
} from 'lucide-react'
import ImageWithFallback from '../ImageWithFallback'
import Modal from '../Modal'
import StudentCard from '../StudentCard'
import { getCourseById } from '../../data/selectors'
import { cn } from '../../utils/format'

/* ───────────────────────── Section shell ───────────────────────── */
export function DetailSection({ id, eyebrow, title, action, children, className = '' }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('scroll-mt-36', className)}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 id={`${id}-title`} className="mt-1 text-2xl font-bold">
            {title}
          </h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

/* ───────────────────────── Sticky in-page tabs ───────────────────────── */
export function SectionTabs({ tabs }) {
  const [active, setActive] = useState(tabs[0]?.id)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const els = tabs.map((t) => document.getElementById(t.id)).filter(Boolean)
    if (!els.length) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-140px 0px -55% 0px', threshold: 0 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [tabs])

  const jump = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    setActive(id)
    try {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(window.history.state, '', `#${id}`)
    } catch {
      el.scrollIntoView()
    }
  }

  return (
    <nav aria-label="College sections" className="sticky top-16 z-30 border-b border-line bg-surface/95 backdrop-blur">
      <div className="container-page">
        <ul className="no-scrollbar -mb-px flex gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <li key={t.id} className="shrink-0">
              <a
                href={`#${t.id}`}
                onClick={(e) => jump(e, t.id)}
                aria-current={active === t.id ? 'true' : undefined}
                className={cn(
                  'flex min-h-12 items-center gap-2 border-b-2 px-3 text-sm font-medium transition-colors sm:px-4',
                  active === t.id ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-ink',
                )}
              >
                {t.label}
                {t.count != null && (
                  <span
                    className={cn(
                      'rounded-full px-1.5 text-[11px] font-semibold tabular-nums',
                      active === t.id ? 'bg-primary-50 text-primary-700' : 'bg-slate-100 text-slate-600',
                    )}
                  >
                    {t.count}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

/* ───────────────────────── Facilities ───────────────────────── */
const FACILITY_ICONS = [
  [/librar/i, Library],
  [/hostel|residen|accommodation/i, BedDouble],
  [/lab|research/i, FlaskConical],
  [/microscop|science/i, Microscope],
  [/sport|stadium|ground|court|athlet/i, Trophy],
  [/gym|fitness/i, Dumbbell],
  [/cafeteria|canteen|mess|dining|food/i, UtensilsCrossed],
  [/cafe|coffee/i, Coffee],
  [/wi-?fi|internet|network/i, Wifi],
  [/medical|health|hospital|dispensar|clinic/i, HeartPulse],
  [/auditorium|theat|amphi/i, Theater],
  [/transport|bus/i, Bus],
  [/computer|it centre|it center|data/i, Monitor],
  [/bank|atm|post office/i, Landmark],
  [/placement|career|incubat|startup/i, Briefcase],
  [/seminar|conference|lecture|smart class|classroom/i, Presentation],
  [/parking/i, CircleParking],
  [/security|cctv/i, ShieldCheck],
  [/green|garden|botanical|park/i, Trees],
  [/agri|farm/i, Sprout],
  [/music|cultur|art/i, Music],
  [/workshop|manufactur/i, Wrench],
  [/supercomput|hpc|server/i, Cpu],
  [/shop|store|market/i, Store],
  [/museum|heritage/i, Landmark],
  [/book|reading/i, BookOpen],
  [/building|block|campus/i, Building2],
]

export function facilityIcon(name = '') {
  return FACILITY_ICONS.find(([re]) => re.test(name))?.[1] ?? Award
}

export function FacilitiesGrid({ facilities = [] }) {
  if (!facilities.length) return null
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {facilities.map((f) => {
        const Icon = facilityIcon(f)
        return (
          <li key={f} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 text-sm font-medium text-ink">{f}</span>
          </li>
        )
      })}
    </ul>
  )
}

export function HighlightsList({ highlights = [] }) {
  if (!highlights.length) return null
  return (
    <ul className="space-y-3">
      {highlights.map((h) => (
        <li key={h} className="flex gap-3 text-sm leading-relaxed text-slate-700">
          <CircleCheck className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
          <span>{h}</span>
        </li>
      ))}
    </ul>
  )
}

/* ───────────────────────── Gallery + lightbox ───────────────────────── */
export function GalleryStrip({ gallery = [], collegeName }) {
  const items = gallery.filter((g) => g?.src)
  const [index, setIndex] = useState(null)
  if (!items.length) return null
  const current = index != null ? items[index] : null
  const step = (d) => setIndex((i) => (i + d + items.length) % items.length)

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">Gallery</h3>
      <ul className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {items.map((g, i) => (
          <li key={`${g.src}-${i}`} className="w-64 shrink-0 snap-start sm:w-72">
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl text-left"
              aria-label={`Open photo: ${g.caption || `${collegeName} photo ${i + 1}`}`}
            >
              <ImageWithFallback
                src={g.src}
                alt={g.caption || `${collegeName} photo ${i + 1}`}
                className="aspect-[4/3] w-full"
                imgClassName="transition-transform duration-500 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-8 text-xs text-white opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                {g.caption && <span className="line-clamp-1 font-medium">{g.caption}</span>}
                {g.credit?.author && (
                  <span className="mt-0.5 line-clamp-1 block text-[11px] text-white/80">
                    Photo: {g.credit.author}
                    {g.credit.license ? ` · ${g.credit.license}` : ''}
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Modal
        open={index != null}
        onClose={() => setIndex(null)}
        title={current?.caption || collegeName}
        description={items.length > 1 ? `Photo ${(index ?? 0) + 1} of ${items.length}` : undefined}
        size="lg"
      >
        {current && (
          <figure>
            <div className="relative">
              <ImageWithFallback
                src={current.src}
                alt={current.caption || collegeName}
                className="aspect-[16/10] w-full rounded-xl"
                imgClassName="object-contain bg-slate-900"
                loading="eager"
              />
              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous photo"
                    className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/90 text-ink shadow hover:bg-white"
                  >
                    <ChevronLeft className="size-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next photo"
                    className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/90 text-ink shadow hover:bg-white"
                  >
                    <ChevronRight className="size-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
            {current.credit && <Credit as="figcaption" credit={current.credit} className="mt-3 text-muted" linkClassName="text-ink" />}
          </figure>
        )}
      </Modal>
    </div>
  )
}

export function Credit({ credit, className = '', linkClassName = '', as: Tag = 'p' }) {
  if (!credit) return null
  const text = [credit.author && `Photo: ${credit.author}`, credit.license].filter(Boolean).join(' · ')
  if (!text) return null
  return (
    <Tag className={cn('text-xs', className)}>
      {credit.source ? (
        <a
          href={credit.source}
          target="_blank"
          rel="noopener noreferrer"
          className={cn('inline-flex items-center gap-1 underline-offset-2 hover:underline', linkClassName)}
        >
          {text}
          <ExternalLink className="size-3" aria-hidden="true" />
          <span className="sr-only">(opens in new tab)</span>
        </a>
      ) : (
        text
      )}
    </Tag>
  )
}

/* ───────────────────────── Programmes ───────────────────────── */
export function ProgramsList({ college }) {
  const [level, setLevel] = useState('All')

  const programs = useMemo(() => {
    const list = (college.programs ?? []).filter(Boolean)
    if (list.length) return list
    // Fallback: derive simple entries from course categories
    return (college.courses ?? [])
      .map((id) => getCourseById(id))
      .filter(Boolean)
      .map((c) => ({
        id: `${college.id}-${c.id}`,
        name: c.shortName === c.degree ? c.name : `${c.degree} ${c.name}`,
        courseId: c.id,
        degree: c.degree,
        degreeType: c.degreeType,
        duration: c.duration,
        eligibility: null,
        department: null,
      }))
  }, [college])

  const levels = ['All', ...['Undergraduate', 'Postgraduate'].filter((d) => programs.some((p) => p.degreeType === d))]
  const shown = level === 'All' ? programs : programs.filter((p) => p.degreeType === level)

  if (!programs.length) {
    return <p className="rounded-xl border border-dashed border-line p-6 text-sm text-muted">Programme details are being added.</p>
  }

  return (
    <div>
      {levels.length > 2 && (
        <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter by degree level">
          {levels.map((l) => {
            const count = l === 'All' ? programs.length : programs.filter((p) => p.degreeType === l).length
            return (
              <button
                key={l}
                type="button"
                aria-pressed={level === l}
                onClick={() => setLevel(l)}
                className={cn(
                  'inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition',
                  level === l ? 'border-secondary bg-secondary text-white' : 'border-line bg-surface text-slate-700 hover:border-slate-300',
                )}
              >
                {l === 'Undergraduate' ? 'UG' : l === 'Postgraduate' ? 'PG' : 'All'}
                <span className={cn('text-xs', level === l ? 'text-white/70' : 'text-muted')}>{count}</span>
              </button>
            )
          })}
        </div>
      )}
      <ul className="grid gap-4 md:grid-cols-2">
        {shown.map((p) => {
          const course = getCourseById(p.courseId)
          return (
            <li key={p.id ?? p.name} className="flex flex-col rounded-2xl border border-line bg-surface p-5 transition hover:border-primary-200 hover:shadow-[var(--shadow-card)]">
              <div className="flex flex-wrap items-center gap-2">
                {p.degree && <span className="chip-primary">{p.degree}</span>}
                {p.degreeType && (
                  <span className={cn('chip', p.degreeType === 'Postgraduate' && 'bg-violet-50 text-violet-700')}>{p.degreeType}</span>
                )}
              </div>
              <h3 className="mt-3 text-base leading-snug font-semibold">{p.name}</h3>
              <dl className="mt-3 space-y-2 text-sm">
                {p.duration && (
                  <div className="flex gap-2">
                    <dt className="flex w-24 shrink-0 items-center gap-1.5 text-muted">
                      <Clock className="size-3.5" aria-hidden="true" /> Duration
                    </dt>
                    <dd className="text-ink">{p.duration}</dd>
                  </div>
                )}
                {p.eligibility && (
                  <div className="flex gap-2">
                    <dt className="flex w-24 shrink-0 items-start gap-1.5 pt-0.5 text-muted">
                      <GraduationCap className="size-3.5 shrink-0" aria-hidden="true" /> Eligibility
                    </dt>
                    <dd className="text-ink">{p.eligibility}</dd>
                  </div>
                )}
                {p.department && (
                  <div className="flex gap-2">
                    <dt className="flex w-24 shrink-0 items-start gap-1.5 pt-0.5 text-muted">
                      <Building2 className="size-3.5 shrink-0" aria-hidden="true" /> Dept.
                    </dt>
                    <dd className="text-ink">{p.department}</dd>
                  </div>
                )}
              </dl>
              {course && (
                <Link
                  to={`/colleges?course=${course.id}`}
                  className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-primary hover:underline"
                >
                  Other colleges offering {course.shortName}
                  <ChevronRight className="size-3.5" aria-hidden="true" />
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ───────────────────────── Students ───────────────────────── */
export function CollegeStudents({ students = [] }) {
  const [course, setCourse] = useState('all')
  const options = useMemo(() => {
    const map = new Map()
    students.forEach((s) => {
      const key = s.courseId || s.course
      if (!key) return
      const label = getCourseById(s.courseId)?.shortName || s.course
      map.set(key, { key, label, count: (map.get(key)?.count ?? 0) + 1 })
    })
    return [...map.values()]
  }, [students])

  if (!students.length) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-surface px-6 py-12 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-primary-50 text-primary">
          <Users className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-3 font-semibold text-ink">No students from this college have joined yet</p>
        <p className="mt-1 text-sm text-muted">Be the first — or connect with students from nearby colleges.</p>
        <Link to="/students" className="btn-primary mt-5">
          Explore students
        </Link>
      </div>
    )
  }

  const shown = course === 'all' ? students : students.filter((s) => (s.courseId || s.course) === course)

  return (
    <div>
      {options.length > 1 && (
        <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter students by course">
          {[{ key: 'all', label: 'All', count: students.length }, ...options].map((o) => (
            <button
              key={o.key}
              type="button"
              aria-pressed={course === o.key}
              onClick={() => setCourse(o.key)}
              className={cn(
                'inline-flex min-h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition',
                course === o.key ? 'border-primary bg-primary text-white' : 'border-line bg-surface text-slate-700 hover:border-slate-300',
              )}
            >
              {o.label}
              <span className={cn('text-xs', course === o.key ? 'text-white/75' : 'text-muted')}>{o.count}</span>
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((s) => (
          <StudentCard key={s.id} student={s} />
        ))}
      </div>
    </div>
  )
}

/* ───────────────────────── Location ───────────────────────── */
export function LocationCard({ college }) {
  const lat = Number(college.coordinates?.lat)
  const lng = Number(college.coordinates?.lng)
  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng) && !(lat === 0 && lng === 0)
  const query = encodeURIComponent([college.name, college.city].filter(Boolean).join(', '))
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`
  const d = 0.012
  const embed = hasCoords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d * 1.6}%2C${lat - d}%2C${lng + d * 1.6}%2C${lat + d}&layer=mapnik&marker=${lat}%2C${lng}`
    : null
  const fullAddress = [college.address, college.city, college.state].filter(Boolean).join(', ') + (college.pincode ? ` – ${college.pincode}` : '')

  return (
    <div className="grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div className="relative h-72 bg-slate-100 sm:h-80 lg:h-full lg:min-h-[340px]">
        {embed ? (
          <iframe
            title={`Map showing ${college.name}`}
            src={embed}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <IllustratedMap />
        )}
      </div>
      <div className="flex flex-col p-6">
        <span className="grid size-11 place-items-center rounded-xl bg-primary-50 text-primary">
          <MapPin className="size-5" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-lg font-semibold">{college.shortName || college.name}</h3>
        <address className="mt-1 text-sm leading-relaxed text-muted not-italic">{fullAddress}</address>
        {hasCoords && (
          <p className="mt-3 text-xs text-muted tabular-nums">
            {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
          </p>
        )}
        <div className="mt-6 flex flex-col gap-2 sm:flex-row lg:mt-auto lg:flex-col">
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <Navigation className="size-4" aria-hidden="true" />
            Open in Google Maps
            <span className="sr-only">(opens in new tab)</span>
          </a>
          <Link to={`/colleges?location=${encodeURIComponent(college.city ?? '')}`} className="btn-secondary">
            More colleges in {college.city}
          </Link>
        </div>
        {embed && <p className="mt-4 text-[11px] text-muted">Map data © OpenStreetMap contributors</p>}
      </div>
    </div>
  )
}

// CSS-only "map" used when coordinates are missing.
function IllustratedMap() {
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#eef2f6]"
      role="img"
      aria-label="Illustrative map (exact location unavailable)"
      style={{
        backgroundImage:
          'linear-gradient(#dfe5ec 1px, transparent 1px), linear-gradient(90deg, #dfe5ec 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      <span className="absolute top-[38%] -left-10 h-3 w-[140%] -rotate-6 bg-white shadow-sm" />
      <span className="absolute top-0 left-[58%] h-full w-3 rotate-12 bg-white shadow-sm" />
      <span className="absolute top-[65%] -left-10 h-2 w-[140%] rotate-3 bg-amber-100" />
      <span className="absolute top-[12%] left-[12%] h-20 w-28 rounded-2xl bg-emerald-100/80" />
      <span className="absolute right-[10%] bottom-[10%] h-16 w-24 rounded-full bg-sky-100" />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-primary drop-shadow">
        <MapPin className="size-10 fill-primary text-white" strokeWidth={1.5} aria-hidden="true" />
      </span>
    </div>
  )
}

