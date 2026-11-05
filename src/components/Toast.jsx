import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { cn } from '../utils/format'

const TYPES = {
  success: { Icon: CheckCircle2, tone: 'text-success', bar: 'bg-success' },
  info: { Icon: Info, tone: 'text-primary', bar: 'bg-primary' },
  error: { Icon: AlertCircle, tone: 'text-danger', bar: 'bg-danger' },
}

/** Renders useApp().toasts — bottom-right on desktop, bottom-centre on mobile. */
export default function ToastViewport() {
  const { toasts, dismissToast } = useApp()
  const reduce = useReducedMotion()

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-3 bottom-3 z-[80] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end"
    >
      <AnimatePresence initial={false}>
        {(toasts ?? []).map((t) => {
          const { Icon, tone, bar } = TYPES[t.type] ?? TYPES.success
          return (
            <motion.div
              key={t.id}
              layout={!reduce}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: reduce ? 0 : 24, transition: { duration: 0.18 } }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto relative flex w-full max-w-md items-start gap-3 overflow-hidden rounded-xl border border-line bg-surface py-3 pr-2 pl-4 shadow-[var(--shadow-card-hover)] sm:w-96"
            >
              <span className={cn('absolute inset-y-0 left-0 w-1', bar)} aria-hidden="true" />
              <Icon className={cn('mt-0.5 size-5 shrink-0', tone)} aria-hidden="true" />
              <p className="min-w-0 flex-1 py-0.5 text-sm font-medium break-words text-ink">{t.message}</p>
              <button
                type="button"
                onClick={() => dismissToast(t.id)}
                aria-label="Dismiss notification"
                className="-my-1 grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg text-muted transition hover:bg-slate-100 hover:text-ink"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
