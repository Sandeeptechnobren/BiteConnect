import { useState } from 'react'
import { GraduationCap } from 'lucide-react'
import { cn, initials } from '../utils/format'

/**
 * <ImageWithFallback src alt kind="college|avatar|cover" name className />
 * Renders the image; if it fails to load shows a branded fallback
 * (campus illustration block for colleges, initials for avatars).
 * `className` sizes the box; the image always uses object-cover.
 */
export default function ImageWithFallback({ src, alt = '', kind = 'college', name = '', className = '', imgClassName = '', loading = 'lazy' }) {
  const [failed, setFailed] = useState(!src)
  const [loaded, setLoaded] = useState(false)

  if (failed) {
    if (kind === 'avatar') {
      return (
        <span
          role="img"
          aria-label={alt || name}
          className={cn('grid place-items-center bg-primary-100 font-semibold text-primary-700', className)}
        >
          {initials(name || alt) || '?'}
        </span>
      )
    }
    return (
      <span
        role="img"
        aria-label={alt || name}
        className={cn('grid place-items-center bg-gradient-to-br from-slate-100 to-primary-50 text-primary/40', className)}
      >
        <GraduationCap className="size-10" aria-hidden="true" />
      </span>
    )
  }

  return (
    <span className={cn('relative block overflow-hidden bg-slate-100', className)}>
      {!loaded && <span className="skeleton absolute inset-0 rounded-none" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={cn('size-full object-cover transition-opacity duration-300', loaded ? 'opacity-100' : 'opacity-0', imgClassName)}
      />
    </span>
  )
}
