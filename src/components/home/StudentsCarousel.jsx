import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import StudentCard from '../StudentCard'
import Reveal from './Reveal'
import { prioritisedStudents } from './homeData'

const PRIORITY = ['Rahul Sharma', 'Priya Singh', 'Aman Verma']

export default function StudentsCarousel() {
  const list = prioritisedStudents(PRIORITY, 10)
  const scroller = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const update = useCallback(() => {
    const el = scroller.current
    if (!el) return
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
  }, [])

  useEffect(() => {
    update()
    const el = scroller.current
    if (!el) return
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update, list.length])

  const scrollBy = (dir) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.85, 280), behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="students-title" className="py-16 sm:py-20">
      <div className="container-page">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Student community</p>
            <h2 id="students-title" className="mt-2 text-2xl font-bold sm:text-3xl">Students You May Connect With</h2>
            <p className="mt-3 text-base text-muted">
              Ask about campus life, courses and placements from people who are already there.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/students" className="group mr-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover">
              See all students
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            {list.length > 1 && (
              <div className="hidden gap-2 md:flex">
                <button
                  type="button"
                  onClick={() => scrollBy(-1)}
                  disabled={edges.start}
                  aria-label="Previous students"
                  className="btn-secondary size-11 rounded-full p-0"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollBy(1)}
                  disabled={edges.end}
                  aria-label="Next students"
                  className="btn-secondary size-11 rounded-full p-0"
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </Reveal>

        {list.length > 0 ? (
          <ul
            ref={scroller}
            aria-label="Suggested students"
            className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pt-1 pb-4 sm:mx-0 sm:scroll-px-0 sm:px-0"
          >
            {list.map((student, i) => (
              <Reveal as="li" key={student.id ?? i} delay={Math.min(i, 4) * 0.05} className="w-[82%] max-w-[300px] shrink-0 snap-start sm:w-[290px]">
                <StudentCard student={student} showMutual />
              </Reveal>
            ))}
          </ul>
        ) : (
          <div className="card mt-8 px-6 py-12 text-center">
            <p className="font-semibold">Student profiles are on their way</p>
            <Link to="/students" className="btn-secondary btn-sm mt-4">Browse students</Link>
          </div>
        )}
      </div>
    </section>
  )
}
