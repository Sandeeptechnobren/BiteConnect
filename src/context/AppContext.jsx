import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { demoUser, students } from '../data/students'
import { initialConnections, initialNotifications } from '../data/connections'
import { clearState, loadState, saveState } from '../utils/storage'

/**
 * Global app state (frontend-only, persisted to localStorage).
 *
 * const {
 *   isAuthenticated, user, login, signup, logout, updateProfile,
 *   connections, getStatus, sendRequest, cancelRequest, acceptRequest, rejectRequest, removeConnection,
 *   notifications, unreadCount, markAllNotificationsRead,
 *   toasts, toast, dismissToast,
 * } = useApp()
 *
 * getStatus(studentId) → 'none' | 'sent' | 'received' | 'connected'
 * Connection actions return true on success, false if not allowed (e.g. logged out / duplicate).
 * toast(message, { type: 'success' | 'info' | 'error', duration })
 */
const AppContext = createContext(null)

const STORAGE = { session: 'session', profile: 'profile', connections: 'connections', notifications: 'notifications' }
const EMPTY_CONNECTIONS = { connected: [], received: [], sent: [] }

const studentName = (id) => students.find((s) => s.id === id)?.name ?? 'this student'

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => loadState(STORAGE.session, false))
  const [user, setUser] = useState(() => ({ ...demoUser, ...loadState(STORAGE.profile, {}) }))
  const [connections, setConnections] = useState(() => {
    const saved = loadState(STORAGE.connections, null)
    return saved && Array.isArray(saved.sent) ? { ...EMPTY_CONNECTIONS, ...saved } : initialConnections
  })
  const [notifications, setNotifications] = useState(() => loadState(STORAGE.notifications, initialNotifications))
  const [toasts, setToasts] = useState([])
  const toastTimers = useRef(new Map())

  useEffect(() => saveState(STORAGE.session, isAuthenticated), [isAuthenticated])
  useEffect(() => saveState(STORAGE.connections, connections), [connections])
  useEffect(() => saveState(STORAGE.notifications, notifications), [notifications])

  // ── Toasts ────────────────────────────────────────────────
  const dismissToast = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id))
    clearTimeout(toastTimers.current.get(id))
    toastTimers.current.delete(id)
  }, [])

  const toast = useCallback(
    (message, { type = 'success', duration = 3500 } = {}) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      setToasts((list) => [...list.slice(-3), { id, message, type }])
      toastTimers.current.set(id, setTimeout(() => dismissToast(id), duration))
      return id
    },
    [dismissToast],
  )

  useEffect(() => {
    const timers = toastTimers.current
    return () => timers.forEach((t) => clearTimeout(t))
  }, [])

  // ── Auth (mock — nothing is sent anywhere) ────────────────
  const login = useCallback(
    ({ email } = {}) => {
      setIsAuthenticated(true)
      if (email) setUser((u) => ({ ...u, email }))
      toast(`Welcome back, ${user.name.split(' ')[0]}!`)
      return true
    },
    [toast, user.name],
  )

  const signup = useCallback(
    (details = {}) => {
      const { password, confirmPassword, ...profile } = details // never stored
      const next = { ...demoUser, ...profile }
      setUser(next)
      saveState(STORAGE.profile, profile)
      setIsAuthenticated(true)
      toast(`Welcome to Bite Connect, ${(next.name || 'there').split(' ')[0]}!`)
      return true
    },
    [toast],
  )

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    toast('You have been logged out', { type: 'info' })
  }, [toast])

  const updateProfile = useCallback((patch) => {
    setUser((current) => {
      const next = { ...current, ...patch }
      const { id, ...persisted } = next
      saveState(STORAGE.profile, persisted)
      return next
    })
    return true
  }, [])

  // ── Connections ───────────────────────────────────────────
  const getStatus = useCallback(
    (id) => {
      if (connections.connected.includes(id)) return 'connected'
      if (connections.sent.includes(id)) return 'sent'
      if (connections.received.includes(id)) return 'received'
      return 'none'
    },
    [connections],
  )

  const without = (list, id) => list.filter((x) => x !== id)

  const sendRequest = useCallback(
    (id) => {
      if (!isAuthenticated) {
        toast('Log in to send connection requests', { type: 'info' })
        return false
      }
      if (getStatus(id) !== 'none') {
        toast(`You already have a request with ${studentName(id)}`, { type: 'info' })
        return false
      }
      setConnections((c) => ({ ...c, sent: [...c.sent, id] }))
      toast(`Connection request sent to ${studentName(id)}`)
      return true
    },
    [getStatus, isAuthenticated, toast],
  )

  const cancelRequest = useCallback(
    (id) => {
      if (getStatus(id) !== 'sent') return false
      setConnections((c) => ({ ...c, sent: without(c.sent, id) }))
      toast(`Request to ${studentName(id)} cancelled`, { type: 'info' })
      return true
    },
    [getStatus, toast],
  )

  const acceptRequest = useCallback(
    (id) => {
      if (getStatus(id) !== 'received') return false
      setConnections((c) => ({ ...c, received: without(c.received, id), connected: [id, ...c.connected] }))
      setNotifications((list) => list.map((n) => (n.studentId === id ? { ...n, read: true } : n)))
      toast(`You are now connected with ${studentName(id)}`)
      return true
    },
    [getStatus, toast],
  )

  const rejectRequest = useCallback(
    (id) => {
      if (getStatus(id) !== 'received') return false
      setConnections((c) => ({ ...c, received: without(c.received, id) }))
      setNotifications((list) => list.map((n) => (n.studentId === id ? { ...n, read: true } : n)))
      toast(`Request from ${studentName(id)} declined`, { type: 'info' })
      return true
    },
    [getStatus, toast],
  )

  const removeConnection = useCallback(
    (id) => {
      if (getStatus(id) !== 'connected') return false
      setConnections((c) => ({ ...c, connected: without(c.connected, id) }))
      toast(`Removed ${studentName(id)} from your connections`, { type: 'info' })
      return true
    },
    [getStatus, toast],
  )

  // ── Notifications ─────────────────────────────────────────
  const unreadCount = notifications.filter((n) => !n.read).length
  const markAllNotificationsRead = useCallback(() => setNotifications((list) => list.map((n) => ({ ...n, read: true }))), [])

  // Dev/demo helper: wipe everything back to the seed data.
  const resetDemo = useCallback(() => {
    Object.values(STORAGE).forEach(clearState)
    setConnections(initialConnections)
    setNotifications(initialNotifications)
    setUser(demoUser)
    setIsAuthenticated(false)
    toast('Demo data reset', { type: 'info' })
  }, [toast])

  const value = useMemo(
    () => ({
      isAuthenticated, user, login, signup, logout, updateProfile,
      connections, getStatus, sendRequest, cancelRequest, acceptRequest, rejectRequest, removeConnection,
      notifications, unreadCount, markAllNotificationsRead,
      toasts, toast, dismissToast, resetDemo,
    }),
    [isAuthenticated, user, login, signup, logout, updateProfile, connections, getStatus, sendRequest, cancelRequest,
      acceptRequest, rejectRequest, removeConnection, notifications, unreadCount, markAllNotificationsRead, toasts, toast,
      dismissToast, resetDemo],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
