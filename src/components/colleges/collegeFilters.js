// Filtering / sorting / URL-sync helpers for the Explore Colleges page.
import { getCourseById } from '../../data/selectors'
import { matches } from '../../utils/format'

export const SORTS = [
  { value: 'az', label: 'Name: A–Z' },
  { value: 'za', label: 'Name: Z–A' },
  { value: 'newest', label: 'Newest established' },
  { value: 'oldest', label: 'Oldest established' },
]

const LIST_KEYS = ['location', 'type', 'course', 'degree']

const splitParam = (value) =>
  String(value ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

/** URLSearchParams → filters object (never throws). */
export function parseFilters(params) {
  const filters = { q: '', location: [], type: [], course: [], degree: [], sort: 'az' }
  try {
    filters.q = params.get('q') ?? ''
    LIST_KEYS.forEach((key) => {
      // support both ?course=cse,it and ?course=cse&course=it
      filters[key] = [...new Set(params.getAll(key).flatMap(splitParam))]
    })
    // Normalise casing for known enums so ?type=government works.
    filters.type = filters.type
      .map((t) => (t.toLowerCase().startsWith('gov') ? 'Government' : t.toLowerCase().startsWith('priv') ? 'Private' : null))
      .filter(Boolean)
    filters.degree = filters.degree
      .map((d) => {
        const v = d.toLowerCase()
        if (v === 'ug' || v.startsWith('under')) return 'Undergraduate'
        if (v === 'pg' || v.startsWith('post')) return 'Postgraduate'
        return null
      })
      .filter(Boolean)
    filters.course = filters.course.map((c) => c.toLowerCase())
    const sort = params.get('sort')
    if (SORTS.some((s) => s.value === sort)) filters.sort = sort
  } catch {
    /* fall back to defaults */
  }
  return filters
}

/** filters object → plain params record for setSearchParams. Empty values are dropped. */
export function serializeFilters(filters) {
  const out = {}
  if (filters.q?.trim()) out.q = filters.q
  LIST_KEYS.forEach((key) => {
    if (filters[key]?.length) out[key] = filters[key].join(',')
  })
  if (filters.sort && filters.sort !== 'az') out.sort = filters.sort
  return out
}

const lower = (s) => String(s ?? '').toLowerCase()

function collegeDegreeTypes(college) {
  const set = new Set((college.programs ?? []).map((p) => p?.degreeType).filter(Boolean))
  ;(college.courses ?? []).forEach((id) => {
    const t = getCourseById(id)?.degreeType
    if (t) set.add(t)
  })
  return set
}

export function filterColleges(list, filters) {
  const f = filters ?? {}
  return (list ?? []).filter((c) => {
    if (!c) return false
    if (f.q) {
      const text = [c.name, c.shortName, c.city, c.state, c.category].join(' ')
      if (!matches(text, f.q)) return false
    }
    if (f.location?.length) {
      const ok = f.location.some((l) => lower(l) === lower(c.city) || lower(l) === lower(c.state))
      if (!ok) return false
    }
    if (f.type?.length && !f.type.includes(c.type)) return false
    if (f.course?.length && !f.course.some((id) => (c.courses ?? []).includes(id))) return false
    if (f.degree?.length) {
      const types = collegeDegreeTypes(c)
      if (!f.degree.some((d) => types.has(d))) return false
    }
    return true
  })
}

export function sortColleges(list, sort = 'az') {
  const arr = [...(list ?? [])]
  const name = (c) => c?.name ?? ''
  const est = (c) => (Number.isFinite(Number(c?.established)) && c?.established ? Number(c.established) : null)
  switch (sort) {
    case 'za':
      return arr.sort((a, b) => name(b).localeCompare(name(a)))
    case 'newest':
      return arr.sort((a, b) => (est(b) ?? -Infinity) - (est(a) ?? -Infinity))
    case 'oldest':
      return arr.sort((a, b) => (est(a) ?? Infinity) - (est(b) ?? Infinity))
    default:
      return arr.sort((a, b) => name(a).localeCompare(name(b)))
  }
}

export function activeFilterCount(f) {
  return (f.q ? 1 : 0) + (f.location?.length ?? 0) + (f.type?.length ?? 0) + (f.course?.length ?? 0) + (f.degree?.length ?? 0)
}
