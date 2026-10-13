import { Minus, Plus } from 'lucide-react'

/** +/- quantity control. onChange receives the requested number (parent validates against stock). */
export default function QuantitySelector({ value, onChange, min = 1, max = 99, size = 'md', label = 'Quantity' }) {
  const h = size === 'sm' ? 'h-9' : 'h-12'
  const w = size === 'sm' ? 'w-9' : 'w-12'
  return (
    <div className={`inline-flex items-center border border-line ${h}`} role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`grid ${w} h-full place-items-center transition-colors hover:bg-sand disabled:opacity-30`}
      >
        <Minus size={14} />
      </button>
      <span className={`min-w-8 text-center text-sm font-medium tabular-nums`} aria-live="polite">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`grid ${w} h-full place-items-center transition-colors hover:bg-sand disabled:opacity-30`}
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
