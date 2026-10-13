import { Pencil } from 'lucide-react'
import CartItem from '../cart/CartItem'
import { deliveryWindow } from './DeliveryOptions'
import { PAYMENT_METHODS } from './PaymentOptions'
import { storeConfig } from '../../data/storeConfig'

/** Checkout step 5: read-only review of everything the customer has entered. */
export default function OrderReview({ lineItems, data, onEdit }) {
  const a = data.address
  const delivery = storeConfig.shipping[data.delivery]
  const payment = PAYMENT_METHODS.find((p) => p.id === data.payment)

  const Block = ({ title, step, children }) => (
    <div className="border border-line p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.16em]">{title}</h3>
        <button type="button" onClick={() => onEdit(step)} className="inline-flex items-center gap-1.5 text-xs underline underline-offset-4"><Pencil size={12} /> Edit</button>
      </div>
      <div className="text-sm leading-relaxed text-muted">{children}</div>
    </div>
  )

  return (
    <div className="space-y-5">
      <div className="border border-line px-5">
        <h3 className="border-b border-line py-4 text-[12px] font-semibold uppercase tracking-[0.16em]">Items ordered</h3>
        <ul className="divide-y divide-line">
          {lineItems.map((l) => <CartItem key={l.key} line={l} compact readOnly />)}
        </ul>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Block title="Contact" step={0}>
          <p className="text-ink">{data.contact.name}</p>
          <p>{data.contact.email}</p>
          <p>{data.contact.mobile}</p>
        </Block>
        <Block title="Shipping address" step={1}>
          <p className="text-ink">{a.house}, {a.street}</p>
          {a.landmark && <p>Landmark: {a.landmark}</p>}
          <p>{a.city}, {a.state} {a.postalCode}</p>
          <p>{a.country}</p>
        </Block>
        <Block title="Delivery" step={2}>
          <p className="text-ink">{delivery.label}</p>
          <p>Estimated {deliveryWindow(data.delivery).text} (illustrative)</p>
        </Block>
        <Block title="Payment" step={3}>
          <p className="text-ink">{payment?.label}</p>
          <p>Demo only — no payment will be taken.</p>
        </Block>
      </div>
    </div>
  )
}
