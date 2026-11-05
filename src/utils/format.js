export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function initials(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`
}

// Case/diacritic-insensitive "contains" used by every search & filter.
export function matches(haystack, needle) {
  if (!needle) return true
  const normalize = (s) =>
    String(s ?? '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
  return normalize(haystack).includes(normalize(needle).trim())
}
