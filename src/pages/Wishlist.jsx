import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Breadcrumbs from '../components/common/Breadcrumbs'
import ProductCard from '../components/products/ProductCard'
import EmptyState from '../components/common/EmptyState'
import { useWishlist } from '../context/WishlistContext'
import useProducts from '../hooks/useProducts'
import usePageMeta from '../hooks/usePageMeta'

export default function Wishlist() {
  const { wishlistIds } = useWishlist()
  const { getById } = useProducts()

  usePageMeta('My Wishlist', 'Your saved fashion favorites on VELORA.')

  const items = useMemo(() => {
    return wishlistIds.map((id) => getById(id)).filter(Boolean)
  }, [wishlistIds, getById])

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Wishlist' },
  ]

  return (
    <div className="container-x py-8 md:py-12">
      <Breadcrumbs items={crumbs} className="mb-6 md:mb-8" />

      <header className="mb-8 border-b border-line pb-6">
        <h1 className="font-serif text-3xl font-normal uppercase tracking-tight md:text-4xl">My Wishlist</h1>
        <p className="mt-1 text-sm text-muted">
          {items.length} {items.length === 1 ? 'saved item' : 'saved items'}
        </p>
      </header>

      {items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your Wishlist Is Empty"
          text="Save items you love by tapping the heart icon on any product card while browsing."
          actions={[
            { label: 'Explore New Arrivals', to: '/collections/new-arrivals' },
            { label: 'Shop Best Sellers', to: '/collections/best-sellers', variant: 'outline' },
          ]}
        />
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 md:gap-y-12 lg:grid-cols-4">
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
