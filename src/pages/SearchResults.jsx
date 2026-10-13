import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { SearchX, SlidersHorizontal, X } from 'lucide-react'
import Breadcrumbs from '../components/common/Breadcrumbs'
import ProductGrid from '../components/products/ProductGrid'
import ProductSort from '../components/products/ProductSort'
import ProductFilters from '../components/products/ProductFilters'
import Drawer from '../components/common/Drawer'
import EmptyState from '../components/common/EmptyState'
import Button from '../components/common/Button'
import useProducts from '../hooks/useProducts'
import usePageMeta from '../hooks/usePageMeta'
import { useShop } from '../context/ShopContext'
import { DEFAULT_FILTERS, countActiveFilters, filterProducts, getFilterOptions, PRICE_MIN, PRICE_MAX } from '../utils/filterProducts'
import { sortProducts } from '../utils/sortProducts'
import { storeConfig } from '../data/storeConfig'
import { formatPrice } from '../utils/formatCurrency'
import { CATEGORY_LABELS } from '../data/categories'

const PAGE_SIZE = 12

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const { search } = useProducts()
  const { preferences, setSortPreference, addRecentSearch } = useShop()

  usePageMeta(query ? `Search: "${query}"` : 'Search', `Search results for "${query}" at VELORA.`)

  const rawResults = useMemo(() => {
    if (!query.trim()) return []
    return search(query)
  }, [query, search])

  const options = useMemo(() => getFilterOptions(rawResults), [rawResults])

  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sort, setSort] = useState(preferences.sort || 'featured')
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = useMemo(() => {
    return sortProducts(filterProducts(rawResults, filters), sort)
  }, [rawResults, filters, sort])

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

  const handleQuerySelect = (term) => {
    addRecentSearch(term)
    setSearchParams({ q: term })
    clearAll()
  }

  // Active filter chips
  const chips = []
  filters.categories.forEach((c) => chips.push({ key: `c-${c}`, label: CATEGORY_LABELS[c] || c, remove: () => updateFilters({ ...filters, categories: filters.categories.filter((x) => x !== c) }) }))
  if (filters.priceMin > PRICE_MIN || filters.priceMax < PRICE_MAX)
    chips.push({ key: 'price', label: `${formatPrice(filters.priceMin)} – ${formatPrice(filters.priceMax)}`, remove: () => updateFilters({ ...filters, priceMin: PRICE_MIN, priceMax: PRICE_MAX }) })
  filters.sizes.forEach((s) => chips.push({ key: `s-${s}`, label: `Size ${s}`, remove: () => updateFilters({ ...filters, sizes: filters.sizes.filter((x) => x !== s) }) }))
  filters.colors.forEach((c) => chips.push({ key: `col-${c}`, label: c, remove: () => updateFilters({ ...filters, colors: filters.colors.filter((x) => x !== c) }) }))
  filters.styles.forEach((s) => chips.push({ key: `st-${s}`, label: s, remove: () => updateFilters({ ...filters, styles: filters.styles.filter((x) => x !== s) }) }))
  if (filters.inStockOnly) chips.push({ key: 'stock', label: 'In stock', remove: () => updateFilters({ ...filters, inStockOnly: false }) })
  if (filters.saleOnly) chips.push({ key: 'sale', label: 'Sale items', remove: () => updateFilters({ ...filters, saleOnly: false }) })

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Search Results' },
  ]

  return (
    <div className="container-x py-8 md:py-12">
      <Breadcrumbs items={crumbs} className="mb-6" />

      <header className="mb-8 border-b border-line pb-6">
        <h1 className="font-serif text-3xl font-normal uppercase tracking-tight md:text-4xl">
          {query ? (
            <>
              Search Results for <span className="italic text-accent-dark">“{query}”</span>
            </>
          ) : (
            'All Products'
          )}
        </h1>
        <p className="mt-2 text-sm text-muted">
          Found <span className="font-semibold text-ink">{filtered.length}</span> {filtered.length === 1 ? 'match' : 'matches'}
        </p>
      </header>

      {rawResults.length === 0 ? (
        <div>
          <EmptyState
            icon={SearchX}
            title={query ? 'No matching products' : 'Start your search'}
            text={
              query
                ? `We couldn't find any items matching "${query}". Try checking your spelling or using more general terms.`
                : 'Enter a search term above or try one of our trending categories.'
            }
            actions={[
              { label: 'Browse Men', to: '/collections/men' },
              { label: 'Browse Women', to: '/collections/women', variant: 'outline' },
            ]}
          />

          <div className="mx-auto mt-12 max-w-xl text-center">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Popular searches</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {storeConfig.popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleQuerySelect(term)}
                  className="border border-line bg-sand px-4 py-2 text-xs font-medium transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex items-center gap-2 border border-ink px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] lg:hidden"
              >
                <SlidersHorizontal size={15} /> Filters
                {activeCount > 0 && (
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] text-white">
                    {activeCount}
                  </span>
                )}
              </button>
              <p className="text-sm text-muted">
                Showing {shown.length} of {filtered.length}
              </p>
            </div>
            <ProductSort value={sort} onChange={changeSort} />
          </div>

          {/* Active chips */}
          {chips.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {chips.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={c.remove}
                  className="inline-flex items-center gap-1.5 bg-sand px-3 py-1.5 text-xs transition-colors hover:bg-line"
                >
                  {c.label} <X size={12} />
                </button>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="ml-1 text-xs font-semibold uppercase tracking-[0.12em] underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          )}

          <div className="grid gap-10 lg:grid-cols-[250px_1fr] xl:grid-cols-[280px_1fr]">
            {/* Desktop Filters */}
            <aside className="hidden self-start lg:sticky lg:top-24 lg:block">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em]">Filters</h2>
                {activeCount > 0 && (
                  <button type="button" onClick={clearAll} className="text-xs underline underline-offset-4">
                    Clear all
                  </button>
                )}
              </div>
              <ProductFilters filters={filters} onChange={updateFilters} options={options} />
            </aside>

            {/* Grid */}
            <div>
              {filtered.length === 0 ? (
                <EmptyState
                  icon={SearchX}
                  title="No filtered results"
                  text="No products match the selected filters. Try loosening your filter criteria."
                  actions={[{ label: 'Clear filters', onClick: clearAll }]}
                />
              ) : (
                <>
                  <ProductGrid products={shown} cols={3} />
                  {shown.length < filtered.length && (
                    <div className="mt-14 text-center">
                      <Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                        Load more
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile Filter Drawer */}
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
      )}
    </div>
  )
}
