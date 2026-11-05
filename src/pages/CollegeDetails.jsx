import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, BookOpen, Bookmark, BookmarkCheck, CalendarDays, ExternalLink, Landmark, MapPin, School, Share2, Users,
} from 'lucide-react'
import ImageWithFallback from '../components/ImageWithFallback'
import CollegeCard, { TypeChip } from '../components/CollegeCard'
import {
  CollegeStudents, Credit, DetailSection, FacilitiesGrid, GalleryStrip, HighlightsList, LocationCard, ProgramsList, SectionTabs,
} from '../components/colleges/DetailSections'
import { useApp } from '../context/AppContext'
import { colleges } from '../data/colleges'
import { getCollegeBySlug, getStudentsByCollege } from '../data/selectors'
import { cn } from '../utils/format'

function safe(fn, fallback) {
  try {
    return fn() ?? fallback
  } catch {
    return fallback
  }
}

export default function CollegeDetails() {
  const { slug } = useParams()
  const college = useMemo(() => safe(() => getCollegeBySlug(slug), null), [slug])

  useEffect(() => {
    document.title = college ? `${college.shortName || college.name} · Bite Connect` : 'College not found · Bite Connect'
    try {
      if (!window.location.hash) window.scrollTo({ top: 0 })
    } catch {
      /* ignore */
    }
  }, [college])

  if (!college) return <CollegeNotFound slug={slug} />
  return <CollegeView key={college.id ?? slug} college={college} />
}

function CollegeView({ college }) {
  const { toast } = useApp()
  const reduceMotion = useReducedMotion()
  const [saved, setSaved] = useState(false)

  const students = useMemo(() => safe(() => getStudentsByCollege(college.id), []), [college.id])
  const programs = (college.programs ?? []).filter(Boolean)
  const courseCount = programs.length || (college.courses ?? []).length
  const facilities = (college.facilities ?? []).filter(Boolean)
  const highlights = (college.highlights ?? []).filter(Boolean)
  const gallery = (college.gallery ?? []).filter((g) => g?.src)
  const location = [college.city, college.state].filter(Boolean).join(', ')
  const fullAddress = [college.address, location].filter(Boolean).join(', ') + (college.pincode ? ` – ${college.pincode}` : '')

  const similar = useMemo(() => {
    const own = new Set(college.courses ?? [])
    return (Array.isArray(colleges) ? colleges : [])
      .filter((c) => c && c.id !== college.id)
      .map((c) => ({
        c,
        score: (c.city === college.city ? 3 : 0) + (c.courses ?? []).filter((id) => own.has(id)).length + (c.type === college.type ? 0.5 : 0),
      }))
      .filter((x) => x.score > 0.5)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((x) => x.c)
  }, [college])

  const tabs = useMemo(
    () => [
      { id: 'overview', label: 'Overview' },
      { id: 'courses', label: 'Courses', count: courseCount },
      { id: 'students', label: 'Students', count: students.length },
      { id: 'location', label: 'Location' },
    ],
    [courseCount, students.length],
  )

  const share = async () => {
    const url = safe(() => window.location.href.split('#')[0], '')
    try {
      if (navigator.share) {
        await navigator.share({ title: college.name, text: `${college.name} on Bite Connect`, url })
        return
      }
    } catch (err) {
      if (err?.name === 'AbortError') return
    }
    try {
      await navigator.clipboard.writeText(url)
      toast('Link copied to clipboard')
    } catch {
      toast('Could not copy the link — copy it from the address bar', { type: 'error' })
    }
  }

  const toggleSave = () => {
    const label = college.shortName || college.name
    toast(saved ? `Removed ${label} from saved` : `Saved ${label}`, { type: saved ? 'info' : 'success' })
    setSaved(!saved)
  }

  const fade = (delay = 0) =>
    reduceMotion ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay } }

  return (
    <div className="pb-20">
      {/* ── Cover ─────────────────────────────── */}
      <section className="relative isolate flex min-h-[340px] flex-col overflow-hidden bg-secondary md:min-h-[440px]">
        <div className="absolute inset-0 -z-10">
          <ImageWithFallback
            src={college.image}
            alt={`${college.name} campus`}
            name={college.name}
            loading="eager"
            className="size-full"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/20" aria-hidden="true" />

        <div className="container-page flex flex-1 flex-col pt-5 pb-6 md:pb-8">
          <nav aria-label="Breadcrumb" className="text-xs text-white/80">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-white hover:underline">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/colleges" className="hover:text-white hover:underline">Colleges</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="max-w-[16rem] truncate font-medium text-white" aria-current="page">
                {college.shortName || college.name}
              </li>
            </ol>
          </nav>

          <motion.div {...fade(0)} className="mt-auto pt-16">
            <div className="flex flex-col gap-5 md:flex-row md:items-end">
              <ImageWithFallback
                src={college.logo}
                alt={`${college.name} logo`}
                kind="avatar"
                name={college.shortName || college.name}
                className="size-16 shrink-0 rounded-2xl border-2 border-white bg-white text-lg shadow-lg md:size-20 md:text-xl"
                imgClassName="object-contain p-1"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <TypeChip type={college.type} />
                  {college.category && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm">
                      <Landmark className="size-3" aria-hidden="true" />
                      {college.category}
                    </span>
                  )}
                  {college.established && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm">
                      <CalendarDays className="size-3" aria-hidden="true" />
                      Est. {college.established}
                    </span>
                  )}
                </div>
                <h1 className="mt-3 text-2xl leading-tight font-extrabold text-white sm:text-3xl md:text-4xl">{college.name}</h1>
                {fullAddress && (
                  <p className="mt-2 flex items-start gap-1.5 text-sm text-white/85">
                    <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    <span>{fullAddress}</span>
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2 md:shrink-0 md:justify-end">
                {college.website && (
                  <a href={college.website} target="_blank" rel="noopener noreferrer" className="btn bg-white text-ink hover:bg-slate-100">
                    Visit website
                    <span className="text-xs font-normal text-muted">(official site)</span>
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={share}
                  className="btn bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-sm hover:bg-white/25"
                >
                  <Share2 className="size-4" aria-hidden="true" />
                  Share
                </button>
                <button
                  type="button"
                  onClick={toggleSave}
                  aria-pressed={saved}
                  className={cn(
                    'btn ring-1 backdrop-blur-sm',
                    saved ? 'bg-primary text-white ring-primary hover:bg-primary-hover' : 'bg-white/15 text-white ring-white/30 hover:bg-white/25',
                  )}
                >
                  {saved ? <BookmarkCheck className="size-4" aria-hidden="true" /> : <Bookmark className="size-4" aria-hidden="true" />}
                  {saved ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            <div className="mt-5 text-right text-white/70">
              {college.isAuthenticPhoto === false || !college.image ? (
                <span className="text-[11px]">Representative image</span>
              ) : college.imageCredit ? (
                <Credit credit={college.imageCredit} className="text-[11px]" linkClassName="text-white/75 hover:text-white" />
              ) : null}
            </div>
          </motion.div>
        </div>
      </section>

      <SectionTabs tabs={tabs} />

      <div className="container-page mt-10 space-y-16">
        {/* ── Overview ─────────────────────────────── */}
        <DetailSection id="overview" eyebrow="About" title={`About ${college.shortName || 'the college'}`}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5 text-[15px] leading-relaxed text-slate-700">
              <p>{college.overview || college.description || 'Detailed information about this college is being added.'}</p>
              {college.campus && (
                <div>
                  <h3 className="mb-1.5 text-base font-semibold text-ink">Campus</h3>
                  <p>{college.campus}</p>
                </div>
              )}
            </div>

            <aside aria-label="Quick facts" className="card h-fit p-5 lg:sticky lg:top-36">
              <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">Quick facts</h3>
              <dl className="mt-3 divide-y divide-line text-sm">
                {[
                  { label: 'Established', value: college.established, Icon: CalendarDays },
                  { label: 'Type', value: college.type, Icon: Landmark },
                  { label: 'Category', value: college.category, Icon: School },
                  { label: 'Courses', value: courseCount ? `${courseCount} programmes` : null, Icon: BookOpen },
                  { label: 'On Bite Connect', value: `${students.length} ${students.length === 1 ? 'student' : 'students'}`, Icon: Users },
                ]
                  .filter((f) => f.value)
                  .map(({ label, value, Icon }) => (
                    <div key={label} className="flex items-start justify-between gap-4 py-2.5">
                      <dt className="flex items-center gap-2 text-muted">
                        <Icon className="size-4" aria-hidden="true" />
                        {label}
                      </dt>
                      <dd className="text-right font-medium text-ink">{value}</dd>
                    </div>
                  ))}
              </dl>
              <a href="#students" onClick={(e) => { e.preventDefault(); document.getElementById('students')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn-primary mt-4 w-full">
                Meet the students
              </a>
            </aside>
          </div>

          {(facilities.length > 0 || highlights.length > 0) && (
            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              {facilities.length > 0 && (
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Facilities</h3>
                  <FacilitiesGrid facilities={facilities} />
                </div>
              )}
              {highlights.length > 0 && (
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Highlights</h3>
                  <div className="rounded-2xl border border-line bg-surface p-5">
                    <HighlightsList highlights={highlights} />
                  </div>
                </div>
              )}
            </div>
          )}

          {gallery.length > 0 && (
            <div className="mt-10">
              <GalleryStrip gallery={gallery} collegeName={college.name} />
            </div>
          )}
        </DetailSection>

        {/* ── Courses ─────────────────────────────── */}
        <DetailSection id="courses" eyebrow="Programmes" title="Available courses">
          <ProgramsList college={college} />
        </DetailSection>

        {/* ── Students ─────────────────────────────── */}
        <DetailSection
          id="students"
          eyebrow="Community"
          title="Students from this college"
          action={
            students.length > 0 ? (
              <Link to={`/students?college=${college.id}`} className="btn-ghost btn-sm">
                View all
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ) : null
          }
        >
          <CollegeStudents students={students} />
        </DetailSection>

        {/* ── Location ─────────────────────────────── */}
        <DetailSection id="location" eyebrow="Getting there" title="Location">
          <LocationCard college={college} />
        </DetailSection>

        {/* ── Similar ─────────────────────────────── */}
        {similar.length > 0 && (
          <section aria-labelledby="similar-title" className="border-t border-line pt-12">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <h2 id="similar-title" className="text-2xl font-bold">
                Similar colleges
              </h2>
              <Link to={`/colleges?location=${encodeURIComponent(college.city ?? '')}`} className="btn-ghost btn-sm">
                Explore more
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {similar.map((c) => (
                <CollegeCard key={c.id} college={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function CollegeNotFound({ slug }) {
  return (
    <div className="container-page py-20">
      <div className="card mx-auto flex max-w-lg flex-col items-center px-6 py-14 text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary">
          <School className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-2xl font-bold">College not found</h1>
        <p className="mt-2 text-sm text-muted">
          We couldn’t find a college at <span className="font-mono text-ink">/{slug}</span>. It may have been renamed or removed.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/colleges" className="btn-primary">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to colleges
          </Link>
          <Link to="/courses" className="btn-secondary">
            Browse by course
          </Link>
        </div>
      </div>
    </div>
  )
}
