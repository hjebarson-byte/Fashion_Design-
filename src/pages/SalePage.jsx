import CollectionView from '../components/products/CollectionView'
import { COLLECTIONS } from '../data/categories'

export default function SalePage() {
  return <CollectionView config={COLLECTIONS.sale} />
}
