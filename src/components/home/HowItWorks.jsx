import { Link } from 'react-router-dom'
import { Compass, Search, Users } from 'lucide-react'
import ImageWithFallback from '../ImageWithFallback'
import Reveal from './Reveal'
import { campusPhoto } from './homeData'

const STEPS = [
  {
    icon: Search,
    title: 'Discover',
    text: 'Find colleges and explore available courses.',
    to: '/colleges',
    cta: 'Browse colleges',
  },
  {
    icon: Compass,
    title: 'Explore',
    text: 'View college information and discover students.',
    to: '/courses',
    cta: 'Explore courses',
  },
  {
    icon: Users,
    title: 'Connect',
    text: 'Send connection requests and build your student network.',
    to: '/students',
    cta: 'Meet students',
  },
]

export default function HowItWorks() {
  const photo = campusPhoto([7, 2, 1])

  return (
    <section aria-labelledby="how-title" className="border-y border-line/70 bg-surface py-16 sm:py-20">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <figure className="relative">
            <ImageWithFallback
              src={photo?.image}
              alt={photo ? `Campus of ${photo.name}` : 'College campus'}
              name={photo?.name}
              kind="college"
              className="aspect-[4/3] w-full rounded-3xl lg:aspect-[4/5]"
            />
            <figcaption className="card absolute right-4 bottom-4 left-4 p-4 sm:right-auto sm:max-w-xs">
              <p className="text-sm font-semibold text-ink">Real campuses, real students</p>
              <p className="mt-1 text-xs text-muted">
                {photo ? `${photo.shortName ?? photo.name}, ${photo.city}` : 'Campus photography from Wikimedia Commons'}
              </p>
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2 id="how-title" className="mt-2 text-2xl font-bold sm:text-3xl">How Bite Connect Works</h2>
            <p className="mt-3 max-w-xl text-base text-muted">
              Three simple steps from first search to a network of students who can answer your questions.
            </p>
          </Reveal>

          <div className="relative mt-10">
          {/* connecting line behind the numbered markers */}
          <span className="absolute top-6 bottom-6 left-6 w-px bg-primary-200" aria-hidden="true" />
          <ol className="relative space-y-8">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.08} className="relative flex gap-5">
                <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-white shadow-sm ring-4 ring-surface">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1 rounded-2xl border border-line/80 bg-background p-5">
                  <p className="text-xs font-semibold tracking-wider text-muted uppercase">Step {i + 1}</p>
                  <h3 className="mt-1 text-lg font-bold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted">{step.text}</p>
                  <Link to={step.to} className="mt-3 inline-flex min-h-9 items-center text-sm font-semibold text-primary hover:text-primary-hover">
                    {step.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
