import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ShopContext = createContext(null)

const isStringArray = (v) => Array.isArray(v) && v.every((x) => typeof x === 'string')
const isObject = (v) => v && typeof v === 'object' && !Array.isArray(v)

/**
 * Shop-wide UI + preference state:
 *  - which overlays/drawers are open (cart, search, mobile menu)
 *  - recently viewed products and recent searches (persisted)
 *  - shopping preferences such as the last chosen sort order (persisted)
 */
export function ShopProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('velora_recently_viewed', [], isStringArray)
  const [recentSearches, setRecentSearches] = useLocalStorage('velora_recent_searches', [], isStringArray)
  const [preferences, setPreferences] = useLocalStorage('velora_preferences', { sort: 'featured' }, isObject)

  const addRecentlyViewed = useCallback(
    (productId) =>
      setRecentlyViewed((list) => (list[0] === productId ? list : [productId, ...list.filter((id) => id !== productId)].slice(0, 10))),
    [setRecentlyViewed],
  )

  const addRecentSearch = useCallback(
    (term) => {
      const t = term.trim()
      if (!t) return
      setRecentSearches((list) => [t, ...list.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, 6))
    },
    [setRecentSearches],
  )

  const clearRecentSearches = useCallback(() => setRecentSearches([]), [setRecentSearches])
  const setSortPreference = useCallback((sort) => setPreferences((p) => ({ ...p, sort })), [setPreferences])

  const value = useMemo(
    () => ({
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      mobileMenuOpen,
      openMobileMenu: () => setMobileMenuOpen(true),
      closeMobileMenu: () => setMobileMenuOpen(false),
      recentlyViewed,
      addRecentlyViewed,
      recentSearches,
      addRecentSearch,
      clearRecentSearches,
      preferences,
      setSortPreference,
    }),
    [cartOpen, searchOpen, mobileMenuOpen, recentlyViewed, addRecentlyViewed, recentSearches, addRecentSearch, clearRecentSearches, preferences, setSortPreference],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used inside <ShopProvider>')
  return ctx
}
