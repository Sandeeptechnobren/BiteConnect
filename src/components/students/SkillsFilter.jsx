import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'
import { cn, matches } from '../../utils/format'

function SkillList({ options, selected, onToggle, autoFocus = false, listClass = 'max-h-64' }) {
  const id = useId()
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => options.filter((s) => matches(s, query)), [options, query])
  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <label htmlFor={id} className="sr-only">
          Search skills
        </label>
        <input
          id={id}
          className="input min-h-10 py-2 pl-9"
          placeholder="Search skills"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus={autoFocus}
        />
      </div>
      <ul className={cn('mt-2 overflow-y-auto overscroll-contain', listClass)} role="group" aria-label="Skills">
        {filtered.length === 0 && <li className="px-2 py-3 text-sm text-muted">No skills match "{query}"</li>}
        {filtered.map((skill) => {
          const checked = selected.includes(skill)
          return (
            <li key={skill}>
              <label className="flex min-h-10 cursor-pointer items-center gap-2.5 rounded-lg px-2 text-sm hover:bg-slate-50">
                <input type="checkbox" className="sr-only" checked={checked} onChange={() => onToggle(skill)} />
                <span
                  className={cn(
                    'grid size-4.5 shrink-0 place-items-center rounded border transition',
                    checked ? 'border-primary bg-primary text-white' : 'border-slate-300 bg-white',
                  )}
                  aria-hidden="true"
                >
                  {checked && <Check className="size-3" strokeWidth={3} />}
                </span>
                <span className="truncate">{skill}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/** Skills multi-select: popover (desktop toolbar) or inline list (mobile drawer). */
export default function SkillsFilter({ options = [], selected = [], onChange, inline = false }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const panelId = useId()

  const toggle = (skill) => onChange(selected.includes(skill) ? selected.filter((s) => s !== skill) : [...selected, skill])

  useEffect(() => {
    if (!open) return undefined
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (inline) return <SkillList options={options} selected={selected} onToggle={toggle} listClass="max-h-72" />

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        className={cn('input flex cursor-pointer items-center justify-between gap-2 text-left', selected.length && 'border-primary/50 bg-primary-50/40')}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={cn('truncate', !selected.length && 'text-slate-500')}>
          {selected.length ? `Skills (${selected.length})` : 'Any skill'}
        </span>
        <ChevronDown className={cn('size-4 shrink-0 text-slate-400 transition', open && 'rotate-180')} aria-hidden="true" />
      </button>
      {open && (
        <div id={panelId} className="card absolute right-0 z-30 mt-2 w-72 p-3">
          <SkillList options={options} selected={selected} onToggle={toggle} autoFocus />
          <div className="mt-2 flex items-center justify-between border-t border-line pt-2">
            <button type="button" className="btn-ghost btn-sm" onClick={() => onChange([])} disabled={!selected.length}>
              Clear
            </button>
            <button type="button" className="btn-primary btn-sm" onClick={() => setOpen(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
