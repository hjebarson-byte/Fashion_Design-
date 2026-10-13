import { useMemo } from 'react'
import { products, getProductById, getProductBySlug, getRelatedProducts } from '../data/products'
import { CATEGORY_LABELS } from '../data/categories'
import { searchProducts } from '../utils/filterProducts'

/**
 * Read-only access to the catalogue. Today it reads local mock data; later this is
 * the single place to swap in an API call (e.g. with Axios) without touching pages.
 */
export default function useProducts() {
  return useMemo(
    () => ({
      products,
      getById: getProductById,
      getBySlug: getProductBySlug,
      getRelated: getRelatedProducts,
      search: (query) => searchProducts(products, query, CATEGORY_LABELS),
      newArrivals: products.filter((p) => p.isNew),
      bestSellers: products.filter((p) => p.isBestSeller),
      sale: products.filter((p) => p.isSale),
    }),
    [],
  )
}
