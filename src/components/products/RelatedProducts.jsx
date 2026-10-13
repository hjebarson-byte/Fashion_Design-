import ProductGrid from './ProductGrid'
import Reveal from '../common/Reveal'

/** "You may also like" / "Recently viewed" block. Renders nothing when the list is empty. */
export default function RelatedProducts({ title, products, eyebrow }) {
  if (!products.length) return null
  return (
    <section className="section-y border-t border-line" aria-label={title}>
      <div className="container-x">
        <Reveal className="mb-10 text-center">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h2 className="section-title">{title}</h2>
        </Reveal>
        <ProductGrid products={products} />
      </div>
    </section>
  )
}
