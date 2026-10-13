import { Navigate, useParams } from 'react-router-dom'
import CollectionView from '../components/products/CollectionView'
import { COLLECTIONS } from '../data/categories'

/** /collections/men and /collections/men/:category — uses the shared CollectionView. */
export default function MenCollection() {
  const { category } = useParams()
  const config = COLLECTIONS.men
  if (category && !config.categories.some((c) => c.slug === category)) return <Navigate to="/collections/men" replace />
  return <CollectionView key={`men-${category || 'all'}`} config={config} activeCategory={category} />
}
