import { findCoupon } from '../data/coupons'
import { storeConfig } from '../data/storeConfig'

// Money maths is done in paise (integers) to avoid floating-point errors.
const toPaise = (rupees) => Math.round(rupees * 100)
const toRupees = (paise) => paise / 100

/**
 * Work out the shipping fee in rupees.
 * method: 'standard' | 'express'. Standard is free above the threshold;
 * a FREESHIP coupon makes either method free.
 */
export function getShippingFee(subtotal, couponCode, method = 'standard') {
  const coupon = findCoupon(couponCode)
  if (subtotal <= 0) return 0
  if (coupon?.type === 'shipping') return 0
  const { shipping } = storeConfig
  if (method === 'express') return shipping.express.price
  return subtotal >= shipping.freeShippingThreshold ? 0 : shipping.standard.price
}

/**
 * Validate a coupon against the current subtotal.
 * Returns { valid, coupon?, message? }
 */
export function validateCoupon(code, subtotal) {
  const coupon = findCoupon(code)
  if (!coupon) return { valid: false, message: 'That promo code is not valid.' }
  if (subtotal <= 0) return { valid: false, message: 'Add items to your bag before applying a code.' }
  if (subtotal < coupon.minSubtotal) {
    return {
      valid: false,
      message: `${coupon.code} needs a minimum order of ₹${coupon.minSubtotal.toLocaleString('en-IN')}.`,
    }
  }
  return { valid: true, coupon }
}

/**
 * Calculate all cart totals (in rupees) from joined line items.
 * lineItems: [{ product, quantity }]
 */
export function calculateTotals(lineItems, couponCode = null, method = 'standard') {
  const subtotalPaise = lineItems.reduce((sum, l) => sum + toPaise(l.product.price) * l.quantity, 0)
  const originalPaise = lineItems.reduce(
    (sum, l) => sum + toPaise(l.product.originalPrice || l.product.price) * l.quantity,
    0,
  )
  const subtotal = toRupees(subtotalPaise)

  const check = couponCode ? validateCoupon(couponCode, subtotal) : { valid: false }
  const coupon = check.valid ? check.coupon : null

  let discountPaise = 0
  if (coupon?.type === 'percent') {
    discountPaise = Math.round((subtotalPaise * coupon.value) / 100)
  }

  const shipping = getShippingFee(subtotal, coupon ? coupon.code : null, method)
  const totalPaise = subtotalPaise - discountPaise + toPaise(shipping)

  return {
    itemCount: lineItems.reduce((n, l) => n + l.quantity, 0),
    subtotal,
    saleSavings: toRupees(originalPaise - subtotalPaise), // savings from reduced prices
    discount: toRupees(discountPaise), // savings from the coupon
    shipping,
    total: toRupees(totalPaise),
    appliedCoupon: coupon,
    couponMessage: couponCode && !check.valid ? check.message : null,
    amountToFreeShipping: Math.max(0, storeConfig.shipping.freeShippingThreshold - subtotal),
  }
}
