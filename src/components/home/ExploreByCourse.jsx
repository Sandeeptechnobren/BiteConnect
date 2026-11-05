import CourseCard from '../CourseCard'
import { courses } from '../../data/courses'
import { collegeCountForCourse } from '../../data/selectors'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

const safeCount = (id) => {
  try {
    return collegeCountForCourse(id)
  } catch {
    return 0
  }
}

export default function ExploreByCourse() {
  const ug = courses.filter((c) => c.degreeType === 'Undergraduate').length
  const pg = courses.filter((c) => c.degreeType === 'Postgraduate').length

  return (
    <section aria-labelledby="courses-title" className="border-y border-line/70 bg-surface py-16 sm:py-20">
      <div className="container-page">
        <SectionHeader
          id="courses-title"
          eyebrow="Explore by course"
          title="Start with what you want to study"
          description={`${ug} undergraduate and ${pg} postgraduate course categories, from engineering to management. Pick one to see every college that offers it.`}
          linkTo="/courses"
          linkLabel="All courses"
        />

        <ul
          aria-label="Course categories"
          className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {courses.map((course, i) => (
            <Reveal as="li" key={course.id} delay={Math.min(i, 5) * 0.04} className="w-[78%] max-w-[280px] shrink-0 snap-start sm:w-auto sm:max-w-none">
              <CourseCard course={course} count={safeCount(course.id)} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
