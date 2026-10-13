import { Link } from 'react-router-dom'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import Breadcrumbs from '../components/common/Breadcrumbs'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import ProductGrid from '../components/products/ProductGrid'
import Button from '../components/common/Button'
import { useCart } from '../context/CartContext'
import useProducts from '../hooks/useProducts'
import usePageMeta from '../hooks/usePageMeta'
import { formatCurrency } from '../utils/formatCurrency'
import { storeConfig } from '../data/storeConfig'

export default function Cart() {
  const { lineItems, totals, clearCart } = useCart()
  const { newArrivals } = useProducts()

  usePageMeta('Shopping Bag', 'Review your items and proceed to secure checkout.')

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Shopping Bag' },
  ]

  const threshold = storeConfig.shipping.freeShippingThreshold
  const progress = Math.min(100, (totals.subtotal / threshold) * 100)

  if (lineItems.length === 0) {
    return (
      <div className="container-x py-12 md:py-20">
        <Breadcrumbs items={crumbs} className="mb-8" />

        <div className="mx-auto max-w-lg py-12 text-center">
          <span className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-sand text-ink">
            <ShoppingBag size={32} strokeWidth={1.4} />
          </span>
          <h1 className="font-serif text-3xl uppercase tracking-tight md:text-4xl">Your Bag Is Waiting</h1>
          <p className="mt-3 text-muted">Discover something you&apos;ll love to fill your wardrobe.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/collections/new-arrivals">Shop New Arrivals</Button>
            <Button variant="outline" to="/collections/best-sellers">Shop Best Sellers</Button>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-16">
          <h2 className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            You Might Like
          </h2>
          <ProductGrid products={newArrivals.slice(0, 4)} />
        </div>
      </div>
    )
  }

  return (
    <div className="container-x py-8 md:py-12">
      <Breadcrumbs items={crumbs} className="mb-6 md:mb-8" />

      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="font-serif text-3xl font-normal uppercase tracking-tight md:text-4xl">Shopping Bag</h1>
          <p className="mt-1 text-sm text-muted">
            {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'} in your bag
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-muted underline underline-offset-4 hover:text-sale"
        >
          Clear bag
        </button>
      </header>

      {/* Free Shipping bar */}
      <div className="mb-8 border border-line bg-sand/60 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          {totals.amountToFreeShipping > 0 && !totals.appliedCoupon ? (
            <p className="text-muted">
              Add <strong className="text-ink">{formatCurrency(totals.amountToFreeShipping, 0)}</strong> more to qualify for <span className="font-semibold text-ink">Free Standard Delivery</span>.
            </p>
          ) : (
            <p className="font-medium text-success">
              You qualify for Free Standard Delivery!
            </p>
          )}
          <span className="text-xs text-muted tabular-nums">{Math.round(progress)}%</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Cart Item list */}
        <div className="lg:col-span-7 xl:col-span-8">
          <ul className="divide-y divide-line border-t border-line" aria-label="Bag items">
            {lineItems.map((line) => (
              <CartItem key={line.key} line={line} />
            ))}
          </ul>

          <div className="mt-8">
            <Link
              to="/collections/new-arrivals"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft size={14} /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-28">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
