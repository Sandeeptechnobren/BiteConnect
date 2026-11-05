// Shared search index used by <SearchBar> suggestions and the /search page.
import { colleges } from '../../data/colleges'
import { students } from '../../data/students'
import { courses } from '../../data/courses'
import { getCourseById, getLocations, collegeCountForCourse } from '../../data/selectors'
import { matches } from '../../utils/format'

export const POPULAR_SEARCHES = ['IIT BHU', 'BCA', 'Varanasi', 'Data Science', 'B.Tech CSE', 'MBA']

export function tokenize(query) {
  return String(query ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6)
}

// Every token must appear somewhere in the haystack; returns a rank (lower = better) or -1.
function score(primary, haystack, tokens, full) {
  if (!tokens.length) return -1
  if (!tokens.every((t) => matches(haystack, t))) return -1
  const p = String(primary ?? '').toLowerCase()
  const q = full.toLowerCase()
  if (p === q) return 0
  if (p.startsWith(q)) return 1
  if (matches(primary, full)) return 2
  if (tokens.every((t) => matches(primary, t))) return 3
  return 4
}

function rank(list, toEntry, tokens, full) {
  return list
    .map((item, index) => {
      const { primary, haystack } = toEntry(item)
      return { item, index, s: score(primary, haystack, tokens, full) }
    })
    .filter((r) => r.s >= 0)
    .sort((a, b) => a.s - b.s || a.index - b.index)
    .map((r) => r.item)
}

export const courseDisplayName = (course) => {
  if (!course) return ''
  if (/^(Bachelor|Master)/.test(course.name)) return course.name
  return `${course.degree} ${course.name}`
}

const safe = (list) => (Array.isArray(list) ? list : [])

export function searchAll(query) {
  const full = String(query ?? '').trim()
  const tokens = tokenize(full)
  const empty = { colleges: [], students: [], courses: [], locations: [], total: 0 }
  if (!tokens.length) return empty

  try {
    const collegeResults = rank(
      safe(colleges),
      (c) => {
        const courseNames = safe(c.courses)
          .map((id) => {
            const course = getCourseById(id)
            return course ? `${course.degree} ${course.shortName} ${course.name}` : ''
          })
          .join(' ')
        const programs = safe(c.programs).map((p) => p?.name).join(' ')
        return {
          primary: `${c.shortName ?? ''} ${c.name ?? ''}`,
          haystack: [c.name, c.shortName, c.city, c.state, c.type, c.category, courseNames, programs].join(' '),
        }
      },
      tokens,
      full,
    )

    const studentResults = rank(
      safe(students),
      (s) => ({
        primary: s.name,
        haystack: [s.name, s.collegeName, s.course, s.year, s.location, s.headline, ...safe(s.skills), ...safe(s.interests)].join(' '),
      }),
      tokens,
      full,
    )

    const courseResults = rank(
      safe(courses),
      (c) => ({
        primary: `${c.shortName} ${c.name}`,
        haystack: [c.name, c.shortName, c.degree, `${c.degree} ${c.shortName}`, c.degreeType, c.description].join(' '),
      }),
      tokens,
      full,
    ).map((c) => ({ ...c, collegeCount: collegeCountForCourse(c.id) }))

    const locationResults = rank(
      safe(getLocations()),
      (l) => ({ primary: l.city, haystack: `${l.city} ${l.state ?? ''}` }),
      tokens,
      full,
    ).map((l) => ({ ...l, collegeCount: safe(colleges).filter((c) => c.city === l.city).length }))

    return {
      colleges: collegeResults,
      students: studentResults,
      courses: courseResults,
      locations: locationResults,
      total: collegeResults.length + studentResults.length + courseResults.length + locationResults.length,
    }
  } catch (error) {
    console.warn('Search failed', error)
    return empty
  }
}

export const hrefFor = {
  college: (c) => `/colleges/${c.slug}`,
  student: (s) => `/students/${s.id}`,
  course: (c) => `/colleges?course=${encodeURIComponent(c.id)}`,
  location: (l) => `/colleges?location=${encodeURIComponent(l.city)}`,
  search: (q) => `/search?q=${encodeURIComponent(q.trim())}`,
}
