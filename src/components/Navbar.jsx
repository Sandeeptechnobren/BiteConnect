import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Bell,
  BookOpen,
  Building2,
  ChevronDown,
  Compass,
  LogIn,
  LogOut,
  Menu,
  RotateCcw,
  Search,
  User,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import Logo from './Logo'
import Modal from './Modal'
import SearchBar from './SearchBar'
import ImageWithFallback from './ImageWithFallback'
import { useApp } from '../context/AppContext'
import { getCollegeBySlug, getStudentById } from '../data/selectors'
import { cn } from '../utils/format'
import { useBodyScrollLock, useDismiss } from './shell/hooks'

const NAV_LINKS = [
  { to: '/', label: 'Discover', Icon: Compass, end: true },
  { to: '/colleges', label: 'Colleges', Icon: Building2 },
  { to: '/students', label: 'Students', Icon: Users },
  { to: '/courses', label: 'Courses', Icon: BookOpen },
]

function Badge({ count, className = '' }) {
  if (!count) return null
  return (
    <span
      className={cn(
        'grid h-[18px] min-w-[18px] place-items-center rounded-full bg-danger px-1 text-[10px] leading-none font-bold text-white ring-2 ring-white',
        className,
      )}
    >
      {count > 9 ? '9+' : count}
    </span>
  )
}

function Dropdown({ open, children, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -4, transition: { duration: 0.12 } }}
          transition={{ duration: 0.16 }}
          className={cn('card absolute top-full right-0 z-50 mt-2 overflow-hidden', className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function notificationTarget(n) {
  if (n.type === 'request') return '/connections'
  if (n.studentId != null && getStudentById(n.studentId)) return `/students/${n.studentId}`
  if (n.collegeSlug) return `/colleges/${n.collegeSlug}`
  return null
}

function NotificationAvatar({ n }) {
  const student = n.studentId != null ? getStudentById(n.studentId) : null
  if (student) {
    return <ImageWithFallback src={student.image} alt="" kind="avatar" name={student.name} className="size-10 shrink-0 rounded-full text-xs" />
  }
  const college = n.collegeSlug ? getCollegeBySlug(n.collegeSlug) : null
  if (college) {
    return <ImageWithFallback src={college.image} alt="" kind="college" name={college.name} className="size-10 shrink-0 rounded-lg" />
  }
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-50 text-primary">
      <Bell className="size-4" aria-hidden="true" />
    </span>
  )
}

function NotificationsMenu() {
  const { notifications, unreadCount, markAllNotificationsRead } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  useDismiss(ref, open, () => setOpen(false))
  useEffect(() => setOpen(false), [pathname])

  const list = Array.isArray(notifications) ? notifications : []

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={unreadCount ? `Notifications, ${unreadCount} unread` : 'Notifications'}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          'relative grid size-11 cursor-pointer place-items-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-ink',
          open && 'bg-slate-100 text-ink',
        )}
      >
        <Bell className="size-5" aria-hidden="true" />
        <Badge count={unreadCount} className="absolute top-1.5 right-1.5" />
      </button>
      <Dropdown open={open} className="w-96 max-sm:fixed max-sm:inset-x-3 max-sm:top-16 max-sm:mt-1 max-sm:w-auto">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div>
            <p className="text-sm font-bold">Notifications</p>
            <p className="text-xs text-muted">{unreadCount ? `${unreadCount} unread` : 'You are all caught up'}</p>
          </div>
          <button
            type="button"
            onClick={markAllNotificationsRead}
            disabled={!unreadCount}
            className="btn-ghost btn-sm text-primary hover:text-primary-hover disabled:text-muted"
          >
            Mark all as read
          </button>
        </div>
        {list.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-slate-100 text-slate-400">
              <Bell className="size-5" aria-hidden="true" />
            </span>
            <p className="mt-3 text-sm font-semibold">No notifications yet</p>
            <p className="mt-1 text-xs text-muted">Connection requests and updates will show up here.</p>
          </div>
        ) : (
          <ul className="max-h-[min(60vh,26rem)] divide-y divide-line overflow-y-auto overscroll-contain">
            {list.map((n) => {
              const target = notificationTarget(n)
              const body = (
                <>
                  <NotificationAvatar n={n} />
                  <span className="min-w-0 flex-1">
                    <span className={cn('block text-sm leading-snug', n.read ? 'text-slate-600' : 'font-medium text-ink')}>{n.text}</span>
                    <span className="mt-1 flex items-center gap-2 text-xs text-muted">
                      {n.time && <span>{n.time} ago</span>}
                      {n.type === 'request' && <span className="font-semibold text-primary">Review request</span>}
                    </span>
                  </span>
                  {!n.read && <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-primary" aria-label="Unread" />}
                </>
              )
              const cls = cn('flex w-full items-start gap-3 px-4 py-3 text-left transition-colors', !n.read && 'bg-primary-50/40')
              return (
                <li key={n.id}>
                  {target ? (
                    <button type="button" className={cn(cls, 'cursor-pointer hover:bg-slate-50')} onClick={() => {
                        setOpen(false)
                        navigate(target)
                      }}
                    >
                      {body}
                    </button>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
        <div className="border-t border-line p-2">
          <Link to="/connections" onClick={() => setOpen(false)} className="btn-ghost btn-sm w-full text-primary hover:text-primary-hover">
            View connection requests
          </Link>
        </div>
      </Dropdown>
    </div>
  )
}

function ProfileMenu() {
  const { user, connections, logout, resetDemo } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  useDismiss(ref, open, () => setOpen(false))
  useEffect(() => setOpen(false), [pathname])
  const received = connections?.received?.length ?? 0

  const item = 'flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-ink'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open account menu"
        aria-expanded={open}
        aria-haspopup="true"
        className={cn('flex min-h-11 cursor-pointer items-center gap-1.5 rounded-xl py-1 pr-1.5 pl-1 transition hover:bg-slate-100', open && 'bg-slate-100')}
      >
        <ImageWithFallback src={user?.image} alt="" kind="avatar" name={user?.name} className="size-9 rounded-full text-xs ring-2 ring-white" />
        <ChevronDown className={cn('hidden size-4 text-muted transition sm:block', open && 'rotate-180')} aria-hidden="true" />
      </button>
      <Dropdown open={open} className="w-72">
        <div className="flex items-center gap-3 border-b border-line px-4 py-4">
          <ImageWithFallback src={user?.image} alt="" kind="avatar" name={user?.name} className="size-11 shrink-0 rounded-full text-sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{user?.name}</p>
            <p className="truncate text-xs text-muted">{user?.collegeName}</p>
          </div>
        </div>
        <div className="p-2">
          <Link to="/profile" onClick={() => setOpen(false)} className={item}>
            <User className="size-4 text-muted" aria-hidden="true" /> My Profile
          </Link>
          <Link to="/connections" onClick={() => setOpen(false)} className={item}>
            <Users className="size-4 text-muted" aria-hidden="true" />
            <span className="flex-1">Connections</span>
            {received > 0 && <span className="chip-primary">{received} new</span>}
          </Link>
          <button
            type="button"
            className={item}
            onClick={() => {
              setOpen(false)
              resetDemo()
              navigate('/')
            }}
          >
            <RotateCcw className="size-4 text-muted" aria-hidden="true" /> Reset demo data
          </button>
        </div>
        <div className="border-t border-line p-2">
          <button
            type="button"
            className={cn(item, 'text-danger hover:bg-red-50 hover:text-danger')}
            onClick={() => {
              setOpen(false)
              logout()
              navigate('/')
            }}
          >
            <LogOut className="size-4" aria-hidden="true" /> Log out
          </button>
        </div>
      </Dropdown>
    </div>
  )
}

function MobileSearchSheet({ open, onClose }) {
  const reduce = useReducedMotion()
  useBodyScrollLock(open)
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (typeof document === 'undefined') return null
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          initial={{ opacity: 0, y: reduce ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -8 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[65] flex flex-col bg-background"
        >
          <div className="flex items-center gap-2 border-b border-line bg-surface px-3 py-3">
            <SearchBar variant="page" autoFocus onNavigate={onClose} className="flex-1" />
            <button type="button" onClick={onClose} className="btn-ghost shrink-0 px-3">
              Cancel
            </button>
          </div>
          <button type="button" aria-label="Close search" className="flex-1 cursor-default" onClick={onClose} tabIndex={-1} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function MobileDrawer({ open, onClose }) {
  const { isAuthenticated, user, connections, unreadCount, logout, resetDemo } = useApp()
  const navigate = useNavigate()
  const received = connections?.received?.length ?? 0
  const row = ({ isActive }) =>
    cn(
      'flex min-h-12 items-center gap-3 rounded-xl px-3 text-[15px] font-semibold transition',
      isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-50 hover:text-ink',
    )

  return (
    <Modal open={open} onClose={onClose} variant="drawer-right" size="sm" title="Menu" bodyClassName="px-3 py-4 sm:px-3">
      <nav aria-label="Mobile" className="flex h-full flex-col" onClick={(e) => e.target.closest?.("a") && onClose()}>
        {isAuthenticated ? (
          <Link to="/profile" className="mb-4 flex items-center gap-3 rounded-2xl border border-line p-3 transition hover:bg-slate-50">
            <ImageWithFallback src={user?.image} alt="" kind="avatar" name={user?.name} className="size-12 shrink-0 rounded-full" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-ink">{user?.name}</span>
              <span className="block truncate text-xs text-muted">{user?.collegeName}</span>
              <span className="mt-0.5 block text-xs font-semibold text-primary">View profile</span>
            </span>
          </Link>
        ) : (
          <div className="mb-4 rounded-2xl bg-primary-50 p-4">
            <p className="text-sm font-semibold text-ink">Join Bite Connect</p>
            <p className="mt-1 text-xs text-muted">Connect with students from colleges across India.</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link to="/login" className="btn-secondary btn-sm min-h-11">
                <LogIn className="size-4" aria-hidden="true" /> Log in
              </Link>
              <Link to="/signup" className="btn-primary btn-sm min-h-11">
                <UserPlus className="size-4" aria-hidden="true" /> Sign up
              </Link>
            </div>
          </div>
        )}

        <ul className="space-y-1">
          {NAV_LINKS.map(({ to, label, Icon, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className={row}>
                <Icon className="size-5" aria-hidden="true" /> {label}
              </NavLink>
            </li>
          ))}
          {isAuthenticated && (
            <li>
              <NavLink to="/connections" className={row}>
                <Users className="size-5" aria-hidden="true" />
                <span className="flex-1">Connections</span>
                {received > 0 && <span className="chip-primary">{received} new</span>}
                {received === 0 && unreadCount > 0 && <Badge count={unreadCount} className="ring-0" />}
              </NavLink>
            </li>
          )}
        </ul>

        <div className="mt-4 border-t border-line pt-4">
          <ul className="space-y-1 text-sm">
            <li>
              <NavLink to="/about" className={row}>About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={row}>Contact</NavLink>
            </li>
          </ul>
        </div>

        {isAuthenticated && (
          <div className="mt-auto space-y-1 border-t border-line pt-4">
            <button
              type="button"
              className="flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-xl px-3 text-[15px] font-semibold text-slate-700 hover:bg-slate-50"
              onClick={() => {
                onClose()
                resetDemo()
                navigate('/')
              }}
            >
              <RotateCcw className="size-5" aria-hidden="true" /> Reset demo data
            </button>
            <button
              type="button"
              className="flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-xl px-3 text-[15px] font-semibold text-danger hover:bg-red-50"
              onClick={() => {
                onClose()
                logout()
                navigate('/')
              }}
            >
              <LogOut className="size-5" aria-hidden="true" /> Log out
            </button>
          </div>
        )}
      </nav>
    </Modal>
  )
}

export default function Navbar() {
  const { isAuthenticated } = useApp()
  const { pathname, search } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close overlays on navigation
  useEffect(() => {
    setDrawerOpen(false)
    setSearchOpen(false)
  }, [pathname, search])

  const loginHref = pathname === '/' ? '/login' : `/login?redirect=${encodeURIComponent(pathname + search)}`
  const onSearchPage = pathname === '/search'

  return (
    <header
      className={cn(
        'sticky top-0 z-40 h-16 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 transition-[border-color,box-shadow] duration-200',
        scrolled ? 'border-line shadow-[0_1px_8px_rgb(15_23_42/0.04)]' : 'border-transparent',
      )}
    >
      <div className="container-page flex h-full items-center gap-3 lg:gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    cn(
                      'relative inline-flex h-10 items-center rounded-lg px-3 text-sm font-semibold transition',
                      isActive ? 'text-primary' : 'text-slate-600 hover:bg-slate-100 hover:text-ink',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && <span className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-primary" aria-hidden="true" />}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {!onSearchPage && (
            <div className="hidden w-56 transition-[width] duration-300 focus-within:w-72 md:block xl:w-72 xl:focus-within:w-80">
              <SearchBar variant="navbar" />
            </div>
          )}
          {!onSearchPage && (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="grid size-11 cursor-pointer place-items-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-ink md:hidden"
            >
              <Search className="size-5" aria-hidden="true" />
            </button>
          )}

          {isAuthenticated ? (
            <>
              <NotificationsMenu />
              <ProfileMenu />
            </>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to={loginHref} className="btn-ghost">
                Log in
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign up
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            className="grid size-11 cursor-pointer place-items-center rounded-xl text-slate-700 transition hover:bg-slate-100 lg:hidden"
          >
            {drawerOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <MobileSearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
