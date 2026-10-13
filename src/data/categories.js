import { campaign, u } from './images'

// Category definitions used by menus, collection pages and filters.
// `slug` is what products store in `product.category`.

export const MEN_CATEGORIES = [
  { slug: 'tshirts', label: 'T-Shirts', image: u(4) },
  { slug: 'shirts', label: 'Shirts', image: u(52) },
  { slug: 'jeans', label: 'Jeans', image: u(20) },
  { slug: 'trousers', label: 'Trousers', image: u(22) },
  { slug: 'jackets', label: 'Jackets', image: u(37) },
  { slug: 'hoodies', label: 'Hoodies', image: u(19) },
  { slug: 'sweatshirts', label: 'Sweatshirts', image: u(40) },
  { slug: 'shorts', label: 'Shorts', image: u(41) },
  { slug: 'knitwear', label: 'Knitwear', image: u(16) },
  { slug: 'accessories', label: 'Accessories', image: u(78) },
]

export const WOMEN_CATEGORIES = [
  { slug: 'tops', label: 'Tops', image: u(5) },
  { slug: 'tshirts', label: 'T-Shirts', image: u(61) },
  { slug: 'shirts', label: 'Shirts', image: u(57) },
  { slug: 'dresses', label: 'Dresses', image: u(9) },
  { slug: 'jeans', label: 'Jeans', image: u(21) },
  { slug: 'trousers', label: 'Trousers', image: u(27) },
  { slug: 'skirts', label: 'Skirts', image: u(26) },
  { slug: 'jackets', label: 'Jackets', image: u(2) },
  { slug: 'knitwear', label: 'Knitwear', image: u(6) },
  { slug: 'activewear', label: 'Activewear', image: u(0) },
  { slug: 'accessories', label: 'Accessories', image: u(77) },
]

/** slug → display label (the same slug reads the same for men and women). */
export const CATEGORY_LABELS = Object.fromEntries(
  [...MEN_CATEGORIES, ...WOMEN_CATEGORIES].map((c) => [c.slug, c.label]),
)

/** Homepage "Find Your Style" cards. */
export const HOME_CATEGORY_CARDS = [
  { title: "Men's Essentials", label: 'Everyday staples', to: '/collections/men', image: campaign.men },
  { title: "Women's Collection", label: 'Effortless silhouettes', to: '/collections/women', image: campaign.women },
  { title: 'Streetwear', label: 'Relaxed. Layered. Loud.', to: '/search?q=oversized', image: campaign.streetwear },
  { title: 'Accessories', label: 'The finishing touch', to: '/search?q=accessories', image: campaign.accessories },
]

/**
 * Configuration for every shared <CollectionView /> page.
 * `match` decides which products belong to the collection.
 */
export const COLLECTIONS = {
  men: {
    handle: 'men',
    crumb: "Men's",
    title: "THE MEN'S COLLECTION",
    subtitle: 'Modern essentials for every day, every occasion.',
    description:
      'Considered cuts, premium fabrics and a refined neutral palette — build a wardrobe that works as hard as you do.',
    image: campaign.menCollection,
    categories: MEN_CATEGORIES,
    basePath: '/collections/men',
    match: (p) => p.gender === 'men',
    metaDescription: "Shop the VELORA men's collection: t-shirts, shirts, jeans, trousers, jackets and more.",
  },
  women: {
    handle: 'women',
    crumb: "Women's",
    title: "THE WOMEN'S COLLECTION",
    subtitle: 'Effortless silhouettes. Contemporary expression.',
    description:
      'From fluid dresses to tailored trousers, discover contemporary pieces designed to move with you.',
    image: campaign.womenCollection,
    categories: WOMEN_CATEGORIES,
    basePath: '/collections/women',
    match: (p) => p.gender === 'women',
    metaDescription: "Shop the VELORA women's collection: dresses, tops, denim, knitwear, jackets and more.",
  },
  'new-arrivals': {
    handle: 'new-arrivals',
    crumb: 'New Arrivals',
    title: 'NEW ARRIVALS',
    subtitle: 'Fresh pieces. New energy.',
    description: 'The newest additions to VELORA — be the first to wear the season.',
    image: campaign.newArrivals,
    categories: [],
    basePath: '/collections/new-arrivals',
    match: (p) => p.isNew,
    metaDescription: 'Discover the latest arrivals from VELORA men’s and women’s fashion.',
  },
  'best-sellers': {
    handle: 'best-sellers',
    crumb: 'Best Sellers',
    title: 'BEST SELLERS',
    subtitle: 'The favorites our customers keep coming back to.',
    description: 'Tried, tested and loved — our most-wanted pieces of the season.',
    image: campaign.bestSellers,
    categories: [],
    basePath: '/collections/best-sellers',
    match: (p) => p.isBestSeller,
    metaDescription: 'Shop VELORA best sellers — our most loved men’s and women’s pieces.',
  },
  sale: {
    handle: 'sale',
    crumb: 'Sale',
    title: 'THE SALE',
    subtitle: 'Considered pieces. Reconsidered prices.',
    description: 'Selected styles at reduced prices while stocks last.',
    image: campaign.sale,
    categories: [],
    basePath: '/collections/sale',
    match: (p) => p.isSale,
    metaDescription: 'Shop the VELORA sale: men’s and women’s fashion at reduced prices.',
  },
}
