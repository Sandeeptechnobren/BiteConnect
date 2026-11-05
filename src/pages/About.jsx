import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Building2,
  Camera,
  CircleCheck,
  Compass,
  HeartHandshake,
  Info,
  Lock,
  MapPin,
  ShieldCheck,
  UserPlus,
  Users,
  UsersRound,
} from 'lucide-react'
import ImageWithFallback from '../components/ImageWithFallback'
import Reveal from '../components/home/Reveal'
import HomeCta from '../components/home/HomeCta'
import { campusPhoto, campusPhotos, photoCredit, platformStats } from '../components/home/homeData'
import { colleges } from '../data/colleges'

const PROBLEMS = [
  'College information is scattered across outdated portals, coaching flyers and word of mouth.',
  'Students in tier-2 and tier-3 cities rarely know a senior at the college they are considering.',
  'It is hard to compare courses, campuses and cities when every source tells a different story.',
]

const APPROACH = [
  {
    icon: Building2,
    title: 'Authentic college information',
    text: 'Publicly available details — location, type, established year, programmes — with real campus photos and credits.',
  },
  {
    icon: BookOpen,
    title: 'Course discovery',
    text: 'Start from what you want to study and see every college that offers it, across undergraduate and postgraduate options.',
  },
  {
    icon: UsersRound,
    title: 'Student-to-student connections',
    text: 'Find students at the colleges you are considering and connect to ask about academics, hostels and campus life.',
  },
]

const VALUES = [
  { icon: ShieldCheck, title: 'Authentic information', text: 'We label representative images clearly and credit every real photo. No invented rankings.' },
  { icon: HeartHandshake, title: 'Student-first', text: 'Built around the questions students actually ask — not around advertising or lead generation.' },
  { icon: Users, title: 'Community', text: 'Peers helping peers. Every connection is a request the other student chooses to accept.' },
  { icon: Lock, title: 'Privacy', text: 'In this prototype your profile and connections stay in your browser’s local storage — nothing is sent to a server.' },
]

const FEATURES = [
  { icon: Building2, title: 'Explore colleges', text: 'Filter by city, course and type, then open detailed college pages.', to: '/colleges', cta: 'Browse colleges' },
  { icon: Compass, title: 'Discover courses', text: 'See every course category and how many colleges offer it.', to: '/courses', cta: 'View courses' },
  { icon: Users, title: 'Meet students', text: 'Search student profiles by college, course and skills.', to: '/students', cta: 'Find students' },
  { icon: UserPlus, title: 'Build your network', text: 'Send, accept and manage connection requests in one place.', to: '/connections', cta: 'My connections' },
]

function AboutHero() {
  const reduce = useReducedMotion()
  const photo = campusPhoto([2, 1, 7])
  const credit = photoCredit(photo)
  const enter = (delay) => ({
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.55, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section aria-labelledby="about-title" className="border-b border-line/70 bg-surface">
      <div className="container-page grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className="min-w-0">
          <motion.p {...enter(0)} className="eyebrow">About Bite Connect</motion.p>
          <motion.h1 {...enter(0.05)} id="about-title" className="mt-3 text-4xl leading-[1.1] font-extrabold sm:text-5xl">
            Every student deserves trustworthy guidance and a <span className="text-primary">community to ask.</span>
          </motion.h1>
          <motion.p {...enter(0.12)} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Bite Connect brings authentic college information, course discovery and student-to-student connections
            together — so choosing a college in Uttar Pradesh feels informed, not like a guess.
          </motion.p>
          <motion.div {...enter(0.18)} className="mt-8 flex flex-wrap gap-3">
            <Link to="/colleges" className="btn-primary">
              Explore colleges
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn-secondary">Contact us</Link>
          </motion.div>
        </div>

        <motion.figure {...enter(0.15)} className="relative min-w-0">
          <ImageWithFallback
            src={photo?.image}
            alt={photo ? `Campus of ${photo.name}` : 'College campus'}
            name={photo?.name}
            kind="college"
            loading="eager"
            className="aspect-[4/3] w-full rounded-3xl shadow-[var(--shadow-card)]"
          />
          {photo && (
            <figcaption className="mt-3 flex items-start gap-2 text-xs text-muted">
              <Camera className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              <span>
                {photo.name}
                {credit && (
                  <>
                    {' · '}
                    {photo.imageCredit?.source ? (
                      <a href={photo.imageCredit.source} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-ink hover:underline">
                        {credit}
                      </a>
                    ) : (
                      credit
                    )}
                  </>
                )}
              </span>
            </figcaption>
          )}
        </motion.figure>
      </div>
    </section>
  )
}

function ProblemApproach() {
  return (
    <section aria-labelledby="problem-title" className="py-16 sm:py-20">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">The problem</p>
          <h2 id="problem-title" className="mt-2 text-2xl font-bold sm:text-3xl">
            Choosing a college shouldn’t depend on who you happen to know
          </h2>
          <ul className="mt-6 space-y-4">
            {PROBLEMS.map((p) => (
              <li key={p} className="flex gap-3 text-base text-muted">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="card p-6 sm:p-8">
            <p className="eyebrow">Our approach</p>
            <h3 className="mt-2 text-xl font-bold sm:text-2xl">Three things, done carefully</h3>
            <ol className="mt-6 divide-y divide-line">
              {APPROACH.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="font-semibold">
                      <span className="mr-2 text-muted tabular-nums">0{i + 1}</span>
                      {title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function NumbersBand() {
  const stats = platformStats()
  const items = [
    { value: stats.colleges, label: 'Colleges & universities' },
    { value: stats.courses, label: 'Course categories' },
    { value: stats.students, label: 'Student profiles' },
    { value: stats.cities, label: 'Cities in Uttar Pradesh' },
  ]
  return (
    <section aria-labelledby="numbers-title" className="border-y border-line/70 bg-surface py-12 sm:py-14">
      <div className="container-page">
        <h2 id="numbers-title" className="sr-only">Bite Connect in numbers</h2>
        <dl className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
          {items.map(({ value, label }, i) => (
            <Reveal key={label} delay={i * 0.05} className={`flex flex-col-reverse px-2 sm:px-6 ${i > 0 ? 'lg:border-l lg:border-line' : ''} ${i % 2 === 1 ? 'border-l border-line lg:border-l' : ''}`}>
              <dt className="mt-1 text-sm text-muted">{label}</dt>
              <dd className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Values() {
  return (
    <section aria-labelledby="values-title" className="py-16 sm:py-20">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">What we value</p>
          <h2 id="values-title" className="mt-2 text-2xl font-bold sm:text-3xl">Principles behind the product</h2>
        </Reveal>
        <ul className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {VALUES.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.05} className="flex gap-4 border-t border-line pt-6">
              <Icon className="size-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Features() {
  const photos = campusPhotos(1, [7, 1, 2])
  const photo = photos[0]
  return (
    <section aria-labelledby="features-title" className="border-y border-line/70 bg-surface py-16 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">What you can do</p>
          <h2 id="features-title" className="mt-2 text-2xl font-bold sm:text-3xl">Everything in one place</h2>
          <p className="mt-3 text-base text-muted">
            From the first search to your first conversation with a senior — Bite Connect covers the whole journey.
          </p>
          {photo && (
            <ImageWithFallback
              src={photo.image}
              alt={`Campus of ${photo.name}`}
              name={photo.name}
              kind="college"
              className="mt-8 hidden aspect-[4/3] w-full rounded-2xl lg:block"
            />
          )}
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {FEATURES.map(({ icon: Icon, title, text, to, cta }, i) => (
            <Reveal as="li" key={title} delay={i * 0.05}>
              <Link to={to} className="card card-hover group flex h-full flex-col p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-primary-50 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function PrototypeNote() {
  const credited = useMemo(() => {
    try {
      return colleges.filter((c) => c?.image && c.isAuthenticPhoto && c.imageCredit).slice(0, 8)
    } catch {
      return []
    }
  }, [])

  return (
    <section aria-labelledby="note-title" className="py-16 sm:py-20">
      <div className="container-page">
        <Reveal className="grid gap-8 rounded-3xl border border-line bg-surface p-6 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="chip">
              <Info className="size-3.5" aria-hidden="true" />
              Prototype notice
            </span>
            <h2 id="note-title" className="mt-4 text-xl font-bold sm:text-2xl">About this prototype</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
              <li className="flex gap-2.5">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                Student profiles are mock profiles created for demonstration. They are not real people.
              </li>
              <li className="flex gap-2.5">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                College details are based on publicly available information and may change — always confirm with the
                institution’s official website.
              </li>
              <li className="flex gap-2.5">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                Campus photos are freely licensed images from Wikimedia Commons. Generic photos are labelled
                “Representative image”.
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Camera className="size-4 text-muted" aria-hidden="true" />
              Photo credits
            </h3>
            {credited.length > 0 ? (
              <ul className="mt-4 divide-y divide-line rounded-2xl border border-line">
                {credited.map((c) => (
                  <li key={c.id} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <Link to={`/colleges/${c.slug}`} className="min-w-0 truncate text-sm font-medium text-ink hover:text-primary">
                      {c.shortName ?? c.name}
                      <span className="sr-only"> — view college</span>
                    </Link>
                    {c.imageCredit?.source ? (
                      <a
                        href={c.imageCredit.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 truncate text-xs text-muted hover:text-ink hover:underline"
                      >
                        {photoCredit(c) || 'Wikimedia Commons'}
                      </a>
                    ) : (
                      <span className="shrink-0 truncate text-xs text-muted">{photoCredit(c) || 'Wikimedia Commons'}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted">
                Photo credits (author and licence, linked to the Wikimedia Commons source) are shown on each college’s page.
              </p>
            )}
            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
              <MapPin className="size-3.5" aria-hidden="true" />
              Full credits appear on every college page beneath the cover photo.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function About() {
  useEffect(() => {
    document.title = 'About — Bite Connect'
  }, [])

  return (
    <>
      <AboutHero />
      <ProblemApproach />
      <NumbersBand />
      <Values />
      <Features />
      <PrototypeNote />
      <HomeCta
        title="Start your college journey with Bite Connect."
        description="Create a free profile to connect with students, or get in touch if you have questions or feedback."
        actions={
          <>
            <Link to="/signup" className="btn-primary">
              Join Bite Connect
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn border border-white/20 text-white hover:bg-white/10">
              Contact us
            </Link>
          </>
        }
      />
    </>
  )
}
