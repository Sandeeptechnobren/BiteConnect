// Shared, defensive helpers for the Students UI (cards, profile, explore, connections).
import { students } from '../../data/students'
import { colleges } from '../../data/colleges'
import { courses } from '../../data/courses'
import { getCollegeById } from '../../data/selectors'

export const SELF_ID = 'me'

export const allStudents = () => (Array.isArray(students) ? students.filter(Boolean) : [])
export const allColleges = () => (Array.isArray(colleges) ? colleges.filter(Boolean) : [])
export const allCourses = () => (Array.isArray(courses) ? courses.filter(Boolean) : [])

export const toId = (value) => {
  if (value === SELF_ID) return SELF_ID
  const n = Number(value)
  return Number.isFinite(n) ? n : value
}

export function findStudent(id) {
  const target = toId(id)
  return allStudents().find((s) => s.id === target) ?? null
}

export function safeCollege(collegeId) {
  try {
    return collegeId == null ? null : getCollegeById(collegeId)
  } catch {
    return null
  }
}

/** Short college label for a student, preferring the data's shortName. */
export function collegeLabel(student) {
  const college = safeCollege(student?.collegeId)
  return student?.collegeName || college?.shortName || college?.name || ''
}

export const list = (value) => (Array.isArray(value) ? value.filter(Boolean) : [])

/** Deterministic set of mock "mutual" students for a given student id. */
export function getMutualStudents(student, max = 3) {
  if (!student) return []
  const count = Number(student.mutualConnections) || 0
  if (count <= 0) return []
  const pool = allStudents().filter((s) => s.id !== student.id)
  if (!pool.length) return []
  const seed = typeof student.id === 'number' ? student.id : 7
  const picks = []
  for (let i = 0; i < pool.length && picks.length < Math.min(max, count); i += 1) {
    const candidate = pool[(seed * 3 + i * 5) % pool.length]
    if (!picks.includes(candidate)) picks.push(candidate)
  }
  return picks
}

/** Score how relevant `student` is to `user` (shared college / course / skills). */
export function relevance(user, student) {
  if (!user || !student) return 0
  let score = 0
  if (user.collegeId != null && student.collegeId === user.collegeId) score += 3
  if (user.courseId && student.courseId === user.courseId) score += 2
  const mine = new Set(list(user.skills).map((s) => String(s).toLowerCase()))
  list(student.skills).forEach((s) => {
    if (mine.has(String(s).toLowerCase())) score += 1
  })
  return score
}

/** Suggested people: not yet related to the user, ranked by relevance. */
export function getSuggestions(user, getStatus, max = 6, exclude = []) {
  const skip = new Set(exclude)
  return allStudents()
    .filter((s) => !skip.has(s.id) && (getStatus ? getStatus(s.id) === 'none' : true))
    .map((s) => ({ s, score: relevance(user, s) }))
    .sort((a, b) => b.score - a.score || (Number(b.s.mutualConnections) || 0) - (Number(a.s.mutualConnections) || 0))
    .slice(0, max)
    .map(({ s }) => s)
}

/** Fields that make up a "complete" profile, with hints for the completeness meter. */
export function profileCompleteness(user) {
  const social = user?.social ?? {}
  const checks = [
    { key: 'image', label: 'Add a profile photo', done: Boolean(user?.image) },
    { key: 'headline', label: 'Write a headline', done: Boolean(user?.headline?.trim?.()) },
    { key: 'about', label: 'Tell people about yourself', done: Boolean(user?.about?.trim?.()) },
    { key: 'college', label: 'Add your college', done: Boolean(user?.collegeId || user?.collegeName) },
    { key: 'course', label: 'Add your course and year', done: Boolean(user?.course && user?.year) },
    { key: 'location', label: 'Add your location', done: Boolean(user?.location?.trim?.()) },
    { key: 'skills', label: 'Add at least 3 skills', done: list(user?.skills).length >= 3 },
    { key: 'interests', label: 'Add your interests', done: list(user?.interests).length > 0 },
    { key: 'social', label: 'Link LinkedIn, GitHub or a portfolio', done: Boolean(social.linkedin || social.github || social.portfolio) },
  ]
  const done = checks.filter((c) => c.done).length
  return { percent: Math.round((done / checks.length) * 100), missing: checks.filter((c) => !c.done), checks }
}

export function isValidUrl(value) {
  if (!value) return true
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function courseDisplay(course) {
  if (!course) return ''
  return [course.degree, course.name].filter(Boolean).join(' ')
}
