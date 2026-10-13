import { Navigate, useParams } from 'react-router-dom'
import CollectionView from '../components/products/CollectionView'
import { COLLECTIONS } from '../data/categories'

/** /collections/women and /collections/women/:category — same shared CollectionView, women's config. */
export default function WomenCollection() {
  const { category } = useParams()
  const config = COLLECTIONS.women
  if (category && !config.categories.some((c) => c.slug === category)) return <Navigate to="/collections/women" replace />
  return <CollectionView key={`women-${category || 'all'}`} config={config} activeCategory={category} />
}
