import { products } from './products'

// Illustrative demo orders so Order History is never empty.
// They reference real catalogue products by id; prices are copied at "purchase time".

const pick = (id) => {
  const p = products.find((x) => x.id === id)
  return { productId: p.id, name: p.name, image: p.images[0], color: p.colors[0].name, size: p.sizes[1] || p.sizes[0], price: p.price }
}

const DAY = 86400000
const now = Date.now()

function make(number, daysAgo, status, items, quantities) {
  const lines = items.map((id, i) => ({ ...pick(id), quantity: quantities[i] || 1 }))
  const subtotal = lines.reduce((s, l) => s + l.price * l.quantity, 0)
  const shipping = subtotal >= 2999 ? 0 : 149
  return {
    id: number,
    orderNumber: number,
    createdAt: now - daysAgo * DAY,
    status,
    isDemo: true,
    items: lines,
    totals: { subtotal, discount: 0, shipping, total: subtotal + shipping },
    shippingAddress: {
      name: 'Demo Customer',
      line1: '42, Lotus Residency, MG Road',
      landmark: 'Near Central Park',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560001',
      country: 'India',
    },
    deliveryMethod: 'Standard Delivery',
    paymentMethod: 'Cash on Delivery',
  }
}

export const mockOrders = [
  make('VEL-240612-4831', 2, 'Shipped', ['p-001', 'p-003'], [2, 1]),
  make('VEL-240528-1190', 18, 'Delivered', ['p-026', 'p-030'], [1, 2]),
  make('VEL-240430-7716', 46, 'Delivered', ['p-007'], [1]),
]
