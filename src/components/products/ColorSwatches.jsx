/**
 * Round colour swatches. `interactive` renders buttons (radio group semantics),
 * otherwise a purely visual row. `selected` is a colour name.
 */
export default function ColorSwatches({ colors, selected, onSelect, size = 'sm', max = 5, interactive = true, label = 'Colour' }) {
  const dim = size === 'lg' ? 'h-9 w-9' : 'h-4 w-4'
  const visible = colors.slice(0, max)
  const extra = colors.length - visible.length

  return (
    <div className="flex items-center gap-2" role={interactive ? 'radiogroup' : undefined} aria-label={interactive ? label : undefined}>
      {visible.map((c) => {
        const active = selected === c.name
        const common = `${dim} rounded-full border transition-all duration-200 ${c.hex.toLowerCase() === '#f5f4f0' || c.hex === '#EFE6D2' ? 'border-line' : 'border-black/10'}`
        const ring = active ? 'ring-1 ring-ink ring-offset-2' : interactive ? 'hover:ring-1 hover:ring-muted hover:ring-offset-2' : ''
        return interactive ? (
          <button
            key={c.name}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={c.name}
            title={c.name}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onSelect?.(c)
            }}
            className={`${common} ${ring}`}
            style={{ backgroundColor: c.hex }}
          />
        ) : (
          <span key={c.name} title={c.name} className={`${common} ${ring}`} style={{ backgroundColor: c.hex }} />
        )
      })}
      {extra > 0 && <span className="text-[11px] text-muted">+{extra}</span>}
    </div>
  )
}
