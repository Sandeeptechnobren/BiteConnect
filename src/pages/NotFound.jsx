import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Building2, Compass, MapPinOff } from 'lucide-react'
import SearchBar from '../components/SearchBar'

export default function NotFound() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = 'Page not found · Bite Connect'
  }, [])

  return (
    <div className="container-page grid min-h-[70vh] place-items-center py-16 sm:py-24">
      <div className="w-full max-w-xl text-center">
        <div className="relative mx-auto w-fit">
          <p className="text-[96px] leading-none font-extrabold tracking-tighter text-primary-100 select-none sm:text-[128px]" aria-hidden="true">
            404
          </p>
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-surface text-primary shadow-[var(--shadow-card-hover)] ring-1 ring-line">
              <MapPinOff className="size-7" aria-hidden="true" />
            </span>
          </span>
        </div>
        <h1 className="mt-6 text-2xl font-extrabold sm:text-3xl">This page took a wrong turn</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted sm:text-base">
          We couldn’t find <span className="font-mono text-[13px] break-all text-ink">{pathname}</span>. It may have moved, or the link might be
          mistyped. Try searching instead.
        </p>
        <div className="mx-auto mt-8 max-w-lg text-left">
          <SearchBar variant="page" />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            <Compass className="size-4" aria-hidden="true" /> Go to Discover
          </Link>
          <Link to="/colleges" className="btn-secondary">
            <Building2 className="size-4" aria-hidden="true" /> Browse colleges
          </Link>
        </div>
      </div>
    </div>
  )
}
