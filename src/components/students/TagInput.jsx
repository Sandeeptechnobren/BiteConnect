import { useId, useState } from 'react'
import { X } from 'lucide-react'

/**
 * Tag input: type and press Enter or comma to add, × to remove.
 * Dedupes case-insensitively and caps at `max` tags.
 */
export default function TagInput({ label, value = [], onChange, max = 12, placeholder = 'Type and press Enter', hint }) {
  const id = useId()
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')
  const tags = Array.isArray(value) ? value : []

  const add = (raw) => {
    const parts = String(raw)
      .split(',')
      .map((t) => t.trim().replace(/\s+/g, ' ').slice(0, 30))
      .filter(Boolean)
    if (!parts.length) return
    const next = [...tags]
    let msg = ''
    for (const tag of parts) {
      if (next.length >= max) {
        msg = `You can add up to ${max}.`
        break
      }
      if (next.some((t) => t.toLowerCase() === tag.toLowerCase())) {
        msg = `"${tag}" is already added.`
        continue
      }
      next.push(tag)
    }
    setError(msg)
    setDraft('')
    if (next.length !== tags.length) onChange(next)
  }

  const remove = (tag) => {
    setError('')
    onChange(tags.filter((t) => t !== tag))
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      add(draft)
    } else if (e.key === 'Backspace' && !draft && tags.length) {
      remove(tags[tags.length - 1])
    }
  }

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="label">
          {label}
        </label>
        <span className="text-xs text-muted">
          {tags.length}/{max}
        </span>
      </div>
      <div className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-xl border border-line bg-surface px-2.5 py-2 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
        {tags.map((tag) => (
          <span key={tag} className="chip-primary py-0.5 pr-1">
            {tag}
            <button
              type="button"
              onClick={() => remove(tag)}
              className="grid size-5 cursor-pointer place-items-center rounded-full hover:bg-primary-100"
              aria-label={`Remove ${tag}`}
            >
              <X className="size-3" aria-hidden="true" />
            </button>
          </span>
        ))}
        <input
          id={id}
          value={draft}
          onChange={(e) => {
            const v = e.target.value
            if (v.includes(',')) add(v)
            else setDraft(v)
          }}
          onKeyDown={onKeyDown}
          onBlur={() => draft.trim() && add(draft)}
          placeholder={tags.length >= max ? 'Limit reached' : placeholder}
          disabled={tags.length >= max}
          className="min-w-[8rem] flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
          aria-describedby={`${id}-hint`}
        />
      </div>
      <p id={`${id}-hint`} className={error ? 'mt-1.5 text-xs text-danger' : 'mt-1.5 text-xs text-muted'} aria-live="polite">
        {error || hint || 'Press Enter or comma to add.'}
      </p>
    </div>
  )
}
