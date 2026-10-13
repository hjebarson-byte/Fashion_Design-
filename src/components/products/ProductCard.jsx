import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Plus } from 'lucide-react'
import SmartImage from '../common/SmartImage'
import ColorSwatches from './ColorSwatches'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { discountPercent, formatPrice } from '../../utils/formatCurrency'

/**
 * The one product card used everywhere (home, collections, search, wishlist …).
 *  - hover shows a secondary image
 *  - colour swatches swap the displayed image
 *  - heart toggles wishlist (shared global state)
 *  - Quick Add reveals a size picker and adds the chosen variant to the bag
 */
export default function ProductCard({ product, index = 0, showQuickAdd = true }) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addItem } = useCart()
  const [color, setColor] = useState(product.colors[0])
  const [hovered, setHovered] = useState(false)
  const [quickOpen, setQuickOpen] = useState(false)

  const wished = isInWishlist(product.id)
  const pct = discountPercent(product.price, product.originalPrice)
  const outOfStock = product.stock <= 0
  const to = `/products/${product.slug}`

  // Primary image follows the selected colour; the hover image is the next different photo.
  const main = color.image
  const hover = product.images.find((img) => img !== main) || main

  const quickAdd = (size) => {
    const res = addItem(product, { color: color.name, size, quantity: 1 })
    if (res.ok) setQuickOpen(false)
  }

  const handleQuickClick = () => {
    if (product.sizes.length === 1) quickAdd(product.sizes[0])
    else setQuickOpen((o) => !o)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, delay: Math.min(index % 4, 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setQuickOpen(false)
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <Link to={to} className="absolute inset-0 block" aria-label={`View ${product.name}`} tabIndex={-1}>
          <SmartImage
            src={main}
            alt={`${product.name} in ${color.name}`}
            width={600}
            sizes="(min-width:1024px) 25vw, 50vw"
            className="absolute inset-0"
            imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
          {hover !== main && (
            <SmartImage
              src={hover}
              alt=""
              width={600}
              sizes="(min-width:1024px) 25vw, 50vw"
              aria-hidden="true"
              className={`absolute inset-0 transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
              imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
          )}
        </Link>

        {/* badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.isNew && <span className="bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">New</span>}
          {pct > 0 && <span className="bg-sale px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">−{pct}%</span>}
          {outOfStock && <span className="bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">Sold out</span>}
        </div>

        {/* wishlist */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-colors hover:bg-white"
        >
          <motion.span key={String(wished)} initial={{ scale: wished ? 0.4 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 14 }}>
            <Heart size={18} className={wished ? 'fill-sale text-sale' : 'text-ink'} />
          </motion.span>
        </button>

        {/* quick add */}
        {showQuickAdd && !outOfStock && (
          <div className="absolute inset-x-0 bottom-0 p-2.5 transition-all duration-300 md:translate-y-3 md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <AnimatePresence mode="wait" initial={false}>
              {quickOpen ? (
                <motion.div
                  key="sizes"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="bg-white/95 p-3 backdrop-blur"
                  role="group"
                  aria-label={`Choose a size for ${product.name}`}
                >
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Select size</p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((s) => (
                      <button key={s} type="button" onClick={() => quickAdd(s)} className="h-9 min-w-9 border border-line px-2 text-xs font-medium transition-colors hover:border-ink hover:bg-ink hover:text-white">
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  key="btn"
                  type="button"
                  onClick={handleQuickClick}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex w-full items-center justify-center gap-2 bg-white/95 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur transition-colors hover:bg-ink hover:text-white"
                >
                  <Plus size={14} /> Quick add
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="pt-3.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[13px] font-medium leading-snug md:text-sm">
            <Link to={to} className="transition-colors hover:text-accent-dark">{product.name}</Link>
          </h3>
          <p className="shrink-0 text-right text-[13px] md:text-sm">
            <span className={`font-semibold ${pct > 0 ? 'text-sale' : ''}`}>{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="ml-1.5 block text-xs text-muted line-through sm:inline">{formatPrice(product.originalPrice)}</span>
            )}
          </p>
        </div>
        <div className="mt-2.5">
          <ColorSwatches colors={product.colors} selected={color.name} onSelect={setColor} />
        </div>
      </div>
    </motion.article>
  )
}
