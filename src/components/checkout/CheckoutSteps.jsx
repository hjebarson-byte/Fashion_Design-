import { Check } from 'lucide-react'

export const CHECKOUT_STEPS = ['Contact', 'Shipping', 'Delivery', 'Payment', 'Review']

/** Step indicator. Completed steps are clickable so users can go back. */
export default function CheckoutSteps({ current, onGo }) {
  return (
    <nav aria-label="Checkout progress">
      <ol className="flex items-center justify-between gap-1 sm:gap-2">
        {CHECKOUT_STEPS.map((label, i) => {
          const done = i < current
          const active = i === current
          return (
            <li key={label} className="flex flex-1 items-center gap-1 sm:gap-2 last:flex-none">
              <button
                type="button"
                disabled={!done}
                onClick={() => onGo(i)}
                aria-current={active ? 'step' : undefined}
                className="group flex items-center gap-2 disabled:cursor-default"
              >
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-semibold transition-colors ${done ? 'border-ink bg-ink text-white' : active ? 'border-ink text-ink' : 'border-line text-muted'}`}>
                  {done ? <Check size={14} /> : i + 1}
                </span>
                <span className={`hidden text-[11px] font-semibold uppercase tracking-[0.14em] sm:inline ${active ? 'text-ink' : done ? 'text-ink' : 'text-muted'}`}>{label}</span>
                <span className="sr-only sm:hidden">{label}</span>
              </button>
              {i < CHECKOUT_STEPS.length - 1 && <span className={`h-px flex-1 ${done ? 'bg-ink' : 'bg-line'}`} aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
