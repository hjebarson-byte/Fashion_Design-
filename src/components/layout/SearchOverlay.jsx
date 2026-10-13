import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Search, TrendingUp, X } from 'lucide-react'
import SmartImage from '../common/SmartImage'
import useProducts from '../../hooks/useProducts'
import { useShop } from '../../context/ShopContext'
import { storeConfig } from '../../data/storeConfig'
import { formatPrice } from '../../utils/formatCurrency'

/**
 * Full-width search overlay: live suggestions, popular + recent searches.
 * Enter → search results page. Escape closes. Arrow keys move between suggestions.
 */
export default function SearchOverlay() {
  const { searchOpen, closeSearch, recentSearches, addRecentSearch, clearRecentSearches } = useShop()
  const { search } = useProducts()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const results = useMemo(() => (query.trim() ? search(query) : []), [query, search])

  // Focus input, lock scroll, close on Escape
  useEffect(() => {
    if (!searchOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => inputRef.current?.focus(), 80)
    const onKey = (e) => e.key === 'Escape' && closeSearch()
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [searchOpen, closeSearch])

  // Reset the field whenever the overlay closes
  useEffect(() => {
    if (!searchOpen) setQuery('')
  }, [searchOpen])

  const submit = (term) => {
    const q = (term ?? query).trim()
    if (!q) return
    addRecentSearch(q)
    closeSearch()
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  // Arrow-key navigation between input and the suggestion links/buttons
  const onPanelKey = (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    const items = [inputRef.current, ...panelRef.current.querySelectorAll('[data-nav]')]
    const idx = items.indexOf(document.activeElement)
    const next = e.key === 'ArrowDown' ? Math.min(items.length - 1, idx + 1) : Math.max(0, idx - 1)
    e.preventDefault()
    items[next]?.focus()
  }

  return createPortal(
    <AnimatePresence>
      {searchOpen && (
        <div className="fixed inset-0 z-[95]" role="dialog" aria-modal="true" aria-label="Search">
          <motion.div className="absolute inset-0 bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeSearch} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            onKeyDown={onPanelKey}
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 max-h-[92vh] overflow-y-auto bg-white shadow-2xl"
          >
            <div className="container-x py-6 md:py-10">
              <form onSubmit={(e) => { e.preventDefault(); submit() }} role="search" className="flex items-center gap-3 border-b-2 border-ink pb-3">
                <Search size={22} aria-hidden="true" />
                <label htmlFor="site-search" className="sr-only">Search VELORA</label>
                <input
                  ref={inputRef}
                  id="site-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for t-shirts, dresses, jeans…"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent text-xl outline-none placeholder:text-[#a0a0a0] md:text-3xl [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button type="button" onClick={() => { setQuery(''); inputRef.current?.focus() }} className="text-xs font-semibold uppercase tracking-[0.14em] text-muted hover:text-ink">
                    Clear
                  </button>
                )}
                <button type="button" onClick={closeSearch} aria-label="Close search" className="grid h-10 w-10 shrink-0 place-items-center"><X size={24} /></button>
              </form>

              {!query.trim() ? (
                <div className="grid gap-10 pt-8 md:grid-cols-2">
                  <section aria-labelledby="popular-h">
                    <h2 id="popular-h" className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted"><TrendingUp size={14} /> Popular searches</h2>
                    <ul className="flex flex-wrap gap-2">
                      {storeConfig.popularSearches.map((t) => (
                        <li key={t}><button data-nav type="button" onClick={() => submit(t)} className="border border-line px-4 py-2 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-white">{t}</button></li>
                      ))}
                    </ul>
                  </section>
                  <section aria-labelledby="recent-h">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 id="recent-h" className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted"><Clock size={14} /> Recent searches</h2>
                      {recentSearches.length > 0 && <button type="button" onClick={clearRecentSearches} className="text-xs underline underline-offset-4">Clear history</button>}
                    </div>
                    {recentSearches.length ? (
                      <ul className="space-y-1">
                        {recentSearches.map((t) => (
                          <li key={t}><button data-nav type="button" onClick={() => submit(t)} className="w-full py-2 text-left text-sm hover:text-accent-dark">{t}</button></li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted">Your recent searches will appear here.</p>
                    )}
                  </section>
                </div>
              ) : (
                <div className="pt-6" aria-live="polite">
                  {results.length === 0 ? (
                    <p className="py-10 text-center text-muted">No results for “{query}”. Try “shirt”, “jeans” or “dress”.</p>
                  ) : (
                    <>
                      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{results.length} {results.length === 1 ? 'result' : 'results'}</p>
                      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                        {results.slice(0, 6).map((p) => (
                          <li key={p.id}>
                            <Link data-nav to={`/products/${p.slug}`} onClick={() => { addRecentSearch(query); closeSearch() }} className="group block">
                              <SmartImage src={p.images[0]} alt={p.name} width={300} className="aspect-[3/4]" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                              <p className="mt-2 text-[13px] font-medium leading-snug">{p.name}</p>
                              <p className="text-xs text-muted">{formatPrice(p.price)}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 text-center">
                        <button data-nav type="button" onClick={() => submit()} className="btn btn-outline">View all {results.length} results</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
