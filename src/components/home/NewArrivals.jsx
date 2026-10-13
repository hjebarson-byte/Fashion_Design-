import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductGrid from '../products/ProductGrid'
import Reveal from '../common/Reveal'
import Button from '../common/Button'
import useProducts from '../../hooks/useProducts'

/** Homepage "Just landed": 8 newest products. */
export default function NewArrivals() {
  const { products } = useProducts()
  const items = products
    .filter((p) => p.isNew)
    .sort((a, b) => b.addedAt - a.addedAt)
    .slice(0, 8)

  return (
    <section className="pb-16 md:pb-24" aria-labelledby="new-arrivals-title">
      <div className="container-x">
        <Reveal className="mb-12 flex flex-col items-center text-center md:mb-14">
          <p className="eyebrow mb-3">Fresh pieces. New energy.</p>
          <h2 id="new-arrivals-title" className="section-title">Just landed</h2>
          <Link to="/collections/new-arrivals" className="mt-4 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] md:inline-flex">
            <span className="link-underline">Shop all</span> <ArrowRight size={14} />
          </Link>
        </Reveal>
        <ProductGrid products={items} />
        <div className="mt-14 text-center">
          <Button variant="outline" to="/collections/new-arrivals">View all new arrivals</Button>
        </div>
      </div>
    </section>
  )
}
