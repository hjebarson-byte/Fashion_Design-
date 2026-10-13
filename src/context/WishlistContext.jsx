import { createContext, useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import useToast from '../hooks/useToast'

const WishlistContext = createContext(null)

const isStringArray = (v) => Array.isArray(v) && v.every((x) => typeof x === 'string')

/** Wishlist stores only product ids; product details are looked up from the catalogue. */
export function WishlistProvider({ children }) {
  const [ids, setIds] = useLocalStorage('velora_wishlist', [], isStringArray)
  const toast = useToast()

  const isInWishlist = useCallback((id) => ids.includes(id), [ids])

  const addToWishlist = useCallback(
    (product) => {
      setIds((list) => (list.includes(product.id) ? list : [product.id, ...list]))
    },
    [setIds],
  )

  const removeFromWishlist = useCallback((id) => setIds((list) => list.filter((x) => x !== id)), [setIds])

  const toggleWishlist = useCallback(
    (product) => {
      if (ids.includes(product.id)) {
        removeFromWishlist(product.id)
        toast.info(`Removed "${product.name}" from your wishlist`)
      } else {
        addToWishlist(product)
        toast.success(`Saved "${product.name}" to your wishlist`)
      }
    },
    [ids, addToWishlist, removeFromWishlist, toast],
  )

  const value = useMemo(
    () => ({ wishlistIds: ids, wishlistCount: ids.length, isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist }),
    [ids, isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside <WishlistProvider>')
  return ctx
}
