/** Size picker (radio-group semantics). Out-of-range sizes can be disabled via `unavailable`. */
export default function SizeSelector({ sizes, selected, onSelect, unavailable = [], error = false }) {
  return (
    <div
      role="radiogroup"
      aria-label="Size"
      aria-invalid={error}
      className={`flex flex-wrap gap-2 ${error ? 'rounded-sm outline outline-1 outline-offset-4 outline-sale' : ''}`}
    >
      {sizes.map((s) => {
        const disabled = unavailable.includes(s)
        const active = selected === s
        return (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => onSelect(s)}
            className={`h-11 min-w-[3.25rem] border px-4 text-[13px] font-medium transition-all duration-200 ${
              active ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink'
            } ${disabled ? 'cursor-not-allowed text-muted line-through opacity-50' : ''}`}
          >
            {s}
          </button>
        )
      })}
    </div>
  )
}
