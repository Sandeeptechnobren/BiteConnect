import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Reveal from './Reveal'
import { campusPhoto } from './homeData'

/**
 * Dark call-to-action panel with a subtle campus photo behind a heavy overlay.
 * Reused on the About page with custom copy/actions.
 */
export default function HomeCta({
  title = 'Your College Journey, Your Community.',
  description = 'Connect with students, explore opportunities, and make your college journey more meaningful.',
  actions,
  photoIds = [2, 1, 7],
}) {
  const { isAuthenticated } = useApp()
  const photo = campusPhoto(photoIds)

  const defaultActions = isAuthenticated ? (
    <Link to="/students" className="btn bg-white text-secondary hover:bg-slate-100">
      Explore students
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  ) : (
    <>
      <Link to="/signup" className="btn-primary">
        Join Bite Connect
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
      <Link to="/colleges" className="btn border border-white/20 text-white hover:bg-white/10">
        Browse colleges
      </Link>
    </>
  )

  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-20">
      <div className="container-page">
        <Reveal className="relative isolate overflow-hidden rounded-3xl bg-secondary px-6 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          {photo?.image && (
            <img
              src={photo.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 -z-20 size-full object-cover opacity-100"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          )}
          <div className="absolute inset-0 -z-10 bg-secondary/[0.88]" aria-hidden="true" />
          <div className="max-w-2xl">
            <h2 id="cta-title" className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">{actions ?? defaultActions}</div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
