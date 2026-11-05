import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../utils/format'
import { useBodyScrollLock } from './shell/hooks'

const CENTER_SIZES = { sm: 'sm:max-w-md', md: 'sm:max-w-lg', lg: 'sm:max-w-2xl' }
const DRAWER_SIZES = { sm: 'max-w-xs', md: 'max-w-sm', lg: 'max-w-md' }
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * <Modal open onClose title description size="sm|md|lg" variant="center|drawer-right|drawer-left" footer>
 *   body…
 * </Modal>
 * Portal to <body>, Esc + backdrop close, body scroll lock, focus moves into the dialog
 * (light focus trap) and is restored to the previously focused element on close.
 * Optional extras: className (panel), bodyClassName (scroll area).
 */
export default function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  variant = 'center',
  footer,
  children,
  className = '',
  bodyClassName = '',
}) {
  const titleId = useId()
  const descId = useId()
  const panelRef = useRef(null)
  const restoreRef = useRef(null)
  const closeRef = useRef(onClose)
  const reduce = useReducedMotion()

  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useBodyScrollLock(Boolean(open))

  useEffect(() => {
    if (!open) return undefined
    restoreRef.current = document.activeElement
    const raf = requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }))

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        closeRef.current?.()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const nodes = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null)
      if (!nodes.length) {
        event.preventDefault()
        return
      }
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const active = document.activeElement
      if (!panelRef.current.contains(active)) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKey)
      const target = restoreRef.current
      try {
        if (target && typeof target.focus === 'function' && document.contains(target)) target.focus({ preventScroll: true })
      } catch {
        /* ignore */
      }
    }
  }, [open])

  if (typeof document === 'undefined') return null

  const isDrawer = variant === 'drawer-right' || variant === 'drawer-left'
  const fromX = variant === 'drawer-left' ? '-100%' : '100%'

  const panelMotion = isDrawer
    ? {
        initial: { x: reduce ? 0 : fromX, opacity: reduce ? 0 : 1 },
        animate: { x: 0, opacity: 1 },
        exit: { x: reduce ? 0 : fromX, opacity: reduce ? 0 : 1 },
      }
    : {
        initial: { opacity: 0, scale: reduce ? 1 : 0.97, y: reduce ? 0 : 8 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: reduce ? 1 : 0.98, y: reduce ? 0 : 4 },
      }

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className={cn(
            'fixed inset-0 z-[70] flex',
            isDrawer
              ? variant === 'drawer-left'
                ? 'justify-start'
                : 'justify-end'
              : 'items-end justify-center p-3 sm:items-center sm:p-6',
          )}
        >
          <motion.div
            className="absolute inset-0 bg-secondary/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onClose?.()}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-label={title ? undefined : 'Dialog'}
            aria-describedby={description ? descId : undefined}
            tabIndex={-1}
            {...panelMotion}
            transition={{ duration: isDrawer ? 0.28 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'relative flex flex-col bg-surface shadow-2xl outline-none',
              isDrawer
                ? cn(
                    'h-full w-[88vw]',
                    DRAWER_SIZES[size] ?? DRAWER_SIZES.md,
                    variant === 'drawer-left' ? 'border-r border-line' : 'border-l border-line',
                  )
                : cn('max-h-[calc(100dvh-1.5rem)] w-full rounded-2xl sm:max-h-[calc(100dvh-3rem)]', CENTER_SIZES[size] ?? CENTER_SIZES.md),
              className,
            )}
          >
            <div
              className={cn(
                'sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-surface px-5 py-3.5 sm:px-6',
                !isDrawer && 'rounded-t-2xl',
              )}
            >
              <div className="min-w-0 pt-2">
                {title && (
                  <h2 id={titleId} className="text-lg leading-snug font-bold">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id={descId} className="mt-1 text-sm text-muted">
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => onClose?.()}
                aria-label="Close dialog"
                className="-mr-2 grid size-11 shrink-0 cursor-pointer place-items-center rounded-xl text-muted transition hover:bg-slate-100 hover:text-ink"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className={cn('min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6', bodyClassName)}>{children}</div>
            {footer && (
              <div
                className={cn(
                  'flex flex-wrap items-center justify-end gap-3 border-t border-line bg-slate-50/70 px-5 py-4 sm:px-6',
                  !isDrawer && 'rounded-b-2xl',
                )}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
