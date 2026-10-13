import { useLocation, Link, Navigate } from 'react-router-dom'
import { CheckCircle2, Package, MapPin, Truck, ArrowRight, ShieldAlert } from 'lucide-react'
import Button from '../components/common/Button'
import usePageMeta from '../hooks/usePageMeta'
import useOrders from '../hooks/useOrders'
import { formatCurrency } from '../utils/formatCurrency'

export default function OrderConfirmation() {
  const location = useLocation()
  const { orders } = useOrders()
  usePageMeta('Order Confirmation', 'Thank you for your VELORA order.')

  // Pick order from route state or fallback to the latest order
  const order = location.state?.order || orders[0]

  if (!order) {
    return <Navigate to="/" replace />
  }

  // Delivery date estimate (+4 to +6 days)
  const estDate = new Date(order.createdAt + 5 * 86400000).toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="container-x py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Banner */}
        <div className="border border-line bg-sand/40 p-8 text-center sm:p-12">
          <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-white text-success shadow-sm">
            <CheckCircle2 size={36} strokeWidth={1.6} />
          </span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">Confirmed</p>
          <h1 className="mt-2 font-serif text-3xl uppercase tracking-tight md:text-4xl">
            Thank You For Your Order
          </h1>
          <p className="mt-3 text-sm text-muted">
            Order Reference: <strong className="text-ink">{order.orderNumber}</strong>
          </p>

          <div className="mx-auto mt-6 flex max-w-lg items-center gap-2.5 rounded-sm border border-accent/40 bg-white/80 p-3.5 text-xs text-muted">
            <ShieldAlert size={18} className="shrink-0 text-accent-dark" />
            <span>
              <strong>Demonstration Order:</strong> This is a frontend demo. No real payment was processed, and no parcel will be shipped.
            </span>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="mt-10 grid gap-8 border border-line bg-white p-6 sm:p-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
              <MapPin size={15} /> Shipping Address
            </h2>
            <div className="text-sm leading-relaxed text-muted">
              <p className="font-semibold text-ink">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.line1}</p>
              {order.shippingAddress.landmark && <p>Near: {order.shippingAddress.landmark}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
              <Truck size={15} /> Delivery Details
            </h2>
            <div className="text-sm leading-relaxed text-muted">
              <p><strong className="text-ink">Method:</strong> {order.deliveryMethod}</p>
              <p><strong className="text-ink">Estimated Arrival:</strong> {estDate}</p>
              <p><strong className="text-ink">Payment:</strong> {order.paymentMethod}</p>
              <p><strong className="text-ink">Status:</strong> {order.status}</p>
            </div>
          </div>
        </div>

        {/* Ordered Items List */}
        <div className="mt-8 border border-line bg-white p-6 sm:p-8">
          <h2 className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
            <Package size={15} /> Items Ordered ({order.items.length})
          </h2>
          <ul className="divide-y divide-line border-t border-line">
            {order.items.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="h-16 w-12 object-cover bg-sand border border-line" />
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-muted">{item.color} · {item.size} · Qty {item.quantity}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-line pt-6 text-sm">
            <div className="flex justify-between py-1 text-muted">
              <span>Subtotal</span>
              <span>{formatCurrency(order.totals.subtotal)}</span>
            </div>
            {order.totals.discount > 0 && (
              <div className="flex justify-between py-1 text-success">
                <span>Discount</span>
                <span>− {formatCurrency(order.totals.discount)}</span>
              </div>
            )}
            <div className="flex justify-between py-1 text-muted">
              <span>Shipping</span>
              <span>{order.totals.shipping === 0 ? 'Free' : formatCurrency(order.totals.shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-3 font-semibold text-ink text-base">
              <span>Total Paid (Demo)</span>
              <span>{formatCurrency(order.totals.total)}</span>
            </div>
          </div>
        </div>

        {/* Next Actions */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button to="/collections/new-arrivals">Continue Shopping</Button>
          <Button variant="outline" to="/account/orders">View All Orders</Button>
        </div>
      </div>
    </div>
  )
}
