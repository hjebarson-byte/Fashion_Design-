import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X, SearchX } from 'lucide-react'
import Breadcrumbs from '../common/Breadcrumbs'
import SmartImage from '../common/SmartImage'
import Drawer from '../common/Drawer'
import EmptyState from '../common/EmptyState'
import Button from '../common/Button'
import ProductGrid from './ProductGrid'
import ProductFilters from './ProductFilters'
import ProductSort from './ProductSort'
import usePageMeta from '../../hooks/usePageMeta'
import useProducts from '../../hooks/useProducts'
import { useShop } from '../../context/ShopContext'
import { CATEGORY_LABELS } from '../../data/categories'
import { DEFAULT_FILTERS, PRICE_MAX, PRICE_MIN, countActiveFilters, filterProducts, getFilterOptions } from '../../utils/filterProducts'
import { sortProducts } from '../../utils/sortProducts'
import { formatPrice } from '../../utils/formatCurrency'

const PAGE_SIZE = 12

/**
 * Shared collection page (Men, Women, New Arrivals, Best Sellers, Sale and category pages).
 * Only the `config` (see data/categories.js COLLECTIONS) and `activeCategory` change.
 * Tip: render it with a `key` so filters reset when the collection changes.
 */
export default function CollectionView({ config, activeCategory }) {
  const { products } = useProducts()
  const { preferences, setSortPreference } = useShop()

  const baseProducts = useMemo(() => products.filter(config.match), [products, config])
  const options = useMemo(() => getFilterOptions(baseProducts), [baseProducts])

  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, categories: activeCategory ? [activeCategory] : [] })
  const [sort, setSort] = useState(preferences.sort || 'featured')
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const categoryLabel = activeCategory ? CATEGORY_LABELS[activeCategory] : null
  const title = categoryLabel ? `${categoryLabel} — ${config.title}` : config.title
  usePageMeta(categoryLabel ? `${categoryLabel} | ${config.title}` : config.title, config.metaDescription)

  const filtered = useMemo(() => sortProducts(filterProducts(baseProducts, filters), sort), [baseProducts, filters, sort])
  const shown = filtered.slice(0, visible)
  const activeCount = countActiveFilters(filters)

  const updateFilters = (next) => {
    setFilters(next)
    setVisible(PAGE_SIZE)
  }
  const clearAll = () => updateFilters({ ...DEFAULT_FILTERS })
  const changeSort = (s) => {
    setSort(s)
    setSortPreference(s)
  }

  // Build the "active filter" chips
  const chips = []
  filters.categories.forEach((c) => chips.push({ key: `c-${c}`, label: CATEGORY_LABELS[c] || c, remove: () => updateFilters({ ...filters, categories: filters.categories.filter((x) => x !== c) }) }))
  if (filters.priceMin > PRICE_MIN || filters.priceMax < PRICE_MAX)
    chips.push({ key: 'price', label: `${formatPrice(filters.priceMin)} – ${formatPrice(filters.priceMax)}`, remove: () => updateFilters({ ...filters, priceMin: PRICE_MIN, priceMax: PRICE_MAX }) })
  filters.sizes.forEach((s) => chips.push({ key: `s-${s}`, label: `Size ${s}`, remove: () => updateFilters({ ...filters, sizes: filters.sizes.filter((x) => x !== s) }) }))
  filters.colors.forEach((c) => chips.push({ key: `col-${c}`, label: c, remove: () => updateFilters({ ...filters, colors: filters.colors.filter((x) => x !== c) }) }))
  filters.styles.forEach((s) => chips.push({ key: `st-${s}`, label: s, remove: () => updateFilters({ ...filters, styles: filters.styles.filter((x) => x !== s) }) }))
  if (filters.inStockOnly) chips.push({ key: 'stock', label: 'In stock', remove: () => updateFilters({ ...filters, inStockOnly: false }) })
  if (filters.saleOnly) chips.push({ key: 'sale', label: 'Sale items', remove: () => updateFilters({ ...filters, saleOnly: false }) })

  const crumbs = [{ label: 'Home', to: '/' }]
  if (categoryLabel) {
    crumbs.push({ label: config.handle === 'men' ? 'Men' : 'Women', to: config.basePath }, { label: categoryLabel })
  } else {
    crumbs.push({ label: config.crumb })
  }

  return (
    <>
      {/* ---------- Hero banner ---------- */}
      <section className="relative isolate overflow-hidden bg-ink" aria-labelledby="collection-title">
        <SmartImage src={config.image} alt="" width={1800} eager className="absolute inset-0 -z-10" imgClassName="kenburns object-top opacity-80" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        <div className="container-x on-dark flex min-h-[300px] flex-col justify-end pb-10 pt-12 text-white md:min-h-[420px] md:pb-14">
          <Breadcrumbs items={crumbs} light className="mb-6" />
          <motion.h1
            id="collection-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="display text-4xl uppercase sm:text-5xl md:text-7xl"
          >
            {categoryLabel ? categoryLabel : config.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-xl text-base text-white/85 md:text-lg"
          >
            {config.subtitle}
          </motion.p>
        </div>
      </section>

      <div className="container-x pb-20">
        {config.description && <p className="mx-auto max-w-2xl py-8 text-center text-sm leading-relaxed text-muted md:py-10">{config.description}</p>}

        {/* ---------- Category navigation ---------- */}
        {config.categories.length > 0 && (
          <nav aria-label={`${config.title} categories`} className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto border-b border-line px-4 pb-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {[{ slug: null, label: 'All' }, ...config.categories].map((c) => {
              const active = (c.slug || null) === (activeCategory || null)
              return (
                <Link
                  key={c.label}
                  to={c.slug ? `${config.basePath}/${c.slug}` : config.basePath}
                  aria-current={active ? 'page' : undefined}
                  className={`shrink-0 border px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition-colors ${active ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink'}`}
                >
                  {c.label}
                </Link>
              )
            })}
          </nav>
        )}

        {/* ---------- Toolbar ---------- */}
        <div className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2 border border-ink px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] lg:hidden"
            >
              <SlidersHorizontal size={15} /> Filters{activeCount > 0 && <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] text-white">{activeCount}</span>}
            </button>
            <p className="text-sm text-muted" aria-live="polite">
              <span className="font-semibold text-ink">{filtered.length}</span> {filtered.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          <ProductSort value={sort} onChange={changeSort} />
        </div>

        {/* ---------- Active chips ---------- */}
        {chips.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2" aria-label="Active filters">
            {chips.map((c) => (
              <button key={c.key} type="button" onClick={c.remove} className="inline-flex items-center gap-1.5 bg-sand px-3 py-1.5 text-xs transition-colors hover:bg-line" aria-label={`Remove filter ${c.label}`}>
                {c.label} <X size={12} />
              </button>
            ))}
            <button type="button" onClick={clearAll} className="ml-1 text-xs font-semibold uppercase tracking-[0.12em] underline underline-offset-4">
              Clear all filters
            </button>
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[250px_1fr] xl:grid-cols-[280px_1fr]">
          {/* Desktop sidebar */}
          <aside className="hidden self-start lg:sticky lg:top-24 lg:block" aria-label="Product filters">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em]">Filters</h2>
              {activeCount > 0 && (
                <button type="button" onClick={clearAll} className="text-xs underline underline-offset-4">Clear all</button>
              )}
            </div>
            <ProductFilters filters={filters} onChange={updateFilters} options={options} />
          </aside>

          {/* Product grid */}
          <div>
            {filtered.length === 0 ? (
              <EmptyState
                icon={SearchX}
                title="No matching products"
                text="We couldn't find anything with those filters. Try removing a filter or two."
                actions={[{ label: 'Clear all filters', onClick: clearAll }]}
              />
            ) : (
              <>
                <ProductGrid products={shown} cols={3} />
                <div className="mt-14 text-center">
                  <p className="text-xs text-muted">Showing {shown.length} of {filtered.length}</p>
                  <div className="mx-auto mt-3 h-px w-48 bg-line">
                    <div className="h-px bg-ink transition-all duration-500" style={{ width: `${(shown.length / filtered.length) * 100}%` }} />
                  </div>
                  {shown.length < filtered.length && (
                    <Button variant="outline" className="mt-6" onClick={() => setVisible((v) => v + PAGE_SIZE)}>Load more</Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ---------- Mobile filter drawer ---------- */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Filters" side="left" widthClass="max-w-sm">
        <div className="flex-1 overflow-y-auto px-5">
          <ProductFilters filters={filters} onChange={updateFilters} options={options} />
        </div>
        <div className="grid grid-cols-2 gap-3 border-t border-line p-4">
          <Button variant="outline" onClick={clearAll}>Clear all</Button>
          <Button onClick={() => setDrawerOpen(false)}>View {filtered.length}</Button>
        </div>
      </Drawer>
    </>
  )
}
