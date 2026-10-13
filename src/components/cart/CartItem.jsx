import { Link } from 'react-router-dom'
import { Trash2, Heart } from 'lucide-react'
import SmartImage from '../common/SmartImage'
import QuantitySelector from '../common/QuantitySelector'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import useToast from '../../hooks/useToast'
import { formatCurrency } from '../../utils/formatCurrency'

/**
 * One cart line. `compact` is the mini-cart (drawer) version; the default is the full cart page row.
 */
export default function CartItem({ line, compact = false, readOnly = false }) {
  const { updateQuantity, removeItem } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  const toast = useToast()
  const { product } = line
  const image = product.colors.find((c) => c.name === line.color)?.image || product.images[0]
  const lineTotal = product.price * line.quantity

  const moveToWishlist = () => {
    addToWishlist(product)
    removeItem(line.key)
    toast.success(`Moved "${product.name}" to your wishlist`)
  }

  return (
    <li className={`flex gap-4 ${compact ? 'py-5' : 'py-6 sm:gap-6'}`}>
      <Link to={`/products/${product.slug}`} className={`shrink-0 ${compact ? 'w-20' : 'w-24 sm:w-32'}`} aria-label={product.name}>
        <SmartImage src={image} alt={`${product.name} in ${line.color}`} width={260} className="aspect-[3/4]" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-medium leading-snug"><Link to={`/products/${product.slug}`} className="hover:text-accent-dark">{product.name}</Link></h3>
            <p className="mt-1 text-xs text-muted">{line.color} · {line.size}</p>
            <p className="mt-1 text-xs text-muted">{formatCurrency(product.price)} each</p>
          </div>
          <p className="shrink-0 text-sm font-semibold">{formatCurrency(lineTotal)}</p>
        </div>

        {!readOnly && (
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
            <QuantitySelector size="sm" value={line.quantity} max={99} onChange={(q) => updateQuantity(line.key, q)} label={`Quantity for ${product.name}`} />
            <div className="flex items-center gap-4 text-xs">
              {!compact && !isInWishlist(product.id) && (
                <button type="button" onClick={moveToWishlist} className="inline-flex items-center gap-1.5 text-muted underline-offset-4 hover:text-ink hover:underline">
                  <Heart size={14} /> Move to wishlist
                </button>
              )}
              <button type="button" onClick={() => removeItem(line.key)} className="inline-flex items-center gap-1.5 text-muted underline-offset-4 hover:text-sale hover:underline" aria-label={`Remove ${product.name} from bag`}>
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        )}
        {readOnly && <p className="mt-auto pt-2 text-xs text-muted">Qty {line.quantity}</p>}
      </div>
    </li>
  )
}
