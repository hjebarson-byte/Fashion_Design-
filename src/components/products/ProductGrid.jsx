import ProductCard from './ProductCard'

/** Responsive grid: 2 cols mobile, 3 on tablet, 4 on desktop (or 3 when `cols` = 3). */
export default function ProductGrid({ products, cols = 4, className = '' }) {
  const colClass = cols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
  return (
    <div className={`grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 md:gap-y-12 ${colClass} ${className}`}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  )
}
