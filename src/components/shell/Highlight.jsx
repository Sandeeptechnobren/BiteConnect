import { tokenize } from './search'

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Wraps the parts of `text` that match any query token in a <mark>.
export default function Highlight({ text = '', query = '' }) {
  const tokens = tokenize(query)
  const value = String(text ?? '')
  if (!tokens.length || !value) return value
  let parts
  try {
    const re = new RegExp(`(${tokens.map(escape).join('|')})`, 'ig')
    parts = value.split(re)
  } catch {
    return value
  }
  const lower = tokens.map((t) => t.toLowerCase())
  return parts.map((part, i) =>
    lower.includes(part.toLowerCase()) ? (
      <mark key={i} className="rounded-sm bg-primary-100 px-0.5 font-semibold text-primary-700">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}
