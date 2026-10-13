import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Heart, MapPin, Ruler, ShoppingBag, Truck, RotateCcw } from 'lucide-react'
import ColorSwatches from './ColorSwatches'
import SizeSelector from './SizeSelector'
import SizeGuide from './SizeGuide'
import StarRating from '../common/StarRating'
import QuantitySelector from '../common/QuantitySelector'
import Accordion from '../common/Accordion'
import { useCart, maxQuantityFor } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { CATEGORY_LABELS } from '../../data/categories'
import { storeConfig } from '../../data/storeConfig'
import { discountPercent, formatCurrency, formatPrice } from '../../utils/formatCurrency'
import { isPincode } from '../../utils/validation'

/**
 * Right-hand column of the product page: all variant selection + purchase logic.
 * The selected colour is controlled by the page so the gallery can follow it.
 */
export default function ProductInfo({ product, color, onColorChange }) {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : null)
  const [quantity, setQuantity] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const [qtyError, setQtyError] = useState('')
  const [added, setAdded] = useState(false)
  const [guideOpen, setGuideOpen] = useState(false)
  const [pin, setPin] = useState('')
  const [pinResult, setPinResult] = useState(null)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const ctaRef = useRef(null)

  const wished = isInWishlist(product.id)
  const pct = discountPercent(product.price, product.originalPrice)
  const limit = maxQuantityFor(product)
  const outOfStock = product.stock <= 0
  const { standard, express } = storeConfig.shipping

  // Show the sticky mobile bar once the main Add to Cart button scrolls out of view
  useEffect(() => {
    const el = ctaRef.current
    if (!el || !('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(([entry]) => setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const changeQty = (next) => {
    if (next < 1) return
    if (next > limit) {
      setQtyError(`Only ${limit} available in stock for this item.`)
      return
    }
    setQtyError('')
    setQuantity(next)
  }

  const validate = () => {
    if (!size) {
      setSizeError(true)
      document.getElementById('size-label')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return false
    }
    return true
  }

  const handleAdd = () => {
    if (!validate()) return
    const res = addItem(product, { color: color.name, size, quantity })
    if (res.ok) {
      setAdded(true)
      window.setTimeout(() => setAdded(false), 1800)
    }
  }

  const handleBuyNow = () => {
    if (!validate()) return
    const res = addItem(product, { color: color.name, size, quantity }, { openDrawer: false })
    if (res.ok) navigate('/checkout')
  }

  const checkPin = (e) => {
    e.preventDefault()
    if (!isPincode(pin)) return setPinResult({ ok: false, text: 'Please enter a valid 6-digit postal code.' })
    setPinResult({
      ok: true,
      text: `Delivery to ${pin}: Standard in ${standard.minDays}–${standard.maxDays} days, Express in ${express.minDays}–${express.maxDays} days. (Illustrative estimate.)`,
    })
  }

  const stockText = outOfStock ? 'Out of stock' : product.stock <= 5 ? `Only ${product.stock} left` : 'In stock'
  const stockColor = outOfStock ? 'text-sale' : product.stock <= 5 ? 'text-[#a8641b]' : 'text-success'

  const accordionItems = [
    { id: 'details', title: 'Product details', content: <p>{product.description}</p> },
    { id: 'fabric', title: 'Fabric & materials', content: <p>{product.material}.</p> },
    {
      id: 'fit',
      title: 'Size & fit',
      content: <p>True to size with a {product.style === 'Streetwear' ? 'relaxed, slightly oversized' : 'regular, modern'} fit. If you are between sizes, we suggest sizing up. See the size guide for full measurements.</p>,
    },
    { id: 'care', title: 'Care instructions', content: <ul className="list-disc space-y-1 pl-5">{product.care.map((c) => <li key={c}>{c}</li>)}</ul> },
    {
      id: 'shipping',
      title: 'Shipping & returns',
      content: (
        <p>
          Standard delivery in {standard.minDays}–{standard.maxDays} days ({standard.price === 0 ? 'free' : formatCurrency(standard.price)}; free over {formatCurrency(storeConfig.shipping.freeShippingThreshold, 0)}). Express delivery in {express.minDays}–{express.maxDays} days ({formatCurrency(express.price)}). Easy returns within {storeConfig.returns.windowDays} days on unworn items. These are illustrative demo policies.
        </p>
      ),
    },
  ]

  return (
    <div>
      <p className="eyebrow">{product.gender === 'men' ? "Men's" : "Women's"} · {CATEGORY_LABELS[product.category]}</p>
      <h1 className="mt-2 font-serif text-3xl font-normal leading-tight md:text-4xl">{product.name}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
        <StarRating rating={product.rating} count={product.reviewCount} />
        <span className={`text-xs font-semibold uppercase tracking-[0.12em] ${stockColor}`}>{stockText}</span>
      </div>

      <div className="mt-5 flex flex-wrap items-baseline gap-3">
        <span className={`text-2xl font-semibold ${pct ? 'text-sale' : ''}`}>{formatPrice(product.price)}</span>
        {pct > 0 && (
          <>
            <span className="text-base text-muted line-through">{formatPrice(product.originalPrice)}</span>
            <span className="bg-sale px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">Save {pct}%</span>
          </>
        )}
      </div>
      <p className="mt-1 text-xs text-muted">Inclusive of all taxes (demo pricing).</p>

      <p className="mt-6 text-sm leading-relaxed text-muted">{product.description}</p>

      {/* colour */}
      <div className="mt-8">
        <p className="label">Colour: <span className="font-normal normal-case tracking-normal text-muted">{color.name}</span></p>
        <ColorSwatches colors={product.colors} selected={color.name} onSelect={onColorChange} size="lg" max={12} label="Colour" />
      </div>

      {/* size */}
      <div className="mt-7">
        <div className="mb-2 flex items-center justify-between">
          <p id="size-label" className="label !mb-0">Size {size && <span className="font-normal normal-case tracking-normal text-muted">: {size}</span>}</p>
          {product.category !== 'accessories' && (
            <button type="button" onClick={() => setGuideOpen(true)} className="inline-flex items-center gap-1.5 text-xs underline underline-offset-4">
              <Ruler size={14} /> Size guide
            </button>
          )}
        </div>
        <SizeSelector sizes={product.sizes} selected={size} onSelect={(s) => { setSize(s); setSizeError(false) }} error={sizeError} />
        {sizeError && <p role="alert" className="error-text">Please select a size before adding to your bag.</p>}
      </div>

      {/* quantity + CTAs */}
      <div className="mt-7">
        <p className="label">Quantity</p>
        <QuantitySelector value={quantity} onChange={changeQty} max={99} />
        {qtyError && <p role="alert" className="error-text">{qtyError}</p>}
      </div>

      <div ref={ctaRef} className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
        <button type="button" disabled={outOfStock} onClick={handleAdd} className={`btn btn-primary w-full !py-4 ${added ? '!border-success !bg-success' : ''}`}>
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span key="ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="inline-flex items-center gap-2">
                <Check size={16} /> Added to bag
              </motion.span>
            ) : (
              <motion.span key="add" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="inline-flex items-center gap-2">
                <ShoppingBag size={16} /> {outOfStock ? 'Out of stock' : 'Add to bag'}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-pressed={wished}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className="grid h-[52px] w-full place-items-center border border-line transition-colors hover:border-ink sm:w-[52px]"
        >
          <motion.span key={String(wished)} initial={{ scale: wished ? 0.4 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 14 }}>
            <Heart size={20} className={wished ? 'fill-sale text-sale' : ''} />
          </motion.span>
        </button>
        <button type="button" disabled={outOfStock} onClick={handleBuyNow} className="btn btn-outline w-full !py-4 sm:col-span-2">Buy now</button>
      </div>

      {/* delivery */}
      <div className="mt-8 border border-line p-5">
        <p className="label flex items-center gap-2"><MapPin size={14} /> Check delivery</p>
        <form onSubmit={checkPin} className="flex gap-2" noValidate>
          <label htmlFor="pincode" className="sr-only">Postal code</label>
          <input id="pincode" inputMode="numeric" maxLength={6} value={pin} onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setPinResult(null) }} placeholder="Enter 6-digit postal code" className="field !py-3" />
          <button type="submit" className="btn btn-outline !px-5 !py-3">Check</button>
        </form>
        {pinResult && <p role="status" className={`mt-3 text-xs ${pinResult.ok ? 'text-success' : 'text-sale'}`}>{pinResult.text}</p>}
        <ul className="mt-4 space-y-2 text-xs text-muted">
          <li className="flex items-center gap-2"><Truck size={14} /> Free standard shipping over {formatCurrency(storeConfig.shipping.freeShippingThreshold, 0)}</li>
          <li className="flex items-center gap-2"><RotateCcw size={14} /> {storeConfig.returns.windowDays}-day easy returns (demo policy)</li>
        </ul>
      </div>

      <Accordion items={accordionItems} defaultOpen="details" className="mt-8" />

      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} gender={product.gender} category={product.category} />

      {/* Sticky add-to-cart bar (mobile) */}
      <AnimatePresence>
        {showStickyBar && !outOfStock && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-line bg-white px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] lg:hidden"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{product.name}</p>
              <p className="text-xs text-muted">{formatPrice(product.price)}{size ? ` · ${size}` : ''}</p>
            </div>
            <button type="button" onClick={handleAdd} className="btn btn-primary !px-6 !py-3">{size ? 'Add to bag' : 'Select size'}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
