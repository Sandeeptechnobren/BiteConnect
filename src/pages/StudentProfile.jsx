import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  CircleCheck,
  Code2,
  ExternalLink,
  Globe,
  GraduationCap,
  Heart,
  MapPin,
  MessageSquare,
  Pencil,
  Plus,
  Share2,
  Sparkles,
  UserRound,
  UsersRound,
} from 'lucide-react'
import ImageWithFallback from '../components/ImageWithFallback'
import ConnectionButton from '../components/ConnectionButton'
import StudentCard from '../components/StudentCard'
import CollegeCard from '../components/CollegeCard'
import EditProfileModal from '../components/EditProfileModal'
import MutualAvatars from '../components/students/MutualAvatars'
import { GitHubIcon, LinkedInIcon } from '../components/students/SocialIcons'
import { useApp } from '../context/AppContext'
import { cn, pluralize } from '../utils/format'
import { allStudents, findStudent, getMutualStudents, list, profileCompleteness, safeCollege } from '../components/students/helpers'

function Section({ title, icon: Icon, children, action, className = '' }) {
  return (
    <section className={cn('card p-5 sm:p-6', className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          {Icon && <Icon className="size-5 text-primary" aria-hidden="true" />}
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  )
}

function EmptyHint({ children, onAdd, addLabel }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-line bg-slate-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted">{children}</p>
      {onAdd && (
        <button type="button" className="btn-secondary btn-sm shrink-0" onClick={onAdd}>
          <Plus className="size-4" aria-hidden="true" />
          {addLabel}
        </button>
      )}
    </div>
  )
}

function NotFoundBlock() {
  return (
    <div className="container-page py-20">
      <div className="card mx-auto flex max-w-lg flex-col items-center px-6 py-14 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-primary-50 text-primary">
          <UserRound className="size-6" aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-2xl font-bold">Profile not found</h1>
        <p className="mt-2 text-sm text-muted">This student profile doesn’t exist or may have been removed.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link to="/students" className="btn-primary">
            Discover students
          </Link>
          <Link to="/" className="btn-secondary">
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}

const iconBtn = 'grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-slate-600 transition hover:border-slate-300 hover:text-primary'

export default function StudentProfile({ self = false }) {
  const { id } = useParams()
  const { user, connections, toast } = useApp()
  const reduce = useReducedMotion()
  const [editOpen, setEditOpen] = useState(false)

  const student = self ? user : findStudent(id)

  useEffect(() => {
    if (!student?.name) return undefined
    try {
      const prev = document.title
      document.title = `${self ? 'My profile' : student.name} · Bite Connect`
      return () => {
        document.title = prev
      }
    } catch {
      return undefined
    }
  }, [student?.name, self])

  useEffect(() => {
    try {
      window.scrollTo({ top: 0 })
    } catch {
      /* noop */
    }
  }, [id, self])

  const others = useMemo(() => {
    if (!student) return []
    const pool = allStudents().filter((s) => s.id !== student.id)
    const same = pool.filter((s) => s.collegeId === student.collegeId || (student.courseId && s.courseId === student.courseId))
    return (same.length >= 3 ? same : [...same, ...pool.filter((s) => !same.includes(s))]).slice(0, 4)
  }, [student])

  const connectedPeople = useMemo(
    () => (self ? list(connections?.connected).map((cid) => findStudent(cid)).filter(Boolean) : []),
    [self, connections],
  )

  if (!student) return <NotFoundBlock />

  const college = safeCollege(student.collegeId)
  const collegeName = student.collegeName || college?.shortName || college?.name
  const skills = list(student.skills)
  const interests = list(student.interests)
  const projects = list(student.projects)
  const social = student.social ?? {}
  const socialLinks = [
    social.linkedin && { key: 'linkedin', label: 'LinkedIn', href: social.linkedin, Icon: LinkedInIcon },
    social.github && { key: 'github', label: 'GitHub', href: social.github, Icon: GitHubIcon },
    social.portfolio && { key: 'portfolio', label: 'Portfolio', href: social.portfolio, Icon: Globe },
  ].filter(Boolean)
  const education = list(student.education).length
    ? list(student.education)
    : collegeName
      ? [{ school: college?.name || collegeName, degree: student.course, period: [student.year, student.semester].filter(Boolean).join(' · '), current: true }]
      : []
  const completeness = self ? profileCompleteness(student) : null
  const openEdit = () => setEditOpen(true)
  const mutuals = self ? [] : getMutualStudents(student, 5)

  const share = async () => {
    const url = (() => {
      try {
        return self ? `${window.location.origin}/profile` : window.location.href
      } catch {
        return ''
      }
    })()
    try {
      if (!url || !navigator.clipboard?.writeText) throw new Error('clipboard unavailable')
      await navigator.clipboard.writeText(url)
      toast('Profile link copied to clipboard')
    } catch {
      toast('Could not copy the link. Copy it from the address bar instead.', { type: 'error' })
    }
  }

  const fade = (delay = 0) =>
    reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, delay } }

  return (
    <div className="pb-16">
      <div className="container-page pt-6 sm:pt-8">
        {/* Header card */}
        <motion.section {...fade()} className="card overflow-hidden" aria-label="Profile header">
          <div className="relative h-32 sm:h-44 lg:h-52">
            {college?.image ? (
              <>
                <div className="absolute inset-0">
                  <ImageWithFallback src={college.image} alt="" kind="college" name={collegeName} className="size-full" loading="eager" />
                </div>
                <div className="absolute inset-0 bg-secondary/55" aria-hidden="true" />
                {collegeName && (
                  <p className="absolute right-4 bottom-3 hidden max-w-[60%] truncate text-xs font-medium text-white/80 sm:block">
                    {college?.isAuthenticPhoto === false ? 'Representative image · ' : ''}
                    {college?.name || collegeName}
                  </p>
                )}
              </>
            ) : (
              <div className="absolute inset-0 border-b border-primary-100 bg-primary-50" aria-hidden="true" />
            )}
          </div>

          <div className="px-5 pb-6 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="relative z-10 -mt-14 w-fit shrink-0 sm:-mt-20">
                <ImageWithFallback
                  key={student.image ?? 'no-photo'}
                  src={student.image}
                  alt={`${student.name || 'Student'}’s profile photo`}
                  name={student.name}
                  kind="avatar"
                  loading="eager"
                  className="size-28 rounded-full text-3xl ring-4 ring-white sm:size-36 sm:text-4xl"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:pb-1">
                {self ? (
                  <>
                    <button type="button" className="btn-primary" onClick={openEdit}>
                      <Pencil className="size-4" aria-hidden="true" />
                      Edit Profile
                    </button>
                    <button type="button" className="btn-secondary" onClick={share}>
                      <Share2 className="size-4" aria-hidden="true" />
                      Share profile
                    </button>
                  </>
                ) : (
                  <>
                    <ConnectionButton studentId={student.id} />
                    <button type="button" className="btn-secondary" onClick={() => toast('Messaging is coming soon', { type: 'info' })}>
                      <MessageSquare className="size-4" aria-hidden="true" />
                      Message
                    </button>
                    <button type="button" className={iconBtn} onClick={share} aria-label="Copy link to this profile">
                      <Share2 className="size-4" aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 min-w-0">
              <h1 className="text-2xl font-extrabold break-words sm:text-3xl">{student.name || 'Your name'}</h1>
              {student.headline ? (
                <p className="mt-1 text-base text-slate-700">{student.headline}</p>
              ) : (
                self && (
                  <button type="button" onClick={openEdit} className="mt-1 cursor-pointer text-sm font-medium text-primary hover:underline">
                    Add a headline
                  </button>
                )
              )}
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                {collegeName &&
                  (college?.slug ? (
                    <Link to={`/colleges/${college.slug}`} className="inline-flex items-center gap-1.5 font-medium text-ink hover:text-primary hover:underline">
                      <GraduationCap className="size-4 text-slate-400" aria-hidden="true" />
                      {collegeName}
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                      <GraduationCap className="size-4 text-slate-400" aria-hidden="true" />
                      {collegeName}
                    </span>
                  ))}
                {student.course && <span aria-hidden="true">·</span>}
                {student.course && <span>{student.course}</span>}
                {student.year && <span aria-hidden="true">·</span>}
                {student.year && <span>{student.year}</span>}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                {student.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4 text-slate-400" aria-hidden="true" />
                    {student.location}
                  </span>
                )}
                {self ? (
                  <Link to="/connections" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
                    <UsersRound className="size-4" aria-hidden="true" />
                    {pluralize(connectedPeople.length, 'connection')}
                  </Link>
                ) : (
                  <MutualAvatars student={student} className="text-sm" />
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Body */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <motion.div {...fade(0.05)} className="min-w-0 space-y-6">
            {/* About */}
            {(student.about || self) && (
              <Section
                title="About"
                icon={UserRound}
                action={
                  self && student.about ? (
                    <button type="button" className={cn(iconBtn, 'size-9 rounded-lg')} onClick={openEdit} aria-label="Edit about section">
                      <Pencil className="size-4" aria-hidden="true" />
                    </button>
                  ) : null
                }
              >
                {student.about ? (
                  <p className="text-[15px] leading-relaxed whitespace-pre-line text-slate-700">{student.about}</p>
                ) : (
                  <EmptyHint onAdd={openEdit} addLabel="Add summary">
                    Write a short summary about what you study, build and are looking for.
                  </EmptyHint>
                )}
              </Section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <Section title="Education" icon={GraduationCap}>
                <ol className="relative space-y-6 border-l border-line pl-6">
                  {education.map((e, i) => (
                    <li key={`${e.school}-${i}`} className="relative">
                      <span
                        className={cn(
                          'absolute top-1 -left-[33px] grid size-4 place-items-center rounded-full ring-4 ring-white',
                          i === 0 ? 'bg-primary' : 'bg-slate-300',
                        )}
                        aria-hidden="true"
                      />
                      <h3 className="font-semibold">{e.school}</h3>
                      {e.degree && <p className="text-sm text-slate-700">{e.degree}</p>}
                      {e.period && <p className="mt-0.5 text-xs text-muted">{e.period}</p>}
                    </li>
                  ))}
                </ol>
              </Section>
            )}

            {/* Skills */}
            {(skills.length > 0 || self) && (
              <Section title="Skills" icon={Sparkles}>
                {skills.length ? (
                  <ul className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <li key={s}>
                        <Link to={`/students?skills=${encodeURIComponent(s)}`} className="chip-primary min-h-8 px-3 text-[13px] hover:bg-primary-100">
                          {s}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyHint onAdd={openEdit} addLabel="Add skills">
                    Skills help classmates and seniors find you.
                  </EmptyHint>
                )}
              </Section>
            )}

            {/* Interests */}
            {(interests.length > 0 || self) && (
              <Section title="Interests" icon={Heart}>
                {interests.length ? (
                  <ul className="flex flex-wrap gap-2">
                    {interests.map((s) => (
                      <li key={s} className="chip min-h-8 px-3 text-[13px]">
                        {s}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyHint onAdd={openEdit} addLabel="Add interests">
                    Share what you’re curious about outside class.
                  </EmptyHint>
                )}
              </Section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <Section title="Projects" icon={Code2}>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {projects.map((p, i) => (
                    <li key={`${p.title}-${i}`} className="flex flex-col rounded-xl border border-line p-4 transition hover:border-primary-200 hover:bg-primary-50/30">
                      <div className="flex items-start gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary">
                          <BookOpen className="size-4" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-semibold">{p.title}</h3>
                          {p.description && <p className="mt-1 text-sm leading-relaxed text-muted">{p.description}</p>}
                        </div>
                      </div>
                      {list(p.tech).length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
                          {list(p.tech).map((t) => (
                            <li key={t} className="chip text-[11px]">
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Social links */}
            {(socialLinks.length > 0 || self) && (
              <Section title="Links" icon={Globe}>
                {socialLinks.length ? (
                  <ul className="flex flex-wrap gap-2">
                    {socialLinks.map(({ key, label, href, Icon }) => (
                      <li key={key}>
                        <a href={href} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-sm">
                          <Icon className="size-4" aria-hidden="true" />
                          {label}
                          <ExternalLink className="size-3.5 text-slate-400" aria-hidden="true" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyHint onAdd={openEdit} addLabel="Add links">
                    Add your LinkedIn, GitHub or portfolio.
                  </EmptyHint>
                )}
              </Section>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.aside {...fade(0.1)} className="min-w-0 space-y-6" aria-label="Profile sidebar">
            {self && completeness && (
              <section className="card p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold">Profile strength</h2>
                  <span className="text-sm font-semibold text-primary">{completeness.percent}%</span>
                </div>
                <div
                  className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-valuenow={completeness.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Profile completeness"
                >
                  <div
                    className={cn('h-full rounded-full transition-all duration-500', completeness.percent === 100 ? 'bg-success' : 'bg-primary')}
                    style={{ width: `${completeness.percent}%` }}
                  />
                </div>
                {completeness.missing.length ? (
                  <>
                    <ul className="mt-4 space-y-2">
                      {completeness.missing.slice(0, 4).map((m) => (
                        <li key={m.key}>
                          <button type="button" onClick={openEdit} className="flex w-full cursor-pointer items-center gap-2 rounded-lg text-left text-sm text-slate-700 hover:text-primary">
                            <Plus className="size-4 shrink-0 text-primary" aria-hidden="true" />
                            {m.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button type="button" className="btn-secondary btn-sm mt-4 w-full" onClick={openEdit}>
                      Complete your profile
                    </button>
                  </>
                ) : (
                  <p className="mt-3 flex items-center gap-2 text-sm text-success">
                    <CircleCheck className="size-4" aria-hidden="true" />
                    Your profile is complete. Nice work!
                  </p>
                )}
              </section>
            )}

            {/* Connections summary / mutuals */}
            {self ? (
              <section className="card p-5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-bold">Your network</h2>
                  <Link to="/connections" className="text-sm font-semibold text-primary hover:underline">
                    Manage
                  </Link>
                </div>
                <p className="mt-1 text-sm text-muted">{pluralize(connectedPeople.length, 'connection')}</p>
                {connectedPeople.length > 0 ? (
                  <div className="mt-4 flex items-center">
                    <div className="flex -space-x-2">
                      {connectedPeople.slice(0, 6).map((p) => (
                        <Link key={p.id} to={`/students/${p.id}`} className="rounded-full" title={p.name}>
                          <ImageWithFallback src={p.image} alt={p.name} name={p.name} kind="avatar" className="size-10 rounded-full text-xs ring-2 ring-white" />
                        </Link>
                      ))}
                    </div>
                    {connectedPeople.length > 6 && <span className="ml-3 text-sm text-muted">+{connectedPeople.length - 6} more</span>}
                  </div>
                ) : (
                  <Link to="/students" className="btn-primary btn-sm mt-4 w-full">
                    Find students to connect with
                  </Link>
                )}
                {connectedPeople.length > 0 && (
                  <Link to="/connections" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                    View all connections
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                )}
              </section>
            ) : (
              mutuals.length > 0 && (
                <section className="card p-5">
                  <h2 className="font-bold">Mutual connections</h2>
                  <p className="mt-1 text-sm text-muted">
                    You and {student.name?.split(' ')[0]} both know {pluralize(Number(student.mutualConnections) || mutuals.length, 'person', 'people')}
                  </p>
                  <ul className="mt-3 divide-y divide-line">
                    {mutuals.slice(0, 3).map((m) => (
                      <li key={m.id}>
                        <Link to={`/students/${m.id}`} className="flex items-center gap-3 py-2.5 hover:text-primary">
                          <ImageWithFallback src={m.image} alt="" name={m.name} kind="avatar" className="size-9 shrink-0 rounded-full text-xs" />
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold">{m.name}</span>
                            <span className="block truncate text-xs text-muted">{m.collegeName}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            )}

            {college && (
              <section aria-label="College">
                <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted uppercase">{self ? 'Your college' : 'Studies at'}</h2>
                <CollegeCard college={college} variant="compact" />
              </section>
            )}

            {others.length > 0 && (
              <section className="card px-5 pt-5 pb-2">
                <h2 className="font-bold">{self ? 'People you may know' : 'People also viewed'}</h2>
                <ul className="divide-y divide-line">
                  {others.map((s) => (
                    <li key={s.id}>
                      <StudentCard student={s} variant="compact" />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </motion.aside>
        </div>
      </div>

      {self && <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />}
    </div>
  )
}
