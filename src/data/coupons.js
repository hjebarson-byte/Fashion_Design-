// -----------------------------------------------------------------
// Mock coupon codes (frontend demo only — validated in the browser).
//
//   WELCOME10  → 10% off the subtotal
//   STYLE15    → 15% off the subtotal (minimum subtotal ₹1,999)
//   FREESHIP   → free standard/express shipping
//
// type: 'percent' | 'shipping'.  minSubtotal is in rupees.
// -----------------------------------------------------------------

export const coupons = {
  WELCOME10: { code: 'WELCOME10', type: 'percent', value: 10, minSubtotal: 0, description: '10% off your order' },
  STYLE15: { code: 'STYLE15', type: 'percent', value: 15, minSubtotal: 1999, description: '15% off orders above ₹1,999' },
  FREESHIP: { code: 'FREESHIP', type: 'shipping', value: 0, minSubtotal: 0, description: 'Free shipping' },
}

export function findCoupon(code) {
  if (!code) return null
  return coupons[String(code).trim().toUpperCase()] || null
}
