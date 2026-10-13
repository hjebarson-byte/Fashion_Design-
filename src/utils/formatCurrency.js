import { storeConfig } from '../data/storeConfig'

const { locale, code } = storeConfig.currency

/**
 * Format a rupee amount in the Indian locale, e.g. 1499 -> "₹1,499.00".
 * Pass fractionDigits = 0 for compact product-card prices ("₹1,499").
 */
export function formatCurrency(amount, fractionDigits = 2) {
  const value = Number(amount) || 0
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value)
}

/** Compact price used on product cards: "₹1,499" */
export const formatPrice = (amount) => formatCurrency(amount, 0)

/** Percentage discount between an original and a current price. */
export function discountPercent(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return 0
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}
