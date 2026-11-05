// Read helpers over the mock data — use these instead of re-implementing lookups in pages.
import { colleges } from './colleges'
import { students } from './students'
import { courses } from './courses'

export const getCollegeBySlug = (slug) => colleges.find((c) => c.slug === slug) ?? null
export const getCollegeById = (id) => colleges.find((c) => c.id === Number(id)) ?? null
export const getStudentById = (id) => students.find((s) => s.id === Number(id)) ?? null
export const getCourseById = (id) => courses.find((c) => c.id === id) ?? null

export const getStudentsByCollege = (collegeId) => students.filter((s) => s.collegeId === Number(collegeId))
export const getCollegesByCourse = (courseId) => colleges.filter((c) => c.courses?.includes(courseId))
export const collegeCountForCourse = (courseId) => getCollegesByCourse(courseId).length
export const getFeaturedColleges = () => colleges.filter((c) => c.featured)

export const getCities = () => [...new Set(colleges.map((c) => c.city))].sort()
export const getStates = () => [...new Set(colleges.map((c) => c.state))].sort()
export const getLocations = () => getCities().map((city) => ({ city, state: colleges.find((c) => c.city === city)?.state }))

export const getAllSkills = () => [...new Set(students.flatMap((s) => s.skills))].sort()
export const getStudentYears = () => ['1st Year', '2nd Year', '3rd Year', 'Final Year']

// Short label for a college's course list, e.g. "B.Tech CSE · BCA · MBA +2"
export function courseLabels(college, max = 3) {
  const names = (college.courses ?? []).map((id) => getCourseById(id)?.shortName).filter(Boolean)
  return { shown: names.slice(0, max), extra: Math.max(0, names.length - max) }
}
