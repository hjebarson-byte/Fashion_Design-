import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Breadcrumbs from '../components/common/Breadcrumbs'
import ProductGallery from '../components/products/ProductGallery'
import ProductInfo from '../components/products/ProductInfo'
import RelatedProducts from '../components/products/RelatedProducts'
import EmptyState from '../components/common/EmptyState'
import useProducts from '../hooks/useProducts'
import usePageMeta from '../hooks/usePageMeta'
import { useShop } from '../context/ShopContext'
import { CATEGORY_LABELS } from '../data/categories'
import { SearchX } from 'lucide-react'

export default function ProductDetails() {
  const { slug } = useParams()
  const { getBySlug, getRelated, getById } = useProducts()
  const { addRecentlyViewed, recentlyViewed } = useShop()

  const product = getBySlug(slug)

  // Track active photo index in gallery, allowing color changes to update gallery photo
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState(() => product ? product.colors[0] : null)

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0])
      setActiveImageIndex(0)
      addRecentlyViewed(product.id)
    }
  }, [product, addRecentlyViewed])

  usePageMeta(
    product ? product.name : 'Product Not Found',
    product ? product.description : 'The requested product could not be found.'
  )

  const handleColorChange = (color) => {
    setSelectedColor(color)
    const idx = product.images.findIndex((img) => img === color.image)
    if (idx !== -1) {
      setActiveImageIndex(idx)
    }
  }

  const related = useMemo(() => {
    if (!product) return []
    return getRelated(product, 4)
  }, [product, getRelated])

  const viewedProducts = useMemo(() => {
    if (!product) return []
    return recentlyViewed
      .filter((id) => id !== product.id)
      .map((id) => getById(id))
      .filter(Boolean)
      .slice(0, 4)
  }, [product, recentlyViewed, getById])

  if (!product) {
    return (
      <div className="container-x py-20">
        <EmptyState
          icon={SearchX}
          title="Product Not Found"
          text="We couldn't find the product you're looking for. It may have been discontinued or moved."
          actions={[
            { label: 'Shop Men', to: '/collections/men' },
            { label: 'Shop Women', to: '/collections/women', variant: 'outline' },
          ]}
        />
      </div>
    )
  }

  const genderLabel = product.gender === 'men' ? "Men's" : "Women's"
  const categoryLabel = CATEGORY_LABELS[product.category] || product.category
  const collectionPath = `/collections/${product.gender}`

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: genderLabel, to: collectionPath },
    { label: categoryLabel, to: `${collectionPath}/${product.category}` },
    { label: product.name },
  ]

  return (
    <div className="container-x py-6 md:py-10">
      <Breadcrumbs items={crumbs} className="mb-6 md:mb-8" />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7 xl:col-span-7">
          <ProductGallery
            images={product.images}
            name={product.name}
            active={activeImageIndex}
            onChange={setActiveImageIndex}
          />
        </div>

        <div className="lg:col-span-5 xl:col-span-5">
          <ProductInfo
            product={product}
            color={selectedColor || product.colors[0]}
            onColorChange={handleColorChange}
          />
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        <RelatedProducts
          title="You May Also Like"
          eyebrow="Recommended for you"
          products={related}
        />

        {viewedProducts.length > 0 && (
          <RelatedProducts
            title="Recently Viewed"
            eyebrow="Your browsing history"
            products={viewedProducts}
          />
        )}
      </div>
    </div>
  )
}
