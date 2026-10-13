import { Check } from 'lucide-react'
import { storeConfig } from '../../data/storeConfig'
import { formatCurrency } from '../../utils/formatCurrency'
import { getShippingFee } from '../../utils/cartCalculations'

const fmtDate = (d) => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })

/** Illustrative delivery window computed from today's date. */
export function deliveryWindow(method) {
  const m = storeConfig.shipping[method]
  const from = new Date()
  const to = new Date()
  from.setDate(from.getDate() + m.minDays)
  to.setDate(to.getDate() + m.maxDays)
  return { from, to, text: `${fmtDate(from)} – ${fmtDate(to)}` }
}

/** Checkout step 3: choose Standard or Express delivery. */
export default function DeliveryOptions({ value, onChange, subtotal, couponCode, error }) {
  return (
    <fieldset>
      <legend className="sr-only">Delivery option</legend>
      <div className="grid gap-3">
        {['standard', 'express'].map((id) => {
          const m = storeConfig.shipping[id]
          const fee = getShippingFee(subtotal, couponCode, id)
          const active = value === id
          return (
            <label key={id} className={`flex cursor-pointer items-start gap-4 border p-5 transition-colors ${active ? 'border-ink bg-sand' : 'border-line hover:border-ink/50'}`}>
              <input type="radio" name="delivery" value={id} checked={active} onChange={() => onChange(id)} className="peer sr-only" />
              <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${active ? 'border-ink bg-ink text-white' : 'border-muted'} peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-dark`}>
                {active && <Check size={12} />}
              </span>
              <span className="flex-1">
                <span className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-semibold">{m.label}</span>
                  <span className="text-sm font-semibold">{fee === 0 ? 'Free' : formatCurrency(fee)}</span>
                </span>
                <span className="mt-1 block text-sm text-muted">Estimated arrival: {deliveryWindow(id).text}</span>
                <span className="mt-0.5 block text-xs text-muted">{m.minDays}–{m.maxDays} business days · illustrative demo dates</span>
              </span>
            </label>
          )
        })}
      </div>
      {error && <p role="alert" className="error-text">{error}</p>}
    </fieldset>
  )
}
