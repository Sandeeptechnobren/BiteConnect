import { useEffect, useRef, useState } from 'react'

// Shared, counted body scroll lock so stacked overlays (drawer + modal) don't fight.
let lockCount = 0
let savedOverflow = ''
let savedPaddingRight = ''

function lock() {
  try {
    if (lockCount === 0) {
      const body = document.body
      const scrollbar = window.innerWidth - document.documentElement.clientWidth
      savedOverflow = body.style.overflow
      savedPaddingRight = body.style.paddingRight
      body.style.overflow = 'hidden'
      if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
    }
    lockCount += 1
  } catch {
    /* non-browser env */
  }
}

function unlock() {
  try {
    lockCount = Math.max(0, lockCount - 1)
    if (lockCount === 0) {
      document.body.style.overflow = savedOverflow
      document.body.style.paddingRight = savedPaddingRight
    }
  } catch {
    /* ignore */
  }
}

export function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined
    lock()
    return unlock
  }, [active])
}

// Close a popover on outside pointer-down and on Escape.
export function useDismiss(ref, open, onClose) {
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return undefined
    const onPointer = (event) => {
      if (ref.current && !ref.current.contains(event.target)) closeRef.current?.()
    }
    const onKey = (event) => {
      if (event.key === 'Escape') closeRef.current?.(event)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, ref])
}

export function useDebouncedValue(value, delay = 150) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay, setDebounced])
  return debounced
}


// Only allow same-origin, in-app paths as redirect targets.
export function safeRedirect(raw, fallback = '/') {
  try {
    if (typeof raw !== 'string' || !raw) return fallback
    const decoded = raw.trim() // URLSearchParams already decoded it
    if (!decoded.startsWith('/') || decoded.startsWith('//') || decoded.startsWith('/\\')) return fallback
    if (decoded.startsWith('/login') || decoded.startsWith('/signup')) return fallback
    return decoded
  } catch {
    return fallback
  }
}
