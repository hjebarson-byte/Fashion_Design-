import CollectionView from '../components/products/CollectionView'
import { COLLECTIONS } from '../data/categories'

export default function BestSellersPage() {
  return <CollectionView config={COLLECTIONS['best-sellers']} />
}
