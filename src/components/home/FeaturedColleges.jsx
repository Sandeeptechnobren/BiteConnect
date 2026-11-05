import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import CollegeCard from '../CollegeCard'
import { colleges } from '../../data/colleges'
import { getFeaturedColleges } from '../../data/selectors'
import { cn } from '../../utils/format'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

const CITY_FILTERS = ['Varanasi', 'Prayagraj', 'Lucknow', 'Jaunpur']
const MAX = 8

export default function FeaturedColleges() {
  const [city, setCity] = useState('All')

  const cities = useMemo(() => CITY_FILTERS.filter((c) => colleges.some((col) => col?.city === c)), [])

  const list = useMemo(() => {
    try {
      if (city === 'All') {
        const featured = getFeaturedColleges()
        // If the featured set is thin, top up with other colleges so the grid never looks empty.
        const extra = colleges.filter((c) => !featured.includes(c))
        return [...featured, ...extra].slice(0, MAX)
      }
      const inCity = colleges.filter((c) => c?.city === city)
      return [...inCity.filter((c) => c.featured), ...inCity.filter((c) => !c.featured)].slice(0, MAX)
    } catch {
      return []
    }
  }, [city])

  const viewAllTo = city === 'All' ? '/colleges' : `/colleges?location=${encodeURIComponent(city)}`

  return (
    <section aria-labelledby="featured-title" className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeader
          id="featured-title"
          eyebrow="Featured colleges"
          title="Institutions students are exploring"
          description="Verified details and real campus photography for universities and colleges across Uttar Pradesh."
          linkTo={viewAllTo}
          linkLabel={city === 'All' ? 'View all colleges' : `View all in ${city}`}
        />

        {cities.length > 0 && (
          <div role="group" aria-label="Filter colleges by city" className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {['All', ...cities].map((c) => {
              const active = c === city
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCity(c)}
                  className={cn(
                    'inline-flex min-h-10 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition',
                    active
                      ? 'border-secondary bg-secondary text-white'
                      : 'border-line bg-surface text-slate-700 hover:border-slate-300 hover:bg-slate-50',
                  )}
                >
                  {c === 'All' ? 'All cities' : c}
                </button>
              )
            })}
          </div>
        )}

        {list.length > 0 ? (
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((college, i) => (
              <Reveal as="li" key={college.id ?? i} delay={Math.min(i, 4) * 0.05} className="min-w-0">
                <CollegeCard college={college} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <div className="card mt-8 flex flex-col items-center px-6 py-14 text-center">
            <Building2 className="size-8 text-slate-400" aria-hidden="true" />
            <p className="mt-3 font-semibold">No colleges listed here yet</p>
            <p className="mt-1 text-sm text-muted">Try another city or browse the full directory.</p>
            <Link to="/colleges" className="btn-secondary btn-sm mt-5">Browse all colleges</Link>
          </div>
        )}
      </div>
    </section>
  )
}
