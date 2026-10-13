import CollectionView from '../components/products/CollectionView'
import { COLLECTIONS } from '../data/categories'

export default function NewArrivalsPage() {
  return <CollectionView config={COLLECTIONS['new-arrivals']} />
}
