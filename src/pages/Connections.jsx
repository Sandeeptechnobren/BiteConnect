import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Clock, Inbox, MessageSquare, Search, Send, UserMinus, UserPlus, UsersRound, X } from 'lucide-react'
import StudentCard from '../components/StudentCard'
import ConfirmDialog from '../components/students/ConfirmDialog'
import { useApp } from '../context/AppContext'
import { cn, matches, pluralize } from '../utils/format'
import { collegeLabel, findStudent, getSuggestions, list } from '../components/students/helpers'

const TABS = [
  { id: 'connections', label: 'My Connections', short: 'Connections', icon: UsersRound },
  { id: 'received', label: 'Received Requests', short: 'Received', icon: Inbox },
  { id: 'sent', label: 'Sent Requests', short: 'Sent', icon: Send },
]

function EmptyState({ icon: Icon, title, text }) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-primary-50 text-primary">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted">{text}</p>
      <Link to="/students" className="btn-primary mt-6">
        <UserPlus className="size-4" aria-hidden="true" />
        Discover students
      </Link>
    </div>
  )
}

export default function Connections() {
  const { user, connections, getStatus, acceptRequest, rejectRequest, cancelRequest, removeConnection, toast } = useApp()
  const [params, setParams] = useSearchParams()
  const reduce = useReducedMotion()
  const [query, setQuery] = useState('')
  const [removeId, setRemoveId] = useState(null)

  const tab = (() => {
    try {
      const t = params.get('tab')
      return TABS.some((x) => x.id === t) ? t : 'connections'
    } catch {
      return 'connections'
    }
  })()

  const setTab = (id) => {
    try {
      const next = new URLSearchParams(params)
      if (id === 'connections') next.delete('tab')
      else next.set('tab', id)
      setParams(next, { replace: true })
    } catch {
      /* ignore */
    }
  }

  const resolve = (ids) => list(ids).map((id) => findStudent(id)).filter(Boolean)
  const connected = useMemo(() => resolve(connections?.connected), [connections])
  const received = useMemo(() => resolve(connections?.received), [connections])
  const sent = useMemo(() => resolve(connections?.sent), [connections])
  const counts = { connections: connected.length, received: received.length, sent: sent.length }

  const filteredConnected = connected.filter(
    (s) => !query || [s.name, collegeLabel(s), s.course, ...list(s.skills)].some((h) => matches(h, query)),
  )

  // Computed once so a card stays put (showing "Request Sent") after you click Connect.
  const [suggestions] = useState(() => getSuggestions(user, getStatus, 3))
  const removeTarget = removeId != null ? findStudent(removeId) : null

  const rowMotion = reduce
    ? { initial: false, exit: { opacity: 0 } }
    : {
        layout: true,
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, x: -24, height: 0, transition: { duration: 0.22 } },
        transition: { duration: 0.2 },
      }

  const onTabKey = (e, index) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (index + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length
    setTab(TABS[next].id)
    try {
      document.getElementById(`tab-${TABS[next].id}`)?.focus()
    } catch {
      /* noop */
    }
  }

  return (
    <div className="pb-16">
      <header className="border-b border-line bg-surface">
        <div className="container-page py-8 sm:py-10">
          <p className="eyebrow">Your network</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Connections</h1>
          <p className="mt-2 text-muted">
            {pluralize(counts.connections, 'connection')} · {pluralize(counts.received, 'pending invitation')} · {pluralize(counts.sent, 'sent request')}
          </p>
        </div>
      </header>

      <div className="container-page mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="card min-w-0 overflow-hidden">
          {/* Tabs */}
          <div role="tablist" aria-label="Connections" className="no-scrollbar flex overflow-x-auto border-b border-line px-2 sm:px-4">
            {TABS.map((t, i) => {
              const active = tab === t.id
              const Icon = t.icon
              return (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setTab(t.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={cn(
                    'relative flex min-h-12 shrink-0 cursor-pointer items-center gap-2 px-3 text-sm font-semibold whitespace-nowrap transition sm:px-4',
                    active ? 'text-primary' : 'text-muted hover:text-ink',
                  )}
                >
                  <Icon className="hidden size-4 sm:block" aria-hidden="true" />
                  <span className="sm:hidden">{t.short}</span>
                  <span className="hidden sm:inline">{t.label}</span>
                  <span
                    className={cn(
                      'grid min-w-5 place-items-center rounded-full px-1.5 py-0.5 text-[11px] leading-none',
                      active ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600',
                    )}
                  >
                    {counts[t.id]}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="connections-tab-underline"
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary"
                      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`}>
            {tab === 'connections' &&
              (connected.length === 0 ? (
                <EmptyState icon={UsersRound} title="No connections yet" text="Connect with classmates and seniors to build your network on Bite Connect." />
              ) : (
                <>
                  <div className="border-b border-line p-4">
                    <div className="relative">
                      <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                      <label htmlFor="conn-search" className="sr-only">
                        Search your connections
                      </label>
                      <input
                        id="conn-search"
                        type="search"
                        className="input pl-10"
                        placeholder="Search by name, college or skill"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  {filteredConnected.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                      <p className="text-sm text-muted">No connections match "{query}".</p>
                      <button type="button" className="btn-ghost mt-3" onClick={() => setQuery('')}>
                        Clear search
                      </button>
                    </div>
                  ) : (
                    <ul className="divide-y divide-line">
                      <AnimatePresence initial={false}>
                        {filteredConnected.map((s) => (
                          <motion.li key={s.id} {...rowMotion} className="overflow-hidden">
                            <StudentCard
                              student={s}
                              variant="row"
                              actions={
                                <>
                                  <button type="button" className="btn-secondary btn-sm" onClick={() => toast('Messaging is coming soon', { type: 'info' })}>
                                    <MessageSquare className="size-4" aria-hidden="true" />
                                    Message
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-ghost btn-sm hover:bg-red-50 hover:text-danger"
                                    onClick={() => setRemoveId(s.id)}
                                    aria-label={`Remove ${s.name} from connections`}
                                  >
                                    <UserMinus className="size-4" aria-hidden="true" />
                                    Remove
                                  </button>
                                </>
                              }
                            />
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  )}
                </>
              ))}

            {tab === 'received' &&
              (received.length === 0 ? (
                <EmptyState icon={Inbox} title="No pending invitations" text="When students send you a connection request, it will show up here." />
              ) : (
                <ul className="divide-y divide-line">
                  <AnimatePresence initial={false}>
                    {received.map((s) => (
                      <motion.li key={s.id} {...rowMotion} className="overflow-hidden">
                        <StudentCard
                          student={s}
                          variant="row"
                          showMutual
                          actions={
                            <>
                              <button type="button" className="btn-primary btn-sm" onClick={() => acceptRequest(s.id)} aria-label={`Accept request from ${s.name}`}>
                                <Check className="size-4" aria-hidden="true" />
                                Accept
                              </button>
                              <button type="button" className="btn-secondary btn-sm" onClick={() => rejectRequest(s.id)} aria-label={`Reject request from ${s.name}`}>
                                <X className="size-4" aria-hidden="true" />
                                Reject
                              </button>
                            </>
                          }
                        />
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              ))}

            {tab === 'sent' &&
              (sent.length === 0 ? (
                <EmptyState icon={Send} title="No sent requests" text="Requests you send to other students will appear here until they respond." />
              ) : (
                <ul className="divide-y divide-line">
                  <AnimatePresence initial={false}>
                    {sent.map((s) => (
                      <motion.li key={s.id} {...rowMotion} className="overflow-hidden">
                        <StudentCard
                          student={s}
                          variant="row"
                          actions={
                            <>
                              <span className="chip bg-amber-50 text-warning">
                                <Clock className="size-3.5" aria-hidden="true" />
                                Pending
                              </span>
                              <button type="button" className="btn-secondary btn-sm" onClick={() => cancelRequest(s.id)} aria-label={`Cancel request to ${s.name}`}>
                                Cancel Request
                              </button>
                            </>
                          }
                        />
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              ))}
          </div>
        </div>

        <aside className="min-w-0 space-y-6" aria-label="Suggestions">
          <section className="card px-5 pt-5 pb-3">
            <h2 className="font-bold">Grow your network</h2>
            <p className="mt-1 text-sm text-muted">Students from your college and course.</p>
            {suggestions.length ? (
              <ul className="mt-2 divide-y divide-line">
                {suggestions.map((s) => (
                  <li key={s.id}>
                    <StudentCard student={s} variant="compact" showMutual />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-4 text-sm text-muted">You’re connected with everyone we’d suggest right now.</p>
            )}
            <Link to="/students" className="btn-ghost btn-sm mt-1 w-full text-primary">
              See all students
            </Link>
          </section>
        </aside>
      </div>

      <ConfirmDialog
        open={removeTarget != null}
        onClose={() => setRemoveId(null)}
        onConfirm={() => removeId != null && removeConnection(removeId)}
        title="Remove connection?"
        description={removeTarget ? `${removeTarget.name} won't be notified, but you'll need to send a new request to reconnect.` : ''}
        confirmLabel="Remove"
      />
    </div>
  )
}
