import { Link } from 'react-router-dom'
import { Package, ArrowLeft } from 'lucide-react'
import Breadcrumbs from '../components/common/Breadcrumbs'
import Button from '../components/common/Button'
import useOrders from '../hooks/useOrders'
import usePageMeta from '../hooks/usePageMeta'
import { formatCurrency } from '../utils/formatCurrency'

export default function OrderHistory() {
  const { orders } = useOrders()
  usePageMeta('Order History', 'View your past orders with VELORA.')

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'My Account', to: '/account' },
    { label: 'Order History' },
  ]

  return (
    <div className="container-x py-8 md:py-12">
      <Breadcrumbs items={crumbs} className="mb-6 md:mb-8" />

      <header className="mb-8 flex items-center justify-between border-b border-line pb-6">
        <div>
          <h1 className="font-serif text-3xl font-normal uppercase tracking-tight md:text-4xl">Order History</h1>
          <p className="mt-1 text-sm text-muted">Review your recent purchases and demo orders.</p>
        </div>
        <Link to="/account" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted hover:text-ink">
          <ArrowLeft size={14} /> Back to dashboard
        </Link>
      </header>

      {orders.length === 0 ? (
        <div className="border border-line bg-sand/30 p-12 text-center">
          <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-white">
            <Package size={26} strokeWidth={1.4} />
          </span>
          <h2 className="font-serif text-2xl uppercase">No Orders Found</h2>
          <p className="mt-2 text-sm text-muted">You haven&apos;t placed any orders yet.</p>
          <Button to="/collections/new-arrivals" className="mt-6">Explore New Arrivals</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((ord) => (
            <article key={ord.id} className="border border-line bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Order Number</span>
                  <p className="font-semibold">{ord.orderNumber}</p>
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Date</span>
                  <p className="text-sm text-muted">{new Date(ord.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Total Amount</span>
                  <p className="font-semibold">{formatCurrency(ord.totals.total)}</p>
                </div>
                <div>
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                    ord.status === 'Delivered' ? 'bg-[#e7f5ec] text-success' : 'bg-sand text-ink'
                  }`}>
                    {ord.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-4">
                  {ord.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="h-16 w-12 object-cover bg-sand border border-line" />
                      <div>
                        <p className="text-xs font-semibold">{item.name}</p>
                        <p className="text-[11px] text-muted">{item.color} · {item.size} · Qty {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/orders/confirmation"
                  state={{ order: ord }}
                  className="btn btn-outline !py-2.5 !text-[11px]"
                >
                  View Order Summary
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
