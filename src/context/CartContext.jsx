import { createContext, useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import useToast from '../hooks/useToast'
import { useShop } from './ShopContext'
import { getProductById } from '../data/products'
import { storeConfig } from '../data/storeConfig'
import { calculateTotals, validateCoupon } from '../utils/cartCalculations'

const CartContext = createContext(null)

const isCartShape = (v) =>
  v &&
  typeof v === 'object' &&
  Array.isArray(v.items) &&
  v.items.every((i) => i && typeof i.productId === 'string' && Number.isInteger(i.quantity) && i.quantity > 0)

const EMPTY_CART = { items: [], couponCode: null }

/** The maximum quantity allowed for one cart line: mock stock and the store limit. */
export const maxQuantityFor = (product) => Math.max(0, Math.min(product.stock, storeConfig.maxQuantityPerItem))

/**
 * Cart state. Only {productId, color, size, quantity} is stored — prices and images
 * are looked up from the catalogue so they can never go stale.
 */
export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('velora_cart', EMPTY_CART, isCartShape)
  const { openCart } = useShop()
  const toast = useToast()

  // Join stored lines with live product data; drop lines whose product no longer exists.
  const lineItems = useMemo(
    () =>
      cart.items
        .map((item) => ({ ...item, product: getProductById(item.productId) }))
        .filter((l) => l.product),
    [cart.items],
  )

  const totals = useMemo(() => calculateTotals(lineItems, cart.couponCode), [lineItems, cart.couponCode])

  /** Add a variant. Returns { ok, message }. Opens the mini-cart on success. */
  const addItem = useCallback(
    (product, { color, size, quantity = 1 }, { openDrawer = true } = {}) => {
      if (product.stock <= 0) {
        const message = 'Sorry, this item is out of stock.'
        toast.error(message)
        return { ok: false, message }
      }
      if (!color || !size) {
        const message = 'Please choose a size and colour.'
        toast.error(message)
        return { ok: false, message }
      }
      const qty = Math.floor(Number(quantity))
      if (!Number.isFinite(qty) || qty < 1) {
        const message = 'Please choose a valid quantity.'
        toast.error(message)
        return { ok: false, message }
      }
      const key = `${product.id}|${color}|${size}`
      const limit = maxQuantityFor(product)
      const existing = cart.items.find((i) => i.key === key)
      const nextQty = (existing?.quantity || 0) + qty
      if (nextQty > limit) {
        const message = `Only ${limit} available for this item${existing ? ` (you already have ${existing.quantity} in your bag)` : ''}.`
        toast.error(message)
        return { ok: false, message }
      }
      setCart((c) => ({
        ...c,
        items: existing
          ? c.items.map((i) => (i.key === key ? { ...i, quantity: nextQty } : i))
          : [...c.items, { key, productId: product.id, color, size, quantity: qty }],
      }))
      if (openDrawer) openCart()
      return { ok: true, message: 'Added to bag' }
    },
    [cart.items, setCart, openCart, toast],
  )

  const removeItem = useCallback(
    (key) => setCart((c) => ({ ...c, items: c.items.filter((i) => i.key !== key) })),
    [setCart],
  )

  /** Update quantity; clamps to valid range and reports when stock is exceeded. */
  const updateQuantity = useCallback(
    (key, quantity) => {
      const line = lineItems.find((l) => l.key === key)
      if (!line) return
      const qty = Math.floor(Number(quantity))
      if (!Number.isFinite(qty)) return
      if (qty < 1) return removeItem(key)
      const limit = maxQuantityFor(line.product)
      if (qty > limit) {
        toast.error(`Only ${limit} available for "${line.product.name}".`)
        return
      }
      setCart((c) => ({ ...c, items: c.items.map((i) => (i.key === key ? { ...i, quantity: qty } : i)) }))
    },
    [lineItems, removeItem, setCart, toast],
  )

  const clearCart = useCallback(() => setCart(EMPTY_CART), [setCart])

  const applyCoupon = useCallback(
    (code) => {
      const result = validateCoupon(code, totals.subtotal)
      if (!result.valid) {
        toast.error(result.message)
        return { ok: false, message: result.message }
      }
      setCart((c) => ({ ...c, couponCode: result.coupon.code }))
      toast.success(`Promo code ${result.coupon.code} applied — ${result.coupon.description}`)
      return { ok: true }
    },
    [totals.subtotal, setCart, toast],
  )

  const removeCoupon = useCallback(() => {
    setCart((c) => ({ ...c, couponCode: null }))
    toast.info('Promo code removed')
  }, [setCart, toast])

  const value = useMemo(
    () => ({
      lineItems,
      totals,
      couponCode: cart.couponCode,
      itemCount: totals.itemCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
    }),
    [lineItems, totals, cart.couponCode, addItem, removeItem, updateQuantity, clearCart, applyCoupon, removeCoupon],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
