import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Clock, UserPlus, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { cn } from '../utils/format'
import ConfirmDialog from './students/ConfirmDialog'
import { SELF_ID, findStudent } from './students/helpers'

function Label({ id, children }) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={id}
        className="inline-flex items-center gap-1.5"
        initial={reduce ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  )
}

/**
 * <ConnectionButton studentId size="sm|md" fullWidth />
 * none → Connect · sent → Request Sent (hover/focus → Cancel request) · received → Accept / Decline · connected → Connected (→ remove)
 */
export default function ConnectionButton({ studentId, size = 'md', fullWidth = false, className = '' }) {
  const { getStatus, sendRequest, cancelRequest, acceptRequest, rejectRequest, removeConnection, isAuthenticated } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [hovered, setHovered] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  if (studentId == null || studentId === SELF_ID) return null

  const status = getStatus(studentId)
  const name = findStudent(studentId)?.name ?? 'this student'
  const sizeCls = size === 'sm' ? 'btn-sm' : ''
  const widthCls = fullWidth ? 'w-full' : ''

  const onConnect = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      sendRequest(studentId) // shows the "log in" toast
      const redirect = encodeURIComponent(location.pathname + location.search)
      navigate(`/login?redirect=${redirect}`)
      return
    }
    sendRequest(studentId)
  }

  if (status === 'received') {
    return (
      <div className={cn('flex gap-2', widthCls, className)}>
        <button
          type="button"
          className={cn('btn-primary', sizeCls, fullWidth && 'flex-1')}
          onClick={() => acceptRequest(studentId)}
          aria-label={`Accept connection request from ${name}`}
        >
          <Check className="size-4" aria-hidden="true" />
          Accept
        </button>
        <button
          type="button"
          className={cn('btn-secondary', sizeCls, fullWidth && 'flex-1')}
          onClick={() => rejectRequest(studentId)}
          aria-label={`Decline connection request from ${name}`}
        >
          <X className="size-4" aria-hidden="true" />
          Decline
        </button>
      </div>
    )
  }

  if (status === 'sent') {
    return (
      <button
        type="button"
        className={cn(
          'btn-secondary',
          sizeCls,
          widthCls,
          hovered && 'border-red-200 bg-red-50 text-danger hover:border-red-200 hover:bg-red-50',
          className,
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onClick={() => {
          setHovered(false)
          cancelRequest(studentId)
        }}
        aria-label={`Cancel connection request to ${name}`}
        title="Cancel request"
      >
        {hovered ? (
          <Label id="cancel">
            <X className="size-4" aria-hidden="true" />
            Cancel request
          </Label>
        ) : (
          <Label id="sent">
            <Clock className="size-4" aria-hidden="true" />
            Request Sent
          </Label>
        )}
      </button>
    )
  }

  if (status === 'connected') {
    return (
      <>
        <button
          type="button"
          className={cn('btn-success', sizeCls, widthCls, 'hover:bg-success/10', className)}
          onClick={() => setConfirmOpen(true)}
          aria-label={`Connected with ${name}. Open options to remove connection`}
          aria-haspopup="dialog"
        >
          <Label id="connected">
            <Check className="size-4" aria-hidden="true" />
            Connected
          </Label>
        </button>
        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => removeConnection(studentId)}
          title="Remove connection?"
          description={`${name} won't be notified, but you'll need to send a new request to reconnect.`}
          confirmLabel="Remove connection"
        />
      </>
    )
  }

  return (
    <button
      type="button"
      className={cn('btn-primary', sizeCls, widthCls, className)}
      onClick={onConnect}
      aria-label={`Connect with ${name}`}
    >
      <Label id="connect">
        <UserPlus className="size-4" aria-hidden="true" />
        Connect
      </Label>
    </button>
  )
}
