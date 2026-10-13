// Sorting helpers. Each option id matches a value in <ProductSort />.

export const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'best-selling', label: 'Best Selling' },
  { id: 'rating', label: 'Customer Rating' },
]

/** Returns a NEW sorted array (never mutates the input). */
export function sortProducts(products, sortId = 'featured') {
  const list = [...products]
  switch (sortId) {
    case 'newest':
      return list.sort((a, b) => b.addedAt - a.addedAt)
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price)
    case 'best-selling':
      return list.sort((a, b) => b.soldCount - a.soldCount)
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    case 'featured':
    default:
      // featured first, then best sellers, otherwise the original catalogue order
      return list.sort(
        (a, b) =>
          Number(b.isFeatured) - Number(a.isFeatured) ||
          Number(b.isBestSeller) - Number(a.isBestSeller) ||
          a.order - b.order,
      )
  }
}
