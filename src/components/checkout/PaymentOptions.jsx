import { Banknote, Check, CreditCard, Info, Smartphone } from 'lucide-react'

export const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: Smartphone, note: 'Pay with any UPI app. (Demo: no UPI request is created.)' },
  { id: 'card', label: 'Credit or debit card', icon: CreditCard, note: 'Demo only: no card details are collected or stored.' },
  { id: 'cod', label: 'Cash on delivery', icon: Banknote, note: 'Pay when your order arrives. (Illustrative option.)' },
]

/** Checkout step 4: payment method selection — UI only, nothing is processed. */
export default function PaymentOptions({ value, onChange, error }) {
  return (
    <fieldset>
      <legend className="sr-only">Payment method</legend>
      <div className="mb-5 flex items-start gap-3 border border-accent/50 bg-[#faf6ee] p-4 text-sm" role="note">
        <Info size={18} className="mt-0.5 shrink-0 text-accent-dark" />
        <p><strong>Demo checkout.</strong> Payment is not processed. Selecting a method simply records your preference on a demo order.</p>
      </div>
      <div className="grid gap-3">
        {PAYMENT_METHODS.map(({ id, label, icon: Icon, note }) => {
          const active = value === id
          return (
            <label key={id} className={`flex cursor-pointer items-start gap-4 border p-5 transition-colors ${active ? 'border-ink bg-sand' : 'border-line hover:border-ink/50'}`}>
              <input type="radio" name="payment" value={id} checked={active} onChange={() => onChange(id)} className="peer sr-only" />
              <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${active ? 'border-ink bg-ink text-white' : 'border-muted'} peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-dark`}>
                {active && <Check size={12} />}
              </span>
              <Icon size={22} strokeWidth={1.4} className="mt-0.5 shrink-0" />
              <span>
                <span className="block text-sm font-semibold">{label}</span>
                <span className="mt-0.5 block text-xs text-muted">{note}</span>
              </span>
            </label>
          )
        })}
      </div>
      {error && <p role="alert" className="error-text">{error}</p>}
    </fieldset>
  )
}
