// Small, defensive helpers over the mock data used by the Home and About pages.
import { colleges } from '../../data/colleges'
import { students } from '../../data/students'
import { courses } from '../../data/courses'
import { getCities } from '../../data/selectors'

const safe = (fn, fallback) => {
  try {
    return fn() ?? fallback
  } catch {
    return fallback
  }
}

/** Colleges that have a real (authentic) campus photo, preferring the given ids in order. */
export function campusPhotos(count = 3, preferIds = []) {
  return safe(() => {
    const withPhoto = colleges.filter((c) => c?.image && c.isAuthenticPhoto)
    const preferred = preferIds.map((id) => withPhoto.find((c) => c.id === id)).filter(Boolean)
    const rest = withPhoto.filter((c) => !preferred.includes(c))
    return [...preferred, ...rest].slice(0, count)
  }, [])
}

/** One campus photo (authentic first, then any image), or null. */
export function campusPhoto(preferIds = []) {
  return campusPhotos(1, preferIds)[0] ?? safe(() => colleges.find((c) => c?.image), null)
}

export function platformStats() {
  return {
    colleges: safe(() => colleges.length, 0),
    courses: safe(() => courses.length, 0),
    students: safe(() => students.length, 0),
    cities: safe(() => getCities().filter(Boolean).length, 0),
  }
}

export const findStudentByName = (name) => safe(() => students.find((s) => s?.name === name), null)

/** Students with the named ones first (in order), then everyone else. */
export function prioritisedStudents(names = [], max = 10) {
  return safe(() => {
    const first = names.map(findStudentByName).filter(Boolean)
    const rest = students.filter((s) => s && !first.includes(s))
    return [...first, ...rest].slice(0, max)
  }, [])
}

/** Readable credit line for a college cover photo. */
export function photoCredit(college) {
  const c = college?.imageCredit
  if (!c) return ''
  return [c.author, c.license].filter(Boolean).join(' · ')
}
