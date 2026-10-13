import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import Drawer from '../common/Drawer'
import CartItem from './CartItem'
import { useCart } from '../../context/CartContext'
import { useShop } from '../../context/ShopContext'
import { formatCurrency } from '../../utils/formatCurrency'
import { storeConfig } from '../../data/storeConfig'

/** Slide-out mini-cart. Uses the same global cart state as the full cart page. */
export default function CartDrawer() {
  const { cartOpen, closeCart } = useShop()
  const { lineItems, totals } = useCart()
  const threshold = storeConfig.shipping.freeShippingThreshold
  const progress = Math.min(100, (totals.subtotal / threshold) * 100)

  return (
    <Drawer open={cartOpen} onClose={closeCart} title={`Your bag (${totals.itemCount})`} side="right" widthClass="max-w-[440px]">
      {lineItems.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <span className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-sand"><ShoppingBag size={26} strokeWidth={1.4} /></span>
          <p className="font-serif text-2xl uppercase">Your bag is waiting</p>
          <p className="mt-2 text-sm text-muted">Discover something you&apos;ll love.</p>
          <Link to="/collections/new-arrivals" onClick={closeCart} className="btn btn-primary mt-6">Shop new arrivals</Link>
        </div>
      ) : (
        <>
          <div className="border-b border-line px-5 py-4 sm:px-6">
            {totals.amountToFreeShipping > 0 && !totals.appliedCoupon ? (
              <p className="text-xs text-muted">You&apos;re <strong className="text-ink">{formatCurrency(totals.amountToFreeShipping, 0)}</strong> away from free shipping</p>
            ) : (
              <p className="text-xs font-medium text-success">You&apos;ve unlocked free standard shipping</p>
            )}
            <div className="mt-2 h-1 bg-line" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label="Progress to free shipping">
              <div className="h-1 bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <ul className="flex-1 divide-y divide-line overflow-y-auto px-5 sm:px-6" aria-label="Items in your bag">
            {lineItems.map((l) => <CartItem key={l.key} line={l} compact />)}
          </ul>

          <div className="space-y-4 border-t border-line bg-white p-5 sm:p-6">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.14em]">Subtotal</span>
              <span className="text-lg font-semibold">{formatCurrency(totals.subtotal)}</span>
            </div>
            <p className="text-xs text-muted">Shipping and promo codes are calculated in your bag and at checkout.</p>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/cart" onClick={closeCart} className="btn btn-outline">View bag</Link>
              <Link to="/checkout" onClick={closeCart} className="btn btn-primary">Checkout</Link>
            </div>
            <button type="button" onClick={closeCart} className="block w-full text-center text-xs uppercase tracking-[0.16em] underline underline-offset-4">Continue shopping</button>
          </div>
        </>
      )}
    </Drawer>
  )
}
