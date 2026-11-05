import { useId, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, BookOpen, Building2, CircleCheck, GraduationCap, MapPin, Search, Users } from 'lucide-react'
import ImageWithFallback from '../ImageWithFallback'
import { colleges } from '../../data/colleges'
import { courses } from '../../data/courses'
import { getCities, getCollegeById, getCourseById } from '../../data/selectors'
import { campusPhotos, findStudentByName, platformStats } from './homeData'

const QUICK_LINKS = [
  { label: 'B.Tech CSE', to: '/colleges?course=cse' },
  { label: 'Varanasi', to: '/colleges?location=Varanasi' },
  { label: 'BCA', to: '/colleges?course=bca' },
  { label: 'MBA', to: '/colleges?course=mba' },
  { label: 'Prayagraj', to: '/colleges?location=Prayagraj' },
]

const courseOptionLabel = (c) => (c.shortName === c.degree ? c.name : `${c.degree} ${c.shortName}`)

function SearchPanel() {
  const navigate = useNavigate()
  const uid = useId()
  const [q, setQ] = useState('')
  const [course, setCourse] = useState('')
  const [location, setLocation] = useState('')

  const cities = useMemo(() => {
    try {
      return getCities().filter(Boolean)
    } catch {
      return []
    }
  }, [])
  const collegeNames = useMemo(() => [...new Set(colleges.map((c) => c?.name).filter(Boolean))], [])

  const onSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q.trim()) params.set('q', q.trim())
    if (course) params.set('course', course)
    if (location) params.set('location', location)
    const query = params.toString()
    navigate(query ? `/colleges?${query}` : '/colleges')
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Find colleges"
      className="card mt-8 grid gap-3 p-4 md:grid-cols-[1.4fr_1fr_1fr] lg:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr]"
    >
      <div className="md:col-span-1 lg:col-span-2 xl:col-span-1">
        <label htmlFor={`${uid}-q`} className="label">College name</label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            id={`${uid}-q`}
            type="text"
            list={`${uid}-colleges`}
            className="input pl-9"
            placeholder="e.g. IIT (BHU), VBSPU"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="off"
          />
          <datalist id={`${uid}-colleges`}>
            {collegeNames.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>
      </div>
      <div>
        <label htmlFor={`${uid}-course`} className="label">Course</label>
        <div className="relative">
          <BookOpen className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <select id={`${uid}-course`} className="input appearance-none pl-9" value={course} onChange={(e) => setCourse(e.target.value)}>
            <option value="">All courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{courseOptionLabel(c)}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor={`${uid}-loc`} className="label">Location</label>
        <div className="relative">
          <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <select id={`${uid}-loc`} className="input appearance-none pl-9" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">All cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="btn-primary w-full md:col-span-3 lg:col-span-2 xl:col-span-3">
        Explore Now
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </form>
  )
}

function PhotoFrame({ college, className = '' }) {
  if (!college) {
    return <div className={`rounded-3xl bg-gradient-to-br from-slate-100 to-primary-50 ${className}`} />
  }
  return (
    <figure className={`relative overflow-hidden rounded-3xl shadow-[var(--shadow-card)] ring-1 ring-line/60 ${className}`}>
      <ImageWithFallback src={college.image} alt={college.name} kind="college" name={college.name} className="size-full" loading="eager" />
      <figcaption className="absolute right-3 bottom-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm backdrop-blur">
        {college.shortName ?? college.name}
      </figcaption>
    </figure>
  )
}

function HeroVisual() {
  const reduce = useReducedMotion()
  const photos = campusPhotos(3, [1, 2, 7])
  const priya = findStudentByName('Priya Singh')
  const priyaCollege = priya ? getCollegeById(priya.collegeId) : null
  const priyaCourse = priya ? getCourseById(priya.courseId) : null
  const stats = platformStats()

  const float = (delay) => ({
    initial: { opacity: 0, y: reduce ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  })

  const [main, second, third] = photos
  const priyaMeta = [
    priyaCourse ? (priyaCourse.shortName === priyaCourse.degree ? priyaCourse.degree : `${priyaCourse.degree} ${priyaCourse.shortName}`) : priya?.course,
    priyaCollege?.shortName ?? priya?.collegeName,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <div className="relative hidden lg:block" aria-hidden="true">
      <div className="grid h-[480px] grid-cols-5 grid-rows-2 gap-4 xl:h-[520px]">
        <motion.div {...float(0.1)} className="col-span-3 row-span-2">
          <PhotoFrame college={main} className="h-full" />
        </motion.div>
        <motion.div {...float(0.2)} className="col-span-2">
          <PhotoFrame college={second} className="h-full" />
        </motion.div>
        <motion.div {...float(0.3)} className="col-span-2">
          <PhotoFrame college={third} className="h-full" />
        </motion.div>
      </div>

      {priya && (
        <motion.div {...float(0.5)} className="card absolute bottom-8 -left-8 flex w-72 items-center gap-3 p-3.5">
          <ImageWithFallback src={priya.image} alt="" kind="avatar" name={priya.name} className="size-11 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{priya.name}</p>
            <p className="truncate text-xs text-muted">{priyaMeta}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-success-50 px-2 py-1 text-[11px] font-semibold text-success">
            <CircleCheck className="size-3.5" />
            Connected
          </span>
        </motion.div>
      )}

      <motion.div {...float(0.6)} className="card absolute top-8 -left-8 flex items-center gap-3 px-4 py-3">
        <span className="grid size-9 place-items-center rounded-xl bg-primary-50 text-primary">
          <GraduationCap className="size-5" />
        </span>
        <div className="text-sm leading-tight">
          <p className="font-semibold text-ink">
            {stats.colleges} colleges · {stats.courses} courses
          </p>
          <p className="mt-0.5 text-xs text-muted">Across {stats.cities} {stats.cities === 1 ? 'city' : 'cities'} in Uttar Pradesh</p>
        </div>
      </motion.div>
    </div>
  )
}

function TrustRow() {
  const stats = platformStats()
  const items = [
    { icon: Building2, value: stats.colleges, label: 'Colleges listed' },
    { icon: BookOpen, value: stats.courses, label: 'Course categories' },
    { icon: Users, value: stats.students, label: 'Student profiles' },
    { icon: MapPin, value: stats.cities, label: 'Cities covered' },
  ]
  return (
    <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4 lg:mt-16">
      {items.map(({ icon: Icon, value, label }) => (
        <div key={label} className="flex items-center gap-3 bg-surface px-4 py-4 sm:px-6 sm:py-5">
          <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
          <div className="flex flex-col-reverse">
            <dt className="text-xs text-muted sm:text-sm">{label}</dt>
            <dd className="text-xl font-bold tracking-tight text-ink sm:text-2xl">{value}</dd>
          </div>
        </div>
      ))}
    </dl>
  )
}

export default function HeroSection() {
  const reduce = useReducedMotion()
  const enter = (delay) => ({
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.55, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line/70 bg-surface">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(15_23_42/0.06)_1px,transparent_0)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="container-page relative py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14 xl:gap-20">
          <div className="min-w-0">
            <motion.p {...enter(0)} className="chip-primary">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
              College discovery for Uttar Pradesh
            </motion.p>
            <motion.h1 {...enter(0.05)} id="hero-title" className="mt-5 text-4xl leading-[1.08] font-extrabold sm:text-5xl xl:text-[3.4rem]">
              Discover Colleges. Explore Courses. <span className="text-primary">Connect with Students.</span>
            </motion.h1>
            <motion.p {...enter(0.12)} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Your journey to the right college and the right community starts here. Explore institutions, discover
              opportunities, and connect with students who share your interests.
            </motion.p>

            <motion.div {...enter(0.18)}>
              <SearchPanel />
            </motion.div>

            <motion.div {...enter(0.24)} className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted">Popular:</span>
              {QUICK_LINKS.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="inline-flex min-h-9 items-center rounded-full border border-line bg-surface px-3.5 text-[13px] font-medium text-slate-700 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
                >
                  {l.label}
                </Link>
              ))}
            </motion.div>
          </div>

          <HeroVisual />
        </div>

        <TrustRow />
      </div>
    </section>
  )
}
