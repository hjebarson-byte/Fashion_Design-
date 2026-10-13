import ProductGrid from '../products/ProductGrid'
import Reveal from '../common/Reveal'
import Button from '../common/Button'
import useProducts from '../../hooks/useProducts'

/** Homepage "The favorites": top best sellers by sales count. */
export default function BestSellers() {
  const { products } = useProducts()
  const items = products
    .filter((p) => p.isBestSeller)
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, 8)

  return (
    <section className="section-y bg-sand" aria-labelledby="best-sellers-title">
      <div className="container-x">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-3">Most loved</p>
          <h2 id="best-sellers-title" className="section-title">The favorites</h2>
        </Reveal>
        <ProductGrid products={items} />
        <div className="mt-14 text-center">
          <Button variant="outline" to="/collections/best-sellers">View all best sellers</Button>
        </div>
      </div>
    </section>
  )
}
