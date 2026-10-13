import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tag, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatCurrency } from '../../utils/formatCurrency'
import { storeConfig } from '../../data/storeConfig'

/** Money row used inside summaries. */
function Row({ label, value, strong, accent }) {
  return (
    <div className={`flex items-baseline justify-between ${strong ? 'text-base font-semibold' : 'text-sm'}`}>
      <dt className={strong ? '' : 'text-muted'}>{label}</dt>
      <dd className={accent ? 'text-success' : ''}>{value}</dd>
    </div>
  )
}

/**
 * Order summary used on the cart page (with promo + checkout CTA) and in checkout (read-only).
 * `totals` can be supplied to override the cart's defaults (e.g. chosen delivery method).
 */
export default function CartSummary({ totals: totalsProp, showPromo = true, showCheckout = true, className = '' }) {
  const cart = useCart()
  const totals = totalsProp || cart.totals
  const { couponCode, applyCoupon, removeCoupon } = cart
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!code.trim()) return setError('Enter a promo code.')
    const res = applyCoupon(code)
    setError(res.ok ? '' : res.message)
    if (res.ok) setCode('')
  }

  return (
    <div className={`bg-sand p-6 md:p-8 ${className}`}>
      <h2 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.2em]">Order summary</h2>

      {showPromo && (
        <div className="mb-6">
          {couponCode ? (
            <div className="flex items-center justify-between bg-white px-4 py-3 text-sm">
              <span className="inline-flex items-center gap-2"><Tag size={15} className="text-success" /> <strong>{couponCode}</strong> applied</span>
              <button type="button" onClick={removeCoupon} className="inline-flex items-center gap-1 text-xs underline underline-offset-4" aria-label={`Remove promo code ${couponCode}`}><X size={14} /> Remove</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <label htmlFor="promo" className="label">Promo code</label>
              <div className="flex gap-2">
                <input id="promo" value={code} onChange={(e) => { setCode(e.target.value.toUpperCase()); setError('') }} placeholder="e.g. WELCOME10" aria-invalid={!!error} aria-describedby={error ? 'promo-err' : undefined} className={`field !py-3 uppercase ${error ? 'field-error' : ''}`} />
                <button type="submit" className="btn btn-outline !px-5 !py-3">Apply</button>
              </div>
              {error && <p id="promo-err" role="alert" className="error-text">{error}</p>}
            </form>
          )}
          {totals.couponMessage && <p role="alert" className="error-text">{totals.couponMessage}</p>}
        </div>
      )}

      <dl className="space-y-3">
        <Row label={`Subtotal (${totals.itemCount} ${totals.itemCount === 1 ? 'item' : 'items'})`} value={formatCurrency(totals.subtotal)} />
        {totals.discount > 0 && <Row label={`Discount${totals.appliedCoupon ? ` (${totals.appliedCoupon.code})` : ''}`} value={`− ${formatCurrency(totals.discount)}`} accent />}
        <Row label="Shipping (estimate)" value={totals.shipping === 0 ? 'Free' : formatCurrency(totals.shipping)} accent={totals.shipping === 0 && totals.subtotal > 0} />
        <div className="border-t border-ink/15 pt-4">
          <Row label="Estimated total" value={formatCurrency(totals.total)} strong />
          <p className="mt-1 text-xs text-muted">Inclusive of taxes. Demo prices only.</p>
        </div>
      </dl>

      {totals.amountToFreeShipping > 0 && totals.subtotal > 0 && !totals.appliedCoupon?.type?.includes('shipping') && (
        <p className="mt-5 text-xs text-muted">
          Add <strong className="text-ink">{formatCurrency(totals.amountToFreeShipping, 0)}</strong> more for free standard shipping (orders over {formatCurrency(storeConfig.shipping.freeShippingThreshold, 0)}).
        </p>
      )}

      {showCheckout && (
        <Link to="/checkout" className={`btn btn-primary mt-6 w-full !py-4 ${totals.itemCount === 0 ? 'pointer-events-none opacity-50' : ''}`} aria-disabled={totals.itemCount === 0}>
          Proceed to checkout
        </Link>
      )}
    </div>
  )
}
