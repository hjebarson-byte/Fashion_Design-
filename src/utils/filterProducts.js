// Filtering and searching helpers (pure functions — easy to test).

export const PRICE_MIN = 0
export const PRICE_MAX = 8000

export const DEFAULT_FILTERS = {
  categories: [],
  priceMin: PRICE_MIN,
  priceMax: PRICE_MAX,
  sizes: [],
  colors: [],
  inStockOnly: false,
  styles: [],
  saleOnly: false,
}

/** All filters are combined with AND; options inside one group are OR. */
export function filterProducts(products, f) {
  return products.filter((p) => {
    if (f.categories.length && !f.categories.includes(p.category)) return false
    if (p.price < f.priceMin || p.price > f.priceMax) return false
    if (f.sizes.length && !p.sizes.some((s) => f.sizes.includes(s))) return false
    if (f.colors.length && !p.colors.some((c) => f.colors.includes(c.name))) return false
    if (f.inStockOnly && p.stock <= 0) return false
    if (f.styles.length && !f.styles.includes(p.style)) return false
    if (f.saleOnly && !p.isSale) return false
    return true
  })
}

/** Number of individual active filter selections (for badges). */
export function countActiveFilters(f) {
  return (
    f.categories.length +
    f.sizes.length +
    f.colors.length +
    f.styles.length +
    (f.inStockOnly ? 1 : 0) +
    (f.saleOnly ? 1 : 0) +
    (f.priceMin > PRICE_MIN || f.priceMax < PRICE_MAX ? 1 : 0)
  )
}

/** Unique, sorted option lists derived from a product set. */
export function getFilterOptions(products) {
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']
  const sizes = new Set()
  const colors = new Map()
  const styles = new Set()
  const categories = new Set()
  products.forEach((p) => {
    p.sizes.forEach((s) => sizes.add(s))
    p.colors.forEach((c) => colors.set(c.name, c.hex))
    styles.add(p.style)
    categories.add(p.category)
  })
  return {
    sizes: sizeOrder.filter((s) => sizes.has(s)),
    colors: [...colors.entries()].map(([name, hex]) => ({ name, hex })).sort((a, b) => a.name.localeCompare(b.name)),
    styles: [...styles].sort(),
    categories: [...categories],
  }
}

// ---------------------------------------------------------------
// Search
// ---------------------------------------------------------------

const SYNONYMS = { tee: 'tshirt', tees: 'tshirt', tshirts: 'tshirt', pants: 'trouser', jumper: 'knit', sweater: 'knit' }

/** Lowercase, drop apostrophes/hyphens, singularise — so "Women's Dresses" ~ "woman dress". */
function stem(word) {
  let w = word.toLowerCase().replace(/['’]s$/, '').replace(/['’-]/g, '')
  if (SYNONYMS[w]) w = SYNONYMS[w]
  if (w.endsWith('sses')) w = w.slice(0, -2)
  else if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) w = w.slice(0, -1)
  return w
}

const tokenize = (text) =>
  String(text)
    .toLowerCase()
    .split(/[^a-z0-9'’-]+/)
    .filter(Boolean)
    .map(stem)

/**
 * Case-insensitive search across name, category, gender, colour, style and description.
 * Every word in the query must match the start of at least one word of the product.
 */
export function searchProducts(products, query, categoryLabels = {}) {
  const tokens = tokenize(query)
  if (!tokens.length) return []
  return products.filter((p) => {
    const words = tokenize(
      [
        p.name,
        p.category,
        categoryLabels[p.category] || '',
        p.gender === 'men' ? 'men man mens' : 'women woman womens',
        p.colors.map((c) => c.name).join(' '),
        p.style,
        p.description,
      ].join(' '),
    )
    return tokens.every((t) => words.some((w) => w.startsWith(t)))
  })
}
